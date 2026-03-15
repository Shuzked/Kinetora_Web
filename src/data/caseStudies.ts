export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  metric: string;
  summary: string;
  coverImage: string;
  tags: string[];
  challenge: string;
  solution: string;
  whatWeDid: string[];
  results: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "volta-fintech-onboarding",
    title: "Volta — Onboarding que convierte",
    sector: "Fintech SaaS",
    metric: "+40% activación",
    summary:
      "Rediseñamos el onboarding y el sistema de componentes para acelerar el time-to-value sin sacrificar claridad regulatoria.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bbb652167014?auto=format&fit=crop&q=80&w=1400",
    tags: ["UX/UI", "Design System", "Product"],
    challenge:
      "El flujo inicial era largo y confuso: demasiados pasos, copy poco claro y fricción en verificación. Esto frenaba la activación y aumentaba el abandono.",
    solution:
      "Simplificamos el recorrido, reorganizamos la jerarquía visual y construimos un sistema de componentes consistente para que el producto se sintiera rápido y premium.",
    whatWeDid: [
      "Auditoría de flujo y puntos de abandono",
      "Rediseño de onboarding (mobile-first)",
      "Componentes de formularios + estados (error/success)",
      "Ajuste de copy y microinteracciones",
    ],
    results: [
      { label: "Activación", value: "+40%" },
      { label: "Abandono", value: "-22%" },
      { label: "Tiempo de alta", value: "-31%" },
    ],
  },
  {
    slug: "healthup-app-ux",
    title: "HealthUp — UX clínico, experiencia humana",
    sector: "HealthTech",
    metric: "NPS +18",
    summary:
      "Optimizamos la navegación, el lenguaje visual y la lectura en pantallas pequeñas para mejorar confianza y adherencia.",
    coverImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1400",
    tags: ["UX/UI", "Mobile", "Research"],
    challenge:
      "La app tenía secciones críticas (informes, seguimiento, citas) con jerarquía débil. El usuario se perdía y percibía el producto como complejo.",
    solution:
      "Replanteamos la IA, creamos patrones de lectura claros y reforzamos el tono de marca con UI calmada, accesible y coherente.",
    whatWeDid: [
      "Reorganización de navegación y estructura",
      "Rediseño de pantallas clave",
      "Accesibilidad (contraste/tipografía)",
      "Componentes para datos clínicos y estados",
    ],
    results: [
      { label: "NPS", value: "+18" },
      { label: "Retención", value: "+12%" },
      { label: "Tickets", value: "-15%" },
    ],
  },
  {
    slug: "prism-ecommerce-landing",
    title: "Prism — Landing de performance",
    sector: "E-commerce",
    metric: "x3 ventas",
    summary:
      "Diseñamos una landing y kit creativo para campañas, priorizando velocidad de carga, claridad y autoridad de marca.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1400",
    tags: ["Landing", "Brand", "Ads"],
    challenge:
      "El tráfico pagado crecía, pero la conversión no acompañaba: propuesta difusa, demasiadas opciones y poca confianza.",
    solution:
      "Construimos una narrativa directa con secciones cortas, pruebas visuales y un sistema de creatividades alineado con la landing.",
    whatWeDid: [
      "Arquitectura de sección y narrativa",
      "Dirección de arte y layout responsive",
      "Kit de anuncios (formats + variantes)",
      "Optimización de legibilidad y confianza",
    ],
    results: [
      { label: "Ventas", value: "x3" },
      { label: "CVR", value: "+1.8pt" },
      { label: "CPA", value: "-19%" },
    ],
  },
  {
    slug: "nexus-ai-pitch-deck",
    title: "Nexus AI — Pitch deck que levanta",
    sector: "AI / B2B",
    metric: "2.1M€ seed",
    summary:
      "Rediseñamos el deck con narrativa, datos y storytelling visual para inversores.",
    coverImage:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1400",
    tags: ["Pitch Deck", "Brand", "Storytelling"],
    challenge:
      "El contenido era sólido, pero la estructura y el diseño no transmitían claridad ni ambición: demasiada densidad y poca jerarquía.",
    solution:
      "Creamos un deck modular con ritmo, jerarquía y visuales consistentes para que la historia se entendiera en minutos.",
    whatWeDid: [
      "Estructura del relato (problem/solution/market)",
      "Diseño de slides y gráficos",
      "Sistema de estilos y plantillas",
      "Iteración rápida con feedback",
    ],
    results: [
      { label: "Ronda", value: "2.1M€" },
      { label: "Tiempo", value: "7 días" },
      { label: "Slides", value: "18" },
    ],
  },
];
