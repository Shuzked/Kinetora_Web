/**
 * postbuild-seo.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Post-build script that generates the base ES template (index.es.html).
 * 
 * It swaps the language bridge so the React app boots in Spanish.
 * Specific metadata (title, meta, JSON-LD) is now handled by ssg-builder.mjs
 * using react-helmet-async during the SSR cycle.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function generateEsBaseTemplate() {
  const srcPath = path.join(DIST, 'index.html');
  const destPath = path.join(DIST, 'index.es.html');

  if (!fs.existsSync(srcPath)) {
    console.error(`[postbuild-seo] ❌  index.html not found in ${DIST}`);
    process.exit(1);
  }

  let html = fs.readFileSync(srcPath, 'utf8');

  // 1. Swap lang attribute
  html = html.replace(/<html lang="en">/, '<html lang="es">');
  html = html.replace(/<html lang="en-US">/, '<html lang="es">');
  
  // 2. Inject i18n bridge for "es"
  // This ensures the client-side hydration starts with the correct language
  const bridgeScript = '<script>window.__KINETORA_LANG__="es"</script>';
  html = html.replace('</head>', `${bridgeScript}\n</head>`);

  fs.writeFileSync(destPath, html, 'utf8');
  console.log(`[postbuild-seo] ✅  Generated base ES template: ${destPath}`);
}

console.log('[postbuild-seo] 🚀  Preparing ES environment...');
generateEsBaseTemplate();

