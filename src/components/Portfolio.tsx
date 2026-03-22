"use client";

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation, useSpring, useMotionValue, useTransform } from "framer-motion";
import PremiumButton from "@/components/PremiumButton";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { caseStudies } from "@/data/caseStudies";
import { useI18n } from "@/i18n/I18nProvider";
import RevealText from "@/components/ui/RevealText";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Portfolio = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = React.useState(false);
  const [winWidth, setWinWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const controls = useAnimation();
  const trackRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Constants
  const clonesAtEdge = 3;
  const baseCards = caseStudies;
  const totalOriginal = baseCards.length;

  // Prepare display array: [Last 3] + [All] + [First 3]
  const displayCards = React.useMemo(() => {
    const startClones = baseCards.slice(-clonesAtEdge);
    const endClones = baseCards.slice(0, clonesAtEdge);
    return [...startClones, ...baseCards, ...endClones];
  }, [baseCards]);

  // Initial index starts after the 3 clones
  const [currentIndex, setCurrentIndex] = React.useState(clonesAtEdge);

  const getXOffset = React.useCallback((index: number) => {
    const cardWidthPct = winWidth < 640 ? 85 : winWidth < 1024 ? 48 : 31.33;
    const gapRem = 2; // Assuming 2rem gap (gap-8)
    return `calc(-${index * cardWidthPct}% - ${index * gapRem}rem)`;
  }, [winWidth]);

  React.useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync animation with state
  React.useEffect(() => {
    controls.set({ x: getXOffset(currentIndex) });
  }, []); // Initial set

  const nextSlide = React.useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    
    await controls.start({ 
      x: getXOffset(nextIdx),
      transition: { duration: 0.6, ease: "easeInOut" }
    });

    setIsAnimating(false);

    // Seamless Snap with Forced Reflow: Animation to CLONE A completed, now snap to REAL A
    if (nextIdx >= totalOriginal + clonesAtEdge) {
      // Step 1: Instant move to initial original position (no transition)
      controls.set({ x: getXOffset(clonesAtEdge) });
      
      // Step 2: Force Reflow to ensure browser registers the jump
      if (trackRef.current) {
        void trackRef.current.offsetWidth;
      }
      
      // Step 3: Update state ONLY after the hardware jump is done
      setCurrentIndex(clonesAtEdge);
    }
  }, [currentIndex, isAnimating, controls, getXOffset, totalOriginal]);

  const prevSlide = React.useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const prevIdx = currentIndex - 1;
    setCurrentIndex(prevIdx);
    
    await controls.start({ 
      x: getXOffset(prevIdx),
      transition: { duration: 0.6, ease: "easeInOut" }
    });

    setIsAnimating(false);

    // Seamless Snap with Forced Reflow: Animation to CLONE C completed, now snap to REAL C
    if (prevIdx < clonesAtEdge) {
       const jumpIdx = totalOriginal + prevIdx;
       controls.set({ x: getXOffset(jumpIdx) });
       
       if (trackRef.current) {
         void trackRef.current.offsetWidth;
       }
       
       setCurrentIndex(jumpIdx);
    }
  }, [currentIndex, isAnimating, controls, getXOffset, totalOriginal]);

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
        <div className="overflow-hidden lg:overflow-visible py-4" style={{ perspective: "1000px" }}>
          <motion.div 
            ref={trackRef}
            className="flex gap-6 sm:gap-8 translate-z-0"
            animate={controls}
            style={{ 
              willChange: "transform",
              transformStyle: "preserve-3d" 
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100) nextSlide();
              else if (info.offset.x > 100) prevSlide();
            }}
          >
            {displayCards.map((cs, i) => {
              // Visible logic for desktop/tablet/mobile
              const isVisible = winWidth >= 1024 
                ? (i >= currentIndex && i < currentIndex + 3)
                : winWidth >= 640 
                  ? (i >= currentIndex && i < currentIndex + 2)
                  : (i === currentIndex);

              return (
                <div 
                  key={`${cs.slug}-${i}`} 
                  className={`w-[85%] sm:w-[48%] lg:w-[31.33%] shrink-0 transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-30 blur-[1px] scale-[0.96]"
                  }`}
                >
                  <PortfolioCard cs={cs} navigate={navigate} lang={lang} ui={ui} />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-12 flex justify-center gap-3">
          {baseCards.map((_, i) => {
            const actualIndexInDisplay = i + clonesAtEdge;
            const isActive = currentIndex === actualIndexInDisplay || 
              (currentIndex >= totalOriginal + clonesAtEdge && i === 0) ||
              (currentIndex < clonesAtEdge && i === totalOriginal - 1);

            return (
              <button
                key={i}
                onClick={async () => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setCurrentIndex(actualIndexInDisplay);
                  await controls.start({
                    x: getXOffset(actualIndexInDisplay),
                    transition: { duration: 0.6, ease: "easeInOut" }
                  });
                  setIsAnimating(false);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isActive
                    ? "w-8 bg-[#B454FF] shadow-[0_0_12px_rgba(180,84,255,0.5)]" 
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
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
        backfaceVisibility: "hidden",
      }}
      className="h-full relative group"
    >
      <div className="block h-full rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 focus-within:ring-2 focus-within:ring-[#B454FF]/40 focus-within:ring-offset-0 relative transform-gpu" style={{ transform: "translateZ(0)" }}>
        <div className="aspect-[16/9] overflow-hidden relative" style={{ transform: "translateZ(40px)", backfaceVisibility: "hidden" }}>
          <ImageWithSkeleton
            src={cover}
            alt={alt}
            loading="eager"
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