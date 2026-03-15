"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CEO @ TechFlow",
    content: "Kinetora cambió las reglas del juego para nosotros. Pasamos de esperar semanas por un diseño a tener entregas constantes cada 48h.",
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    name: "Elena Gómez",
    role: "Product Manager @ HealthUp",
    content: "La calidad del UX/UI es excepcional. Entienden perfectamente el lenguaje de las startups y lo que los inversores buscan.",
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    name: "Marc Soler",
    role: "Founder @ Nexus AI",
    content: "Lo mejor es la ausencia de reuniones. Todo fluye por el tablero y las revisiones son rapidísimas. No vuelvo atrás.",
    avatar: "https://i.pravatar.cc/150?u=marc"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#0D0D0D] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-4 tracking-tighter">
            LO QUE DICEN LOS FUNDADORES.
          </h2>
          <p className="text-[#2A2A2A] font-bold uppercase tracking-widest text-xs">Startups que escalan con nosotros.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111111] border border-[#2A2A2A] p-10 rounded-[2.5rem] relative group hover:border-[#B454FF]/30 transition-colors"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B454FF] text-[#B454FF]" />
                ))}
              </div>
              <p className="text-[#F5F5F5] mb-10 italic font-medium text-lg leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-[#2A2A2A] grayscale group-hover:grayscale-0 transition-all" />
                <div>
                  <div className="text-[#F5F5F5] font-black uppercase text-xs tracking-widest">{t.name}</div>
                  <div className="text-[#2A2A2A] text-[10px] font-bold uppercase tracking-widest mt-1">{t.role}</div>
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