"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { useI18n } from "@/i18n/I18nProvider";
import ClientOnly from '@/components/ClientOnly';

const Portfolio = () => {
  const { lang } = useI18n();

  const title = lang === "es" ? "Proyectos Seleccionados" : "Selected Projects";
  const subtitle = lang === "es" ? "Nuestras mejores piezas de ingeniería visual." : "Our best pieces of visual engineering.";

  const projects = [
    {
      id: "elixir",
      title: "Elixir Games",
      category: "Branding & Web",
      img: "/assets/portfolio/elixir-cover.webp",
    },
    {
      id: "ethos",
      title: "Ethos Wallet",
      category: "Product Design",
      img: "/assets/portfolio/ethos-cover.webp",
    },
    {
      id: "creatures",
      title: "Creatures",
      category: "Motion Graphics",
      img: "/assets/portfolio/creatures-cover.webp",
    },
    {
      id: "a2ax",
      title: "A2AX",
      category: "Design System",
      img: "/assets/portfolio/a2ax-cover.webp",
    },
  ];

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-[#0D0D0D] overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black tracking-[0.25em] uppercase text-[#B454FF] mb-6">
          Portfolio
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-[#F5F5F5] uppercase tracking-tighter leading-none mb-4">
          {title}
        </h2>
        <p className="text-[#F5F5F5]/60 text-lg font-medium">
          {subtitle}
        </p>
      </div>

      <div className="relative pl-4 sm:pl-6 lg:pl-[max(1rem,calc((100%-72rem)/2+2rem))]">
        <ClientOnly>
          <Swiper
            modules={[Pagination, Autoplay, FreeMode]}
            spaceBetween={30}
            slidesPerView={1.2}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".portfolio-pagination",
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.5 },
              1440: { slidesPerView: 3.2 },
            }}
            className="!overflow-visible"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 transition-all duration-700 hover:border-[#B454FF]/40"
                >
                  <ImageWithSkeleton
                    src={project.img}
                    alt={project.title}
                    width={800}
                    height={1000}
                    containerClassName="absolute inset-0"
                    skeletonClassName="bg-white/5"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-[#B454FF] text-xs font-black uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#F5F5F5] uppercase tracking-tighter leading-none">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ClientOnly>

        <div className="portfolio-pagination mt-12 flex justify-center space-x-2" />
      </div>
    </section>
  );
};

export default Portfolio;