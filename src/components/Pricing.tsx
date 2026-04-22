"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PremiumButton from '@/components/PremiumButton';
import { useI18n } from "@/i18n/I18nProvider";

const Pricing = () => {
  const { lang } = useI18n();

  const title = lang === "es" ? "Planes para escalar" : "Scaling Plans";
  const badge = lang === "es" ? "Precios" : "Pricing";

  const plans =
    lang === "es"
      ? [
          {
            name: "Essential",
            price: "2.400€",
            period: "/mes",
            desc: "Ideal para startups validando producto.",
            features: [
              "1 solicitud a la vez",
              "Entrega media en 48h",
              "Revisiones ilimitadas",
              "Branding & Web",
            ],
            button: "Empezar ahora",
            highlight: false,
          },
          {
            name: "Scale",
            price: "4.800€",
            period: "/mes",
            desc: "Para empresas con tracción real.",
            features: [
              "2 solicitudes a la vez",
              "Prioridad alta",
              "Design Systems",
              "Content Strategy",
              "Soporte 24/7",
            ],
            button: "Escalar hoy",
            highlight: true,
          },
          {
            name: "Custom",
            price: "Consultar",
            period: "",
            desc: "Proyectos de alto impacto y duración única.",
            features: [
              "Presupuesto cerrado",
              "Equipo dedicado",
              "Full Visual Engineering",
              "Post-lanzamiento",
            ],
            button: "Hablar con nosotros",
            highlight: false,
          },
        ]
      : [
          {
            name: "Essential",
            price: "2,400€",
            period: "/mo",
            desc: "Ideal for startups validating product.",
            features: [
              "1 request at a time",
              "Average 48h delivery",
              "Unlimited revisions",
              "Branding & Web",
            ],
            button: "Start now",
            highlight: false,
          },
          {
            name: "Scale",
            price: "4,800€",
            period: "/mo",
            desc: "For companies with real traction.",
            features: [
              "2 requests at a time",
              "High priority",
              "Design Systems",
              "Content Strategy",
              "24/7 Support",
            ],
            button: "Scale today",
            highlight: true,
          },
          {
            name: "Custom",
            price: "Consult",
            period: "",
            desc: "High-impact, one-off projects.",
            features: [
              "Fixed budget",
              "Dedicated team",
              "Full Visual Engineering",
              "Post-launch support",
            ],
            button: "Talk to us",
            highlight: false,
          },
        ];

  const handleContact = () => {
    const el = document.getElementById("contacto");
    if (el) {
      const nav = document.querySelector("nav") as HTMLElement | null;
      const offset = (nav?.offsetHeight || 0) + 16;
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="precios" className="py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black tracking-[0.25em] uppercase text-[#B454FF] mb-6">
            {badge}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#F5F5F5] uppercase tracking-tighter leading-none mb-6">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative rounded-[2.5rem] p-10 border ${
                plan.highlight 
                  ? "bg-white/[0.05] border-[#B454FF]/40 shadow-[0_0_40px_rgba(180,84,255,0.15)]" 
                  : "bg-white/[0.03] border-white/10"
              } backdrop-blur-xl flex flex-col justify-between hover:border-[#B454FF]/30 transition-all duration-500`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B454FF] text-[#0D0D0D] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {lang === "es" ? "MÁS POPULAR" : "MOST POPULAR"}
                </div>
              )}

              <div>
                <h3 className="text-[#F5F5F5] text-2xl font-black uppercase tracking-widest mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl md:text-5xl font-black text-[#F5F5F5] tracking-tighter">{plan.price}</span>
                  <span className="text-[#F5F5F5]/40 text-lg font-bold">{plan.period}</span>
                </div>
                <p className="text-[#F5F5F5]/60 mb-8 font-medium italic">
                  "{plan.desc}"
                </p>
                
                <ul className="space-y-4 mb-12">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[#F5F5F5]/80 font-medium text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B454FF]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <PremiumButton 
                variant={plan.highlight ? "gradient" : "glass"}
                className="w-full py-6 text-xs font-black uppercase tracking-[0.2em]"
                onClick={handleContact}
              >
                <span className="flex items-center justify-center gap-2">
                  {plan.button}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </PremiumButton>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center text-[#F5F5F5]/40 text-[10px] font-black uppercase tracking-[0.3em]">
          {lang === "es" 
            ? "Sin contratos a largo plazo. Cancela cuando quieras." 
            : "No long-term contracts. Cancel anytime."}
        </div>
      </div>
    </section>
  );
};

export default Pricing;