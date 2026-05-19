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
    '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    console.log(`[Request] ${req.method} ${urlPath}`);
    
    // Check if user is testing Spanish version
    let isSpanish = urlPath.includes('/es/') || urlPath === '/es' || req.headers.host?.includes('.es');
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
