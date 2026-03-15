"use client";

import React from 'react';

const brands = ["VOLTA", "NEXUS", "AETHER", "ORBIT", "PRISM", "ZENITH"];

const Brands = () => {
  return (
    <section className="py-14 sm:py-16 bg-[#0D0D0D] border-y border-[#2A2A2A] overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] font-bold text-[#2A2A2A] uppercase tracking-[0.4em] mb-8 sm:mb-10">
          Marcas que confían en nuestra velocidad
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fades laterales */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10" />

        <div className="relative h-12 sm:h-14">
          {/* Pista 1 */}
          <div className="marquee absolute inset-y-0 left-0 flex items-center gap-10 sm:gap-12 md:gap-24 min-w-max will-change-transform">
            {brands.map((brand, i) => (
              <div
                key={`m1-${i}`}
                className="text-2xl md:text-4xl font-black tracking-tighter text-[#F5F5F5] opacity-25 hover:opacity-100 hover:text-[#B454FF] transition-all select-none"
              >
                {brand}
              </div>
            ))}
          </div>
          {/* Pista 2 (desfasada) */}
          <div className="marquee2 absolute inset-y-0 left-full flex items-center gap-10 sm:gap-12 md:gap-24 min-w-max will-change-transform">
            {brands.map((brand, i) => (
              <div
                key={`m2-${i}`}
                className="text-2xl md:text-4xl font-black tracking-tighter text-[#F5F5F5] opacity-25 hover:opacity-100 hover:text-[#B454FF] transition-all select-none"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;