import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

// Metadatos estáticos para asegurar 100/100 SEO durante SSG
const SEO_DATA: Record<string, any> = {
  es: {
    '/': {
      title: 'Kinetora | Diseño para Startups - Levanta Capital, Convierte Usuarios.',
      desc: 'Agencia de suscripción de diseño para startups. Elevamos tu marca para levantar capital y convertir usuarios con diseño premium en 48h.',
    },
    '/precios': {
      title: 'Planes de Diseño para Startups desde €1.900/mes | Kinetora',
      desc: 'Suscripción de diseño mensual sin permanencia. Entregas en 48h para startups Seed y Series A/B. Pausa o cancela cuando quieras.',
    },
    '/sobre': {
      title: 'Sobre Kinetora | El Futuro del Diseño para Startups',
      desc: 'Conoce al equipo detrás de Kinetora. Ayudamos a fundadores a escalar sus productos con diseño de clase mundial.',
    },
    '/legal/aviso-legal': { title: 'Aviso Legal | Kinetora', desc: 'Información legal sobre Kinetora.' },
    '/legal/politica-privacidad': { title: 'Política de Privacidad | Kinetora', desc: 'Cómo tratamos tus datos en Kinetora.' },
    '/legal/politica-cookies': { title: 'Política de Cookies | Kinetora', desc: 'Información sobre el uso de cookies en Kinetora.' },
    '/legal/privacidad-redes-sociales': { title: 'Privacidad en Redes Sociales | Kinetora', desc: 'Privacidad en nuestras plataformas sociales.' },
    '/casos': { title: 'Casos de Éxito | Kinetora', desc: 'Portafolio de diseño premium para startups.' },
    '/casos/elixir-games': { 
      title: 'Elixir Games: €14M levantados - Dirección Creativa Web3 | Kinetora', 
      desc: 'Dirección creativa y ecosistema global para Elixir Games. +14M levantados en capital.' 
    },
    '/casos/elixir-token': { 
      title: 'Elixir Token: $14.2M en ventas - Campaña de Lanzamiento | Kinetora', 
      desc: 'Campaña de lanzamiento global para Elixir Token. +$14.2M en ventas generadas.' 
    },
    '/casos/chronosworlds': { 
      title: 'ChronosWorlds: Rebranding 3D + UX/UI $12M | Kinetora', 
      desc: 'Rebranding 3D y diseño UX/UI para ChronosWorlds. Elevando la calidad visual al siguiente nivel.' 
    },
    '/casos/cybertitans-clash': { 
      title: 'CyberTitans Clash: +1.5M impacto - Diseño Web3 | Kinetora', 
      desc: 'Diseño Web3 y evolución visual para CyberTitans Clash. Más de 1.5M de impacto orgánico.' 
    },
    '/casos/cybertitans-pulse': { 
      title: 'CyberTitans Pulse Series: Revolución visual eSports | Kinetora', 
      desc: 'Identidad visual y revolución creativa para la serie Pulse de CyberTitans.' 
    },
    '/casos/cybertitans-pulse-series': { 
      title: 'CyberTitans Pulse Series: Revolución visual eSports | Kinetora', 
      desc: 'Identidad visual y revolución creativa para la serie Pulse de CyberTitans.' 
    },
    '/casos/robokiden-token': { 
      title: 'Robokiden Token: +$1.15M en ventas - Lanzamiento Global | Kinetora', 
      desc: 'Lanzamiento global y branding para Robokiden Token. +$1.15M en ventas.' 
    },
  },
  en: {
    '/': {
      title: 'Kinetora | Design for Startups - Raise Capital, Convert Users.',
      desc: 'Design subscription agency for startups. We elevate your brand to raise capital and convert users with premium design in 48h.',
    },
    '/precios': {
      title: 'Design Plans for Startups starting at €1,900/mo | Kinetora',
      desc: 'Monthly design subscription with no commitment. 48h deliveries for Seed and Series A/B startups. Pause or cancel anytime.',
    },
    '/sobre': {
      title: 'About Kinetora | The Future of Startup Design',
      desc: 'Meet the team behind Kinetora. We help founders scale their products with world-class design.',
    },
    '/legal/aviso-legal': { title: 'Legal Notice | Kinetora', desc: 'Legal information about Kinetora.' },
    '/legal/politica-privacidad': { title: 'Privacy Policy | Kinetora', desc: 'How we handle your data at Kinetora.' },
    '/legal/politica-cookies': { title: 'Cookies Policy | Kinetora', desc: 'Information about cookie usage at Kinetora.' },
    '/legal/privacidad-redes-sociales': { title: 'Social Media Privacy | Kinetora', desc: 'Privacy on our social platforms.' },
    '/casos': { title: 'Case Studies | Kinetora', desc: 'Portfolio of premium design for startups.' },
    '/casos/elixir-games': { 
      title: 'Elixir Games: €14M raised - Web3 Creative Direction | Kinetora', 
      desc: 'Creative direction and global ecosystem for Elixir Games. +14M raised in capital.' 
    },
    '/casos/elixir-token': { 
      title: 'Elixir Token: $14.2M in sales - Global Launch Campaign | Kinetora', 
      desc: 'Global launch campaign for Elixir Token. +$14.2M in sales generated.' 
    },
    '/casos/chronosworlds': { 
      title: 'ChronosWorlds: 3D Rebranding + UX/UI $12M | Kinetora', 
      desc: '3D rebranding and UX/UI design for ChronosWorlds. Elevating visual quality to the next level.' 
    },
    '/casos/cybertitans-clash': { 
      title: 'CyberTitans Clash: +1.5M impact - Web3 Design | Kinetora', 
      desc: 'Web3 design and visual evolution for CyberTitans Clash. Over 1.5M organic impact.' 
    },
    '/casos/cybertitans-pulse': { 
      title: 'CyberTitans Pulse Series: eSports Visual Revolution | Kinetora', 
      desc: 'Visual identity and creative revolution for the CyberTitans Pulse series.' 
    },
    '/casos/cybertitans-pulse-series': { 
      title: 'CyberTitans Pulse Series: eSports Visual Revolution | Kinetora', 
      desc: 'Visual identity and creative revolution for the CyberTitans Pulse series.' 
    },
    '/casos/robokiden-token': { 
      title: 'Robokiden Token: +$1.15M in sales - Global Launch | Kinetora', 
      desc: 'Global launch and branding for Robokiden Token. +$1.15M in sales.' 
    },
  }
};

