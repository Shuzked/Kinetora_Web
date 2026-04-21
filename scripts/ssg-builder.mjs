import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const DIST_SERVER = path.join(ROOT, 'dist-server');

// ── Rutas públicas a pre-renderizar ──────────────────────────────────────
const caseStudiesSlugs = [
  'elixir-games',
  'dunk-low-elixir-edition',
  'elixir-token',
  'chronosworlds',
  'cybertitans-pulse-series',
  'cybertitans-clash-impacto-brutal-y-evolucion-web3',
  'robokiden-token'
];

const publicRoutes = [
  '/',
  '/casos',
  ...caseStudiesSlugs.map(slug => `/casos/${slug}`),
  '/precios',
  '/legal/aviso-legal',
  '/legal/politica-privacidad',
  '/legal/politica-cookies',
  '/legal/privacidad-redes-sociales'
];

// Helper to inject the rendered HTML into the template
function injectBody(htmlFilePath, bodyHtml, templateStringFallback = null) {
  let html;
  
  if (templateStringFallback) {
    html = templateStringFallback;
    fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });
    // console.log(`[ssg-builder] ℹ️  Using memory template for: ${htmlFilePath}`);
  } else if (fs.existsSync(htmlFilePath)) {
    html = fs.readFileSync(htmlFilePath, 'utf8');
  } else {
    console.warn(`[ssg-builder] ⚠️  Skipping (file not found): ${htmlFilePath}`);
    return false;
  }

  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  } else if (/<div id="root">\s*<\/div>/.test(html)) {
    html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${bodyHtml}</div>`);
  } else {
    // Already injected
    console.log(`[ssg-builder] ℹ️  Root already has content in: ${htmlFilePath} — skipping.`);
    return false;
  }

  fs.writeFileSync(htmlFilePath, html, 'utf8');
  console.log(`[ssg-builder] ✅  Injected static body into: ${htmlFilePath}`);
  return true;
}

// ── Main SSG Execution ───────────────────────────────────────────────────
async function buildSSG() {
  console.log('[ssg-builder] 🚀  Starting SSR generation...\n');

  let render;
  try {
    // Find the hashed entry-server file in dist-server/assets
    const assetsDir = path.join(DIST_SERVER, 'assets');
    const files = fs.readdirSync(assetsDir);
    const entryFile = files.find(f => f.startsWith('entry-server.') && f.endsWith('.js'));
    
    if (!entryFile) {
      throw new Error(`Entry server not found in ${assetsDir}.`);
    }
    const entryServerPath = path.join(assetsDir, entryFile);
    const module = await import(new URL(`file://${entryServerPath}`).href);
    render = module.render;
  } catch (err) {
    console.error('[ssg-builder] ❌  Failed to load SSR entry point:', err);
    process.exit(1);
  }

  const BASE_EN_PATH = path.join(DIST, 'index.html');
  const BASE_ES_PATH = path.join(DIST, 'index.es.html');

  if (!fs.existsSync(BASE_EN_PATH) || !fs.existsSync(BASE_ES_PATH)) {
    console.error('[ssg-builder] ❌  Base templates missing. Did postbuild-seo.mjs run?');
    process.exit(1);
  }

  const BASE_EN_HTML = fs.readFileSync(BASE_EN_PATH, 'utf8');
  const BASE_ES_HTML = fs.readFileSync(BASE_ES_PATH, 'utf8');

  for (const url of publicRoutes) {
    console.log(`\n[ssg-builder] Rendering route: ${url}`);
    
    // Rutas de archivos finales
    const subPath = url === '/' ? '' : url.replace(/^\//, ''); // e.g. "casos" or "casos/elixir-games"
    const fileEN = subPath ? path.join(DIST, subPath, 'index.html') : path.join(DIST, 'index.html');
    const fileES = subPath ? path.join(DIST, subPath, 'index.es.html') : path.join(DIST, 'index.es.html');

    try {
      // 1. Renderizar la versión en Inglés
      const appHtmlEN = await render(url, 'en');
       // For base route, inject directly into the existing file on disk (which we just wrote or exist). Wait, no, for base route we also use memory but write it over the original file!
       // Let's just always use the memory template for all routes.
      injectBody(fileEN, appHtmlEN, BASE_EN_HTML);

      // 2. Renderizar la versión en Español
      const appHtmlES = await render(url, 'es');
      injectBody(fileES, appHtmlES, BASE_ES_HTML);

    } catch (err) {
      console.error(`[ssg-builder] ❌  Error rendering ${url}:`, err);
    }
  }

  console.log('\n[ssg-builder] ✅  SSR static body injection complete.');
  console.log('[ssg-builder] ℹ️   React will hydrate this HTML on first load.\n');
}

buildSSG();
