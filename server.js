const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración para entornos detrás de proxy inverso (Hostinger, Vercel, Nginx)
app.set('trust proxy', true);

// 1. GENERACIÓN DE VERSIÓN DINÁMICA (Caché Busting)
// Se genera una sola vez al arrancar el proceso de Node.js
const APP_VERSION = Date.now().toString();




// 2. COMPRESOR MÁXIMO (Brotli/Gzip)
app.use(compression({
    level: 6,
    threshold: 100,
    brotli: { enabled: true, zlib: { level: 11 } }
}));

// 3. MIDDLEWARE DE INTERNACIONALIZACIÓN (i18n) - CHIVATO ULTRA-ESTRICTO
app.use((req, res, next) => {
    // Usamos req.get('host') para ver exactamente qué llega del proxy
    const host = req.get('host') || '';
    
    // Lógica estricta: .tech forzado a 'en', .es forzado a 'es'
    let lang = 'en'; // Default
    if (host.includes('.es')) {
        lang = 'es';
    } else if (host.includes('.tech')) {
        lang = 'en';
    }

    res.locals.lang = lang;

    // DEBUG LOG MANDATORIO (Mirar en los logs del servidor de Hostinger)
    console.log(`[DEBUG i18n] Host: ${host} | Idioma asignado: ${lang} | Trust Proxy: ${app.get('trust proxy')}`);

    // CABECERAS ANTI-CACHÉ (Evita que el proxy nos sirva versiones viejas en español)
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    // Carga del diccionario correspondiente
    const localePath = path.join(__dirname, 'locales', `${lang}.json`);
    try {
        if (fs.existsSync(localePath)) {
            res.locals.t = JSON.parse(fs.readFileSync(localePath, 'utf8'));
        } else {
            console.warn(`[i18n Warning] Diccionario no encontrado: ${localePath}`);
            res.locals.t = {};
        }
    } catch (error) {
        console.error(`[i18n Error] Error cargando locale ${lang}:`, error);
        res.locals.t = {};
    }
    
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

        // Inyectamos el Atributo Lang dinámico y la variable global para React
        updatedHtml = updatedHtml.replace(/<html[^>]*>/, `<html lang="${res.locals.lang}">`);
        updatedHtml = updatedHtml.replace('<head>', `<head><script>window.__KINETORA_LANG__ = "${res.locals.lang}";</script>`);

        // INYECCIÓN DINÁMICA DE TODO EL DICCIONARIO (SSR LITE GLOBAL)
        const t = res.locals.t || {};

        // 1. Inyectamos claves directas (ej: {{greeting}} -> Hola)
        // Esto permite traducir cualquier parte del index.html usando doble llave
        Object.keys(t).forEach(key => {
            if (typeof t[key] === 'string') {
                const regex = new RegExp(`{{${key}}}`, 'g');
                updatedHtml = updatedHtml.replace(regex, t[key]);
            }
        });

        // 2. Inyección específica de SEO (para mantener compatibilidad con etiquetas existentes)
        const seo = t.seo || {};
        if (seo.title) {
            updatedHtml = updatedHtml.replace(/<title>.*?<\/title>/g, `<title>${seo.title}</title>`);
            updatedHtml = updatedHtml.replace(/content="[^"]*Kinetora[^"]*"/g, (match) => {
                if (match.includes('title')) return `content="${seo.title}"`;
                return match;
            });
        }
        if (seo.description) {
            updatedHtml = updatedHtml.replace(/<meta name="description" content=".*?">/g, `<meta name="description" content="${seo.description}">`);
            updatedHtml = updatedHtml.replace(/<meta property="og:description" content=".*?">/g, `<meta property="og:description" content="${seo.description}">`);
            updatedHtml = updatedHtml.replace(/<meta name="twitter:description" content=".*?">/g, `<meta name="twitter:description" content="${seo.description}">`);
        }

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
