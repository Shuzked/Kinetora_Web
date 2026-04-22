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
import RevealText from "@/components/ui/RevealText";

const Contact = () => {
  const { lang } = useI18n();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState<string>("");
  const [website, setWebsite] = useState("");
  const [challenge, setChallenge] = useState<string>("");
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
          title: "Impulsa tu startup",
          sub: "Escríbenos para una consultoría visual estratégica. Respuesta en <12h.",
          name: "Nombre",
          namePh: "Tu nombre",
          email: "Email Corporativo",
          emailPh: "tu@empresa.com",
          company: "Startup / Empresa",
          companyPh: "Nombre de tu startup",
          role: "Tu Rol",
          rolePh: "Selecciona tu cargo",
          website: "URL Website",
          websitePh: "https://tustartup.com",
          challenge: "Reto Principal",
          challengePh: "En qué podemos ayudarte",
          budget: "Inversión Estimada",
          budgetPh: "Elige un rango",
          message: "Detalles del Proyecto",
          messagePh: "Cuéntanos sobre tu ronda, objetivos o producto…",
          consent:
            "Acepto ser contactado para recibir una propuesta técnica y comercial.",
          send: "Enviar Consulta B2B",
          sending: "Enviando…",
          success: "Consulta enviada correctamente",
          errName: "Introduce tu nombre.",
          errEmail: "Introduce un email corporativo válido.",
          errMsg: "Danos un poco más de contexto (mín. 10 caracteres).",
          errConsent: "Debes aceptar el consentimiento.",
          errSubmit: "Error en el envío. Inténtalo de nuevo.",
          roles: [
            { v: "CEO", l: "CEO / Founder" },
            { v: "CTO", l: "CTO / Tech Lead" },
            { v: "Product", l: "Product Manager / Lead" },
            { v: "Marketing", l: "Marketing Director" },
            { v: "Design", l: "Design Lead" },
            { v: "Other", l: "Otros" },
          ],
          challenges: [
            { v: "Capital", l: "Levantar Capital (Pitch Deck)" },
            { v: "Scale", l: "Escalar Producto / UX" },
            { v: "Rebrand", l: "Rebranding Estratégico" },
            { v: "Growth", l: "Nueva Landing / Conversión" },
            { v: "Sytem", l: "Crear Sistema de Diseño" },
          ],
          budgets: [
            { v: "starter", l: "Starter Pack (~1.9k€)" },
            { v: "growth", l: "Growth Pack (~3.5k€)" },
            { v: "scale", l: "Scale / Custom" },
          ],
          ariaSend: "Enviar consulta de negocio",
          modalTitle: "Solicitud Recibida",
          modalDesc:
            "Analizaremos tu caso en las próximas horas. Mientras tanto, puedes agendar sesión directa.",
          modalCTA: "Agenda en Calendly",
          modalClose: "Cerrar",
        }
      : {
          badge: "Contact",
          title: "Power your startup",
          sub: "Write to us for a strategic visual consultation. Response in <12h.",
          name: "Name",
          namePh: "Your name",
          email: "Corporate Email",
          emailPh: "you@company.com",
          company: "Startup / Company",
          companyPh: "Your startup's name",
          role: "Your Role",
          rolePh: "Select your position",
          website: "Website URL",
          websitePh: "https://yourstartup.com",
          challenge: "Primary Challenge",
          challengePh: "How can we help you",
          budget: "Estimated Investment",
          budgetPh: "Choose a range",
          message: "Project Details",
          messagePh: "Tell us about your round, goals or product…",
          consent: "I agree to be contacted for a technical and commercial proposal.",
          send: "Send B2B Inquiry",
          sending: "Sending…",
          success: "Inquiry sent successfully",
          errName: "Please enter your name.",
          errEmail: "Please enter a valid corporate email.",
          errMsg: "Give us a bit more context (min. 10 characters).",
          errConsent: "You must accept the consent.",
          errSubmit: "Submission error. Please try again.",
          roles: [
            { v: "CEO", l: "CEO / Founder" },
            { v: "CTO", l: "CTO / Tech Lead" },
            { v: "Product", l: "Product Manager / Lead" },
            { v: "Marketing", l: "Marketing Director" },
            { v: "Design", l: "Design Lead" },
            { v: "Other", l: "Other" },
          ],
          challenges: [
            { v: "Capital", l: "Raise Capital (Pitch Deck)" },
            { v: "Scale", l: "Scale Product / UX" },
            { v: "Rebrand", l: "Strategic Rebranding" },
            { v: "Growth", l: "New Landing / Conversion" },
            { v: "Sytem", l: "Design System Creation" },
          ],
          budgets: [
            { v: "starter", l: "Starter Pack (~1.9k€)" },
            { v: "growth", l: "Growth Pack (~3.5k€)" },
            { v: "scale", l: "Scale / Custom" },
          ],
          ariaSend: "Send business inquiry",
          modalTitle: "Inquiry Received",
          modalDesc:
            "We will analyze your case in the next few hours. Meanwhile, you can book a direct session.",
          modalCTA: "Book via Calendly",
          modalClose: "Close",
        };

  // Web3Forms access key
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

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name,
      email,
      message,
      empresa: company,
      rol: role,
      website: website,
      reto: challenge,
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
    
    // Reset fields
    setName("");
    setEmail("");
    setCompany("");
    setRole("");
    setWebsite("");
    setChallenge("");
    setBudget("");
    setMessage("");
    setConsent(false);
  };

  return (
    <section
      className="kin-section bg-[#0D0D0D] relative overflow-hidden"
    >
      <div className="kin-container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
            {strings.badge}
          </div>
          <h2 className="">
            <RevealText text={strings.title.split(" ").slice(0, -2).join(" ").toUpperCase()} className="block" />
            <RevealText 
              text={strings.title.split(" ").slice(-2).join(" ").toUpperCase()} 
              className="block text-[#B454FF]" 
              delay={0.2}
            />
          </h2>
          <p className="mt-6 text-[#F5F5F5]/70 leading-relaxed max-w-xl mx-auto">
            {strings.sub}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="kin-card premium-glass">
            <form onSubmit={onSubmit} noValidate aria-live="polite" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre & Email */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{strings.name}</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={strings.namePh}
                      className={`mt-2 bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} text-[#F5F5F5] h-12 rounded-xl`}
                    />
                    {errors.name && <p className="mt-1 text-[11px] text-red-400/90">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{strings.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={strings.emailPh}
                      className={`mt-2 bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} text-[#F5F5F5] h-12 rounded-xl`}
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-red-400/90">{errors.email}</p>}
                  </div>
                </div>

                {/* Empresa & Rol */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{strings.company}</Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={strings.companyPh}
                      className="mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{strings.role}</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl">
                        <SelectValue placeholder={strings.rolePh} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] text-[#F5F5F5] border-white/15">
                        {strings.roles.map((r) => (
                          <SelectItem key={r.v} value={r.v}>{r.l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Website & Challenge */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="website" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{strings.website}</Label>
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder={strings.websitePh}
                      className="mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{strings.challenge}</Label>
                    <Select value={challenge} onValueChange={setChallenge}>
                      <SelectTrigger className="mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl">
                        <SelectValue placeholder={strings.challengePh} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] text-[#F5F5F5] border-white/15">
                        {strings.challenges.map((c) => (
                          <SelectItem key={c.v} value={c.v}>{c.l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Budget & Message */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{strings.budget}</Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl">
                        <SelectValue placeholder={strings.budgetPh} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] text-[#F5F5F5] border-white/15">
                        {strings.budgets.map((b) => (
                          <SelectItem key={b.v} value={b.v}>{b.l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{strings.message}</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={strings.messagePh}
                      className={`mt-2 min-h-[48px] h-12 bg-white/[0.03] border ${errors.message ? 'border-red-500/50' : 'border-white/10'} text-[#F5F5F5] rounded-xl resize-none`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(v) => setConsent(!!v)}
                    className="mt-0.5 rounded-[6px] border-white/20 data-[state=checked]:bg-[#B454FF] data-[state=checked]:border-[#B454FF]"
                  />
                  <Label htmlFor="consent" className="text-[12px] text-[#F5F5F5]/50 leading-relaxed cursor-pointer">
                    {strings.consent}
                  </Label>
                </div>
                {errors.consent && <p className="text-[11px] text-red-400/90">{errors.consent}</p>}
              </div>

              <div className="pt-2">
                <PremiumButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full h-14 text-sm font-black tracking-widest"
                  isLoading={loading}
                >
                  {loading ? strings.sending : strings.send.toUpperCase()}
                </PremiumButton>
                {submitMsg && (
                  <p className={`mt-4 text-center text-[12px] ${submitMsg === strings.success ? "text-green-400" : "text-red-400"}`} role="status">
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
            <DialogDescription className="text-[#F5F5F5]/70 leading-relaxed">
              {strings.modalDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="w-full sm:w-auto inline-flex h-11 items-center justify-center px-6 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F5F5]/70 text-sm font-medium hover:bg-white/[0.06] transition-colors"
            >
              {lang === "es" ? "Cerrar" : "Close"}
            </button>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex h-11 items-center justify-center px-6 rounded-xl bg-[#B454FF] text-white text-sm font-black tracking-tight hover:bg-[#A74CFF] transition-colors shadow-[0_0_20px_rgba(180,84,255,0.3)]"
            >
              {strings.modalCTA}
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;