"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CEO @ TechFlow",
    content:
      "Kinetora cambió las reglas del juego para nosotros. Pasamos de esperar semanas por un diseño a tener entregas constantes cada 48h.",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Elena Gómez",
    role: "Product Manager @ HealthUp",
    content:
      "La calidad del UX/UI es excepcional. Entienden perfectamente el lenguaje de las startups y lo que los inversores buscan.",
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
  {
    name: "Marc Soler",
    role: "Founder @ Nexus AI",
    content:
      "Lo mejor es la ausencia de reuniones. Todo fluye por el tablero y las revisiones son rapidísimas. No vuelvo atrás.",
    avatar: "https://i.pravatar.cc/150?u=marc",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-4 tracking-tighter">
            LO QUE DICEN LOS FUNDADORES.
          </h2>
          <p className="text-[#F5F5F5]/70 font-bold uppercase tracking-widest text-xs">Startups que escalan con nosotros.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.04] border border-white/10 p-7 sm:p-8 md:p-10 rounded-[2.5rem] relative group hover:border-white/15 hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B454FF] text-[#B454FF]" />
                ))}
              </div>
              <p className="text-[#F5F5F5] mb-8 sm:mb-10 italic font-medium text-base sm:text-lg leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all"
                />
                <div>
                  <div className="text-[#F5F5F5] font-black uppercase text-xs tracking-widest">{t.name}</div>
                  <div className="text-[#F5F5F5]/60 text-[10px] font-bold uppercase tracking-widest mt-1">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;