"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumButton from "@/components/PremiumButton";
import { Skeleton } from "@/components/ui/skeleton";
import { caseStudies } from "@/data/caseStudies";
import { useI18n } from "@/i18n/I18nProvider";
import { useEqualizeHeights } from "@/hooks/use-equalize";
import Reveal from "@/components/Reveal";
// SEO
import SEO from "@/components/SEO";
import { getSeoDefaults } from "@/seo/defaults";

const Cases = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();

  // Memoize meta to prevent infinite loops/unnecessary effect re-runs
  const meta = React.useMemo(() => ({}), []);
  const metaReady = true;

  const metricLabelFor = (kind?: "milestone" | "sales" | "organic" | "funding") => {
    if (!kind) return null;
    if (lang === "es") {
      if (kind === "sales") return "Ventas realizadas";
      if (kind === "organic") return "Impacto orgánico";
      if (kind === "funding") return "Recaudación";
      return "Hito";
    }
    if (kind === "sales") return "Sales";
    if (kind === "organic") return "Organic reach";
    if (kind === "funding") return "Funding";
    return "Milestone";
  };

  const ui =
    lang === "es"
      ? {
          badge: "Casos de éxito",
          titleA: "Proyectos reales.",
          titleB: "Resultados medibles",
          sub:
            "Selección de proyectos donde diseñamos el sistema, el producto y la narrativa para acelerar crecimiento.",
          readMore: "Leer más",
          ariaReadMore: (t: string) => `Leer más: ${t}`,
        }
      : {
          badge: "Case studies",
          titleA: "Real projects.",
          titleB: "Measurable results",
          sub:
            "A selection of projects where we designed the system, product and narrative to accelerate growth.",
          readMore: "Read more",
          ariaReadMore: (t: string) => `Read more: ${t}`,
        };

  const eqRef = React.useRef<HTMLDivElement | null>(null);
  useEqualizeHeights(eqRef, [{ selector: ".js-eq-header", varName: "--eq-header" }], [lang, meta]);

  const seoDefaults = getSeoDefaults(lang);
  const origin = isES ? 'https://kinetora.es' : 'https://kinetora.tech';
  const canonical = `${origin}/casos`;
  const pageTitle = isES 
    ? `Casos de éxito — ${seoDefaults.siteName}` 
    : `Case Studies · Real Results · Web3 & Startup Design — ${seoDefaults.siteName}`;
  
  const pageDescription = isES
    ? "Resultados reales con impacto medible. Explora nuestros casos de éxito en diseño y producto para startups Web3 y tech."
    : "Real results with measurable impact. Explore our design and product case studies for Web3 and tech startups.";

  const alternates = [
    { hrefLang: 'es', href: 'https://kinetora.es/casos' },
    { hrefLang: 'en', href: 'https://kinetora.tech/casos' },
    { hrefLang: 'x-default', href: 'https://kinetora.tech/casos' }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30 block opacity-100 relative z-10">
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        image={seoDefaults.shareImage}
        canonical={canonical}
        alternates={alternates}
        locale={seoDefaults.locale}
        siteName={seoDefaults.siteName}
        ogType="website"
        twitterCard="summary_large_image"
        robots="index,follow"
      />
      <Navbar />
      <main id="main-content" className="pt-[68px] md:pt-[88px]">
        <section className="kin-section relative overflow-hidden" ref={eqRef}>
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />
          <div className="kin-container relative">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative">
              <div className="max-w-3xl">
                <Reveal>
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                    {ui.badge}
                  </div>
                </Reveal>
                <Reveal as="h1" className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                  {ui.titleA.replace(/\.$/, "")}{" "}
                  <span className="text-[#B454FF]">{ui.titleB}</span>
                </Reveal>
                <Reveal as="p" className="mt-4 text-[#F5F5F5]/75 text-sm sm:text-base leading-relaxed">
                  {ui.sub}
                </Reveal>
              </div>

              <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 items-stretch min-h-[200px]">
                {(caseStudies || []).map((cs) => {
                  const cover = cs.coverImage;
                  const hito =
                    (lang === "es" ? cs.highlightFallback : cs.highlightFallbackEn ?? cs.highlightFallback);
                  const alt =
                    (lang === "es" ? cs.coverAlt : cs.coverAltEn ?? cs.coverAlt) ||
                    cs.coverAlt;

                  const metricLabel =
                    (lang === "es" ? cs.metricLabel : cs.metricLabelEn ?? cs.metricLabel) ?? 
                    metricLabelFor(undefined) ?? 
                    null;
                  const metricValue = cs.metricValue ?? null;

                  const title = lang === "es" ? cs.title : cs.titleEn ?? cs.title;

                  return (
                    <div key={cs.slug} className="h-full">
                      <div className="group h-full flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-colors hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#B454FF]/40 focus-within:ring-offset-0">
                        <div className="aspect-[16/10] overflow-hidden">
                          {!metaReady ? (
                            <Skeleton className="w-full h-full rounded-none" />
                          ) : (
                            <Reveal as="div">
                              <img
                                src={cover}
                                alt={alt}
                                width="1200"
                                height="675"
                                loading="lazy"
                                decoding="async"
                                fetchPriority="low"
                                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = "/assets/placeholder.svg";
                                }}
                                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                              />
                            </Reveal>
                          )}
                        </div>
                        <div className="p-6 sm:p-7 flex-1 flex flex-col">
                          <div className="js-eq-header">
                            <div className="inline-flex items-center justify-center self-center rounded-full border border-[#B454FF]/30 bg-[#B454FF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-[#B454FF]">
                              {hito}
                            </div>
                            <h2 className="mt-3 mb-2 sm:mb-3 text-lg sm:text-xl font-black tracking-tight title-rows-3 title-rows-3-min">
                              {title}
                            </h2>
                          </div>
                          <div className="mt-auto pt-4 sm:pt-5">
                            <div className="metric-block-min mb-2">
                              {metricLabel && metricValue ? (
                                <>
                                  <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/75">
                                    {metricLabel}
                                  </div>
                                  <div className="mt-1 text-2xl sm:text-3xl font-black text-[#B454FF] drop-shadow-[0_0_12px_rgba(180,84,255,0.4)]">
                                    {metricValue}
                                  </div>
                                </>
                              ) : null}
                            </div>
                            <PremiumButton
                              variant="glass"
                              size="sm"
                              className="w-full h-11 rounded-full border-white/15 bg-white/5 hover:bg-white/10"
                              onClick={() => navigate(`/casos/${cs.slug}`)}
                              aria-label={ui.ariaReadMore(title)}
                            >
                              {ui.readMore.toUpperCase()}
                            </PremiumButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cases;