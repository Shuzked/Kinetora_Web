export type CaseStudy = {
  slug: string;
  sourceUrl: string;
  label: string;
  title: string;
  summaryFallback: string;
  coverAlt: string;
  coverImage: string;
  highlightFallback: string;
  accent: "purple" | "teal";
  metricLabel?: string;
  metricValue?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "dunk-low-elixir-edition",
    sourceUrl: "https://kinetora.tech/dunk-low-elixir-edition/",
    label: "DUNK LOW ELIXIR",
    title: "DUNK LOW ELIXIR: Campaña de lanzamiento y airdrop global",
    summaryFallback:
      "Landing, piezas audiovisuales y estrategia de marketing Web3 para un lanzamiento limitado con experiencia premium.",
    coverAlt: "Dunk Low Elixir Edition",
    coverImage: "/assets/portfolio/dunk-elixir.webp",
    highlightFallback: "Airdrop global",
    accent: "purple",
    metricLabel: "Ventas realizadas",
    metricValue: "$29.900",
  },
  {
    slug: "elixir-token",
    sourceUrl: "https://kinetora.tech/elixir-token/",
    label: "ELIXIR TOKEN",
    title: "ELIXIR TOKEN: Campaña de lanzamiento global",
    summaryFallback:
      "Dirección de arte, identidad del token, creatividades para RRSS y assets de marketing para un lanzamiento global.",
    coverAlt: "Elixir Token",
    coverImage: "/assets/portfolio/elixir-token.webp",
    highlightFallback: "Lanzamiento global",
    accent: "purple",
    metricLabel: "Ventas realizadas",
    metricValue: "+$14,2M",
  },
  {
    slug: "chronosworlds",
    sourceUrl: "https://kinetora.tech/chronosworlds/",
    label: "CHRONOSWORLDS",
    title: "CHRONOSWORLDS: El gran salto al 3D",
    summaryFallback:
      "Rebranding, UX/UI y piezas clave (pitch deck + assets sociales) para transformar percepción y elevar calidad.",
    coverAlt: "ChronosWorlds",
    coverImage: "/assets/portfolio/chronosworlds.webp",
    highlightFallback: "Rebranding + UX/UI",
    accent: "teal",
    metricLabel: "Ventas realizadas",
    metricValue: "+$12M",
  },
  {
    slug: "cybertitans-pulse-series",
    sourceUrl: "https://kinetora.tech/cybertitans-pulse-series/",
    label: "CYBERTITANS PULSE",
    title: "CYBERTITANS PULSE SERIES: Revolución visual eSports",
    summaryFallback:
      "Identidad visual, creatividades y contenido social para un torneo competitivo con narrativa clara y alto impacto.",
    coverAlt: "CyberTitans Pulse Series",
    coverImage: "/assets/portfolio/cybertitans-pulse.webp",
    highlightFallback: "Campaña eSports",
    accent: "teal",
    metricLabel: "Impacto orgánico",
    metricValue: "+1,4M",
  },
  {
    slug: "cybertitans-clash-impacto-brutal-y-evolucion-web3",
    sourceUrl:
      "https://kinetora.tech/cybertitans-clash-impacto-brutal-y-evolucion-web3/",
    label: "CYBERTITANS CLASH",
    title: "CYBERTITANS CLASH: Impacto brutal y evolución Web3",
    summaryFallback:
      "Sistema visual y narrativa para lanzamiento: dirección de arte, mensaje y assets para conversión.",
    coverAlt: "CyberTitans Clash",
    coverImage: "/assets/portfolio/cybertitans-clash.webp",
    highlightFallback: "Lanzamiento Web3",
    accent: "purple",
    metricLabel: "Impacto orgánico",
    metricValue: "+1,5M",
  },
  {
    slug: "robokiden-token",
    sourceUrl: "https://kinetora.tech/robokiden-token/",
    label: "ROBOKIDEN TOKEN",
    title: "ROBOKIDEN TOKEN: Campaña de lanzamiento global",
    summaryFallback:
      "Branding, UX/UI y ecosistema audiovisual para un lanzamiento Web3 con foco en retención y ventas.",
    coverAlt: "RoboKiden Token",
    coverImage: "/assets/portfolio/robokiden.webp",
    highlightFallback: "Foco en ventas",
    accent: "purple",
    metricLabel: "Ventas realizadas",
    metricValue: "+$1,15M",
  },
];