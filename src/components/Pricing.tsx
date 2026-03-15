"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Diseño Esencial",
    price: "1.995€",
    description: "Ideal para startups en fase inicial.",
    features: ["Un diseño a la vez", "Revisiones ilimitadas", "Entregas en 48h", "Cancela cuando quieras"],
  },
  {
    name: "Full-Stack Creativo",
    price: "3.495€",
    description: "Tu equipo creativo completo bajo demanda.",
    features: [
      "Dos diseños a la vez",
      "Web + Motion + Branding",
      "Revisiones ilimitadas",
      "Entregas en 48h",
      "Soporte prioritario",
    ],
    featured: true,
  },
  {
    name: "Proyectos / Pitch Decks",
    price: "Desde 995€",
    description: "Para necesidades puntuales de alto impacto.",
    features: ["Diseño de Pitch Deck", "Consultoría estratégica", "Entrega en 5-7 días", "Revisiones incluidas"],
  },
];

const Pricing = () => {
  return (
    <section id="precios" className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-4 tracking-tighter">
            INVIERTE EN CRECIMIENTO.
          </h2>
          <p className="text-[#2A2A2A] font-bold uppercase tracking-widest text-xs">Sin costes ocultos. Sin sorpresas.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`relative p-7 sm:p-8 rounded-[2rem] border ${
                plan.featured
                  ? 'border-[#B454FF] bg-[#B454FF]/5 shadow-[0_0_40px_rgba(180,84,255,0.1)]'
                  : 'border-[#2A2A2A] bg-[#111111]'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B454FF] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Más Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">{plan.name}</h3>
              <div className="text-4xl font-black text-[#F5F5F5] mb-4">
                {plan.price}
                <span className="text-sm text-[#2A2A2A] font-normal">/mes</span>
              </div>
              <p className="text-[#2A2A2A] text-sm mb-8 font-medium">{plan.description}</p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-[#F5F5F5]">
                    <Check className="w-4 h-4 text-[#B454FF]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full h-12 font-bold text-xs tracking-widest ${
                  plan.featured
                    ? 'bg-[#B454FF] hover:bg-[#B454FF]/90 text-white'
                    : 'bg-[#2A2A2A] hover:bg-[#2A2A2A]/80 text-[#F5F5F5]'
                }`}
              >
                EMPEZAR AHORA
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;