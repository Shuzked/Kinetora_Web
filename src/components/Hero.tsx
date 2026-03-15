"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Zap, Shield, Rocket } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
      {/* Brand Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8">
            <Zap className="w-3 h-3 fill-primary" />
            Creative Subscription for Startups
          </div>
          <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
            DISEÑO QUE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">ACELERA.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-medium">
            Tu partner estratégico de diseño y desarrollo. Sin reuniones, sin fricción, solo resultados de alto impacto en 48h.
          </p>
          <div className="flex flex-wrap gap-5">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-16 text-lg font-black shadow-[0_10px_40px_rgba(0,102,255,0.4)]">
              VER PLANES
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full px-10 h-16 text-lg font-bold">
              PORTFOLIO
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-card border border-white/5 rounded-[2rem] p-8 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <div className="w-3 h-3 rounded-full bg-accent/40" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="text-[10px] text-primary font-black tracking-widest uppercase">Kinetora OS v2.0</div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-white uppercase tracking-tight">SaaS Dashboard UI</div>
                      <div className="text-[10px] text-gray-500 font-bold">ENTREGA ESTIMADA: MAÑANA</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full">ACTIVE</div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["20%", "85%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                  <Shield className="w-5 h-5 text-accent mb-3" />
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Garantía</div>
                </div>
                <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                  <Zap className="w-5 h-5 text-primary mb-3" />
                  <div className="text-2xl font-black text-white">48h</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Velocidad</div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-3xl -z-10 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;