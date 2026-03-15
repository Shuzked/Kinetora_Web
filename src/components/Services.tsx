"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Video, MessageSquare } from 'lucide-react';

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-4 tracking-tighter">
            TODO EL MÚSCULO VISUAL QUE NECESITAS.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[650px]">
          {/* Bloque 1: Branding */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-[#111111] border border-[#2A2A2A] rounded-[2.5rem] p-10 flex flex-col justify-between group"
          >
            <Palette className="w-12 h-12 text-[#B454FF] mb-4 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-3xl font-black text-[#F5F5F5] mb-3 uppercase tracking-tighter">Construcción de Marca</h3>
              <p className="text-[#2A2A2A] font-medium text-lg">Logos, Branding completo y Pitch Decks diseñados para convencer a inversores.</p>
            </div>
          </motion.div>

          {/* Bloque 2: Digital */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#B454FF]/5 border border-[#B454FF]/20 rounded-[2.5rem] p-10 flex flex-col justify-between group"
          >
            <Globe className="w-12 h-12 text-[#B454FF] mb-4 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-2xl font-black text-[#F5F5F5] mb-3 uppercase tracking-tighter">Digital</h3>
              <p className="text-[#2A2A2A] font-medium">UX/UI en Figma, Desarrollo Web y Tiendas Online.</p>
            </div>
          </motion.div>

          {/* Bloque 3: Multimedia */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#111111] border border-[#2A2A2A] rounded-[2.5rem] p-10 flex flex-col justify-between group"
          >
            <Video className="w-12 h-12 text-[#B454FF] mb-4 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-2xl font-black text-[#F5F5F5] mb-3 uppercase tracking-tighter">Multimedia</h3>
              <p className="text-[#2A2A2A] font-medium">Motion Graphics, Edición de Vídeo y Animación 3D.</p>
            </div>
          </motion.div>

          {/* Bloque 4: Comunicación */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-[#111111] border border-[#2A2A2A] rounded-[2.5rem] p-10 flex flex-col justify-between group"
          >
            <MessageSquare className="w-12 h-12 text-[#B454FF] mb-4 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-3xl font-black text-[#F5F5F5] mb-3 uppercase tracking-tighter">Comunicación</h3>
              <p className="text-[#2A2A2A] font-medium text-lg">Vídeos ADs de alta retención y Copywriting estratégico para conversión.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;