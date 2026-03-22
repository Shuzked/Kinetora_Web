"use client";

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PremiumButton from "@/components/PremiumButton";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { caseStudies } from "@/data/caseStudies";
import { useI18n } from "@/i18n/I18nProvider";
import RevealText from "@/components/ui/RevealText";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Portfolio = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const [swiperRef, setSwiperRef] = React.useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const baseCards = caseStudies;

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
    >
      <div className="kin-container mb-12 sm:mb-16 lg:mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
              {ui.badge}
            </div>
            <h2 className="leading-[0.85] flex flex-col">
              <span className="whitespace-nowrap">
                <RevealText text={ui.titleA.toUpperCase()} />
              </span>
              <RevealText 
                text={ui.titleB.toUpperCase()} 
                className="text-[#B454FF]" 
                delay={0.2} 
              />
            </h2>
            <p className="mt-6 text-[#F5F5F5]/60 font-medium max-w-lg leading-relaxed animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
              {ui.sub}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
             <Link to="/casos" className="shrink-0 w-full sm:w-auto">
              <PremiumButton variant="glass" size="md" className="w-full sm:w-auto h-12 px-8">
                {ui.viewAll.toUpperCase()}
              </PremiumButton>
            </Link>
            
            {/* Controls */}
            <div className="flex gap-3">
              <button 
                onClick={() => swiperRef?.slidePrev()}
                className="h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#B454FF]/40 transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => swiperRef?.slideNext()}
                className="h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#B454FF]/40 transition-all active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="kin-container-fluid">
        <div className="relative py-4">
          <Swiper
            onSwiper={setSwiperRef}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Autoplay, Navigation, Pagination]}
            loop={true}
            speed={600}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            grabCursor={true}
            slidesPerView={1.1}
            spaceBetween={16}
            centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 24,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
                centeredSlides: false,
              },
            }}
            className="w-full px-[5vw] lg:px-0 lg:max-w-7xl lg:mx-auto !overflow-visible"
          >
            {baseCards.map((cs, i) => (
              <SwiperSlide key={`${cs.slug}-${i}`} className="h-auto">
                {({ isActive, isPrev, isNext }) => {
                  return (
                    <div className="h-full transition-all duration-700 opacity-100 blur-0 scale-100">
                      <PortfolioCard cs={cs} navigate={navigate} lang={lang} ui={ui} />
                    </div>
                  );
                }}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Pagination Dots */}
        <div className="mt-12 flex justify-center gap-3">
          {baseCards.map((_, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={i}
                onClick={() => swiperRef?.slideToLoop(i)}
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

  const formattedMetricValue = (() => {
    if (!metricValue) return null;
    if (metricLabel?.toLowerCase().includes("ventas") || metricLabel?.toLowerCase().includes("sales")) {
      return metricValue.replace('$', '').trim() + ' €';
    }
    return metricValue;
  })();

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
        willChange: "transform",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
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
                    <h3 className="text-xl sm:text-2xl font-black text-[#F5F5F5] leading-[1.1] tracking-tighter">
                      {formattedMetricValue}
                    </h3>
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