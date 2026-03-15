"use client";

import React, { useRef, useCallback } from 'react';

const brands = ["VOLTA", "NEXUS", "AETHER", "ORBIT", "PRISM", "ZENITH"];

const Brands = () => {
  // Duplicamos para loop perfecto
  const items = [...brands, ...brands];
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const setPlayState = useCallback((paused: boolean) => {
    if (!wrapperRef.current) return;
    const tracks = wrapperRef.current.querySelectorAll<HTMLElement>(".marquee-track");
    tracks.forEach((t) => {
      t.style.animationPlayState = paused ? "paused" : "running";
    });
  }, []);

  const pause = () => setPlayState(true);
  const resume = () => setPlayState(false);

  return (
    <section aria-label="Marcas que confían en Kinetora" className="py-14 sm:py-16 bg-[#0D0D0D] border-y border-[#2A2A2A] overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] font-bold text-[#2A2A2A] uppercase tracking-[0.4em] mb-8 sm:mb-10">
          Marcas que confían en nuestra velocidad
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fades laterales */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10" />

        {/* Wrapper con flag para animar siempre (incluso con reduced motion del SO) */}
        <div className="relative space-y-4" data-animate="always" ref={wrapperRef}>
          {/* Pista 1 (izq -> der con loop) */}
          <div className="relative h-12 sm:h-14">
            <div
              className="marquee-track absolute inset-y-0 left-0 flex items-center gap-10 sm:gap-12 md:gap-24 min-w-max will-change-transform"
              style={{ animationDuration: "55s" }}
            >
              {items.map((brand, i) => (
                <div
                  key={`m1-${i}-${brand}`}
                  onMouseEnter={pause}
                  onMouseLeave={resume}
                  onTouchStart={pause}
                  onTouchEnd={resume}
                  className="text-2xl md:text-4xl font-black tracking-tighter text-[#F5F5F5] opacity-30 hover:opacity-100 hover:text-[#B454FF] transition-colors select-none"
                  aria-hidden={i >= brands.length}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>

          {/* Pista 2 (der -> izq con loop inverso) */}
          <div className="relative h-12 sm:h-14">
            <div
              className="marquee-track marquee-track--reverse absolute inset-y-0 left-0 flex items-center gap-10 sm:gap-12 md:gap-24 min-w-max will-change-transform"
              style={{ animationDuration: "62s" }}
            >
              {items.map((brand, i) => (
                <div
                  key={`m2-${i}-${brand}`}
                  onMouseEnter={pause}
                  onMouseLeave={resume}
                  onTouchStart={pause}
                  onTouchEnd={resume}
                  className="text-2xl md:text-4xl font-black tracking-tighter text-[#F5F5F5] opacity-30 hover:opacity-100 hover:text-[#B454FF] transition-colors select-none"
                  aria-hidden={i >= brands.length}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;