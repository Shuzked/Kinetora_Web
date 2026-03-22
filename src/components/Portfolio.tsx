"use client";

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import PremiumButton from "@/components/PremiumButton";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { caseStudies } from "@/data/caseStudies";
import { useI18n } from "@/i18n/I18nProvider";
import RevealText from "@/components/ui/RevealText";

const Portfolio = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the horizontal translation. 
  // We move from 0% (start) to -70% (approx end of track)
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-70%"]);

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
          swipe: "Haz scroll para explorar los proyectos",
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
          swipe: "Scroll to explore our projects",
          ariaReadMore: (t: string) => `Read more: ${t}`,
        };

  return (
    <section
      id="casos"
      ref={targetRef}
      className="relative h-[300vh] bg-[#0D0D0D]"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="kin-container mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                {ui.badge}
              </div>
              <h2 className="mt-5 text-3xl md:text-5xl font-black text-[#F5F5F5] tracking-tighter uppercase leading-none flex flex-col">
                <RevealText text={ui.titleA.toUpperCase()} />
                <RevealText 
                  text={ui.titleB.toUpperCase()} 
                  className="text-[#B454FF]" 
                  delay={0.2} 
                />
              </h2>
            </div>

            <Link to="/casos" className="shrink-0">
              <PremiumButton variant="glass" size="md" className="w-full sm:w-auto">
                {ui.viewAll.toUpperCase()}
              </PremiumButton>
            </Link>
          </div>
        </div>

        <div className="relative">
          <motion.div 
            style={{ x }} 
            className="flex gap-8 px-[10vw]"
          >
            {caseStudies.map((cs) => (
              <div key={cs.slug} className="w-[320px] sm:w-[450px] shrink-0">
                <PortfolioCard cs={cs} navigate={navigate} lang={lang} ui={ui} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 text-center">
            <p className="text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/35">
              {ui.swipe}
            </p>
        </div>
      </div>
    </section>
  );
};

const PortfolioCard = ({ cs, navigate, lang, ui }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Tilt Effect State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cover = cs.coverImage || "/assets/placeholder.svg";
  const hito = (lang === "es" ? cs.highlightFallback : cs.highlightFallbackEn ?? cs.highlightFallback);
  const alt = (lang === "es" ? cs.coverAlt : cs.coverAltEn ?? cs.coverAlt) || cs.coverAlt;
  const metricLabel = (lang === "es" ? cs.metricLabel : cs.metricLabelEn ?? cs.metricLabel) ?? null;
  const metricValue = cs.metricValue ?? null;
  const title = lang === "es" ? cs.title : cs.titleEn ?? cs.title;

  return (
    <motion.div 
      ref={cardRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="h-full relative group"
    >
      <div className="block h-full rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 focus-within:ring-2 focus-within:ring-[#B454FF]/40 focus-within:ring-offset-0 relative">
        <div className="aspect-[16/10] overflow-hidden relative" style={{ transform: "translateZ(50px)" }}>
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
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
        
        <div className="p-6 sm:p-7 flex-1 flex flex-col" style={{ transform: "translateZ(30px)" }}>
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
              className="w-full h-11 rounded-full border-white/15 bg-white/5 hover:bg-white/10 shadow-lg"
              onClick={() => navigate(`/casos/${cs.slug}`)}
              aria-label={ui.ariaReadMore(title)}
            >
              {ui.readMore.toUpperCase()}
            </PremiumButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;