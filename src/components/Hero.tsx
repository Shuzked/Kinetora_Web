"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PremiumButton from '@/components/PremiumButton';
import { ArrowRight, Timer, RefreshCw, Euro } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

const Hero = () => {
  const { lang } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const yVideo = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const copy =
    lang === "es"
      ? {
          headlineTop: "Diseño que",
          headlineAccent: "impulsa tu visión.",
          sub:
            "Tu partner estratégico de diseño y desarrollo. Sin reuniones, sin fricción, solo resultados de alto impacto entregados en 48 horas.",
          ctaPrimary: "Contactar",
          ctaSecondary: "Éxitos",
          pills: [
            { Icon: Timer, text: "Entrega en 48h" },
            { Icon: RefreshCw, text: "Revisiones ilimitadas" },
            { Icon: Euro, text: "Precio mensual fijo" },
          ],
        }
      : {
          headlineTop: "Design that",
          headlineAccent: "moves your vision forward.",
          sub:
            "Your strategic partner for design and development. No meetings, no friction—just high-impact results delivered in 48 hours.",
          ctaPrimary: "Let's talk",
          ctaSecondary: "Case studies",
          pills: [
            { Icon: Timer, text: "48h delivery" },
            { Icon: RefreshCw, text: "Unlimited revisions" },
            { Icon: Euro, text: "Fixed monthly price" },
          ],
        };

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

  // Mejora de rendimiento: cargar el iframe de YouTube solo en desktop y cuando el héroe está visible
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 767px)").matches;

  // REMOVED: Estado y observer para vídeo (sustituimos por imagen estática)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0D0D0D]"
    >
      {/* Fondo: imagen ligera en móvil o antes de montar el iframe; video en desktop cuando visible */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ y: yVideo }}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          {/* Video de fondo YouTube: autoplay + loop sin cortes */}
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/-niUBSx3PKQ?autoplay=1&mute=1&loop=1&playlist=-niUBSx3PKQ&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&iv_load_policy=3`}
              title="Hero background video"
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* REMOVED: textura remota para evitar petición externa y mejorar performance */}
        {/* <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" /> */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D] opacity-90" />
        <div className="absolute inset-0 pointer-events-none bg-black/60 sm:bg-black/55 md:bg-black/50" />
        <div className="absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0D0D0D_90%)]" />
      </div>

      {/* Contenido */}
      <div className="kin-container">
        <motion.div
          style={{ y: yContent }}
          className="relative z-10 min-h-[calc(100vh-68px)] md:min-h-[calc(100vh-88px)] flex flex-col items-center justify-center text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#F5F5F5] leading-[1.08] sm:leading-[1.05] mb-6 sm:mb-7 tracking-tighter uppercase"
          >
            {copy.headlineTop} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#B454FF] to-[#8A2BE2] drop-shadow-[0_0_25px_rgba(180,84,255,0.25)]">
              {copy.headlineAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-base md:text-lg text-[#F5F5F5]/80 max-w-xl leading-relaxed font-medium mb-8 sm:mb-10"
          >
            {copy.sub}
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
              onClick={() => handleScrollTo("contacto")}
            >
              {copy.ctaPrimary.toUpperCase()}
            </PremiumButton>
            <PremiumButton
              variant="glass"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => handleScrollTo("casos")}
            >
              {copy.ctaSecondary.toUpperCase()}
            </PremiumButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
          >
            {copy.pills.map(({ Icon, text }, i) => (
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