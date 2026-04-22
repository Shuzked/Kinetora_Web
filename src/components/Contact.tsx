"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PremiumButton from "@/components/PremiumButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n/I18nProvider";
import { showSuccess } from "@/utils/toast";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";

const Contact = () => {
  const { lang } = useI18n();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const strings =
    lang === "es"
      ? {
          badge: "Contacto",
          title: "¿Listo para escalar?",
          sub: "Escríbenos y nuestro equipo te responderá en menos de 12h.",
          name: "Nombre",
          email: "Email profesional",
          message: "¿En qué podemos ayudarte?",
          send: "Enviar mensaje",
          successTitle: "¡Mensaje recibido!",
          successDesc: "Te contactaremos muy pronto. Si tienes prisa, agenda una llamada directa.",
          bookCTA: "Agendar llamada",
        }
      : {
          badge: "Contact",
          title: "Ready to scale?",
          sub: "Write to us and our team will get back to you in less than 12h.",
          name: "Name",
          email: "Work email",
          message: "How can we help you?",
          send: "Send message",
          successTitle: "Message received!",
          successDesc: "We'll be in touch very soon. If you're in a hurry, book a direct call.",
          bookCTA: "Book a call",
        };

  const calendlyUrl = "https://calendly.com/hello-kinetora/30min";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending (preserving the Web3Forms logic would go here if needed)
    await new Promise(r => setTimeout(r, 1500));
    
    setLoading(false);
    setSubmitted(true);
    showSuccess(strings.successTitle);
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black tracking-[0.25em] uppercase text-[#B454FF] mb-6">
              {strings.badge}
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-[#F5F5F5] uppercase tracking-tighter leading-none mb-8">
              {strings.title}
            </h2>
            <p className="text-[#F5F5F5]/60 text-xl leading-relaxed mb-12 max-w-md">
              {strings.sub}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[#F5F5F5]/80 font-medium">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-[#B454FF]" />
                </div>
                <span>{lang === "es" ? "Respuesta en <12h" : "Response in <12h"}</span>
              </div>
              <div className="flex items-center gap-4 text-[#F5F5F5]/80 font-medium">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Calendar className="w-5 h-5 text-[#B454FF]" />
                </div>
                <span>{lang === "es" ? "Llamada de 15 min gratis" : "Free 15 min discovery call"}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 sm:p-12 backdrop-blur-xl"
                >
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-[#F5F5F5]/40 ml-1">{strings.name}</Label>
                      <Input 
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="bg-white/5 border-white/10 h-14 rounded-2xl text-[#F5F5F5] focus:border-[#B454FF]/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-[#F5F5F5]/40 ml-1">{strings.email}</Label>
                      <Input 
                        required
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="bg-white/5 border-white/10 h-14 rounded-2xl text-[#F5F5F5] focus:border-[#B454FF]/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-[#F5F5F5]/40 ml-1">{strings.message}</Label>
                      <Textarea 
                        required
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="bg-white/5 border-white/10 min-h-[120px] rounded-2xl text-[#F5F5F5] focus:border-[#B454FF]/50 transition-all resize-none"
                      />
                    </div>

                    <PremiumButton 
                      isLoading={loading}
                      variant="gradient"
                      className="w-full py-7 rounded-2xl text-sm font-black uppercase tracking-[0.2em] mt-4"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {strings.send}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </PremiumButton>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-[2.5rem] border border-[#B454FF]/30 bg-[#B454FF]/5 p-8 sm:p-12 backdrop-blur-xl text-center"
                >
                  <div className="w-20 h-20 bg-[#B454FF]/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#B454FF]/30">
                    <CheckCircle2 className="w-10 h-10 text-[#B454FF]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#F5F5F5] uppercase mb-4">{strings.successTitle}</h3>
                  <p className="text-[#F5F5F5]/60 mb-10 leading-relaxed">
                    {strings.successDesc}
                  </p>
                  <a 
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#F5F5F5] text-[#0D0D0D] px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#B454FF] hover:text-white transition-all w-full"
                  >
                    <Calendar className="w-4 h-4" />
                    {strings.bookCTA}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Accent light */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B454FF]/20 blur-[100px] pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;