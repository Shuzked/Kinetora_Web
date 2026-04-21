/**
 * prerender.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Headless-browser pre-renderer using Playwright Chromium.
 *
 * Architecture:
 *   1. Boots `vite preview` (serves dist/) on port 4173.
 *   2. Visits each route with a real Chromium browser.
 *   3. Waits for React to fully mount (network idle + custom sentinel).
 *   4. Extracts the fully-rendered outerHTML of the <html> element.
 *   5. Writes it back to dist/<route>/index.html.
 *
 * This guarantees crawlers receive:
 *   - Correct <head> metadata (already baked by postbuild-seo)
 *   - Fully rendered body: H1, Services cards, Portfolio, FAQ, etc.
 *
 * Run after vite build + postbuild-seo:
 *   node ./scripts/prerender.mjs
 *
 * Integrated via package.json: "postbuild" chain.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { chromium } from 'playwright-chromium';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PREVIEW_PORT = 4173;
const BASE_URL = `http://localhost:${PREVIEW_PORT}`;

// ── Routes to pre-render ─────────────────────────────────────────────────────
// Each entry: { route: URL path, outFile: relative output path in dist/ }
const ROUTES = [
  { route: '/',       outFile: 'index.html' },
  { route: '/casos',  outFile: 'casos/index.html' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function startPreviewServer() {
  return new Promise((resolve, reject) => {
    // Use npm run preview which calls vite preview
    const isWin = process.platform === 'win32';
    const proc = spawn(
      isWin ? 'npm' : 'npm',
      ['run', 'preview', '--', '--port', String(PREVIEW_PORT), '--host', 'localhost'],
      {
        cwd: ROOT,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env },
        // shell:true is required on Windows for npm to be found
        shell: true,
      },
    );

    const timeout = setTimeout(() => {
      proc.kill();
      reject(new Error('Preview server did not start in time'));
    }, 30_000);

    const tryReady = (data) => {
      const out = data.toString();
      if (out.includes('localhost') || out.includes('4173')) {
        clearTimeout(timeout);
        resolve(proc);
      }
    };

    proc.stdout.on('data', tryReady);
    proc.stderr.on('data', tryReady);
    proc.on('error', reject);
  });
}

async function waitForReactMount(page) {
  // Wait until React has mounted: the #root div should have children
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      return root && root.children.length > 0;
    },
    { timeout: 30_000 },
  );

  // Simulate progressive scrolling to trigger IntersectionObserver in SafeLazyLoad
  // This forces all lazy sections (Services, Portfolio, FAQ, Contact, Footer) to mount.
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const step = Math.floor(window.innerHeight * 0.8);
    let pos = 0;
    while (pos < totalHeight) {
      window.scrollTo(0, pos);
      await new Promise(r => setTimeout(r, 200));
      pos += step;
    }
    // Scroll back to top
    window.scrollTo(0, 0);
  });

  // Extra settle time for all components to fully render
  await page.waitForTimeout(3000);
  // Wait for network to go idle (images, fonts, etc.)
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
}

function mergePrerenderedBody(originalHtml, prerenderedHtml) {
  // We keep the original <head> (with all baked SEO metadata from posibuild-seo)
  // and replace only the <body> with the pre-rendered version.
  const headMatch = originalHtml.match(/<head[\s\S]*?<\/head>/i);
  const bodyMatch = prerenderedHtml.match(/<body[\s\S]*?<\/body>/i);
  const htmlOpenMatch = originalHtml.match(/<!doctype html>[\s\S]*?<html[^>]*>/i);

  if (!headMatch || !bodyMatch || !htmlOpenMatch) {
    console.warn('[prerender] ⚠️  Could not extract head/body from rendered page. Using full prerendered HTML.');
    return prerenderedHtml;
  }

  return `<!doctype html>\n${htmlOpenMatch[0].replace(/<!doctype html>/i, '').trim()}\n${headMatch[0]}\n${bodyMatch[0]}\n</html>`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('[prerender] 🚀  Starting headless pre-render...\n');

  let previewProc;
  let browser;

  try {
    // 1. Start preview server
    console.log('[prerender] 🌐  Starting vite preview server...');
    previewProc = await startPreviewServer();
    // Give it a moment to be fully ready
    await new Promise(r => setTimeout(r, 2000));
    console.log(`[prerender] ✅  Preview server running at ${BASE_URL}\n`);

    // 2. Launch headless browser
    browser = await chromium.launch({ headless: true });

    // 3. Pre-render each route
    for (const { route, outFile } of ROUTES) {
      const url = `${BASE_URL}${route}`;
      const destPath = path.join(DIST, outFile);
      const originalHtml = fs.existsSync(destPath)
        ? fs.readFileSync(destPath, 'utf8')
        : null;

      console.log(`[prerender] 🔄  Rendering: ${url}`);

      const page = await browser.newPage();

      // Suppress console noise from the page
      page.on('console', () => {});
      page.on('pageerror', (e) => console.warn(`[prerender]     Page error: ${e.message}`));

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      await waitForReactMount(page);

      // Extract the full rendered HTML
      const renderedHtml = await page.evaluate(() => document.documentElement.outerHTML);
      const finalHtml = `<!doctype html>\n${renderedHtml}`;

      // Merge: keep our baked <head> SEO metadata, replace <body> with rendered content
      const mergedHtml = originalHtml
        ? mergePrerenderedBody(originalHtml, finalHtml)
        : finalHtml;

      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, mergedHtml, 'utf8');

      await page.close();

      console.log(`[prerender] ✅  Written: ${destPath}`);

      // Verify key content is present
      const hasH1 = mergedHtml.includes('<h1') || mergedHtml.includes('<H1');
      const hasServices = mergedHtml.toLowerCase().includes('design') || mergedHtml.toLowerCase().includes('branding');
      console.log(`[prerender]     H1 present: ${hasH1 ? '✅' : '❌'} | Content present: ${hasServices ? '✅' : '❌'}\n`);
    }

    console.log('[prerender] 🎉  Pre-render complete. All routes baked successfully.\n');

  } finally {
    if (browser) await browser.close();
    if (previewProc) {
      previewProc.kill('SIGTERM');
      console.log('[prerender] 🛑  Preview server stopped.');
    }
  }
}

main().catch((err) => {
  console.error('[prerender] ❌  Fatal error:', err);
  process.exit(1);
});
