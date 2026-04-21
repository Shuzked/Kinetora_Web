import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { u as useI18n, N as Navbar, P as PremiumButton } from "./entry-server.Dao3FwaC.js";
import Footer from "./Footer.l3yW-pJU.js";
import { motion } from "framer-motion";
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
import "lenis";
import "react-dom";
import "./input.BWTfiq5J.js";
import "react-icons/si";
import "react-icons/fa";
import "./label.DxdIEkQZ.js";
import "@radix-ui/react-label";
import "./checkbox.CWbK4P9R.js";
import "@radix-ui/react-checkbox";
const NotFound = () => {
  const { lang } = useI18n();
  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  const copy = lang === "es" ? {
    badge: "Error 404",
    title: "Parece que esta ruta no está en nuestro flujo de 48h.",
    desc: "Volvamos al inicio para impulsar tu visión.",
    back: "VOLVER AL INICIO"
  } : {
    badge: "404 Error",
    title: "It seems this route is not in our 48h flow.",
    desc: "Let's head back to the start and boost your vision.",
    back: "BACK TO HOME"
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30 font-inter", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { id: "main-content", role: "main", className: "pt-[68px] md:pt-[88px] min-h-[calc(100vh-100px)] flex flex-col justify-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-[#B454FF]/10 blur-[120px] rounded-full" }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#B454FF]/5 blur-[90px]" }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-[80px]" }),
      /* @__PURE__ */ jsx("section", { className: "py-20 lg:py-32 relative z-10 text-center", children: /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          className: "flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-black tracking-[0.3em] uppercase text-[#F5F5F5]/60 mb-8 backdrop-blur-sm", children: copy.badge }),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-6 max-w-3xl", children: copy.title }),
            /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 text-lg sm:text-xl md:text-2xl font-medium leading-tight mb-12 max-w-2xl", children: copy.desc }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.98 },
                children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(PremiumButton, { variant: "primary", size: "lg", className: "min-w-[280px] text-lg font-black tracking-widest shadow-[0_0_30px_rgba(180,84,255,0.2)]", children: copy.back }) })
              }
            )
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  NotFound as default
};
