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
    title: "Kinetora | Experiencias Digitales que Convierten Usuarios",
    description:
      "Diseñamos productos y experiencias digitales poco convencionales que hacen girar cabezas y convierten usuarios. Estudio para marcas que se niegan a pasar desapercibidas.",
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
    title: "Kinetora | Unconventional Digital Experiences & High-Converting UX",
    description:
      "We design unconventional digital experiences that turn heads and convert users. A digital studio exclusively for brands that refuse to go unnoticed.",
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