"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Video, MessageSquare } from 'lucide-react';

const Services = () => {
  return (
    <section id="servicios" className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-24">
          <div className="text-[#B454FF] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            Capacidades
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#F5F5F5] tracking-tighter leading-[1.1]">
            TODO EL MÚSCULO VISUAL <br />
            <span className="text-[#2A2A2A]">QUE TU STARTUP NECESITA.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Bloque 1: Branding */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-[#111111] border border-[#2A2A2A] rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Palette className="w-40 h-40 text-[#B454FF]" />
            </div>
            <Palette className="w-12 h-12 text-[#B454FF] mb-8" />
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">
                Construcción de Marca
              </h3>
              <p className="text-[#2A2A2A] font-medium text-lg md:text-xl max-w-md">
                Logos, Branding completo y Pitch Decks diseñados para convencer a inversores de primer nivel.
              </p>
            </div>
          </motion.div>

          {/* Bloque 2: Digital */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#B454FF]/5 border border-[#B454FF]/20 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px]"
          >
            <Globe className="w-12 h-12 text-[#B454FF] mb-8" />
            <div>
              <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">Digital</h3>
              <p className="text-[#2A2A2A] font-medium text-lg">
                UX/UI en Figma, Desarrollo Web y Tiendas Online optimizadas para conversión.
              </p>
            </div>
          </motion.div>

          {/* Bloque 3: Multimedia */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#111111] border border-[#2A2A2A] rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px]"
          >
            <Video className="w-12 h-12 text-[#B454FF] mb-8" />
            <div>
              <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">Multimedia</h3>
              <p className="text-[#2A2A2A] font-medium text-lg">
                Motion Graphics, Edición de Vídeo y Animación 3D de alto impacto.
              </p>
            </div>
          </motion.div>

          {/* Bloque 4: Comunicación */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-[#111111] border border-[#2A2A2A] rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <MessageSquare className="w-40 h-40 text-[#B454FF]" />
            </div>
            <MessageSquare className="w-12 h-12 text-[#B454FF] mb-8" />
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">
                Comunicación
              </h3>
              <p className="text-[#2A2A2A] font-medium text-lg md:text-xl max-w-md">
                Vídeos ADs de alta retención y Copywriting estratégico para escalar tus campañas.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;