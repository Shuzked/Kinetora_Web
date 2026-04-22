import { jsxs, jsx } from "react/jsx-runtime";
import { u as useI18n, N as Navbar } from "./entry-server.T-vtzQxy.js";
import Footer from "./Footer.zXA0MqPb.js";
import { Link } from "react-router-dom";
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
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "framer-motion";
import "lenis";
import "react-dom";
import "./input.C19rof9k.js";
import "react-icons/si";
import "react-icons/fa";
import "./label.D93xiKXT.js";
import "@radix-ui/react-label";
import "./checkbox.ry8aju93.js";
import "@radix-ui/react-checkbox";
const PrivacyPolicy = () => {
  const { t } = useI18n();
  const rights = [
    {
      titleKey: "privacy.s6.r1.title",
      descKey: "privacy.s6.r1.desc",
      icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: [
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
      ] })
    },
    {
      titleKey: "privacy.s6.r2.title",
      descKey: "privacy.s6.r2.desc",
      icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) })
    },
    {
      titleKey: "privacy.s6.r3.title",
      descKey: "privacy.s6.r3.desc",
      icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
    },
    {
      titleKey: "privacy.s6.r4.title",
      descKey: "privacy.s6.r4.desc",
      icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" }) })
    },
    {
      titleKey: "privacy.s6.r5.title",
      descKey: "privacy.s6.r5.desc",
      icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) })
    },
    {
      titleKey: "privacy.s6.r6.title",
      descKey: "privacy.s6.r6.desc",
      icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) })
    }
  ];
  const s3rows = [
    { f: "privacy.s3.r1.finalidad", b: "privacy.s3.r1.base", p: "privacy.s3.r1.plazo" },
    { f: "privacy.s3.r2.finalidad", b: "privacy.s3.r2.base", p: "privacy.s3.r2.plazo" },
    { f: "privacy.s3.r3.finalidad", b: "privacy.s3.r3.base", p: "privacy.s3.r3.plazo" },
    { f: "privacy.s3.r4.finalidad", b: "privacy.s3.r4.base", p: "privacy.s3.r4.plazo" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#030303] text-[#F5F5F5]", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "pt-[100px] md:pt-[120px] pb-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-[800px] px-6 lg:px-0", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "inline-block text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 hover:text-white transition-colors mb-4 uppercase",
          children: t("legal.back")
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.14em] uppercase text-[#F5F5F5] mb-4", children: t("privacy.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-base md:text-lg mb-8 font-semibold tracking-wide", children: t("privacy.subtitle") }),
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16", children: t("legal.updated") }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("privacy.s1.title") }),
        /* @__PURE__ */ jsxs("div", { className: "kin-card space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF] block mb-1", children: t("privacy.s1.l1.label") }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-medium text-base md:text-lg", children: t("privacy.s1.l1.value") })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF] block mb-1", children: t("privacy.s1.l2.label") }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:hola@kinetora.tech",
                className: "text-[#B454FF] font-medium text-base md:text-lg hover:underline",
                children: t("privacy.s1.l2.value")
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF] block mb-1", children: t("privacy.s1.l3.label") }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-medium text-base md:text-lg", children: t("privacy.s1.l3.value") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("privacy.s2.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6", children: t("privacy.s2.p1") }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "border border-white/10 bg-white/5 rounded-2xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-sm md:text-base mb-4 tracking-wide", children: t("privacy.s2.subtitle1") }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: ["l1", "l2", "l3", "l4", "l5"].map((k) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-[#F5F5F5]/75 text-sm md:text-base", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#B454FF] flex-shrink-0" }),
              t(`privacy.s2.${k}`)
            ] }, k)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border border-white/10 bg-white/5 rounded-2xl p-6 md:p-8", children: [
            /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-sm md:text-base mb-3 tracking-wide", children: t("privacy.s2.subtitle2") }),
            /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("privacy.s2.p2") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("privacy.s3.title") }),
        /* @__PURE__ */ jsxs("div", { className: "border border-white/10 bg-white/5 rounded-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "hidden md:grid grid-cols-3 gap-4 px-6 py-3 bg-white/5 border-b border-white/10", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF]", children: t("privacy.s3.col.finalidad") }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF]", children: t("privacy.s3.col.base") }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF]", children: t("privacy.s3.col.plazo") })
          ] }),
          s3rows.map((row, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 px-6 py-4 text-sm md:text-base ${i < s3rows.length - 1 ? "border-b border-white/10" : ""}`,
              children: [
                /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5] font-medium", children: t(row.f) }),
                /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/60 md:text-[#F5F5F5]/75", children: t(row.b) }),
                /* @__PURE__ */ jsx("p", { className: "text-[#B454FF] font-semibold", children: t(row.p) })
              ]
            },
            i
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("privacy.s4.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-4", children: t("privacy.s4.p1") }),
        /* @__PURE__ */ jsx("div", { className: "border border-white/10 bg-white/5 rounded-2xl p-6 md:p-8", children: /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: ["l1", "l2", "l3", "l4"].map((k) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-[#F5F5F5]/75 text-sm md:text-base", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#B454FF] flex-shrink-0" }),
          t(`privacy.s4.${k}`)
        ] }, k)) }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("privacy.s5.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("privacy.s5.p1") })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("privacy.s6.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6", children: t("privacy.s6.p1") }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6", children: rights.map((r) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-[#B454FF]/10 flex-shrink-0 flex items-center justify-center text-[#B454FF]", children: r.icon }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-sm md:text-base mb-1", children: t(r.titleKey) }),
                /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/60 text-sm leading-relaxed", children: t(r.descKey) })
              ] })
            ]
          },
          r.titleKey
        )) }),
        /* @__PURE__ */ jsxs("p", { className: "text-[#F5F5F5]/60 text-sm leading-relaxed", children: [
          t("privacy.s6.aepd"),
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://www.aepd.es",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-[#B454FF] hover:underline",
              children: "www.aepd.es"
            }
          ),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("privacy.s7.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("privacy.s7.p1") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  PrivacyPolicy as default
};
