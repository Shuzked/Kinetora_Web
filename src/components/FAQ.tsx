"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/i18n/I18nProvider";
import RevealText from "@/components/ui/RevealText";

const FAQ = () => {
  const { lang } = useI18n();

  const faqs =
    lang === "es"
      ? [
          {
            q: "¿Cómo funciona el sistema de pausas en la suscripción?",
            a: "Entendemos la naturaleza del ecosistema startup. Si no tienes solicitudes de diseño activas un mes, puedes pausar tu suscripción y reanudarla cuando la carga de trabajo lo requiera, sin penalizaciones ni costes ocultos.",
          },
          {
            q: "¿Existe algún tipo de permanencia o contrato a largo plazo?",
            a: "No. Operamos con total transparencia y confianza en la calidad de nuestro trabajo. Los planes son mensuales y puedes cancelarlos en cualquier momento.",
          },
          {
            q: "¿Qué implica exactamente la entrega en 48 horas?",
            a: "Una vez definimos una solicitud de diseño clara en nuestro panel, recibirás la primera iteración funcional o el componente terminado en un plazo máximo de dos días laborables.",
          },
          {
            q: "¿Cedéis los derechos de propiedad intelectual (IP)?",
            a: "Absolutamente. Al finalizar y abonar el proyecto, la propiedad intelectual de diseños y código frontend es 100% tuya.",
          },
          {
            q: "¿Qué incluye la \"Identidad de Marca\"?",
            a: "Va mucho más allá de un logo. Entregamos un manual de marca, paletas, tipografías, componentes UI y aplicaciones listas para marketing.",
          },
          {
            q: "¿Trabajáis exclusivamente en Web3 y Gaming?",
            a: "Aunque destacamos en Web3, nuestro enfoque de diseño orientado a la conversión aplica perfectamente a startups SaaS, Fintech y Healthtech.",
          },
          {
            q: "¿Asumís el desarrollo Backend del producto?",
            a: "Somos especialistas en la capa visual. Entregamos diseño UX/UI y Frontend (React/Tailwind). El Backend corre a cargo de tu equipo de ingeniería.",
          },
          {
            q: "¿Trabajáis con proyectos Pre-Seed?",
            a: "Nuestro ecosistema óptimo son startups en fase Seed o Series A/B que buscan escalar. No obstante, evaluamos proyectos Pre-Seed si la visión tecnológica y el alcance del rediseño están claramente definidos.",
          },
        ]
      : [
          {
            q: "How does the subscription pause system work?",
            a: "We understand the nature of the startup ecosystem. If you don't have active design requests for a month, you can pause your subscription and resume it whenever the workload demands it, without penalties or hidden costs.",
          },
          {
            q: "Is there any kind of commitment or long-term contract?",
            a: "No. We operate with total transparency and confidence in the quality of our work. Plans are monthly and you can cancel them at any time.",
          },
          {
            q: "What exactly does 48-hour delivery entail?",
            a: "Once we define a clear design request in our dashboard, you will receive the first functional iteration or the finished component within a maximum of two business days.",
          },
          {
            q: "Do you transfer Intellectual Property (IP) rights?",
            a: "Absolutely. Upon completion and payment of the project, the intellectual property of the designs and frontend code is 100% yours.",
          },
          {
            q: "What does \"Brand Identity\" include?",
            a: "It goes far beyond a logo. We deliver a brand manual, palettes, typography, UI components, and marketing-ready assets.",
          },
          {
            q: "Do you work exclusively in Web3 and Gaming?",
            a: "Although we excel in Web3, our conversion-oriented design focus applies perfectly to SaaS, Fintech, and Healthtech startups.",
          },
          {
            q: "Do you handle the Backend development of the product?",
            a: "We are specialists in the visual layer. We deliver UX/UI design and Frontend (React/Tailwind). The Backend is handled by your engineering team.",
          },
          {
            q: "Do you work with Pre-Seed projects?",
            a: "Our optimal ecosystem is Seed or Series A/B startups looking to scale. However, we evaluate Pre-Seed projects if the technological vision and redesign scope are clearly defined.",
          },
        ];

  return (
    <section className="kin-section bg-[#0D0D0D]">
      <div className="kin-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12 sm:mb-16 lg:mb-24">
            <RevealText text={lang === "es" ? "Preguntas frecuentes" : "Frequently asked questions"} />
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-white/10 bg-white/[0.04] px-5 sm:px-6 rounded-2xl hover:bg-white/[0.06] transition-colors"
              >
                <AccordionTrigger className="text-[#F5F5F5] hover:text-[#B454FF] data-[state=open]:text-[#B454FF] transition-colors text-left font-bold uppercase tracking-tight py-4 sm:py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded-xl px-1 sm:px-2 -mx-1 sm:-mx-2 text-sm sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="group/acc text-[#F5F5F5]/70 leading-relaxed font-medium pb-5 sm:pb-6 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="will-change-transform will-change-opacity group-data-[state=open]/acc:animate-faq-in group-data-[state=closed]/acc:animate-faq-out">
                    {faq.a}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;