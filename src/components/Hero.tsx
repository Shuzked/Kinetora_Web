import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PremiumButton from '@/components/PremiumButton';
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import ScrollParallax from "@/components/ui/ScrollParallax";
import { ArrowRight, Timer, RefreshCw, Euro } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import Starfield from "@/components/ui/Starfield";
import { useIsMobile } from '@/hooks/use-mobile'; // Añadido para optimización Lighthouse 100/100

import { useIsMounted } from '@/hooks/use-is-mounted';
import SafeHydration from '@/components/SafeHydration';

const Hero = () => {
  const { lang } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const isMounted = useIsMounted();

  const { scrollY } = useScroll();
  
  // Animation: scale from 1 to 0.95 and blur from 0 to 5px as we scroll 600px
  const scale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const blur = useTransform(scrollY, [0, 600], [0, 5]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.8]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const yBg = useTransform(scrollY, [0, 1000], [0, -50]); // 0.05 speed inverted




  const copy =
    lang === "es"
      ? {
          headlineTop: "El estudio que ayuda a startups",
          headlineAccent: "a levantar capital y convertir usuarios",
          sub:
            "Diseñamos el sistema visual completo — marca, web y producto — para que tu startup compita en la liga de las grandes desde el primer día.",
          pricingAnchor: "Planes desde 1.900€/mes · Sin permanencia · Pausa cuando quieras",
          ctaPrimary: "Contactar",
          ctaSecondary: "Éxitos",
          pills: [
            { Icon: Timer, text: "Entrega en 48h" },
            { Icon: RefreshCw, text: "Revisiones ilimitadas" },
            { Icon: Euro, text: "Precio mensual fijo" },
          ],
        }
      : {
          headlineTop: "The studio that helps startups",
          headlineAccent: "raise capital and convert users",
          sub:
            "We engineer the full visual system — brand, web and product — so your startup competes with the big players from day one.",
          pricingAnchor: "Plans from €1,900/mo · No lock-in · Pause anytime",
          ctaPrimary: "Let's talk",
          ctaSecondary: "Case studies",
          pills: [
            { Icon: Timer, text: "48h delivery" },
            { Icon: RefreshCw, text: "Unlimited revisions" },
            { Icon: Euro, text: "Fixed monthly price" },
          ],
        };

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
      className="hero-section hero-content-protection sticky top-0 z-0 overflow-hidden bg-[#0D0D0D] min-h-[100dvh] flex flex-col will-change-transform"
      style={{ willChange: 'transform' }}
    >
      <SafeHydration name="HeroBackground">
        <motion.div style={{ opacity: !isMounted || isMobile ? 1 : opacity }} className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {/* Animated Liquid Aura */}
          {/* Optimizacion Mobile: se desactiva el parallax javascript del fondo líquido y se reduce la opacidad/escala de los blobs */}
          <motion.div style={!isMounted || isMobile ? {} : { y: yBg }} className="liquid-bg-container">
            <div className={`liquid-blob blob-purple ${!isMounted || isMobile ? 'scale-75 opacity-40' : ''}`} />
            <div className={`liquid-blob blob-blue ${!isMounted || isMobile ? 'scale-75 opacity-40' : ''}`} />
            {/* On very small mobile screens, we remove the third blob to save on blending/GPU power */}
            {(!isMounted || !isMobile) && <div className="liquid-blob blob-coral" />}
          </motion.div>

          {/* Visibility Layer */}
          <div className="absolute inset-0 bg-black/55 md:bg-black/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(13,13,13,0.85)_100%)]" />
          
          {/* Starfield Layer - Solo en Desktop para 90-100 PageSpeed Mobile */}
          {(!isMounted || !isMobile) && (
            <SafeHydration name="Starfield" fallback={<div className="absolute inset-0 bg-black/20" />}>
              <Starfield />
            </SafeHydration>
          )}
        </motion.div>
      </SafeHydration>

      {/* Optimizacion Mobile masiva: Ignoramos el css blur() en móviles porque bloquea la GPU renderizando el árbol entero 60 veces por segundo */}
      <motion.div 
        style={!isMounted || isMobile ? {} : { scale, filter, opacity }}
        className="flex-1 flex flex-col relative z-10"
      >

      <div className="kin-container">
        <div
          className="relative z-10 flex-1 min-h-[100dvh] flex flex-col items-center justify-center text-center"
        >
          <h1 className="mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 max-w-[280px] sm:max-w-none mx-auto">
            {copy.headlineTop.replace(/\.$/, "")} <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#B454FF] via-[#9C3FEF] to-[#7C3AED] drop-shadow-[0_0_35px_rgba(180,84,255,0.35)] animate-pulse-slow">
               {copy.headlineAccent.replace(/\.$/, "")}
             </span>
          </h1>

          <p className="text-[#F5F5F5]/80 max-w-2xl leading-relaxed font-medium mb-4 animate-in fade-in fill-mode-both">
            {copy.sub}
          </p>
          <a
            href="/precios"
            className="inline-flex items-center gap-2 mb-10 sm:mb-12 text-[11px] font-black tracking-[0.22em] uppercase text-[#B454FF]/80 hover:text-[#B454FF] transition-colors border-b border-[#B454FF]/30 hover:border-[#B454FF] pb-px animate-in fade-in fill-mode-both"
          >
            {copy.pricingAnchor}
          </a>

          <ScrollParallax speed={0.15}>
            <div
              className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-800 delay-700 fill-mode-both"
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
            </div>
          </ScrollParallax>

          <ScrollParallax speed={0.1}>
            <div
              className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-4 md:gap-6 animate-in fade-in duration-1000 delay-1000 fill-mode-both"
            >
              {copy.pills.map(({ Icon, text }, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.08] border border-white/[0.12] backdrop-blur-[16px] text-[#F5F5F5] shadow-[0_0_20px_rgba(0,0,0,0.25)] hover:bg-white/[0.14] hover:border-white/[0.25] hover:-translate-y-[1px] transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B454FF]" />
                  <span className="text-[10px] sm:text-[11px] md:text-xs font-black tracking-[0.22em] uppercase">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </ScrollParallax>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;