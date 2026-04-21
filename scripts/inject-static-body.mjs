/**
 * inject-static-body.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Zero-dependency Node.js script that injects fully-rendered semantic HTML
 * into the <div id="root"> of each pre-built HTML file.
 *
 * WHY: Playwright/Chromium can't run on resource-limited hosting (Hostinger).
 * JSDOM can't execute modern React with Framer Motion / IntersectionObserver.
 * This script generates the critical SEO content directly as static strings —
 * the same way Jekyll or Hugo bake content at build time.
 *
 * WHAT it generates (semantic, indexable HTML):
 *   dist/index.html          → EN homepage (kinetora.tech)
 *   dist/casos/index.html    → EN casos page
 *   dist/index.es.html       → ES homepage (kinetora.es)  [via postbuild-seo]
 *   dist/casos/index.es.html → ES casos page              [via postbuild-seo]
 *
 * After injection, React mounts on top of this HTML on first load (SPA hydration).
 *
 * Run after vite build + postbuild-seo:
 *   node ./scripts/inject-static-body.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// ── Case Studies data (mirror of src/data/caseStudies.ts) ────────────────────
const caseStudies = [
  {
    slug: 'elixir-games',
    title: 'ELIXIR GAMES: ECOSISTEMA GLOBAL & WEB3 LEADERSHIP',
    titleEn: 'ELIXIR GAMES: GLOBAL ECOSYSTEM & WEB3 LEADERSHIP',
    highlightFallback: 'Dirección Creativa Global',
    highlightFallbackEn: 'Global Creative Direction',
    metricLabel: 'Ventas realizadas', metricLabelEn: 'Sales',
    metricValue: '+$14M',
    coverImage: '/assets/portfolio/elixir-games.webp',
    coverAlt: 'Elixir Games Evolution',
  },
  {
    slug: 'dunk-low-elixir-edition',
    title: 'DUNK LOW ELIXIR: Campaña de lanzamiento y airdrop global',
    titleEn: 'DUNK LOW ELIXIR: Launch campaign and global airdrop',
    highlightFallback: 'Airdrop global',
    highlightFallbackEn: 'Global airdrop',
    metricLabel: 'Ventas realizadas', metricLabelEn: 'Sales',
    metricValue: '$29.900',
    coverImage: '/assets/portfolio/dunk-elixir.webp',
    coverAlt: 'Dunk Low Elixir Edition',
  },
  {
    slug: 'elixir-token',
    title: 'ELIXIR TOKEN: Campaña de lanzamiento global',
    titleEn: 'ELIXIR TOKEN: Global launch campaign',
    highlightFallback: 'Lanzamiento global',
    highlightFallbackEn: 'Global launch',
    metricLabel: 'Ventas realizadas', metricLabelEn: 'Sales',
    metricValue: '+$14,2M',
    coverImage: '/assets/portfolio/elixir-token.webp',
    coverAlt: 'Elixir Token',
  },
  {
    slug: 'chronosworlds',
    title: 'CHRONOSWORLDS: El gran salto al 3D',
    titleEn: 'CHRONOSWORLDS: The leap to 3D',
    highlightFallback: 'Rebranding + UX/UI',
    highlightFallbackEn: 'Rebrand + UX/UI',
    metricLabel: 'Ventas realizadas', metricLabelEn: 'Sales',
    metricValue: '+$12M',
    coverImage: '/assets/portfolio/chronosworlds.webp',
    coverAlt: 'ChronosWorlds',
  },
  {
    slug: 'cybertitans-pulse-series',
    title: 'CYBERTITANS PULSE SERIES: Revolución visual eSports',
    titleEn: 'CYBERTITANS PULSE SERIES: Visual eSports revolution',
    highlightFallback: 'Campaña eSports',
    highlightFallbackEn: 'eSports campaign',
    metricLabel: 'Impacto orgánico', metricLabelEn: 'Organic reach',
    metricValue: '+1,4M',
    coverImage: '/assets/portfolio/cybertitans-pulse.webp',
    coverAlt: 'CyberTitans Pulse Series',
  },
  {
    slug: 'cybertitans-clash-impacto-brutal-y-evolucion-web3',
    title: 'CyberTitans Clash: Impacto Brutal y Evolución Web3',
    titleEn: 'CYBERTITANS CLASH: Massive impact and Web3 evolution',
    highlightFallback: 'Lanzamiento Web3',
    highlightFallbackEn: 'Web3 launch',
    metricLabel: 'Impacto orgánico', metricLabelEn: 'Organic reach',
    metricValue: '+1,5M',
    coverImage: '/assets/portfolio/cybertitans-clash.webp',
    coverAlt: 'CyberTitans Clash',
  },
  {
    slug: 'robokiden-token',
    title: 'ROBOKIDEN TOKEN: Campaña de lanzamiento global',
    titleEn: 'ROBOKIDEN TOKEN: Global launch campaign',
    highlightFallback: 'Foco en ventas',
    highlightFallbackEn: 'Sales focus',
    metricLabel: 'Ventas realizadas', metricLabelEn: 'Sales',
    metricValue: '+$1,15M',
    coverImage: '/assets/portfolio/robokiden.webp',
    coverAlt: 'RoboKiden Token',
  },
];

// ── HTML generators ───────────────────────────────────────────────────────────

/** Renders a single case study card */
function caseCard(cs, lang) {
  const title = lang === 'es' ? cs.title : (cs.titleEn ?? cs.title);
  const highlight = lang === 'es' ? cs.highlightFallback : (cs.highlightFallbackEn ?? cs.highlightFallback);
  const metricLabel = lang === 'es' ? cs.metricLabel : (cs.metricLabelEn ?? cs.metricLabel);
  const readMore = lang === 'es' ? 'Leer más' : 'Read more';

  return `
    <article class="group flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden" itemscope itemtype="https://schema.org/CreativeWork">
      <div class="aspect-[16/10] overflow-hidden">
        <img
          src="${cs.coverImage}"
          alt="${cs.coverAlt}"
          width="1200" height="675"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover"
          itemprop="image"
        />
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <div class="inline-flex items-center rounded-full border border-[#B454FF]/30 bg-[#B454FF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-[#B454FF]">
          ${highlight}
        </div>
        <h2 class="mt-3 mb-2 text-lg font-black tracking-tight" itemprop="name">${title}</h2>
        <div class="mt-auto pt-4">
          <div class="text-[11px] font-black uppercase tracking-[0.28em] text-white/75">${metricLabel}</div>
          <div class="mt-1 text-2xl font-black text-[#B454FF]" itemprop="description">${cs.metricValue}</div>
          <a href="/casos/${cs.slug}" class="mt-4 block text-center rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-white/10 transition-colors" itemprop="url">
            ${readMore}
          </a>
        </div>
      </div>
    </article>`.trim();
}

