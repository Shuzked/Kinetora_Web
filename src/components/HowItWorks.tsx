"use client";

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Pide",
    description: "Describe tu necesidad en nuestro tablero centralizado. Sin emails infinitos."
  },
  {
    number: "02",
    title: "Relájate",
    description: "Diseñamos con propósito de inmediato. Nos enfocamos en resultados, no en horas."
  },
  {
    number: "03",
    title: "Recibe y Crece",
    description: "Entregas garantizadas en 48h con revisiones ilimitadas hasta que brille."
  }
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 bg-black border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Tu nuevo flujo de trabajo creativo. <br/>
            <span className="text-blue-500">Simple y sin reuniones.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="text-6xl font-black text-white/5 absolute -top-10 -left-4 group-hover:text-blue-500/10 transition-colors">
                {step.number}
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;