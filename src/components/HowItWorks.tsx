"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";
import RevealText from "@/components/ui/RevealText";
import ScrollParallax from "@/components/ui/ScrollParallax";

const HowItWorks = () => {
  const { lang } = useI18n();

  const copy =
    lang === "es"
      ? {
          title: "Cómo trabajamos juntos",
          titleAccent: "Plazos claros y visibilidad total",
          sub: (
            <>
              Un proceso rápido y transparente diseñado para fundadores. Puedes leer nuestro{" "}
              <Link to="/casos/chronosworlds" className="text-[#B454FF] hover:underline font-semibold">
                caso de ChronosWorlds
              </Link>{" "}
              o explorar todos nuestros{" "}
              <Link to="/casos" className="text-[#B454FF] hover:underline font-semibold">
                casos de estudio
              </Link>
              . Seguimos metodologías inspiradas en guías de referencia como el{" "}
              <a href="https://a16z.com" target="_blank" rel="noopener noreferrer" className="text-[#B454FF] hover:underline font-semibold">
                manual de a16z
              </a>
              .
            </>
          ),
          steps: [
            {
              number: "01",
              title: "Auditoría inicial",
              description:
                "Nos compartes tus objetivos y te entregamos una hoja de ruta visual para los primeros 30 días, priorizando cada entregable.",
            },
            {
              number: "02",
              title: "Integración del sistema",
              description:
                "Conectamos tu panel compartido en ClickUp o Trello para que tengas visibilidad total. Sabrás exactamente qué estamos diseñando y cuándo se entrega, sin tener que perseguirnos.",
            },
            {
              number: "03",
              title: "Ciclos de diseño de 48h",
              description:
                "Tú subes tus solicitudes de diseño al panel y nosotros entregamos piezas listas y funcionales cada 48 horas laborables para no frenar tu ritmo.",
            },
            {
              number: "04",
              title: "Sincronización mensual",
              description:
                "Analizas con nosotros los datos de conversión y el feedback de tus usuarios para ajustar las prioridades y optimizar los siguientes ciclos.",
            },
          ],
        }
      : {
          title: "How we work together",
          titleAccent: "Clear deadlines and full visibility",
          sub: (
            <>
              A fast, transparent process designed for founders. Read our{" "}
              <Link to="/casos/chronosworlds" className="text-[#B454FF] hover:underline font-semibold">
                ChronosWorlds case study
              </Link>{" "}
              or check our full{" "}
              <Link to="/casos" className="text-[#B454FF] hover:underline font-semibold">
                case studies
              </Link>
              . We follow playbooks inspired by reference guides like the{" "}
              <a href="https://a16z.com" target="_blank" rel="noopener noreferrer" className="text-[#B454FF] hover:underline font-semibold">
                a16z playbook
              </a>
              .
            </>
          ),
          steps: [
            {
              number: "01",
              title: "Strategic Audit",
              description:
                "You share your goals, and we deliver a clear 30-day visual roadmap mapping out your design priorities.",
            },
            {
              number: "02",
              title: "System Integration",
              description:
                "We set up your shared dashboard in ClickUp or Trello, giving you full visibility so you always know what is being designed and when it will arrive, without chasing updates.",
            },
            {
              number: "03",
              title: "48h Design Cycles",
              description:
                "You submit your design requests on the dashboard, and we deliver completed, functional updates every 48 hours to keep your launch momentum.",
            },
            {
              number: "04",
              title: "Monthly Growth Sync",
              description:
                "You review the conversion metrics and user feedback with us to adjust priorities and optimize your next design cycles.",
            },
          ],
        };

  return (
    <section
      id="como-funciona"
      className="kin-section bg-[#0D0D0D] border-y border-white/10 scroll-mt-24 md:scroll-mt-28 relative overflow-hidden"
    >
      <ScrollParallax speed={0.05} invert={true} className="absolute -bottom-24 -left-24">
        <div className="pointer-events-none h-72 w-72 rounded-full bg-[#B454FF]/8 blur-[90px]" />
      </ScrollParallax>
      <div className="kin-container">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="flex flex-col items-center max-w-[280px] sm:max-w-none mx-auto">
            <RevealText text={copy.title.toUpperCase().replace(/\.$/, "")} />
            <RevealText 
              text={copy.titleAccent.toUpperCase().replace(/\.$/, "")} 
              className="text-[#B454FF]" 
              delay={0.2} 
            />
          </h2>
          <p className="mt-6 text-[#F5F5F5]/70 max-w-2xl mx-auto leading-relaxed underline-offset-4">
            {copy.sub}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-12">
          {copy.steps.map((step, i) => (
            <MouseParallax key={i} intensity={6} rotate={3} className="will-change-transform">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group h-full"
            >
              <div className="text-7xl font-black text-white/5 absolute -top-10 -left-2 sm:-left-4 group-hover:text-[#B454FF]/10 transition-colors">
                {step.number}
              </div>
              <div className="relative z-10 pl-2 sm:pl-0">
                <h3 className="mb-4 uppercase text-lg md:text-xl lg:text-2xl leading-tight break-words">
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