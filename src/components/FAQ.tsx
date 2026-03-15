"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Por qué no contratar simplemente a un diseñador a tiempo completo?",
    a: "Un perfil senior en plantilla supera con facilidad los 70k€/año (salario, cargas, equipo y licencias) y es poco realista que una sola persona cubra Branding, Desarrollo Web y Motion a nivel experto. Con Kinetora accedes a un equipo multidisciplinar de ingeniería visual por una fracción del coste, con la libertad de pausar o cancelar cuando el volumen baje.",
  },
  {
    q: "¿Hay límite de peticiones?",
    a: "No. Puedes añadir todas las solicitudes que necesites a tu tablero. Trabajamos en cola y entregamos una a una (o dos en paralelo si estás en el plan Scale). Tú controlas prioridades; nosotros mantenemos el ritmo.",
  },
  {
    q: "¿Qué tan rápido entregáis?",
    a: "Velocidad real: tareas estándar entre 24 y 48 horas. En proyectos complejos (una web completa o un motion de 60s), dividimos el trabajo en hitos y te damos avances funcionales cada 48 horas para que todo progrese sin bloqueos.",
  },
  {
    q: "Si no hay reuniones, ¿cómo nos coordinamos?",
    a: "La comunicación es 100% asíncrona desde tu tablero privado. Describe lo que necesitas (texto, enlaces o un Loom breve) y nos ponemos a construir. En planes superiores añadimos un canal directo de Slack/Telegram para resolver dudas en minutos sin romper el flujo.",
  },
  {
    q: "¿Quién hace realmente el trabajo?",
    a: "Trabajo senior, punto. No derivamos a perfiles junior ni a outsourcing low-cost. Colaborarás con los fundadores e ingenieros visuales de Kinetora, garantizando criterio, consistencia y un acabado premium en cada entrega.",
  },
  {
    q: "¿Y si el resultado no me convence?",
    a: "Iteramos hasta que encaje. Todas las suscripciones incluyen revisiones ilimitadas: pulimos texto, layout, color y microinteracciones hasta llegar al nivel que tu marca necesita.",
  },
  {
    q: "¿Hay permanencia o costes ocultos?",
    a: "No. Trabajamos con una tarifa plana mensual, sin extras por horas, sin sorpresas y sin contratos de permanencia. Si no necesitas el servicio un mes, pausas o cancelas. Así de simple.",
  },
  {
    q: "¿Qué significa pausar la suscripción?",
    a: "Nuestro ciclo son 31 días de servicio efectivo. Si usas, por ejemplo, 15 días y decides pausar, el reloj se detiene y te quedan 16 días disponibles para más adelante. Pagas por trabajo real, no por promesas.",
  },
  {
    q: "¿Hay algo que no cubráis?",
    a: "Nos enfocamos en activos de alto rendimiento. No realizamos modelado 3D complejo de personajes, programación backend a medida o maquetación/impresión de libros o revistas de larga extensión.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-[#F5F5F5] text-center mb-12 sm:mb-16 tracking-tighter uppercase">
            Preguntas Frecuentes
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-white/10 bg-white/[0.04] px-5 sm:px-6 rounded-2xl hover:bg-white/[0.06] transition-colors"
              >
                <AccordionTrigger className="text-[#F5F5F5] hover:text-[#B454FF] data-[state=open]:text-[#B454FF] transition-colors text-left font-bold uppercase tracking-tight py-5 sm:py-6">
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