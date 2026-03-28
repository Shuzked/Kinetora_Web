"use client";

import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import Brands from '@/components/Brands';
import Stats from '@/components/Stats';
import ValueProp from '@/components/ValueProp';

// Lazy load non-critical sections below the fold
const HowItWorks = React.lazy(() => import('@/components/HowItWorks'));
const Services = React.lazy(() => import('@/components/Services'));
const Portfolio = React.lazy(() => import('@/components/Portfolio'));
const Testimonials = React.lazy(() => import('@/components/Testimonials'));
const Contact = React.lazy(() => import('@/components/Contact'));
const FAQ = React.lazy(() => import('@/components/FAQ'));
const Footer = React.lazy(() => import('@/components/Footer'));
const FloatingCTA = React.lazy(() => import('@/components/FloatingCTA'));
const StackingSection = React.lazy(() => import('@/components/StackingSection'));

// Intersection Observer based wrapper for deeper optimization
const SafeLazyLoad = ({ children, height = "400px" }: { children: React.ReactNode, height?: string }) => {
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

  const seo = getSeoDefaults(lang);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = `${origin}/`;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seo.siteName,
    "url": canonical,
    "logo": `${origin}/Logotipo.svg`,
    "@id": `${canonical}#organization`
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        image={seo.shareImage}
        canonical={canonical}
        locale={seo.locale}
        siteName={seo.siteName}
        ogType="website"
        twitterCard="summary_large_image"
        robots="index,follow"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            orgJsonLd,
            {
              "@type": "WebSite",
              "@id": `${canonical}#website`,
              "url": canonical,
              "name": seo.siteName,
              "publisher": { "@id": `${canonical}#organization` },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${canonical}?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            }
          ]
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
          
          <SafeLazyLoad height="600px">
            <Reveal as="div"><Services /></Reveal>
          </SafeLazyLoad>

          <SafeLazyLoad height="400px">
            <Reveal as="div"><HowItWorks /></Reveal>
          </SafeLazyLoad>

          <SafeLazyLoad height="800px">
            <Reveal as="div"><Portfolio /></Reveal>
          </SafeLazyLoad>

          <SafeLazyLoad height="600px">
            <Reveal as="div"><Testimonials /></Reveal>
          </SafeLazyLoad>

          <SafeLazyLoad height="600px">
            <Contact />
          </SafeLazyLoad>

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