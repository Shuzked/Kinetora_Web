"use client";

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Proyectos Entregados", value: "450+" },
  { label: "Capital Levantado", value: "12M€+" },
  { label: "Tiempo de Entrega", value: "48h" },
  { label: "Satisfacción", value: "99%" }
];

const Stats = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-blue-100 text-sm font-bold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;