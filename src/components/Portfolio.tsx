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

import { useI18n } from "@/i18n/I18nProvider";
import RevealText from "@/components/ui/RevealText";
import ClientOnly from '@/components/ClientOnly';
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEqualizeHeights } from "@/hooks/use-equalize";
import { PortfolioCard } from "@/components/case-study/PortfolioCard";
import { caseStudies } from "@/data/caseStudies";

const Portfolio = () => {
  const { lang, t } = useI18n();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [swiperRef, setSwiperRef] = React.useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEqualizeHeights(sectionRef, [{ selector: ".js-eq-header", varName: "--eq-header" }], [lang]);

  const baseCards = caseStudies;

  return (
    <section
      ref={sectionRef}
      className="kin-section bg-[#0D0D0D] relative overflow-hidden group/portfolio"
    >
      <div className="kin-container mb-12 sm:mb-16 lg:mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
              {t("portfolio.badge")}
            </div>
            <h2 className="">
              <RevealText text={t("portfolio.titleA").toUpperCase()} className="block" />
              <RevealText 
                text={t("portfolio.titleB").toUpperCase()} 
                className="block text-[#B454FF]" 
                delay={0.2} 
              />
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-xl md:text-2xl text-[#F5F5F5]/50 max-w-2xl font-medium tracking-tight"
            >
              {t("portfolio.sub")}
            </motion.p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/casos"
                className="group inline-flex items-center gap-4 bg-white/[0.03] border border-white/10 px-8 py-5 rounded-2xl text-[#F5F5F5] font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/[0.08] transition-all duration-300"
              >
                {t("portfolio.viewAll")}
                <ArrowUpRight className="w-5 h-5 text-[#B454FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
            
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
                      <PortfolioCard cs={cs} onNavigate={(slug) => navigate(`/casos/${slug}`)} />
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