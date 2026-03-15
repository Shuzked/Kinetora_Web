"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Plan Diseño Esencial",
    price: "£1,995",
    description: "Ideal para startups en fase inicial.",
    features: ["Un diseño a la vez", "Revisiones ilimitadas", "Entregas en 48h", "Cancela cuando quieras"]
  },
  {
    name: "Plan Full-Stack Creativo",
    price: "£3,495",
    description: "Tu equipo creativo completo bajo demanda.",
    features: ["Dos diseños a la vez", "Web + Motion + Branding", "Revisiones ilimitadas", "Entregas en 48h", "Soporte prioritario"],
    featured: true
  },
  {
    name: "Proyectos / Pitch Decks",
    price: "Desde £995",
    description: "Para necesidades puntuales de alto impacto.",
    features: ["Diseño de Pitch Deck", "Consultoría estratégica", "Entrega en 5-7 días", "Revisiones incluidas"]
  }
];

const Pricing = () => {
  return (
    <section id="precios" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Invierte en crecimiento continuo. <br/>
            <span className="text-gray-500">Sin costes ocultos.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-3xl border ${plan.featured ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_40px_rgba(37,99,235,0.1)]' : 'border-white/10 bg-white/5'}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase">
                  Más Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-white mb-4">{plan.price}<span className="text-sm text-gray-500 font-normal">/mes</span></div>
              <p className="text-gray-400 text-sm mb-8">{plan.description}</p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button className={`w-full rounded-full h-12 ${plan.featured ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/10 hover:bg-white/20'}`}>
                Empezar Ahora
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;