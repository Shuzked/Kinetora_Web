"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";

const HowItWorks = () => {
  const { lang } = useI18n();

  const copy =
    lang === "es"
      ? {
          title: "Tu nuevo flujo creativo.",
          titleAccent: "Kickoff y ejecución ágil.",
          sub:
            "Empezamos con una reunión breve para entender tu objetivo y presupuesto. Te proponemos una suscripción a medida. Nos coordinamos por el canal que prefieras (email o chat) y gestionamos tareas en tu herramienta o en ClickUp. Entregas en 48h con revisiones limitadas.",
          steps: [
            {
              number: "01",
              title: "Reunión inicial",
              description:
                "Agendamos una llamada corta para entender lo que necesitas y el presupuesto disponible.",
            },
            {
              number: "02",
              title: "Suscripción a medida",
              description:
                "Te proponemos un plan acorde a tu presupuesto, optimizado para impacto y velocidad.",
            },
            {
              number: "03",
              title: "Comunicación y tareas",
              description:
                "Nos adaptamos al canal que te resulte más cómodo (email o chat) y a tu herramienta de gestión (tu espacio o ClickUp): prioridades, estados y plazos claros.",
            },
            {
              number: "04",
              title: "Ejecución 48h",
              description:
                "Producción continua con entregas en 48h y revisiones limitadas hasta cerrar cada pieza.",
            },
          ],
        }
      : {
          title: "Your new creative workflow.",
          titleAccent: "Kickoff and fast execution.",
          sub:
            "We start with a short meeting to understand goals and budget. We propose a tailored subscription. We coordinate through your preferred channel (email or chat) and manage tasks in your tool or in ClickUp. 48h deliveries with limited revisions.",
          steps: [
            {
              number: "01",
              title: "Kickoff meeting",
              description:
                "A quick call to capture scope, goals and budget so we align from day one.",
            },
            {
              number: "02",
              title: "Tailored subscription",
              description:
                "We propose a plan based on your budget, optimized for impact and speed.",
            },
            {
              number: "03",
              title: "Communication & tasks",
              description:
                "We adapt to your preferred channel (email or chat) and your workflow tool (your workspace or ClickUp): clear priorities, statuses and due dates.",
            },
            {
              number: "04",
              title: "48h execution",
              description:
                "Continuous production with 48h turnarounds and limited revisions until done.",
            },
          ],
        };

  return (
    <section
      id="como-funciona"
      className="py-20 sm:py-24 lg:py-28 bg-[#0D0D0D] border-y border-white/10 scroll-mt-24 md:scroll-mt-28 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/8 blur-[90px]" />
      <div className="kin-container">
        <div className="text-center mb-14 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-0 tracking-tighter">
            {copy.title.toUpperCase().replace(/\.$/, "")} <br />
            <span className="text-[#B454FF]">{copy.titleAccent.toUpperCase()}</span>
          </h2>
          <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {copy.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-10 md:gap-12">
          {copy.steps.map((step, i) => (
            <MouseParallax key={i} intensity={6} rotate={3} className="will-change-transform">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="text-7xl font-black text-white/5 absolute -top-10 -left-2 sm:-left-4 group-hover:text-[#B454FF]/10 transition-colors">
                {step.number}
              </div>
              <div className="relative z-10 pl-2 sm:pl-0">
                <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#F5F5F5]/70 leading-relaxed font-medium">{step.description}</p>
              </div>
            </motion.div>
            </MouseParallax>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;