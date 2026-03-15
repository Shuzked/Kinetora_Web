"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-black">
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
          <p className="text-sm text-gray-500 italic">Facturación plana en £. Cancela cuando quieras.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <div className="ml-4 h-4 w-32 bg-white/5 rounded" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-40 bg-blue-500/10 rounded-lg border border-blue-500/20 animate-pulse" />
              <div className="h-40 bg-purple-500/10 rounded-lg border border-purple-500/20" />
              <div className="h-24 bg-white/5 rounded-lg" />
              <div className="h-24 bg-white/5 rounded-lg" />
              <div className="h-24 bg-white/5 rounded-lg" />
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
        </motion.div>
      </div>

      {/* Social Proof */}
      <div className="absolute bottom-10 w-full border-t border-white/5 pt-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-medium text-gray-500 uppercase tracking-[0.2em] mb-8">
            Respaldado por startups financiadas por ENISA y CDTI
          </p>
          <div className="flex justify-center items-center gap-12 opacity-30 grayscale">
            <div className="h-8 w-24 bg-white/20 rounded" />
            <div className="h-8 w-24 bg-white/20 rounded" />
            <div className="h-8 w-24 bg-white/20 rounded" />
            <div className="h-8 w-24 bg-white/20 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;