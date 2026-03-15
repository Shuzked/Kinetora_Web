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
    a: "Utilizamos un tablero centralizado donde puedes añadir todas tus solicitudes. Nosotros las procesamos una a una (o dos a la vez según tu plan) y te entregamos avances cada 48h. Sin reuniones innecesarias."
  },
  {
    q: "¿Qué significa revisiones ilimitadas?",
    a: "Significa que no paramos hasta que estés 100% satisfecho. Si algo no encaja, lo ajustamos. Es así de simple."
  },
  {
    q: "¿Tenéis experiencia con subvenciones públicas (ENISA/CDTI)?",
    a: "Sí, hemos ayudado a decenas de startups a preparar sus Pitch Decks y materiales visuales específicos para cumplir con los estándares de ENISA y CDTI, maximizando sus opciones de éxito."
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Totalmente. No hay contratos de permanencia. Si un mes no tienes necesidades creativas, puedes pausar o cancelar tu suscripción sin preguntas."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Preguntas Frecuentes</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
              <AccordionTrigger className="text-white hover:text-blue-400 text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;