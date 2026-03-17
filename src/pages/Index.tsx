"use client";

import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
const Brands = React.lazy(() => import('@/components/Brands'));
const Stats = React.lazy(() => import('@/components/Stats'));
const ValueProp = React.lazy(() => import('@/components/ValueProp'));
const HowItWorks = React.lazy(() => import('@/components/HowItWorks'));
const Services = React.lazy(() => import('@/components/Services'));
const Portfolio = React.lazy(() => import('@/components/Portfolio'));
const Testimonials = React.lazy(() => import('@/components/Testimonials'));
const Contact = React.lazy(() => import('@/components/Contact'));
const FAQ = React.lazy(() => import('@/components/FAQ'));
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingCTA from '@/components/FloatingCTA';
// SEO imports
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
      <main id="main-content">
        <Hero />
        <React.Suspense fallback={<div className="kin-container py-8" />}>
          <ParallaxSection intensity={10}>
            <Brands />
          </ParallaxSection>
        </React.Suspense>
        <React.Suspense fallback={<div className="kin-container py-10" />}>
          <ParallaxSection intensity={12}>
            <Stats />
          </ParallaxSection>
        </React.Suspense>
        <React.Suspense fallback={<div className="kin-container py-10" />}>
          <ParallaxSection intensity={18}>
            <ValueProp />
          </ParallaxSection>
        </React.Suspense>
        <React.Suspense fallback={<div className="kin-container py-10" />}>
          <ParallaxSection intensity={14}>
            <Services />
          </ParallaxSection>
        </React.Suspense>
        <React.Suspense fallback={<div className="kin-container py-10" />}>
          <ParallaxSection intensity={16}>
            <HowItWorks />
          </ParallaxSection>
        </React.Suspense>
        <React.Suspense fallback={<div className="kin-container py-10" />}>
          <ParallaxSection intensity={20}>
            <Portfolio />
          </ParallaxSection>
        </React.Suspense>
        <React.Suspense fallback={<div className="kin-container py-10" />}>
          <ParallaxSection intensity={16}>
            <Testimonials />
          </ParallaxSection>
        </React.Suspense>
        <React.Suspense fallback={<div className="kin-container py-10" />}>
          <ParallaxSection intensity={14}>
            <Contact />
          </ParallaxSection>
        </React.Suspense>
        <React.Suspense fallback={<div className="kin-container py-10" />}>
          <ParallaxSection intensity={12}>
            <FAQ />
          </ParallaxSection>
        </React.Suspense>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;