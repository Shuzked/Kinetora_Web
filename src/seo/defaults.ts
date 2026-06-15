"use client";

export type SupportedLang = "es" | "en";

export const seoDefaults: Record<SupportedLang, {
  title: string;
  description: string;
  keywords: string[];
  locale: string;
  siteName: string;
  shareImage?: string;
}> = {
  es: {
    title: "Kinetora | Estudio de Diseño para Startups",
    description:
      "Con 41.4M$ captados por nuestros clientes, Kinetora es el startup design studio por suscripción con entregas en 48h y sin contratos de permanencia.",
    keywords: [
      "agencia creativa", "suscripción", "startup", "B2B", "diseño UX", "UI", "diseño web",
      "web performance", "motion graphics", "pitch deck", "branding", "identidad de marca",
      "diseño de producto", "diseño de interfaces", "diseño SaaS", "diseño landing page"
    ],
    locale: "es_ES",
    siteName: "Kinetora",
    shareImage: "/assets/social/kinetora-social-share.webp",
  },
  en: {
    title: "Kinetora | Startup Design Studio",
    description:
      "Helping clients raise $41.4M, Kinetora is a startup design studio offering a monthly subscription with 48h delivery and no long-term contracts.",
    keywords: [
      "creative agency", "subscription", "startup", "B2B", "UX design", "UI", "web design",
      "web performance", "motion graphics", "pitch deck", "branding", "brand identity",
      "product design", "interface design", "SaaS design", "landing page design"
    ],
    locale: "en_US",
    siteName: "Kinetora",
    shareImage: "/assets/social/kinetora-social-share.webp",
  },
};

export function getSeoDefaults(lang: SupportedLang = "es") {
  return seoDefaults[lang];
}