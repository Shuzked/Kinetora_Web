"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PremiumButton from '@/components/PremiumButton';

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
    <section id="precios" className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] scroll-mt-24 md:scroll-mt-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-4 tracking-tighter">
            INVIERTE EN CRECIMIENTO.
          </h2>
          <p className="text-[#F5F5F5]/70 font-bold uppercase tracking-widest text-xs">Sin costes ocultos. Sin sorpresas.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`relative p-7 sm:p-8 rounded-[2rem] border ${
                plan.featured
                  ? 'border-[#B454FF]/45 bg-white/[0.05] shadow-[0_22px_90px_rgba(180,84,255,0.12)]'
                  : 'border-white/10 bg-white/[0.04] hover:border-white/15 hover:bg-white/[0.06]'
              } flex flex-col`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B454FF] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.28em]">
                  Más Popular
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-[#F5F5F5] mb-4">
                  {plan.price}
                  <span className="text-sm text-[#F5F5F5]/60 font-bold">/mes</span>
                </div>
                <p className="text-[#F5F5F5]/70 text-sm mb-8 font-medium leading-relaxed">{plan.description}</p>
                
                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-[#F5F5F5]">
                      <Check className="w-4 h-4 text-[#B454FF]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <PremiumButton
                variant={plan.featured ? "primary" : "glass"}
                size="md"
                className="w-full rounded-full mt-8"
              >
                EMPEZAR AHORA
              </PremiumButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;