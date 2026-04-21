import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { u as useI18n, e as ScrollParallax, f as RevealText, M as MouseParallax, P as PremiumButton } from "./entry-server.CjgQBIYg.js";
import "react";
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
import "lenis";
import "react-dom";
const Pricing = () => {
  const { lang } = useI18n();
  const copy = lang === "es" ? {
    title: "Invierte en crecimiento.",
    sub: "Sin costes ocultos. Sin sorpresas.",
    mostPopular: "Más popular",
    perMonth: "/mes",
    cta: "Empezar ahora",
    plans: [
      {
        key: "essential",
        name: "Diseño Esencial",
        price: "$1.995",
        description: "Ideal para startups en fase inicial.",
        features: ["Un diseño a la vez", "Revisiones ilimitadas", "Entregas en 48h", "Cancela cuando quieras"],
        perMonth: true
      },
      {
        key: "fullstack",
        name: "Full-Stack Creativo",
        price: "$3.495",
        description: "Tu equipo creativo completo bajo demanda.",
        features: [
          "Dos diseños a la vez",
          "Web + Motion + Branding",
          "Revisiones ilimitadas",
          "Entregas en 48h",
          "Soporte prioritario"
        ],
        featured: true,
        perMonth: true
      },
      {
        key: "custom",
        name: "Custom",
        price: "A medida",
        description: "Para necesidades a medida y proyectos especiales.",
        features: ["Workshop de alcance", "Entrega por hitos", "Presupuesto bajo propuesta"],
        perMonth: false,
        cta: "Solicitar presupuesto"
      }
    ]
  } : {
    title: "Invest in growth.",
    sub: "No hidden costs. No surprises.",
    mostPopular: "Most popular",
    perMonth: "/mo",
    cta: "Get started",
    plans: [
      {
        key: "essential",
        name: "Essential Design",
        price: "$1,995",
        description: "Perfect for early-stage startups.",
        features: ["One request at a time", "Unlimited revisions", "48h delivery", "Cancel anytime"],
        perMonth: true
      },
      {
        key: "fullstack",
        name: "Creative Full-Stack",
        price: "$3,495",
        description: "Your on-demand, end-to-end creative team.",
        features: [
          "Two requests at a time",
          "Web + Motion + Brand",
          "Unlimited revisions",
          "48h delivery",
          "Priority support"
        ],
        featured: true,
        perMonth: true
      },
      {
        key: "custom",
        name: "Custom",
        price: "On request",
        description: "For tailored, one-off or special projects.",
        features: ["Scoping workshop", "Milestone-based delivery", "Budget on request"],
        perMonth: false,
        cta: "Request quote"
      }
    ]
  };
  const getNavbarOffset = () => {
    const nav = document.querySelector("nav");
    return ((nav == null ? void 0 : nav.offsetHeight) || 0) + 8;
  };
  const scrollToContact = () => {
    const el = document.getElementById("contacto");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = rect.top + window.scrollY - getNavbarOffset();
    window.scrollTo({ top: y, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs("section", { id: "precios", className: "kin-section bg-[#0D0D0D] scroll-mt-24 md:scroll-mt-28 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(ScrollParallax, { speed: 0.08, invert: true, className: "absolute top-1/2 -right-32", children: /* @__PURE__ */ jsx("div", { className: "pointer-events-none h-80 w-80 rounded-full bg-[#B454FF]/5 blur-[120px]" }) }),
    /* @__PURE__ */ jsxs("div", { className: "kin-container", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 lg:mb-24", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-6", children: /* @__PURE__ */ jsx(RevealText, { text: copy.title.toUpperCase() }) }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 font-bold uppercase tracking-widest text-xs underline-offset-4", children: copy.sub })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 md:gap-8", children: copy.plans.map((plan, i) => /* @__PURE__ */ jsx(MouseParallax, { intensity: 9, rotate: 4, className: "will-change-transform", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          whileHover: { y: -5 },
          className: `relative p-7 sm:p-8 rounded-[2rem] border ${plan.featured ? "border-[#B454FF]/45 bg-white/[0.05] shadow-[0_22px_90px_rgba(180,84,255,0.12)]" : "border-white/10 bg-white/[0.04] hover:border-white/15 hover:bg-white/[0.06]"} flex flex-col`,
          children: [
            plan.featured && /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B454FF] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.28em]", children: copy.mostPopular.toUpperCase() }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-2", children: plan.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-4xl font-black text-[#F5F5F5] mb-4", children: [
                plan.price,
                plan.perMonth !== false && /* @__PURE__ */ jsxs("span", { className: "text-sm text-[#F5F5F5]/60 font-bold", children: [
                  " ",
                  copy.perMonth
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 text-sm mb-8 font-medium leading-relaxed", children: plan.description }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: plan.features.map((feature, j) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm text-[#F5F5F5]", children: [
                /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-[#B454FF]" }),
                feature
              ] }, j)) })
            ] }),
            /* @__PURE__ */ jsx(
              PremiumButton,
              {
                variant: plan.featured ? "primary" : "glass",
                size: "md",
                className: "w-full rounded-full mt-8",
                onClick: scrollToContact,
                children: plan.cta ? plan.cta : copy.cta.toUpperCase()
              }
            )
          ]
        }
      ) }, i)) })
    ] })
  ] });
};
export {
  Pricing as default
};
