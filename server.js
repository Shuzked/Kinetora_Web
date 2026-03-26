const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración para entornos detrás de proxy inverso
app.set('trust proxy', true);

// 1. ENDPOINT DE DEPUREACIÓN SEGURO (Mover al principio para evitar 404 de React)
app.get('/i18n-test', (req, res) => {
    // Intentamos todas las fuentes de host posibles
    const host = req.hostname || req.get('host') || req.headers.host || 'No detectado';
    const lang = host.includes('.es') ? 'es' : 'en';
    res.json({
        detected_host: host,
        assigned_lang: lang,
        trust_proxy: app.get('trust proxy'),
        headers: req.headers
    });
});

// 2. GENERACIÓN DE VERSIÓN DINÁMICA
// Se genera una sola vez al arrancar el proceso de Node.js
const APP_VERSION = Date.now().toString();




// 3. MIDDLEWARE DE INTERNACIONALIZACIÓN (i18n) - DETECTOR DE DOMINIO PRO
app.use((req, res, next) => {
    // Intentamos obtener el host de varias fuentes (Proxy vs Local)
    const host = req.hostname || req.get('host') || req.headers.host || '';
    
    // LOG DE ALTO NIVEL - Busca esto en los logs de Hostinger
    console.log(`\n--- [PRO i18n DEBUG] ---`);
    console.log(`Full Host: "${host}"`);
    console.log(`X-Forwarded-Host: "${req.get('x-forwarded-host')}"`);
    
    // Mapeo estricto
    let lang = 'en'; // Default para .tech y otros
    if (host.includes('.es')) {
        lang = 'es';
    }

    res.locals.lang = lang;
    console.log(`Idioma asignado: ${lang.toUpperCase()}`);
    console.log(`------------------------\n`);

    // Forzamos cabeceras para evitar cualquier tipo de caché intermedia
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    // Carga de traducciones
    const localePath = path.join(__dirname, 'locales', `${lang}.json`);
    try {
        if (fs.existsSync(localePath)) {
            res.locals.t = JSON.parse(fs.readFileSync(localePath, 'utf8'));
        }
    } catch (e) {
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

        // Inyectamos el Cache Busting dinámico en etiquetas <link> y <script> LOCALES SOLAMENTE
        // Evitamos tocar URLs externas (que empiecen por http o //)
        let updatedHtml = data.replace(
            /((?:href|src)=")(?!\/|http|https|\/\/)([^"]+\.(?:css|js))"/g, 
            `$1$2?v=${APP_VERSION}"`
        );

        // Inyectamos el Atributo Lang dinámico y la variable global para React con un ID para asegurar reemplazo único
        updatedHtml = updatedHtml.replace(/<html[^>]*>/, `<html lang="${res.locals.lang}">`);
        updatedHtml = updatedHtml.replace('<head>', `<head>\n    <script id="i18n-bridge">window.__KINETORA_LANG__ = "${res.locals.lang}";</script>`);

        // INYECCIÓN DINÁMICA - SSR LITE GLOBAL
        const t = res.locals.t || {};

        // Función para aplanar el objeto de traducciones (ej: { seo: { title: "..." } } -> { "seo.title": "..." })
        const flatten = (obj, prefix = '') => {
            let items = {};
            for (const [key, value] of Object.entries(obj)) {
                const newKey = prefix ? `${prefix}.${key}` : key;
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    Object.assign(items, flatten(value, newKey));
                } else {
                    items[newKey] = value;
                }
            }
            return items;
        };

        const flatDict = flatten(t);

        // Reemplazo masivo de {{clave}}
        Object.keys(flatDict).forEach(key => {
            const value = flatDict[key];
            if (typeof value === 'string' || typeof value === 'number') {
                const regex = new RegExp(`{{${key}}}`, 'g');
                updatedHtml = updatedHtml.replace(regex, value);
            }
        });

        // Refuerzo específico para Meta Tags por si no tienen el formato {{}}
        if (t.seo) {
            if (t.seo.title) {
                updatedHtml = updatedHtml.replace(/<title>.*?<\/title>/g, `<title>${t.seo.title}</title>`);
                updatedHtml = updatedHtml.replace(/property="og:title" content=".*?"/g, `property="og:title" content="${t.seo.title}"`);
                updatedHtml = updatedHtml.replace(/name="twitter:title" content=".*?"/g, `name="twitter:title" content="${t.seo.title}"`);
            }
            if (t.seo.description) {
                updatedHtml = updatedHtml.replace(/name="description" content=".*?"/g, `name="description" content="${t.seo.description}"`);
                updatedHtml = updatedHtml.replace(/property="og:description" content=".*?"/g, `property="og:description" content="${t.seo.description}"`);
                updatedHtml = updatedHtml.replace(/name="twitter:description" content=".*?"/g, `name="twitter:description" content="${t.seo.description}"`);
            }
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
