"use client";

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Proyectos Completados", value: "450", suffix: "+" },
  { label: "Capital Levantado", value: "12", suffix: "M€+" },
  { label: "Tiempo de Entrega", value: "48", suffix: "h" },
  { label: "Tasa de Éxito", value: "99", suffix: "%" },
];

const Stats = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#0D0D0D] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-3 sm:mb-4">
                <div className="text-5xl md:text-7xl font-black text-[#F5F5F5] tracking-tighter flex items-baseline justify-center">
                  {stat.value}
                  <span className="text-[#B454FF] text-2xl md:text-4xl ml-1">{stat.suffix}</span>
                </div>
                <div className="absolute -inset-4 bg-[#B454FF]/0 group-hover:bg-[#B454FF]/5 rounded-full blur-xl transition-all duration-500" />
              </div>
              <div className="text-[#2A2A2A] group-hover:text-[#B454FF]/60 transition-colors text-[10px] font-bold uppercase tracking-[0.3em] max-w-[140px] mx-auto leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;