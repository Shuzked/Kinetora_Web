import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { B as Button } from "./entry-server.C4bir1NN.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card.C3szqoyR.js";
import { I as Input } from "./input.BccdgVhc.js";
import { L as Label } from "./label.DTQ9oYCO.js";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "framer-motion";
import "lenis";
import "react-dom";
import "@radix-ui/react-label";
const PortalLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("kinetora_session", "mock_session_token");
      setLoading(false);
      navigate("/portal/dashboard");
    }, 1500);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -left-24 w-96 h-96 bg-[#B454FF]/10 rounded-full blur-[100px]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -right-24 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[100px]" }),
    /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md bg-white/[0.03] border-white/10 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-2xl relative z-10", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "text-center space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 bg-[#B454FF]/10 rounded-2xl flex items-center justify-center border border-[#B454FF]/20", children: /* @__PURE__ */ jsx("img", { src: "/assets/logo.svg", alt: "Kinetora", className: "w-8 h-8", width: 32, height: 32, loading: "lazy", decoding: "async" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl font-black tracking-tighter uppercase text-white", children: "Portal Kinetora" }),
          /* @__PURE__ */ jsx(CardDescription, { className: "text-white/50 text-xs font-bold uppercase tracking-widest", children: "Inicia sesión para gestionar tus proyectos" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "email",
              placeholder: "ejemplo@empresa.com",
              className: "bg-white/5 border-white/10 rounded-xl h-12 focus:border-[#B454FF]/50 transition-all",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center ml-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-[10px] font-black uppercase tracking-[0.2em] text-white/40", children: "Contraseña" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "text-[10px] font-black uppercase tracking-[0.2em] text-[#B454FF] hover:text-[#D8B4FF] transition-colors", children: "¿Olvidaste?" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "password",
              placeholder: "••••••••",
              className: "bg-white/5 border-white/10 rounded-xl h-12 focus:border-[#B454FF]/50 transition-all",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            disabled: loading,
            className: "w-full bg-[#B454FF] hover:bg-[#A74CFF] text-white h-12 rounded-xl font-bold uppercase tracking-[0.1em] shadow-[0_4px_15px_rgba(180,84,255,0.3)] transition-all active:scale-95 flex gap-2",
            children: loading ? /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(LogIn, { className: "w-5 h-5" }),
              "ACCEDER AL ÁREA PRIVADA"
            ] })
          }
        )
      ] }) })
    ] })
  ] });
};
export {
  PortalLogin as default
};
