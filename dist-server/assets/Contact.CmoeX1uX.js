import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { d as cn, u as useI18n, e as RevealText, P as PremiumButton, s as showSuccess } from "./entry-server.T-vtzQxy.js";
import { I as Input } from "./input.C19rof9k.js";
import { T as Textarea } from "./textarea.Dri7j-Ac.js";
import { L as Label } from "./label.D93xiKXT.js";
import { C as Checkbox } from "./checkbox.ry8aju93.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check, ChevronUp } from "lucide-react";
import { D as Dialog, a as DialogContent, e as DialogHeader, b as DialogTitle, c as DialogDescription } from "./dialog.DPP8cqfS.js";
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
  const [role, setRole] = useState("");
  const [website, setWebsite] = useState("");
  const [challenge, setChallenge] = useState("");
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
    consent: "Acepto ser contactado para recibir una propuesta técnica y comercial.",
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
      { v: "Other", l: "Otros" }
    ],
    challenges: [
      { v: "Capital", l: "Levantar Capital (Pitch Deck)" },
      { v: "Scale", l: "Escalar Producto / UX" },
      { v: "Rebrand", l: "Rebranding Estratégico" },
      { v: "Growth", l: "Nueva Landing / Conversión" },
      { v: "Sytem", l: "Crear Sistema de Diseño" }
    ],
    budgets: [
      { v: "starter", l: "Starter Pack (~1.9k€)" },
      { v: "growth", l: "Growth Pack (~3.5k€)" },
      { v: "scale", l: "Scale / Custom" }
    ],
    modalTitle: "Solicitud Recibida",
    modalDesc: "Analizaremos tu caso en las próximas horas. Mientras tanto, puedes agendar sesión directa.",
    modalCTA: "Agenda en Calendly"
  } : {
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
      { v: "Other", l: "Other" }
    ],
    challenges: [
      { v: "Capital", l: "Raise Capital (Pitch Deck)" },
      { v: "Scale", l: "Scale Product / UX" },
      { v: "Rebrand", l: "Strategic Rebranding" },
      { v: "Growth", l: "New Landing / Conversion" },
      { v: "Sytem", l: "Design System Creation" }
    ],
    budgets: [
      { v: "starter", l: "Starter Pack (~1.9k€)" },
      { v: "growth", l: "Growth Pack (~3.5k€)" },
      { v: "scale", l: "Scale / Custom" }
    ],
    modalTitle: "Inquiry Received",
    modalDesc: "We will analyze your case in the next few hours. Meanwhile, you can book a direct session.",
    modalCTA: "Book via Calendly"
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
      empresa: company,
      rol: role,
      website,
      reto: challenge,
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
    setRole("");
    setWebsite("");
    setChallenge("");
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
              /* @__PURE__ */ jsx(RevealText, { text: strings.title.split(" ").slice(0, -2).join(" ").toUpperCase(), className: "block" }),
              /* @__PURE__ */ jsx(
                RevealText,
                {
                  text: strings.title.split(" ").slice(-2).join(" ").toUpperCase(),
                  className: "block text-[#B454FF]",
                  delay: 0.2
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 text-[#F5F5F5]/70 leading-relaxed max-w-xl mx-auto", children: strings.sub })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "kin-card premium-glass", children: /* @__PURE__ */ jsxs("form", { onSubmit, noValidate: true, "aria-live": "polite", className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60", children: strings.name }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "name",
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      placeholder: strings.namePh,
                      className: `mt-2 bg-white/[0.03] border ${errors.name ? "border-red-500/50" : "border-white/10"} text-[#F5F5F5] h-12 rounded-xl`
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-red-400/90", children: errors.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60", children: strings.email }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "email",
                      type: "email",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      placeholder: strings.emailPh,
                      className: `mt-2 bg-white/[0.03] border ${errors.email ? "border-red-500/50" : "border-white/10"} text-[#F5F5F5] h-12 rounded-xl`
                    }
                  ),
                  errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-red-400/90", children: errors.email })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "company", className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60", children: strings.company }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "company",
                      value: company,
                      onChange: (e) => setCompany(e.target.value),
                      placeholder: strings.companyPh,
                      className: "mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60", children: strings.role }),
                  /* @__PURE__ */ jsxs(Select, { value: role, onValueChange: setRole, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: strings.rolePh }) }),
                    /* @__PURE__ */ jsx(SelectContent, { className: "bg-[#111] text-[#F5F5F5] border-white/15", children: strings.roles.map((r) => /* @__PURE__ */ jsx(SelectItem, { value: r.v, children: r.l }, r.v)) })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "website", className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60", children: strings.website }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "website",
                      value: website,
                      onChange: (e) => setWebsite(e.target.value),
                      placeholder: strings.websitePh,
                      className: "mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60", children: strings.challenge }),
                  /* @__PURE__ */ jsxs(Select, { value: challenge, onValueChange: setChallenge, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: strings.challengePh }) }),
                    /* @__PURE__ */ jsx(SelectContent, { className: "bg-[#111] text-[#F5F5F5] border-white/15", children: strings.challenges.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.v, children: c.l }, c.v)) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60", children: strings.budget }),
                  /* @__PURE__ */ jsxs(Select, { value: budget, onValueChange: setBudget, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "mt-2 bg-white/[0.03] border border-white/10 text-[#F5F5F5] h-12 rounded-xl", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: strings.budgetPh }) }),
                    /* @__PURE__ */ jsx(SelectContent, { className: "bg-[#111] text-[#F5F5F5] border-white/15", children: strings.budgets.map((b) => /* @__PURE__ */ jsx(SelectItem, { value: b.v, children: b.l }, b.v)) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "message", className: "text-xs uppercase tracking-[0.2em] text-[#F5F5F5]/60", children: strings.message }),
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      id: "message",
                      value: message,
                      onChange: (e) => setMessage(e.target.value),
                      placeholder: strings.messagePh,
                      className: `mt-2 min-h-[48px] h-12 bg-white/[0.03] border ${errors.message ? "border-red-500/50" : "border-white/10"} text-[#F5F5F5] rounded-xl resize-none`
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    id: "consent",
                    checked: consent,
                    onCheckedChange: (v) => setConsent(!!v),
                    className: "mt-0.5 rounded-[6px] border-white/20 data-[state=checked]:bg-[#B454FF] data-[state=checked]:border-[#B454FF]"
                  }
                ),
                /* @__PURE__ */ jsx(Label, { htmlFor: "consent", className: "text-[12px] text-[#F5F5F5]/50 leading-relaxed cursor-pointer", children: strings.consent })
              ] }),
              errors.consent && /* @__PURE__ */ jsx("p", { className: "text-[11px] text-red-400/90", children: errors.consent })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsx(
                PremiumButton,
                {
                  type: "submit",
                  variant: "primary",
                  size: "md",
                  className: "w-full h-14 text-sm font-black tracking-widest",
                  isLoading: loading,
                  children: loading ? strings.sending : strings.send.toUpperCase()
                }
              ),
              submitMsg && /* @__PURE__ */ jsx("p", { className: `mt-4 text-center text-[12px] ${submitMsg === strings.success ? "text-green-400" : "text-red-400"}`, role: "status", children: submitMsg })
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsx(Dialog, { open: openModal, onOpenChange: setOpenModal, children: /* @__PURE__ */ jsxs(DialogContent, { className: "bg-[#111111] border-white/10 text-[#F5F5F5] rounded-2xl max-w-md", children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl font-black", children: strings.modalTitle }),
            /* @__PURE__ */ jsx(DialogDescription, { className: "text-[#F5F5F5]/70 leading-relaxed", children: strings.modalDesc })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row items-center justify-end gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setOpenModal(false),
                className: "w-full sm:w-auto inline-flex h-11 items-center justify-center px-6 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F5F5]/70 text-sm font-medium hover:bg-white/[0.06] transition-colors",
                children: lang === "es" ? "Cerrar" : "Close"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: calendlyUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-full sm:w-auto inline-flex h-11 items-center justify-center px-6 rounded-xl bg-[#B454FF] text-white text-sm font-black tracking-tight hover:bg-[#A74CFF] transition-colors shadow-[0_0_20px_rgba(180,84,255,0.3)]",
                children: strings.modalCTA
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
