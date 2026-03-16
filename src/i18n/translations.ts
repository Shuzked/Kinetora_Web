export type Lang = "es" | "en";

export type Dictionaries = Record<Lang, Record<string, string>>;

export const dictionaries: Dictionaries = {
  es: {
    "lang.es": "Español",
    "lang.en": "Inglés",
    "lang.switch": "Idioma",

    "nav.services": "Servicios",
    "nav.method": "Método",
    "nav.successes": "Éxitos",
    "nav.plans": "Planes",
    "nav.contact": "Contacto",
    "nav.login": "Login",
    "nav.start": "Empezar",

    "portal.title": "Portal del Cliente",
    "portal.notifications": "Notificaciones",
  },
  en: {
    "lang.es": "Spanish",
    "lang.en": "English",
    "lang.switch": "Language",

    "nav.services": "Services",
    "nav.method": "How it works",
    "nav.successes": "Case studies",
    "nav.plans": "Pricing",
    "nav.contact": "Contact",
    "nav.login": "Log in",
    "nav.start": "Get started",

    "portal.title": "Client Portal",
    "portal.notifications": "Notifications",
  },
};