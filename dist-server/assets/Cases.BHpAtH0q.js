import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React__default from "react";
import { useNavigate } from "react-router-dom";
import { u as useI18n, S as SEO, N as Navbar, R as Reveal, P as PremiumButton, g as getSeoDefaults } from "./entry-server.Dao3FwaC.js";
import Footer from "./Footer.l3yW-pJU.js";
import "clsx";
import { u as useEqualizeHeights, c as caseStudies } from "./use-equalize.DQ81Eq-z.js";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "stream";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "lucide-react";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "framer-motion";
import "lenis";
import "react-dom";
import "./input.BWTfiq5J.js";
import "react-icons/si";
import "react-icons/fa";
import "./label.DxdIEkQZ.js";
import "@radix-ui/react-label";
import "./checkbox.CWbK4P9R.js";
import "@radix-ui/react-checkbox";
const Cases = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const meta = React__default.useMemo(() => ({}), []);
  const metricLabelFor = (kind) => {
    return null;
  };
  const ui = lang === "es" ? {
    badge: "Casos de éxito",
    titleA: "Proyectos reales.",
    titleB: "Resultados medibles",
    sub: "Selección de proyectos donde diseñamos el sistema, el producto y la narrativa para acelerar crecimiento.",
    readMore: "Leer más",
    ariaReadMore: (t) => `Leer más: ${t}`
  } : {
    badge: "Case studies",
    titleA: "Real projects.",
    titleB: "Measurable results",
    sub: "A selection of projects where we designed the system, product and narrative to accelerate growth.",
    readMore: "Read more",
    ariaReadMore: (t) => `Read more: ${t}`
  };
  const eqRef = React__default.useRef(null);
  useEqualizeHeights(eqRef, [{ selector: ".js-eq-header", varName: "--eq-header" }], [lang, meta]);
  const seoDefaults = getSeoDefaults(lang);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = `${origin}/casos`;
  const pageTitle = lang === "es" ? `Casos de éxito — ${seoDefaults.siteName}` : `Case studies — ${seoDefaults.siteName}`;
  const pageKeywords = [
    ...seoDefaults.keywords,
    ...lang === "es" ? ["casos de éxito", "portfolio", "resultados"] : ["case studies", "portfolio", "results"]
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30 block opacity-100 relative z-10", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: pageTitle,
        description: ui.sub,
        keywords: pageKeywords,
        image: seoDefaults.shareImage,
        canonical,
        locale: seoDefaults.locale,
        siteName: seoDefaults.siteName,
        ogType: "website",
        twitterCard: "summary_large_image",
        robots: "index,follow"
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { id: "main-content", className: "pt-[68px] md:pt-[88px]", children: /* @__PURE__ */ jsxs("section", { className: "kin-section relative overflow-hidden", ref: eqRef, children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" }),
      /* @__PURE__ */ jsx("div", { className: "kin-container relative", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80", children: ui.badge }) }),
          /* @__PURE__ */ jsxs(Reveal, { as: "h1", className: "mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase", children: [
            ui.titleA.replace(/\.$/, ""),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-[#B454FF]", children: ui.titleB })
          ] }),
          /* @__PURE__ */ jsx(Reveal, { as: "p", className: "mt-4 text-[#F5F5F5]/75 text-sm sm:text-base leading-relaxed", children: ui.sub })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 items-stretch min-h-[200px]", children: (caseStudies || []).map((cs) => {
          const cover = cs.coverImage;
          const hito = lang === "es" ? cs.highlightFallback : cs.highlightFallbackEn ?? cs.highlightFallback;
          const alt = (lang === "es" ? cs.coverAlt : cs.coverAltEn ?? cs.coverAlt) || cs.coverAlt;
          const metricLabel = (lang === "es" ? cs.metricLabel : cs.metricLabelEn ?? cs.metricLabel) ?? metricLabelFor() ?? null;
          const metricValue = cs.metricValue ?? null;
          const title = lang === "es" ? cs.title : cs.titleEn ?? cs.title;
          return /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "group h-full flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-colors hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#B454FF]/40 focus-within:ring-offset-0", children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] overflow-hidden", children: /* @__PURE__ */ jsx(Reveal, { as: "div", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: cover,
                alt,
                width: "1200",
                height: "675",
                loading: "lazy",
                decoding: "async",
                fetchPriority: "low",
                sizes: "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw",
                onError: (e) => {
                  e.currentTarget.src = "/assets/placeholder.svg";
                },
                className: "h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              }
            ) }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-7 flex-1 flex flex-col", children: [
              /* @__PURE__ */ jsxs("div", { className: "js-eq-header", children: [
                /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center self-center rounded-full border border-[#B454FF]/30 bg-[#B454FF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-[#B454FF]", children: hito }),
                /* @__PURE__ */ jsx("h2", { className: "mt-3 mb-2 sm:mb-3 text-lg sm:text-xl font-black tracking-tight title-rows-3 title-rows-3-min", children: title })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-4 sm:pt-5", children: [
                /* @__PURE__ */ jsx("div", { className: "metric-block-min mb-2", children: metricLabel && metricValue ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/75", children: metricLabel }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 text-2xl sm:text-3xl font-black text-[#B454FF] drop-shadow-[0_0_12px_rgba(180,84,255,0.4)]", children: metricValue })
                ] }) : null }),
                /* @__PURE__ */ jsx(
                  PremiumButton,
                  {
                    variant: "glass",
                    size: "sm",
                    className: "w-full h-11 rounded-full border-white/15 bg-white/5 hover:bg-white/10",
                    onClick: () => navigate(`/casos/${cs.slug}`),
                    "aria-label": ui.ariaReadMore(title),
                    children: ui.readMore.toUpperCase()
                  }
                )
              ] })
            ] })
          ] }) }, cs.slug);
        }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  Cases as default
};
