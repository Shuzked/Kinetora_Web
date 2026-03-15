"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PremiumButton from "@/components/PremiumButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { caseStudies } from "@/data/caseStudies";

const Portfolio = () => {
  return (
    <section
      id="casos"
      className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] scroll-mt-24 md:scroll-mt-28 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
              Casos de éxito
            </div>
            <h2 className="mt-5 text-3xl md:text-5xl font-black text-[#F5F5F5] tracking-tighter uppercase">
              Diseño creado para
              <span className="text-[#B454FF]"> convertir</span>.
            </h2>
            <p className="mt-3 text-[#F5F5F5]/70 text-sm sm:text-base max-w-2xl leading-relaxed">
              Proyectos reales con impacto medible. Desliza para ver más y entra al post para conocer el proceso.
            </p>
          </div>

          <Link to="/casos" className="shrink-0">
            <PremiumButton variant="glass" size="md" className="w-full sm:w-auto">
              VER TODOS
            </PremiumButton>
          </Link>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {caseStudies.map((cs) => (
              <CarouselItem
                key={cs.slug}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-full"
                >
                  <Link
                    to={`/casos/${cs.slug}`}
                    className="group block h-full rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-colors"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={cs.coverImage}
                        alt={cs.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60">
                          {cs.sector}
                        </div>
                        <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#B454FF]">
                          {cs.metric}
                        </div>
                      </div>
                      <h3 className="mt-3 text-lg sm:text-xl font-black tracking-tight">
                        {cs.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#F5F5F5]/65 leading-relaxed">
                        {cs.summary}
                      </p>

                      <div className="mt-5 h-px w-full bg-white/10" />
                      <div className="mt-5 inline-flex items-center rounded-full bg-[#B454FF]/10 border border-[#B454FF]/25 px-4 py-2 text-[11px] font-black tracking-[0.24em] uppercase text-[#B454FF]">
                        VER POST
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className="hidden sm:inline-flex -left-4 md:-left-6 h-11 w-11 rounded-full border border-white/10 bg-[#0D0D0D]/70 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20"
          />
          <CarouselNext
            className="hidden sm:inline-flex -right-4 md:-right-6 h-11 w-11 rounded-full border border-white/10 bg-[#0D0D0D]/70 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20"
          />
        </Carousel>

        <div className="mt-6 sm:hidden">
          <p className="text-center text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/55">
            Desliza para ver más
          </p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;