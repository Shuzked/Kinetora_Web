const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    console.log(`[Request] ${req.method} ${urlPath}`);
    
    // Check if user is testing Spanish version
    const queryString = req.url.split('?')[1] || '';
    let isSpanish = urlPath.includes('/es/') || urlPath === '/es' || req.headers.host?.includes('.es') || queryString.includes('lang=es');
    let defaultFile = isSpanish ? 'index.es.html' : 'index.html';

    let filePath = path.join(PUBLIC_DIR, urlPath);
    if (filePath.endsWith(path.sep)) {
        filePath = path.join(filePath, defaultFile);
    }

    // SPA routing fallback: if file does not exist, fall back to default HTML
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        const hasExtension = path.extname(urlPath) !== '';
        if (hasExtension) {
            console.log(`[404] Not Found: ${urlPath}`);
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
        filePath = path.join(PUBLIC_DIR, defaultFile);
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.error(`[500] Error reading ${filePath}:`, err);
            res.writeHead(500);
            res.end('Server Error');
            return;
        }

        if (ext === '.html') {
            let html = content.toString('utf8');
            const lang = isSpanish ? 'es' : 'en';
            
            // i18n Bridge Injection
            const bridgeScript = `\n    <script id="i18n-bridge">window.__KINETORA_LANG__ = "${lang}";</script>`;
            html = html.replace('<head>', `<head>${bridgeScript}`);
            
            // HTML lang attribute override
            html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
            
            // Localized SEO tags replacement
            const seoTags = isSpanish ? `
    <title>Kinetora | Diseño para Startups - Levanta Capital, Convierte Usuarios</title>
    <meta name="description" content="Estudio de diseño premium para startups. Levantamos capital y convertimos usuarios mediante diseño de producto, web y desarrollo frontend de alta conversión." />
    <link rel="canonical" href="https://kinetora.es/" />
    <meta property="og:title" content="Kinetora | Diseño para Startups - Levanta Capital, Convierte Usuarios" />
    <meta property="og:description" content="Estudio de diseño premium para startups. Levantamos capital y convertimos usuarios mediante diseño de producto, web y desarrollo frontend de alta conversión." />
    <meta property="og:url" content="https://kinetora.es/" />
    <meta property="og:locale" content="es_ES" />
    <link rel="alternate" hreflang="en" href="https://kinetora.tech/" />
    <link rel="alternate" hreflang="es" href="https://kinetora.es/" />
    <link rel="alternate" hreflang="x-default" href="https://kinetora.tech/" />
    ` : `
    <title>Kinetora | Design for Startups - Raise Capital, Convert Users</title>
    <meta name="description" content="Premium design studio for startups. We raise capital and convert users through high-converting product design, web, and frontend development." />
    <link rel="canonical" href="https://kinetora.tech/" />
    <meta property="og:title" content="Kinetora | Design for Startups - Raise Capital, Convert Users" />
    <meta property="og:description" content="Premium design studio for startups. We raise capital and convert users through high-converting product design, web, and frontend development." />
    <meta property="og:url" content="https://kinetora.tech/" />
    <meta property="og:locale" content="en_US" />
    <link rel="alternate" hreflang="en" href="https://kinetora.tech/" />
    <link rel="alternate" hreflang="es" href="https://kinetora.es/" />
    <link rel="alternate" hreflang="x-default" href="https://kinetora.tech/" />
    `;
            
            html = html.replace('<!-- SSR_HEAD_PLACEHOLDER -->', seoTags);
            
            console.log(`[200] served processed HTML (${lang}) for ${filePath}`);
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        } else {
            console.log(`[200] served ${filePath}`);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Test static server running at http://localhost:${PORT}/`);
    console.log(`Try accessing either:`);
    console.log(`- http://localhost:${PORT}/`);
    console.log(`- http://127.0.0.1:${PORT}/`);
});
