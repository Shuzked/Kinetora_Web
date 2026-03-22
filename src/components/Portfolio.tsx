"use client";

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import PremiumButton from "@/components/PremiumButton";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { caseStudies } from "@/data/caseStudies";
import { useI18n } from "@/i18n/I18nProvider";
import { useEqualizeHeights } from "@/hooks/use-equalize";

const Portfolio = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const eqRef = React.useRef<HTMLDivElement | null>(null);

  const metaReady = true;

  useEqualizeHeights(eqRef, [{ selector: ".js-eq-header", varName: "--eq-header" }], [lang, metaReady]);

  const ui =
    lang === "es"
      ? {
          badge: "Casos de éxito",
          titleA: "Diseño creado para",
          titleB: "convertir",
          sub:
            "Proyectos reales con impacto medible. Desliza para ver más y entra al post para conocer el proceso.",
          viewAll: "Ver todos",
          readMore: "Leer más",
          swipe: "Desliza para ver más",
          ariaReadMore: (t: string) => `Leer más: ${t}`,
        }
      : {
          badge: "Case studies",
          titleA: "Design built to",
          titleB: "convert",
          sub:
            "Real projects with measurable impact. Swipe to see more and open the post to learn the process.",
          viewAll: "View all",
          readMore: "Read more",
          swipe: "Swipe to see more",
          ariaReadMore: (t: string) => `Read more: ${t}`,
        };

  return (
    <section
      id="casos"
      className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] scroll-mt-24 md:scroll-mt-28 relative overflow-hidden"
    >
      <div className="kin-container relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
              {ui.badge}
            </div>
            <h2 className="mt-5 text-3xl md:text-5xl font-black text-[#F5F5F5] tracking-tighter uppercase">
              {ui.titleA}{" "}
              <span className="text-[#B454FF]">{ui.titleB}</span>
            </h2>
            <p className="mt-3 text-[#F5F5F5]/70 text-sm sm:text-base max-w-2xl leading-relaxed">
              {ui.sub}
            </p>
          </div>

          <Link to="/casos" className="shrink-0">
            <PremiumButton variant="glass" size="md" className="w-full sm:w-auto">
              {ui.viewAll.toUpperCase()}
            </PremiumButton>
          </Link>
        </div>

        <div ref={eqRef}>
          <Carousel opts={{ align: "start", loop: true, dragFree: false }} className="relative">
            <CarouselContent className="-ml-4">
              {caseStudies.map((cs) => (
                <CarouselItem
                  key={cs.slug}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <PortfolioCard cs={cs} navigate={navigate} lang={lang} ui={ui} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-2 sm:-left-4 md:-left-6 h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-white/10 bg-[#0D0D0D]/70 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20" aria-label={lang === "es" ? "Anterior" : "Previous"} title={lang === "es" ? "Anterior" : "Previous"} />
            <CarouselNext className="-right-2 sm:-right-4 md:-right-6 h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-white/10 bg-[#0D0D0D]/70 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20" aria-label={lang === "es" ? "Siguiente" : "Next"} title={lang === "es" ? "Siguiente" : "Next"} />
          </Carousel>
        </div>

        <div className="mt-6 sm:hidden">
          <p className="text-center text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/55">
            {ui.swipe}
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * PortfolioCard Component
 * Handles per-item scroll parallax for the case images.
 */
const PortfolioCard = ({ cs, navigate, lang, ui }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const cover = cs.coverImage || "/assets/placeholder.svg";
  const hito = (lang === "es" ? cs.highlightFallback : cs.highlightFallbackEn ?? cs.highlightFallback);
  const alt = (lang === "es" ? cs.coverAlt : cs.coverAltEn ?? cs.coverAlt) || cs.coverAlt;
  const metricLabel = (lang === "es" ? cs.metricLabel : cs.metricLabelEn ?? cs.metricLabel) ?? null;
  const metricValue = cs.metricValue ?? null;
  const title = lang === "es" ? cs.title : cs.titleEn ?? cs.title;

  return (
    <div ref={cardRef} className="h-full">
      <div className="group block h-full rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-colors hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#B454FF]/40 focus-within:ring-offset-0">
        <div className="aspect-[16/10] overflow-hidden">
          <motion.div style={{ y }} className="w-full h-full scale-110">
            <ImageWithSkeleton
              src={cover}
              alt={alt}
              loading="lazy"
              width={600}
              height={375}
              containerClassName="h-full w-full"
              skeletonClassName="bg-white/10"
              className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
        <div className="p-6 sm:p-7 flex-1 flex flex-col">
          <div className="js-eq-header">
            <div className="inline-flex items-center justify-center self-center rounded-full border border-[#B454FF]/30 bg-[#B454FF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-[#B454FF]">
              {hito}
            </div>
            <h3 className="mt-3 mb-2 sm:mb-3 text-lg sm:text-xl font-black tracking-tight title-rows-3 title-rows-3-min">
              {title}
            </h3>
          </div>
          <div className="mt-auto pt-4 sm:pt-5">
            <div className="metric-block-min mb-2">
              {metricLabel && metricValue ? (
                <>
                  <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/75">
                    {metricLabel}
                  </div>
                  <div className="mt-1 text-2xl sm:text-3xl font-black text-[#B454FF]">
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
};

export default Portfolio;