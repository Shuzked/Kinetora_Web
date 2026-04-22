import { jsxs, jsx } from "react/jsx-runtime";
import { u as useI18n, N as Navbar } from "./entry-server.C4bir1NN.js";
import Footer from "./Footer.Cn-AZObR.js";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube, FaFacebook } from "react-icons/fa6";
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
import "./input.BccdgVhc.js";
import "react-icons/si";
import "react-icons/fa";
import "./label.DTQ9oYCO.js";
import "@radix-ui/react-label";
import "./checkbox.DP7XHQkW.js";
import "@radix-ui/react-checkbox";
const ExternalIcon = () => /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("line", { x1: "7", y1: "17", x2: "17", y2: "7" }),
  /* @__PURE__ */ jsx("polyline", { points: "7 7 17 7 17 17" })
] });
const SocialPrivacyPolicy = () => {
  const { t } = useI18n();
  const profiles = [
    { nameKey: "social.profile.ig", urlKey: "social.platform.ig.url", icon: /* @__PURE__ */ jsx(FaInstagram, { size: 18 }) },
    { nameKey: "social.profile.tk", urlKey: "social.platform.tk.url", icon: /* @__PURE__ */ jsx(FaTiktok, { size: 18 }) },
    { nameKey: "social.profile.x", urlKey: "social.platform.x.url", icon: /* @__PURE__ */ jsx(FaXTwitter, { size: 18 }) },
    { nameKey: "social.profile.yt", urlKey: "social.platform.yt.url", icon: /* @__PURE__ */ jsx(FaYoutube, { size: 18 }) },
    { nameKey: "social.profile.fb", urlKey: "social.platform.fb.url", icon: /* @__PURE__ */ jsx(FaFacebook, { size: 18 }) }
  ];
  const purposeItems = ["l1", "l2", "l3", "l4"];
  const interactionBlocks = [
    {
      titleKey: "social.s4.b1.title",
      textKey: "social.s4.b1.text",
      icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) })
    },
    {
      titleKey: "social.s4.b2.title",
      textKey: "social.s4.b2.text",
      icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) })
    },
    {
      titleKey: "social.s4.b3.title",
      textKey: "social.s4.b3.text",
      icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) })
    }
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
      /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.14em] uppercase text-[#F5F5F5] mb-4", children: t("social.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-base md:text-lg mb-8 font-semibold tracking-wide", children: t("social.subtitle") }),
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16", children: t("legal.updated") }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("social.s1.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6", children: t("social.s1.p1") }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: profiles.map(({ nameKey, urlKey, icon }) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: t(urlKey),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "group rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex items-center justify-between hover:border-[#B454FF]/40 hover:bg-white/[0.07] transition-all duration-200",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#B454FF]/20 group-hover:text-[#B454FF] transition-colors", children: icon }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-sm md:text-base", children: t(nameKey) }),
                  /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/50 text-xs md:text-sm tracking-wide", children: t("social.profile.handle") })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-white/30 group-hover:text-[#B454FF] transition-colors", children: /* @__PURE__ */ jsx(ExternalIcon, {}) })
            ]
          },
          nameKey
        )) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("social.s2.title") }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("social.s2.p1") }),
          /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("social.s2.p2") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("social.s3.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-4", children: t("social.s3.p1") }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8", children: /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: purposeItems.map((k) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-[#F5F5F5]/75 text-sm md:text-base", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#B454FF] flex-shrink-0 mt-2" }),
          t(`social.s3.${k}`)
        ] }, k)) }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("social.s4.title") }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: interactionBlocks.map((block) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex items-start gap-5",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-[#B454FF]/10 flex-shrink-0 flex items-center justify-center text-[#B454FF]", children: block.icon }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-sm md:text-base mb-2", children: t(block.titleKey) }),
                /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 text-sm md:text-base leading-relaxed", children: t(block.textKey) })
              ] })
            ]
          },
          block.titleKey
        )) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("social.s5.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6", children: t("social.s5.p1") }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: profiles.map(({ nameKey, urlKey, icon }) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: t(urlKey),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "group flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 hover:border-[#B454FF]/40 hover:bg-white/[0.06] transition-all duration-200",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#B454FF]/20 group-hover:text-[#B454FF] transition-colors", children: icon }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-semibold text-sm md:text-base", children: t(nameKey) })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-[#F5F5F5]/40 group-hover:text-[#B454FF] text-xs font-semibold tracking-wide transition-colors", children: [
                t("social.s5.see"),
                /* @__PURE__ */ jsx(ExternalIcon, {})
              ] })
            ]
          },
          nameKey
        )) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("social.s6.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6", children: t("social.s6.p1") }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:hola@kinetora.tech",
              className: "text-[#B454FF] font-bold text-base md:text-lg hover:underline block mb-2",
              children: t("social.s6.email")
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/50 text-sm italic", children: t("social.s6.subject") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03]", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4 text-[#F5F5F5]/40 flex-shrink-0 mt-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/50 text-xs leading-relaxed", children: t("social.s6.note") })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  SocialPrivacyPolicy as default
};
