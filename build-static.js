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

const { routes } = require('./routes.config.js');

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
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
  };
}

// JSON-LD: WebSite schema with SearchAction
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

// JSON-LD: FAQPage schema for home page
function buildFAQSchema(lang) {
  const isES = lang === 'es';
  const faqs = isES ? [
    {
      q: "¿Cómo funciona el sistema de pausas?",
      a: "Si tienes un mes con menos volumen de trabajo, puedes pausar tu suscripción con un clic y guardar los días restantes para el futuro. Preferimos que congeles tu plan antes de que canceles."
    },
    {
      q: "¿Hay permanencia o costes ocultos?",
      a: "No. Creemos que la única razón para que te quedes debe ser la calidad de nuestro trabajo, no un trozo de papel. Los planes se facturan mes a mes y puedes cancelar cuando quieras con 30 días de aviso."
    },
    {
      q: "¿Qué implica exactamente la entrega en 48 horas?",
      a: "Una vez que defines una solicitud de diseño clara en nuestro panel, recibirás la primera iteración funcional o el componente terminado en un plazo máximo de 48 horas laborables."
    },
    {
      q: "¿Cedéis los derechos de propiedad intelectual (IP)?",
      a: "Sí. Una vez abonada la factura mensual, todos los diseños y el código de interfaz son 100% de tu propiedad. No hay licencias ocultas ni restricciones de uso posteriores."
    },
    {
      q: "¿Qué incluye la \"Identidad de Marca\"?",
      a: "Va mucho más allá de un logo. Entregamos un manual de marca completo, paletas tipográficas, componentes UI en Figma y aplicaciones listas para marketing."
    },
    {
      q: "¿Trabajáis exclusivamente en Web3 y Gaming?",
      a: "Aunque destacamos en Web3 y gaming, nuestro enfoque de diseño orientado a conversión aplica perfectamente a startups SaaS, Fintech y Healthtech."
    },
    {
      q: "¿Asumís el desarrollo Backend del producto?",
      a: "Somos especialistas en la capa visual. Entregamos diseño UX/UI premium y desarrollo Frontend en React o Tailwind. El Backend corre a cargo de tu equipo."
    },
    {
      q: "¿Trabajáis con proyectos Pre-Seed?",
      a: "Trabajamos principalmente con startups Seed y Series A/B que buscan escalar rápido. Sin embargo, aceptamos proyectos Pre-Seed si la visión tecnológica está clara."
    }
  ] : [
    {
      q: "How does the subscription pause system work?",
      a: "If you have a month with less design work, you can pause your subscription with one click and save the remaining days for the future. We'd rather you pause your plan than cancel."
    },
    {
      q: "Is there a minimum stay or hidden costs?",
      a: "No. We believe the only reason you should stay is the quality of our work, not a piece of paper. Plans are billed monthly and you can cancel anytime with 30 days notice."
    },
    {
      q: "What exactly does 48-hour delivery entail?",
      a: "Once you submit a clear design request on your dashboard, you will receive the first functional iteration or finished component within a maximum of 48 business hours."
    },
    {
      q: "Do you transfer Intellectual Property (IP) rights?",
      a: "Yes. Once payment is made, all designs and interface code are 100% yours. No hidden licenses or post-delivery restrictions."
    },
    {
      q: "What does \"Brand Identity\" include?",
      a: "It goes far beyond a logo. We deliver a complete brand manual, typography palettes, UI components in Figma, and marketing-ready assets."
    },
    {
      q: "Do you work exclusively in Web3 and Gaming?",
      a: "While we excel in Web3 and gaming, our conversion-oriented design focus translates perfectly to SaaS, Fintech, and Healthtech startups."
    },
    {
      q: "Do you handle the Backend development of the product?",
      a: "We are specialists in the visual layer. We deliver premium UX/UI design and high-quality Frontend code (React/Tailwind). Backend development is handled by your engineering team."
    },
    {
      q: "Do you work with Pre-Seed projects?",
      a: "Our optimal partners are Seed and Series A/B startups looking to scale. However, we evaluate Pre-Seed projects if the product roadmap and scope are clearly defined."
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

// JSON-LD: Service schemas for Home
function buildServicesSchema(lang) {
  const isES = lang === 'es';
  const providerUrl = isES ? ORIGIN_ES : ORIGIN_EN;
  const services = isES ? [
    {
      "@type": "Service",
      "name": "Identidad de marca estratégica",
      "description": "Un branding profesional que te posiciona como líder del sector y genera confianza inmediata en fondos de capital riesgo.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kinetora",
        "url": providerUrl
      }
    },
    {
      "@type": "Service",
      "name": "Sistemas de diseño escalables",
      "description": "Una librería centralizada de componentes visuales en Figma y código para que tus desarrolladores programen nuevas funciones sin perder tiempo ni consistencia.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kinetora",
        "url": providerUrl
      }
    },
    {
      "@type": "Service",
      "name": "Diseño web enfocado a conversión",
      "description": "Páginas web ultrarrápidas y optimizadas para cargar al instante y convertir visitantes en usuarios activos.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kinetora",
        "url": providerUrl
      }
    },
    {
      "@type": "Service",
      "name": "Narrativas de inversión (Pitch Decks)",
      "description": "Presentaciones estratégicas que traducen hojas de ruta tecnológicas complejas en historias claras e invertibles.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kinetora",
        "url": providerUrl
      }
    }
  ] : [
    {
      "@type": "Service",
      "name": "Strategic Brand Identity",
      "description": "Pitch-ready branding that positions you as an industry leader and builds instant trust with top-tier venture funds.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kinetora",
        "url": providerUrl
      }
    },
    {
      "@type": "Service",
      "name": "Scalable Design Systems",
      "description": "A centralized library of ready-to-use visual components in Figma and code, so your developers can build features faster without losing quality.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kinetora",
        "url": providerUrl
      }
    },
    {
      "@type": "Service",
      "name": "Conversion-Led Web Design",
      "description": "High-speed landing pages engineered to load instantly and turn visitors into active users.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kinetora",
        "url": providerUrl
      }
    },
    {
      "@type": "Service",
      "name": "Capital Narratives (Pitch Decks)",
      "description": "Presentation decks that translate complex technology and business roadmaps into clear, investable stories.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kinetora",
        "url": providerUrl
      }
    }
  ];
  return services;
}

