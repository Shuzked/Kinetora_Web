import path from "path";
import fs from "fs";

const DOMAIN_LANG_MAP = {
  "kinetora.tech": "en", // Primary
  "kinetora.es": "es",
};

const DEFAULT_LANG = "en";

export const i18nMiddleware = (req, res, next) => {
  const host = req.hostname;
  // Support both local development and production domains
  const lang = DOMAIN_LANG_MAP[host] || (host.endsWith(".es") ? "es" : DEFAULT_LANG);
  
  // Attach lang to request for later use in API or SSR
  req.lang = lang;
  
  // For the frontend, we can set a cookie or inject into the response
  res.cookie("i18next", lang, { maxAge: 900000, httpOnly: false });
  
  next();
};

/**
 * Helper to inject i18n tags and config into the index.html
 * @param {string} htmlContent - The raw index.html content
 * @param {string} lang - The detected language
 * @param {string} currentUrl - The absolute URL of the request
 */
export const injectI18n = (htmlContent, lang, currentUrl) => {
  const otherLang = lang === "en" ? "es" : "en";
  const otherDomain = lang === "en" ? "https://kinetora.es" : "https://kinetora.tech";
  const currentDomain = lang === "en" ? "https://kinetora.tech" : "https://kinetora.es";
  
  const pathPart = new URL(currentUrl, "http://localhost").pathname;
  
  // 1. Inyectar etiquetas hreflang
  const hreflangTags = `
    <link rel="alternate" hreflang="en" href="https://kinetora.tech${pathPart}" />
    <link rel="alternate" hreflang="es" href="https://kinetora.es${pathPart}" />
    <link rel="alternate" hreflang="x-default" href="https://kinetora.tech${pathPart}" />
  `.trim();

  // 2. Inyectar configuración de idioma para el frontend (sin redirección)
  const langScript = `
    <script>
      window.__KINETORA_LANG__ = "${lang}";
      document.documentElement.lang = "${lang}";
    </script>
  `.trim();

  return htmlContent
    .replace("</head>", `${hreflangTags}\n${langScript}\n</head>`)
    .replace('<html lang="en">', `<html lang="${lang}">`) // Fallback replacement
    .replace('<html>', `<html lang="${lang}">`);
};
