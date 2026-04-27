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
  const { t } = useI18n();

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

  const roles = [
    { v: "CEO", l: t("contact.role.ceo") },
    { v: "CTO", l: t("contact.role.cto") },
    { v: "Product", l: t("contact.role.product") },
    { v: "Marketing", l: t("contact.role.marketing") },
    { v: "Design", l: t("contact.role.design") },
    { v: "Other", l: t("contact.role.other") },
  ];

  const challenges = [
    { v: "Capital", l: t("contact.challenge.capital") },
    { v: "Scale", l: t("contact.challenge.scale") },
    { v: "Rebrand", l: t("contact.challenge.rebrand") },
    { v: "Growth", l: t("contact.challenge.growth") },
    { v: "System", l: t("contact.challenge.system") },
  ];

  const budgets = [
    { v: "starter", l: t("contact.budget.starter") },
    { v: "growth", l: t("contact.budget.growth") },
    { v: "scale", l: t("contact.budget.scale") },
  ];

  const calendlyUrl =
    "https://calendly.com/hello-kinetora/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0d0d0d&text_color=ffffff&primary_color=b454ff";

  // Web3Forms access key
  const WEB3FORMS_ACCESS_KEY = "7e89d9dd-e4b7-4187-8cd0-46c5bc511b2c";

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = t("contact.errName");
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) next.email = t("contact.errEmail");
    if (!message.trim() || message.trim().length < 10) next.message = t("contact.errMsg");
    if (!consent) next.consent = t("contact.errConsent");
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
      setSubmitMsg(t("contact.errSubmit"));
      return;
    }
 
    showSuccess(t("contact.success"));
    setSubmitMsg(t("contact.success"));
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
            {t("contact.badge")}
          </div>
          <h2 className="">
            <RevealText text={t("contact.titleA").toUpperCase()} className="block" />
            <RevealText 
              text={t("contact.titleB").toUpperCase()} 
              className="block text-[#B454FF]" 
              delay={0.2}
            />
          </h2>
          <p className="mt-6 text-[#F5F5F5]/70 leading-relaxed max-w-xl mx-auto">
            {t("contact.sub")}
          </p>
        </div>
 
        <div className="max-w-4xl mx-auto">
          <div className="kin-card premium-glass">
            <form onSubmit={onSubmit} noValidate aria-live="polite" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre & Email */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{t("contact.form.name")}</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("contact.form.namePh")}
                      className={`mt-2 bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} text-[#F5F5F5] h-12 rounded-xl`}
                    />
                    {errors.name && <p className="mt-1 text-[11px] text-red-400/90">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{t("contact.form.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("contact.form.emailPh")}
                      className={`mt-2 bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} text-[#F5F5F5] h-12 rounded-xl`}
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-red-400/90">{errors.email}</p>}
                  </div>
                </div>
 
                {/* Empresa & Rol */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{t("contact.form.company")}</Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t("contact.form.companyPh")}
                      className="mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{t("contact.form.role")}</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl">
                        <SelectValue placeholder={t("contact.form.rolePh")} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] text-[#F5F5F5] border-white/15">
                        {roles.map((r) => (
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
                    <Label htmlFor="website" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{t("contact.form.website")}</Label>
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder={t("contact.form.websitePh")}
                      className="mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{t("contact.form.challenge")}</Label>
                    <Select value={challenge} onValueChange={setChallenge}>
                      <SelectTrigger className="mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl">
                        <SelectValue placeholder={t("contact.form.challengePh")} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] text-[#F5F5F5] border-white/15">
                        {challenges.map((c) => (
                          <SelectItem key={c.v} value={c.v}>{c.l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
 
                {/* Budget & Message */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{t("contact.form.budget")}</Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl">
                        <SelectValue placeholder={t("contact.form.budgetPh")} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] text-[#F5F5F5] border-white/15">
                        {budgets.map((b) => (
                          <SelectItem key={b.v} value={b.v}>{b.l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60">{t("contact.form.message")}</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("contact.form.messagePh")}
                      className={`mt-2 min-h-[100px] sm:min-h-[80px] bg-white/[0.03] border ${errors.message ? 'border-red-500/50' : 'border-white/10'} text-[#F5F5F5] rounded-xl resize-none`}
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
                    {t("contact.form.consent")}
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
                  {loading ? t("contact.form.sending") : t("contact.form.send").toUpperCase()}
                </PremiumButton>
                {submitMsg && (
                  <p className={`mt-4 text-center text-[12px] ${submitMsg === t("contact.form.toast") ? "text-green-400" : "text-red-400"}`} role="status">
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
            <DialogTitle className="text-xl font-black">{t("contact.modal.title")}</DialogTitle>
            <DialogDescription className="text-[#F5F5F5]/70 leading-relaxed">
              {t("contact.modal.desc")}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="w-full sm:w-auto inline-flex h-11 items-center justify-center px-6 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F5F5]/70 text-sm font-medium hover:bg-white/[0.06] transition-colors"
            >
              {t("contact.modal.close")}
            </button>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex h-11 items-center justify-center px-6 rounded-xl bg-[#B454FF] text-white text-sm font-black tracking-tight hover:bg-[#A74CFF] transition-colors shadow-[0_0_20px_rgba(180,84,255,0.3)]"
            >
              {t("contact.modal.cta")}
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;