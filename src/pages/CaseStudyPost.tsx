"use client";

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumButton from "@/components/PremiumButton";
import { Skeleton } from "@/components/ui/skeleton";
import CaseStudyColumns from "@/components/case-study/CaseStudyColumns";
import CaseStudyMoreResults from "@/components/case-study/CaseStudyMoreResults";
import { caseStudies } from "@/data/caseStudies";
import { caseContentOverrides } from "@/data/caseOverrides";
import { useI18n } from "@/i18n/I18nProvider";
// SEO
import SEO from "@/components/SEO";
import { getSeoDefaults } from "@/seo/defaults";
// Utils para separar media del texto
import { splitWpContentIntoTextAndMedia, sanitizeWpHtml } from "@/components/case-study/caseStudyUtils";
import Reveal from "@/components/Reveal";

const CaseStudyPost = () => {
  const { lang } = useI18n();
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentCase = React.useMemo(() => caseStudies.find((item) => item.slug === slug), [slug]);
  const otherCases = React.useMemo(() => caseStudies.filter((item) => item.slug !== slug), [slug]);

  // Sin llamadas remotas
  const loading = false;

  const ui =
    lang === "es"
      ? {
          back: "Volver a casos",
          notFound: "No encontramos este caso.",
          readyTitle: "¿Listo para un caso así?",
          readyBody: "Cuéntanos qué estás lanzando y te proponemos el mejor enfoque en menos de 24h.",
          moreResults: "Más resultados",
          viewAll: "Ver todos",
          readMore: "Leer más",
          textCol: "Lo que hicimos",
          mediaCol: "Algunos entregables",
          swipe: "Desliza para ver más",
          letsTalk: "¿Contactamos?",
        }
      : {
          back: "Back to cases",
          notFound: "We couldn't find this case study.",
          readyTitle: "Want results like this?",
          readyBody: "Tell us what you're launching and we'll propose the best approach within 24h.",
          moreResults: "More results",
          viewAll: "View all",
          readMore: "Read more",
          textCol: "What we did",
          mediaCol: "Some deliverables",
          swipe: "Swipe to see more",
          letsTalk: "Let's talk",
        };

  const caseTag = React.useMemo(() => {
    if (!currentCase) return lang === "es" ? "Caso de éxito" : "Case study";
    return lang === "es" ? currentCase.highlightFallback : currentCase.highlightFallbackEn ?? currentCase.highlightFallback;
  }, [currentCase, lang]);

  const title = React.useMemo(() => {
    if (!currentCase) return "";
    return lang === "es" ? currentCase.title : currentCase.titleEn ?? currentCase.title;
  }, [currentCase, lang]);

  const cover = currentCase?.coverImage;
  const coverAlt = lang === "es" ? currentCase?.coverAlt : currentCase?.coverAltEn ?? currentCase?.coverAlt;

  // Usar overrides locales: texto y media separados automáticamente
  const { textHtml, mediaHtml } = React.useMemo(() => {
    if (!currentCase) {
      return { textHtml: "", mediaHtml: "" };
    }
    const overrides = caseContentOverrides[currentCase.slug] || {};
    const rawText =
      lang === "es"
        ? overrides.esTextHtml ?? null
        : overrides.enTextHtml ?? overrides.esTextHtml ?? null;

    // Si hay texto con figuras/iframes dentro, los separamos con el splitter
    if (rawText) {
      const safe = sanitizeWpHtml(rawText);
      const split = splitWpContentIntoTextAndMedia(safe);
      // Si algún caso define media extra de forma explícita, la añadimos (sin romper tipos)
      const extraMedia = (lang === "es"
        ? (overrides as any).esMediaHtml
        : (overrides as any).enMediaHtml ?? (overrides as any).esMediaHtml) as string | undefined;
      const mediaCombined = [split.mediaHtml, extraMedia].filter(Boolean).join("\n");
      return { textHtml: split.textHtml, mediaHtml: mediaCombined };
    }

    // Fallback sin media
    const fallbackText =
      lang === "es"
        ? `<p>Resumen del proyecto: ${currentCase.title}. Diseñamos e implementamos el sistema visual, la narrativa y los entregables principales para acelerar crecimiento.</p>`
        : `<p>Project summary: ${currentCase.titleEn ?? currentCase.title}. We designed and implemented the visual system, narrative and key deliverables to accelerate growth.</p>`;
    return { textHtml: fallbackText, mediaHtml: "" };
  }, [currentCase, lang]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  const moreMeta = React.useMemo(() => {
    const m: Record<string, any> = {};
    otherCases.forEach((item) => {
      m[item.slug] = {
        img: item.coverImage,
        alt: lang === "es" ? item.coverAlt : item.coverAltEn ?? item.coverAlt,
        hito: lang === "es" ? item.highlightFallback : item.highlightFallbackEn ?? item.highlightFallback,
        metricKind: null,
        metricValue: item.metricValue ?? null,
      };
    });
    return m;
  }, [otherCases, lang]);

  const seoDefaults = getSeoDefaults(lang);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = `${origin}/casos/${slug ?? ""}`;
  // Descripción específica del caso (mejor para SEO)
  const description =
    lang === "es"
      ? currentCase?.summaryFallback || ui.readyBody
      : currentCase?.summaryFallbackEn || currentCase?.summaryFallback || ui.readyBody;
  const keywords = [
    ...seoDefaults.keywords,
    ...(lang === "es" ? ["caso de éxito", "portafolio", "resultados"] : ["case study", "portfolio", "results"]),
  ];
  // Locale y alternos para Open Graph
  const ogLocale = lang === "es" ? "es_ES" : "en_US";
  const ogLocaleAlternate = lang === "es" ? ["en_US"] : ["es_ES"];
  // Alternates básicos (sin rutas por idioma, se apunta al canonical como x-default)
  const alternates = [{ hrefLang: "x-default", href: canonical }];
  // JSON-LD Article y Breadcrumb
  const absoluteImage = cover ? (origin ? new URL(cover, origin).href : cover) : seoDefaults.shareImage;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": title || seoDefaults.title,
        "description": description,
        "image": absoluteImage,
        "inLanguage": lang === "es" ? "es-ES" : "en-US",
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
        "publisher": {
          "@type": "Organization",
          "name": seoDefaults.siteName,
          "logo": {
            "@type": "ImageObject",
            "url": origin ? new URL("/Logotipo.svg", origin).href : "/Logotipo.svg"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": lang === "es" ? "Inicio" : "Home", "item": origin ? new URL("/", origin).href : "/" },
          { "@type": "ListItem", "position": 2, "name": lang === "es" ? "Casos" : "Cases", "item": origin ? new URL("/casos", origin).href : "/casos" },
          { "@type": "ListItem", "position": 3, "name": title || (lang === "es" ? "Caso" : "Case"), "item": canonical }
        ]
      }
    ]
  };

  // Refs necesarias por CaseStudyColumns (para sticky y medidas)
  const textWrapRef = React.useRef<HTMLElement | null>(null);
  const mediaWrapRef = React.useRef<HTMLDivElement | null>(null);

  // --- Lógica para Sticky Column ---
  const [stickySide, setStickySide] = React.useState<"left" | "right" | null>(null);

  React.useEffect(() => {
    const updateStickySide = () => {
      if (window.innerWidth < 1024) {
        setStickySide(null);
        return;
      }

      const textHeight = textWrapRef.current?.offsetHeight || 0;
      const mediaHeight = mediaWrapRef.current?.offsetHeight || 0;

      if (textHeight > 0 && mediaHeight > 0) {
        // La columna más corta es la que se queda fija
        if (textHeight < mediaHeight - 60) {
          setStickySide("left");
        } else if (mediaHeight < textHeight - 60) {
          setStickySide("right");
        } else {
          setStickySide(null);
        }
      }
    };

    const observer = new ResizeObserver(updateStickySide);
    if (textWrapRef.current) observer.observe(textWrapRef.current);
    if (mediaWrapRef.current) observer.observe(mediaWrapRef.current);
    
    window.addEventListener("resize", updateStickySide);
    const timer = setTimeout(updateStickySide, 300);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStickySide);
      clearTimeout(timer);
    };
  }, [slug, lang, textHtml, mediaHtml]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <SEO
        title={title ? `${title} — ${seoDefaults.siteName}` : seoDefaults.title}
        description={description}
        keywords={keywords}
        image={cover || seoDefaults.shareImage}
        canonical={canonical}
        locale={ogLocale}
        localesAlternate={ogLocaleAlternate}
        alternates={alternates}
        twitterSite="@Kinetora_Studio"
        twitterCreator="@Kinetora_Studio"
        siteName={seoDefaults.siteName}
        ogType="article"
        twitterCard="summary_large_image"
        robots="index,follow"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main id="main-content" role="main" className="pt-[68px] md:pt-[88px]">
        <section className="relative kin-no-overflow">
          <div className="pointer-events-none absolute -top-28 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#B454FF]/10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-44 -left-44 h-[32rem] w-[32rem] rounded-full bg-[#33C3F0]/[0.07] blur-[140px]" />

          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
            <div className="flex flex-col gap-7">
              <div className="flex items-center justify-between gap-4">
                <Link to="/casos" className="inline-flex">
                  <PremiumButton variant="glass" size="sm" className="h-11 rounded-full">
                    {ui.back.toUpperCase()}
                  </PremiumButton>
                </Link>
              </div>

              <div className="max-w-4xl mx-auto text-center">
                <Reveal>
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                    {caseTag}
                  </div>
                </Reveal>
                <Reveal as="h1" className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">{title}</Reveal>
              </div>

              <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.03] overflow-hidden shadow-[0_24px_110px_rgba(0,0,0,0.35)]">
                <div className="aspect-[16/9] bg-white/[0.04]">
                  {loading ? (
                    <Skeleton className="h-full w-full rounded-none" />
                  ) : cover ? (
                    <Reveal as="div">
                      <img
                        src={cover}
                        alt={coverAlt || ""}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="high"
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/assets/placeholder.svg";
                        }}
                        className="h-full w-full object-cover transition-all duration-700 rounded-[inherit] transform-gpu"
                      />
                    </Reveal>
                  ) : null}
                </div>
              </div>

              {!currentCase ? (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
                  <p className="text-[#F5F5F5]/80 font-bold">{ui.notFound}</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <CaseStudyColumns
                    loading={loading}
                    textHtml={textHtml}
                    mediaHtml={mediaHtml}
                    stickySide={stickySide}
                    textLabel={ui.textCol}
                    mediaLabel={ui.mediaCol}
                    textWrapRef={textWrapRef}
                    mediaWrapRef={mediaWrapRef}
                  />

                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                    <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60">
                      {ui.readyTitle}
                    </div>
                    <p className="mt-3 text-sm sm:text-base text-[#F5F5F5]/75 leading-relaxed max-w-2xl">
                      {ui.readyBody}
                    </p>
                    <Link to="/#contacto" className="inline-flex mt-5">
                      <PremiumButton variant="primary" size="md" className="w-full sm:w-auto">
                        {ui.letsTalk.toUpperCase()}
                      </PremiumButton>
                    </Link>
                  </div>

                  <CaseStudyMoreResults
                    cases={otherCases}
                    meta={moreMeta}
                    lang={lang}
                    moreResultsLabel={ui.moreResults}
                    viewAllLabel={ui.viewAll}
                    readMoreLabel={ui.readMore}
                    swipeLabel={ui.swipe}
                    onNavigate={(targetSlug) => navigate(`/casos/${targetSlug}`)}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyPost;