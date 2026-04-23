import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import Brands from '@/components/Brands';
import Stats from '@/components/Stats';
import ValueProp from '@/components/ValueProp';

import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import StackingSection from '@/components/StackingSection';
import PricingSection from '@/components/Pricing';

// Intersection Observer based wrapper for deeper optimization
const SafeLazyLoad = ({ children, height = "400px" }: { children: React.ReactNode, height?: string }) => {
  // SSR / Prerender (Node.js): IntersectionObserver doesn't exist.
  // Render children directly so the baked HTML contains all content for crawlers.
  if (typeof window === 'undefined') {
    return (
      <React.Suspense fallback={null}>
        {children}
      </React.Suspense>
    );
  }

  const [isIntersecting, setIntersecting] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isIntersecting ? "auto" : height }}>
      {isIntersecting ? (
        <React.Suspense fallback={<div style={{ height }} />}>
          {children}
        </React.Suspense>
      ) : null}
    </div>
  );
};
import SEO from '@/components/SEO';
import { getSeoDefaults } from '@/seo/defaults';
import { useI18n } from '@/i18n/I18nProvider';

const Index = () => {
  const location = useLocation();
  const { lang } = useI18n();

  React.useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    if (!id) return;

    // Las secciones son lazy-loaded con IntersectionObserver, por lo que el
    // elemento puede no estar en el DOM inmediatamente. Reintentamos hasta 20
    // veces con 100ms de espacio (~2 segundos en total).
    let attempts = 0;
    const maxAttempts = 20;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const nav = document.querySelector("nav") as HTMLElement | null;
        const offset = (nav?.offsetHeight || 0) + 16;
        const rect = el.getBoundingClientRect();
        const y = rect.top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
        return;
      }
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 100);
      }
    };

    // Primer intento con pequeño delay para dejar que React monte los componentes
    setTimeout(tryScroll, 150);
  }, [location.hash]);

  const isES = lang === 'es';
  if (typeof window === 'undefined') {
    console.log(`[Index] SSR Rendering. lang value: "${lang}", isES: ${isES}`);
  }
  const currentLang = isES ? 'es' : 'en';
  
  const title = isES 
    ? "Kinetora | Diseño para Startups - Levanta Capital, Convierte Usuarios"
    : "Kinetora | Design for Startups - Raise Capital, Convert Users";
  
  const description = isES
    ? "Estudio de ingeniería visual y diseño UX/UI de élite para startups. Elevamos tu producto para levantar capital y convertir usuarios con entregas en 48h."
    : "Elite visual engineering and UX/UI design studio for startups. We elevate your product to raise capital and convert users with 48h delivery.";

  const origin = isES ? 'https://kinetora.es' : 'https://kinetora.tech';
  const { pathname } = useLocation();
  const canonical = `${origin}${pathname === '/' ? '/' : pathname}`;

  // ── Hreflang: "es" no "es-ES" para cobertura nacional amplia
  const alternates = [
    { hrefLang: 'es', href: 'https://kinetora.es/' },
    { hrefLang: 'en', href: 'https://kinetora.tech/' },
    { hrefLang: 'x-default', href: 'https://kinetora.tech/' }
  ];

  // ── Schema .tech: Organization global ────────────────────────────────────
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kinetora",
    "url": canonical,
    "logo": `${origin}/Logotipo.svg`,
    "@id": `${canonical}#organization`,
    "areaServed": isES
      ? ["ES", "España", "Madrid", "Barcelona", "Sevilla", "Andalucía", "Valencia", "Bilbao"]
      : "Worldwide",
    "sameAs": ["https://www.linkedin.com/company/kinetora", "https://www.instagram.com/kinetora_studio"]
  };

  // ── Schema .es: ProfessionalService con geo + areaServed nacional ────────
  const localJsonLd = isES ? {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Kinetora",
    "image": "https://kinetora.es/assets/social/kinetora-social-share.webp",
    "@id": "https://kinetora.es/#professional-service",
    "url": "https://kinetora.es",
    "telephone": "",
    "priceRange": "€€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Priego de Córdoba",
      "postalCode": "14800",
      "addressRegion": "Andalucía",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.4381,
      "longitude": -4.1942
    },
    "areaServed": ["ES", "España", "Madrid", "Barcelona", "Sevilla", "Andalucía", "Valencia", "Bilbao"],
    "description": description,
    "knowsAbout": ["Diseño Web", "Branding", "Cartelería", "UX/UI", "Identidad Visual", "Desarrollo Frontend"],
    "sameAs": ["https://www.linkedin.com/company/kinetora", "https://www.instagram.com/kinetora_studio"]
  } : null;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <SEO
        title={title}
        description={description}
        ogType="website"
        alternates={alternates}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            orgJsonLd,
            localJsonLd,
            {
              "@type": "WebSite",
              "@id": `${origin}/#website`,
              "url": `${origin}/`,
              "name": "Kinetora",
              "publisher": { "@id": `${origin}/#organization` },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${origin}/?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            }
          ].filter(Boolean)
        }}
      />

      <Navbar />
      <main id="main-content" role="main" aria-label="Main content" className="relative">
        <Hero />
        
        {/* Content Shield (Layer 1) covers the Sticky Hero (Layer 0) */}
        <div className="relative z-10 bg-[#0D0D0D] shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
          <Reveal as="div"><Brands /></Reveal>
          <Reveal as="div"><Stats /></Reveal>
          <Reveal as="div"><ValueProp /></Reveal>
          
          <div id="servicios" className="scroll-mt-24 md:scroll-mt-28">
            <SafeLazyLoad height="600px">
              <Reveal as="div"><Services /></Reveal>
            </SafeLazyLoad>
          </div>

          <div id="como-funciona" className="scroll-mt-24 md:scroll-mt-28">
            <SafeLazyLoad height="400px">
              <Reveal as="div"><HowItWorks /></Reveal>
            </SafeLazyLoad>
          </div>

          <div id="casos" className="scroll-mt-24 md:scroll-mt-28">
            <SafeLazyLoad height="800px">
              <Reveal as="div"><Portfolio /></Reveal>
            </SafeLazyLoad>
          </div>

          <SafeLazyLoad height="600px">
            <Reveal as="div"><Testimonials /></Reveal>
          </SafeLazyLoad>

          <div id="precios" className="scroll-mt-24 md:scroll-mt-28 pt-8">
            <SafeLazyLoad height="600px">
              <PricingSection />
            </SafeLazyLoad>
          </div>

          <div id="contacto" className="scroll-mt-24 md:scroll-mt-28">
            <SafeLazyLoad height="600px">
              <Contact />
            </SafeLazyLoad>
          </div>

          <SafeLazyLoad height="400px">
            <FAQ />
          </SafeLazyLoad>
        </div>
      </main>
      
      <SafeLazyLoad height="300px">
        <Footer />
      </SafeLazyLoad>

      <React.Suspense fallback={null}>
        <FloatingCTA />
      </React.Suspense>
    </div>
  );
};

export default Index;