export type CaseStudy = {
  slug: string;
  sourceUrl: string;
  slugEn?: string;
  sourceUrlEn?: string;
  label: string;
  labelEn?: string;
  title: string;
  titleEn?: string;
  summaryFallback: string;
  summaryFallbackEn?: string;
  coverAlt: string;
  coverAltEn?: string;
  coverImage: string;
  highlightFallback: string;
  highlightFallbackEn?: string;
  accent: "purple" | "teal";
  metricLabel?: string;
  metricLabelEn?: string;
  metricValue?: string;
  embeds?: Array<{ point: number; src: string }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "elixir-games",
    sourceUrl: "https://kinetora.tech/elixir-games/",
    label: "ELIXIR GAMES",
    labelEn: "ELIXIR GAMES",
    title: "ELIXIR GAMES: ECOSISTEMA GLOBAL & LIDERAZGO WEB3",
    titleEn: "ELIXIR GAMES: GLOBAL ECOSYSTEM & WEB3 LEADERSHIP",
    summaryFallback: "Evolución de Producto & Crecimiento Masivo",
    summaryFallbackEn: "Product Evolution & Massive Growth",
    coverAlt: "Elixir Games Evolution",
    coverAltEn: "Elixir Games Evolution",
    coverImage: "/assets/portfolio/Elixir-Games.webp",
    highlightFallback: "Dirección Creativa Global",
    highlightFallbackEn: "Global Creative Direction",
    accent: "purple",
    metricLabel: "Ventas realizadas",
    metricLabelEn: "Sales",
    metricValue: "+$14M",
  },
  {
    slug: "dunk-low-elixir-edition",
    sourceUrl: "https://kinetora.tech/dunk-low-elixir-edition/",
    label: "DUNK LOW ELIXIR",
    labelEn: "DUNK LOW ELIXIR",
    title: "DUNK LOW ELIXIR: Campaña de lanzamiento y airdrop global",
    titleEn: "DUNK LOW ELIXIR: Launch campaign and global airdrop",
    summaryFallback:
      "Landing, piezas audiovisuales y estrategia de marketing Web3 para un lanzamiento limitado con experiencia premium.",
    summaryFallbackEn:
      "Landing page, audiovisual assets and Web3 marketing strategy for a limited launch with a premium experience.",
    coverAlt: "Dunk Low Elixir Edition",
    coverAltEn: "Dunk Low Elixir Edition",
    coverImage: "/assets/portfolio/dunk-elixir.webp",
    highlightFallback: "Airdrop global",
    highlightFallbackEn: "Global airdrop",
    accent: "purple",
    metricLabel: "Ventas realizadas",
    metricLabelEn: "Sales",
    metricValue: "$29.900",
    embeds: [
      {
        point: 1,
        src: "https://www.youtube.com/embed/SmxMZZUsqIo?si=waoMk9O97NIoHM6a",
      },
      {
        point: 3,
        src: "https://www.youtube.com/embed/6FQVlBRWU-Y?si=XcaTft1ptmHXEQV-",
      },
    ],
  },
  {
    slug: "elixir-token",
    sourceUrl: "https://kinetora.tech/elixir-token/",
    label: "ELIXIR TOKEN",
    labelEn: "ELIXIR TOKEN",
    title: "ELIXIR TOKEN: Campaña de lanzamiento global",
    titleEn: "ELIXIR TOKEN: Global launch campaign",
    summaryFallback:
      "Dirección de arte, identidad del token, creatividades para RRSS y assets de marketing para un lanzamiento global.",
    summaryFallbackEn:
      "Art direction, token identity, social creatives and marketing assets for a global launch.",
    coverAlt: "Elixir Token",
    coverAltEn: "Elixir Token",
    coverImage: "/assets/portfolio/elixir-token.webp",
    highlightFallback: "Lanzamiento global",
    highlightFallbackEn: "Global launch",
    accent: "purple",
    metricLabel: "Ventas realizadas",
    metricLabelEn: "Sales",
    metricValue: "+$14,2M",
  },
  {
    slug: "chronosworlds",
    sourceUrl: "https://kinetora.tech/chronosworlds/",
    label: "CHRONOSWORLDS",
    labelEn: "CHRONOSWORLDS",
    title: "CHRONOSWORLDS: El gran salto al 3D",
    titleEn: "CHRONOSWORLDS: The leap to 3D",
    summaryFallback:
      "Rebranding, UX/UI y piezas clave (pitch deck + assets sociales) para transformar percepción y elevar calidad.",
    summaryFallbackEn:
      "Rebrand, UX/UI and key assets (pitch deck + social) to shift perception and elevate quality.",
    coverAlt: "ChronosWorlds",
    coverAltEn: "ChronosWorlds",
    coverImage: "/assets/portfolio/chronosworlds.webp",
    highlightFallback: "Rebranding + UX/UI",
    highlightFallbackEn: "Rebrand + UX/UI",
    accent: "teal",
    metricLabel: "Ventas realizadas",
    metricLabelEn: "Sales",
    metricValue: "+$12M",
  },
  {
    slug: "cybertitans-pulse-series",
    sourceUrl: "https://kinetora.tech/cybertitans-pulse-series/",
    label: "CYBERTITANS PULSE",
    labelEn: "CYBERTITANS PULSE",
    title: "CYBERTITANS PULSE SERIES: Revolución visual eSports",
    titleEn: "CYBERTITANS PULSE SERIES: Visual eSports revolution",
    summaryFallback:
      "Identidad visual, creatividades y contenido social para un torneo competitivo con narrativa clara y alto impacto.",
    summaryFallbackEn:
      "Visual identity, creatives and social content for a competitive tournament with a clear, high-impact narrative.",
    coverAlt: "CyberTitans Pulse Series",
    coverAltEn: "CyberTitans Pulse Series",
    coverImage: "/assets/portfolio/cybertitans-pulse.webp",
    highlightFallback: "Campaña eSports",
    highlightFallbackEn: "eSports campaign",
    accent: "teal",
    metricLabel: "Impacto orgánico",
    metricLabelEn: "Organic reach",
    metricValue: "+1,4M",
  },
  {
    slug: "cybertitans-clash-impacto-brutal-y-evolucion-web3",
    sourceUrl:
      "https://kinetora.tech/cybertitans-clash-impacto-brutal-y-evolucion-web3/",
    label: "CYBERTITANS CLASH",
    labelEn: "CYBERTITANS CLASH",
    title: "CyberTitans Clash: Impacto Brutal y Evolución Web3",
    titleEn: "CYBERTITANS CLASH: Massive impact and Web3 evolution",
    summaryFallback:
      "Sistema visual y narrativa para lanzamiento: dirección de arte, mensaje y assets para conversión.",
    summaryFallbackEn:
      "Launch visual system and narrative: art direction, messaging and conversion-focused assets.",
    coverAlt: "CyberTitans Clash",
    coverAltEn: "CyberTitans Clash",
    coverImage: "/assets/portfolio/cybertitans-clash.webp",
    highlightFallback: "Lanzamiento Web3",
    highlightFallbackEn: "Web3 launch",
    accent: "purple",
    metricLabel: "Impacto orgánico",
    metricLabelEn: "Organic reach",
    metricValue: "+1,5M",
  },
  {
    slug: "robokiden-token",
    sourceUrl: "https://kinetora.tech/robokiden-token/",
    label: "ROBOKIDEN TOKEN",
    labelEn: "ROBOKIDEN TOKEN",
    title: "ROBOKIDEN TOKEN: Campaña de lanzamiento global",
    titleEn: "ROBOKIDEN TOKEN: Global launch campaign",
    summaryFallback:
      "Branding, UX/UI y ecosistema audiovisual para un lanzamiento Web3 con foco en retención y ventas.",
    summaryFallbackEn:
      "Branding, UX/UI and an audiovisual ecosystem for a Web3 launch focused on retention and sales.",
    coverAlt: "RoboKiden Token",
    coverAltEn: "RoboKiden Token",
    coverImage: "/assets/portfolio/robokiden.webp",
    highlightFallback: "Foco en ventas",
    highlightFallbackEn: "Sales focus",
    accent: "purple",
    metricLabel: "Ventas realizadas",
    metricLabelEn: "Sales",
    metricValue: "+$1,15M",
  },
];