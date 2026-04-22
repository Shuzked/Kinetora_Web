import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { d as cn, u as useI18n, f as RevealText, P as PremiumButton, s as showSuccess } from "./entry-server.3RePvTPK.js";
import { I as Input } from "./input.C3ADBpBF.js";
import { T as Textarea } from "./textarea.DWfqOSt-.js";
import { L as Label } from "./label.D4JuFzYd.js";
import { C as Checkbox } from "./checkbox.BI_jaMwH.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check, ChevronUp } from "lucide-react";
import { D as Dialog, a as DialogContent, e as DialogHeader, b as DialogTitle, c as DialogDescription } from "./dialog.DOBCOkxM.js";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "stream";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "react-router-dom";
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "framer-motion";
import "lenis";
import "react-dom";
import "@radix-ui/react-label";
import "@radix-ui/react-checkbox";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const Contact = () => {
  const { lang } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [submitMsg, setSubmitMsg] = useState(null);
  const calendlyUrl = "https://calendly.com/hello-kinetora/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0d0d0d&text_color=ffffff&primary_color=b454ff";
  const strings = lang === "es" ? {
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
    consent: "Acepto ser contactado para resolver dudas y recibir una propuesta personalizada.",
    send: "Enviar mensaje",
    sending: "Enviando…",
    success: "Mensaje enviado correctamente",
    errName: "Introduce tu nombre.",
    errEmail: "Introduce un email válido.",
    errMsg: "Cuéntanos brevemente tu necesidad (mín. 10 caracteres).",
    errConsent: "Debes aceptar el consentimiento.",
    errSubmit: "No se pudo enviar el mensaje. Inténtalo más tarde.",
    budgets: [
      { v: "<5k", l: "Menos de $5.000" },
      { v: "5-10k", l: "$5.000 - $10.000" },
      { v: "10-25k", l: "$10.000 - $25.000" },
      { v: "25-50k", l: "$25.000 - $50.000" },
      { v: "50k+", l: "Más de $50.000" }
    ],
    ariaSend: "Enviar consulta",
    modalTitle: "Mensaje recibido",
    modalDesc: "Tu mensaje ha llegado correctamente. Si quieres, puedes reservar una reunión con nosotros ahora."
  } : {
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
      { v: "<5k", l: "Less than $5,000" },
      { v: "5-10k", l: "$5,000 – $10,000" },
      { v: "10-25k", l: "$10,000 – $25,000" },
      { v: "25-50k", l: "$25,000 – $50,000" },
      { v: "50k+", l: "More than $50,000" }
    ],
    ariaSend: "Send inquiry",
    modalTitle: "Message received",
    modalDesc: "Your message has been delivered. If you'd like, you can book a meeting with us now."
  };
  const WEB3FORMS_ACCESS_KEY = "7e89d9dd-e4b7-4187-8cd0-46c5bc511b2c";
  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = strings.errName;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) next.email = strings.errEmail;
    if (!message.trim() || message.trim().length < 10) next.message = strings.errMsg;
    if (!consent) next.consent = strings.errConsent;
    return next;
  };
  const onSubmit = async (e) => {
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
      // Campos adicionales solicitados
      empresa: company,
      presupuesto: budget
    };
    const resp = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setLoading(false);
    const data = await resp.json().catch(() => null);
    if (!resp.ok || !data || data.success !== true) {
      setSubmitMsg(strings.errSubmit);
      return;
    }
    showSuccess(strings.success);
    setSubmitMsg(strings.success);
    setOpenModal(true);
    setName("");
    setEmail("");
    setCompany("");
    setBudget("");
    setMessage("");
    setConsent(false);
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "kin-section bg-[#0D0D0D] relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "kin-container relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center mb-16 lg:mb-24", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6", children: strings.badge }),
            /* @__PURE__ */ jsxs("h2", { className: "", children: [
              /* @__PURE__ */ jsx(RevealText, { text: strings.title.split(" ").slice(0, -1).join(" ").toUpperCase(), className: "block" }),
              /* @__PURE__ */ jsx(
                RevealText,
                {
                  text: strings.title.split(" ").slice(-1)[0].toUpperCase(),
                  className: "block text-[#B454FF]",
                  delay: 0.2
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 text-[#F5F5F5]/70 leading-relaxed underline-offset-4", children: strings.sub })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "kin-card premium-glass", children: /* @__PURE__ */ jsxs("form", { onSubmit, noValidate: true, "aria-live": "polite", className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80", children: strings.name }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "name",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    placeholder: strings.namePh,
                    className: `mt-2 bg-white/5 border ${errors.name ? "border-red-500/50" : "border-white/15"} text-[#F5F5F5] placeholder:text-[#F5F5F5]/50`,
                    "aria-invalid": !!errors.name
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-[12px] text-red-400", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80", children: strings.email }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    placeholder: strings.emailPh,
                    className: `mt-2 bg-white/5 border ${errors.email ? "border-red-500/50" : "border-white/15"} text-[#F5F5F5] placeholder:text-[#F5F5F5]/50`,
                    "aria-invalid": !!errors.email
                  }
                ),
                errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-[12px] text-red-400", children: errors.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "message", className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80", children: strings.message }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: "message",
                  value: message,
                  onChange: (e) => setMessage(e.target.value),
                  placeholder: strings.messagePh,
                  className: `mt-2 min-h-[120px] bg-white/5 border ${errors.message ? "border-red-500/50" : "border-white/15"} text-[#F5F5F5] placeholder:text-[#F5F5F5]/50`,
                  "aria-invalid": !!errors.message
                }
              ),
              errors.message && /* @__PURE__ */ jsx("p", { className: "mt-1 text-[12px] text-red-400", children: errors.message })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "company", className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80", children: strings.company }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "company",
                    name: "empresa",
                    value: company,
                    onChange: (e) => setCompany(e.target.value),
                    placeholder: strings.companyPh,
                    className: "mt-2 bg-white/5 border border-white/15 text-[#F5F5F5] placeholder:text-[#F5F5F5]/50"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/80", children: strings.budget }),
                /* @__PURE__ */ jsxs(Select, { value: budget, onValueChange: setBudget, children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "mt-2 bg-white/5 border border-white/15 text-[#F5F5F5]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: strings.budgetPh }) }),
                  /* @__PURE__ */ jsx(SelectContent, { className: "bg-[#111] text-[#F5F5F5] border-white/15", children: strings.budgets.map((b) => /* @__PURE__ */ jsx(SelectItem, { value: b.v, children: b.l }, b.v)) })
                ] }),
                /* @__PURE__ */ jsx("input", { type: "hidden", name: "presupuesto", value: budget, "aria-hidden": "true" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  id: "consent",
                  checked: consent,
                  onCheckedChange: (v) => setConsent(!!v),
                  className: "rounded-[6px] border-white/30 data-[state=checked]:bg-[#B454FF] data-[state=checked]:border-[#B454FF]",
                  "aria-invalid": !!errors.consent
                }
              ),
              /* @__PURE__ */ jsx(Label, { htmlFor: "consent", className: "text-[12px] text-[#F5F5F5]/70", children: strings.consent })
            ] }),
            errors.consent && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-red-400", children: errors.consent }),
            /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsx(
                PremiumButton,
                {
                  type: "submit",
                  variant: "primary",
                  size: "md",
                  className: "w-full",
                  isLoading: loading,
                  "aria-label": strings.ariaSend,
                  children: loading ? strings.sending : strings.send.toUpperCase()
                }
              ),
              submitMsg && /* @__PURE__ */ jsx("p", { className: `mt-2 text-[12px] ${submitMsg === strings.success ? "text-green-400" : "text-red-400"}`, role: "status", children: submitMsg })
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsx(Dialog, { open: openModal, onOpenChange: setOpenModal, children: /* @__PURE__ */ jsxs(DialogContent, { className: "bg-[#111111] border-white/10 text-[#F5F5F5] rounded-2xl max-w-md", children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl font-black", children: strings.modalTitle }),
            /* @__PURE__ */ jsx(DialogDescription, { className: "text-[#F5F5F5]/70", children: strings.modalDesc })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setOpenModal(false),
                className: "inline-flex h-10 items-center justify-center px-4 rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/85 hover:bg-white/[0.06] transition-colors",
                children: lang === "es" ? "Cerrar" : "Close"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: calendlyUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex h-10 items-center justify-center px-4 rounded-full bg-[#B454FF] text-white font-semibold hover:bg-[#A74CFF] transition-colors",
                children: lang === "es" ? "Reservar reunión" : "Book a meeting"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
};
export {
  Contact as default
};
