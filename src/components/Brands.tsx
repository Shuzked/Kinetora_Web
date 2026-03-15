"use client";

import React, { useRef } from 'react';

const brands = [
  { name: "Square Enix", src: "/assets/brands/square-enix.svg" },
  { name: "Solana", src: "/assets/brands/solana.svg" },
  { name: "Elixir Games", src: "/assets/brands/elixir-games.svg" },
  { name: "Litlab Games", src: "/assets/brands/litlab-games.svg" },
  { name: "Friends4Payment", src: "/assets/brands/friends4payment.svg" },
  { name: "Hard Lock", src: "/assets/brands/hard-lock.svg" },
  { name: "BUU AI", src: "/assets/brands/buu-ai.svg" },
  { name: "Sphere Studios", src: "/assets/brands/sphere-studios.svg" },
  { name: "A2AX", src: "/assets/brands/a2ax.svg" },
];

const Brands = () => {
  // Duplicamos para crear un loop perfecto en una sola línea
  const items = [...brands, ...brands];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const pauseTrack = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
    if (wrapperRef.current) wrapperRef.current.setAttribute('data-paused', 'true');
  };
  const resumeTrack = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
    if (wrapperRef.current) wrapperRef.current.removeAttribute('data-paused');
  };

  return (
    <section aria-label="Marcas que confían en Kinetora" className="py-14 sm:py-16 bg-[#0D0D0D] border-y border-white/10 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] font-bold text-[#F5F5F5]/60 uppercase tracking-[0.4em] mb-8 sm:mb-10">
          Marcas que confían en nuestra velocidad
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Pista única con loop infinito perfecto (contenido duplicado) */}
        <div className="relative h-12 sm:h-14" data-animate="always" ref={wrapperRef}>
          <div
            ref={trackRef}
            className="marquee-track absolute inset-y-0 left-0 flex items-center gap-10 sm:gap-12 md:gap-24 min-w-max will-change-transform"
            style={{ animationDuration: "55s" }}
          >
            {items.map((brand, i) => (
              <div
                key={`brand-${i}-${brand.name}`}
                onMouseEnter={pauseTrack}
                onMouseLeave={resumeTrack}
                onTouchStart={pauseTrack}
                onTouchEnd={resumeTrack}
                className="flex items-center justify-center select-none h-10 sm:h-11 md:h-12 w-32 sm:w-36 md:w-40"
                aria-hidden={i >= brands.length}
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain opacity-60 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;