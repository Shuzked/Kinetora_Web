"use client";

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumButton from "@/components/PremiumButton";
import { caseStudies } from "@/data/caseStudies";

const Cases = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <Navbar />
      <main className="pt-[68px] md:pt-[88px]">
        <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                Casos de éxito
              </div>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                Proyectos reales.
                <span className="text-[#B454FF]"> Resultados medibles</span>.
              </h1>
              <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed">
                Selección de proyectos donde diseñamos el sistema, el producto y la narrativa para acelerar crecimiento.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {caseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  to={`/casos/${cs.slug}`}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-colors"
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
                    <h2 className="mt-3 text-lg sm:text-xl font-black tracking-tight">
                      {cs.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#F5F5F5]/65 leading-relaxed">
                      {cs.summary}
                    </p>

                    <div className="mt-5">
                      <PremiumButton
                        variant="glass"
                        size="sm"
                        className="w-full h-11 rounded-full border-white/15 bg-white/5 hover:bg-white/10"
                      >
                        VER CASO
                      </PremiumButton>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cases;
