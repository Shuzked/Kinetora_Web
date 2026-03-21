/**
 * Node.js Middleware Implementation (Example)
 * 
 * Este script demuestra cómo implementar la protección a nivel de servidor 
 * si utilizas un servidor Node.js (Express) para servir la aplicación.
 */

const express = require('express');
const path = require('path');
const app = express();

const PORTAL_PROTECT_PATH = '/portal';

// Middleware de verificación de sesión
const checkPortalAuth = (req, res, next) => {
    // Ejemplo: Verificar si existe una cookie de sesión
    const sessionToken = req.cookies?.kinetora_session;
    
    if (req.path.startsWith(PORTAL_PROTECT_PATH) && req.path !== `${PORTAL_PROTECT_PATH}/login`) {
        if (!sessionToken) {
            console.log(`[AUTH] Intento de acceso no autorizado a ${req.path}. Redirigiendo a login.`);
            return res.redirect(`${PORTAL_PROTECT_PATH}/login`);
        }
    }
    
    next();
};

// Configuración de cabeceras de seguridad y SEO para el Portal
app.use(PORTAL_PROTECT_PATH, (req, res, next) => {
    // Evitar que Google indexe cualquier sección del portal
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    next();
});

// Registrar middleware de auth
// NOTA: Requiere cookie-parser en una implementación real
// app.use(checkPortalAuth);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// app.listen(3000, () => console.log('Kinetora Server running on port 3000'));
