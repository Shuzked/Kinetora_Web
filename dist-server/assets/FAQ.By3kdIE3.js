import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { d as cn, u as useI18n, f as RevealText } from "./entry-server.3RePvTPK.js";
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
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const FAQ = () => {
  const { lang } = useI18n();
  const faqs = lang === "es" ? [
    {
      q: "¿Qué planes ofrecéis?",
      a: "Ofrecemos planes de suscripción personalizados según tus necesidades y presupuesto. Tras una llamada de kickoff, proponemos un plan a medida que se ajusta a tus prioridades — ya sea identidad de marca, UX/UI, desarrollo web, motion graphics o una combinación de servicios."
    },
    {
      q: "¿Por qué no contratar a un diseñador a tiempo completo?",
      a: "Un diseñador a tiempo completo cuesta 3–5 veces más si consideras salario, beneficios, equipamiento y tiempo improductivo. Con Kinetora obtienes un equipo sénior multidisciplinar a una tarifa mensual predecible, sin demoras de contratación ni costes indirectos."
    },
    {
      q: "¿Hay límite de solicitudes?",
      a: "Sin límite. Puedes hacer cola con tantas solicitudes como necesites. Trabajamos de una en una (o en paralelo según el acuerdo), siempre con entregas en 48h."
    },
    {
      q: "¿Cuánto tardáis en entregar?",
      a: "La mayoría de entregables se completan en 48 horas desde que se inician. Los proyectos complejos como identidades de marca completas o webs se dividen en hitos, cada uno con un ciclo claro de 48h."
    },
    {
      q: "¿Cómo nos coordinamos sin reuniones recurrentes?",
      a: "Trabajamos async por defecto, vía Telegram o Discord y gestionamos tareas en ClickUp o en tu herramienta preferida. Al final de los dias, realizaremos un informe de lo que hemos hecho durante el día, para que estés 100% informado. Programamos reuniones solo cuando es realmente necesario, para que tu calendario quede libre."
    },
    {
      q: "¿Quién hace realmente el trabajo?",
      a: "Tu trabajo lo realiza un equipo sénior con expertise en branding, UX/UI, desarrollo web y motion."
    },
    {
      q: "¿Qué pasa si no estoy satisfecho con el resultado?",
      a: "Las revisiones ilimitadas están incluidas hasta que estés satisfecho. No cerramos una tarea hasta que la apruebes."
    },
    {
      q: "¿Hay permanencia o costes ocultos?",
      a: "Sin permanencia. Puedes pausar o cancelar tu suscripción en cualquier momento con 30 días de aviso. Sin costes ocultos. El precio mensual cubre todo lo acordado en tu plan."
    },
    {
      q: "¿Qué significa pausar la suscripción?",
      a: "Si tienes un período más tranquilo, puedes pausar tu suscripción y reanudarla más tarde sin perder los días restantes. Es flexible por diseño."
    },
    {
      q: "¿Hay algo que no cubráis?",
      a: "Nos enfocamos en activos de alto rendimiento. No realizamos modelado 3D complejo de personajes, backend a medida o maquetación/impresión de libros o revistas de gran extensión. Si tienes dudas, pregúntanoslo y seremos directos contigo."
    }
  ] : [
    {
      q: "What plans do you offer?",
      a: "We offer personalized subscription plans tailored to your needs and budget. After a kickoff call, we propose a custom plan that fits your priorities — whether it's brand identity, UX/UI, web development, motion graphics, or a combination of services."
    },
    {
      q: "Why not hire a full-time designer?",
      a: "A full-time designer costs 3–5 times more when you consider salary, benefits, equipment, and downtime. With Kinetora, you get a senior multidisciplinary team for a predictable monthly fee, without hiring delays or indirect costs."
    },
    {
      q: "Is there a limit to requests?",
      a: "No limit. You can queue as many requests as you need. We work through them one at a time (or in parallel depending on the agreement), always with 48h deliveries."
    },
    {
      q: "How long does delivery take?",
      a: "Most deliverables are completed within 48 hours of starting. Complex projects like full brand identities or websites are divided into milestones, each with a clear 48-hour cycle."
    },
    {
      q: "How do we coordinate without recurring meetings?",
      a: "We work async by default via Telegram or Discord and manage tasks in ClickUp or your preferred tool. At the end of each day, we provide a report of what we've done, so you're 100% informed. We schedule meetings only when strictly necessary, to keep your calendar free."
    },
    {
      q: "Who actually does the work?",
      a: "Your work is performed by a senior team with expertise in branding, UX/UI, web development, and motion."
    },
    {
      q: "What if I'm not satisfied with the result?",
      a: "Unlimited revisions are included until you're satisfied. We don't close a task until you approve it."
    },
    {
      q: "Is there a minimum stay or hidden costs?",
      a: "No minimum stay. You can pause or cancel your subscription at any time with a 30-day notice. No hidden costs. The monthly price covers everything agreed upon in your plan."
    },
    {
      q: "What does pausing the subscription mean?",
      a: "If you have a quieter period, you can pause your subscription and resume it later without losing the remaining days. It's flexible by design."
    },
    {
      q: "Is there anything you don't cover?",
      a: "We focus on high-performance creative assets. We don't do complex 3D character modeling, custom backend development, or long-form book/magazine layout and printing. If you have any questions, just ask and we'll be direct with you."
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "kin-section bg-[#0D0D0D]", children: /* @__PURE__ */ jsx("div", { className: "kin-container", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-center mb-12 sm:mb-16 lg:mb-24", children: /* @__PURE__ */ jsx(RevealText, { text: lang === "es" ? "Preguntas frecuentes" : "Frequently asked questions" }) }),
    /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full space-y-4", children: faqs.map((faq, i) => /* @__PURE__ */ jsxs(
      AccordionItem,
      {
        value: `item-${i}`,
        className: "border-white/10 bg-white/[0.04] px-5 sm:px-6 rounded-2xl hover:bg-white/[0.06] transition-colors",
        children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-[#F5F5F5] hover:text-[#B454FF] data-[state=open]:text-[#B454FF] transition-colors text-left font-bold uppercase tracking-tight py-4 sm:py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded-xl px-1 sm:px-2 -mx-1 sm:-mx-2 text-sm sm:text-base", children: faq.q }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "group/acc text-[#F5F5F5]/70 leading-relaxed font-medium pb-5 sm:pb-6 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up", children: /* @__PURE__ */ jsx("div", { className: "will-change-transform will-change-opacity group-data-[state=open]/acc:animate-faq-in group-data-[state=closed]/acc:animate-faq-out", children: faq.a }) })
        ]
      },
      i
    )) })
  ] }) }) });
};
export {
  FAQ as default
};
