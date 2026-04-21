import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Palette, Globe, Video, MessageSquare } from "lucide-react";
import { u as useI18n } from "./entry-server.DD-cyNZX.js";
import { I as ImageWithSkeleton } from "./ImageWithSkeleton.etqQ9V6y.js";
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
const Services = () => {
  const { lang } = useI18n();
  const copy = lang === "es" ? {
    badge: "Capacidades",
    titleTop: "Todo el músculo visual",
    titleBottom: "que tu startup necesita.",
    sub: "Branding, producto, web y contenido — con un sistema que mantiene calidad y consistencia a escala.",
    cards: {
      brandingTitle: "Diseño Gráfico y Branding",
      brandingDesc: "Más allá del logotipo, construyo identidades de marca completas. Esto abarca desde pitch decks visualmente potentes para buscar financiación, hasta activos gráficos pensados específicamente para rendir en redes sociales y campañas.",
      digitalTitle: "Diseño UX/UI y Web",
      digitalDesc: "Creación de páginas, tiendas online y Sistemas de Diseño para apps web y móvil. Cubro desde los wireframes iniciales hasta prototipos interactivos que funcionan como una demo real del producto final.",
      multimediaTitle: "Multimedia y Vídeo",
      multimediaDesc: "Edición enfocada en la retención de audiencia para redes sociales, sumando motion graphics, animaciones 2D/3D y VFX.",
      commsTitle: "Estrategia y Contenido",
      commsDesc: "Planificación para escalar cuentas, producción y un copywriting muy directo y estratégico."
    }
  } : {
    badge: "Capabilities",
    titleTop: "All the visual power",
    titleBottom: "your startup needs.",
    sub: "Brand, product, web and content — with a system that keeps quality and consistency at scale.",
    cards: {
      brandingTitle: "Graphic Design & Branding",
      brandingDesc: "Beyond the logo, I build comprehensive brand identities. This spans from visually striking pitch decks for fundraising to graphic assets engineered to perform in social media campaigns.",
      digitalTitle: "UX/UI & Web Design",
      digitalDesc: "Crafting landing pages, e-commerce, and full Design Systems for web and mobile apps. I cover everything from initial wireframes to interactive prototypes acting as a high-fidelity demo of the final product.",
      multimediaTitle: "Video & Multimedia",
      multimediaDesc: "Retention-focused editing for social platforms, integrating motion graphics, 2D/3D animations, and VFX.",
      commsTitle: "Content Strategy",
      commsDesc: "Account scaling roadmaps, content production, and sharp, highly strategic copywriting."
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-32 -left-28 h-96 w-96 rounded-full bg-[#B454FF]/12 blur-[120px] z-0" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-36 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#B454FF]/8 blur-[130px] z-0" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 opacity-[0.35] z-[1] bg-[radial-gradient(circle_at_30%_20%,rgba(180,84,255,0.12),transparent_55%)]" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,#0D0D0D,transparent)] z-[2]" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,#0D0D0D,transparent)] z-[2]" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mb-12 sm:mb-16 lg:mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-5", children: copy.badge }),
        /* @__PURE__ */ jsxs("h2", { className: "mb-6", children: [
          copy.titleTop.toUpperCase(),
          " ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#B454FF]", children: copy.titleBottom.toUpperCase().replace(/\.$/, "") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed", children: copy.sub })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6", children: [
        /* @__PURE__ */ jsx("article", { className: "md:col-span-2 contents", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { y: -5 },
            className: "md:col-span-2 bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden backdrop-blur-xl hover:border-[#B454FF]/35 hover:bg-white/[0.06] transition-all duration-300",
            children: [
              /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ jsx(
                ImageWithSkeleton,
                {
                  src: "/assets/service-photos/brand-identity.webp",
                  alt: "",
                  width: 800,
                  height: 450,
                  containerClassName: "h-full w-full",
                  skeletonClassName: "bg-white/10",
                  className: "h-full w-full object-cover opacity-[0.16] transition-transform duration-700 group-hover:scale-110"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10 mb-8", children: /* @__PURE__ */ jsx("div", { className: "relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30", children: /* @__PURE__ */ jsx(Palette, { className: "w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter", children: copy.cards.brandingTitle }),
                /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 font-medium text-lg md:text-xl max-w-md leading-relaxed", children: copy.cards.brandingDesc })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("article", { className: "contents", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { y: -5 },
            className: "bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-[#B454FF]/35 hover:bg-white/[0.06]",
            children: [
              /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ jsx(
                ImageWithSkeleton,
                {
                  src: "/assets/service-photos/digital-uxui.webp",
                  alt: "",
                  width: 600,
                  height: 400,
                  containerClassName: "h-full w-full",
                  skeletonClassName: "bg-white/10",
                  className: "h-full w-full object-cover opacity-[0.16] transition-transform duration-700 group-hover:scale-110"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10 mb-8", children: /* @__PURE__ */ jsx("div", { className: "relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B454FF]/12 border border-[#B454FF]/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-[#B454FF]/16 group-hover:border-[#B454FF]/30", children: /* @__PURE__ */ jsx(Globe, { className: "w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter", children: copy.cards.digitalTitle }),
                /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 font-medium text-lg leading-relaxed", children: copy.cards.digitalDesc })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("article", { className: "contents", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { y: -5 },
            className: "bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-[#B454FF]/35 hover:bg-white/[0.06]",
            children: [
              /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ jsx(
                ImageWithSkeleton,
                {
                  src: "/assets/service-photos/video-editing.webp",
                  alt: "",
                  width: 600,
                  height: 400,
                  containerClassName: "h-full w-full",
                  skeletonClassName: "bg-white/10",
                  className: "h-full w-full object-cover opacity-[0.16] transition-transform duration-700 group-hover:scale-110"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10 mb-8", children: /* @__PURE__ */ jsx("div", { className: "relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30", children: /* @__PURE__ */ jsx(Video, { className: "w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter", children: copy.cards.multimediaTitle }),
                /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 font-medium text-lg leading-relaxed", children: copy.cards.multimediaDesc })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("article", { className: "md:col-span-2 contents", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { y: -5 },
            className: "md:col-span-2 bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-[#B454FF]/35 hover:bg-white/[0.06]",
            children: [
              /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ jsx(
                ImageWithSkeleton,
                {
                  src: "/assets/service-photos/communication-pitch-decks.webp",
                  alt: "",
                  width: 800,
                  height: 450,
                  containerClassName: "h-full w-full",
                  skeletonClassName: "bg-white/10",
                  className: "h-full w-full object-cover opacity-[0.16] transition-transform duration-700 group-hover:scale-110"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10 mb-8", children: /* @__PURE__ */ jsx("div", { className: "relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30", children: /* @__PURE__ */ jsx(MessageSquare, { className: "w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter", children: copy.cards.commsTitle }),
                /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 font-medium text-lg md:text-xl max-w-md leading-relaxed", children: copy.cards.commsDesc })
              ] })
            ]
          }
        ) })
      ] })
    ] })
  ] });
};
export {
  Services as default
};