/** Homepage body for a given lang */
function homepageBody(lang) {
  const isEs = lang === 'es';
  return `
<div id="root">
  <div class="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">

    <!-- ── HERO ─────────────────────────────────────────────── -->
    <header>
      <nav aria-label="${isEs ? 'Navegación principal' : 'Main navigation'}">
        <a href="/" aria-label="Kinetora — Home">
          <img src="/Logotipo.svg" alt="Kinetora Logo" width="120" height="24" loading="eager" decoding="async" />
        </a>
      </nav>
    </header>

    <main id="main-content">
      <section aria-labelledby="hero-heading">
        <div class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-white/80">
          ${isEs ? '🟣 Estudio de diseño' : '🟣 Design studio'}
        </div>
        <h1 id="hero-heading" class="text-5xl font-black tracking-tighter uppercase" itemscope itemtype="https://schema.org/Organization">
          ${isEs
            ? '<span>Diseño que convierte,</span> <span class="text-[#B454FF]">velocidad que escala</span>'
            : '<span>Design that converts,</span> <span class="text-[#B454FF]">speed that scales</span>'}
        </h1>
        <p class="text-white/75 text-lg leading-relaxed">
          ${isEs
            ? 'Te ayudamos a crecer. Creamos tu marca, tus campañas y tus plataformas. Rápido, sin dramas y con resultados.'
            : 'We help you grow. We create your brand, your campaigns, and your platforms. Fast, drama-free, and results-driven.'}
        </p>
        <div class="flex gap-4 flex-wrap mt-6">
          <a href="#contacto" class="rounded-full bg-[#B454FF] px-6 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-[#a035ef] transition-colors">
            ${isEs ? 'CONTACTAR' : "LET'S TALK"}
          </a>
          <a href="/casos" class="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
            ${isEs ? 'ÉXITOS' : 'CASE STUDIES'}
          </a>
        </div>
        <ul class="flex flex-wrap gap-4 mt-8 text-sm font-black uppercase tracking-widest text-white/60">
          <li>${isEs ? '⚡ ENTREGA EN 48H' : '⚡ 48H DELIVERY'}</li>
          <li>${isEs ? '✓ REVISIONES ILIMITADAS' : '✓ UNLIMITED REVISIONS'}</li>
          <li>${isEs ? '○ PRECIO MENSUAL FIJO' : '○ FIXED MONTHLY PRICE'}</li>
        </ul>
      </section>

      <!-- ── SERVICES ──────────────────────────────────────── -->
      <section id="servicios" aria-labelledby="services-heading">
        <div class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-white/80">
          ${isEs ? 'CAPACIDADES' : 'CAPABILITIES'}
        </div>
        <h2 id="services-heading" class="text-4xl font-black tracking-tighter uppercase">
          ${isEs
            ? '<span>TODO EL MÚSCULO VISUAL</span> <span class="text-[#B454FF]">QUE TU STARTUP NECESITA</span>'
            : '<span>ALL THE VISUAL POWER</span> <span class="text-[#B454FF]">YOUR STARTUP NEEDS</span>'}
        </h2>
        <p class="text-white/75">
          ${isEs
            ? 'Branding, producto, web y contenido — con un sistema que mantiene calidad y consistencia a escala.'
            : 'Brand, product, web and content — with a system that keeps quality and consistency at scale.'}
        </p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <li class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 class="font-black uppercase tracking-tight">
              ${isEs ? 'DISEÑO GRÁFICO Y BRANDING' : 'GRAPHIC DESIGN &amp; BRANDING'}
            </h3>
            <p class="text-white/60 text-sm mt-2">
              ${isEs
                ? 'Más allá del logotipo, construyo identidades de marca completas'
                : 'Beyond the logo, I build comprehensive brand identities'}
            </p>
          </li>
          <li class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 class="font-black uppercase tracking-tight">
              ${isEs ? 'DISEÑO UX/UI Y WEB' : 'UX/UI &amp; WEB DESIGN'}
            </h3>
            <p class="text-white/60 text-sm mt-2">
              ${isEs
                ? 'Creación de páginas, tiendas online y Sistemas de Diseño'
                : 'Crafting landing pages, e-commerce, and full Design Systems'}
            </p>
          </li>
          <li class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 class="font-black uppercase tracking-tight">
              ${isEs ? 'MULTIMEDIA Y VÍDEO' : 'VIDEO &amp; MULTIMEDIA'}
            </h3>
            <p class="text-white/60 text-sm mt-2">
              ${isEs
                ? 'Edición enfocada en la retención de audiencia'
                : 'Retention-focused editing for social platforms'}
            </p>
          </li>
          <li class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 class="font-black uppercase tracking-tight">
              ${isEs ? 'ESTRATEGIA Y CONTENIDO' : 'CONTENT STRATEGY'}
            </h3>
            <p class="text-white/60 text-sm mt-2">
              ${isEs
                ? 'Planificación para escalar cuentas, producción y un copywriting muy directo y estratégico.'
                : 'Account scaling roadmaps, content production, and sharp, highly strategic copywriting.'}
            </p>
          </li>
        </ul>
      </section>

      <!-- ── RECENT CASES PREVIEW ───────────────────────────── -->
      <section id="casos" aria-labelledby="cases-preview-heading">
        <h2 id="cases-preview-heading" class="text-3xl font-black tracking-tighter uppercase">
          ${isEs ? 'Proyectos recientes' : 'Recent projects'}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          ${caseStudies.slice(0, 3).map(cs => caseCard(cs, lang)).join('\n')}
        </div>
        <div class="mt-8 text-center">
          <a href="/casos" class="inline-flex rounded-full border border-[#B454FF]/30 bg-[#B454FF]/10 px-8 py-3 text-sm font-black uppercase tracking-widest text-[#B454FF] hover:bg-[#B454FF]/20 transition-colors">
            ${isEs ? 'Ver todos los casos →' : 'See all case studies →'}
          </a>
        </div>
      </section>
    </main>

    <!-- ── FOOTER ──────────────────────────────────────────── -->
    <footer class="bg-[#0D0D0D] border-t border-[#2A2A2A]" role="contentinfo">
      <div class="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src="/Logotipo.svg" alt="Kinetora Logo" width="120" height="24" loading="lazy" decoding="async" />
        <p class="text-white/50 text-sm">© ${new Date().getFullYear()} Kinetora Studio. ${isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
        <nav aria-label="${isEs ? 'Redes sociales' : 'Social media'}">
          <a href="https://www.instagram.com/kinetora_studio/" rel="noopener noreferrer" target="_blank" class="text-white/50 hover:text-white text-sm mr-4">Instagram</a>
          <a href="https://www.linkedin.com/company/kinetora" rel="noopener noreferrer" target="_blank" class="text-white/50 hover:text-white text-sm">LinkedIn</a>
        </nav>
      </div>
    </footer>

  </div>
</div>`.trim();
}

