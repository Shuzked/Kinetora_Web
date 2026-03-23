const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8080;

// 1. COMPRESOR MÁXIMO (Brotli/Gzip)
app.use(compression({
    level: 6,
    threshold: 100,
    brotli: { enabled: true, zlib: { level: 11 } }
}));

// 1.5 SERVICIO INTELIGENTE DE WebP (Staff Level)
app.use((req, res, next) => {
    if (req.accepts('webp') && req.url.match(/\.(png|jpg|jpeg)$/i)) {
        const webpPath = path.join(__dirname, 'dist', req.url.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
        fs.access(webpPath, fs.constants.F_OK, (err) => {
            if (!err) {
                res.setHeader('Vary', 'Accept');
                return res.sendFile(webpPath);
            }
            next();
        });
    } else {
        next();
    }
});

// 2. REDIRECCIONES (Deshabilitado: .htaccess lo gestiona de forma más eficiente en Hostinger)
/*
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
*/

// 3. CABECERAS DE CACHÉ AGRESIVAS (Avoid Enormous Payloads)
const cacheStatic = (res, path) => {
    // 📂 ARCHIVOS CRÍTICOS: Nunca cachear (Service Workers, Manifest, HTML)
    if (path.match(/\.(html|sw\.js|service-worker\.js|manifest\.json)$/)) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
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
