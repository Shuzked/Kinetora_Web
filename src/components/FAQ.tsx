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
            q: "¿Qué planes ofrecéis?",
            a: "Ofrecemos planes de suscripción personalizados según tus necesidades y presupuesto. Tras una llamada de kickoff, proponemos un plan a medida que se ajusta a tus prioridades — ya sea identidad de marca, UX/UI, desarrollo web, motion graphics o una combinación de servicios.",
          },
          {
            q: "¿Por qué no contratar a un diseñador a tiempo completo?",
            a: "Un diseñador a tiempo completo cuesta 3–5 veces más si consideras salario, beneficios, equipamiento y tiempo improductivo. Con Kinetora obtienes un equipo sénior multidisciplinar a una tarifa mensual predecible, sin demoras de contratación ni costes indirectos.",
          },
          {
            q: "¿Hay límite de solicitudes?",
            a: "Sin límite. Puedes hacer cola con tantas solicitudes como necesites. Trabajamos de una en una (o en paralelo según el acuerdo), siempre con entregas en 48h.",
          },
          {
            q: "¿Cuánto tardáis en entregar?",
            a: "La mayoría de entregables se completan en 48 horas desde que se inician. Los proyectos complejos como identidades de marca completas o webs se dividen en hitos, cada uno con un ciclo claro de 48h.",
          },
          {
            q: "¿Cómo nos coordinamos sin reuniones recurrentes?",
            a: "Trabajamos async por defecto, vía Telegram o Discord y gestionamos tareas en ClickUp o en tu herramienta preferida. Al final de los dias, realizaremos un informe de lo que hemos hecho durante el día, para que estés 100% informado. Programamos reuniones solo cuando es realmente necesario, para que tu calendario quede libre.",
          },
          {
            q: "¿Quién hace realmente el trabajo?",
            a: "Tu trabajo lo realiza un equipo sénior con expertise en branding, UX/UI, desarrollo web y motion.",
          },
          {
            q: "¿Qué pasa si no estoy satisfecho con el resultado?",
            a: "Las revisiones ilimitadas están incluidas hasta que estés satisfecho. No cerramos una tarea hasta que la apruebes.",
          },
          {
            q: "¿Hay permanencia o costes ocultos?",
            a: "No. Creemos que la única razón para que te quedes debe ser la calidad de nuestro trabajo, no un trozo de papel. Los planes se facturan mes a mes y puedes cancelar cuando quieras con 30 días de aviso.",
          },
          {
            q: "¿Cómo funciona el sistema de pausas?",
            a: "Si tienes un mes con menos volumen de trabajo, puedes pausar tu suscripción con un clic y guardar los días restantes para el futuro. Preferimos que congeles tu plan antes de que canceles.",
          },
          {
            q: "¿Cedéis los derechos de propiedad intelectual (IP)?",
            a: "Sí. Una vez abonada la factura mensual, todos los diseños y el código de interfaz son 100% de tu propiedad. No hay licencias ocultas ni restricciones de uso posteriores.",
          },
          {
            q: "¿Hay algo que no cubráis?",
            a: "Nos enfocamos en activos de alto rendimiento. No realizamos modelado 3D complejo de personajes, backend a medida o maquetación/impresión de libros o revistas de gran extensión. Si tienes dudas, pregúntanoslo y seremos directos contigo.",
          },
        ]
      : [
          {
            q: "What plans do you offer?",
            a: "We offer personalized subscription plans tailored to your needs and budget. After a kickoff call, we propose a custom plan that fits your priorities — whether it's brand identity, UX/UI, web development, motion graphics, or a combination of services.",
          },
          {
            q: "Why not hire a full-time designer?",
            a: "A full-time designer costs 3–5 times more when you consider salary, benefits, equipment, and downtime. With Kinetora, you get a senior multidisciplinary team for a predictable monthly fee, without hiring delays or indirect costs.",
          },
          {
            q: "Is there a limit to requests?",
            a: "No limit. You can queue as many requests as you need. We work through them one at a time (or in parallel depending on the agreement), always with 48h deliveries.",
          },
          {
            q: "How long does delivery take?",
            a: "Most deliverables are completed within 48 hours of starting. Complex projects like full brand identities or websites are divided into milestones, each with a clear 48-hour cycle.",
          },
          {
            q: "How do we coordinate without recurring meetings?",
            a: "We work async by default via Telegram or Discord and manage tasks in ClickUp or your preferred tool. At the end of each day, we provide a report of what we've done, so you're 100% informed. We schedule meetings only when strictly necessary, to keep your calendar free.",
          },
          {
            q: "Who actually does the work?",
            a: "Your work is performed by a senior team with expertise in branding, UX/UI, web development, and motion.",
          },
          {
            q: "What if I'm not satisfied with the result?",
            a: "Unlimited revisions are included until you're satisfied. We don't close a task until you approve it.",
          },
          {
            q: "Is there a minimum stay or hidden costs?",
            a: "No. We believe the only reason you should stay is the quality of our work, not a piece of paper. Plans are billed monthly and you can cancel anytime with 30 days notice.",
          },
          {
            q: "How does the subscription pause system work?",
            a: "If you have a month with less design work, you can pause your subscription with one click and save the remaining days for the future. We'd rather you pause your plan than cancel.",
          },
          {
            q: "Do you transfer Intellectual Property (IP) rights?",
            a: "Yes. Once payment is made, all designs and interface code are 100% yours. No hidden licenses or post-delivery restrictions.",
          },
          {
            q: "Is there anything you don't cover?",
            a: "We focus on high-performance creative assets. We don't do complex 3D character modeling, custom backend development, or long-form book/magazine layout and printing. If you have any questions, just ask and we'll be direct with you.",
          },
        ];

  return (
    <section className="kin-section bg-[#0D0D0D] border-t border-white/10">
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