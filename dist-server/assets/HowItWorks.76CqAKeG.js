import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { u as useI18n, C as ClientOnly } from "./entry-server.T-vtzQxy.js";
import { Search, Settings, Zap, BarChart3 } from "lucide-react";
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
const HowItWorks = () => {
  const { lang } = useI18n();
  const isEs = lang === "es";
  const copy = isEs ? {
    badge: "Metodología",
    title: "FLUJO DE ALTO RENDIMIENTO",
    sub: "De la auditoría inicial al escalado estratégico. Así es como transformamos tu impacto visual.",
    steps: [
      {
        number: "01",
        title: "Auditoría & Estrategia",
        desc: "Análisis profundo del mercado y assets actuales. Definición de la hoja de ruta visual para tu startup.",
        icon: Search
      },
      {
        number: "02",
        title: "Setup de Sistemas",
        desc: "Creación del ecosistema de diseño en Figma y sincronización técnica inicial. Bases sólidas para crecer.",
        icon: Settings
      },
      {
        number: "03",
        title: "Producción Iterativa",
        desc: "Entregas constantes cada 48-72h. Feedback en tiempo real vía Slack/Loom para máxima agilidad.",
        icon: Zap
      },
      {
        number: "04",
        title: "Escalado & Optimización",
        desc: "Refinamiento basado en datos de conversión y expansión constante de tu librería de assets.",
        icon: BarChart3
      }
    ]
  } : {
    badge: "Methodology",
    title: "HIGH-PERFORMANCE FLOW",
    sub: "From initial audit to strategic scaling. This is how we transform your visual impact.",
    steps: [
      {
        number: "01",
        title: "Audit & Strategy",
        desc: "Deep analysis of the market and current assets. Defining the visual roadmap for your startup.",
        icon: Search
      },
      {
        number: "02",
        title: "Systems Setup",
        desc: "Creation of the design ecosystem in Figma and initial technical sync. Solid foundations for growth.",
        icon: Settings
      },
      {
        number: "03",
        title: "Iterative Production",
        desc: "Constant deliveries every 48-72h. Real-time feedback via Slack/Loom for maximum agility.",
        icon: Zap
      },
      {
        number: "04",
        title: "Scaling & Optimization",
        desc: "Refinement based on conversion data and constant expansion of your asset library.",
        icon: BarChart3
      }
    ]
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  return /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("section", { id: "metodo", className: "py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-20 lg:mb-28", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6", children: copy.badge }),
      /* @__PURE__ */ jsx("h2", { className: "mb-6 tracking-tighter", children: copy.title.toUpperCase() }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-[#F5F5F5]/60 text-lg max-w-2xl mx-auto", children: copy.sub })
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" },
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6",
        children: copy.steps.map((step, i) => {
          const Icon = step.icon;
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: itemVariants,
              className: "group relative bg-[#131313] border border-white/5 rounded-3xl p-8 hover:border-[#B454FF]/30 transition-all duration-500 overflow-hidden",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-6 text-7xl font-black text-white/[0.02] group-hover:text-[#B454FF]/5 transition-colors duration-500", children: step.number }),
                /* @__PURE__ */ jsx("div", { className: "mb-8 relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:bg-[#B454FF]/10 group-hover:border-[#B454FF]/20 transition-all duration-500", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-[#F5F5F5] group-hover:text-[#B454FF] transition-colors duration-500" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#F5F5F5] mb-4 uppercase tracking-tight", children: step.title }),
                /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/50 text-sm leading-relaxed font-medium", children: step.desc }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#B454FF] to-transparent group-hover:w-full transition-all duration-700" })
              ]
            },
            i
          );
        })
      }
    )
  ] }) }) });
};
export {
  HowItWorks as default
};
