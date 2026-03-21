/**
 * KINETORA OS - Authentication & SEO Middleware
 * 
 * Este middleware protege todas las rutas del portal y aplica
 * cabeceras de SEO para evitar la indexación.
 */

const authMiddleware = (req, res, next) => {
    // 1. Protección de SEO (Noindex, Nofollow)
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');

    // 2. Verificación de Sesión (Mock session para desarrollo)
    // En producción, aquí verificarías cookies, JWT o sesión en Express
    const hasSession = req.session && req.session.userId;
    const isLoginPage = req.path === '/portal/login';

    if (!hasSession && !isLoginPage && req.path.startsWith('/portal')) {
        return res.redirect('/portal/login');
    }

    next();
};

module.exports = authMiddleware;
