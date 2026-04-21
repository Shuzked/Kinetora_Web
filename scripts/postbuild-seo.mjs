/**
 * postbuild-seo.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Post-build script that generates `dist/index.es.html` from `dist/index.html`.
 *
 * Purpose:
 *   After `vite build`, dist/index.html contains static EN metadata (kinetora.tech).
 *   This script creates a sibling file with all metadata overridden to Spanish (kinetora.es),
 *   including title, description, keywords, OG tags, canonical, hreflang, og:locale,
 *   and a full JSON-LD block (Organization + ProfessionalService with geomarketing).
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

const SRC = path.join(DIST, 'index.html');
const DEST = path.join(DIST, 'index.es.html');

// ── ES metadata ──────────────────────────────────────────────────────────────
const ES = {
  title: 'Kinetora | Diseño Web, Cartelería y Desarrollo de Interfaces en España',
  description:
    'Estudio de diseño vanguardista. Creamos identidades visuales, webs interactivas y cartelería premium para clientes de toda España desde Priego de Córdoba.',
  keywords:
    'agencia creativa, diseño web España, diseño web Andalucía, diseño web Priego de Córdoba, cartelería premium, branding, identidad de marca, diseño UX, UI, web performance, interfaces interactivas',
  canonical: 'https://kinetora.es/',
  ogUrl: 'https://kinetora.es/',
  ogLocale: 'es_ES',
  ogImage: 'https://kinetora.es/assets/social/kinetora-social-share.webp',
  ogImageAlt: 'Kinetora — Estudio de diseño web y branding en España',
  twitterImage: 'https://kinetora.es/assets/social/kinetora-social-share.webp',
};

// ── JSON-LD payloads ─────────────────────────────────────────────────────────
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kinetora',
  url: 'https://kinetora.es/',
  logo: 'https://kinetora.es/Logotipo.svg',
  '@id': 'https://kinetora.es/#organization',
  areaServed: ['ES', 'España', 'Madrid', 'Barcelona', 'Sevilla', 'Andalucía', 'Valencia', 'Bilbao'],
  sameAs: [
    'https://www.linkedin.com/company/kinetora',
    'https://www.instagram.com/kinetora_studio',
  ],
};

const localJsonLd = {
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.4381,
    longitude: -4.1942,
  },
  areaServed: ['ES', 'España', 'Madrid', 'Barcelona', 'Sevilla', 'Andalucía', 'Valencia', 'Bilbao'],
  description: ES.description,
  knowsAbout: [
    'Diseño Web',
    'Branding',
    'Cartelería',
    'UX/UI',
    'Identidad Visual',
    'Desarrollo Frontend',
  ],
  sameAs: [
    'https://www.linkedin.com/company/kinetora',
    'https://www.instagram.com/kinetora_studio',
  ],
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeTitle(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Main ─────────────────────────────────────────────────────────────────────
if (!fs.existsSync(SRC)) {
  console.error(`[postbuild-seo] ERROR: ${SRC} not found. Run "vite build" first.`);
  process.exit(1);
}

let html = fs.readFileSync(SRC, 'utf8');

// 1. lang attribute
html = html.replace(/<html[^>]*>/, '<html lang="es">');

// 2. title
html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeTitle(ES.title)}</title>`);

// 3. meta name="title"
html = html.replace(
  /(<meta name="title" content=")[^"]*(")/,
  `$1${escapeAttr(ES.title)}$2`
);

// 4. meta name="description"
html = html.replace(
  /(<meta name="description" content=")[^"]*(")/,
  `$1${escapeAttr(ES.description)}$2`
);

// 5. meta name="keywords"
html = html.replace(
  /(<meta name="keywords" content=")[^"]*(")/,
  `$1${escapeAttr(ES.keywords)}$2`
);

// 6. og:title
html = html.replace(
  /(property="og:title" content=")[^"]*(")/,
  `$1${escapeAttr(ES.title)}$2`
);

// 7. og:description
html = html.replace(
  /(property="og:description" content=")[^"]*(")/,
  `$1${escapeAttr(ES.description)}$2`
);

// 8. og:url
html = html.replace(/(property="og:url" content=")[^"]*(")/g, `$1${ES.ogUrl}$2`);

// 9. og:image
html = html.replace(/(property="og:image" content=")[^"]*(")/g, `$1${ES.ogImage}$2`);

// 10. og:image:alt
html = html.replace(
  /(property="og:image:alt" content=")[^"]*(")/,
  `$1${escapeAttr(ES.ogImageAlt)}$2`
);

// 11. og:locale
html = html.replace(/(property="og:locale" content=")[^"]*(")/g, `$1${ES.ogLocale}$2`);

// 12. twitter:title
html = html.replace(
  /(name="twitter:title" content=")[^"]*(")/,
  `$1${escapeAttr(ES.title)}$2`
);

// 13. twitter:description
html = html.replace(
  /(name="twitter:description" content=")[^"]*(")/,
  `$1${escapeAttr(ES.description)}$2`
);

// 14. twitter:image
html = html.replace(/(name="twitter:image" content=")[^"]*(")/g, `$1${ES.twitterImage}$2`);

// 15. canonical
html = html.replace(
  /<link rel="canonical" href="[^"]*"/,
  `<link rel="canonical" href="${ES.canonical}"`
);

// 16. Remove static EN JSON-LD and inject ES JSON-LD block before </head>
html = html.replace(
  /<script type="application\/ld\+json" id="org-jsonld-static">[\s\S]*?<\/script>/,
  '' // strip the EN static block
);

const esJsonLdBlock = `
    <!-- JSON-LD: Organization + ProfessionalService (kinetora.es / ES) -->
    <script type="application/ld+json" id="org-jsonld-es">
${JSON.stringify(orgJsonLd, null, 4)}
    </script>
    <script type="application/ld+json" id="professional-service-jsonld">
${JSON.stringify(localJsonLd, null, 4)}
    </script>`;

html = html.replace('</head>', `${esJsonLdBlock}\n</head>`);

// 17. i18n bridge for client-side detection (highest priority in I18nProvider)
html = html.replace('<head>', `<head>\n    <script id="i18n-bridge">window.__KINETORA_LANG__ = "es";</script>`);

// ── Write output ─────────────────────────────────────────────────────────────
fs.writeFileSync(DEST, html, 'utf8');

console.log(`[postbuild-seo] ✅  Generated: ${DEST}`);
console.log(`[postbuild-seo] ✅  Title ES:  ${ES.title}`);
console.log(`[postbuild-seo] ✅  Canonical: ${ES.canonical}`);
