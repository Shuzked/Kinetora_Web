# Kinetora Web — Technical Overhaul & AEO Prerendering

This repository contains the production build pipeline and static server configuration for **Kinetora** (Premium Design Studio for venture-backed startups), optimized for **Core Web Vitals** and **Answer Engine Optimization (AEO)**.

## ⚡ Architecture & SEO Pipeline

The static generation pipeline is divided into three key phases, orchestrated automatically during `npm run build`:

### Phase 1: Localized HTML Generation (`build-static.js`)
- Generates beautiful, lightweight, standard-compliant HTML templates for both languages (English on `.tech` root, Spanish on `.es` under `/es`).
- Embeds high-priority above-the-fold critical CSS, Google Tag Manager scripts with prior consent support, and layout stability blocks.
- Pre-injects high-priority Google Fonts (`Inter Black 900` and `Inter Regular`) and critical SVG logo files as high-priority preloads.
- Incorporates dynamic SEO metadata: localized canonical URLs, alternate hreflang tags, OpenGraph (OG) properties, Twitter cards, and structured JSON-LD schemas (`Organization` and `WebSite` tags).
- Places a language bridge marker: `<script id="i18n-bridge">window.__KINETORA_LANG__ = "lang";</script>`.

### Phase 2: Full-Page Crawling & Prerendering (`prerender.js`)
- Boots up a lightweight local static server serving the generated files on port `4321`.
- Spawns headless Puppeteer to crawl all sitemap routes in both Spanish and English.
- Waits for network idle (`networkidle0`) to ensure all React components, pricing models, and portfolios are fully populated.
- Captures full-page HTML using `page.content()`.
- Automatically appends a `data-prerendered="true"` hydration attribute to the `<div id="root">` element.
- Overwrites files inside `dist/` with the pre-rendered markup.

### Phase 3: React Smart Hydration (`assets/index.D-twsyGA.js`)
- The compiled React application entry point detects if the root container has child nodes and isn't running in a recovery fallback mode.
- If pre-rendered child nodes exist inside `<div id="root" data-prerendered="true">`, the app boots up using `hydrateRoot` (from `react-dom/client`) instead of wiping out the markup with `createRoot().render()`.
- Warding off content flashing (FOUC), layout shifts (CLS), and minimizing Time to Interactive (TTI) for seamless, instant premium client experience.

---

## 🛠️ Commands

### Local Development / Static Server
Start the local server serving the pre-rendered production directory:
```bash
npm run dev
```

### Clean Static Build & Prerender
Runs the compiler pipeline to produce the finalized SEO-ready HTML assets in `/dist`:
```bash
npm run build
```

---

## 📂 Production Deliverables

- **kinetora.tech root:** Deploy all files and folders directly inside `dist/` to the root folder of Kinetora.tech.
- **kinetora.es root:** Deploy all files and folders directly inside `dist/es/` to the root folder of Kinetora.es.
- **SPA Routing & Caching:** The auto-generated `.htaccess` file handles clean URLs, HTTPS redirect, security headers, and cache-control headers on Hostinger.

---

## 🚀 Deployment

This project deploys to two Hostinger sites via **GitHub Actions** (zero-config, no extra secrets needed):

| Domain | Content | Git Branch |
|---|---|---|
| `kinetora.tech` | English — `/dist` | `deploy` |
| `kinetora.es` | Spanish — `/dist/es` | `deploy-es` |

### Automatic flow

1. Push to `perf/core-web-vitals` (or `main` once promoted)
2. **GitHub Actions** triggers two parallel workflows:
   - `.github/workflows/deploy-production.yml` — builds + prerenders, publishes `/dist` (EN) to `deploy`
   - `.github/workflows/deploy-production-es.yml` — same build, publishes `/dist/es` (ES) to `deploy-es`
3. **Hostinger Git Deploy** detects the push to each branch and syncs to `public_html` automatically
4. Cached assets are invalidated via Vite content hashing + `.htaccess` cache headers

Expected total time from `git push` to live: **3–5 minutes**.

### Manual deploy (fallback)

If GitHub Actions fails, run locally and upload via FTP/SFTP:

```bash
npm run build:check    # builds + verifies <h1> and data-prerendered are present
npm run preview        # serves EN build at http://localhost:5000
npm run preview:es     # serves ES build at http://localhost:5001

# Then manually upload:
# /dist contents → kinetora.tech public_html
# /dist/es contents → kinetora.es public_html
```

### First-time Hostinger setup

Configure Hostinger Git Deploy in **hPanel → Git** for each domain:

| Domain | Repository | Branch | Deploy path |
|---|---|---|---|
| `kinetora.tech` | `Shuzked/Kinetora_Web` | `deploy` | `public_html` |
| `kinetora.es` | `Shuzked/Kinetora_Web` | `deploy-es` | `public_html` |

> GitHub Actions uses the default `GITHUB_TOKEN` — no extra secrets need to be configured.
