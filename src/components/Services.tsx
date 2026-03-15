"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Video, MessageSquare } from 'lucide-react';

const Services = () => {
  return (
    <section id="servicios" className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] scroll-mt-24 md:scroll-mt-28 relative overflow-hidden">
      {/* ambient glow (soft, no hard cuts) */}
      <div className="pointer-events-none absolute -top-32 -left-28 h-96 w-96 rounded-full bg-[#B454FF]/12 blur-[120px] z-0" />
      <div className="pointer-events-none absolute -bottom-36 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#B454FF]/8 blur-[130px] z-0" />
      {/* subtle texture + blend */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] z-[1] bg-[radial-gradient(circle_at_30%_20%,rgba(180,84,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] z-[1] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />
      {/* edge fades to blend with adjacent sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,#0D0D0D,transparent)] z-[2]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,#0D0D0D,transparent)] z-[2]" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-24">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-5">
            Capacidades
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#F5F5F5] tracking-tighter leading-[1.1]">
            TODO EL MÚSCULO VISUAL <br />
            <span className="text-[#F5F5F5]/65">QUE TU STARTUP NECESITA.</span>
          </h2>
          <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed">
            Branding, producto, web y contenido — con un sistema que mantiene calidad y consistencia a escala.
          </p>
        </div>

        <div className="rounded-[2.75rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm p-2 sm:p-3 md:p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Bloque 1: Branding */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden backdrop-blur-xl hover:border-white/15 hover:bg-white/[0.055] transition-[transform,background-color,border-color] duration-300"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-[#B454FF]/40" />
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Palette className="w-40 h-40 text-[#B454FF]" />
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                <Palette className="w-6 h-6 text-[#B454FF]" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">
                  Construcción de Marca
                </h3>
                <p className="text-[#F5F5F5]/70 font-medium text-lg md:text-xl max-w-md leading-relaxed">
                  Logos, Branding completo y Pitch Decks diseñados para convencer a inversores de primer nivel.
                </p>
              </div>
            </motion.div>

            {/* Bloque 2: Digital */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#B454FF]/7 border border-[#B454FF]/22 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] relative overflow-hidden backdrop-blur-xl transition-[transform,background-color,border-color] duration-300"
            >
              <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#B454FF]/14 blur-[70px]" />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B454FF]/12 border border-[#B454FF]/22 mb-8 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                <Globe className="w-6 h-6 text-[#B454FF]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">Digital</h3>
                <p className="text-[#F5F5F5]/70 font-medium text-lg leading-relaxed">
                  UX/UI en Figma, Desarrollo Web y Tiendas Online optimizadas para conversión.
                </p>
              </div>
            </motion.div>

            {/* Bloque 3: Multimedia */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] hover:border-white/15 hover:bg-white/[0.055] backdrop-blur-xl transition-[transform,background-color,border-color] duration-300"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                <Video className="w-6 h-6 text-[#B454FF]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">Multimedia</h3>
                <p className="text-[#F5F5F5]/70 font-medium text-lg leading-relaxed">
                  Motion Graphics, Edición de Vídeo y Animación 3D de alto impacto.
                </p>
              </div>
            </motion.div>

            {/* Bloque 4: Comunicación */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden backdrop-blur-xl hover:border-white/15 hover:bg-white/[0.055] transition-[transform,background-color,border-color] duration-300"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-white/10" />
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageSquare className="w-40 h-40 text-[#B454FF]" />
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                <MessageSquare className="w-6 h-6 text-[#B454FF]" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">
                  Comunicación
                </h3>
                <p className="text-[#F5F5F5]/70 font-medium text-lg md:text-xl max-w-md leading-relaxed">
                  Vídeos ADs de alta retención y Copywriting estratégico para escalar tus campañas.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;