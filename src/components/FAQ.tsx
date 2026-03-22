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
            a: "Trabajamos con tres opciones: Essential (1 petición activa en cola), Full‑Stack (2 peticiones en paralelo) y Custom para proyectos a medida. Puedes pausar o cambiar de plan según el volumen.",
          },
          {
            q: "¿Por qué no contratar simplemente a un diseñador a tiempo completo?",
            a: "Un senior en plantilla supera 70k€/año y es difícil cubrir Branding, Web y Motion a nivel experto con una sola persona. Con Kinetora tienes un equipo multidisciplinar por una fracción del coste y la libertad de pausar cuando baje el volumen.",
          },
          {
            q: "¿Hay límite de peticiones?",
            a: "No hay límite de peticiones en tu tablero: trabajamos por cola (1 a la vez en Essential, 2 a la vez en Full‑Stack). Tú defines prioridades; nosotros mantenemos el ritmo.",
          },
          {
            q: "¿Qué tan rápido entregáis?",
            a: "Velocidad real: tareas estándar entre 24 y 48 horas. En piezas complejas (p. ej., una web completa o un vídeo de 60s) dividimos en hitos y entregamos progreso funcional cada 48 horas.",
          },
          {
            q: "¿Cómo nos coordinamos si evitáis reuniones?",
            a: "La coordinación es 100% asíncrona por email o chat. Gestionamos tareas en tu herramienta o en ClickUp: prioridades, estados y fechas claras. Podemos agendar reuniones puntuales cuando aporte valor.",
          },
          {
            q: "¿Quién hace realmente el trabajo?",
            a: "Trabajo senior, sin derivar a perfiles junior ni outsourcing low‑cost. Colaboras con los fundadores e ingenieros visuales de Kinetora para garantizar criterio, consistencia y un acabado premium.",
          },
          {
            q: "¿Y si el resultado no me convence?",
            a: "Incluimos revisiones limitadas dentro de cada entrega para pulir copy, layout, color y microinteracciones hasta cerrar el alcance acordado sin fricción.",
          },
          {
            q: "¿Hay permanencia o costes ocultos?",
            a: "No. Tarifa plana mensual, sin sorpresas ni contratos de permanencia. Si un mes no lo necesitas, pausas o cancelas sin penalización.",
          },
          {
            q: "¿Qué significa pausar la suscripción?",
            a: "El ciclo son 31 días de servicio efectivo. Si usas 15 días y pausas, el contador se detiene y te quedan 16 días para retomar más adelante. Pagas por trabajo real, no por promesas.",
          },
          {
            q: "¿Hay algo que no cubráis?",
            a: "Nos enfocamos en activos de alto rendimiento. No realizamos modelado 3D complejo de personajes, backend a medida o maquetación/impresión de libros o revistas de gran extensión.",
          },
        ]
      : [
          {
            q: "What plans do you offer?",
            a: "We have three options: Essential (1 active request in queue), Full‑Stack (2 requests in parallel), and Custom for tailored projects. You can pause or switch plans as volume changes.",
          },
          {
            q: "Why not hire a full‑time designer?",
            a: "A senior in‑house hire easily exceeds €70k/year and it's hard for one person to cover Brand, Web and Motion at an expert level. With Kinetora you get a multidisciplinary team for a fraction of the cost—and you can pause anytime.",
          },
          {
            q: "Is there a limit to requests?",
            a: "No. Add as many as you want to your board: we work through your queue (1 at a time on Essential, 2 in parallel on Full‑Stack). You set priorities; we keep the pace.",
          },
          {
            q: "How fast do you deliver?",
            a: "Real speed: standard tasks in 24–48 hours. For complex work (e.g., a full website or a 60s video), we split scope into milestones and ship functional progress every 48 hours.",
          },
          {
            q: "How do we coordinate with no recurring meetings?",
            a: "We work 100% async via email or chat. We manage tasks in your tool or in ClickUp with clear priorities, statuses and due dates—and we schedule focused calls when it adds value.",
          },
          {
            q: "Who actually does the work?",
            a: "Senior team only—no junior handoffs or low‑cost outsourcing. You work directly with Kinetora's founders and visual engineers to ensure taste, consistency and a premium finish.",
          },
          {
            q: "What if I'm not happy with the result?",
            a: "We include limited revisions within each delivery to refine copy, layout, color and micro‑interactions until the agreed scope is done without friction.",
          },
          {
            q: "Any lock‑in or hidden costs?",
            a: "No. Flat monthly pricing, no surprises and no long‑term contracts. If you don't need us for a month, you can pause or cancel with no penalty.",
          },
          {
            q: "What does pausing the subscription mean?",
            a: "Our cycle is 31 days of active service. If you use 15 days and pause, the clock stops and you keep 16 days for later. You pay for real work, not promises.",
          },
          {
            q: "Anything you don't cover?",
            a: "We focus on high‑performance creative assets. We don't do complex character 3D modeling, custom backend development, or long‑form book/magazine layout and printing.",
          },
        ];

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-[#F5F5F5] text-center mb-12 sm:mb-16 tracking-tighter uppercase">
            <RevealText text={lang === "es" ? "Preguntas frecuentes" : "Frequently asked questions"} />
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-white/10 bg-white/[0.04] px-5 sm:px-6 rounded-2xl hover:bg-white/[0.06] transition-colors"
              >
                <AccordionTrigger className="text-[#F5F5F5] hover:text-[#B454FF] data-[state=open]:text-[#B454FF] transition-colors text-left font-bold uppercase tracking-tight py-5 sm:py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded-xl px-2 -mx-2">
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