/** /casos page body for a given lang */
function casosBody(lang) {
  const isEs = lang === 'es';
  return `
<div id="root">
  <div class="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">

    <header>
      <nav aria-label="${isEs ? 'Navegación principal' : 'Main navigation'}">
        <a href="/" aria-label="Kinetora — Home">
          <img src="/Logotipo.svg" alt="Kinetora Logo" width="120" height="24" loading="eager" decoding="async" />
        </a>
      </nav>
    </header>

    <main id="main-content">
      <section aria-labelledby="cases-heading">
        <div class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-white/80">
          ${isEs ? 'Casos de éxito' : 'Case studies'}
        </div>
        <h1 id="cases-heading" class="text-4xl font-black tracking-tighter uppercase">
          ${isEs
            ? '<span>Proyectos reales.</span> <span class="text-[#B454FF]">Resultados medibles</span>'
            : '<span>Real projects.</span> <span class="text-[#B454FF]">Measurable results</span>'}
        </h1>
        <p class="text-white/75 text-base leading-relaxed">
          ${isEs
            ? 'Selección de proyectos donde diseñamos el sistema, el producto y la narrativa para acelerar crecimiento.'
            : 'A selection of projects where we designed the system, product and narrative to accelerate growth.'}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10" itemscope itemtype="https://schema.org/ItemList">
          ${caseStudies.map((cs, i) => `
          <div itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <meta itemprop="position" content="${i + 1}" />
            ${caseCard(cs, lang)}
          </div>`).join('\n')}
        </div>
      </section>
    </main>

    <footer class="bg-[#0D0D0D] border-t border-[#2A2A2A]" role="contentinfo">
      <div class="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src="/Logotipo.svg" alt="Kinetora Logo" width="120" height="24" loading="lazy" decoding="async" />
        <p class="text-white/50 text-sm">© ${new Date().getFullYear()} Kinetora Studio. ${isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
      </div>
    </footer>

  </div>
</div>`.trim();
}

