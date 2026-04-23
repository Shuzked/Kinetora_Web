import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { caseStudies } from './data/caseStudies';

// Metadatos estáticos para asegurar 100/100 SEO durante SSG
const SEO_DATA: Record<string, any> = {
  es: {
    '/': {
      title: 'Kinetora | Diseño para Startups - Levanta Capital, Convierte Usuarios',
      desc: 'Estudio de diseño premium para startups. Levantamos capital y convertimos usuarios mediante ingeniería visual, web y producto.',
    },
    '/precios': {
      title: 'Planes de Diseño para Startups desde €1.900/mes | Kinetora',
      desc: 'Suscripción de diseño para startups sin permanencia. Entrega en 48h, revisiones ilimitadas y pausa cuando quieras.',
    },
    '/sobre': {
      title: 'Sobre Nosotros | Ingeniería Visual para Startups | Kinetora',
      desc: 'Ingeniería visual sin intermediarios. Conoce la historia de Kinetora y nuestro enfoque radical para escalar startups.',
    },
    '/legal/aviso-legal': { title: 'Aviso Legal | Kinetora', desc: 'Información legal sobre Kinetora.' },
    '/legal/politica-privacidad': { title: 'Política de Privacidad | Kinetora', desc: 'Cómo tratamos tus datos en Kinetora.' },
    '/legal/politica-cookies': { title: 'Política de Cookies | Kinetora', desc: 'Información sobre el uso de cookies en Kinetora.' },
    '/legal/privacidad-redes-sociales': { title: 'Privacidad en Redes Sociales | Kinetora', desc: 'Privacidad en nuestras plataformas sociales.' },
    '/casos': { title: 'Casos de Éxito | Kinetora', desc: 'Resultados reales con impacto medible. Explora nuestros casos de éxito en diseño y producto para startups Web3 y tech.' },
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
      title: 'Kinetora | Design for Startups - Raise Capital, Convert Users',
      desc: 'Premium design studio for startups. We raise capital and convert users through visual engineering, web, and product.',
    },
    '/precios': {
      title: 'Monthly Design Subscription for Startups | Kinetora',
      desc: 'Design subscription for startups with no commitment. 48h delivery, unlimited revisions, and pause anytime.',
    },
    '/sobre': {
      title: 'About Us | Visual Engineering for Startups | Kinetora',
      desc: 'Visual engineering without middlemen. Discover the Kinetora story and our radical approach to scaling startups.',
    },
    '/legal/aviso-legal': { title: 'Legal Notice | Kinetora', desc: 'Legal information about Kinetora.' },
    '/legal/politica-privacidad': { title: 'Privacy Policy | Kinetora', desc: 'How we handle your data at Kinetora.' },
    '/legal/politica-cookies': { title: 'Cookies Policy | Kinetora', desc: 'Information about cookie usage at Kinetora.' },
    '/legal/privacidad-redes-sociales': { title: 'Social Media Privacy | Kinetora', desc: 'Privacy on our social platforms.' },
    '/casos': { title: 'Case Studies · Real Results · Web3 & Startup Design — Kinetora', desc: 'Real results with measurable impact. Explore our design and product case studies for Web3 and tech startups.' },
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
  const helmetScript = helmet?.script?.toString() || '';
  
  // --- Fail-safe JSON-LD Generation ---
  const manualJsonLd = generateManualJsonLd(url, lang);
  const manualJsonLdScript = manualJsonLd 
    ? `<script type="application/ld+json" data-rh="true">${JSON.stringify(manualJsonLd)}</script>`
    : '';

  let head = helmet ? `
    ${helmet.title?.toString() || ''}
    ${helmet.meta?.toString() || ''}
    ${helmet.link?.toString() || ''}
    ${helmetScript}
    ${manualJsonLdScript}
  `.trim() : manualJsonLdScript;

  // Post-process to ensure data-rh="true" for all injected tags
  if (head) {
    head = head.replace(/<(title|meta|link|script)(?![^>]*data-rh=)(?![^>]*src=)/gi, '<$1 data-rh="true"');
  }

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
    }
    
    if (!data) data = SEO_DATA[lang]['/'];
    const domain = lang === 'es' ? 'https://kinetora.es' : 'https://kinetora.tech';
    const altDomain = lang === 'es' ? 'https://kinetora.tech' : 'https://kinetora.es';
    const altLang = lang === 'es' ? 'en' : 'es';
    
    head = `
      <title data-rh="true">${data.title}</title>
      <meta data-rh="true" name="description" content="${data.desc}" />
      <link data-rh="true" rel="canonical" href="${domain}${url === '/' ? '' : url}" />
      <link data-rh="true" rel="alternate" hreflang="${altLang}" href="${altDomain}${url === '/' ? '' : url}" />
      <link data-rh="true" rel="alternate" hreflang="x-default" href="https://kinetora.tech${url === '/' ? '' : url}" />
      ${manualJsonLdScript}
    `.trim();
  }

  return { html: appHtml, head: head };
}

