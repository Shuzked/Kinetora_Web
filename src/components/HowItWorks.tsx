"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from "@/i18n/I18nProvider";

const HowItWorks = () => {
  const { lang } = useI18n();

  const copy =
    lang === "es"
      ? {
          title: "Tu nuevo flujo creativo.",
          titleAccent: "Simple y sin reuniones.",
          sub:
            "Un proceso diseñado para mantener velocidad, claridad y control sin sacrificar calidad.",
          steps: [
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
              title: "Recibe y crece",
              description: "Entregas garantizadas en 48h con revisiones ilimitadas hasta que brille.",
            },
          ],
        }
      : {
          title: "Your new creative workflow.",
          titleAccent: "Simple and meeting-free.",
          sub:
            "A process built for speed, clarity and control—without sacrificing quality.",
          steps: [
            {
              number: "01",
              title: "Request",
              description: "Describe what you need in your centralized board. No endless emails.",
            },
            {
              number: "02",
              title: "Relax",
              description: "We start designing immediately. We focus on outcomes—not hours.",
            },
            {
              number: "03",
              title: "Receive & grow",
              description: "Guaranteed 48h deliveries with unlimited revisions until it shines.",
            },
          ],
        };

  return (
    <section
      id="como-funciona"
      className="py-20 sm:py-24 lg:py-28 bg-[#0D0D0D] border-y border-white/10 scroll-mt-24 md:scroll-mt-28 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/8 blur-[90px]" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-0 tracking-tighter">
            {copy.title.toUpperCase()} <br />
            <span className="text-[#B454FF]">{copy.titleAccent.toUpperCase()}</span>
          </h2>
          <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {copy.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {copy.steps.map((step, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="text-7xl font-black text-white/5 absolute -top-10 -left-2 sm:-left-4 group-hover:text-[#B454FF]/10 transition-colors">
                {step.number}
              </div>
              <div className="relative z-10 pl-2 sm:pl-0">
                <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#F5F5F5]/70 leading-relaxed font-medium">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;