import { jsxs, jsx } from "react/jsx-runtime";
import { u as useI18n, N as Navbar } from "./entry-server.DD-cyNZX.js";
import Footer from "./Footer.CoJxyP2_.js";
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
import "./input.DbWUSKtp.js";
import "react-icons/si";
import "react-icons/fa";
import "./label.DDh2-1nC.js";
import "@radix-ui/react-label";
import "./checkbox.B6uppU3e.js";
import "@radix-ui/react-checkbox";
const LegalNotice = () => {
  const { t } = useI18n();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#030303] text-[#F5F5F5]", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "pt-[100px] md:pt-[120px] pb-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-[800px] px-6 lg:px-0", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 hover:text-white transition-colors mb-4 uppercase", children: t("legal.back") }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.14em] uppercase text-[#F5F5F5] mb-4", children: t("legal.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-base md:text-lg mb-8", children: t("legal.subtitle") }),
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16", children: t("legal.updated") }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("legal.s1.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6", children: t("legal.s1.p1") }),
        /* @__PURE__ */ jsxs("div", { className: "kin-card space-y-3", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsxs("strong", { className: "text-white font-semibold", children: [
              t("legal.s1.company"),
              ":"
            ] }),
            " Kinetora Studio S.L."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsxs("strong", { className: "text-white font-semibold", children: [
              t("legal.s1.address"),
              ":"
            ] }),
            " España"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsxs("strong", { className: "text-white font-semibold", children: [
              t("legal.s1.cif"),
              ":"
            ] }),
            " ",
            t("legal.s1.cif.val")
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsxs("strong", { className: "text-white font-semibold", children: [
              t("legal.s1.email"),
              ":"
            ] }),
            " hola@kinetora.tech"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsxs("strong", { className: "text-white font-semibold", children: [
              t("legal.s1.web"),
              ":"
            ] }),
            " https://kinetora.tech"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("legal.s2.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-4", children: t("legal.s2.p1") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("legal.s2.p2") })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("legal.s3.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-4", children: t("legal.s3.p1") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("legal.s3.p2") })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("legal.s4.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("legal.s4.p1") })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("legal.s5.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("legal.s5.p1") })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("legal.s6.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("legal.s6.p1") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  LegalNotice as default
};
