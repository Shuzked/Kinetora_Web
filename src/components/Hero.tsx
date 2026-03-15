"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PremiumButton from '@/components/PremiumButton';
import { ArrowRight, Timer, RefreshCw, Euro } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const yVideo = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Utilidad local para desplazamiento suave respetando la altura del navbar
  const getNavbarOffset = () => {
    const nav = document.querySelector("nav") as HTMLElement | null;
    return (nav?.offsetHeight || 0) + 8;
  };

  const smoothScrollTo = (targetY: number, duration = 650) => {
    const startY = window.scrollY;
    const dist = targetY - startY;
    let start: number | null = null;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    function step(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(1, elapsed / duration);
      const y = startY + dist * ease(progress);
      window.scrollTo(0, y);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteY = rect.top + window.scrollY - getNavbarOffset();
    smoothScrollTo(absoluteY);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0D0D0D]"
    >
      {/* Fondo con YouTube */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: yVideo }}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          {/* Técnica de cover para iframes 16:9: asegura que el vídeo cubra todo el viewport */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '100vw',
              height: '56.25vw',       // 9/16 = 0.5625
              minHeight: '100vh',
              minWidth: '177.78vh',     // 16/9 = 1.7778
            }}
          >
            <iframe
              title="Kinetora Hero Background"
              className="w-full h-full"
              src="https://www.youtube.com/embed/-niUBSx3PKQ?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=-niUBSx3PKQ"
              frameBorder="0"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ pointerEvents: 'none' }}
            />
          </div>
        </motion.div>

        {/* Textura/grain y gradientes de legibilidad */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D] opacity-90" />
        {/* Capa extra oscura para aumentar contraste del texto */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/55 md:bg-black/50" />
        {/* Vignette sutil para reforzar la lectura sin aplanar el fondo */}
        <div className="absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0D0D0D_90%)]" />
      </div>

      {/* Glow de marca */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#B454FF]/20 rounded-full blur-[140px] z-0"
      />

      {/* Contenido */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ y: yContent }}
          className="min-h-[calc(100vh-68px)] md:min-h-[calc(100vh-88px)] flex flex-col items-center justify-center text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#F5F5F5] leading-[1.08] sm:leading-[1.05] mb-6 sm:mb-7 tracking-tighter uppercase"
          >
            Diseño que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#B454FF] to-[#8A2BE2] drop-shadow-[0_0_25px_rgba(180,84,255,0.25)]">
              impulsa tu visión.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-base md:text-lg text-[#F5F5F5]/80 max-w-xl leading-relaxed font-medium mb-8 sm:mb-10"
          >
            Tu partner estratégico de diseño y desarrollo. Sin reuniones, sin fricción, solo resultados de alto impacto entregados en 48 horas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <PremiumButton
              variant="primary"
              size="lg"
              className="w-full sm:w-auto hover:scale-[1.02] active:scale-95"
              leftIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              onClick={() => handleScrollTo("precios")}
            >
              VER PLANES
            </PremiumButton>
            <PremiumButton
              variant="glass"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => handleScrollTo("casos")}
            >
              ÉXITOS
            </PremiumButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
          >
            {[
              { Icon: Timer, text: "48H DELIVERY" },
              { Icon: RefreshCw, text: "UNLIMITED REVISIONS" },
              { Icon: Euro, text: "FIXED MONTHLY PRICE" },
            ].map(({ Icon, text }, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-[#F5F5F5] shadow-[0_0_20px_rgba(0,0,0,0.25)] hover:bg-white/[0.12] transition-colors"
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B454FF]" />
                <span className="text-[10px] sm:text-[11px] md:text-xs font-black tracking-[0.28em] uppercase">
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;