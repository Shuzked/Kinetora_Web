/**
 * postbuild-seo.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Post-build script that generates ES variants of all pre-rendered HTML files.
 *
 * After `vite build` + `vite-ssg` prerender, dist/ contains:
 *   dist/index.html          → EN homepage (kinetora.tech)
 *   dist/casos/index.html    → EN casos page (kinetora.tech/casos)
 *
 * This script generates:
 *   dist/index.es.html           → ES homepage (kinetora.es)
 *   dist/casos/index.es.html     → ES casos page (kinetora.es/casos)
 *
 * For each ES variant, this script:
 *   1. Overrides all <head> metadata (title, description, canonical, og:*, hreflang, JSON-LD)
 *   2. Swaps the i18n-bridge to "es" so the React app boots in Spanish
 *   3. Rewrites body text that was pre-rendered in EN → ES using string replacement
 *      (Hero h1, Services cards, Cases UI copy) from the hardcoded translations.
 *
 * Usage (automatic via package.json "postbuild"):
 *   node ./scripts/postbuild-seo.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// ── ES metadata ──────────────────────────────────────────────────────────────
const ES_HOME = {
  title: 'Kinetora | Diseño Web, Cartelería y Desarrollo de Interfaces en España',
  description: 'Estudio de diseño vanguardista. Creamos identidades visuales, webs interactivas y cartelería premium para clientes de toda España desde Priego de Córdoba.',
  keywords: 'agencia creativa, diseño web España, diseño web Andalucía, diseño web Priego de Córdoba, cartelería premium, branding, identidad de marca, diseño UX, UI, web performance, interfaces interactivas',
  canonical: 'https://kinetora.es/',
  ogUrl: 'https://kinetora.es/',
  ogLocale: 'es_ES',
  ogImage: 'https://kinetora.es/assets/social/kinetora-social-share.webp',
  ogImageAlt: 'Kinetora — Estudio de diseño web y branding en España',
  twitterImage: 'https://kinetora.es/assets/social/kinetora-social-share.webp',
};

const ES_CASOS = {
  title: 'Casos de éxito — Kinetora',
  description: 'Selección de proyectos donde diseñamos el sistema, el producto y la narrativa para acelerar crecimiento. Resultados medibles de clientes reales.',
  keywords: 'casos de éxito, portfolio, resultados, agencia creativa, diseño web, branding',
  canonical: 'https://kinetora.es/casos',
  ogUrl: 'https://kinetora.es/casos',
  ogLocale: 'es_ES',
  ogImage: 'https://kinetora.es/assets/social/kinetora-social-share.webp',
  ogImageAlt: 'Kinetora — Casos de éxito',
  twitterImage: 'https://kinetora.es/assets/social/kinetora-social-share.webp',
};

// ── JSON-LD payloads ─────────────────────────────────────────────────────────
const orgJsonLdES = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kinetora',
  url: 'https://kinetora.es/',
  logo: 'https://kinetora.es/Logotipo.svg',
  '@id': 'https://kinetora.es/#organization',
  areaServed: ['ES', 'España', 'Madrid', 'Barcelona', 'Sevilla', 'Andalucía', 'Valencia', 'Bilbao'],
  sameAs: ['https://www.linkedin.com/company/kinetora', 'https://www.instagram.com/kinetora_studio'],
};

const localJsonLdES = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Kinetora',
  image: 'https://kinetora.es/assets/social/kinetora-social-share.webp',
  '@id': 'https://kinetora.es/#professional-service',
  url: 'https://kinetora.es',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Priego de Córdoba',
    postalCode: '14800',
    addressRegion: 'Andalucía',
    addressCountry: 'ES',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 37.4381, longitude: -4.1942 },
  areaServed: ['ES', 'España', 'Madrid', 'Barcelona', 'Sevilla', 'Andalucía', 'Valencia', 'Bilbao'],
  description: ES_HOME.description,
  knowsAbout: ['Diseño Web', 'Branding', 'Cartelería', 'UX/UI', 'Identidad Visual', 'Desarrollo Frontend'],
  sameAs: ['https://www.linkedin.com/company/kinetora', 'https://www.instagram.com/kinetora_studio'],
};

// ── Body text swaps: EN → ES ─────────────────────────────────────────────────
// These match what vite-ssg rendered into the HTML body using the EN translations.
// We replace them with the correct Spanish copy so the baked .es.html is fully bilingual.
const BODY_SWAPS_HOME = [
  // Hero
  ['Design that converts', 'Diseño que convierte'],
  ['speed that scales', 'velocidad que escala'],
  ['We help you grow. We create your brand, your campaigns, and your platforms. Fast, drama-free, and results-driven.', 'Te ayudamos a crecer. Creamos tu marca, tus campañas y tus plataformas. Rápido, sin dramas y con resultados.'],
  ["LET'S TALK", 'CONTACTAR'],
  ['CASE STUDIES', 'ÉXITOS'],
  ['48H DELIVERY', 'ENTREGA EN 48H'],
  ['UNLIMITED REVISIONS', 'REVISIONES ILIMITADAS'],
  ['FIXED MONTHLY PRICE', 'PRECIO MENSUAL FIJO'],
  // Services
  ['CAPABILITIES', 'CAPACIDADES'],
  ['ALL THE VISUAL POWER', 'TODO EL MÚSCULO VISUAL'],
  ['YOUR STARTUP NEEDS', 'QUE TU STARTUP NECESITA'],
  ['Brand, product, web and content — with a system that keeps quality and consistency at scale.', 'Branding, producto, web y contenido — con un sistema que mantiene calidad y consistencia a escala.'],
  ['GRAPHIC DESIGN &amp; BRANDING', 'DISEÑO GRÁFICO Y BRANDING'],
  ['Beyond the logo, I build comprehensive brand identities', 'Más allá del logotipo, construyo identidades de marca completas'],
  ['UX/UI &amp; WEB DESIGN', 'DISEÑO UX/UI Y WEB'],
  ['Crafting landing pages, e-commerce, and full Design Systems', 'Creación de páginas, tiendas online y Sistemas de Diseño'],
  ['VIDEO &amp; MULTIMEDIA', 'MULTIMEDIA Y VÍDEO'],
  ['Retention-focused editing for social platforms', 'Edición enfocada en la retención de audiencia'],
  ['CONTENT STRATEGY', 'ESTRATEGIA Y CONTENIDO'],
  ['Account scaling roadmaps, content production, and sharp, highly strategic copywriting.', 'Planificación para escalar cuentas, producción y un copywriting muy directo y estratégico.'],
];

const BODY_SWAPS_CASOS = [
  ['Case studies', 'Casos de éxito'],
  ['Real projects.', 'Proyectos reales.'],
  ['Measurable results', 'Resultados medibles'],
  ['A selection of projects where we designed the system, product and narrative to accelerate growth.', 'Selección de proyectos donde diseñamos el sistema, el producto y la narrativa para acelerar crecimiento.'],
  ['READ MORE', 'LEER MÁS'],
  ['Sales', 'Ventas realizadas'],
  ['Organic reach', 'Impacto orgánico'],
  ['Global Creative Direction', 'Dirección Creativa Global'],
  ['Global airdrop', 'Airdrop global'],
  ['Global launch', 'Lanzamiento global'],
  ['The leap to 3D', 'El gran salto al 3D'],
  ['Rebrand + UX/UI', 'Rebranding + UX/UI'],
  ['eSports campaign', 'Campaña eSports'],
  ['Web3 launch', 'Lanzamiento Web3'],
  ['Sales focus', 'Foco en ventas'],
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeTitle(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyHeadOverrides(html, meta, jsonLdBlocks) {
  // lang attribute
  html = html.replace(/<html[^>]*>/, '<html lang="es">');
  // i18n-bridge: swap "en" → "es" (injected by vite-ssg onPageRendered hook)
  html = html.replace(/window\.__KINETORA_LANG__\s*=\s*["']en["']/, 'window.__KINETORA_LANG__="es"');
  // title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeTitle(meta.title)}</title>`);
  // meta name="title"
  html = html.replace(/(<meta name="title" content=")[^"]*(")/,  `$1${escapeAttr(meta.title)}$2`);
  // meta name="description"
  html = html.replace(/(<meta name="description" content=")[^"]*(")/,  `$1${escapeAttr(meta.description)}$2`);
  // meta name="keywords"
  html = html.replace(/(<meta name="keywords" content=")[^"]*(")/,  `$1${escapeAttr(meta.keywords)}$2`);
  // og:title
  html = html.replace(/(property="og:title" content=")[^"]*(")/,  `$1${escapeAttr(meta.title)}$2`);
  // og:description
  html = html.replace(/(property="og:description" content=")[^"]*(")/,  `$1${escapeAttr(meta.description)}$2`);
  // og:url
  html = html.replace(/(property="og:url" content=")[^"]*(")/g,  `$1${meta.ogUrl}$2`);
  // og:image
  html = html.replace(/(property="og:image" content=")[^"]*(")/g,  `$1${meta.ogImage}$2`);
  // og:image:alt
  html = html.replace(/(property="og:image:alt" content=")[^"]*(")/,  `$1${escapeAttr(meta.ogImageAlt)}$2`);
  // og:locale
  html = html.replace(/(property="og:locale" content=")[^"]*(")/g,  `$1${meta.ogLocale}$2`);
  // twitter:title
  html = html.replace(/(name="twitter:title" content=")[^"]*(")/,  `$1${escapeAttr(meta.title)}$2`);
  // twitter:description
  html = html.replace(/(name="twitter:description" content=")[^"]*(")/,  `$1${escapeAttr(meta.description)}$2`);
  // twitter:image
  html = html.replace(/(name="twitter:image" content=")[^"]*(")/g,  `$1${meta.twitterImage}$2`);
  // canonical
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${meta.canonical}"`);

  // Strip EN JSON-LD static blocks and inject ES ones
  html = html.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '');
  const esJsonLdBlock = jsonLdBlocks
    .map((ld, i) => `<script type="application/ld+json" id="jsonld-es-${i}">\n${JSON.stringify(ld, null, 2)}\n</script>`)
    .join('\n');
  html = html.replace('</head>', `${esJsonLdBlock}\n</head>`);

  return html;
}

function applyBodySwaps(html, swaps) {
  for (const [en, es] of swaps) {
    html = html.split(en).join(es);
  }
  return html;
}

function processFile(srcPath, destPath, meta, jsonLdBlocks, bodySwaps) {
  if (!fs.existsSync(srcPath)) {
    console.warn(`[postbuild-seo] ⚠️  Skipping (not found): ${srcPath}`);
    return;
  }
  let html = fs.readFileSync(srcPath, 'utf8');
  html = applyHeadOverrides(html, meta, jsonLdBlocks);
  html = applyBodySwaps(html, bodySwaps);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, html, 'utf8');
  console.log(`[postbuild-seo] ✅  Generated: ${destPath}`);
  console.log(`[postbuild-seo]     Title: ${meta.title}`);
  console.log(`[postbuild-seo]     Canonical: ${meta.canonical}`);
}

// ── Run ───────────────────────────────────────────────────────────────────────
console.log('[postbuild-seo] 🚀  Starting ES variant generation...\n');

// 1. Homepage
processFile(
  path.join(DIST, 'index.html'),
  path.join(DIST, 'index.es.html'),
  ES_HOME,
  [orgJsonLdES, localJsonLdES],
  BODY_SWAPS_HOME,
);

// 2. /casos page
processFile(
  path.join(DIST, 'casos', 'index.html'),
  path.join(DIST, 'casos', 'index.es.html'),
  ES_CASOS,
  [orgJsonLdES],
  BODY_SWAPS_CASOS,
);

console.log('\n[postbuild-seo] ✅  All ES variants generated successfully.');
