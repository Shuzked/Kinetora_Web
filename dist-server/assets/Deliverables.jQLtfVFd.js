import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, Video, Layout, Clock, MoreVertical, Download, ExternalLink, FileCode } from "lucide-react";
import { B as Button, d as cn } from "./entry-server.Dn9wYq1J.js";
import { I as Input } from "./input.CW1Cl7I9.js";
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
const Deliverables = () => {
  const [deliverables, setDeliverables] = useState([
    { name: "Brand_Strategy_V1.pdf", url: "#", type: "PDF", size: "2.4 MB", date: "21 MAR 2024" },
    { name: "Social_Media_Assets_Final.zip", url: "#", type: "ZIP", size: "45.0 MB", date: "20 MAR 2024" },
    { name: "Kinetora_UI_Prototype", url: "#", type: "FIGMA", size: "Link", date: "18 MAR 2024" },
    { name: "Explainervideo_Concept.mp4", url: "#", type: "MP4", size: "125 MB", date: "15 MAR 2024" }
  ]);
  const getIcon = (type) => {
    switch (type) {
      case "PDF":
        return /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-red-400" });
      case "MP4":
        return /* @__PURE__ */ jsx(Video, { className: "w-5 h-5 text-blue-400" });
      case "FIGMA":
        return /* @__PURE__ */ jsx(Layout, { className: "w-5 h-5 text-[#B454FF]" });
      default:
        return /* @__PURE__ */ jsx(FileCode, { className: "w-5 h-5 text-emerald-400" });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-10 animate-in fade-in duration-700", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black text-white tracking-tight flex items-center gap-3", children: "📂 Mis Entregables" }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-black text-white/20 uppercase tracking-[0.3em] mt-1", children: "Archivos finales y recursos de tu proyecto" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 md:w-64", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Buscar archivos...",
              className: "bg-white/5 border-white/10 rounded-xl pl-10 h-11 text-xs focus:border-[#B454FF]/30 transition-all font-bold"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "rounded-xl bg-white/5 border border-white/5 text-white/40", children: /* @__PURE__ */ jsx(Filter, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      { label: "Documentos", count: 12, icon: FileText, color: "text-red-400" },
      { label: "Multimedia", count: 8, icon: Video, color: "text-blue-400" },
      { label: "Estrategias", count: 4, icon: Layout, color: "text-[#B454FF]" },
      { label: "Uso de Espacio", count: "1.2 GB", icon: Clock, color: "text-emerald-400" }
    ].map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4 group hover:bg-white/[0.04] transition-all", children: [
      /* @__PURE__ */ jsx("div", { className: cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5", stat.color), children: /* @__PURE__ */ jsx(stat.icon, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-white/20 uppercase tracking-widest block", children: stat.label }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-black text-white tracking-tight", children: stat.count })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: deliverables.map((file, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.1 },
        className: "group relative bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 hover:border-[#B454FF]/30 transition-all hover:bg-[#111111]",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform", children: getIcon(file.type) }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full text-white/20 hover:text-white/60", children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[13px] font-bold text-white group-hover:text-[#B454FF] transition-colors truncate", children: file.name }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-white/20 uppercase tracking-widest", children: file.type }),
              /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-white/10" }),
              /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-white/20", children: file.size })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-6", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "flex-1 bg-white/[0.02] border border-white/5 rounded-xl h-9 text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-[#B454FF]/10 hover:text-[#B454FF] hover:border-[#B454FF]/30 gap-2",
                children: [
                  /* @__PURE__ */ jsx(Download, { className: "w-3 h-3" }),
                  "Descargar"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "rounded-xl border border-white/5 h-9 w-9 bg-white/[0.01] text-white/20 hover:text-white hover:bg-white/5",
                children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })
              }
            )
          ] })
        ]
      },
      i
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "p-8 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01] flex flex-col items-center justify-center text-center space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5", children: /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-white/20" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-white/40", children: "¿Buscas algo específico?" }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-white/10 uppercase tracking-widest mt-1", children: "Todos los archivos se sincronizan automáticamente con tu carpeta protegida en Hostinger." })
      ] })
    ] })
  ] });
};
export {
  Deliverables as default
};