// JSON-LD: BreadcrumbList schema for internal pages
function buildBreadcrumbSchema(route, lang) {
  const isES = lang === 'es';
  const origin = isES ? ORIGIN_ES : ORIGIN_EN;
  const parts = route.path.split('/').filter(Boolean);
  
  const itemListElement = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": isES ? "Inicio" : "Home",
      "item": origin
    }
  ];

  let currentPath = '';
  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    let name = part.charAt(0).toUpperCase() + part.slice(1);
    if (part === 'casos') name = isES ? "Casos de Estudio" : "Case Studies";
    else if (part === 'precios') name = isES ? "Precios" : "Pricing";
    else if (part === 'sobre') name = isES ? "Sobre el Estudio" : "About";
    else if (part === 'legal') name = isES ? "Legal" : "Legal";
    else if (part === 'aviso-legal') name = isES ? "Aviso Legal" : "Legal Notice";
    else if (part === 'politica-privacidad') name = isES ? "Política de Privacidad" : "Privacy Policy";
    else if (part === 'politica-cookies') name = isES ? "Política de Cookies" : "Cookie Policy";
    else if (part === 'privacidad-redes-sociales') name = isES ? "Redes Sociales" : "Social Media";
    else if (part === 'elixir-games') name = "Elixir Games";
    else if (part === 'dunk-low-elixir-edition') name = "Dunk Low Elixir";
    else if (part === 'elixir-token') name = "Elixir Token";
    else if (part === 'chronosworlds') name = "ChronosWorlds";
    else if (part === 'cybertitans-pulse-series') name = "CyberTitans Pulse";
    else if (part === 'cybertitans-clash') name = "CyberTitans Clash";
    else if (part === 'robokiden-token') name = "RoboKiden Token";

    itemListElement.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `${origin}${currentPath}`
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
}