function generateManualJsonLd(url: string, lang: 'en' | 'es') {
  const domain = lang === 'es' ? 'https://kinetora.es' : 'https://kinetora.tech';
  const fullUrl = `${domain}${url === '/' ? '' : url}`;

  // Organization Schema (Global)
  const organization = {
    "@type": "Organization",
    "@id": `${domain}/#organization`,
    "name": "Kinetora",
    "url": domain,
    "logo": {
      "@type": "ImageObject",
      "url": `${domain}/Logotipo.svg`
    },
    "sameAs": [
      "https://x.com/kinetora",
      "https://linkedin.com/company/kinetora"
    ]
  };

  // 1. Home
  if (url === '/' || url === '') {
    return {
      "@context": "https://schema.org",
      "@graph": [
        organization,
        {
          "@type": "WebSite",
          "@id": `${domain}/#website`,
          "url": domain,
          "name": "Kinetora",
          "publisher": { "@id": `${domain}/#organization` }
        },
        {
          "@type": "WebPage",
          "@id": `${fullUrl}#webpage`,
          "url": fullUrl,
          "name": lang === 'es' ? "Kinetora | Ingeniería Visual para Startups" : "Kinetora | Visual Engineering for Startups",
          "description": lang === 'es' ? "Estudio de diseño premium para startups." : "Premium design studio for startups.",
          "isPartOf": { "@id": `${domain}/#website` },
          "about": { "@id": `${domain}/#organization` }
        }
      ]
    };
  }

  // 2. Sobre (Person Schema)
  if (url === '/sobre') {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${domain}/sobre#person`,
          "name": "Rafael Muñoz",
          "jobTitle": "Founder & Creative Director",
          "url": fullUrl,
          "sameAs": ["https://linkedin.com/in/rafael-munoz-kinetora"]
        },
        {
          "@type": "WebPage",
          "@id": `${fullUrl}#webpage`,
          "url": fullUrl,
          "name": lang === 'es' ? "Sobre Nosotros | Kinetora" : "About Us | Kinetora",
          "isPartOf": { "@id": `${domain}/#website` },
          "mainEntity": { "@id": `${domain}/sobre#person` }
        }
      ]
    };
  }

  // 3. Casos (Collection)
  if (url === '/casos') {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${fullUrl}#webpage`,
      "url": fullUrl,
      "name": lang === 'es' ? "Casos de Éxito | Kinetora" : "Case Studies | Kinetora",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": caseStudies.map((study, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${domain}/casos/${study.slug}`
        }))
      }
    };
  }

  // 4. Case Study Post
  if (url.startsWith('/casos/')) {
    const slug = url.split('/').pop() || '';
    const study = caseStudies.find(s => s.slug === slug);
    if (study) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${fullUrl}#article`,
        "headline": lang === 'es' ? study.title : (study.titleEn || study.title),
        "image": `${domain}${study.coverImage}`,
        "author": { "@type": "Person", "name": "Rafael Muñoz" },
        "publisher": { "@id": `${domain}/#organization` },
        "url": fullUrl
      };
    }
  }

  return null;
}
