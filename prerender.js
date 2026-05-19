/**
 * prerender.js — Kinetora
 *
 * Runs a local server on port 4321 serving /dist, uses Puppeteer to render
 * the React tree for every sitemap route, and overwrites the static HTML files
 * with fully rendered markup, adding a data-prerendered="true" marker to the root div.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const handler = require('serve-handler');
const routes = require('./routes.config.js');

const distPath = path.join(__dirname, 'dist');
const PORT = 4321;

// Start a lightweight local static server
const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: distPath,
    cleanUrls: true
  });
});

server.listen(PORT, async () => {
  console.log(`\n[Prerender] Local server started at http://localhost:${PORT}`);
  
  let browser;
  let failedCount = 0;
  let successCount = 0;
  
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    // Emulate a standard desktop screen
    await page.setViewport({ width: 1440, height: 900 });

    // Page error and console logging
    page.on('pageerror', (err) => {
      console.error(`[Browser PageError] ${err.toString()}`);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error(`[Browser ConsoleError] ${msg.text()}`);
      }
    });
    
    // We will build a list of tasks (each has a URL and a destination file)
    const tasks = [];
    
    routes.forEach(route => {
      // 1. English Route
      const enUrl = `http://localhost:${PORT}${route.path}`;
      const enFile = route.path === '/'
        ? path.join(distPath, 'index.html')
        : path.join(distPath, route.path.replace(/^\//, ''), 'index.html');
      tasks.push({ url: enUrl, file: enFile, lang: 'en', path: route.path });
      
      // 2. Spanish Route
      const esUrl = `http://localhost:${PORT}/es${route.path === '/' ? '' : route.path}`;
      const esFile = route.path === '/'
        ? path.join(distPath, 'es', 'index.html')
        : path.join(distPath, 'es', route.path.replace(/^\//, ''), 'index.html');
      tasks.push({ url: esUrl, file: esFile, lang: 'es', path: `/es${route.path === '/' ? '' : route.path}` });
    });
    
    console.log(`[Prerender] Beginning crawl of ${tasks.length} total pages...\n`);
    
    for (const task of tasks) {
      console.log(`[Prerender] Rendering [${task.lang.toUpperCase()}] ${task.url} ...`);
      
      let gotError = false;
      try {
        await page.goto(task.url, { waitUntil: 'networkidle0', timeout: 30000 });
      } catch (err) {
        console.error(`[Prerender] ⚠️ Timeout or network issue rendering ${task.url}: ${err.message}`);
        gotError = true;
      }

      // Wait for H1 with text to appear
      if (!gotError) {
        try {
          await page.waitForFunction(() => document.querySelector('h1')?.innerText?.length > 0, { timeout: 10000 });
        } catch (err) {
          console.warn(`[Prerender] ⚠️ Timeout waiting for H1 to contain text on ${task.path}: ${err.message}`);
        }
      }
      
      try {
        let html = await page.content();
        
        // Inject data-prerendered="true" to the root div to prevent hydration flashing
        if (html.includes('<div id="root">')) {
          html = html.replace('<div id="root">', '<div id="root" data-prerendered="true">');
        } else if (html.includes('id="root"')) {
          // If React already rendered inside but #root has other attributes/classes
          html = html.replace(/<div[^>]*id="root"[^>]*>/, (match) => {
            if (!match.includes('data-prerendered')) {
              return match.replace('id="root"', 'id="root" data-prerendered="true"');
            }
            return match;
          });
        }
        
        // Ensure parent directories exist
        const dir = path.dirname(task.file);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(task.file, html, 'utf8');
        
        if (gotError) {
          failedCount++;
          console.log(`[Prerender] ⚠️ Saved partial/fallback HTML for ${task.path}`);
        } else {
          successCount++;
          console.log(`[Prerender] ✅ Successfully generated prerendered HTML for ${task.path}`);
        }
      } catch (err) {
        failedCount++;
        console.error(`[Prerender] ❌ FAILED to write or extract content for ${task.path}: ${err.message}`);
      }
    }
    
    console.log(`\n[Prerender] Prerendering finished.`);
    console.log(`- Total pages processed: ${tasks.length}`);
    console.log(`- Success: ${successCount}`);
    console.log(`- Timeouts/Errors: ${failedCount}`);
    
  } catch (err) {
    console.error('[Prerender] Critical error during crawling execution:', err);
  } finally {
    if (browser) {
      await browser.close();
    }
    server.close(() => {
      console.log('[Prerender] Local server closed.');
      process.exit(failedCount > 0 ? 1 : 0);
    });
  }
});
