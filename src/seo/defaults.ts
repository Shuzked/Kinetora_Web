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
    title: "Kinetora — Agencia creativa por suscripción para Startups y B2B",
    description:
      "UX/UI, webs ultrarrápidas, motion graphics y pitch decks bajo suscripción asíncrona. Entregas en 48h, revisiones ilimitadas y enfoque a resultados.",
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
    title: "Kinetora — Creative agency on subscription for Startups & B2B",
    description:
      "UX/UI, blazing-fast websites, motion graphics and pitch decks on an async subscription. 48h turnarounds, unlimited revisions, results-driven.",
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