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
import ClientOnly from '@/components/ClientOnly';

const Hero = () => {
  // Force cache bust - Hero scroll fix
  const { t } = useI18n();
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
      className="hero-section hero-content-protection fixed inset-0 w-full h-svh z-0 overflow-hidden bg-[#0D0D0D] flex flex-col"
    >
      <ClientOnly fallback={<div className="absolute inset-0 bg-[#0D0D0D]" />}>
        <motion.div 
          style={{ 
            opacity: !isMounted || isMobile ? 1 : opacity,
            scale: !isMounted || isMobile ? 1 : scale,
            filter: !isMounted || isMobile ? 'none' : filter
          }} 
          className="absolute inset-0 z-0 overflow-hidden" 
          aria-hidden="true"
        >
          {/* Animated Liquid Aura */}
          <motion.div style={!isMounted || isMobile ? {} : { y: yBg }} className="liquid-bg-container">
            <div className={`liquid-blob blob-purple ${!isMounted || isMobile ? 'scale-75 opacity-40' : ''}`} />
            <div className={`liquid-blob blob-blue ${!isMounted || isMobile ? 'scale-75 opacity-40' : ''}`} />
            {(!isMounted || !isMobile) && <div className="liquid-blob blob-coral" />}
          </motion.div>

          {/* Visibility Layer */}
          <div className="absolute inset-0 bg-black/35 sm:bg-black/45 md:bg-black/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(13,13,13,0.85)_100%)]" />
          
          {(!isMounted || !isMobile) && (
            <Starfield />
          )}
        </motion.div>
      </ClientOnly>

      <div className="flex-1 flex flex-col relative z-10">
        <div className="kin-container flex-1 flex flex-col justify-center">
          <div className="relative z-10 py-12 sm:py-20 flex flex-col items-center justify-center text-center">
            <h1 className="mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 px-2 sm:px-0">
              {t("hero.headlineTop").replace(/\.$/, "")} <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#B454FF] via-[#9C3FEF] to-[#7C3AED] drop-shadow-[0_0_35px_rgba(180,84,255,0.35)] animate-pulse-slow">
                 {t("hero.headlineAccent").replace(/\.$/, "")}
               </span>
            </h1>

            <div className="text-[#F5F5F5]/80 max-w-4xl mx-auto leading-relaxed font-medium mb-4 animate-in fade-in fill-mode-both">
              <div>{t("hero.subheadline")}</div>
            </div>
            <a
              href="/precios"
              className="inline-flex items-center gap-2 mb-10 sm:mb-12 text-[11px] font-black tracking-[0.22em] uppercase text-[#B454FF]/80 hover:text-[#B454FF] transition-colors border-b border-[#B454FF]/30 hover:border-[#B454FF] pb-px animate-in fade-in fill-mode-both"
            >
              {t("hero.pricingAnchor")}
            </a>

            <ScrollParallax speed={0.15}>
              <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-800 delay-700 fill-mode-both">
                <PremiumButton
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto hover:scale-[1.02] active:scale-95"
                  leftIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                  onClick={() => handleScrollTo("contacto")}
                >
                  {t("hero.ctaPrimary").toUpperCase()}
                </PremiumButton>
                <PremiumButton
                  variant="glass"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => handleScrollTo("casos")}
                >
                  {t("hero.ctaSecondary").toUpperCase()}
                </PremiumButton>
              </div>
            </ScrollParallax>

            {/* Social Proof Metrics (Relocated) */}
            <div className="mt-12 md:mt-16 w-full max-w-5xl mx-auto px-4 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { prefix: "14,2", suffix: " $M+", label: "CAPITAL LEVANTADO gracias a nuestros diseños" },
                  { prefix: "18", suffix: "+", label: "PROYECTOS ENTREGADOS" },
                  { prefix: "48", suffix: "h", label: "CICLO DE DISEÑO a alta fidelidad" },
                  { prefix: "94", suffix: "%", label: "RETENCIÓN B2B" },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-start items-center text-center h-full"
                  >
                    <div className="flex items-baseline whitespace-nowrap text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F5F5] leading-none">
                      {item.prefix}<span className="text-[#B454FF]">{item.suffix}</span>
                    </div>
                    <div className="mt-2 text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] font-medium max-w-[220px]">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;