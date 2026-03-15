"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { showSuccess } from "@/utils/toast";
import { Calendar, Mail, MessageCircle } from "lucide-react";

const Support = () => {
  const [subject, setSubject] = useState("general");
  const [msg, setMsg] = useState("");

  const maxChars = 500;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Mensaje enviado. Te responderemos en breve.");
    setMsg("");
  };

  return (
    <PortalLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Centro de Soporte</h1>
          <p className="text-[#F5F5F5]/55 mt-1">Estamos aquí para ayudarte en todo momento</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-[#111111] border border-white/10 p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-[#B454FF]/15 border border-[#B454FF]/25 text-[#B454FF] flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div className="mt-4 text-[#F5F5F5] font-bold">Email</div>
            <div className="text-[#F5F5F5]/55 text-sm mt-1">support@kinetora.com</div>
            <div className="text-[#F5F5F5]/40 text-sm mt-2">Respuesta en &lt; 2h</div>
          </div>

          <div className="rounded-2xl bg-[#111111] border border-white/10 p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-500/15 border border-blue-500/25 text-blue-300 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="mt-4 text-[#F5F5F5] font-bold">Chat en Vivo</div>
            <div className="text-[#F5F5F5]/55 text-sm mt-1">Disponible 24/7</div>
            <button
              type="button"
              className="mt-3 text-blue-300 font-semibold hover:text-blue-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
              onClick={() => showSuccess("Chat iniciado (demo).")}
            >
              Iniciar Chat →
            </button>
          </div>

          <div className="rounded-2xl bg-[#111111] border border-white/10 p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-green-500/15 border border-green-500/25 text-green-300 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="mt-4 text-[#F5F5F5] font-bold">Llamada</div>
            <div className="text-[#F5F5F5]/55 text-sm mt-1">Agenda una sesión</div>
            <button
              type="button"
              className="mt-3 text-green-300 font-semibold hover:text-green-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
              onClick={() => showSuccess("Sesión agendada (demo).")}
            >
              Agendar →
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight">Envíanos un Mensaje</h2>

          <form onSubmit={submit} className="mt-6 space-y-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Asunto</div>
              <div className="mt-2">
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                    <SelectValue placeholder="Selecciona asunto" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                    <SelectItem value="general">Consulta General</SelectItem>
                    <SelectItem value="billing">Facturación</SelectItem>
                    <SelectItem value="request">Request / Entregables</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Mensaje</div>
              <Textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value.slice(0, maxChars))}
                placeholder="Describe tu consulta o problema con el máximo detalle posible..."
                className="mt-2 bg-[#0D0D0D] border-white/10 rounded-2xl min-h-[160px] text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                required
              />
              <div className="mt-2 text-sm text-[#F5F5F5]/45">{msg.length}/{maxChars} caracteres</div>
            </div>

            <PremiumButton type="submit" variant="primary" size="lg" className="rounded-xl w-full">
              Enviar Mensaje
            </PremiumButton>
          </form>
        </div>

        <div className="mt-10 rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight">Preguntas Frecuentes</h2>

          <Accordion type="single" collapsible className="mt-4">
            {[{
              q: "¿Cómo funciona la colaboración asíncrona?",
              a: "Envías requests y nosotros trabajamos en paralelo. Recibes avances y puedes pedir revisiones sin reuniones constantes.",
            }, {
              q: "¿Qué significa \"revisiones ilimitadas\"?",
              a: "Iteramos contigo hasta que el entregable esté perfecto dentro del alcance del request. Sin fricción ni límites artificiales.",
            }, {
              q: "¿Cuánto tiempo toma cada entrega?",
              a: "La mayoría de entregas llegan en 48h. Proyectos más grandes se entregan por fases con checkpoints claros.",
            }, {
              q: "¿Puedo cancelar mi suscripción en cualquier momento?",
              a: "Sí. Puedes cambiar, pausar o cancelar cuando quieras. Te ayudamos a hacerlo desde Facturación.",
            }].map((item, idx) => (
              <AccordionItem key={idx} value={String(idx)} className="border-white/10">
                <AccordionTrigger className="text-[#F5F5F5] hover:text-[#B454FF] transition-colors text-left font-bold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#F5F5F5]/70 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Support;
