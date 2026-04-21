import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { u as useI18n, e as ScrollParallax, f as RevealText, M as MouseParallax } from "./entry-server.CjgQBIYg.js";
import "react";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "stream";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "lucide-react";
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
  const copy = lang === "es" ? {
    title: "Tu nuevo flujo creativo.",
    titleAccent: "Kickoff y ejecución ágil.",
    sub: "Empezamos con una reunión breve para entender tu objetivo y presupuesto. Te proponemos una suscripción a medida. Nos coordinamos por el canal que prefieras (email o chat) y gestionamos tareas en tu herramienta o en ClickUp. Entregas en 48h con revisiones limitadas.",
    steps: [
      {
        number: "01",
        title: "Reunión inicial",
        description: "Agendamos una llamada corta para entender lo que necesitas y el presupuesto disponible."
      },
      {
        number: "02",
        title: "Suscripción a medida",
        description: "Te proponemos un plan acorde a tu presupuesto, optimizado para impacto y velocidad."
      },
      {
        number: "03",
        title: "Comunicación y tareas",
        description: "Nos adaptamos al canal que te resulte más cómodo (email o chat) y a tu herramienta de gestión (tu espacio o ClickUp): prioridades, estados y plazos claros."
      },
      {
        number: "04",
        title: "Ejecución 48h",
        description: "Producción continua con entregas en 48h y revisiones limitadas hasta cerrar cada pieza."
      }
    ]
  } : {
    title: "Your new creative workflow.",
    titleAccent: "Kickoff and fast execution.",
    sub: "We start with a short meeting to understand goals and budget. We propose a tailored subscription. We coordinate through your preferred channel (email or chat) and manage tasks in your tool or in ClickUp. 48h deliveries with limited revisions.",
    steps: [
      {
        number: "01",
        title: "Kickoff meeting",
        description: "A quick call to capture scope, goals and budget so we align from day one."
      },
      {
        number: "02",
        title: "Tailored subscription",
        description: "We propose a plan based on your budget, optimized for impact and speed."
      },
      {
        number: "03",
        title: "Communication & tasks",
        description: "We adapt to your preferred channel (email or chat) and your workflow tool (your workspace or ClickUp): clear priorities, statuses and due dates."
      },
      {
        number: "04",
        title: "48h execution",
        description: "Continuous production with 48h turnarounds and limited revisions until done."
      }
    ]
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "kin-section bg-[#0D0D0D] relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(ScrollParallax, { speed: 0.05, invert: true, className: "absolute -bottom-24 -left-24", children: /* @__PURE__ */ jsx("div", { className: "pointer-events-none h-72 w-72 rounded-full bg-[#B454FF]/8 blur-[90px]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "kin-container", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 lg:mb-24", children: [
            /* @__PURE__ */ jsxs("h2", { className: "mx-auto", children: [
              /* @__PURE__ */ jsx(RevealText, { text: copy.title.toUpperCase().replace(/\.$/, ""), className: "block" }),
              /* @__PURE__ */ jsx(
                RevealText,
                {
                  text: copy.titleAccent.toUpperCase().replace(/\.$/, ""),
                  className: "block text-[#B454FF]",
                  delay: 0.2
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 text-[#F5F5F5]/70 max-w-2xl mx-auto leading-relaxed underline-offset-4", children: copy.sub })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 2xl:grid-cols-4 gap-x-8 gap-y-16", children: copy.steps.map((step, i) => /* @__PURE__ */ jsx(MouseParallax, { intensity: 6, rotate: 3, className: "will-change-transform", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              whileInView: { opacity: 1, y: 0 },
              initial: { opacity: 0, y: 30 },
              viewport: { once: true },
              transition: { delay: i * 0.2 },
              className: "relative group h-full",
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-7xl font-black text-white/5 absolute -top-10 -left-2 sm:-left-4 group-hover:text-[#B454FF]/10 transition-colors", children: step.number }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10 pl-2 sm:pl-0", children: [
                  /* @__PURE__ */ jsx("h3", { className: "mb-4 uppercase break-words", children: step.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 leading-relaxed font-medium", children: step.description })
                ] })
              ]
            }
          ) }, i)) })
        ] })
      ]
    }
  );
};
export {
  HowItWorks as default
};
