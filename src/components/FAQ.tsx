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
    q: "¿Cómo funciona la colaboración asíncrona?",
    a: "Utilizamos un tablero centralizado donde puedes añadir todas tus solicitudes. Nosotros las procesamos una a una (o dos a la vez según tu plan) y te entregamos avances cada 48h. Sin reuniones innecesarias.",
  },
  {
    q: "¿Qué significa revisiones ilimitadas?",
    a: "Significa que no paramos hasta que estés 100% satisfecho. Si algo no encaja, lo ajustamos. Es así de simple.",
  },
  {
    q: "¿Tenéis experiencia con subvenciones públicas (ENISA/CDTI)?",
    a: "Sí, hemos ayudado a decenas de startups a preparar sus Pitch Decks y materiales visuales específicos para cumplir con los estándares de ENISA y CDTI, maximizando sus opciones de éxito.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Totalmente. No hay contratos de permanencia. Si un mes no tienes necesidades creativas, puedes pausar o cancelar tu suscripción sin preguntas.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] border-t border-[#2A2A2A]">
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
                className="border-[#2A2A2A] bg-[#111111] px-5 sm:px-6 rounded-2xl"
              >
                <AccordionTrigger className="text-[#F5F5F5] hover:text-[#B454FF] text-left font-bold uppercase tracking-tight py-5 sm:py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#2A2A2A] leading-relaxed font-medium pb-5 sm:pb-6">
                  {faq.a}
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