// ── Core: inject body into an HTML file ──────────────────────────────────────
function injectBody(htmlFilePath, bodyHtml, sourceTemplatePath) {
  let html;
  
  // If the target file exists, read it
  if (fs.existsSync(htmlFilePath)) {
    html = fs.readFileSync(htmlFilePath, 'utf8');
  } 
  // If it doesn't exist but we have a source template (like for /casos), create it
  else if (sourceTemplatePath && fs.existsSync(sourceTemplatePath)) {
    console.log(`[inject-static-body] ℹ️  Creating sub-route file: ${htmlFilePath}`);
    html = fs.readFileSync(sourceTemplatePath, 'utf8');
    // Ensure directory exists
    fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });
  } 
  else {
    console.warn(`[inject-static-body] ⚠️  Skipping (not found & no template): ${htmlFilePath}`);
    return false;
  }

  // Replace <div id="root"></div> or <div id="root"> ... </div> with the static body
  // The injected content becomes the "noscript" / crawler baseline; React hydrates on top.
  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', bodyHtml);
  } else if (/<div id="root">\s*<\/div>/.test(html)) {
    html = html.replace(/<div id="root">\s*<\/div>/, bodyHtml);
  } else {
    // Already has content injected (e.g. Playwright snapshot); skip to avoid double-injection
    console.log(`[inject-static-body] ℹ️  Root already has content in: ${htmlFilePath} — skipping body inject.`);
    return false;
  }

  fs.writeFileSync(htmlFilePath, html, 'utf8');
  console.log(`[inject-static-body] ✅  Injected static body into: ${htmlFilePath}`);
  return true;
}

// ── Run ───────────────────────────────────────────────────────────────────────
console.log('[inject-static-body] 🚀  Starting static body injection...\n');

const BASE_EN = path.join(DIST, 'index.html');
const BASE_ES = path.join(DIST, 'index.es.html');

// 1. /casos EN - Generated from base EN 
injectBody(
  path.join(DIST, 'casos', 'index.html'), 
  casosBody('en'),
  BASE_EN // Use base index.html as template because vite didn't build 'casos/index.html'
);

// 2. /casos ES - Generated from base ES
injectBody(
  path.join(DIST, 'casos', 'index.es.html'), 
  casosBody('es'),
  BASE_ES
);

// 3. Homepage EN
injectBody(BASE_EN, homepageBody('en'));

// 4. Homepage ES
injectBody(BASE_ES, homepageBody('es'));

console.log('\n[inject-static-body] ✅  Static body injection complete.');
console.log('[inject-static-body] ℹ️  React will hydrate this HTML on first browser load.\n');