// JSON-LD: CreativeWork schema for case studies
function buildCreativeWorkSchema(route, lang) {
  const isES = lang === 'es';
  const origin = isES ? ORIGIN_ES : ORIGIN_EN;
  const slug = route.path.replace('/casos/', '');
  
  let clientName = '';
  let description = '';
  let result = '';
  
  if (slug === 'elixir-games') {
    clientName = "Elixir Games";
    description = isES ? "Diseño de ecosistema global de marca y producto." : "Global brand ecosystem and product design.";
    result = isES ? "+14M$ levantados" : "+$14M raised";
  } else if (slug === 'dunk-low-elixir-edition') {
    clientName = "Dunk Low Elixir";
    description = isES ? "Campaña de lanzamiento y landing con experiencia premium." : "Launch campaign and landing page with premium experience.";
    result = isES ? "Sold out en 48h" : "Sold out in 48h";
  } else if (slug === 'elixir-token') {
    clientName = "Elixir Token";
    description = isES ? "Estrategia visual y creatividades de marketing para lanzamiento global." : "Visual strategy and marketing assets for global launch.";
    result = isES ? "+14,2M$ levantados" : "+$14.2M raised";
  } else if (slug === 'chronosworlds') {
    clientName = "ChronosWorlds";
    description = isES ? "Rebranding estratégico, diseño UX/UI de plataforma y pitch deck." : "Strategic rebranding, platform UX/UI and pitch deck.";
    result = isES ? "Tráfico récord x3" : "3x record traffic";
  } else if (slug === 'cybertitans-pulse-series') {
    clientName = "CyberTitans Pulse";
    description = isES ? "Identidad visual y contenido de redes para torneo competitivo." : "Visual identity and social content for competitive tournament.";
    result = isES ? "1.4M de alcance" : "1.4M reach";
  } else if (slug === 'cybertitans-clash-impacto-brutal-y-evolucion-web3') {
    clientName = "CyberTitans Clash";
    description = isES ? "Sistema visual, UI/UX de producto y activos de retención Web3." : "Visual system, product UI/UX and Web3 retention assets.";
    result = isES ? "1.5M de alcance" : "1.5M reach";
  } else if (slug === 'robokiden-token') {
    clientName = "RoboKiden Token";
    description = isES ? "Branding, UX/UI orientado a conversión y dirección de arte." : "Branding, conversion-oriented UX/UI and art direction.";
    result = isES ? "+1.15M$ en ventas" : "+$1.15M in sales";
  }

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `${clientName} Case Study`,
    "headline": isES ? `${clientName}: Caso de Estudio de Diseño` : `${clientName}: Design Case Study`,
    "description": description,
    "creator": {
      "@type": "Organization",
      "name": "Kinetora",
      "url": origin
    },
    "customer": {
      "@type": "Organization",
      "name": clientName
    },
    "keywords": "Branding, UX/UI, Web3 Design, Conversion optimization",
    "award": result
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
  
  let additionalSchemas = '';
  if (route.path === '/') {
    additionalSchemas += `\n    <script type="application/ld+json">${JSON.stringify(buildFAQSchema(lang))}</script>`;
    additionalSchemas += `\n    <script type="application/ld+json">${JSON.stringify(buildServicesSchema(lang))}</script>`;
  } else {
    // Internal pages get BreadcrumbList schema
    additionalSchemas += `\n    <script type="application/ld+json">${JSON.stringify(buildBreadcrumbSchema(route, lang))}</script>`;
    
    // Case studies also get CreativeWork schema
    if (route.path.startsWith('/casos/')) {
      additionalSchemas += `\n    <script type="application/ld+json">${JSON.stringify(buildCreativeWorkSchema(route, lang))}</script>`;
    }
  }

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
    <script type="application/ld+json">${jsonLdSite}</script>${additionalSchemas}
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

// .htaccess for Hostinger SPA routing + caching — production-grade
const htaccess = `# Auto-generated by build-static.js — Kinetora cache strategy

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Force HTTPS (Hostinger ya lo hace, pero por si acaso)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

  # Serve existing files and directories as-is
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Pretty URLs: try /path/index.html first
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)$ $1/index.html [L]

  # SPA fallback for any unmatched route (lets React Router take over)
  RewriteRule ^ index.html [L]
</IfModule>

<IfModule mod_headers.c>
  # HTML — cache corta porque siempre puede cambiar
  <FilesMatch "\\.html$">
    Header set Cache-Control "public, max-age=300, must-revalidate"
    Header set X-Content-Type-Options "nosniff"
  </FilesMatch>

  # Hashed assets (Vite los genera con hash en el nombre) — cache eterno
  <FilesMatch "\\.(js|css)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # Imágenes y fuentes
  <FilesMatch "\\.(webp|avif|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf|eot)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # JSON y XML (sitemap, robots) — cache media
  <FilesMatch "\\.(xml|json|txt)$">
    Header set Cache-Control "public, max-age=3600"
  </FilesMatch>

  # Security headers
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Compresión gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript
  AddOutputFilterByType DEFLATE application/javascript application/json application/xml
  AddOutputFilterByType DEFLATE image/svg+xml application/x-font-ttf font/otf font/woff font/woff2
</IfModule>

# Errores personalizados — la SPA maneja el 404 internamente
ErrorDocument 404 /index.html
`;
// Escribir .htaccess en la raíz de dist (para kinetora.tech)
fs.writeFileSync(path.join(distPath, '.htaccess'), htaccess, 'utf8');
console.log('Generated dist/.htaccess');

// Escribir .htaccess también en dist/es (para kinetora.es)
const esDistPath = path.join(distPath, 'es');
if (fs.existsSync(esDistPath)) {
  fs.writeFileSync(path.join(esDistPath, '.htaccess'), htaccess, 'utf8');
  console.log('Generated dist/es/.htaccess');
}

console.log('\nBuild complete.');
console.log(`- Upload contents of "${distPath}" to kinetora.tech root.`);
console.log(`- Upload contents of "${path.join(distPath, 'es')}" to kinetora.es root.`);
module.exports = { routes }; // Export routes to share it in Fase 2!
