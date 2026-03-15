export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  coverAlt: string;
  coverImage: string;
  accent: "purple" | "teal";
  youtube?: { label: string; id: string }[];
  sections: {
    title: string;
    body: string[];
    images?: number; // number of placeholder images to render
  }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "dunk-low-elixir-edition",
    category: "LANZAMIENTO PRODUCTO",
    title: "DUNK LOW ELIXIR EDITION: Campaña de lanzamiento y airdrop global",
    summary:
      "Diseñamos la experiencia visual y técnica desde cero: landing, tráiler VFX y estrategia de recompensas para un lanzamiento limitado.",
    coverAlt: "Dunk Low Elixir Edition",
    coverImage: "/assets/placeholder.svg",
    accent: "purple",
    youtube: [
      { label: "Elixir Nike - Landing Page", id: "SmxMZZUsqIo" },
      { label: "Elixir Edition® Nike Dunk Low", id: "6FQVlBRWU-Y" },
    ],
    sections: [
      {
        title: "Estrategia de Marketing Web3: Activos Creados",
        body: [
          "Unir moda urbana y tecnología blockchain exigía una ejecución de Marketing Web3 de máxima precisión.",
          "Creamos una experiencia premium con un flujo de registro (waitlist) y una fase posterior de compra preparada para picos de tráfico.",
        ],
      },
      {
        title: "1. Landing Page",
        body: [
          "Desarrollamos la web oficial del evento con UX/UI estratégico para retener al visitante y convertir.",
          "La plataforma soportó tráfico masivo sin caídas y aseguró el registro perfecto de los 100 afortunados.",
        ],
        images: 1,
      },
      {
        title: "2. Vídeos, Motion e Imágenes",
        body: [
          "Producimos piezas audiovisuales para RRSS y creatividades estáticas para Discord y Twitter.",
          "El objetivo: mantener el interés alto y comunicar premios y fases con claridad.",
        ],
        images: 3,
      },
      {
        title: "3. Vídeo Lanzamiento (Edición, VFX, etc.)",
        body: [
          "Creamos un tráiler oficial con corrección de color y VFX 3D para una estética cinematográfica e inmersiva.",
        ],
        images: 1,
      },
      {
        title: "4. Estrategia de Marketing",
        body: [
          "Diseñamos un plan maestro de retención y recompensas (airdrops) para mantener a la comunidad activa durante semanas.",
        ],
      },
    ],
  },
  {
    slug: "elixir-token",
    category: "LANZAMIENTO PRODUCTO",
    title: "ELIXIR TOKEN: Campaña de Lanzamiento Global",
    summary:
      "Dirección de arte, identidad del token, campañas de vídeo y sistema de creatividades para un lanzamiento global con estética futurista.",
    coverAlt: "Elixir Token",
    coverImage: "/assets/placeholder.svg",
    accent: "purple",
    youtube: [
      { label: "Elixir Token Launch", id: "t3IcVBkewrg" },
      { label: "$ELIX IDO", id: "fuS1WG1g7iA" },
      { label: "Season Pass - $1M Airdrop", id: "XNdB0Z5n6rQ" },
      { label: "Season Pass - 12 Videogames", id: "DSQek3qNhq8" },
      { label: "Season Pass - Announcement", id: "FSkTdXPqlSY" },
    ],
    sections: [
      {
        title: "El Desarrollo Visual y Técnico del Proyecto",
        body: [
          "Apostamos por un formato dinámico y premium en modo oscuro para transmitir tecnología y ambición.",
        ],
      },
      {
        title: "1. Dirección de Arte y Diseño del Token",
        body: [
          "Construimos el concepto Ying/Yang con tonos rosados vibrantes y texturas metálicas para reforzar confianza y calidad AAA.",
        ],
        images: 4,
      },
      {
        title: "2. Vídeo de Lanzamiento (Edición y VFX)",
        body: [
          "Produjimos un tráiler cinemático con VFX 3D, gráficos holográficos y entornos digitales inmersivos.",
        ],
        images: 1,
      },
      {
        title: "3. Motion Graphics e imágenes para RRSS",
        body: [
          "Creamos piezas rápidas para explicar fases de compra y conceptos complejos en segundos.",
        ],
        images: 2,
      },
      {
        title: "4. Estrategia de Marketing Web3",
        body: [
          "Gamificamos el proceso con campañas y recompensas para maximizar retención y conversión.",
        ],
        images: 3,
      },
    ],
  },
  {
    slug: "chronosworlds",
    category: "UX/UI / REBRANDING",
    title: "El Gran Salto al 3D: Diseño Web3 para Transformar ChronosWorlds",
    summary:
      "Rebranding 3D, UX/UI, pitch deck y assets sociales para transformar la percepción del producto y aumentar tracción.",
    coverAlt: "ChronosWorlds",
    coverImage: "/assets/placeholder.svg",
    accent: "teal",
    sections: [
      {
        title: "Estrategia de Diseño Web3: Los Activos Entregados",
        body: [
          "Reestructuramos la narrativa visual para enamorar a la comunidad y atraer inversores.",
        ],
      },
      {
        title: "1. Rebranding Total del Logotipo",
        body: [
          "Rediseñamos el logotipo con un enfoque 3D brillante para transmitir acción y fuerza.",
        ],
        images: 1,
      },
      {
        title: "2. Diseño del Pitch Deck Estratégico",
        body: [
          "Creamos un pitch deck persuasivo, con jerarquía y visuales claros para reforzar confianza.",
        ],
        images: 2,
      },
      {
        title: "3. Nueva UX/UI del Videojuego",
        body: [
          "Rediseñamos la interfaz priorizando al viajero 3D y paneles laterales limpios para inventario, niveles y combate.",
        ],
        images: 2,
      },
      {
        title: "4. Vídeos, Motion e Imágenes (RRSS)",
        body: [
          "Producimos contenido dinámico para redes con foco en mundos 3D y anuncios de novedades.",
        ],
      },
      {
        title: "El Valor de una Gran Renovación Visual",
        body: [
          "Una dirección visual sólida multiplica alcance social y valor percibido, especialmente en productos Web3.",
        ],
      },
    ],
  },
  {
    slug: "cybertitans-pulse-series",
    category: "CRECIMIENTO SOCIAL / DISEÑO",
    title: "CyberTitans Pulse Series: Una Revolución Visual en los eSports",
    summary:
      "Dirección de arte, identidad visual y creatividades explosivas para un torneo masivo con premios de alto impacto.",
    coverAlt: "CyberTitans Pulse Series",
    coverImage: "/assets/placeholder.svg",
    accent: "teal",
    youtube: [
      { label: "Cybertitans Pulse Series AD1", id: "za4N6K06wno" },
      { label: "Cybertitans Pulse Series AD2", id: "FbMu9-idxVg" },
      { label: "Cybertitans Pulse Series Video Promo", id: "Z3Qj1_-ROs0" },
    ],
    sections: [
      {
        title: "Estrategia de Marketing Web3: Los Activos Creados",
        body: [
          "Creamos un paquete visual dinámico basado en contraste turquesa sobre fondos oscuros y una estética competitiva.",
        ],
      },
      {
        title: "1. Diseño de Logotipo Competitivo",
        body: [
          "Diseñamos un emblema afilado y agresivo, listo para eSports.",
        ],
        images: 1,
      },
      {
        title: "2. Diseño UX/UI del Videojuego",
        body: [
          "Creatividades centradas en premios gigantes y mensajes directos de urgencia.",
        ],
        images: 3,
      },
      {
        title: "3. Vídeos, Motion e Imágenes (RRSS)",
        body: [
          "Contenido social explosivo con miniaturas, anuncios y vídeos para mantener a la comunidad activa.",
        ],
      },
      {
        title: "4. Vídeo Manifiesto y Actualización (VFX)",
        body: [
          "Edición dinámica con gráficos/VFX y una estética cuidada en iluminación y color.",
        ],
      },
      {
        title: "El Impacto de un Buen Ecosistema Visual",
        body: [
          "Una imagen gráfica fuerte multiplica la tracción real y el rendimiento del evento.",
        ],
      },
    ],
  },
  {
    slug: "cybertitans-clash-impacto-brutal-y-evolucion-web3",
    category: "LANZAMIENTO PRODUCTO",
    title: "CyberTitans Clash: Impacto Brutal y Evolución Web3",
    summary:
      "Caso destacado de lanzamiento con identidad visual agresiva y narrativa enfocada a conversión.",
    coverAlt: "CyberTitans Clash",
    coverImage: "/assets/placeholder.svg",
    accent: "purple",
    sections: [
      {
        title: "Resumen",
        body: [
          "Un lanzamiento de alto impacto necesita una identidad visual que se sienta grande desde el primer segundo.",
          "Diseñamos el sistema de creatividades y la presentación para comunicar valor y urgencia con claridad.",
        ],
      },
    ],
  },
  {
    slug: "robokiden-token",
    category: "LANZAMIENTO PRODUCTO",
    title: "ROBOKIDEN TOKEN: Campaña de lanzamiento global",
    summary:
      "Estrategia Web3 completa con branding, UX/UI y ecosistema audiovisual para mantener atención y convertir en ventas.",
    coverAlt: "RoboKiden Token",
    coverImage: "/assets/placeholder.svg",
    accent: "purple",
    sections: [
      {
        title: "Estrategia de Marketing Web3: Activos Creados",
        body: [
          "Generar ventas millonarias exige un despliegue visual impecable y un embudo bien orquestado.",
        ],
        images: 1,
      },
      {
        title: "1. Estrategia de Marketing Web3",
        body: [
          "Estructuramos una colección de NFTs gratuitos como motor de comunidad y retención antes de la venta.",
        ],
        images: 3,
      },
      {
        title: "2. Diseño del Token en el Marketing Web3",
        body: [
          "Creamos el branding del token $KIDEN y su identidad visual para transmitir confianza financiera.",
        ],
      },
      {
        title: "3. Vídeos y Motion Graphics (RRSS)",
        body: [
          "Ecosistema audiovisual para cada plataforma con piezas enfocadas en urgencia y conversión.",
        ],
      },
      {
        title: "4. Landing Page de Alta Conversión",
        body: [
          "Desarrollamos la web oficial con contenedores multimedia y un flujo de ventas por fases.",
        ],
      },
      {
        title: "Resultados Reales: El Poder del Alto Rendimiento",
        body: [
          "La combinación de creatividad, tecnología y psicología se tradujo en resultados de negocio muy sólidos.",
        ],
      },
    ],
  },
];
