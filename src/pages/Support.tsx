"use client";

import React, { useMemo, useState } from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { showSuccess } from "@/utils/toast";
import { Calendar, Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const Support = () => {
  const { lang } = useI18n();
  const [subject, setSubject] = useState("general");
  const [msg, setMsg] = useState("");

  const maxChars = 500;

  const copy =
    lang === "es"
      ? {
          title: "Centro de soporte",
          sub: "Estamos aquí para ayudarte en todo momento",
          email: "Email",
          emailValue: "support@kinetora.com",
          emailSla: "Respuesta en < 2h",
          chat: "Chat en vivo",
          chatSub: "Disponible 24/7",
          chatCta: "Iniciar chat →",
          chatToast: "Chat iniciado (demo).",
          call: "Llamada",
          callSub: "Agenda una sesión",
          callCta: "Agendar →",
          callToast: "Sesión agendada (demo).",
          formTitle: "Envíanos un mensaje",
          subject: "Asunto",
          subjectPh: "Selecciona asunto",
          subjectGeneral: "Consulta general",
          subjectBilling: "Facturación",
          subjectRequest: "Request / Entregables",
          message: "Mensaje",
          messagePh: "Describe tu consulta o problema con el máximo detalle posible...",
          chars: "caracteres",
          send: "Enviar mensaje",
          sentToast: "Mensaje enviado. Te responderemos en breve.",
          faqTitle: "Preguntas frecuentes",
          faqs: [
            {
              q: "¿Cómo funciona la colaboración asíncrona?",
              a: "Envías requests y nosotros trabajamos en paralelo. Recibes avances y puedes pedir revisiones sin reuniones constantes.",
            },
            {
              q: "¿Qué significa \"revisiones ilimitadas\"?",
              a: "Iteramos contigo hasta que el entregable esté perfecto dentro del alcance del request. Sin fricción ni límites artificiales.",
            },
            {
              q: "¿Cuánto tiempo toma cada entrega?",
              a: "La mayoría de entregas llegan en 48h. Proyectos más grandes se entregan por fases con checkpoints claros.",
            },
            {
              q: "¿Puedo cancelar mi suscripción en cualquier momento?",
              a: "Sí. Puedes cambiar, pausar o cancelar cuando quieras. Te ayudamos a hacerlo desde Facturación.",
            },
          ],
        }
      : {
          title: "Support center",
          sub: "We’re here to help—anytime",
          email: "Email",
          emailValue: "support@kinetora.com",
          emailSla: "Reply in < 2h",
          chat: "Live chat",
          chatSub: "Available 24/7",
          chatCta: "Start chat →",
          chatToast: "Chat started (demo).",
          call: "Call",
          callSub: "Schedule a session",
          callCta: "Schedule →",
          callToast: "Session scheduled (demo).",
          formTitle: "Send us a message",
          subject: "Subject",
          subjectPh: "Select subject",
          subjectGeneral: "General question",
          subjectBilling: "Billing",
          subjectRequest: "Request / Deliverables",
          message: "Message",
          messagePh: "Describe your question or issue with as much detail as possible...",
          chars: "characters",
          send: "Send message",
          sentToast: "Message sent. We’ll get back to you shortly.",
          faqTitle: "FAQs",
          faqs: [
            {
              q: "How does async collaboration work?",
              a: "You submit requests and we work in parallel. You get updates and can ask for revisions without constant meetings.",
            },
            {
              q: "What does \"unlimited revisions\" mean?",
              a: "We iterate with you until it’s perfect within the request scope—no friction, no artificial limits.",
            },
            {
              q: "How long does each delivery take?",
              a: "Most deliveries arrive within 48h. Bigger projects are delivered in phases with clear checkpoints.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes. You can change, pause, or cancel whenever you want. We’ll help you do it from Billing.",
            },
          ],
        };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(copy.sentToast);
    setMsg("");
  };

  const faqItems = useMemo(() => copy.faqs, [copy.faqs]);

  return (
    <PortalLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">{copy.title}</h1>
          <p className="text-[#F5F5F5]/55 mt-1">{copy.sub}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-[#111111] border border-white/10 p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-[#B454FF]/15 border border-[#B454FF]/25 text-[#B454FF] flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div className="mt-4 text-[#F5F5F5] font-bold">{copy.email}</div>
            <div className="text-[#F5F5F5]/55 text-sm mt-1">{copy.emailValue}</div>
            <div className="text-[#F5F5F5]/40 text-sm mt-2">{copy.emailSla}</div>
          </div>

          <div className="rounded-2xl bg-[#111111] border border-white/10 p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-500/15 border border-blue-500/25 text-blue-300 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="mt-4 text-[#F5F5F5] font-bold">{copy.chat}</div>
            <div className="text-[#F5F5F5]/55 text-sm mt-1">{copy.chatSub}</div>
            <button
              type="button"
              className="mt-3 text-blue-300 font-semibold hover:text-blue-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
              onClick={() => showSuccess(copy.chatToast)}
            >
              {copy.chatCta}
            </button>
          </div>

          <div className="rounded-2xl bg-[#111111] border border-white/10 p-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-green-500/15 border border-green-500/25 text-green-300 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="mt-4 text-[#F5F5F5] font-bold">{copy.call}</div>
            <div className="text-[#F5F5F5]/55 text-sm mt-1">{copy.callSub}</div>
            <button
              type="button"
              className="mt-3 text-green-300 font-semibold hover:text-green-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
              onClick={() => showSuccess(copy.callToast)}
            >
              {copy.callCta}
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight">{copy.formTitle}</h2>

          <form onSubmit={submit} className="mt-6 space-y-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.subject}</div>
              <div className="mt-2">
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                    <SelectValue placeholder={copy.subjectPh} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                    <SelectItem value="general">{copy.subjectGeneral}</SelectItem>
                    <SelectItem value="billing">{copy.subjectBilling}</SelectItem>
                    <SelectItem value="request">{copy.subjectRequest}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.message}</div>
              <Textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value.slice(0, maxChars))}
                placeholder={copy.messagePh}
                className="mt-2 bg-[#0D0D0D] border-white/10 rounded-2xl min-h-[160px] text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                required
              />
              <div className="mt-2 text-sm text-[#F5F5F5]/45">
                {msg.length}/{maxChars} {copy.chars}
              </div>
            </div>

            <PremiumButton type="submit" variant="primary" size="lg" className="rounded-xl w-full">
              {copy.send}
            </PremiumButton>
          </form>
        </div>

        <div className="mt-10 rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight">{copy.faqTitle}</h2>

          <Accordion type="single" collapsible className="mt-4">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={String(idx)} className="border-white/10">
                <AccordionTrigger className="text-[#F5F5F5] hover:text-[#B454FF] transition-colors text-left font-bold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#F5F5F5]/70 leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Support;
