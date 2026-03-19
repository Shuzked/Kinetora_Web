import React from 'react';

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] font-sans antialiased overflow-x-hidden">
      {/* Navbar Skeleton */}
      <nav className="fixed top-0 z-50 w-full h-[68px] md:h-[88px] flex items-center border-b border-[#2A2A2A]/50 bg-[#0D0D0D]/12 backdrop-blur-xl">
        <div className="kin-container flex items-center justify-between pointer-events-none opacity-50">
          <div className="h-6 w-32 bg-white/10 rounded" />
          <div className="hidden md:flex gap-8">
            <div className="h-3 w-16 bg-white/10 rounded" />
            <div className="h-3 w-16 bg-white/10 rounded" />
            <div className="h-3 w-16 bg-white/10 rounded" />
          </div>
          <div className="h-10 w-24 bg-white/10 rounded-full" />
        </div>
      </nav>

      {/* Hero Skeleton (Matches index.html and Hero.tsx) */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero/hero-kinetora-bg.webp" 
            srcSet="/assets/hero/hero-kinetora-bg-mobile.webp 600w, /assets/hero/hero-kinetora-bg.webp 1920w"
            sizes="100vw"
            className="w-full h-full object-cover filter brightness-[0.45]"
            alt=""
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 kin-container">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter uppercase mb-6">
            Diseño que impacta.<br />
            <span className="text-[#B454FF] opacity-80">Código que escala.</span>
          </h1>
          <p className="text-base md:text-lg text-[#F5F5F5]/60 max-w-xl mx-auto mb-10 h-20 bg-white/5 rounded blur-sm" />
          <div className="flex justify-center gap-4">
            <div className="h-14 w-40 bg-white/10 rounded-xl" />
            <div className="h-14 w-40 bg-white/5 rounded-xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSkeleton;
