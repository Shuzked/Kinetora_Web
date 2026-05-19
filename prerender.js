const http = require('http');
const handler = require('serve-handler');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const PORT = 4321;

// Importa las rutas desde la fuente única de verdad
const { routes } = require('./routes.config.js');

async function runCrawl(lang, publicDir) {
  // Start static server for this language run
  const server = http.createServer((req, res) => {
    const cleanUrl = req.url.split('?')[0];
    const assetPath = path.join(DIST, cleanUrl);

    // If the file exists in the main dist/ folder (e.g. assets, logos), serve it
    if (fs.existsSync(assetPath) && fs.statSync(assetPath).isFile()) {
      return handler(req, res, {
        public: DIST,
        cleanUrls: true,
      });
    }

    // Otherwise serve from publicDir (which is DIST for EN, or DIST/es for ES)
    return handler(req, res, {
      public: publicDir,
      rewrites: [
        { source: '**', destination: '/index.html' }
      ],
      cleanUrls: true,
    });
  });

  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`[prerender] [${lang.toUpperCase()}] Server listening on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = { ok: [], warning: [], failed: [] };

  for (const route of routes) {
    const urlPath = route.path === '/' ? '/' : `${route.path}/`;
    const url = `http://localhost:${PORT}${urlPath}`;
    
    const filePath = lang === 'es'
      ? path.join(DIST, 'es', route.path === '/' ? '' : route.path.replace(/^\//, ''), 'index.html')
      : path.join(DIST, route.path === '/' ? '' : route.path.replace(/^\//, ''), 'index.html');

    const page = await browser.newPage();
    // Emulate a standard desktop screen
    await page.setViewport({ width: 1440, height: 900 });

    const consoleErrors = [];
    page.on('pageerror', err => consoleErrors.push(`pageerror: ${err.message}`));
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(`console.error: ${msg.text()}`);
    });

    try {
      console.log(`[prerender] [${lang.toUpperCase()}] Rendering ${url} -> ${path.relative(DIST, filePath)}`);
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Espera a que el árbol React monte: H1 con texto
      try {
        await page.waitForFunction(
          () => {
            const h1 = document.querySelector('h1');
            return h1 && h1.innerText && h1.innerText.trim().length > 5;
          },
          { timeout: 10000 }
        );
      } catch {
        results.warning.push(`${urlPath} (no H1 detected after 10s, capturing anyway)`);
      }

      // Scroll to the bottom of the page to trigger all IntersectionObserver lazy loaders
      try {
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 150;
            const timer = setInterval(() => {
              const scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if (totalHeight >= scrollHeight || totalHeight > 15000) {
                clearInterval(timer);
                resolve();
              }
            }, 30);
          });
        });
        // Extra wait to let framer-motion animations finish and chunks fetch
        await new Promise(r => setTimeout(r, 800));
      } catch (scrollErr) {
        console.error(`[prerender] [${lang.toUpperCase()}] Warning: scrolling failed: ${scrollErr.message}`);
      }

      // Captura HTML completo
      let html = await page.content();

      // Marca para hidratación
      html = html.replace(
        /<div id="root">/,
        '<div id="root" data-prerendered="true">'
      );

      // Asegura directorio y escribe
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, html, 'utf8');

      // Verifica que el archivo tiene H1 real (sanity check)
      const written = fs.readFileSync(filePath, 'utf8');
      const hasH1 = /<h1[^>]*>[^<]*\S/.test(written);
      if (hasH1) results.ok.push(urlPath);
      else results.warning.push(`${urlPath} (file written but no <h1> detected)`);

      if (consoleErrors.length > 0) {
        // Keep warnings for real errors but filter out service worker warnings if any
        const filteredErrors = consoleErrors.filter(e => !e.includes('ServiceWorker'));
        if (filteredErrors.length > 0) {
          results.warning.push(`${urlPath} runtime errors: ${filteredErrors.slice(0, 3).join(' | ')}`);
        }
      }
    } catch (err) {
      results.failed.push(`${urlPath}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await new Promise(resolve => server.close(resolve));
  console.log(`[prerender] [${lang.toUpperCase()}] Server closed.`);
  return results;
}

async function main() {
  console.log('======================================');
  console.log('[prerender] STARTING ENGLISH (EN) CRAWL');
  console.log('======================================');
  const enResults = await runCrawl('en', DIST);

  console.log('\n======================================');
  console.log('[prerender] STARTING SPANISH (ES) CRAWL');
  console.log('======================================');
  const esResults = await runCrawl('es', path.join(DIST, 'es'));

  // Combine and summarize
  const ok = [...enResults.ok.map(p => `[EN] ${p}`), ...esResults.ok.map(p => `[ES] ${p}`)];
  const warning = [...enResults.warning.map(p => `[EN] ${p}`), ...esResults.warning.map(p => `[ES] ${p}`)];
  const failed = [...enResults.failed.map(p => `[EN] ${p}`), ...esResults.failed.map(p => `[ES] ${p}`)];

  console.log('\n======================================');
  console.log('[prerender] FINAL SYSTEM SUMMARY:');
  console.log(`  OK: ${ok.length}`);
  console.log(`  Warnings: ${warning.length}`);
  console.log(`  Failed: ${failed.length}`);
  
  if (warning.length) {
    console.log('\nWarnings:');
    warning.forEach(w => console.log(`  - ${w}`));
  }
  if (failed.length) {
    console.log('\nFailures:');
    failed.forEach(f => console.log(`  - ${f}`));
    process.exit(1);
  }
}

main().catch(err => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
