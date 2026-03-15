"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Timer, RefreshCw, Euro } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const yVideo = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Observer nativo para detectar visibilidad del Hero
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setInView(e.isIntersecting);
      },
      { root: null, threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Pausar/continuar vídeo según visibilidad
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0D0D0D]"
    >
      <div className="absolute inset-0 z-0">
        <motion.video
          ref={videoRef}
          style={{ y: yVideo }}
          autoPlay
          loop
          muted
          playsInline
          poster="/placeholder.svg"
          className="hero-bg-video w-full h-full object-cover opacity-25 grayscale scale-105"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-with-blue-and-purple-lights-31891-large.mp4"
            type="video/mp4"
          />
        </motion.video>

        <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D] opacity-90" />
      </div>

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#B454FF]/20 rounded-full blur-[140px] z-0"
      />

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
            className="text-base md:text-lg text-[#F5F5F5]/50 max-w-xl leading-relaxed font-medium mb-8 sm:mb-10"
          >
            Tu partner estratégico de diseño y desarrollo. Sin reuniones, sin fricción, solo resultados de alto impacto entregados en 48 horas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <Button
              size="lg"
              className="group bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-9 sm:px-10 h-14 md:h-16 text-xs font-black tracking-widest shadow-[0_15px_40px_rgba(180,84,255,0.3)] w-full sm:w-auto transition-all hover:scale-[1.02] active:scale-95"
            >
              VER PLANES
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 text-[#F5F5F5]/80 hover:bg-white/5 backdrop-blur-xl rounded-full px-9 sm:px-10 h-14 md:h-16 text-xs font-bold tracking-widest w-full sm:w-auto transition-all border-dashed"
            >
              PORTFOLIO
            </Button>
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