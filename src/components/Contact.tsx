"use client";

import React, { useEffect, useState } from "react";
import PremiumButton from "@/components/PremiumButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

const Contact = () => {
  // Cargar script Calendly una sola vez
  useEffect(() => {
    const src = "https://assets.calendly.com/assets/external/widget.js";
    const already = Array.from(document.scripts).some((s) => s.src === src);
    if (!already) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Introduce tu nombre.";
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) next.email = "Introduce un email válido.";
    if (!message.trim() || message.trim().length < 10)
      next.message = "Cuéntanos brevemente tu necesidad (mín. 10 caracteres).";
    if (!consent) next.consent = "Debes aceptar el consentimiento.";
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccess("Gracias. Te contactaremos en breve.");
      setName("");
      setEmail("");
      setCompany("");
      setBudget("");
      setMessage("");
      setConsent(false);
    }, 900);
  };

  return (
    <section
      id="contacto"
      className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden"
    >
      {/* ambient glow y fades para evitar cortes */}
      <div className="pointer-events-none absolute -top-32 -left-28 h-96 w-96 rounded-full bg-[#B454FF]/10 blur-[110px] z-0" />
      <div className="pointer-events-none absolute -bottom-36 -right-28 h-[26rem] w-[26rem] rounded-full bg-[#B454FF]/6 blur-[120px] z-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,#0D0D0D,transparent)] z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,#0D0D0D,transparent)] z-[1]" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
            Contacto
          </div>
          <h2 className="mt-5 text-3xl md:text-5xl font-black text-[#F5F5F5] tracking-tighter uppercase">
            Cuéntanos tu <span className="text-[#B454FF]">proyecto</span>
          </h2>
          <p className="mt-3 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed">
            Escríbenos y, si lo prefieres, agenda una llamada directa con nuestro equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Formulario */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8">
            <form onSubmit={onSubmit} noValidate aria-live="polite" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80">Nombre</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className={`mt-2 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/15'} text-[#F5F5F5] placeholder:text-[#F5F5F5]/50`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-[12px] text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className={`mt-2 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/15'} text-[#F5F5F5] placeholder:text-[#F5F5F5]/50`}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-[12px] text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80">Empresa (opcional)</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Nombre de empresa"
                    className="mt-2 bg-white/5 border border-white/15 text-[#F5F5F5] placeholder:text-[#F5F5F5]/50"
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80">Presupuesto</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="mt-2 bg-white/5 border border-white/15 text-[#F5F5F5]">
                      <SelectValue placeholder="Elige un rango" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111] text-[#F5F5F5] border-white/15">
                      <SelectItem value="<5k">Menos de 5.000€</SelectItem>
                      <SelectItem value="5-10k">5.000€ - 10.000€</SelectItem>
                      <SelectItem value="10-25k">10.000€ - 25.000€</SelectItem>
                      <SelectItem value="25-50k">25.000€ - 50.000€</SelectItem>
                      <SelectItem value="50k+">Más de 50.000€</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80">Mensaje</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos brevemente qué necesitas…"
                  className={`mt-2 min-h-[120px] bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/15'} text-[#F5F5F5] placeholder:text-[#F5F5F5]/50`}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="mt-1 text-[12px] text-red-400">{errors.message}</p>}
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(v) => setConsent(!!v)}
                  className="rounded-[6px] border-white/30 data-[state=checked]:bg-[#B454FF] data-[state=checked]:border-[#B454FF]"
                  aria-invalid={!!errors.consent}
                />
                <Label htmlFor="consent" className="text-[12px] text-[#F5F5F5]/70">
                  Acepto ser contactado para resolver dudas y recibir una propuesta personalizada.
                </Label>
              </div>
              {errors.consent && <p className="text-[12px] text-red-400">{errors.consent}</p>}

              <div className="pt-2">
                <PremiumButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  isLoading={loading}
                  aria-label="Enviar consulta"
                >
                  ENVIAR MENSAJE
                </PremiumButton>
              </div>
            </form>
          </div>

          {/* Calendly */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-3 sm:p-4">
            <div
              className="calendly-inline-widget rounded-[1.5rem] overflow-hidden"
              data-url="https://calendly.com/hello-kinetora/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0d0d0d&text_color=ffffff&primary_color=b454ff"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;