import { caseStudies } from './data/caseStudies';

export async function render(url: string, lang: 'en' | 'es'): Promise<{ html: string; head: string }> {
  const helmetContext: any = {};
  let appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App serverLang={lang} />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  let head = helmet ? `
    ${helmet.title?.toString() || ''}
    ${helmet.meta?.toString() || ''}
    ${helmet.link?.toString() || ''}
    ${helmet.script?.toString() || ''}
  `.trim() : '';

  // Fallback if helmet is empty (e.g. during build hiccups)
  if (!head || head.length < 10) {
    let data = SEO_DATA[lang][url];
    let studySchema = '';

    if (!data && url.startsWith('/casos/')) {
      const slug = url.split('/').pop() || '';
      const study = caseStudies.find(s => s.slug === slug);
      const title = study ? (lang === 'es' ? (study.title || study.label) : (study.titleEn || study.labelEn || study.label)) : slug;
      
      data = {
        title: study ? (lang === 'es' ? `${title} | Kinetora` : `${title} | Kinetora`) : `${slug} | Case Study | Kinetora`,
        desc: study ? (lang === 'es' ? (study.summaryFallback || '') : (study.summaryFallbackEn || study.summaryFallback || '')) : (lang === 'es' ? `Caso de éxito de diseño para ${slug}.` : `Design case study for ${slug}.`)
      };

      // Optimized @graph Schema Fallback for Case Studies
      const baseUrl = lang === 'es' ? 'https://kinetora.es' : 'https://kinetora.tech';
      const urlId = `${baseUrl}${url}`;
      
      const graphSchema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CreativeWork",
            "@id": `${urlId}#creativework`,
            "name": data.title,
            "description": data.desc,
            "url": urlId,
            "author": { "@type": "Organization", "name": "Kinetora" }
          },
          {
            "@type": "Article",
            "@id": `${urlId}#article`,
            "headline": data.title,
            "description": data.desc,
            "mainEntityOfPage": { "@type": "WebPage", "@id": urlId },
            "author": { "@type": "Organization", "name": "Kinetora" }
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${urlId}#breadcrumb`,
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": lang === 'es' ? "Inicio" : "Home", "item": baseUrl },
              { "@type": "ListItem", "position": 2, "name": lang === 'es' ? "Casos" : "Case Studies", "item": `${baseUrl}/casos` },
              { "@type": "ListItem", "position": 3, "name": study?.label || slug, "item": urlId }
            ]
          }
        ]
      };
      studySchema = `
        <script type="application/ld+json">${JSON.stringify(graphSchema)}</script>
      `;
    }
    
    if (!data) data = SEO_DATA[lang]['/'];
    const domain = lang === 'es' ? 'https://kinetora.es' : 'https://kinetora.tech';
    const altDomain = lang === 'es' ? 'https://kinetora.tech' : 'https://kinetora.es';
    const altLang = lang === 'es' ? 'en' : 'es';
    
    head = `
      <title>${data.title}</title>
      <meta name="description" content="${data.desc}" />
      <link rel="canonical" href="${domain}${url === '/' ? '' : url}" />
      <link rel="alternate" hreflang="${altLang}" href="${altDomain}${url === '/' ? '' : url}" />
      <link rel="alternate" hreflang="x-default" href="https://kinetora.tech${url === '/' ? '' : url}" />
      ${studySchema}
    `.trim();
  }

  return { html: appHtml, head: head };
}
