"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D] px-6">
      {/* Video Background with Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 grayscale scale-105"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-with-blue-and-purple-lights-31891-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Grain/Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        
        {/* Sophisticated Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D] opacity-90" />
      </div>

      {/* Dynamic Brand Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#B454FF]/20 rounded-full blur-[140px] z-0" 
      />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-12"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-[9px] font-bold text-[#F5F5F5]/60 uppercase tracking-[0.35em]">
              2 Plazas disponibles para Noviembre
            </span>
          </motion.div>

          {/* Main Headline - Refined Size */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#F5F5F5] leading-[1.1] mb-8 tracking-tighter uppercase"
          >
            Diseño que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#B454FF] to-[#8A2BE2] drop-shadow-[0_0_25px_rgba(180,84,255,0.25)]">
              impulsa tu visión.
            </span>
          </motion.h1>
          
          {/* Subheadline - Better Spacing */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-base md:text-lg text-[#F5F5F5]/40 mb-12 max-w-xl mx-auto leading-relaxed font-medium"
          >
            Tu partner estratégico de diseño y desarrollo. Sin reuniones, sin fricción, solo resultados de alto impacto entregados en 48 horas.
          </motion.p>
          
          {/* Premium CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Button 
              size="lg" 
              className="group bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-10 h-14 md:h-16 text-xs font-black tracking-widest shadow-[0_15px_40px_rgba(180,84,255,0.3)] w-full sm:w-auto transition-all hover:scale-[1.02] active:scale-95"
            >
              VER PLANES
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/10 text-[#F5F5F5]/80 hover:bg-white/5 backdrop-blur-xl rounded-full px-10 h-14 md:h-16 text-xs font-bold tracking-widest w-full sm:w-auto transition-all border-dashed"
            >
              PORTFOLIO
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Floating Trust Badges (Subtle) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-0 w-full px-6 flex flex-wrap justify-center gap-10 md:gap-16 opacity-20 grayscale hover:opacity-40 transition-all duration-700"
      >
        {["48H DELIVERY", "UNLIMITED REVISIONS", "FIXED MONTHLY PRICE"].map((text, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <Zap className="w-2.5 h-2.5 text-[#B454FF]" />
            <span className="text-[8px] font-black text-[#F5F5F5] tracking-[0.4em] uppercase">{text}</span>
          </div>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-12 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#B454FF]/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;