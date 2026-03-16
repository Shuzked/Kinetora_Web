"use client";

import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PremiumButton from "@/components/PremiumButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { showSuccess } from "@/utils/toast";
import { useI18n } from "@/i18n/I18nProvider";
import { ShieldCheck, Zap, Lock, CreditCard } from "lucide-react";

type PlanKey = "essential" | "fullstack";

const plans: Record<PlanKey, { nameES: string; nameEN: string; price: number }> = {
  essential: { nameES: "Diseño Esencial", nameEN: "Essential Design", price: 1995 },
  fullstack: { nameES: "Full-Stack Creativo", nameEN: "Creative Full-Stack", price: 3495 },
};

const currency = "€";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { lang } = useI18n();

  const planKey = (params.get("plan") as PlanKey) || "essential";
  const selected = plans[planKey] || plans.essential;

  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [vat, setVat] = useState("");
  const [country, setCountry] = useState("ES");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");

  const copy =
    lang === "es"
      ? {
          title: "Finaliza tu suscripción",
          sub: "Proceso seguro y rápido. Estarás dentro en menos de 1 minuto.",
          plan: "Plan",
          perMonth: "/mes",
          contact: "Contacto",
          name: "Nombre",
          email: "Email",
          billing: "Datos de facturación",
          company: "Empresa (opcional)",
          vat: "CIF/NIF (opcional)",
          country: "País",
          payment: "Método de pago",
          card: "Tarjeta",
          number: "Número",
          exp: "Caducidad",
          cvc: "CVC",
          payNow: "Pagar ahora",
          secureA: "Cifrado SSL",
          secureB: "Acceso inmediato",
          secureC: "Datos seguros",
          summary: "Resumen",
          total: "Total hoy",
          renews: "Renovación mensual",
          success: "Pago realizado. ¡Bienvenido! Redirigiendo al portal...",
        }
      : {
          title: "Complete your subscription",
          sub: "Secure, fast checkout. You’ll be in within a minute.",
          plan: "Plan",
          perMonth: "/mo",
          contact: "Contact",
          name: "Name",
          email: "Email",
          billing: "Billing details",
          company: "Company (optional)",
          vat: "VAT/Tax ID (optional)",
          country: "Country",
          payment: "Payment method",
          card: "Card",
          number: "Number",
          exp: "Expiry",
          cvc: "CVC",
          payNow: "Pay now",
          secureA: "SSL encryption",
          secureB: "Instant access",
          secureC: "Secure data",
          summary: "Summary",
          total: "Total today",
          renews: "Renews monthly",
          success: "Payment successful. Welcome! Redirecting to portal...",
        };

  const planName = lang === "es" ? selected.nameES : selected.nameEN;
  const priceFormatted = useMemo(
    () =>
      lang === "es"
        ? `${selected.price.toLocaleString("es-ES")}${currency}`
        : `${currency}${selected.price.toLocaleString("en-GB")}`,
    [selected.price, lang]
  );

  const validate = () => {
    if (!name.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return false;
    if (!/^\d{12,19}$/.test(card.replace(/\s+/g, ""))) return false;
    if (!/^\d{2}\/\d{2}$/.test(exp.trim())) return false;
    if (!/^\d{3,4}$/.test(cvc.trim())) return false;
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      showSuccess(copy.success);
      navigate("/dashboard", { replace: true });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] pt-[68px] md:pt-[88px]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter">{copy.title}</h1>
          <p className="text-[#F5F5F5]/70 mt-1">{copy.sub}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
          {/* Left: form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Contact */}
            <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
              <div className="text-[#F5F5F5] font-bold">{copy.contact}</div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[11px] uppercase tracking-widest text-[#F5F5F5]/60">{copy.name}</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5]"
                    required
                  />
                </div>
                <div>
                  <Label className="text-[11px] uppercase tracking-widest text-[#F5F5F5]/60">{copy.email}</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5]"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Billing */}
            <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
              <div className="text-[#F5F5F5] font-bold">{copy.billing}</div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[11px] uppercase tracking-widest text-[#F5F5F5]/60">{copy.company}</Label>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    autoComplete="organization"
                    className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5]"
                  />
                </div>
                <div>
                  <Label className="text-[11px] uppercase tracking-widest text-[#F5F5F5]/60">{copy.vat}</Label>
                  <Input
                    value={vat}
                    onChange={(e) => setVat(e.target.value)}
                    className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-[11px] uppercase tracking-widest text-[#F5F5F5]/60">{copy.country}</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5]">
                      <SelectValue placeholder={copy.country} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                      <SelectItem value="ES">España / Spain</SelectItem>
                      <SelectItem value="US">Estados Unidos / United States</SelectItem>
                      <SelectItem value="UK">Reino Unido / United Kingdom</SelectItem>
                      <SelectItem value="MX">México / Mexico</SelectItem>
                      <SelectItem value="AR">Argentina</SelectItem>
                      <SelectItem value="CO">Colombia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
              <div className="text-[#F5F5F5] font-bold">{copy.payment}</div>
              <div className="mt-4">
                <Label className="text-[11px] uppercase tracking-widest text-[#F5F5F5]/60">{copy.card}</Label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-3">
                    <Input
                      value={card}
                      onChange={(e) => setCard(e.target.value.replace(/[^\d\s]/g, ""))}
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder={`${copy.number} •••• •••• •••• ••••`}
                      className="bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5]"
                      maxLength={23}
                      required
                    />
                  </div>
                  <Input
                    value={exp}
                    onChange={(e) => setExp(e.target.value.replace(/[^\d/]/g, "").slice(0, 5))}
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder={`${copy.exp} MM/YY`}
                    className="bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5]"
                    required
                  />
                  <Input
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder={copy.cvc}
                    className="bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5]"
                    required
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/55">
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#B454FF]" />
                    {copy.secureA}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#B454FF]" />
                    {copy.secureB}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#B454FF]" />
                    {copy.secureC}
                  </span>
                </div>
              </div>
            </section>

            <div className="flex items-center justify-end">
              <PremiumButton
                type="submit"
                variant="primary"
                size="md"
                isLoading={loading}
                className="rounded-xl"
                leftIcon={<CreditCard className="w-4 h-4" />}
              >
                {copy.payNow}
              </PremiumButton>
            </div>
          </form>

          {/* Right: order summary */}
          <aside className="rounded-2xl bg-[#111111] border border-white/10 p-6 lg:sticky lg:top-[92px]">
            <div className="text-[#F5F5F5] font-bold">{copy.summary}</div>
            <Separator className="my-4 bg-white/10" />
            <div className="flex items-center justify-between">
              <div className="text-[#F5F5F5]/75">
                {copy.plan}: <span className="text-[#F5F5F5] font-semibold">{planName}</span>
              </div>
              <div className="text-[#F5F5F5] font-bold">
                {priceFormatted}
                <span className="text-[#F5F5F5]/60 text-sm"> {copy.perMonth}</span>
              </div>
            </div>
            <Separator className="my-4 bg-white/10" />
            <div className="flex items-center justify-between">
              <div className="text-[#F5F5F5]/75">{copy.total}</div>
              <div className="text-2xl font-black text-[#F5F5F5]">{priceFormatted}</div>
            </div>
            <div className="mt-2 text-[#F5F5F5]/55 text-sm">{copy.renews}</div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;