"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from "@/i18n/I18nProvider";

const HowItWorks = () => {
  const { lang } = useI18n();

  const copy =
    lang === "es"
      ? {
          badge: "El Método",
          title: "Velocidad de ejecución sin sacrificar la excelencia",
          steps: [
            {
              day: "Día 1",
              title: "Onboarding y Estrategia",
              desc: "Reunión de kick-off de 45 min. Definimos objetivos, tono y entregables inmediatos. Sin formularios infinitos.",
            },
            {
              day: "Día 2-14",
              title: "Iteración en Vivo",
              desc: "Recibes avances cada 48h. Comentamos y ajustamos en tiempo real sobre Figma o prototipos funcionales.",
            },
            {
              day: "Día 15+",
              title: "Escalado y Soporte",
              desc: "Entrega de activos finales y transición a soporte recurrente. Tu equipo de diseño bajo demanda, siempre listo.",
            },
          ],
        }
      : {
          badge: "The Method",
          title: "Execution speed without sacrificing excellence",
          steps: [
            {
              day: "Day 1",
              title: "Onboarding & Strategy",
              desc: "45-min kick-off meeting. We define goals, tone, and immediate deliverables. No infinite forms.",
            },
            {
              day: "Day 2-14",
              title: "Live Iteration",
              desc: "Receive updates every 48h. We discuss and adjust in real-time over Figma or functional prototypes.",
            },
            {
              day: "Day 15+",
              title: "Scaling & Support",
              desc: "Delivery of final assets and transition to recurring support. Your on-demand design team, always ready.",
            },
          ],
        };

  return (
    <section id="metodo" className="py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#B454FF,transparent_70%)] opacity-[0.03]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black tracking-[0.25em] uppercase text-[#B454FF] mb-6">
            {copy.badge}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#F5F5F5] uppercase tracking-tighter leading-none mb-6">
            {copy.title}
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line connector (desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#B454FF]/0 via-[#B454FF]/20 to-[#B454FF]/0 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {copy.steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-center justify-between group ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                } md:min-h-[250px]`}
              >
                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="w-full md:w-[45%] rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10 backdrop-blur-xl hover:border-[#B454FF]/30 transition-all duration-500 shadow-2xl"
                >
                  <div className="text-[#B454FF] text-lg font-black uppercase tracking-widest mb-4">
                    {step.day}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#F5F5F5] uppercase tracking-tighter mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#F5F5F5]/60 text-lg leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Point on timeline */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-4 h-4 rounded-full bg-[#B454FF] border-4 border-[#0D0D0D] shadow-[0_0_20px_rgba(180,84,255,0.5)]"
                  />
                </div>

                {/* Spacer for other side */}
                <div className="w-[45%] hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;