import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, FileText, CreditCard, Settings, LogOut } from "lucide-react";
import { d as cn, B as Button, S as SEO } from "./entry-server.Dao3FwaC.js";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { useLocation, Link, Outlet } from "react-router-dom";
import { io } from "socket.io-client";
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
import "lenis";
import "react-dom";
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const navItems = [
  { icon: LayoutDashboard, label: "Mis Peticiones", path: "/portal/dashboard", key: "tasks" },
  { icon: FileText, label: "Mis Entregables", path: "/portal/entregables", key: "deliverables" },
  { icon: CreditCard, label: "Facturación", path: "/portal/billing", key: "billing" },
  { icon: Settings, label: "Ajustes", path: "/portal/settings", key: "settings" }
];
const MOCK_USER = {
  name: "John Doe",
  plan: "Business Pro",
  subscription_start_date: "2024-03-22"
};
const Sidebar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [daysRemaining, setDaysRemaining] = useState(31);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io("http://localhost:3001");
    socketRef.current.on("unread-notification", (data) => {
      if (data.sender !== "Cliente") {
        setUnreadCount((prev) => prev + 1);
      }
    });
    return () => {
      var _a;
      (_a = socketRef.current) == null ? void 0 : _a.disconnect();
    };
  }, []);
  useEffect(() => {
    if (location.pathname === "/portal/dashboard") {
      setUnreadCount(0);
    }
  }, [location.pathname]);
  useEffect(() => {
    const calculateProgress = () => {
      const start = new Date(MOCK_USER.subscription_start_date);
      const today = /* @__PURE__ */ new Date();
      const diffTime = today.getTime() - start.getTime();
      const diffDays = Math.floor(diffTime / (1e3 * 60 * 60 * 24));
      const cycleDays = 31;
      const currentDayInCycle = diffDays % cycleDays;
      const remaining = cycleDays - currentDayInCycle;
      const progressPercentage = currentDayInCycle / cycleDays * 100;
      setProgress(progressPercentage);
      setDaysRemaining(remaining);
    };
    calculateProgress();
    const interval = setInterval(calculateProgress, 36e5);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs("aside", { className: "fixed left-0 top-0 h-screen w-64 bg-[#0D0D0D]/40 backdrop-blur-2xl border-r border-white/5 flex flex-col py-10 px-6 z-50", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/portal/settings", className: "flex flex-col items-center mb-12 group/avatar", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-[#B454FF] to-[#8A2BE2] rounded-full blur opacity-20 group-hover/avatar:opacity-60 transition duration-500" }),
        /* @__PURE__ */ jsxs(Avatar, { className: "w-20 h-20 border-2 border-white/10 ring-4 ring-black/40 relative transition-transform duration-500 group-hover/avatar:scale-105", children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: "/assets/logo.svg", className: "p-4" }),
          /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-[#1A1A1A] text-white font-bold", children: "JD" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-white font-bold tracking-tight text-lg mb-0.5 group-hover/avatar:text-[#B454FF] transition-colors", children: MOCK_USER.name }),
      /* @__PURE__ */ jsxs("p", { className: "text-white/40 text-[10px] uppercase font-black tracking-widest", children: [
        "Plan ",
        MOCK_USER.plan
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-12 px-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase tracking-widest text-white/30", children: "Suscripción" }),
        /* @__PURE__ */ jsxs("span", { className: cn(
          "text-[10px] font-bold transition-colors",
          daysRemaining < 5 ? "text-red-400" : "text-[#B454FF]"
        ), children: [
          daysRemaining,
          " días restantes"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { width: 0 },
          animate: { width: `${progress}%` },
          className: cn(
            "absolute inset-0 shadow-[0_0_15px_rgba(180,84,255,0.5)] transition-colors",
            daysRemaining < 5 ? "bg-gradient-to-r from-red-500 to-orange-400" : "bg-gradient-to-r from-[#B454FF] to-[#D8B4FF]"
          )
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "flex-1 space-y-2", children: navItems.map((item) => {
      const isActive = location.pathname === item.path;
      const showBadge = item.key === "tasks" && unreadCount > 0;
      return /* @__PURE__ */ jsx(Link, { to: item.path, children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          className: cn(
            "w-full justify-start gap-3 h-12 rounded-xl transition-all duration-300 group relative",
            isActive ? "bg-[#B454FF]/10 text-[#B454FF] border border-[#B454FF]/20" : "text-white/50 hover:bg-white/5 hover:text-white"
          ),
          children: [
            /* @__PURE__ */ jsx(item.icon, { className: cn(
              "w-5 h-5 transition-colors",
              isActive ? "text-[#B454FF]" : "text-inherit"
            ) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-widest", children: item.label }),
            showBadge && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                className: "ml-auto bg-[#B454FF] text-white text-[9px] font-black h-5 w-5 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(180,84,255,0.5)]",
                children: unreadCount
              }
            ),
            isActive && !showBadge && /* @__PURE__ */ jsx(
              motion.div,
              {
                layoutId: "active-indicator",
                className: "ml-auto w-1 h-4 bg-[#B454FF] rounded-full"
              }
            )
          ]
        }
      ) }, item.path);
    }) }),
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => {
          localStorage.removeItem("kinetora_session");
          window.location.reload();
        },
        className: "mt-auto justify-start gap-3 h-12 rounded-xl text-red-500/40 hover:bg-red-500/5 hover:text-red-500 transition-colors group",
        children: [
          /* @__PURE__ */ jsx(LogOut, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-inherit", children: "Cerrar Sesión" })
        ]
      }
    )
  ] });
};
const PortalLayout = () => {
  const location = useLocation();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0D0D0D] text-[#F5F5F5] font-sans overflow-x-hidden selection:bg-[#B454FF]/30", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Portal de Clientes | Kinetora",
        robots: "noindex, nofollow"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "fixed top-0 left-0 w-full h-full pointer-events-none z-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B454FF]/5 rounded-full blur-[120px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8A2BE2]/5 rounded-full blur-[100px]" })
    ] }),
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsx("main", { className: "pl-64 min-h-screen relative z-10 w-full", children: /* @__PURE__ */ jsx("div", { className: "p-8 md:p-12 max-w-7xl mx-auto", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -10, filter: "blur(10px)" },
        transition: { duration: 0.4, ease: "easeOut" },
        children: /* @__PURE__ */ jsx(Outlet, {})
      },
      location.pathname
    ) }) }) })
  ] });
};
export {
  PortalLayout as default
};
