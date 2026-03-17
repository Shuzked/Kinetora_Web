"use client";

import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumButton from "@/components/PremiumButton";
import { Skeleton } from "@/components/ui/skeleton";
import { caseStudies } from "@/data/caseStudies";
import { useI18n } from "@/i18n/I18nProvider";
import SEO from "@/components/SEO";
import { getSeoDefaults } from "@/seo/defaults";
import CaseStudyMoreResults from "@/components/case-study/CaseStudyMoreResults";

const CaseStudyPost = () => {
  const { lang } = useI18n();
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentCase = React.useMemo(() => caseStudies.find((c) => c.slug === slug), [slug]);
  const otherCases = React.useMemo(() => caseStudies.filter((c) => c.slug !== slug), [slug]);

  const ui =
    lang === "es"
      ? {
          back: "Volver a casos",
          notFound: "No encontramos este caso.",
          moreResults: "Más resultados",
          viewAll: "Ver todos",
          readMore: "Leer más",
          letsTalk: "¿Contactamos?",
          readyTitle: "¿Listo para un caso así?",
          readyBody: "Cuéntanos qué estás lanzando y te proponemos el mejor enfoque en menos de 24h.",
        }
      : {
          back: "Back to cases",
          notFound: "We couldn't find this case study.",
          moreResults: "More results",
          viewAll: "View all",
          readMore: "Read more",
          letsTalk: "Let's talk",
          readyTitle: "Want results like this?",
          readyBody: "Tell us what you're launching and we'll propose the best approach within 24h.",
        };

  const title = React.useMemo(() => {
    if (!currentCase) return "";
    return lang === "es" ? currentCase.title : currentCase.titleEn ?? currentCase.title;
  }, [currentCase, lang]);

  const cover = currentCase?.coverImage;
  const coverAlt = lang === "es" ? currentCase?.coverAlt : currentCase?.coverAltEn ?? currentCase?.coverAlt;

  // Contenido específico para "elixir-token": sin columna de entregables, todo el texto en un único bloque
  const isElixirToken = currentCase?.slug === "elixir-token";
  const elixirContentEs = `
    <p>Elixir Games es el gigante del gaming descentralizado. Esta gran empresa tiene el fuerte apoyo de Square Enix y la Fundación Solana. Ellos necesitaban un Marketing Web3 de nivel mundial para lanzar su propia moneda. Así nació el gran reto del Token Elixir ($ELIX).</p>
    <p>No queríamos hacer un lanzamiento normal o aburrido. Diseñamos una experiencia visual y técnica totalmente arrolladora. Nuestro trabajo logró movilizar a toda la comunidad global. Gracias a esto, el proyecto superó los 14,2 millones de dólares en ventas.</p>
    <p>Nuestra agencia de marketing digital se encargó de liderar toda esta campaña. A continuación, te contamos el paso a paso de este gran desarrollo tecnológico. Conoce más sobre este ecosistema en la plataforma oficial de Elixir Games.</p>

    <h3>El desarrollo visual y técnico del proyecto</h3>
    <p>Dejamos atrás las típicas plantillas corporativas. Apostamos por un formato dinámico, futurista y muy premium. Así ejecutamos cada área del proyecto:</p>

    <h4>1. Dirección de arte y diseño del token</h4>
    <p>Toda gran moneda necesita una identidad visual muy fuerte. Nosotros lideramos el diseño de la moneda virtual ($ELIX). El cliente nos pidió una réplica del token $LITT a la inversa. Esa otra moneda pertenece a su exitoso videojuego CyberTitans.</p>
    <p>Para lograrlo, creamos un concepto visual basado en el Ying y el Yang. Usamos tonos rosados muy vibrantes y texturas metálicas. El diseño final transmite la calidad pura de un videojuego de alto presupuesto (AAA). Este branding generó una enorme confianza en todos los grandes inversores. Fue una pieza visual clave de nuestro Marketing Web3.</p>
    <p>[Image $Elix Token] [Image $Litt$Elix] [Image Launchpad] [Image video launch]</p>

    <h4>2. Vídeo de lanzamiento (edición y VFX)</h4>
    <p>El anuncio oficial debía impactar al mundo entero en segundos. Por eso, produjimos un tráiler cinemático espectacular. Hicimos una edición de vídeo muy dinámica y ágil.</p>
    <p>Aplicamos grandes efectos visuales (VFX) en 3D. Integramos gráficos holográficos y entornos digitales muy inmersivos. Mostramos el token brillando con mucha energía. Esta pieza audiovisual detonó un entusiasmo brutal en el mercado.</p>
    <p>[Video de elixir token launch]</p>

    <h4>3. Motion graphics e imágenes para RRSS</h4>
    <p>Antes de lanzar el token $ELIX, creamos un vídeo IDO estratégico. En él explicamos visualmente las fechas y fases de compra. El contenido social de hoy debe atrapar al usuario al instante. Por eso, diseñamos un paquete audiovisual muy potente y dinámico.</p>
    <p>Usamos motion graphics rápidos para explicar conceptos financieros complejos en pocos segundos. Mostramos la moneda brillante y animaciones de alta calidad. Así logramos mantener a toda la audiencia atenta y muy conectada durante meses.</p>
    <p>[Video de $ELIX IDO] [Imagen LIVE] [Imagen closed]</p>

    <h4>4. Estrategia de Marketing Web3</h4>
    <p>Un buen diseño visual siempre necesita un gran motor de ventas. Diseñamos una estrategia de Marketing Web3 muy ambiciosa. Gamificamos el proceso de compra para retener al usuario.</p>
    <p>Creamos la gran campaña del Season Pass. Repartimos más de un millón de dólares en premios reales. Esta acción masiva aseguró ventas récord y fidelizó a una comunidad inmensa.</p>
    <p>[Video season pass - $1M Airdrop] [video season pass - 12 videogames] [video season pass - Announcement]</p>
  `;

  const seoDefaults = getSeoDefaults(lang);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = `${origin}/casos/${slug ?? ""}`;
  const description = ui.readyBody;
  const keywords = [
    ...seoDefaults.keywords,
    ...(lang === "es" ? ["caso de éxito", "portafolio", "resultados"] : ["case study", "portfolio", "results"]),
  ];

  // Metadatos simplificados para "Más resultados"
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

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <SEO
        title={title ? `${title} — ${seoDefaults.siteName}` : seoDefaults.title}
        description={description}
        keywords={keywords}
        image={cover || seoDefaults.shareImage}
        canonical={canonical}
        locale={seoDefaults.locale}
        siteName={seoDefaults.siteName}
        ogType="article"
        twitterCard="summary_large_image"
        robots="index,follow"
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
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                  {lang === "es" ? "Caso de éxito" : "Case study"}
                </div>
                <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">{title}</h1>
              </div>

              <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.03] overflow-hidden shadow-[0_24px_110px_rgba(0,0,0,0.35)]">
                <div className="aspect-[16/9] bg-white/[0.04]">
                  {!cover ? (
                    <Skeleton className="h-full w-full rounded-none" />
                  ) : (
                    <img
                      src={cover}
                      alt={coverAlt || ""}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/assets/placeholder.svg";
                      }}
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 rounded-[inherit] transform-gpu"
                    />
                  )}
                </div>
              </div>

              {!currentCase ? (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
                  <p className="text-[#F5F5F5]/80 font-bold">{ui.notFound}</p>
                </div>
              ) : (
                <>
                  {/* Contenido único para ELIXIR TOKEN sin columna de entregables */}
                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                    <div className="wp-post__content" dangerouslySetInnerHTML={{ __html: isElixirToken && lang === "es" ? elixirContentEs : "<p>Contenido del caso próximamente.</p>" }} />
                  </div>

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
                    meta={otherCases.reduce((acc, c) => {
                      acc[c.slug] = {
                        img: c.coverImage,
                        alt: lang === "es" ? c.coverAlt : c.coverAltEn ?? c.coverAlt,
                        hito: lang === "es" ? c.highlightFallback : c.highlightFallbackEn ?? c.highlightFallback,
                        metricKind: null,
                        metricValue: c.metricValue ?? null,
                      };
                      return acc;
                    }, {} as Record<string, any>)}
                    lang={lang}
                    moreResultsLabel={ui.moreResults}
                    viewAllLabel={ui.viewAll}
                    readMoreLabel={ui.readMore}
                    swipeLabel={lang === "es" ? "Desliza para ver más" : "Swipe to see more"}
                    onNavigate={(targetSlug) => navigate(`/casos/${targetSlug}`)}
                  />
                </>
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