"use client";

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import PremiumButton from "@/components/PremiumButton";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { caseStudies } from "@/data/caseStudies";
import { useI18n } from "@/i18n/I18nProvider";
import RevealText from "@/components/ui/RevealText";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Portfolio = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [winWidth, setWinWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const itemsPerPage = React.useMemo(() => {
    if (winWidth < 640) return 1;
    if (winWidth < 1024) return 2;
    return 3;
  }, [winWidth]);

  // Prepare cards with padding to fill blocks of 3
  const baseCards = React.useMemo(() => {
    const cards = [...caseStudies];
    while (cards.length % itemsPerPage !== 0) {
      cards.push(caseStudies[cards.length % caseStudies.length]);
    }
    return cards;
  }, [itemsPerPage]);

  // Add clones for infinite loop
  const displayCards = React.useMemo(() => {
    const endClones = baseCards.slice(0, itemsPerPage);
    const startClones = baseCards.slice(-itemsPerPage);
    return [...startClones, ...baseCards, ...endClones];
  }, [baseCards, itemsPerPage]);

  // Start at the first real item (index = itemsPerPage due to clones)
  const [currentIndex, setCurrentIndex] = React.useState(itemsPerPage);

  React.useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalFull = displayCards.length;

  const nextSlide = React.useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + itemsPerPage);
  }, [itemsPerPage, isAnimating]);

  const prevSlide = React.useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - itemsPerPage);
  }, [itemsPerPage, isAnimating]);

  // Handle instant jump for infinite loop
  const handleAnimationComplete = () => {
    setIsAnimating(false);
    
    // If we reached the end clones, jump back to the start of real items
    if (currentIndex >= baseCards.length + itemsPerPage) {
      setCurrentIndex(itemsPerPage);
    }
    // If we reached the start clones, jump to the start of end items
    else if (currentIndex <= 0) {
      setCurrentIndex(baseCards.length);
    }
  };

  React.useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const ui =
    lang === "es"
      ? {
          badge: "Casos de éxito",
          titleA: "Diseño creado para",
          titleB: "convertir",
          sub: "Proyectos reales con impacto medible. Explora nuestra selección de casos destacados.",
          viewAll: "Ver todos",
          readMore: "Leer más",
          ariaReadMore: (t: string) => `Leer más: ${t}`,
        }
      : {
          badge: "Case studies",
          titleA: "Design built to",
          titleB: "convert",
          sub: "Real projects with measurable impact. Explore our selection of featured cases.",
          viewAll: "View all",
          readMore: "Read more",
          ariaReadMore: (t: string) => `Read more: ${t}`,
        };

  return (
    <section
      id="casos"
      className="kin-section bg-[#0D0D0D] scroll-mt-24 md:scroll-mt-28 relative overflow-hidden group/portfolio"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="kin-container mb-12 sm:mb-16 lg:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
              {ui.badge}
            </div>
            <h2 className="mt-5 text-4xl md:text-6xl font-black text-[#F5F5F5] tracking-tighter uppercase leading-[0.9] flex flex-col">
              <RevealText text={ui.titleA.toUpperCase()} />
              <RevealText 
                text={ui.titleB.toUpperCase()} 
                className="text-[#B454FF]" 
                delay={0.2} 
              />
            </h2>
            <p className="mt-6 text-[#F5F5F5]/60 text-lg font-medium max-w-md leading-relaxed animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
              {ui.sub}
            </p>
          </div>

          <div className="flex items-center gap-4">
             <Link to="/casos" className="shrink-0">
              <PremiumButton variant="glass" size="md" className="hidden sm:inline-flex">
                {ui.viewAll.toUpperCase()}
              </PremiumButton>
            </Link>
            
            {/* Controls */}
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                className="h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#B454FF]/40 transition-all active:scale-90"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#B454FF]/40 transition-all active:scale-90"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-4 sm:px-[5vw] lg:px-0 lg:max-w-7xl lg:mx-auto">
        <div className="overflow-hidden lg:overflow-visible">
          <motion.div 
            className="flex gap-6 sm:gap-8"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
               if (info.offset.x < -100) nextSlide();
               else if (info.offset.x > 100) prevSlide();
            }}
            animate={{ 
              x: `calc(-${currentIndex * (winWidth < 640 ? 85 : winWidth < 1024 ? 48 : 31.33)}% - ${currentIndex * 2}rem)` 
            }}
            onAnimationComplete={handleAnimationComplete}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {displayCards.map((cs, i) => {
              const isActive = i >= currentIndex && i < currentIndex + itemsPerPage;
              return (
                <div 
                  key={`${cs.slug}-${i}`} 
                  className={`w-[85%] sm:w-[48%] lg:w-[31.33%] shrink-0 transition-all duration-700 ${
                    isActive
                      ? "opacity-100 scale-100" 
                      : "opacity-30 blur-[1px] scale-[0.96]"
                  }`}
                >
                  <PortfolioCard cs={cs} navigate={navigate} lang={lang} ui={ui} />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Pagination Dots (representing pages) */}
        <div className="mt-12 flex justify-center gap-3">
          {Array.from({ length: baseCards.length / itemsPerPage }).map((_, i) => {
            const pageIndex = i * itemsPerPage + itemsPerPage;
            const isCurrentPage = currentIndex === pageIndex || (currentIndex >= baseCards.length + itemsPerPage && i === 0);
            return (
              <button
                key={i}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setCurrentIndex(pageIndex);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isCurrentPage
                    ? "w-8 bg-[#B454FF] shadow-[0_0_12px_rgba(180,84,255,0.5)]" 
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            );
          })}
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
        <div className="aspect-[16/9] overflow-hidden relative" style={{ transform: "translateZ(40px)" }}>
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