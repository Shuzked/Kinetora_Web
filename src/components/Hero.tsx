"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
      {/* Video Background Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 grayscale"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-with-blue-and-purple-lights-31891-large.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Brand Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#B454FF]/10 rounded-full blur-[120px] z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-[#F5F5F5] leading-[0.9] mb-8 tracking-tighter">
            DISEÑO QUE <br />
            <span className="text-[#B454FF]">IMPULSA.</span>
          </h1>
          
          <p className="text-base md:text-xl text-[#F5F5F5]/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Tu partner estratégico de diseño y desarrollo. Sin reuniones, sin fricción, solo resultados de alto impacto entregados en 48 horas.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
            <Button 
              size="lg" 
              className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-10 h-16 md:h-20 text-sm md:text-lg font-black tracking-widest shadow-[0_20px_40px_rgba(180,84,255,0.3)] w-full sm:w-auto transition-transform hover:scale-105"
            >
              VER PLANES
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#2A2A2A] text-[#F5F5F5] hover:bg-white/5 backdrop-blur-md rounded-full px-10 h-16 md:h-20 text-sm md:text-lg font-bold tracking-widest w-full sm:w-auto transition-all"
            >
              PORTFOLIO
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-[9px] font-bold text-[#2A2A2A] uppercase tracking-[0.5em]">Scroll</div>
        <div className="w-px h-12 bg-gradient-to-b from-[#B454FF] to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;