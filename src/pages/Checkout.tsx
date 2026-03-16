"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PremiumButton from "@/components/PremiumButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { showSuccess } from "@/utils/toast";
import { useI18n } from "@/i18n/I18nProvider";
import { ShieldCheck, Zap, Lock, CreditCard, Wallet } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type PlanKey = "essential" | "fullstack";

const plans: Record<
  PlanKey,
  { nameES: string; nameEN: string; price: number; featuresES: string[]; featuresEN: string[] }
> = {
  essential: {
    nameES: "Diseño Esencial",
    nameEN: "Essential Design",
    price: 1995,
    featuresES: ["Un diseño a la vez", "Revisiones ilimitadas", "Entregas en 48h", "Cancela cuando quieras"],
    featuresEN: ["One request at a time", "Unlimited revisions", "48h delivery", "Cancel anytime"],
  },
  fullstack: {
    nameES: "Full-Stack Creativo",
    nameEN: "Creative Full-Stack",
    price: 3495,
    featuresES: ["Dos diseños a la vez", "Web + Motion + Branding", "Revisiones ilimitadas", "Soporte prioritario"],
    featuresEN: ["Two requests at a time", "Web + Motion + Brand", "Unlimited revisions", "Priority support"],
  },
};

const currency = "€";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { lang } = useI18n();
  const { isAuthenticated } = useAuth();

  const planKey = (params.get("plan") as PlanKey) || "essential";
  const selected = plans[planKey] || plans.essential;

  useEffect(() => {
    if (!isAuthenticated) {
      const url = `/login?next=/checkout&plan=${encodeURIComponent(planKey)}`;
      navigate(url, { replace: true });
    }
  }, [isAuthenticated, navigate, planKey]);

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
  const [method, setMethod] = useState<"card" | "stripe" | "paypal" | "gpay">("card");

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
          methods: { card: "Tarjeta", stripe: "Stripe", paypal: "PayPal", gpay: "Google Pay" },
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
          processing: "Procesando pago…",
          success: "Pago realizado. ¡Bienvenido! Redirigiendo al portal...",
        }
      : {
          title: "Complete your subscription",
          sub: "Secure, fast checkout. You'll be in within a minute.",
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
          methods: { card: "Card", stripe: "Stripe", paypal: "PayPal", gpay: "Google Pay" },
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
          processing: "Processing payment…",
          success: "Payment successful. Welcome! Redirecting to portal...",
        };

  const planName = lang === "es" ? selected.nameES : selected.nameEN;
  const planFeatures = lang === "es" ? selected.featuresES : selected.featuresEN;

  const priceFormatted = useMemo(
    () =>
      lang === "es"
        ? `${selected.price.toLocaleString("es-ES")}${currency}`
        : `${currency}${selected.price.toLocaleString("en-GB")}`,
    [selected.price, lang]
  );

  const validateCard = () => {
    if (!/^\d{12,19}$/.test(card.replace(/\s+/g, ""))) return false;
    if (!/^\d{2}\/\d{2}$/.test(exp.trim())) return false;
    if (!/^\d{3,4}$/.test(cvc.trim())) return false;
    return true;
  };

  const validate = () => {
    if (!name.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return false;
    if (method === "card" && !validateCard()) return false;
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
                <RadioGroup
                  value={method}
                  onValueChange={(v) => setMethod(v as any)}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  <label className={"inline-flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer " + (method === "card" ? "border-[#B454FF]/40 bg-[#B454FF]/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]")}>
                    <RadioGroupItem value="card" id="m-card" className="sr-only" />
                    <CreditCard className="w-4 h-4 text-[#B454FF]" />
                    <span className="text-sm">{copy.methods.card}</span>
                  </label>
                  <label className={"inline-flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer " + (method === "stripe" ? "border-[#B454FF]/40 bg-[#B454FF]/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]")}>
                    <RadioGroupItem value="stripe" id="m-stripe" className="sr-only" />
                    <Wallet className="w-4 h-4 text-[#B454FF]" />
                    <span className="text-sm">Stripe</span>
                  </label>
                  <label className={"inline-flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer " + (method === "paypal" ? "border-[#B454FF]/40 bg-[#B454FF]/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]")}>
                    <RadioGroupItem value="paypal" id="m-paypal" className="sr-only" />
                    <span className="inline-block w-4 h-4 rounded bg-[#0070BA]" />
                    <span className="text-sm">PayPal</span>
                  </label>
                  <label className={"inline-flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer " + (method === "gpay" ? "border-[#B454FF]/40 bg-[#B454FF]/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]")}>
                    <RadioGroupItem value="gpay" id="m-gpay" className="sr-only" />
                    <span className="inline-block w-4 h-4 rounded bg-black" />
                    <span className="text-sm">{copy.methods.gpay}</span>
                  </label>
                </RadioGroup>
              </div>

              {/* Card form only when card method */}
              {method === "card" && (
                <div className="mt-4">
                  <Label className="text-[11px] uppercase tracking-widest text-[#F5F5F5]/60">{copy.methods.card}</Label>
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
                </div>
              )}

              {/* One-click simulated for other methods */}
              {method !== "card" && (
                <div className="mt-4">
                  <PremiumButton
                    type="button"
                    variant="white"
                    size="md"
                    className="w-full rounded-xl"
                    onClick={() => onSubmit(new Event("submit") as any)}
                  >
                    {copy.payNow}
                  </PremiumButton>
                </div>
              )}

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
                {loading ? (lang === "es" ? copy.processing : copy.processing) : copy.payNow}
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

            <div className="mt-4">
              <div className="text-[#F5F5F5]/60 text-sm mb-2">{lang === "es" ? "Incluye" : "Includes"}</div>
              <ul className="space-y-2">
                {planFeatures.map((f, i) => (
                  <li key={i} className="text-sm text-[#F5F5F5]">• {f}</li>
                ))}
              </ul>
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