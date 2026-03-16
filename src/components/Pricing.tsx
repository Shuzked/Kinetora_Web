"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PremiumButton from '@/components/PremiumButton';
import { useI18n } from "@/i18n/I18nProvider";

const Pricing = () => {
  const { lang } = useI18n();

  const copy =
    lang === "es"
      ? {
          title: "Invierte en crecimiento.",
          sub: "Sin costes ocultos. Sin sorpresas.",
          mostPopular: "Más popular",
          perMonth: "/mes",
          cta: "Empezar ahora",
          plans: [
            {
              key: "essential",
              name: "Diseño Esencial",
              price: "1.995€",
              description: "Ideal para startups en fase inicial.",
              features: ["Un diseño a la vez", "Revisiones ilimitadas", "Entregas en 48h", "Cancela cuando quieras"],
              perMonth: true,
            },
            {
              key: "fullstack",
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
              perMonth: true,
            },
            {
              key: "custom",
              name: "Custom",
              price: "A medida",
              description: "Para necesidades a medida y proyectos especiales.",
              features: ["Workshop de alcance", "Entrega por hitos", "Presupuesto bajo propuesta"],
              perMonth: false,
              cta: "Solicitar presupuesto",
            },
          ],
        }
      : {
          title: "Invest in growth.",
          sub: "No hidden costs. No surprises.",
          mostPopular: "Most popular",
          perMonth: "/mo",
          cta: "Get started",
          plans: [
            {
              key: "essential",
              name: "Essential Design",
              price: "€1,995",
              description: "Perfect for early-stage startups.",
              features: ["One request at a time", "Unlimited revisions", "48h delivery", "Cancel anytime"],
              perMonth: true,
            },
            {
              key: "fullstack",
              name: "Creative Full-Stack",
              price: "€3,495",
              description: "Your on-demand, end-to-end creative team.",
              features: [
                "Two requests at a time",
                "Web + Motion + Brand",
                "Unlimited revisions",
                "48h delivery",
                "Priority support",
              ],
              featured: true,
              perMonth: true,
            },
            {
              key: "custom",
              name: "Custom",
              price: "On request",
              description: "For tailored, one-off or special projects.",
              features: ["Scoping workshop", "Milestone-based delivery", "Budget on request"],
              perMonth: false,
              cta: "Request quote",
            },
          ],
        };

  const getNavbarOffset = () => {
    const nav = document.querySelector("nav") as HTMLElement | null;
    return (nav?.offsetHeight || 0) + 8;
  };

  const scrollToContact = () => {
    const el = document.getElementById("contacto");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = rect.top + window.scrollY - getNavbarOffset();
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="precios" className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] scroll-mt-24 md:scroll-mt-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-4 tracking-tighter">
            {copy.title.toUpperCase()}
          </h2>
          <p className="text-[#F5F5F5]/70 font-bold uppercase tracking-widest text-xs">{copy.sub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {copy.plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`relative p-7 sm:p-8 rounded-[2rem] border ${
                (plan as any).featured
                  ? 'border-[#B454FF]/45 bg-white/[0.05] shadow-[0_22px_90px_rgba(180,84,255,0.12)]'
                  : 'border-white/10 bg-white/[0.04] hover:border-white/15 hover:bg-white/[0.06]'
              } flex flex-col`}
            >
              {(plan as any).featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B454FF] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.28em]">
                  {copy.mostPopular.toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-[#F5F5F5] mb-4">
                  {plan.price}
                  {(plan as any).perMonth !== false && (
                    <span className="text-sm text-[#F5F5F5]/60 font-bold"> {copy.perMonth}</span>
                  )}
                </div>
                <p className="text-[#F5F5F5]/70 text-sm mb-8 font-medium leading-relaxed">{plan.description}</p>
                
                <ul className="space-y-4">
                  {plan.features.map((feature: string, j: number) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-[#F5F5F5]">
                      <Check className="w-4 h-4 text-[#B454FF]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <PremiumButton
                variant={(plan as any).featured ? "primary" : "glass"}
                size="md"
                className="w-full rounded-full mt-8"
                onClick={scrollToContact}
              >
                {(plan as any).cta ? (plan as any).cta : copy.cta.toUpperCase()}
              </PremiumButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;