const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8080;

// 1. GENERACIÓN DE VERSIÓN DINÁMICA (Caché Busting)
// Se genera una sola vez al arrancar el proceso de Node.js
const APP_VERSION = Date.now().toString();




// 2. COMPRESOR MÁXIMO (Brotli/Gzip)
app.use(compression({
    level: 6,
    threshold: 100,
    brotli: { enabled: true, zlib: { level: 11 } }
}));

// 3. MIDDLEWARE DE INTERNACIONALIZACIÓN (i18n) POR DOMINIO
app.use((req, res, next) => {
    const host = req.hostname;
    // .es -> español, resto (.tech, localhost, etc) -> inglés
    res.locals.lang = host.includes('.es') ? 'es' : 'en';
    next();
});

// 4. SERVICIO INTELIGENTE DE WebP (Staff Level)
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

// 5. CABECERAS DE CACHÉ PARA ASSETS
// Los assets con hash en el nombre (Vite default) pueden cachearse agresivamente.
// Los assets sin hash usarán el query param ?v= inyectado.
const cacheStatic = (res, filePath) => {
    if (filePath.match(/\.(html|sw\.js|service-worker\.js|manifest\.json)$/)) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    } else if (filePath.match(/\.(js|css|webp|png|jpg|jpeg|woff2)$/)) {
        // Cache de 1 año (Inmutable)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
};

app.use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: cacheStatic,
    etag: true,
    lastModified: true
}));

// 6. SPA FALLBACK CON INYECCIÓN DINÁMICA DE VERSIÓN E IDIOMA
// Forzamos que el HTML principal NUNCA se cachee y que tenga los assets actualizados.
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error loading index.html');
        }

        // Inyectamos el Cache Busting dinámico en etiquetas <link> y <script>
        let updatedHtml = data.replace(
            /((?:href|src)="[^"]+\.(?:css|js))"/g, 
            `$1?v=${APP_VERSION}"`
        );

        // Inyectamos el Atributo Lang dinámico en la etiqueta <html>
        updatedHtml = updatedHtml.replace('<html', `<html lang="${res.locals.lang}"`);

        // Cabeceras estrictas para el HTML
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Content-Type', 'text/html');
        
        res.send(updatedHtml);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Kinetora Elite Server [v${APP_VERSION}] running on port ${PORT}`);
});
