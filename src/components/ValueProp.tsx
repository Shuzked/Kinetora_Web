"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const ValueProp = () => {
  return (
    <section className="py-24 bg-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-4 tracking-tighter">
            ¿CANSADO DEL DESGASTE TRADICIONAL?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Tradicional */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="bg-[#111111] border border-[#2A2A2A] rounded-[2rem] p-8"
          >
            <h3 className="text-xl font-bold text-[#2A2A2A] mb-8 uppercase tracking-widest text-sm">Agencias Tradicionales</h3>
            <ul className="space-y-6">
              {[
                "Presupuestos sorpresa",
                "Burocracia paralizante",
                "Webs lentas y genéricas",
                "Falta de transparencia"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#2A2A2A]">
                  <X className="w-5 h-5 text-red-900/30 mt-1 shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kinetora */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="bg-[#B454FF]/5 border border-[#B454FF]/20 rounded-[2rem] p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-[#B454FF] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Recomendado</div>
            </div>
            <h3 className="text-xl font-bold text-[#B454FF] mb-8 uppercase tracking-widest text-sm">Kinetora</h3>
            <ul className="space-y-6">
              {[
                "Cuota plana mensual unificada",
                "Colaboración fluida y asíncrona",
                "Presencia digital optimizada",
                "Tu socio de crecimiento real"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#F5F5F5]">
                  <Check className="w-5 h-5 text-[#B454FF] mt-1 shrink-0" />
                  <span className="font-bold">{item}</span>
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