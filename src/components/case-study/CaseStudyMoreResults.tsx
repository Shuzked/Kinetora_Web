"use client";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PremiumButton from "@/components/PremiumButton";
import { useEqualizeHeights } from "@/hooks/use-equalize";
import { PortfolioCard } from "./PortfolioCard";
import type { CaseStudy } from "@/data/caseStudies";

type CaseStudyMoreResultsProps = {
  cases: CaseStudy[];
  lang: "es" | "en";
  readMoreLabel: string;
  moreResultsLabel: string;
  viewAllLabel: string;
  swipeLabel: string;
  onNavigate: (slug: string) => void;
};

const CaseStudyMoreResults = ({
  cases,
  lang,
  readMoreLabel,
  moreResultsLabel,
  viewAllLabel,
  swipeLabel,
  onNavigate,
}: CaseStudyMoreResultsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [swiperRef, setSwiperRef] = React.useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEqualizeHeights(containerRef, [{ selector: ".js-eq-header", varName: "--eq-header" }], [lang, cases.length]);

  const ui = {
    readMore: readMoreLabel,
    ariaReadMore: (t: string) => `${readMoreLabel}: ${t}`,
  };

  if (cases.length === 0) return null;

  return (
    <div className="relative mt-16 sm:mt-20 lg:mt-24 pt-16 border-t border-white/10" ref={containerRef}>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-10 sm:mb-12">
        <div className="max-w-xl">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
            {lang === "es" ? "Proyectos relacionados" : "Related projects"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase whitespace-pre-line">
            {moreResultsLabel}
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link to="/casos" className="shrink-0 w-full sm:w-auto">
            <PremiumButton variant="glass" size="md" className="w-full sm:w-auto h-12 px-8">
              {viewAllLabel.toUpperCase()}
            </PremiumButton>
          </Link>
          
          <div className="flex gap-3">
            <button 
              onClick={() => swiperRef?.slidePrev()}
              className="h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#B454FF]/40 transition-all active:scale-95"
              aria-label="Previous cases"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => swiperRef?.slideNext()}
              className="h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#B454FF]/40 transition-all active:scale-95"
              aria-label="Next cases"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <Swiper
          onSwiper={setSwiperRef}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay, Navigation, Pagination]}
          a11y={{ enabled: false }}
          loop={cases.length > 3}
          speed={600}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          grabCursor={true}
          slidesPerView={1.1}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className="w-full !overflow-visible"
        >
          {cases.map((cs) => (
            <SwiperSlide key={cs.slug} className="h-auto">
              <div className="h-full">
                <PortfolioCard cs={cs} onNavigate={onNavigate} lang={lang} ui={ui} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Pagination Dots */}
      {cases.length > 1 && (
        <div className="mt-12 flex justify-center gap-3">
          {cases.map((_, i) => {
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
      )}

      <div className="mt-6 sm:hidden text-center">
        <p className="text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/55">
          {swipeLabel}
        </p>
      </div>
    </div>
  );
};

export default CaseStudyMoreResults;
