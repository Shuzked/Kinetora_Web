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
  'cybertitans-clash',
  'robokiden-token'
];

const publicRoutes = [
  '/',
  '/casos',
  ...caseStudiesSlugs.map(slug => `/casos/${slug}`),
  '/precios',
  '/sobre',
  '/legal/aviso-legal',
  '/legal/politica-privacidad',
  '/legal/politica-cookies',
  '/legal/privacidad-redes-sociales'
];

// ── Quirky Cleaning Utilities (Senior SEO Shield) ────────────────────────
function cleanTemplateHead(html) {
  // Purgar etiquetas SEO del template base de Vite para evitar duplicados
  return html
    .replace(/<title[^>]*>.*?<\/title>/gi, '')
    .replace(/<meta [^>]*name="(description|keywords|title|robots|viewport)"[^>]*>/gi, '')
    .replace(/<meta [^>]*property="(og|twitter):[^>]*"[^>]*>/gi, '')
    .replace(/<meta [^>]*name="twitter:[^>]*"[^>]*>/gi, '')
    .replace(/<link [^>]*rel="(canonical|alternate)"[^>]*>/gi, '')
    .replace(/<script [^>]*type="application\/ld\+json">.*?<\/script>/gi, '');
}

function purgeBodyLeakedTags(bodyHtml) {
  // Purgar etiquetas que React 19 inyecta por error en el body durante renderToString
  // Incluimos cualquier metadato, título o link que haya quedado atrapado
  return bodyHtml
    .replace(/<title[^>]*>.*?<\/title>/gi, '')
    .replace(/<meta [^>]*>/gi, '')
    .replace(/<link [^>]*rel="(canonical|alternate)"[^>]*>/gi, '');
}

// Helper to inject the rendered HTML into the template
function injectBody(htmlFilePath, bodyHtml, templatePath, templateContent) {
  let html;
  
  if (templateContent) {
    html = templateContent;
    if (htmlFilePath) {
      fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });
    }
  } else if (templatePath && fs.existsSync(templatePath)) {
    html = fs.readFileSync(templatePath, 'utf8');
    fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });
  } else if (fs.existsSync(htmlFilePath)) {
    html = fs.readFileSync(htmlFilePath, 'utf8');
  } else {
    console.warn(`[ssg-builder] ⚠️  Skipping (file not found): ${htmlFilePath}`);
    return false;
  }

  // Purgar el body antes de inyectar
  const cleanBody = purgeBodyLeakedTags(bodyHtml);

  // Regex robusta para encontrar el div#root y reemplazar su contenido
  // Soporta <div id="root">...</div> con cualquier contenido previo
  const rootRegex = /(<div\s+id="root"[^>]*>)([\s\S]*?)(<\/div>)/i;
  
  if (rootRegex.test(html)) {
    html = html.replace(rootRegex, `$1${cleanBody}$3`);
  } else {
    console.warn(`[ssg-builder] ⚠️  No <div id="root"> found in template for ${htmlFilePath}`);
  }

  return html;
}

function injectMetadata(html, headHtml) {
  // Primero limpiamos el head de la basura genérica
  const cleanedHtml = cleanTemplateHead(html);

  if (cleanedHtml.includes('<!-- SSR_HEAD_PLACEHOLDER -->')) {
    return cleanedHtml.replace('<!-- SSR_HEAD_PLACEHOLDER -->', headHtml);
  }
  // Fallback if Vite removed the comment (common in production)
  if (cleanedHtml.includes('</head>')) {
    return cleanedHtml.replace('</head>', `${headHtml}\n  </head>`);
  }
  return cleanedHtml;
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
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('[ssg-builder] ❌  Base templates missing. Did postbuild-seo.mjs run?');
    process.exit(1);
  }

  // El template base SIEMPRE debe ser el index.html original de dist para asegurar limpieza
  const CLEAN_BASE_PATH = path.join(DIST, 'index.html');
  const CLEAN_TEMPLATE = fs.readFileSync(CLEAN_BASE_PATH, 'utf8');

  for (const url of publicRoutes) {
    console.log(`\n[ssg-builder] Rendering route: ${url}`);
    
    const subPath = url === '/' ? '' : url.replace(/^\//, '');
    const fileEN = subPath ? path.join(DIST, subPath, 'index.html') : path.join(DIST, 'index.html');
    const fileES = subPath ? path.join(DIST, subPath, 'index.es.html') : path.join(DIST, 'index.es.html');

    try {
      // 1. Renderizar la versión en Inglés
      const { html: appHtmlEN, head: headHtmlEN } = await render(url, 'en');
      let finalHtmlEN = injectBody(fileEN, appHtmlEN, null, CLEAN_TEMPLATE); 
      finalHtmlEN = injectMetadata(finalHtmlEN, headHtmlEN);
      
      if (subPath) fs.mkdirSync(path.join(DIST, subPath), { recursive: true });
      fs.writeFileSync(fileEN, finalHtmlEN, 'utf8');
      console.log(`[ssg-builder] ✅  Injected static EN into: ${fileEN}`);

      // 2. Renderizar la versión en Español
      const { html: appHtmlES, head: headHtmlES } = await render(url, 'es');
      let finalHtmlES = injectBody(fileES, appHtmlES, null, CLEAN_TEMPLATE);
      finalHtmlES = injectMetadata(finalHtmlES, headHtmlES);
      
      // Asegurar que el bridge de idioma esté correcto para ES
      if (finalHtmlES.includes('window.__KINETORA_LANG__="en"')) {
        finalHtmlES = finalHtmlES.replace('window.__KINETORA_LANG__="en"', 'window.__KINETORA_LANG__="es"');
      } else {
        // Inyectar si no existe
        finalHtmlES = finalHtmlES.replace('</head>', '<script>window.__KINETORA_LANG__="es"</script></head>');
      }

      fs.writeFileSync(fileES, finalHtmlES, 'utf8');
      console.log(`[ssg-builder] ✅  Injected static ES into: ${fileES}`);

    } catch (err) {
      console.error(`[ssg-builder] ❌  Error rendering ${url}:`, err);
    }
  }

  console.log('\n[ssg-builder] ✅  SSR static body injection complete.');
  console.log('[ssg-builder] ℹ️   React will hydrate this HTML on first load.\n');

  // ── Generar Sitemap ──────────────────────────────────────────────────────
  generateSitemap(publicRoutes);
}

function generateSitemap(routes) {
  const TECH_BASE = 'https://kinetora.tech';
  const ES_BASE = 'https://kinetora.es';
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  routes.forEach(route => {
    const path = route === '/' ? '' : route;
    
    // EN Entry (Tech)
    xml += '  <url>\n';
    xml += `    <loc>${TECH_BASE}${path}</loc>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${TECH_BASE}${path}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="es" href="${ES_BASE}${path}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${TECH_BASE}${path}" />\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';

    // ES Entry (ES)
    xml += '  <url>\n';
    xml += `    <loc>${ES_BASE}${path}</loc>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="es" href="${ES_BASE}${path}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${TECH_BASE}${path}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${TECH_BASE}${path}" />\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  const sitemapPath = path.join(DIST, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`[ssg-builder] ✅  Generated sitemap.xml in ${sitemapPath}`);
}

buildSSG();
