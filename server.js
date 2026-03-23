const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8080;

// 1. COMPRESOR MÁXIMO (Brotli/Gzip)
app.use(compression({
    level: 6,
    threshold: 100,
    // Prioritize Brotli (br)
    brotli: {
        enabled: true,
        zlib: {
            level: 11
        }
    },
    filter: (req, res) => {
        if (req.headers['x-no-compression']) return false;
        return compression.filter(req, res);
    }
}));

// 2. NORMALIZACIÓN DE DOMINIO Y REDIRECCIONES (Evitar Score 0 en Redirects)
app.use((req, res, next) => {
    // Forzar HTTPS
    if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    
    // Normalizar a kinetora.tech (evitar duplicidad .es / .tech que penaliza SEO y Perf)
    if (req.headers.host && req.headers.host === 'kinetora.es') {
        return res.redirect(301, `https://kinetora.tech${req.url}`);
    }
    
    next();
});

// 3. CABECERAS DE CACHÉ AGRESIVAS (Avoid Enormous Payloads)
const cacheStatic = (res, path) => {
    if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (path.match(/\.(js|css|webp|png|jpg|jpeg|woff2)$/)) {
        // Assets con hash -> Cache de 1 año (Inmutable)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
};

app.use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: cacheStatic,
    etag: true,
    lastModified: true
}));

// 4. SPA FALLBACK
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Kinetora Elite Server running on port ${PORT}`);
});
