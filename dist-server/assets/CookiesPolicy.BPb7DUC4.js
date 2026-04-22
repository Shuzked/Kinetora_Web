import { jsxs, jsx } from "react/jsx-runtime";
import { u as useI18n, N as Navbar } from "./entry-server.Dn9wYq1J.js";
import Footer from "./Footer.B9ATaZAf.js";
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
import "./input.CW1Cl7I9.js";
import "react-icons/si";
import "react-icons/fa";
import "./label.CkOrtd7q.js";
import "@radix-ui/react-label";
import "./checkbox.CHUz-ZWO.js";
import "@radix-ui/react-checkbox";
const ExternalLinkIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-3.5 h-3.5 flex-shrink-0",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2.5,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      }
    )
  }
);
const ShieldIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) });
const SlidersIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }) });
const BarChartIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) });
const CookiesPolicy = () => {
  const { t } = useI18n();
  const cookieTypes = [
    {
      titleKey: "cookie.types.tech",
      descKey: "cookie.types.tech.desc",
      icon: /* @__PURE__ */ jsx(ShieldIcon, {}),
      dotColor: "bg-emerald-500",
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400"
    },
    {
      titleKey: "cookie.types.func",
      descKey: "cookie.types.func.desc",
      icon: /* @__PURE__ */ jsx(SlidersIcon, {}),
      dotColor: "bg-blue-500",
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400"
    },
    {
      titleKey: "cookie.types.anal",
      descKey: "cookie.types.anal.desc",
      icon: /* @__PURE__ */ jsx(BarChartIcon, {}),
      dotColor: "bg-orange-500",
      iconBg: "bg-orange-500/15",
      iconColor: "text-orange-400"
    }
  ];
  const tableRows = [
    {
      nameKey: "cookie.table.row1.name",
      typeKey: "cookie.table.row1.type",
      providerKey: "cookie.table.row1.provider",
      purposeKey: "cookie.table.row1.purpose",
      durationKey: "cookie.table.row1.duration",
      typeColor: "text-orange-400"
    },
    {
      nameKey: "cookie.table.row2.name",
      typeKey: "cookie.table.row2.type",
      providerKey: "cookie.table.row2.provider",
      purposeKey: "cookie.table.row2.purpose",
      durationKey: "cookie.table.row2.duration",
      typeColor: "text-emerald-400"
    },
    {
      nameKey: "cookie.table.row3.name",
      typeKey: "cookie.table.row3.type",
      providerKey: "cookie.table.row3.provider",
      purposeKey: "cookie.table.row3.purpose",
      durationKey: "cookie.table.row3.duration",
      typeColor: "text-blue-400"
    }
  ];
  const browsers = [
    { labelKey: "cookie.manage.chrome", urlKey: "cookie.manage.chrome.url" },
    { labelKey: "cookie.manage.firefox", urlKey: "cookie.manage.firefox.url" },
    { labelKey: "cookie.manage.safari", urlKey: "cookie.manage.safari.url" },
    { labelKey: "cookie.manage.edge", urlKey: "cookie.manage.edge.url" },
    { labelKey: "cookie.manage.opera", urlKey: "cookie.manage.opera.url" }
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
      /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.14em] uppercase text-[#F5F5F5] mb-4", children: t("cookie.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-base md:text-lg mb-6 font-semibold tracking-wide", children: t("cookie.subtitle") }),
      /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/60 text-sm md:text-base leading-relaxed mb-3", children: t("cookie.intro1") }),
      /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/60 text-sm md:text-base leading-relaxed mb-12", children: t("cookie.intro2") }),
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16", children: t("legal.updated") }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("cookie.s1.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-8", children: t("cookie.s1.p1") }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: cookieTypes.map((ct) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-full ${ct.iconBg} flex items-center justify-center ${ct.iconColor}`,
                  children: ct.icon
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-sm md:text-base mb-2", children: t(ct.titleKey) }),
                /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/60 text-xs md:text-sm leading-relaxed", children: t(ct.descKey) })
              ] })
            ]
          },
          ct.titleKey
        )) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("cookie.s3.title") }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-2xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left min-w-[640px] border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "bg-white/5 border-b border-white/10", children: ["cookie.table.name", "cookie.table.type", "cookie.table.provider", "cookie.table.purpose", "cookie.table.duration"].map((col) => /* @__PURE__ */ jsx(
            "th",
            {
              className: "p-4 text-[10px] font-black tracking-widest text-[#B454FF] uppercase whitespace-nowrap",
              children: t(col)
            },
            col
          )) }) }),
          /* @__PURE__ */ jsx("tbody", { className: "text-sm divide-y divide-white/5", children: tableRows.map((row, i) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/[0.02] transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 text-[#B454FF] font-semibold whitespace-nowrap", children: t(row.nameKey) }),
            /* @__PURE__ */ jsx("td", { className: `p-4 font-medium whitespace-nowrap ${row.typeColor}`, children: t(row.typeKey) }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-[#F5F5F5]/60 whitespace-nowrap", children: t(row.providerKey) }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-[#F5F5F5]/60 max-w-[200px]", children: t(row.purposeKey) }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-[#F5F5F5]/60 whitespace-nowrap", children: t(row.durationKey) })
          ] }, i)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("cookie.s4.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6", children: t("cookie.s4.p1") }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6", children: browsers.map(({ labelKey, urlKey }) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: t(urlKey),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "group flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] border border-white/10 px-3 py-4 text-center text-[#F5F5F5]/70 text-xs md:text-sm font-semibold hover:bg-[#B454FF]/10 hover:border-[#B454FF]/40 hover:text-[#B454FF] transition-all duration-200",
            children: [
              /* @__PURE__ */ jsx("span", { children: t(labelKey) }),
              /* @__PURE__ */ jsx(ExternalLinkIcon, {})
            ]
          },
          labelKey
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03]", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4 text-[#F5F5F5]/40 flex-shrink-0 mt-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/50 text-xs leading-relaxed", children: t("cookie.s4.note") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4", children: t("cookie.s5.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed", children: t("cookie.s5.p1") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  CookiesPolicy as default
};
