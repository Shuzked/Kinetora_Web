/**
 * build-static.js — Kinetora
 *
 * Genera versiones estáticas de index.html ya procesadas para cada ruta del sitemap.
 * Reemplaza <!-- SSR_HEAD_PLACEHOLDER --> con meta tags localizados (ES/EN)
 * para que Hostinger (o cualquier hosting estático) sirva HTML completo a los crawlers.
 *
 * Resultado: /dist/index.html, /dist/casos/index.html, /dist/sobre/index.html, etc.
 * En Hostinger, configura el .htaccess para que sirva esos archivos según la URL.
 */

const fs = require('fs');
const path = require('path');

// ---------- Helpers ----------
function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const lStat = fs.lstatSync(path.join(from, element));
    if (lStat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (lStat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ---------- Config ----------
const distPath = path.join(__dirname, 'dist');
const ORIGIN_EN = 'https://kinetora.tech';
const ORIGIN_ES = 'https://kinetora.es';

const routes = require('./routes.config.js');

// JSON-LD: Organization schema (shared)
function buildOrganizationSchema(lang) {
  const isES = lang === 'es';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kinetora',
    url: isES ? ORIGIN_ES : ORIGIN_EN,
    logo: `${isES ? ORIGIN_ES : ORIGIN_EN}/Logotipo.svg`,
    description: isES
      ? 'Estudio de diseño premium para startups que levantan capital y convierten usuarios.'
      : 'Premium design studio for startups raising capital and converting users.',
    sameAs: [
      // Pon aquí las URLs reales de tus redes sociales
      // 'https://www.linkedin.com/company/kinetora',
      // 'https://www.instagram.com/kinetora',
      // 'https://twitter.com/kinetora',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
  };
}

// JSON-LD: WebSite schema with SearchAction (optional, helps AEO understanding)
function buildWebSiteSchema(lang) {
  const isES = lang === 'es';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kinetora',
    url: isES ? ORIGIN_ES : ORIGIN_EN,
    inLanguage: isES ? 'es-ES' : 'en-US',
  };
}

// Builds the head tags block to replace SSR_HEAD_PLACEHOLDER
function buildSeoBlock(route, lang) {
  const isES = lang === 'es';
  const data = isES ? route.es : route.en;
  const originSelf = isES ? ORIGIN_ES : ORIGIN_EN;
  const originAlt = isES ? ORIGIN_EN : ORIGIN_ES;
  const urlSelf = `${originSelf}${route.path === '/' ? '/' : route.path}`;
  const urlAlt = `${originAlt}${route.path === '/' ? '/' : route.path}`;

  const jsonLdOrg = JSON.stringify(buildOrganizationSchema(lang));
  const jsonLdSite = JSON.stringify(buildWebSiteSchema(lang));

  return `
    <title>${data.title}</title>
    <meta name="description" content="${data.description}" />
    <link rel="canonical" href="${urlSelf}" />

    <meta property="og:title" content="${data.title}" />
    <meta property="og:description" content="${data.description}" />
    <meta property="og:url" content="${urlSelf}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${isES ? 'es_ES' : 'en_US'}" />
    <meta property="og:site_name" content="Kinetora" />
    <meta property="og:image" content="${originSelf}/og-default.jpg" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${data.title}" />
    <meta name="twitter:description" content="${data.description}" />
    <meta name="twitter:image" content="${originSelf}/og-default.jpg" />

    <link rel="alternate" hreflang="${isES ? 'es' : 'en'}" href="${urlSelf}" />
    <link rel="alternate" hreflang="${isES ? 'en' : 'es'}" href="${urlAlt}" />
    <link rel="alternate" hreflang="x-default" href="${ORIGIN_EN}${route.path === '/' ? '/' : route.path}" />

    <script id="i18n-bridge">window.__KINETORA_LANG__ = "${lang}";</script>

    <script type="application/ld+json">${jsonLdOrg}</script>
    <script type="application/ld+json">${jsonLdSite}</script>
  `.trim();
}

// ---------- Build ----------
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(distPath, { recursive: true });

const indexHtmlPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('ERROR: index.html not found at project root.');
  process.exit(1);
}
const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Static top-level assets
const filesToCopy = [
  'Logotipo.svg',
  'favicon.svg',
  'Favicon_Kinetora.png',
  'robots.txt',
  'sitemap.xml',
  'vercel.json',
];
filesToCopy.forEach(file => {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distPath, file));
    console.log(`Copied ${file} to dist/`);
  }
});

// Assets folder
if (fs.existsSync(path.join(__dirname, 'assets'))) {
  copyFolderSync(path.join(__dirname, 'assets'), path.join(distPath, 'assets'));
  console.log('Copied assets/ folder to dist/');
}

// Generate per-route HTML files (EN on kinetora.tech, ES on kinetora.es)
// On Hostinger, you'll have one site per domain, so we emit both variants
// in subfolders /en/ and /es/ for safety, and the localized routes in their
// own subfolders for clean URLs.
function emit(filePath, html) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated ${path.relative(distPath, filePath)}`);
}

routes.forEach(route => {
  // English variant
  const enHtml = baseHtml
    .replace('<!-- SSR_HEAD_PLACEHOLDER -->', buildSeoBlock(route, 'en'))
    .replace(/<html lang="[^"]*">/, '<html lang="en">');
  // Spanish variant
  const esHtml = baseHtml
    .replace('<!-- SSR_HEAD_PLACEHOLDER -->', buildSeoBlock(route, 'es'))
    .replace(/<html lang="[^"]*">/, '<html lang="es">');

  // The site you deploy on kinetora.tech receives EN at the root,
  // the site on kinetora.es receives ES at the root.
  // We emit two trees: /dist/ (EN root) and /dist-es/ (ES root) for clarity.
  // Adjust to your deployment pipeline.

  // EN tree (root of dist/)
  const enFile = route.path === '/'
    ? path.join(distPath, 'index.html')
    : path.join(distPath, route.path.replace(/^\//, ''), 'index.html');
  emit(enFile, enHtml);

  // ES tree (under /dist/es/ for now; if you have a second hosting,
  // copy the contents of /dist/es/ to the root of kinetora.es)
  const esFile = route.path === '/'
    ? path.join(distPath, 'es', 'index.html')
    : path.join(distPath, 'es', route.path.replace(/^\//, ''), 'index.html');
  emit(esFile, esHtml);
});

// .htaccess for Hostinger SPA routing + caching
const htaccess = `# Auto-generated by build-static.js
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Serve existing files and directories as-is
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Pretty URLs: try .html or /index.html before SPA fallback
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)$ $1/index.html [L]

  # SPA fallback for any unmatched route (lets React Router take over)
  RewriteRule ^ index.html [L]
</IfModule>

<IfModule mod_headers.c>
  # Long cache for hashed assets
  <FilesMatch "\\\.(js|css|woff2|webp|avif|png|jpg|jpeg|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  # Short cache for HTML so updates propagate fast
  <FilesMatch "\\\.html$">
    Header set Cache-Control "public, max-age=300, must-revalidate"
  </FilesMatch>
</IfModule>

# Compress text responses
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json image/svg+xml
</IfModule>
`;
fs.writeFileSync(path.join(distPath, '.htaccess'), htaccess, 'utf8');
console.log('Generated .htaccess');

console.log('\nBuild complete.');
console.log(`- Upload contents of "${distPath}" to kinetora.tech root.`);
console.log(`- Upload contents of "${path.join(distPath, 'es')}" to kinetora.es root.`);
module.exports = { routes }; // Export routes to share it in Fase 2!
