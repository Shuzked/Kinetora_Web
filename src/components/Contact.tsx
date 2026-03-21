"use client";

import React, { useState } from "react";
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
import { useI18n } from "@/i18n/I18nProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Contact = () => {
  const { lang } = useI18n();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openModal, setOpenModal] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);

  const calendlyUrl =
    "https://calendly.com/hello-kinetora/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0d0d0d&text_color=ffffff&primary_color=b454ff";

  const strings =
    lang === "es"
      ? {
          badge: "Contacto",
          title: "Cuéntanos tu proyecto",
          sub: "Escríbenos y, si lo prefieres, agenda una llamada directa con nuestro equipo.",
          name: "Nombre",
          namePh: "Tu nombre",
          email: "Email",
          emailPh: "tu@email.com",
          company: "Empresa (opcional)",
          companyPh: "Nombre de empresa",
          budget: "Presupuesto",
          budgetPh: "Elige un rango",
          message: "Mensaje",
          messagePh: "Cuéntanos brevemente qué necesitas…",
          consent:
            "Acepto ser contactado para resolver dudas y recibir una propuesta personalizada.",
          send: "Enviar mensaje",
          sending: "Enviando…",
          success: "Mensaje enviado correctamente",
          errName: "Introduce tu nombre.",
          errEmail: "Introduce un email válido.",
          errMsg: "Cuéntanos brevemente tu necesidad (mín. 10 caracteres).",
          errConsent: "Debes aceptar el consentimiento.",
          errSubmit: "No se pudo enviar el mensaje. Inténtalo más tarde.",
          budgets: [
            { v: "<5k", l: "Menos de 5.000€" },
            { v: "5-10k", l: "5.000€ - 10.000€" },
            { v: "10-25k", l: "10.000€ - 25.000€" },
            { v: "25-50k", l: "25.000€ - 50.000€" },
            { v: "50k+", l: "Más de 50.000€" },
          ],
          ariaSend: "Enviar consulta",
          modalTitle: "Mensaje recibido",
          modalDesc:
            "Tu mensaje ha llegado correctamente. Si quieres, puedes reservar una reunión con nosotros ahora.",
          modalCTA: "Reservar reunión",
          modalClose: "Cerrar",
        }
      : {
          badge: "Contact",
          title: "Tell us about your project",
          sub: "Write to us and, if you prefer, book a call directly with our team.",
          name: "Name",
          namePh: "Your name",
          email: "Email",
          emailPh: "you@company.com",
          company: "Company (optional)",
          companyPh: "Company name",
          budget: "Budget",
          budgetPh: "Choose a range",
          message: "Message",
          messagePh: "Tell us briefly what you need…",
          consent: "I agree to be contacted and receive a tailored proposal.",
          send: "Send message",
          sending: "Sending…",
          success: "Message sent successfully",
          errName: "Please enter your name.",
          errEmail: "Please enter a valid email.",
          errMsg: "Tell us briefly what you need (min. 10 characters).",
          errConsent: "You must accept the consent.",
          errSubmit: "Could not send your message. Please try again later.",
          budgets: [
            { v: "<5k", l: "Less than €5,000" },
            { v: "5-10k", l: "€5,000 – €10,000" },
            { v: "10-25k", l: "€10,000 – €25,000" },
            { v: "25-50k", l: "€25,000 – €50,000" },
            { v: "50k+", l: "More than €50,000" },
          ],
          ariaSend: "Send inquiry",
          modalTitle: "Message received",
          modalDesc:
            "Your message has been delivered. If you'd like, you can book a meeting with us now.",
          modalCTA: "Book a meeting",
          modalClose: "Close",
        };

  // Web3Forms access key (fija)
  const WEB3FORMS_ACCESS_KEY = "7e89d9dd-e4b7-4187-8cd0-46c5bc511b2c";

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = strings.errName;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) next.email = strings.errEmail;
    if (!message.trim() || message.trim().length < 10) next.message = strings.errMsg;
    if (!consent) next.consent = strings.errConsent;
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMsg(null);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setLoading(true);

    // Enviar estrictamente access_key, name, email, message
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name,
      email,
      message,
      // Campos adicionales solicitados
      empresa: company,
      presupuesto: budget,
    };

    const resp = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    const data = await resp.json().catch(() => null as any);

    if (!resp.ok || !data || data.success !== true) {
      setSubmitMsg(strings.errSubmit);
      return;
    }

    showSuccess(strings.success);
    setSubmitMsg(strings.success);
    setOpenModal(true);
    // Limpiar campos
    setName("");
    setEmail("");
    setCompany("");
    setBudget("");
    setMessage("");
    setConsent(false);
  };

  return (
    <section
      id="contacto"
      className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden"
    >
      <div className="kin-container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
            {strings.badge}
          </div>
          <h2 className="mt-5 text-3xl md:text-5xl font-black text-[#F5F5F5] tracking-tighter uppercase">
            {strings.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-[#B454FF]">{strings.title.split(" ").slice(-1)[0]}</span>
          </h2>
          <p className="mt-3 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed">
            {strings.sub}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="kin-card premium-glass">
            <form onSubmit={onSubmit} noValidate aria-live="polite" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80">{strings.name}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={strings.namePh}
                    className={`mt-2 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/15'} text-[#F5F5F5] placeholder:text-[#F5F5F5]/50`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-[12px] text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80">{strings.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={strings.emailPh}
                    className={`mt-2 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/15'} text-[#F5F5F5] placeholder:text-[#F5F5F5]/50`}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-[12px] text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80">{strings.message}</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={strings.messagePh}
                  className={`mt-2 min-h-[120px] bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/15'} text-[#F5F5F5] placeholder:text-[#F5F5F5]/50`}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="mt-1 text-[12px] text-red-400">{errors.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80">{strings.company}</Label>
                  <Input
                    id="company"
                    name="empresa"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={strings.companyPh}
                    className="mt-2 bg-white/5 border border-white/15 text-[#F5F5F5] placeholder:text-[#F5F5F5]/50"
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80">{strings.budget}</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="mt-2 bg-white/5 border border-white/15 text-[#F5F5F5]">
                      <SelectValue placeholder={strings.budgetPh} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111] text-[#F5F5F5] border-white/15">
                      {strings.budgets.map((b) => (
                        <SelectItem key={b.v} value={b.v}>
                          {b.l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* Campo oculto para asegurar name="presupuesto" en el DOM */}
                  <input type="hidden" name="presupuesto" value={budget} aria-hidden="true" />
                </div>
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
                  {strings.consent}
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
                  aria-label={strings.ariaSend}
                >
                  {loading ? strings.sending : strings.send.toUpperCase()}
                </PremiumButton>
                {submitMsg && (
                  <p className={`mt-2 text-[12px] ${submitMsg === strings.success ? "text-green-400" : "text-red-400"}`} role="status">
                    {submitMsg}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-[#111111] border-white/10 text-[#F5F5F5] rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">{strings.modalTitle}</DialogTitle>
            <DialogDescription className="text-[#F5F5F5]/70">
              {strings.modalDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="inline-flex h-10 items-center justify-center px-4 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F5F5]/85 hover:bg-white/[0.06] transition-all active:scale-95"
            >
              {lang === "es" ? "Cerrar" : "Close"}
            </button>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center px-4 rounded-xl bg-[#B454FF] text-white font-semibold hover:bg-[#A74CFF] transition-all hover:brightness-110 active:scale-95 shadow-[0_2px_8px_rgba(180,84,255,0.25)]"
            >
              {lang === "es" ? "Reservar reunión" : "Book a meeting"}
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;