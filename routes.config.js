// routes.config.js
const routes = [
  {
    path: '/',
    en: {
      title: 'Kinetora | B2B Startup Design Studio - Raise Capital & Convert Users',
      description: 'Premium design studio for venture-backed SaaS, Web3, and gaming startups. We accelerate product launches, design brand identities, and raise capital.',
    },
    es: {
      title: 'Kinetora | Estudio de Diseño B2B - Levanta Capital y Convierte Usuarios',
      description: 'Estudio de diseño premium para startups SaaS, Web3 y gaming de alto crecimiento. Aceleramos tu marca, producto e inversión en ciclos de 48h.',
    },
  },
  {
    path: '/casos',
    en: {
      title: 'Startup Case Studies | Kinetora - Real Conversion Outcomes',
      description: 'Explore design case studies from Elixir Games, ChronosWorlds, CyberTitans, and more. Proven growth, user acquisition, and funding outcomes.',
    },
    es: {
      title: 'Casos de Estudio | Kinetora - Resultados de Conversión Reales',
      description: 'Explora nuestros casos de diseño con startups: Elixir Games, ChronosWorlds, CyberTitans y más. Resultados probados en captación e inversión.',
    },
  },
  {
    path: '/casos/elixir-games',
    en: {
      title: 'Elixir Games: Global Ecosystem & Web3 | Case Study | Kinetora',
      description: 'How Kinetora built the global brand ecosystem and product narrative for Elixir Games to dominate Web3 gaming and raise $14M+.',
    },
    es: {
      title: 'Elixir Games: Liderazgo Web3 y Ecosistema Global | Caso de Estudio | Kinetora',
      description: 'Cómo Kinetora diseñó el ecosistema global de marca y producto de Elixir Games para liderar el sector Web3 y levantar +14M$.',
    },
  },
  {
    path: '/casos/dunk-low-elixir-edition',
    en: {
      title: 'Dunk Low Elixir: Sold Out in 48h Drop | Case Study | Kinetora',
      description: 'How our strategic landing page, motion design, and premium Web3 product launch assets sold out Dunk Low Elixir Edition in 48 hours.',
    },
    es: {
      title: 'Dunk Low Elixir: Campaña Sold Out en 48h | Caso de Estudio | Kinetora',
      description: 'Cómo nuestra landing, motion graphics y assets premium vendieron todo el stock de Dunk Low Elixir Edition en solo 48 horas.',
    },
  },
  {
    path: '/casos/elixir-token',
    en: {
      title: 'Elixir Token: Global Launch Campaign & Web3 | Case Study | Kinetora',
      description: 'Strategic art direction, token branding, and social marketing creatives that supported Elixir Games global token launch.',
    },
    es: {
      title: 'Elixir Token: Campaña de Lanzamiento Global Web3 | Caso de Estudio | Kinetora',
      description: 'Dirección de arte estratégica, identidad de token y creatividades para redes que impulsaron el lanzamiento de Elixir Token.',
    },
  },
  {
    path: '/casos/chronosworlds',
    en: {
      title: 'ChronosWorlds: 3x Traffic Web3 Rebrand | Case Study | Kinetora',
      description: 'Rebranding, high-fidelity UX/UI design, and pitch deck strategy that drove 3x record traffic and secured Series seed funding.',
    },
    es: {
      title: 'ChronosWorlds: Rebranding Web3 con Tráfico x3 | Caso de Estudio | Kinetora',
      description: 'Rebranding, diseño UX/UI de alta fidelidad y pitch deck que multiplicaron el tráfico por 3 y aseguraron inversión semilla.',
    },
  },
  {
    path: '/casos/cybertitans-pulse-series',
    en: {
      title: 'CyberTitans Pulse: 1.4M Reach eSports Launch | Case Study | Kinetora',
      description: 'Visual system, competitive brand narrative, and dynamic social content that reached 1.4M users for CyberTitans Pulse Series.',
    },
    es: {
      title: 'CyberTitans Pulse: Lanzamiento eSports con 1,4M Alcance | Caso de Estudio | Kinetora',
      description: 'Sistema visual, narrativa competitiva y assets de redes con 1,4M de alcance orgánico para CyberTitans Pulse Series.',
    },
  },
  {
    path: '/casos/cybertitans-clash',
    en: {
      title: 'CyberTitans Clash: UI/UX & Web3 Evolution | Case Study | Kinetora',
      description: 'High-performance visual systems and player UI/UX designed to drive user retention and organic reach for eSports tournaments.',
    },
    es: {
      title: 'CyberTitans Clash: Evolución Web3 e Interfaz UI/UX | Caso de Estudio | Kinetora',
      description: 'Diseño de interfaz UI/UX de alto rendimiento y sistema visual para eSports enfocados en retención y crecimiento orgánico.',
    },
  },
  {
    path: '/casos/robokiden-token',
    en: {
      title: 'RoboKiden: $1.15M Sales Token Launch | Case Study | Kinetora',
      description: 'Branding, conversion-led UX/UI web design, and audiovisual assets for RoboKiden\'s token launch, generating $1.15M+ in sales.',
    },
    es: {
      title: 'RoboKiden: Lanzamiento de Token con 1,15M$ Ventas | Caso de Estudio | Kinetora',
      description: 'Diseño UX/UI orientado a conversión, branding y assets audiovisuales para RoboKiden, logrando más de 1,15M$ en ventas.',
    },
  },
  {
    path: '/precios',
    en: {
      title: 'Startup Design Subscription Plans | Kinetora - Fixed Prices',
      description: 'Predictable monthly subscription plans for seed and Series A/B startups. Unlimited design requests and revisions. Pause or cancel anytime.',
    },
    es: {
      title: 'Planes de Suscripción de Diseño para Startups | Kinetora',
      description: 'Planes mensuales fijos y predecibles para startups en fase Seed y Series A/B. Solicitudes y revisiones ilimitadas. Pausa o cancela cuando quieras.',
    },
  },
  {
    path: '/sobre',
    en: {
      title: 'About the Studio | Kinetora - Premium Startup Design',
      description: 'Learn about Kinetora\'s design engineering methodology, zero friction, 48-hour delivery cycles, and our mission to shape the future of B2B startups.',
    },
    es: {
      title: 'Sobre el Estudio | Kinetora - Diseño de Producto Premium',
      description: 'Conoce la metodología de ingeniería de diseño de Kinetora, sin fricciones, ciclos de entrega de 48h y nuestra misión de impulsar startups B2B.',
    },
  },
  // Legal pages
  {
    path: '/legal/aviso-legal',
    en: { title: 'Legal Notice | Kinetora', description: 'Legal notice for kinetora.tech.' },
    es: { title: 'Aviso Legal | Kinetora', description: 'Aviso legal de kinetora.es.' },
  },
  {
    path: '/legal/politica-privacidad',
    en: { title: 'Privacy Policy | Kinetora', description: 'Privacy policy for kinetora.tech.' },
    es: { title: 'Política de Privacidad | Kinetora', description: 'Política de privacidad de kinetora.es.' },
  },
  {
    path: '/legal/politica-cookies',
    en: { title: 'Cookie Policy | Kinetora', description: 'Cookie policy for kinetora.tech.' },
    es: { title: 'Política de Cookies | Kinetora', description: 'Política de cookies de kinetora.es.' },
  },
  {
    path: '/legal/privacidad-redes-sociales',
    en: { title: 'Social Media Privacy | Kinetora', description: 'Social media privacy policy for kinetora.tech.' },
    es: { title: 'Privacidad en Redes Sociales | Kinetora', description: 'Política de privacidad en redes sociales de kinetora.es.' },
  },
];

module.exports = { routes };
