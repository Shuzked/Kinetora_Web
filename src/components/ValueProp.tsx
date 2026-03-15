"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const ValueProp = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            ¿Cansado del desgaste de las agencias tradicionales?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Tradicional */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-red-400 mb-8">Agencias Tradicionales</h3>
            <ul className="space-y-6">
              {[
                "Presupuestos sorpresa",
                "Burocracia paralizante (reuniones constantes)",
                "Webs lentas",
                "Entregas genéricas"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400">
                  <X className="w-5 h-5 text-red-500/50 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kinetora */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">Recomendado</div>
            </div>
            <h3 className="text-xl font-bold text-blue-400 mb-8">Kinetora</h3>
            <ul className="space-y-6">
              {[
                "Cuota plana mensual unificada",
                "Colaboración fluida y asíncrona mediante tablero",
                "Presencia digital ágil y optimizada",
                "Tu socio de crecimiento"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white">
                  <Check className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;