export type CaseStudy = {
  slug: string;
  sourceUrl: string;
  category: string;
  title: string;
  summary: string;
  coverAlt: string;
  coverImage: string;
  accent: "purple" | "teal";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "dunk-low-elixir-edition",
    sourceUrl: "https://kinetora.tech/dunk-low-elixir-edition/",
    category: "LANZAMIENTO PRODUCTO",
    title: "DUNK LOW ELIXIR: Campaña de lanzamiento y airdrop global",
    summary:
      "Landing, piezas audiovisuales y estrategia de marketing Web3 para un lanzamiento limitado con experiencia premium.",
    coverAlt: "Dunk Low Elixir Edition",
    coverImage: "/assets/placeholder.svg",
    accent: "purple",
  },
  {
    slug: "elixir-token",
    sourceUrl: "https://kinetora.tech/elixir-token/",
    category: "LANZAMIENTO PRODUCTO",
    title: "ELIXIR TOKEN: Campaña de lanzamiento global",
    summary:
      "Dirección de arte, identidad del token, creatividades para RRSS y assets de marketing para un lanzamiento global.",
    coverAlt: "Elixir Token",
    coverImage: "/assets/placeholder.svg",
    accent: "purple",
  },
  {
    slug: "chronosworlds",
    sourceUrl: "https://kinetora.tech/chronosworlds/",
    category: "UX/UI / REBRANDING",
    title: "CHRONOSWORLDS: El gran salto al 3D",
    summary:
      "Rebranding, UX/UI y piezas clave (pitch deck + assets sociales) para transformar percepción y elevar calidad.",
    coverAlt: "ChronosWorlds",
    coverImage: "/assets/placeholder.svg",
    accent: "teal",
  },
  {
    slug: "cybertitans-pulse-series",
    sourceUrl: "https://kinetora.tech/cybertitans-pulse-series/",
    category: "CRECIMIENTO SOCIAL / DISEÑO",
    title: "CYBERTITANS PULSE SERIES: Revolución visual eSports",
    summary:
      "Identidad visual, creatividades y contenido social para un torneo competitivo con narrativa clara y alto impacto.",
    coverAlt: "CyberTitans Pulse Series",
    coverImage: "/assets/placeholder.svg",
    accent: "teal",
  },
  {
    slug: "cybertitans-clash-impacto-brutal-y-evolucion-web3",
    sourceUrl:
      "https://kinetora.tech/cybertitans-clash-impacto-brutal-y-evolucion-web3/",
    category: "LANZAMIENTO PRODUCTO",
    title: "CYBERTITANS CLASH: Impacto brutal y evolución Web3",
    summary:
      "Sistema visual y narrativa para lanzamiento: dirección de arte, mensaje y assets para conversión.",
    coverAlt: "CyberTitans Clash",
    coverImage: "/assets/placeholder.svg",
    accent: "purple",
  },
  {
    slug: "robokiden-token",
    sourceUrl: "https://kinetora.tech/robokiden-token/",
    category: "LANZAMIENTO PRODUCTO",
    title: "ROBOKIDEN TOKEN: Campaña de lanzamiento global",
    summary:
      "Branding, UX/UI y ecosistema audiovisual para un lanzamiento Web3 con foco en retención y ventas.",
    coverAlt: "RoboKiden Token",
    coverImage: "/assets/placeholder.svg",
    accent: "purple",
  },
];