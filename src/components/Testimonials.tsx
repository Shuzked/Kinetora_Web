"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from "@/i18n/I18nProvider";
import ClientOnly from '@/components/ClientOnly';

const Testimonials = () => {
  const { lang } = useI18n();

  const title = lang === "es" ? "Lo que dicen de nosotros" : "What they say about us";
  const badge = lang === "es" ? "Testimonios" : "Testimonials";

  const testimonials = [
    {
      name: "Marcus Thorne",
      role: "CEO @ NEXUS",
      content: lang === "es" 
        ? "El ritmo de entrega es una locura. Literalmente escalamos nuestro producto en semanas, no meses."
        : "The delivery pace is insane. We literally scaled our product in weeks, not months.",
      avatar: "MT",
    },
    {
      name: "Sofia Chen",
      role: "Founder @ Lume",
      content: lang === "es"
        ? "Diseño con alma de ingeniería. Entienden el negocio tan bien como el píxel."
        : "Design with an engineering soul. They understand the business as well as the pixel.",
      avatar: "SC",
    },
    {
      name: "David Miller",
      role: "CTO @ Flux",
      content: lang === "es"
        ? "Su sistema de diseño nos ahorró cientos de horas de desarrollo. Es una inversión, no un gasto."
        : "Their design system saved us hundreds of development hours. It's an investment, not an expense.",
      avatar: "DM",
    },
    {
      name: "Elena Rodriguez",
      role: "Product Lead @ Aeris",
      content: lang === "es"
        ? "El pitch deck que hicieron nos ayudó a cerrar nuestra ronda Seed en menos de un mes."
        : "The pitch deck they made helped us close our Seed round in less than a month.",
      avatar: "ER",
    },
    {
      name: "James Wilson",
      role: "Marketing Director @ Volt",
      content: lang === "es"
        ? "Contenido que engancha. Nuestra retención en redes subió un 40% tras el primer mes con Kinetora."
        : "Content that hooks. Our social media retention went up 40% after the first month with Kinetora.",
      avatar: "JW",
    },
    {
      name: "Lucas Moretti",
      role: "Design VP @ Omni",
      content: lang === "es"
        ? "Humanos, directos y extremadamente talentosos. No buscamos más agencias."
        : "Human, direct, and extremely talented. We stopped looking for other agencies.",
      avatar: "LM",
    },
    {
      name: "Sarah Jenkins",
      role: "Operations @ Zenit",
      content: lang === "es"
        ? "La mejor decisión para nuestra etapa de crecimiento. Velocidad pura."
        : "The best decision for our growth stage. Pure speed.",
      avatar: "SJ",
    },
  ];

  return (
    <section id="testimonios" className="py-24 lg:py-32 bg-[#0D0D0D] overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 mb-16 relative z-10 text-center">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black tracking-[0.25em] uppercase text-[#B454FF] mb-6">
          {badge}
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-[#F5F5F5] uppercase tracking-tighter leading-none mb-6">
          {title}
        </h2>
      </div>

      <div className="relative">
        <ClientOnly>
          <div className="flex gap-6 animate-marquee-slow py-10 w-fit">
            {[...testimonials, ...testimonials].map((tm, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, borderColor: "rgba(180, 84, 255, 0.4)" }}
                className="w-[350px] shrink-0 rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#B454FF]/10 flex items-center justify-center text-[#B454FF] font-black border border-[#B454FF]/20">
                    {tm.avatar}
                  </div>
                  <div>
                    <div className="text-[#F5F5F5] font-black text-lg leading-none mb-1">{tm.name}</div>
                    <div className="text-[#F5F5F5]/40 text-xs font-bold uppercase tracking-widest">{tm.role}</div>
                  </div>
                </div>
                <p className="text-[#F5F5F5]/70 text-lg leading-relaxed font-medium italic">
                  "{tm.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </ClientOnly>

        {/* Fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10" />
      </div>

      <style jsx>{`
        .animate-marquee-slow {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;