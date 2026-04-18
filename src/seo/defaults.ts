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
    title: "Kinetora | Diseño Web, Cartelería y Desarrollo de Interfaces en España",
    description:
      "Estudio de diseño vanguardista. Creamos identidades visuales, webs interactivas y cartelería premium para clientes de toda España desde Priego de Córdoba.",
    keywords: [
      "agencia creativa", "diseño web España", "diseño web Andalucía",
      "diseño web Priego de Córdoba", "cartelería premium", "branding", "identidad de marca",
      "diseño UX", "UI", "web performance", "interfaces interactivas", "diseño SaaS",
      "diseño landing page", "diseño gráfico España"
    ],
    locale: "es_ES",
    siteName: "Kinetora",
    shareImage: "https://kinetora.es/assets/social/kinetora-social-share.webp",
  },
  en: {
    title: "Kinetora | Global Avant-Garde Web Design & Interactive UX",
    description:
      "Digital studio engineering premium web experiences, bespoke interactive interfaces, and modern visual identities for global brands.",
    keywords: [
      "avant-garde web design", "interactive UX", "global creative studio",
      "bespoke web experiences", "premium UI design", "visual identity",
      "brand design", "web performance", "motion design", "SaaS design",
      "landing page design", "digital studio"
    ],
    locale: "en_US",
    siteName: "Kinetora",
    shareImage: "https://kinetora.tech/assets/social/kinetora-social-share.webp",
  },
};

export function getSeoDefaults(lang: SupportedLang = "es") {
  return seoDefaults[lang];
}