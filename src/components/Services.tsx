"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Video, MessageSquare } from 'lucide-react';

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Todo el músculo visual que tu marca necesita
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Bloque 1: Branding */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 bg-gradient-to-br from-blue-600/20 to-transparent border border-white/10 rounded-3xl p-8 flex flex-col justify-between"
          >
            <Palette className="w-10 h-10 text-blue-400 mb-4" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Construcción de Marca</h3>
              <p className="text-gray-400">Logos, Branding completo y Pitch Decks diseñados para convencer a inversores.</p>
            </div>
          </motion.div>

          {/* Bloque 2: Digital */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between"
          >
            <Globe className="w-10 h-10 text-purple-400 mb-4" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Entornos Digitales</h3>
              <p className="text-gray-400">UX/UI en Figma, Desarrollo Web ultrarrápido y Tiendas Online.</p>
            </div>
          </motion.div>

          {/* Bloque 3: Multimedia */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between"
          >
            <Video className="w-10 h-10 text-pink-400 mb-4" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Multimedia</h3>
              <p className="text-gray-400">Motion Graphics, Edición de Vídeo y Animación 3D de alto impacto.</p>
            </div>
          </motion.div>

          {/* Bloque 4: Comunicación */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 bg-gradient-to-bl from-purple-600/20 to-transparent border border-white/10 rounded-3xl p-8 flex flex-col justify-between"
          >
            <MessageSquare className="w-10 h-10 text-blue-400 mb-4" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Comunicación</h3>
              <p className="text-gray-400">Vídeos ADs de alta retención y Copywriting estratégico para conversión.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;