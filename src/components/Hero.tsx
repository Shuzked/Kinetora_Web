"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase mb-6">
            El futuro de la externalización creativa para Startups
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            El departamento creativo de tu startup. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Sin burocracia.</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
            Kinetora es la extensión creativa que te falta. Diseño de interfaces, webs ultrarrápidas, vídeos de alta retención y pitch decks que levantan capital. Todo integrado bajo una suscripción mensual asíncrona.
          </p>
          <div className="flex flex-wrap gap-4 mb-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              Ver Planes de Suscripción
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full px-8 h-14 text-lg">
              Ver Portafolio
            </Button>
          </div>
          <p className="text-sm text-gray-500 italic">Facturación plana en €. Cancela cuando quieras.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Kinetora Dashboard v1.0</div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Rediseño de Landing Page</div>
                    <div className="text-[10px] text-gray-500">En progreso • Entrega en 24h</div>
                  </div>
                </div>
                <div className="h-1.5 w-20 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["0%", "75%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="h-full bg-blue-500"
                  />
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Pitch Deck Inversores</div>
                    <div className="text-[10px] text-gray-500">Completado • Hace 2h</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">LISTO</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <Clock className="w-4 h-4 text-gray-500 mb-2" />
                  <div className="text-xl font-bold text-white">48h</div>
                  <div className="text-[10px] text-gray-500 uppercase">Tiempo medio</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <Zap className="w-4 h-4 text-blue-500 mb-2" />
                  <div className="text-xl font-bold text-white">∞</div>
                  <div className="text-[10px] text-gray-500 uppercase">Revisiones</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;