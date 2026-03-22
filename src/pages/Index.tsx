"use client";

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

    const el = document.getElementById(id);
    if (!el) return;

    const nav = document.querySelector("nav") as HTMLElement | null;
    const offset = (nav?.offsetHeight || 0) + 8;

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
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
          <Reveal as="div"><Services /></Reveal>
          <Reveal as="div"><HowItWorks /></Reveal>
          <Reveal as="div"><Portfolio /></Reveal>
          <Reveal as="div"><Testimonials /></Reveal>
          <Contact />
          <FAQ />
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;