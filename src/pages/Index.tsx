import React, { Suspense, lazy } from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';

// Chunks pesados diferidos (Code-splitting)
const Brands = lazy(() => import('@/components/Brands'));
const Stats = lazy(() => import('@/components/Stats'));
const ValueProp = lazy(() => import('@/components/ValueProp'));
const HowItWorks = lazy(() => import('@/components/HowItWorks'));
const Services = lazy(() => import('@/components/Services'));
const Portfolio = lazy(() => import('@/components/Portfolio')); // Contiene Swiper
const Testimonials = lazy(() => import('@/components/Testimonials'));
const Contact = lazy(() => import('@/components/Contact'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));
const FloatingCTA = lazy(() => import('@/components/FloatingCTA'));
const PricingSection = lazy(() => import('@/components/Pricing'));

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
import { useI18n } from '@/i18n/I18nProvider';

const Index = () => {
  const location = useLocation();
  const { lang, t } = useI18n();

  React.useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    if (!id) return;

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

    setTimeout(tryScroll, 150);
  }, [location.hash]);

  const isES = lang === 'es';
  const currentLang = isES ? 'es' : 'en';
  
  const title = t("seo.home.title");
  const description = t("seo.home.description");

  const origin = isES ? 'https://kinetora.es' : 'https://kinetora.tech';
  const { pathname } = useLocation();
  const canonical = `${origin}${pathname === '/' ? '/' : pathname}`;

  const alternates = [
    { hrefLang: 'es', href: 'https://kinetora.es/' },
    { hrefLang: 'en', href: 'https://kinetora.tech/' },
    { hrefLang: 'x-default', href: 'https://kinetora.tech/' }
  ];

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
        
        <div className="mt-[100svh] relative z-10 bg-[#0D0D0D] shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
          <SafeLazyLoad height="200px">
            <Reveal as="div"><Brands /></Reveal>
          </SafeLazyLoad>

          <SafeLazyLoad height="300px">
            <Reveal as="div"><Stats /></Reveal>
          </SafeLazyLoad>

          <SafeLazyLoad height="600px">
            <Reveal as="div"><ValueProp /></Reveal>
          </SafeLazyLoad>
          
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

      <Suspense fallback={null}>
        <FloatingCTA />
      </Suspense>
    </div>
  );
};

export default Index;