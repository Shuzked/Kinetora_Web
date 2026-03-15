"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CEO @ TechFlow",
    content: "Kinetora cambió las reglas del juego para nosotros. Pasamos de esperar semanas por un diseño a tener entregas constantes cada 48h. Es como tener un equipo in-house pero sin la gestión.",
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    name: "Elena Gómez",
    role: "Product Manager @ HealthUp",
    content: "La calidad del UX/UI es excepcional. Entienden perfectamente el lenguaje de las startups y lo que los inversores buscan en un Pitch Deck.",
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    name: "Marc Soler",
    role: "Founder @ Nexus AI",
    content: "Lo mejor es la ausencia de reuniones. Todo fluye por el tablero y las revisiones son rapidísimas. No vuelvo a trabajar con agencias tradicionales.",
    avatar: "https://i.pravatar.cc/150?u=marc"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Lo que dicen los fundadores
          </h2>
          <p className="text-gray-400">Startups que escalan con diseño de alto nivel.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-8 italic">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/10" />
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-gray-500 text-sm">{t.role}</div>
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