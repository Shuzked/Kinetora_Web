"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Zap, Rocket, Layers } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0D0D0D]">
      {/* Brand Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#B454FF]/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#B454FF]/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#111111] border border-[#2A2A2A] text-[#B454FF] text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            <Zap className="w-3 h-3 fill-[#B454FF]" />
            Creative Subscription
          </div>
          <h1 className="text-6xl lg:text-8xl font-black text-[#F5F5F5] leading-[0.85] mb-8 tracking-tighter">
            DISEÑO QUE <br/>
            <span className="text-[#B454FF]">IMPULSA.</span>
          </h1>
          <p className="text-lg text-[#2A2A2A] mb-10 max-w-lg leading-relaxed font-medium">
            Tu partner estratégico de diseño y desarrollo. Sin reuniones, sin fricción, solo resultados de alto impacto en 48h.
          </p>
          <div className="flex flex-wrap gap-5">
            <Button size="lg" className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-10 h-16 text-lg font-black shadow-[0_10px_40px_rgba(180,84,255,0.3)]">
              VER PLANES
            </Button>
            <Button size="lg" variant="outline" className="border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#111111] rounded-full px-10 h-16 text-lg font-bold">
              PORTFOLIO
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-[#111111] border border-[#2A2A2A] rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-12">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B454FF]/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2A2A2A]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2A2A2A]" />
              </div>
              <div className="text-[9px] text-[#B454FF] font-bold tracking-[0.4em] uppercase">Kinetora OS</div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#2A2A2A]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#B454FF]/10 rounded-xl flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-[#B454FF]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#F5F5F5] uppercase tracking-tight">SaaS Interface</div>
                      <div className="text-[10px] text-[#2A2A2A] font-bold">ENTREGA: MAÑANA</div>
                    </div>
                  </div>
                  <div className="text-[9px] font-bold text-[#B454FF] bg-[#B454FF]/10 px-3 py-1 rounded-full border border-[#B454FF]/20">ACTIVE</div>
                </div>
                <div className="h-1.5 w-full bg-[#111111] rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["10%", "90%"] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                    className="h-full bg-[#B454FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#2A2A2A]">
                  <Layers className="w-5 h-5 text-[#B454FF] mb-3" />
                  <div className="text-2xl font-black text-[#F5F5F5]">∞</div>
                  <div className="text-[9px] text-[#2A2A2A] font-bold uppercase tracking-widest">Revisiones</div>
                </div>
                <div className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#2A2A2A]">
                  <Zap className="w-5 h-5 text-[#B454FF] mb-3" />
                  <div className="text-2xl font-black text-[#F5F5F5]">48h</div>
                  <div className="text-[9px] text-[#2A2A2A] font-bold uppercase tracking-widest">Velocidad</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-[#B454FF]/10 rounded-[3rem] blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;