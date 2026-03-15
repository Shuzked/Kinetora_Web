"use client";

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Proyectos", value: "450+" },
  { label: "Capital", value: "12M€+" },
  { label: "Entrega", value: "48h" },
  { label: "Éxito", value: "99%" }
];

const Stats = () => {
  return (
    <section className="py-20 bg-[#B454FF]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-black text-[#0D0D0D] mb-2">{stat.value}</div>
              <div className="text-[#0D0D0D]/60 text-[10px] font-bold uppercase tracking-[0.3em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;