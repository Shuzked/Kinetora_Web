import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { u as useI18n, L as Logo, M as MouseParallax, P as PremiumButton, s as showSuccess } from "./entry-server.T-vtzQxy.js";
import { I as Input } from "./input.C19rof9k.js";
import { Mail } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import { L as Label } from "./label.D93xiKXT.js";
import { C as Checkbox } from "./checkbox.ry8aju93.js";
import { Link } from "react-router-dom";
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
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "lenis";
import "react-dom";
import "@radix-ui/react-label";
import "@radix-ui/react-checkbox";
const Footer = () => {
  const { lang } = useI18n();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const strings = lang === "es" ? {
    badge: "-10% primer mes • Promos y noticias",
    title: "Suscríbete a nuestro\nnewsletter",
    sub: "No te pierdas ninguna noticia, promoción o descuentos de nuestros servicios. ¿A qué esperas?",
    placeholder: "Tu email",
    inputAria: "Introduce tu email para suscribirte",
    btn: "Suscribirse",
    btnAria: "Suscribirse al newsletter",
    consent: "Acepto recibir emails de Kinetora con descuentos, promociones y noticias. Podrás darte de baja en cualquier momento.",
    errEmail: "Introduce un email válido.",
    errConsent: "Debes aceptar el consentimiento para suscribirte.",
    toast: "¡Gracias por suscribirte! Te enviaremos descuentos y novedades de Kinetora.",
    inlineOk: "¡Listo! Revisa tu bandeja para confirmar la suscripción.",
    legal: [
      { label: "Aviso Legal", to: "/legal/aviso-legal" },
      { label: "Política de privacidad", to: "/legal/politica-privacidad" },
      { label: "Política de cookies", to: "/legal/politica-cookies" },
      { label: "Política de privacidad y redes sociales", to: "/legal/privacidad-redes-sociales" }
    ],
    rights: "Todos los derechos reservados.",
    btnLoading: "Suscribiendo..."
  } : {
    badge: "-10% first month • Promos & updates",
    title: "Subscribe to our\nnewsletter",
    sub: "Don't miss any updates, promotions or discounts. Ready to start?",
    placeholder: "Your email",
    inputAria: "Enter your email to subscribe",
    btn: "Subscribe",
    btnAria: "Subscribe to the newsletter",
    consent: "I agree to receive emails from Kinetora with discounts, promotions and updates. You can unsubscribe at any time.",
    errEmail: "Please enter a valid email.",
    errConsent: "You must accept consent to subscribe.",
    toast: "Thanks for subscribing! We'll send you discounts and Kinetora updates.",
    inlineOk: "All set! Check your inbox to confirm your subscription.",
    legal: [
      { label: "Legal Notice", to: "/legal/aviso-legal" },
      { label: "Privacy Policy", to: "/legal/politica-privacidad" },
      { label: "Cookie Policy", to: "/legal/politica-cookies" },
      { label: "Social Media & Privacy Policy", to: "/legal/privacidad-redes-sociales" }
    ],
    rights: "All rights reserved.",
    btnLoading: "Subscribing..."
  };
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErr(null);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) {
      setErr(strings.errEmail);
      return;
    }
    if (!consent) {
      setErr(strings.errConsent);
      return;
    }
    const actionUrl = "https://assets.mailerlite.com/jsonp/2199496/forms/182212041303394004/subscribe";
    const params = new URLSearchParams();
    params.append("fields[email]", email.trim());
    params.append("ml-submit", "1");
    params.append("anticsrf", "true");
    setLoading(true);
    await fetch(actionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString(),
      mode: "no-cors"
    }).then(() => {
      setSubscribed(true);
      showSuccess(strings.toast);
      setEmail("");
      setConsent(false);
    }).finally(() => {
      setLoading(false);
    });
  };
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: "bg-[#0D0D0D]",
      role: "contentinfo",
      "aria-label": lang === "es" ? "Pie de página" : "Footer",
      children: /* @__PURE__ */ jsx("div", { className: "kin-container pt-16 pb-12 md:pt-24 md:pb-16", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, ease: "easeOut" },
            className: "flex flex-col items-center text-center lg:items-start lg:text-left",
            children: [
              /* @__PURE__ */ jsx(Logo, { className: "h-6 mb-4" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#F5F5F5]/80 text-sm mb-3", children: [
                "© ",
                /* @__PURE__ */ jsx("span", { suppressHydrationWarning: true, children: (/* @__PURE__ */ new Date()).getFullYear() }),
                " Kinetora Studio. ",
                strings.rights
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.tiktok.com/@kinetora_studio",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "TikTok",
                    className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]",
                    children: /* @__PURE__ */ jsx(SiTiktok, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.facebook.com/profile.php?id=61585355507008",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Facebook",
                    className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]",
                    children: /* @__PURE__ */ jsx(FaFacebookF, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://x.com/Kinetora_Studio",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "X",
                    className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]",
                    children: /* @__PURE__ */ jsx(FaTwitter, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.youtube.com/@Kinetora_Studio",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "YouTube",
                    className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]",
                    children: /* @__PURE__ */ jsx(FaYoutube, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.instagram.com/kinetora_studio/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Instagram",
                    className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]",
                    children: /* @__PURE__ */ jsx(FaInstagram, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.linkedin.com/company/kinetora",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "LinkedIn",
                    className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]",
                    children: /* @__PURE__ */ jsx(FaLinkedinIn, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center lg:items-start gap-2 text-sm font-semibold text-[#F5F5F5]/80 text-center lg:text-left", children: strings.legal.map((item) => /* @__PURE__ */ jsx(
                Link,
                {
                  to: item.to,
                  className: "hover:text-[#B454FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded",
                  children: item.label
                },
                item.to
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(MouseParallax, { intensity: 8, rotate: 3, className: "will-change-transform", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "flex flex-col items-center lg:items-end text-center lg:text-right",
            initial: { opacity: 0, y: 8 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, ease: "easeOut", delay: 0.05 },
            children: [
              /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B454FF]/10 border border-[#B454FF]/30 text-[#B454FF] text-[11px] font-extrabold tracking-widest uppercase mb-3", children: strings.badge }),
              /* @__PURE__ */ jsx("h3", { className: "tracking-tight text-[#F5F5F5] uppercase whitespace-pre-line mb-6", children: strings.title }),
              /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 mb-8 max-w-xl", children: strings.sub }),
              /* @__PURE__ */ jsx(
                "form",
                {
                  onSubmit: handleSubscribe,
                  noValidate: true,
                  className: "w-full max-w-lg space-y-2",
                  "aria-live": "polite",
                  children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `relative flex items-center rounded-full border backdrop-blur-3xl transition-all p-1.5
                ${err ? "border-red-500/50" : "border-white/15"}
                bg-white/[0.06] hover:bg-white/[0.08] focus-within:bg-white/[0.1] focus-within:ring-2 focus-within:ring-[#B454FF]`,
                      children: [
                        /* @__PURE__ */ jsx(Mail, { className: "absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F5F5]/60 pointer-events-none" }),
                        /* @__PURE__ */ jsx(
                          Input,
                          {
                            type: "email",
                            required: true,
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: strings.placeholder,
                            className: "min-w-0 flex-1 h-11 pl-12 pr-4 bg-transparent border-0 text-[#F5F5F5] placeholder:text-[#F5F5F5]/50 text-sm focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                            autoComplete: "email",
                            inputMode: "email",
                            "aria-label": strings.inputAria,
                            "aria-invalid": !!err
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          PremiumButton,
                          {
                            type: "submit",
                            variant: "primary",
                            size: "md",
                            className: "h-11 px-6 rounded-full shrink-0 text-center shadow-lg shadow-[#B454FF]/10 hover:shadow-[#B454FF]/20",
                            "aria-label": strings.btnAria,
                            isLoading: loading,
                            children: loading ? strings.btnLoading : strings.btn.toUpperCase()
                          }
                        )
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "w-full max-w-lg mt-4 sm:mt-5 flex items-start gap-2 justify-start lg:justify-end", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    id: "consent",
                    checked: consent,
                    onCheckedChange: (v) => setConsent(!!v),
                    className: "rounded-[6px] border-white/30 data-[state=checked]:bg-[#B454FF] data-[state=checked]:border-[#B454FF]",
                    "aria-describedby": "consent-desc"
                  }
                ),
                /* @__PURE__ */ jsx(Label, { htmlFor: "consent", className: "text-[11px] text-[#F5F5F5]/70", children: strings.consent })
              ] }),
              err && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-red-400", role: "alert", children: err }),
              subscribed && !err && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-green-400", role: "status", children: strings.inlineOk })
            ]
          }
        ) })
      ] }) })
    }
  );
};
export {
  Footer as default
};
