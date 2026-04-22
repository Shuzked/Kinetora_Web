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
      title: 'Suscripción de Diseño Mensual para Startups | Kinetora',
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
  },
  en: {
    '/': {
      title: 'Kinetora | Design for Startups - Raise Capital, Convert Users.',
      desc: 'Design subscription agency for startups. We elevate your brand to raise capital and convert users with premium design in 48h.',
    },
    '/precios': {
      title: 'Monthly Design Subscription for Startups | Kinetora',
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
  let head = helmet ? `
    ${helmet.title?.toString() || ''}
    ${helmet.meta?.toString() || ''}
    ${helmet.link?.toString() || ''}
    ${helmet.script?.toString() || ''}
  `.trim() : '';

  if (!head || head.length < 50) {
    let data = SEO_DATA[lang][url];
    if (!data && url.startsWith('/casos/')) {
      const slug = url.split('/').pop()?.replace(/-/g, ' ') || '';
      const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);
      data = {
        title: `${capitalizedSlug} | Case Study | Kinetora`,
        desc: lang === 'es' ? `Caso de éxito de diseño para ${capitalizedSlug}.` : `Design case study for ${capitalizedSlug}.`
      };
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
    `.trim();
  }

  return { html: appHtml, head: head };
}
