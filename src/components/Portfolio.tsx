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
import ClientOnly from '@/components/ClientOnly';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEqualizeHeights } from "@/hooks/use-equalize";
import { PortfolioCard } from "@/components/case-study/PortfolioCard";

const Portfolio = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [swiperRef, setSwiperRef] = React.useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEqualizeHeights(sectionRef, [{ selector: ".js-eq-header", varName: "--eq-header" }], [lang]);

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
      ref={sectionRef}
      className="kin-section bg-[#0D0D0D] relative overflow-hidden group/portfolio"
    >
      <div className="kin-container mb-12 sm:mb-16 lg:mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
              {ui.badge}
            </div>
            <h2 className="">
              <RevealText text={ui.titleA.toUpperCase()} className="block" />
              <RevealText 
                text={ui.titleB.toUpperCase()} 
                className="block text-[#B454FF]" 
                delay={0.2} 
              />
            </h2>
            <p className="mt-6 text-[#F5F5F5]/60 font-medium max-w-lg leading-relaxed animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
              {ui.sub}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <PremiumButton 
              variant="glass" 
              size="md" 
              className="shrink-0 w-full sm:w-auto h-12 px-8"
              onClick={() => navigate('/casos')}
            >
              {ui.viewAll.toUpperCase()}
            </PremiumButton>
            
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

      <ClientOnly>
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
                  {() => (
                    <div className="h-full transition-all duration-700 opacity-100 blur-0 scale-100">
                      <PortfolioCard cs={cs} onNavigate={(slug) => navigate(`/casos/${slug}`)} lang={lang} ui={ui} />
                    </div>
                  )}
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
      </ClientOnly>
    </section>
  );
};

PortfolioCard.displayName = "PortfolioCard";

export default Portfolio;