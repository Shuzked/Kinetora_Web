"use client";

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Pide",
    description: "Describe tu necesidad en nuestro tablero centralizado. Sin emails infinitos.",
  },
  {
    number: "02",
    title: "Relájate",
    description: "Diseñamos con propósito de inmediato. Nos enfocamos en resultados, no en horas.",
  },
  {
    number: "03",
    title: "Recibe y Crece",
    description: "Entregas garantizadas en 48h con revisiones ilimitadas hasta que brille.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="como-funciona"
      className="py-20 sm:py-24 lg:py-28 bg-[#0D0D0D] border-y border-[#2A2A2A] scroll-mt-24 md:scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-0 tracking-tighter">
            TU NUEVO FLUJO CREATIVO. <br />
            <span className="text-[#B454FF]">SIMPLE Y SIN REUNIONES.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="text-7xl font-black text-[#111111] absolute -top-10 -left-2 sm:-left-4 group-hover:text-[#B454FF]/10 transition-colors">
                {step.number}
              </div>
              <div className="relative z-10 pl-2 sm:pl-0">
                <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#2A2A2A] leading-relaxed font-medium">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;