var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import React__default, { useState, useEffect, createContext, useContext, useMemo, useRef, Component, useCallback, lazy, Suspense } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Transform } from "stream";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, ChevronRight, Check, Circle, Menu, ArrowRight, Timer, RefreshCw, Euro, AlertCircle, ArrowUp } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2, toast as toast$1 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate, useLocation, Link, Routes, Route, Navigate } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useScroll, useTransform, useSpring, motion, useInView, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import { createPortal } from "react-dom";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const MagneticButton = ({
  children,
  radius = 50,
  strength = 0.25,
  className
}) => {
  const ref = React__default.useRef(null);
  const rafRef = React__default.useRef(null);
  const currentRef = React__default.useRef({ x: 0, y: 0 });
  const targetRef = React__default.useRef({ x: 0, y: 0 });
  const lerp = (a, b, t) => a + (b - a) * t;
  const applyTransform = (x, y) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const animate = React__default.useCallback(() => {
    const { x: cx, y: cy } = currentRef.current;
    const { x: tx, y: ty } = targetRef.current;
    const nx = lerp(cx, tx, 0.14);
    const ny = lerp(cy, ty, 0.14);
    currentRef.current = { x: nx, y: ny };
    applyTransform(nx, ny);
    if (Math.hypot(tx - nx, ty - ny) > 0.2) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      currentRef.current = { x: tx, y: ty };
      applyTransform(tx, ty);
      rafRef.current = null;
    }
  }, []);
  const setTarget = React__default.useCallback((x, y) => {
    targetRef.current = { x, y };
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);
  const onMove = React__default.useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        setTarget(dx * strength, dy * strength);
      } else {
        setTarget(0, 0);
      }
    },
    [radius, strength, setTarget]
  );
  const onLeave = React__default.useCallback(() => {
    setTarget(0, 0);
  }, [setTarget]);
  React__default.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      className,
      style: {
        // Sin transición CSS; controlamos con RAF para suavidad real
        willChange: "transform"
      },
      children
    }
  );
};
const sizeMap = {
  sm: "h-10 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 md:h-16 px-9 md:px-10 text-sm md:text-base"
};
const PremiumButton = ({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  children,
  isLoading = false,
  disabled,
  ...props
}) => {
  const base = "inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.18em] md:tracking-[0.24em] rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02]";
  const variants = {
    primary: "text-white bg-[#B454FF] border border-white/10 shadow-[0_12px_44px_rgba(180,84,255,0.22)] hover:bg-[#A74CFF] hover:shadow-[0_16px_54px_rgba(180,84,255,0.30)]",
    glass: "text-[#F5F5F5] bg-[#1A1A1A] border border-white/[0.12] hover:bg-[#252525] hover:border-white/[0.25] shadow-[0_6px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)]",
    outline: "text-[#F5F5F5] border border-white/15 hover:bg-white/5",
    white: "text-[#0D0D0D] bg-white border border-white/10 shadow-[0_12px_44px_rgba(255,255,255,0.12)] hover:bg-white/95 hover:shadow-[0_16px_54px_rgba(255,255,255,0.16)]"
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      disabled: disabled || isLoading,
      className: cn(base, variants[variant], sizeMap[size], className),
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "relative z-[1] flex items-center justify-center gap-2 pointer-events-none", children: /* @__PURE__ */ jsx(MagneticButton, { children: /* @__PURE__ */ jsxs("div", { className: "pointer-events-auto flex items-center justify-center gap-2", children: [
        leftIcon ? /* @__PURE__ */ jsx("span", { className: "shrink-0", children: leftIcon }) : null,
        /* @__PURE__ */ jsx("span", { className: "shrink-0", children }),
        rightIcon ? /* @__PURE__ */ jsx("span", { className: "shrink-0", children: rightIcon }) : null
      ] }) }) })
    }
  );
};
const Logo = ({ className = "h-6" }) => {
  const [hasError, setHasError] = React__default.useState(false);
  return /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${className}`, children: !hasError ? /* @__PURE__ */ jsx(
    "img",
    {
      src: "/Logotipo.svg",
      alt: "Kinetora Logo",
      className: "h-full w-auto",
      width: 120,
      height: 24,
      decoding: "async",
      onError: () => setHasError(true)
    }
  ) : /* @__PURE__ */ jsxs("div", { className: "text-2xl font-black tracking-tighter text-[#F5F5F5] flex items-center gap-1", children: [
    "KINETORA",
    /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-[#B454FF] rounded-full shadow-[0_0_10px_#B454FF]" })
  ] }) });
};
const KinetoraIcon = ({ className = "h-6 w-6" }) => {
  return /* @__PURE__ */ jsx("div", { className: `flex items-center justify-center ${className}`, children: /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 44 44",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-full w-full",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M0 41.4427C0 42.3632 0.746191 43.1094 1.66666 43.1094H14.6433C15.0851 43.1094 15.5089 42.934 15.8214 42.6217L19.9558 38.4904C20.2686 38.1778 20.4444 37.7537 20.4444 37.3114V5.79629C20.4444 5.35404 20.2686 4.92993 19.9558 4.61734L15.8214 0.486044C15.5089 0.173758 15.0851 -0.00166374 14.6433 -0.00166374H1.66666C0.74619 -0.00166374 0 0.744527 0 1.665L0 41.4427Z", fill: "#F5F5F5" }),
        /* @__PURE__ */ jsx("path", { d: "M34.6551 19.9563L42.6232 11.9881C42.9358 11.6756 43.1114 11.2516 43.1114 10.8096V1.66666C43.1114 0.746191 42.3652 0 41.4447 0H28.4684C28.0264 0 27.6025 0.175594 27.2899 0.488154L23.1551 4.62295C22.8426 4.93551 22.667 5.35943 22.667 5.80146V18.7777C22.667 19.6982 23.4132 20.4444 24.3337 20.4444H33.4766C33.9186 20.4444 34.3426 20.2688 34.6551 19.9563Z", fill: "#B454FF" }),
        /* @__PURE__ */ jsx("path", { d: "M34.6551 23.1531L42.6232 31.1212C42.9358 31.4338 43.1114 31.8577 43.1114 32.2998V41.4427C43.1114 42.3632 42.3652 43.1094 41.4447 43.1094H28.4684C28.0264 43.1094 27.6025 42.9338 27.2899 42.6212L23.1551 38.4864C22.8426 38.1739 22.667 37.7499 22.667 37.3079V24.3316C22.667 23.4112 23.4132 22.665 24.3337 22.665H33.4766C33.9186 22.665 34.3426 22.8406 34.6551 23.1531Z", fill: "#F5F5F5" })
      ]
    }
  ) });
};
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
function getNavbarOffset() {
  const nav = document.querySelector("nav");
  const h = nav instanceof HTMLElement ? nav.offsetHeight : 0;
  return h + 8;
}
function smoothScrollTo(targetY, duration = 600) {
  const startY = window.scrollY;
  const dist = targetY - startY;
  let start = null;
  const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  function step(ts) {
    if (start === null) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(1, elapsed / duration);
    const y = startY + dist * ease(progress);
    if ("scrollTo" in window) {
      window.scrollTo(0, y);
    } else {
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
    }
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const SmoothScrollLink = ({ href, className = "", children }) => {
  const navigate = useNavigate();
  useLocation();
  const handleClick = (e) => {
    var _a, _b;
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const anySheet = document.querySelector("[data-radix-sheet-content]");
    if (anySheet) {
      (_a = anySheet.parentElement) == null ? void 0 : _a.querySelector("button,[data-state='open']");
      (_b = document.activeElement) == null ? void 0 : _b.blur();
      const esc = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(esc);
      setTimeout(() => scrollToAnchor(), 50);
    } else {
      scrollToAnchor();
    }
    function scrollToAnchor() {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) {
        navigate("/" + href);
        return;
      }
      const navOffset = getNavbarOffset();
      const rect = el.getBoundingClientRect();
      const absoluteY = rect.top + window.scrollY - navOffset;
      smoothScrollTo(absoluteY, 650);
      history.replaceState(null, "", href);
    }
  };
  return /* @__PURE__ */ jsx("a", { href, onClick: handleClick, className, children });
};
function useScrollSpy(ids, options) {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    if (!ids.length) return;
    const elements = ids.map((id) => document.getElementById(id)).filter((el) => !!el);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        var _a;
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if ((_a = visible == null ? void 0 : visible.target) == null ? void 0 : _a.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
        ...options
      }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, options]);
  return activeId;
}
const dictionaries = {
  es: {
    "lang.es": "Español",
    "lang.en": "Inglés",
    "lang.switch": "Idioma",
    // Cookie Banner
    "banner.title": "Usamos cookies",
    "banner.desc": "Utilizamos cookies técnicas (necesarias), analíticas y funcionales para mejorar tu experiencia. Puedes aceptarlas, rechazar las opcionales o gestionar tus preferencias.",
    "banner.accept": "Aceptar todo",
    "banner.reject": "Solo técnicas",
    "banner.manage": "Gestionar",
    "banner.save": "Guardar preferencias",
    "banner.link.cookies": "Política de Cookies",
    "banner.link.privacy": "Política de Privacidad",
    "banner.cat.tech.title": "Técnicas",
    "banner.cat.tech.desc": "Necesarias para que el sitio funcione correctamente. No se pueden desactivar.",
    "banner.cat.analytics.title": "Analíticas",
    "banner.cat.analytics.desc": "Nos permiten medir el tráfico y el comportamiento de los usuarios (Google Analytics con IP anonimizada).",
    "banner.cat.functional.title": "Funcionales",
    "banner.cat.functional.desc": "Guardan tus preferencias, como el idioma seleccionado, para mejorar tu experiencia.",
    "banner.always": "Siempre activas",
    "banner.powered": "Gestión de cookies conforme al RGPD",
    "nav.services": "Servicios",
    "nav.method": "Método",
    "nav.successes": "Éxitos",
    "nav.plans": "Precios",
    "nav.contact": "Contacto",
    "nav.login": "Login",
    "nav.start": "¿Contactamos?",
    "portal.title": "Portal del Cliente",
    "portal.notifications": "Notificaciones",
    // Legal Notice
    "legal.back": "← KINETORA",
    "legal.title": "AVISO LEGAL",
    "legal.subtitle": "Información legal sobre el titular del sitio web y condiciones de uso.",
    "legal.updated": "ÚLTIMA ACTUALIZACIÓN: MARZO 2026",
    "legal.s1.title": "1. IDENTIFICACIÓN DEL TITULAR",
    "legal.s1.p1": "En cumplimiento con la Ley 34/2002 de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos del titular del sitio web:",
    "legal.s1.company": "Razón social",
    "legal.s1.address": "Domicilio social",
    "legal.s1.cif": "CIF/NIF",
    "legal.s1.cif.val": "Registro en trámite",
    "legal.s1.email": "Correo electrónico",
    "legal.s1.web": "Sitio web",
    "legal.s2.title": "2. OBJETO Y ÁMBITO DE APLICACIÓN",
    "legal.s2.p1": 'Este Aviso Legal regula el acceso y uso del sitio web https://kinetora.tech (en adelante, "el Sitio Web"), titularidad de Kinetora Studio S.L.',
    "legal.s2.p2": "El acceso y/o uso de este Sitio Web atribuye la condición de usuario e implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal, Política de Privacidad y Política de Cookies vigentes en el momento en que el usuario acceda al Sitio Web.",
    "legal.s3.title": "3. PROPIEDAD INTELECTUAL E INDUSTRIAL",
    "legal.s3.p1": "Todos los contenidos del Sitio Web, tales como textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, constituyen una obra cuya propiedad pertenece a Kinetora Studio S.L., sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación sobre los mismos más allá de lo estrictamente necesario para el uso correcto del Sitio Web.",
    "legal.s3.p2": "Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación, por cualquier procedimiento, de la totalidad o parte de los contenidos de este Sitio Web con fines comerciales sin la autorización expresa y por escrito de Kinetora Studio S.L.",
    "legal.s4.title": "4. RESPONSABILIDAD",
    "legal.s4.p1": "Kinetora Studio S.L. no se hace responsable de los daños o perjuicios de cualquier naturaleza que pudieran derivarse del acceso o uso del Sitio Web, de la información o contenidos en él incluidos, o de los servicios prestados a través del mismo, incluyendo a título enunciativo y no limitativo errores u omisiones en los contenidos, falta de disponibilidad del portal, o la transmisión de virus o programas maliciosos.",
    "legal.s5.title": "5. LEGISLACIÓN APLICABLE Y JURISDICCIÓN",
    "legal.s5.p1": "El presente Aviso Legal se rige en todos sus extremos por la legislación española. Para la resolución de cualquier conflicto que pudiera derivarse del acceso al Sitio Web, las partes acuerdan someterse expresamente a los Juzgados y Tribunales competentes conforme a la normativa vigente.",
    "legal.s6.title": "6. MODIFICACIONES",
    "legal.s6.p1": "Kinetora Studio S.L. se reserva el derecho de efectuar, sin previo aviso, las modificaciones que considere oportunas en el Sitio Web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios prestados a través del mismo como la forma en la que éstos aparezcan presentados o localizados en el Sitio Web.",
    // Privacy Policy
    "privacy.title": "POLÍTICA DE PRIVACIDAD",
    "privacy.subtitle": "Tu privacidad es importante para nosotros. Aquí te explicamos cómo tratamos tus datos personales.",
    "privacy.s1.title": "1. RESPONSABLE DEL TRATAMIENTO",
    "privacy.s1.l1.label": "Responsable",
    "privacy.s1.l1.value": "Kinetora Studio S.L.",
    "privacy.s1.l2.label": "Email",
    "privacy.s1.l2.value": "hola@kinetora.tech",
    "privacy.s1.l3.label": "Actividad",
    "privacy.s1.l3.value": "Agencia creativa de diseño, desarrollo y estrategia digital",
    "privacy.s2.title": "2. DATOS QUE RECOPILAMOS",
    "privacy.s2.p1": "Recopilamos distintos tipos de información personal cuando interactúas con nosotros:",
    "privacy.s2.subtitle1": "Datos facilitados directamente:",
    "privacy.s2.l1": "Nombre y apellidos",
    "privacy.s2.l2": "Dirección de correo electrónico",
    "privacy.s2.l3": "Nombre de empresa",
    "privacy.s2.l4": "Información del proyecto y presupuesto",
    "privacy.s2.l5": "Mensajes e información de contacto",
    "privacy.s2.subtitle2": "Datos de navegación:",
    "privacy.s2.p2": "Datos técnicos de acceso como dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia, recopilados a través de cookies y tecnologías similares según nuestra Política de Cookies.",
    "privacy.s3.title": "3. FINALIDADES Y BASES LEGALES DEL TRATAMIENTO",
    "privacy.s3.col.finalidad": "FINALIDAD",
    "privacy.s3.col.base": "BASE LEGAL",
    "privacy.s3.col.plazo": "PLAZO",
    "privacy.s3.r1.finalidad": "Gestión de solicitudes de contacto y presupuestos",
    "privacy.s3.r1.base": "Interés legítimo / Consentimiento",
    "privacy.s3.r1.plazo": "3 años",
    "privacy.s3.r2.finalidad": "Envío de newsletter y comunicaciones comerciales",
    "privacy.s3.r2.base": "Consentimiento expreso",
    "privacy.s3.r2.plazo": "Hasta retirar consentimiento",
    "privacy.s3.r3.finalidad": "Análisis y mejora del sitio web",
    "privacy.s3.r3.base": "Interés legítimo",
    "privacy.s3.r3.plazo": "26 meses",
    "privacy.s3.r4.finalidad": "Cumplimiento de obligaciones legales",
    "privacy.s3.r4.base": "Obligación legal",
    "privacy.s3.r4.plazo": "Según normativa",
    "privacy.s4.title": "4. DESTINATARIOS DE LOS DATOS",
    "privacy.s4.p1": "No cedemos ni vendemos tus datos personales a terceros con fines comerciales. Únicamente compartimos datos con los siguientes encargados del tratamiento:",
    "privacy.s4.l1": "Proveedor de hosting (servidores en la UE)",
    "privacy.s4.l2": "Google Analytics (con IP anonimizada)",
    "privacy.s4.l3": "ClickUp (gestión de proyectos)",
    "privacy.s4.l4": "Slack (comunicación interna)",
    "privacy.s5.title": "5. TRANSFERENCIAS INTERNACIONALES",
    "privacy.s5.p1": "Algunos de nuestros proveedores pueden estar ubicados fuera del Espacio Económico Europeo (EEE). En tales casos, garantizamos la existencia de garantías adecuadas mediante la adopción de cláusulas contractuales tipo aprobadas por la Comisión Europea.",
    "privacy.s6.title": "6. TUS DERECHOS",
    "privacy.s6.p1": "Puedes ejercer los siguientes derechos enviando un email a hola@kinetora.tech con tu nombre y una copia de tu documento de identidad:",
    "privacy.s6.r1.title": "Acceso",
    "privacy.s6.r1.desc": "Conocer qué datos tratamos sobre ti",
    "privacy.s6.r2.title": "Rectificación",
    "privacy.s6.r2.desc": "Corregir datos incorrectos o incompletos",
    "privacy.s6.r3.title": "Supresión",
    "privacy.s6.r3.desc": "Solicitar la eliminación de tus datos",
    "privacy.s6.r4.title": "Oposición",
    "privacy.s6.r4.desc": "Oponerte al tratamiento de tus datos",
    "privacy.s6.r5.title": "Limitación",
    "privacy.s6.r5.desc": "Restringir el tratamiento de tus datos",
    "privacy.s6.r6.title": "Portabilidad",
    "privacy.s6.r6.desc": "Recibir tus datos en formato estructurado",
    "privacy.s6.aepd": "Si consideras que el tratamiento de tus datos no es adecuado, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en",
    "privacy.s7.title": "7. SEGURIDAD DE LOS DATOS",
    "privacy.s7.p1": "Aplicamos medidas técnicas y organizativas adecuadas para garantizar la seguridad de tus datos personales y evitar su pérdida, alteración, acceso no autorizado o tratamiento ilícito, de conformidad con lo establecido en el RGPD y la LOPDGDD.",
    // Cookie Policy
    "cookie.title": "POLÍTICA DE COOKIES",
    "cookie.subtitle": "Información sobre las cookies que utilizamos y cómo gestionarlas.",
    "cookie.intro1": "Esta Política de Cookies explica qué son las cookies, cómo las utilizamos y tus opciones para gestionarlas.",
    "cookie.intro2": "En Kinetora Studio utilizamos cookies para mejorar tu experiencia de navegación, analizar el tráfico del sitio y ofrecerte un contenido más personalizado. Al continuar navegando por nuestro sitio web, aceptas el uso de cookies de acuerdo con esta política.",
    "cookie.s1.title": "1. ¿QUÉ SON LAS COOKIES Y QUÉ TIPOS UTILIZAMOS?",
    "cookie.s1.p1": "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo al visitar un sitio web. Utilizamos los siguientes tipos:",
    "cookie.s2.title": "2. TIPOS DE COOKIES",
    "cookie.types.tech": "Cookies Técnicas",
    "cookie.types.tech.desc": "Son imprescindibles para el correcto funcionamiento del sitio web. No pueden desactivarse ya que sin ellas el sitio no funcionaría correctamente. No recogen información con fines de marketing.",
    "cookie.types.func": "Cookies Funcionales",
    "cookie.types.func.desc": "Permiten recordar tus preferencias (como el idioma seleccionado) para ofrecerte una experiencia más personalizada.",
    "cookie.types.anal": "Cookies Analíticas",
    "cookie.types.anal.desc": "Nos permiten analizar el comportamiento de los usuarios para mejorar el sitio web. Los datos recogidos son anónimos y no permiten identificar a usuarios concretos.",
    "cookie.s3.title": "3. COOKIES UTILIZADAS EN ESTE SITIO WEB",
    "cookie.table.name": "NOMBRE",
    "cookie.table.type": "TIPO",
    "cookie.table.provider": "PROVEEDOR",
    "cookie.table.purpose": "FINALIDAD",
    "cookie.table.duration": "DURACIÓN",
    "cookie.table.row1.name": "_ga, _gid, _gat",
    "cookie.table.row1.type": "Analítica",
    "cookie.table.row1.provider": "Google Analytics",
    "cookie.table.row1.purpose": "Análisis del comportamiento del usuario en el sitio web (visitas, páginas vistas, duración).",
    "cookie.table.row1.duration": "2 años / 24 horas / 1 minuto",
    "cookie.table.row2.name": "cookieconsent_status",
    "cookie.table.row2.type": "Técnica",
    "cookie.table.row2.provider": "Kinetora Studio",
    "cookie.table.row2.purpose": "Almacena las preferencias de cookies del usuario.",
    "cookie.table.row2.duration": "1 año",
    "cookie.table.row3.name": "i18nextLng",
    "cookie.table.row3.type": "Funcional",
    "cookie.table.row3.provider": "Kinetora Studio",
    "cookie.table.row3.purpose": "Guarda el idioma preferido del usuario.",
    "cookie.table.row3.duration": "Persistente",
    "cookie.s4.title": "4. CÓMO GESTIONAR LAS COOKIES",
    "cookie.s4.p1": "Puedes gestionar las cookies a través de la configuración de tu navegador. A continuación encontrarás los enlaces a las instrucciones de los principales navegadores:",
    "cookie.s4.note": "Ten en cuenta que deshabilitar las cookies puede afectar al correcto funcionamiento de algunas secciones de este sitio web.",
    "cookie.manage.chrome": "Google Chrome",
    "cookie.manage.chrome.url": "https://support.google.com/chrome/answer/95647",
    "cookie.manage.firefox": "Mozilla Firefox",
    "cookie.manage.firefox.url": "https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web",
    "cookie.manage.safari": "Safari",
    "cookie.manage.safari.url": "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
    "cookie.manage.edge": "Microsoft Edge",
    "cookie.manage.edge.url": "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
    "cookie.manage.opera": "Opera",
    "cookie.manage.opera.url": "https://help.opera.com/en/latest/web-preferences/#cookies",
    "cookie.s5.title": "5. ACTUALIZACIONES DE ESTA POLÍTICA",
    "cookie.s5.p1": "Podemos actualizar esta Política de Cookies para reflejar cambios en las cookies que usamos o por otros motivos operativos, legales o normativos. Te recomendamos que revises esta página periódicamente para estar informado de cómo usamos las cookies.",
    // Social Media Privacy Policy
    "social.title": "POLÍTICA DE PRIVACIDAD EN REDES SOCIALES",
    "social.subtitle": "Cómo gestionamos la privacidad en nuestras páginas de redes sociales.",
    "social.s1.title": "1. NUESTROS PERFILES",
    "social.s1.p1": "Presencia activa en: Instagram, TikTok, X (Twitter), YouTube, Facebook (@kinetora_studio / Kinetora Studio).",
    "social.profile.ig": "Instagram",
    "social.profile.tk": "TikTok",
    "social.profile.x": "X (Twitter)",
    "social.profile.yt": "YouTube",
    "social.profile.fb": "Facebook",
    "social.profile.handle": "@kinetora_studio",
    "social.s2.title": "2. RESPONSABILIDAD Y TRATAMIENTO DE DATOS EN REDES SOCIALES",
    "social.s2.p1": "Las plataformas de redes sociales son responsables del tratamiento de los datos de sus usuarios conforme a sus propias políticas de privacidad. Kinetora Studio S.L. actúa como responsable del tratamiento únicamente de los datos que recibe directamente a través de las interacciones en sus páginas (mensajes directos, comentarios, menciones, etc.).",
    "social.s2.p2": "En ningún caso Kinetora Studio S.L. extrae ni almacena datos de perfiles de usuarios de redes sociales sin su consentimiento expreso.",
    "social.s3.title": "3. FINALIDAD DEL USO DE LAS REDES SOCIALES",
    "social.s3.p1": "Kinetora Studio S.L. utiliza sus perfiles en redes sociales con las siguientes finalidades:",
    "social.s3.l1": "Publicar contenido relacionado con nuestros servicios, proyectos y noticias del sector.",
    "social.s3.l2": "Interactuar con nuestra comunidad de seguidores y clientes.",
    "social.s3.l3": "Atender consultas y solicitudes de información.",
    "social.s3.l4": "Promover nuestros servicios de diseño, desarrollo y estrategia digital.",
    "social.s4.title": "4. INTERACCIONES DE LOS USUARIOS",
    "social.s4.b1.title": "Comentarios públicos",
    "social.s4.b1.text": "Cualquier interacción pública que realices en nuestras páginas (comentarios, me gusta, menciones) es visible para el resto de usuarios. Te recomendamos no compartir información personal en comentarios públicos.",
    "social.s4.b2.title": "Mensajes directos",
    "social.s4.b2.text": "Los mensajes privados que nos envíes serán utilizados exclusivamente para atender tu consulta y no serán compartidos con terceros sin tu consentimiento, salvo obligación legal.",
    "social.s4.b3.title": "Datos de comportamiento",
    "social.s4.b3.text": "Las plataformas de redes sociales pueden recoger datos sobre tu comportamiento en sus plataformas (visitas a perfiles, interacciones, etc.). Esta recopilación es responsabilidad exclusiva de la plataforma correspondiente.",
    "social.s5.title": "5. POLÍTICAS DE PRIVACIDAD DE LAS PLATAFORMAS",
    "social.s5.p1": "Te recomendamos consultar las políticas de privacidad de cada plataforma para comprender cómo procesan tus datos:",
    "social.s5.see": "Ver política",
    "social.platform.ig.url": "https://privacycenter.instagram.com/policy",
    "social.platform.tk.url": "https://www.tiktok.com/legal/page/eea/privacy-policy/es",
    "social.platform.x.url": "https://twitter.com/en/privacy",
    "social.platform.yt.url": "https://policies.google.com/privacy",
    "social.platform.fb.url": "https://www.facebook.com/privacy/policy",
    "social.s6.title": "6. EJERCICIO DE DERECHOS",
    "social.s6.p1": "Para ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación o portabilidad respecto a los datos que Kinetora Studio S.L. haya podido recibir a través de redes sociales, puedes contactarnos en:",
    "social.s6.email": "hola@kinetora.tech",
    "social.s6.subject": 'Indica en el asunto: "Ejercicio de derechos RRSS"',
    "social.s6.note": "Para ejercer los derechos respecto a los datos tratados directamente por las plataformas, deberás dirigirte a cada plataforma conforme a sus propias políticas."
  },
  en: {
    "lang.es": "Spanish",
    "lang.en": "English",
    "lang.switch": "Language",
    // Cookie Banner
    "banner.title": "We use cookies",
    "banner.desc": "We use technical (necessary), analytical and functional cookies to improve your experience. You can accept all, reject optional ones or manage your preferences.",
    "banner.accept": "Accept all",
    "banner.reject": "Technical only",
    "banner.manage": "Manage",
    "banner.save": "Save preferences",
    "banner.link.cookies": "Cookie Policy",
    "banner.link.privacy": "Privacy Policy",
    "banner.cat.tech.title": "Technical",
    "banner.cat.tech.desc": "Necessary for the site to function correctly. Cannot be disabled.",
    "banner.cat.analytics.title": "Analytics",
    "banner.cat.analytics.desc": "Allow us to measure traffic and user behavior (Google Analytics with anonymized IP).",
    "banner.cat.functional.title": "Functional",
    "banner.cat.functional.desc": "Store your preferences, such as your selected language, to improve your experience.",
    "banner.always": "Always active",
    "banner.powered": "Cookie management compliant with GDPR",
    "nav.services": "Services",
    "nav.method": "How it works",
    "nav.successes": "Case studies",
    "nav.plans": "Pricing",
    "nav.contact": "Contact",
    "nav.login": "Log in",
    "nav.start": "Let's talk",
    "portal.title": "Client Portal",
    "portal.notifications": "Notifications",
    // Legal Notice
    "legal.back": "← KINETORA",
    "legal.title": "LEGAL NOTICE",
    "legal.subtitle": "Legal information about the website owner and conditions of use.",
    "legal.updated": "LAST UPDATED: MARCH 2026",
    "legal.s1.title": "1. OWNER IDENTIFICATION",
    "legal.s1.p1": "In compliance with Law 34/2002 of July 11, on Services of the Information Society and Electronic Commerce (LSSI-CE), the following data of the website owner is provided:",
    "legal.s1.company": "Company name",
    "legal.s1.address": "Registered address",
    "legal.s1.cif": "CIF/NIF",
    "legal.s1.cif.val": "Registration in progress",
    "legal.s1.email": "Email",
    "legal.s1.web": "Website",
    "legal.s2.title": "2. PURPOSE AND SCOPE",
    "legal.s2.p1": 'This Legal Notice regulates access to and use of the website https://kinetora.tech (hereinafter, "the Website"), owned by Kinetora Studio S.L.',
    "legal.s2.p2": "Access to and/or use of this Website confers the status of user and implies full and unreserved acceptance of all of the provisions included in this Legal Notice, Privacy Policy and Cookie Policy in force at any time the user accesses the Website.",
    "legal.s3.title": "3. INTELLECTUAL AND INDUSTRIAL PROPERTY",
    "legal.s3.p1": "All content on the Website, such as texts, photographs, graphics, images, icons, technology, software, links and other audiovisual or sound content, as well as its graphic design and source codes, constitute a work whose property belongs to Kinetora Studio S.L., without any exploitation rights being considered assigned to the user beyond what is strictly necessary for the correct use of the Website.",
    "legal.s3.p2": "Reproduction, distribution, public communication, transformation or any other form of exploitation, by any means, of all or part of the content of this Website for commercial purposes is expressly prohibited without the express written authorization of Kinetora Studio S.L.",
    "legal.s4.title": "4. LIABILITY",
    "legal.s4.p1": "Kinetora Studio S.L. shall not be liable for damages of any kind that may result from access to or use of the Website, the information or content included therein, or the services provided through it, including but not limited to errors or omissions in content, lack of portal availability, or the transmission of viruses or malicious programs.",
    "legal.s5.title": "5. APPLICABLE LAW AND JURISDICTION",
    "legal.s5.p1": "This Legal Notice is governed in all its aspects by Spanish law. For the resolution of any conflict that may arise from access to the Website, the parties expressly agree to submit to the competent Courts and Tribunals in accordance with current regulations.",
    "legal.s6.title": "6. MODIFICATIONS",
    "legal.s6.p1": "Kinetora Studio S.L. reserves the right to make, without prior notice, such modifications as it deems appropriate to the Website, being able to change, delete or add both the content and services provided through it and the way in which these appear presented or located on the Website.",
    // Privacy Policy
    "privacy.title": "PRIVACY POLICY",
    "privacy.subtitle": "Your privacy matters to us. Here we explain how we process your personal data.",
    "privacy.s1.title": "1. DATA CONTROLLER",
    "privacy.s1.l1.label": "Controller",
    "privacy.s1.l1.value": "Kinetora Studio S.L.",
    "privacy.s1.l2.label": "Email",
    "privacy.s1.l2.value": "hola@kinetora.tech",
    "privacy.s1.l3.label": "Activity",
    "privacy.s1.l3.value": "Creative agency for design, development and digital strategy",
    "privacy.s2.title": "2. DATA WE COLLECT",
    "privacy.s2.p1": "We collect different types of personal information when you interact with us:",
    "privacy.s2.subtitle1": "Directly provided data:",
    "privacy.s2.l1": "Full name",
    "privacy.s2.l2": "Email address",
    "privacy.s2.l3": "Company name",
    "privacy.s2.l4": "Project information and budget",
    "privacy.s2.l5": "Messages and contact information",
    "privacy.s2.subtitle2": "Browsing data:",
    "privacy.s2.p2": "Technical access data such as IP address, browser type, pages visited and time spent, collected through cookies and similar technologies as per our Cookie Policy.",
    "privacy.s3.title": "3. PURPOSES AND LEGAL BASIS FOR PROCESSING",
    "privacy.s3.col.finalidad": "PURPOSE",
    "privacy.s3.col.base": "LEGAL BASIS",
    "privacy.s3.col.plazo": "RETENTION",
    "privacy.s3.r1.finalidad": "Managing contact requests and proposals",
    "privacy.s3.r1.base": "Legitimate interest / Consent",
    "privacy.s3.r1.plazo": "3 years",
    "privacy.s3.r2.finalidad": "Newsletter and commercial communications",
    "privacy.s3.r2.base": "Explicit consent",
    "privacy.s3.r2.plazo": "Until withdrawal",
    "privacy.s3.r3.finalidad": "Website analysis and improvement",
    "privacy.s3.r3.base": "Legitimate interest",
    "privacy.s3.r3.plazo": "26 months",
    "privacy.s3.r4.finalidad": "Compliance with legal obligations",
    "privacy.s3.r4.base": "Legal obligation",
    "privacy.s3.r4.plazo": "As per regulations",
    "privacy.s4.title": "4. DATA RECIPIENTS",
    "privacy.s4.p1": "We do not sell or transfer your personal data to third parties for commercial purposes. We only share data with the following data processors:",
    "privacy.s4.l1": "Hosting provider (servers in the EU)",
    "privacy.s4.l2": "Google Analytics (with anonymized IP)",
    "privacy.s4.l3": "ClickUp (project management)",
    "privacy.s4.l4": "Slack (internal communications)",
    "privacy.s5.title": "5. INTERNATIONAL TRANSFERS",
    "privacy.s5.p1": "Some of our providers may be located outside the European Economic Area (EEA). In such cases, we ensure appropriate safeguards through the adoption of Standard Contractual Clauses approved by the European Commission.",
    "privacy.s6.title": "6. YOUR RIGHTS",
    "privacy.s6.p1": "You can exercise the following rights by sending an email to hola@kinetora.tech with your name and a copy of your ID:",
    "privacy.s6.r1.title": "Access",
    "privacy.s6.r1.desc": "Find out what data we process about you",
    "privacy.s6.r2.title": "Rectification",
    "privacy.s6.r2.desc": "Correct inaccurate or incomplete data",
    "privacy.s6.r3.title": "Erasure",
    "privacy.s6.r3.desc": "Request deletion of your personal data",
    "privacy.s6.r4.title": "Objection",
    "privacy.s6.r4.desc": "Object to the processing of your data",
    "privacy.s6.r5.title": "Restriction",
    "privacy.s6.r5.desc": "Restrict how your data is processed",
    "privacy.s6.r6.title": "Portability",
    "privacy.s6.r6.desc": "Receive your data in a structured format",
    "privacy.s6.aepd": "If you believe the processing of your data is not adequate, you may file a complaint with the Spanish Data Protection Agency (AEPD) at",
    "privacy.s7.title": "7. DATA SECURITY",
    "privacy.s7.p1": "We apply appropriate technical and organizational measures to ensure the security of your personal data and prevent its loss, alteration, unauthorized access or unlawful processing, in accordance with the GDPR and LOPDGDD.",
    // Cookie Policy
    "cookie.title": "COOKIE POLICY",
    "cookie.subtitle": "Information about the cookies we use and how you can manage them.",
    "cookie.intro1": "This Cookie Policy explains what cookies are, how we use them and your options for managing them.",
    "cookie.intro2": "At Kinetora Studio we use cookies to improve your browsing experience, analyze website traffic and offer you more personalized content. By continuing to browse our website, you accept the use of cookies in accordance with this policy.",
    "cookie.s1.title": "1. WHAT ARE COOKIES AND WHAT TYPES DO WE USE?",
    "cookie.s1.p1": "Cookies are small text files stored on your device when you visit a website. We use the following types:",
    "cookie.s2.title": "2. TYPES OF COOKIES",
    "cookie.types.tech": "Technical Cookies",
    "cookie.types.tech.desc": "These are essential for the correct functioning of the website. They cannot be disabled as the site would not work without them. They do not collect information for marketing purposes.",
    "cookie.types.func": "Functional Cookies",
    "cookie.types.func.desc": "These allow us to remember your preferences (such as your selected language) to offer you a more personalized experience.",
    "cookie.types.anal": "Analytical Cookies",
    "cookie.types.anal.desc": "These allow us to analyze user behavior to improve the website. The data collected is anonymous and does not allow individual users to be identified.",
    "cookie.s3.title": "3. COOKIES USED ON THIS WEBSITE",
    "cookie.table.name": "NAME",
    "cookie.table.type": "TYPE",
    "cookie.table.provider": "PROVIDER",
    "cookie.table.purpose": "PURPOSE",
    "cookie.table.duration": "DURATION",
    "cookie.table.row1.name": "_ga, _gid, _gat",
    "cookie.table.row1.type": "Analytical",
    "cookie.table.row1.provider": "Google Analytics",
    "cookie.table.row1.purpose": "Analysis of user behavior on the website (visits, page views, duration).",
    "cookie.table.row1.duration": "2 years / 24 hours / 1 minute",
    "cookie.table.row2.name": "cookieconsent_status",
    "cookie.table.row2.type": "Technical",
    "cookie.table.row2.provider": "Kinetora Studio",
    "cookie.table.row2.purpose": "Stores the user's cookie preferences.",
    "cookie.table.row2.duration": "1 year",
    "cookie.table.row3.name": "i18nextLng",
    "cookie.table.row3.type": "Functional",
    "cookie.table.row3.provider": "Kinetora Studio",
    "cookie.table.row3.purpose": "Saves the user's preferred language.",
    "cookie.table.row3.duration": "Persistent",
    "cookie.s4.title": "4. HOW TO MANAGE COOKIES",
    "cookie.s4.p1": "You can manage cookies through your browser settings. Below you will find links to instructions for the main browsers:",
    "cookie.s4.note": "Please note that disabling cookies may affect the correct functioning of some sections of this website.",
    "cookie.manage.chrome": "Google Chrome",
    "cookie.manage.chrome.url": "https://support.google.com/chrome/answer/95647",
    "cookie.manage.firefox": "Mozilla Firefox",
    "cookie.manage.firefox.url": "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences",
    "cookie.manage.safari": "Safari",
    "cookie.manage.safari.url": "https://support.apple.com/en-gb/guide/safari/sfri11471/mac",
    "cookie.manage.edge": "Microsoft Edge",
    "cookie.manage.edge.url": "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
    "cookie.manage.opera": "Opera",
    "cookie.manage.opera.url": "https://help.opera.com/en/latest/web-preferences/#cookies",
    "cookie.s5.title": "5. UPDATES TO THIS POLICY",
    "cookie.s5.p1": "We may update this Cookie Policy to reflect changes in the cookies we use or for other operational, legal or regulatory reasons. We recommend you review this page periodically to stay informed about how we use cookies.",
    // Social Media Privacy Policy
    "social.title": "SOCIAL MEDIA PRIVACY POLICY",
    "social.subtitle": "Information about how we manage privacy on our social media pages and profiles.",
    "social.s1.title": "1. OUR SOCIAL MEDIA PROFILES",
    "social.s1.p1": "Active presence on: Instagram, TikTok, X (Twitter), YouTube, Facebook (@kinetora_studio / Kinetora Studio).",
    "social.profile.ig": "Instagram",
    "social.profile.tk": "TikTok",
    "social.profile.x": "X (Twitter)",
    "social.profile.yt": "YouTube",
    "social.profile.fb": "Facebook",
    "social.profile.handle": "@kinetora_studio",
    "social.s2.title": "2. RESPONSIBILITY AND DATA PROCESSING",
    "social.s2.p1": "Platforms are responsible per their policies. Kinetora Studio S.L. is controller only for direct interactions (messages, comments). No data extraction without consent.",
    "social.s3.title": "3. PURPOSE OF SOCIAL MEDIA USE",
    "social.s3.p1": "Publish content, interact, respond to inquiries, promote services and share success cases."
  }
};
const I18nContext = createContext(null);
const STORAGE_KEY$1 = "kinetora.lang";
function getInitialLang() {
  if (typeof window === "undefined") return "en";
  const serverLang = window.__KINETORA_LANG__;
  if (serverLang === "es" || serverLang === "en") {
    return serverLang;
  }
  return "en";
}
function interpolate(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
const I18nProvider = ({ children, serverLang }) => {
  const [lang, setLangState] = useState(() => {
    if (serverLang) return serverLang;
    return getInitialLang();
  });
  const [isHydrated, setIsHydrated] = useState(false);
  const setLang = (next) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY$1, next);
    } catch {
    }
  };
  useEffect(() => {
    setIsHydrated(true);
    document.documentElement.lang = lang;
    if (!serverLang) {
      const stored = window.localStorage.getItem(STORAGE_KEY$1);
      if (stored === "es" || stored === "en") {
        setLangState(stored);
      } else {
        const hostname = window.location.hostname;
        if (hostname.endsWith(".es")) setLangState("es");
        else if (hostname.endsWith(".tech")) setLangState("en");
        else {
          const nav = navigator.language;
          if (nav.toLowerCase().startsWith("es")) setLangState("es");
        }
      }
    }
  }, []);
  useEffect(() => {
    if (isHydrated) {
      document.documentElement.lang = lang;
    }
  }, [lang, isHydrated]);
  const value = useMemo(() => {
    const dict = dictionaries[lang] ?? {};
    return {
      lang,
      setLang,
      t: (key, vars) => interpolate(dict[key] ?? key, vars)
    };
  }, [lang]);
  return /* @__PURE__ */ jsx(I18nContext.Provider, { value, children });
};
function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const FlagIcon = ({ lang, className }) => {
  if (lang === "es") {
    return /* @__PURE__ */ jsx(
      "span",
      {
        className: cn(
          "inline-flex h-5 w-5 overflow-hidden rounded-full ring-1 ring-white/15",
          className
        ),
        "aria-hidden": true,
        children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", className: "h-full w-full", children: [
          /* @__PURE__ */ jsx("rect", { width: "24", height: "24", fill: "#AA151B" }),
          /* @__PURE__ */ jsx("rect", { y: "6", width: "24", height: "12", fill: "#F1BF00" })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "inline-flex h-5 w-5 overflow-hidden rounded-full ring-1 ring-white/15",
        className
      ),
      "aria-hidden": true,
      children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", className: "h-full w-full", children: [
        /* @__PURE__ */ jsx("rect", { width: "24", height: "24", fill: "#FFFFFF" }),
        Array.from({ length: 13 }).map((_, i) => {
          const y = 24 / 13 * i;
          const h = 24 / 13;
          const isRed = i % 2 === 0;
          return isRed ? /* @__PURE__ */ jsx("rect", { x: "0", y, width: "24", height: h, fill: "#B22234" }, i) : null;
        }),
        /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: "11.2", height: "9.2", fill: "#3C3B6E" }),
        Array.from({ length: 12 }).map((_, i) => {
          const cols = 4;
          const r = 0.55;
          const padX = 1.2;
          const padY = 1.1;
          const gapX = 2.4;
          const gapY = 2.2;
          const cx = padX + i % cols * gapX;
          const cy = padY + Math.floor(i / cols) * gapY;
          return /* @__PURE__ */ jsx("circle", { cx, cy, r, fill: "#FFFFFF", opacity: "0.95" }, i);
        })
      ] })
    }
  );
};
const LanguageSwitcher = ({
  triggerClassName,
  contentClassName,
  hideOnSmall
}) => {
  const { lang, setLang, t } = useI18n();
  return /* @__PURE__ */ jsxs(DropdownMenu, { modal: false, children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": t("lang.switch"),
        className: cn(
          "relative flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]",
          "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20",
          hideOnSmall && "hidden sm:inline-flex",
          triggerClassName
        ),
        children: /* @__PURE__ */ jsx(FlagIcon, { lang, className: "h-[18px] w-[18px]" })
      }
    ) }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        align: "end",
        className: cn(
          "bg-[#111111] border-white/10 text-[#F5F5F5] rounded-2xl p-1 min-w-[190px]",
          contentClassName
        ),
        children: [
          /* @__PURE__ */ jsx(
            DropdownMenuItem,
            {
              onClick: () => setLang("es"),
              className: "rounded-xl focus:bg-white/[0.06] cursor-pointer",
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FlagIcon, { lang: "es" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: t("lang.es") })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            DropdownMenuItem,
            {
              onClick: () => setLang("en"),
              className: "rounded-xl focus:bg-white/[0.06] cursor-pointer",
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FlagIcon, { lang: "en" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: t("lang.en") })
              ] })
            }
          )
        ]
      }
    )
  ] });
};
const LanguagePills = ({ className }) => {
  const { lang, setLang, t } = useI18n();
  const pillBase = "h-11 px-4 rounded-full border text-[11px] font-black tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]";
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setLang("es"),
        className: cn(
          pillBase,
          "inline-flex items-center gap-2",
          lang === "es" ? "bg-[#B454FF]/18 border-[#B454FF]/30 text-[#F5F5F5]" : "bg-white/[0.03] border-white/10 text-[#F5F5F5]/75 hover:bg-white/[0.06] hover:text-[#F5F5F5]"
        ),
        children: [
          /* @__PURE__ */ jsx(FlagIcon, { lang: "es", className: "h-[18px] w-[18px]" }),
          t("lang.es")
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setLang("en"),
        className: cn(
          pillBase,
          "inline-flex items-center gap-2",
          lang === "en" ? "bg-[#B454FF]/18 border-[#B454FF]/30 text-[#F5F5F5]" : "bg-white/[0.03] border-white/10 text-[#F5F5F5]/75 hover:bg-white/[0.06] hover:text-[#F5F5F5]"
        ),
        children: [
          /* @__PURE__ */ jsx(FlagIcon, { lang: "en", className: "h-[18px] w-[18px]" }),
          t("lang.en")
        ]
      }
    )
  ] });
};
const Navbar = () => {
  const { t, lang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { name: t("nav.services"), href: "#servicios" },
    { name: t("nav.method"), href: "#como-funciona" },
    // Éxitos: scroll suave al bloque de casos en la home
    { name: t("nav.successes"), href: "#casos" },
    { name: t("nav.plans"), href: "#precios" },
    { name: t("nav.contact"), href: "#contacto" }
  ];
  const activeId = useScrollSpy(["servicios", "como-funciona", "casos", "precios", "contacto"]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxs("nav", { className: "fixed top-0 z-50 w-full", "aria-label": lang === "es" ? "Navegación principal" : "Primary navigation", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: `absolute inset-0 pointer-events-none transition-all duration-300 ${scrolled ? "bg-[#0D0D0D] border-b border-[#2A2A2A]" : "bg-transparent border-b border-transparent"}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "kin-container nav-height-protection flex items-center justify-between py-4 md:py-6 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-start", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "hover:opacity-80 transition-opacity flex items-center", children: [
        /* @__PURE__ */ jsx(Logo, { className: "h-6 hidden md:flex" }),
        /* @__PURE__ */ jsx(KinetoraIcon, { className: "h-6 w-6 flex md:hidden" })
      ] }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "hidden md:flex items-center justify-center gap-6 lg:gap-10 text-[11px] lg:text-[12px] leading-none font-bold uppercase tracking-[0.2em] text-[#F5F5F5]/70 absolute left-1/2 -translate-x-1/2",
          role: "menubar",
          "aria-label": lang === "es" ? "Enlaces de sección" : "Section links",
          children: navLinks.map((link) => {
            const isActive = activeId === link.href.replace("#", "");
            return /* @__PURE__ */ jsx("span", { className: "relative", children: /* @__PURE__ */ jsx(
              SmoothScrollLink,
              {
                href: link.href,
                "aria-current": isActive ? "true" : void 0,
                className: `transition-colors hover:text-[#B454FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded px-1 -mx-1 ${isActive ? "text-[#B454FF]" : ""}`,
                children: link.name
              }
            ) }, link.name);
          })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center justify-end gap-2.5 md:gap-6 min-w-0", children: [
        /* @__PURE__ */ jsx(LanguageSwitcher, { hideOnSmall: true }),
        /* @__PURE__ */ jsx(Link, { to: "/#contacto", className: "shrink-0 hidden md:inline-flex", children: /* @__PURE__ */ jsx(PremiumButton, { variant: "primary", size: "md", className: "leading-none", children: t("nav.start").toUpperCase() }) }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsxs(Sheet, { children: [
          /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "text-[#F5F5F5] h-10 w-10 rounded-full kin-touch-target",
              "aria-label": lang === "es" ? "Abrir menú" : "Open menu",
              children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
            }
          ) }),
          /* @__PURE__ */ jsx(
            SheetContent,
            {
              side: "right",
              className: "bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5]",
              onOpenAutoFocus: () => document.body.setAttribute("data-sheet-open", "true"),
              onCloseAutoFocus: () => document.body.removeAttribute("data-sheet-open"),
              children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 mt-12", children: [
                navLinks.map((link) => /* @__PURE__ */ jsx(
                  SmoothScrollLink,
                  {
                    href: link.href,
                    className: "text-xl font-black uppercase transition-colors hover:text-[#B454FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded py-3 px-2 -mx-2 flex items-center kin-touch-target",
                    children: link.name
                  },
                  link.name
                )),
                /* @__PURE__ */ jsx(LanguagePills, {})
              ] })
            }
          )
        ] }) })
      ] })
    ] })
  ] });
};
function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
}
const ScrollParallax = ({ children, speed = 0.1, className = "", invert = false, delay = 0 }) => {
  const ref = useRef(null);
  const isMounted = useIsMounted();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yRange = invert ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed];
  const yTransform = useTransform(scrollYProgress, [0, 1], yRange);
  const y = useSpring(yTransform, {
    stiffness: 100,
    damping: 30,
    restDelta: 1e-3
  });
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      style: { y: isMounted ? y : 0, willChange: "transform" },
      className,
      children
    }
  );
};
const Starfield = () => {
  const canvasRef = useRef(null);
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }
  useEffect(() => {
    var _a, _b;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let isVisible = false;
    let fallbackFrameId;
    let fallbackStars = [];
    let worker = null;
    let observer;
    if ("OffscreenCanvas" in window && "transferControlToOffscreen" in canvas) {
      const workerCode = `
        let ctx;
        let canvas;
        let stars = [];
        let isVisible = false;
        let animationFrameId;

        const initStars = (width, height) => {
          stars = [];
          const numStars = (width * height) / 8000;
          for (let i = 0; i < numStars; i++) {
              stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.1 + 0.3,
                speed: Math.random() * 0.15 + 0.05,
                opacity: Math.random(),
                opacitySpeed: (Math.random() * 0.02) - 0.01
              });
          }
        };

        const animate = () => {
          if (!isVisible || !ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#ffffff";
          stars.forEach(star => {
            star.opacity += star.opacitySpeed;
            if (star.opacity <= 0.1 || star.opacity >= 1) {
              star.opacitySpeed = -star.opacitySpeed;
            }
            ctx.globalAlpha = star.opacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
          });
          animationFrameId = requestAnimationFrame(animate);
        };

        self.onmessage = (e) => {
          if (e.data.type === 'init') {
            canvas = e.data.canvas;
            ctx = canvas.getContext('2d');
            canvas.width = e.data.width;
            canvas.height = e.data.height;
            initStars(canvas.width, canvas.height);
          } else if (e.data.type === 'resize') {
            if (!canvas) return;
            canvas.width = e.data.width;
            canvas.height = e.data.height;
            initStars(canvas.width, canvas.height);
          } else if (e.data.type === 'visibility') {
            isVisible = e.data.isVisible;
            if (isVisible) {
               if (animationFrameId) cancelAnimationFrame(animationFrameId);
               animate();
            } else {
               if (animationFrameId) cancelAnimationFrame(animationFrameId);
            }
          }
        };
      `;
      const blob = new Blob([workerCode], { type: "application/javascript" });
      worker = new Worker(URL.createObjectURL(blob));
      const offscreen = canvas.transferControlToOffscreen();
      worker.postMessage({ type: "init", canvas: offscreen, width: (_a = canvas.parentElement) == null ? void 0 : _a.clientWidth, height: (_b = canvas.parentElement) == null ? void 0 : _b.clientHeight }, [offscreen]);
      const handleResize = () => {
        if (!canvas.parentElement) return;
        worker == null ? void 0 : worker.postMessage({ type: "resize", width: canvas.parentElement.clientWidth, height: canvas.parentElement.clientHeight });
      };
      window.addEventListener("resize", handleResize, { passive: true });
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          worker == null ? void 0 : worker.postMessage({ type: "visibility", isVisible: entry.isIntersecting });
        });
      });
      observer.observe(canvas);
      return () => {
        window.removeEventListener("resize", handleResize);
        observer.disconnect();
        worker == null ? void 0 : worker.terminate();
      };
    } else {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const resize = () => {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        initStars();
      };
      const initStars = () => {
        fallbackStars = [];
        const numStars = canvas.width * canvas.height / 8e3;
        for (let i = 0; i < numStars; i++) {
          fallbackStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.1 + 0.3,
            opacity: Math.random(),
            opacitySpeed: Math.random() * 0.02 - 0.01
          });
        }
      };
      const animate = () => {
        if (!isVisible) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        fallbackStars.forEach((star) => {
          star.opacity += star.opacitySpeed;
          if (star.opacity <= 0.1 || star.opacity >= 1) {
            star.opacitySpeed = -star.opacitySpeed;
          }
          ctx.globalAlpha = star.opacity;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fill();
        });
        fallbackFrameId = requestAnimationFrame(animate);
      };
      window.addEventListener("resize", resize, { passive: true });
      resize();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            animate();
          } else {
            cancelAnimationFrame(fallbackFrameId);
          }
        });
      });
      observer.observe(canvas);
      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(fallbackFrameId);
        observer.disconnect();
      };
    }
  }, []);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "absolute inset-0 w-full h-full pointer-events-none z-0",
      style: { mixBlendMode: "screen" },
      "aria-hidden": "true"
    }
  );
};
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}
class SafeHydration extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      hasError: false
    });
  }
  static getDerivedStateFromError(_) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn(`[SafeHydration] Component "${this.props.name || "Unknown"}" failed:`, error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}
const Hero = () => {
  const { lang } = useI18n();
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const isMounted = useIsMounted();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const blur = useTransform(scrollY, [0, 600], [0, 5]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.8]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const yBg = useTransform(scrollY, [0, 1e3], [0, -50]);
  const copy = lang === "es" ? {
    headlineTop: "El estudio que ayuda a startups",
    headlineAccent: "a levantar capital y convertir usuarios",
    sub: "Diseñamos el sistema visual completo — marca, web y producto — para que tu startup compita en la liga de las grandes desde el primer día.",
    pricingAnchor: "Planes desde 1.900€/mes · Sin permanencia · Pausa cuando quieras",
    ctaPrimary: "Contactar",
    ctaSecondary: "Éxitos",
    pills: [
      { Icon: Timer, text: "Entrega en 48h" },
      { Icon: RefreshCw, text: "Revisiones ilimitadas" },
      { Icon: Euro, text: "Precio mensual fijo" }
    ]
  } : {
    headlineTop: "The studio that helps startups",
    headlineAccent: "raise capital and convert users",
    sub: "We engineer the full visual system — brand, web and product — so your startup competes with the big players from day one.",
    pricingAnchor: "Plans from €1,900/mo · No lock-in · Pause anytime",
    ctaPrimary: "Let's talk",
    ctaSecondary: "Case studies",
    pills: [
      { Icon: Timer, text: "48h delivery" },
      { Icon: RefreshCw, text: "Unlimited revisions" },
      { Icon: Euro, text: "Fixed monthly price" }
    ]
  };
  const getNavbarOffset2 = () => {
    const nav = document.querySelector("nav");
    return ((nav == null ? void 0 : nav.offsetHeight) || 0) + 8;
  };
  const smoothScrollTo2 = (targetY, duration = 650) => {
    const startY = window.scrollY;
    const dist = targetY - startY;
    let start = null;
    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    function step(ts) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(1, elapsed / duration);
      const y = startY + dist * ease(progress);
      window.scrollTo(0, y);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteY = rect.top + window.scrollY - getNavbarOffset2();
    smoothScrollTo2(absoluteY);
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: sectionRef,
      className: "hero-section hero-content-protection sticky top-0 z-0 overflow-hidden bg-[#0D0D0D] min-h-[100dvh] flex flex-col will-change-transform",
      style: { willChange: "transform" },
      children: [
        /* @__PURE__ */ jsx(SafeHydration, { name: "HeroBackground", children: /* @__PURE__ */ jsxs(motion.div, { style: { opacity: !isMounted || isMobile ? 1 : opacity }, className: "absolute inset-0 z-0 overflow-hidden", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxs(motion.div, { style: !isMounted || isMobile ? {} : { y: yBg }, className: "liquid-bg-container", children: [
            /* @__PURE__ */ jsx("div", { className: `liquid-blob blob-purple ${!isMounted || isMobile ? "scale-75 opacity-40" : ""}` }),
            /* @__PURE__ */ jsx("div", { className: `liquid-blob blob-blue ${!isMounted || isMobile ? "scale-75 opacity-40" : ""}` }),
            (!isMounted || !isMobile) && /* @__PURE__ */ jsx("div", { className: "liquid-blob blob-coral" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/55 md:bg-black/45" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(13,13,13,0.85)_100%)]" }),
          (!isMounted || !isMobile) && /* @__PURE__ */ jsx(SafeHydration, { name: "Starfield", fallback: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20" }), children: /* @__PURE__ */ jsx(Starfield, {}) })
        ] }) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            style: !isMounted || isMobile ? {} : { scale, filter, opacity },
            className: "flex-1 flex flex-col relative z-10",
            children: /* @__PURE__ */ jsx("div", { className: "kin-container", children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative z-10 flex-1 min-h-[100dvh] flex flex-col items-center justify-center text-center",
                children: [
                  /* @__PURE__ */ jsxs("h1", { className: "mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 max-w-[280px] sm:max-w-none mx-auto", children: [
                    copy.headlineTop.replace(/\.$/, ""),
                    " ",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("span", { className: "inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#B454FF] via-[#9C3FEF] to-[#7C3AED] drop-shadow-[0_0_35px_rgba(180,84,255,0.35)] animate-pulse-slow", children: copy.headlineAccent.replace(/\.$/, "") })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/80 max-w-2xl leading-relaxed font-medium mb-4 animate-in fade-in fill-mode-both", children: copy.sub }),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "/precios",
                      className: "inline-flex items-center gap-2 mb-10 sm:mb-12 text-[11px] font-black tracking-[0.22em] uppercase text-[#B454FF]/80 hover:text-[#B454FF] transition-colors border-b border-[#B454FF]/30 hover:border-[#B454FF] pb-px animate-in fade-in fill-mode-both",
                      children: copy.pricingAnchor
                    }
                  ),
                  /* @__PURE__ */ jsx(ScrollParallax, { speed: 0.15, children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-800 delay-700 fill-mode-both",
                      children: [
                        /* @__PURE__ */ jsx(
                          PremiumButton,
                          {
                            variant: "primary",
                            size: "lg",
                            className: "w-full sm:w-auto hover:scale-[1.02] active:scale-95",
                            leftIcon: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" }),
                            onClick: () => handleScrollTo("contacto"),
                            children: copy.ctaPrimary.toUpperCase()
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          PremiumButton,
                          {
                            variant: "glass",
                            size: "lg",
                            className: "w-full sm:w-auto",
                            onClick: () => handleScrollTo("casos"),
                            children: copy.ctaSecondary.toUpperCase()
                          }
                        )
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(ScrollParallax, { speed: 0.1, children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "mt-6 sm:mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-4 md:gap-6 animate-in fade-in duration-1000 delay-1000 fill-mode-both",
                      children: copy.pills.map(({ Icon, text }, i) => /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.08] border border-white/[0.12] backdrop-blur-[16px] text-[#F5F5F5] shadow-[0_0_20px_rgba(0,0,0,0.25)] hover:bg-white/[0.14] hover:border-white/[0.25] hover:-translate-y-[1px] transition-all duration-300",
                          children: [
                            /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B454FF]" }),
                            /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] md:text-xs font-black tracking-[0.22em] uppercase", children: text })
                          ]
                        },
                        i
                      ))
                    }
                  ) })
                ]
              }
            ) })
          }
        )
      ]
    }
  );
};
function useReveal(opts = {}) {
  const ref = React__default.useRef(null);
  const [visible, setVisible] = React__default.useState(false);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  React__default.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced) {
      setVisible(true);
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (opts.once !== false) {
              io.disconnect();
            }
          }
        });
      },
      {
        root: null,
        rootMargin: opts.rootMargin ?? "0px 0px -10% 0px",
        threshold: opts.threshold ?? 0.1
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts.once, opts.rootMargin, opts.threshold, prefersReduced]);
  return { ref, visible };
}
const Reveal = ({ as = "div", delayMs = 0, className, style, children, ...rest }) => {
  const { ref, visible } = useReveal();
  const Tag = as;
  const [isReady, setIsReady] = React__default.useState(false);
  const [prefersReduced, setPrefersReduced] = React__default.useState(false);
  React__default.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced((mql == null ? void 0 : mql.matches) || false);
    setIsReady(true);
    const onChange = (e) => setPrefersReduced(e.matches);
    if (mql == null ? void 0 : mql.addEventListener) mql.addEventListener("change", onChange);
    return () => {
      if (mql == null ? void 0 : mql.removeEventListener) mql.removeEventListener("change", onChange);
    };
  }, []);
  const startStyle = {
    opacity: 0,
    transform: !isReady || !prefersReduced ? "translateY(20px)" : "none"
  };
  const endStyle = { opacity: 1, transform: "translateY(0)" };
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className,
      style: {
        ...visible ? endStyle : startStyle,
        transition: prefersReduced ? "opacity 300ms ease-out" : "opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), transform 650ms cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delayMs}ms`,
        willChange: "transform, opacity",
        ...style
      },
      ...rest,
      children
    }
  );
};
const RevealText = ({ text, className = "", delay = 0 }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay
      }
    }
  };
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  const words = text.split(" ");
  return /* @__PURE__ */ jsx(
    motion.span,
    {
      className: `inline-block ${className}`,
      variants: containerVariants,
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-10%" },
      children: words.map((word, wordIndex) => /* @__PURE__ */ jsx("span", { className: "inline-block overflow-hidden mr-[0.25em] py-1", children: word.split("").map((char, charIndex) => /* @__PURE__ */ jsx(
        motion.span,
        {
          variants: childVariants,
          className: "inline-block",
          children: char
        },
        charIndex
      )) }, wordIndex))
    },
    text
  );
};
const brands = [
  { name: "Square Enix", src: "/assets/brands/square-enix.svg" },
  { name: "Solana", src: "/assets/brands/solana.svg" },
  { name: "Elixir Games", src: "/assets/brands/elixir-games.svg" },
  { name: "Litlab Games", src: "/assets/brands/litlab-games.svg" },
  { name: "Friends4Payment", src: "/assets/brands/friends4payment.svg" },
  { name: "Hard Lock", src: "/assets/brands/hard-lock.svg" },
  { name: "BUU AI", src: "/assets/brands/buu-ai.svg" },
  { name: "Sphere Studios", src: "/assets/brands/sphere-studios.svg" },
  { name: "A2AX", src: "/assets/brands/a2ax.svg" }
];
const Brands = () => {
  const { lang } = useI18n();
  const items = [...brands, ...brands];
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const pauseTrack = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
    if (wrapperRef.current) wrapperRef.current.setAttribute("data-paused", "true");
  };
  const resumeTrack = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
    if (wrapperRef.current) wrapperRef.current.removeAttribute("data-paused");
  };
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let hasBeenVisible = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            hasBeenVisible = true;
            resumeTrack();
          } else if (hasBeenVisible) {
            pauseTrack();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      "aria-label": lang === "es" ? "Marcas que confían en Kinetora" : "Brands that trust Kinetora",
      className: "kin-section bg-[#0D0D0D] overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "kin-container", children: /* @__PURE__ */ jsx("div", { className: "text-center mb-8 sm:mb-10", children: /* @__PURE__ */ jsx(
          RevealText,
          {
            text: lang === "es" ? "Marcas que confían en nuestra velocidad" : "Brands that trust our speed",
            className: "text-[10px] font-bold text-[#F5F5F5]/75 uppercase tracking-[0.4em]"
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "relative h-12 sm:h-14", "data-animate": "always", ref: wrapperRef, children: /* @__PURE__ */ jsx(
          "div",
          {
            ref: trackRef,
            className: "marquee-track absolute inset-y-0 left-0 flex items-center gap-6 sm:gap-10 md:gap-24 min-w-max will-change-transform",
            style: { animationDuration: "70s" },
            children: items.map((brand, i) => /* @__PURE__ */ jsx(
              "div",
              {
                onMouseEnter: pauseTrack,
                onMouseLeave: resumeTrack,
                onTouchStart: pauseTrack,
                onTouchEnd: resumeTrack,
                className: "flex items-center justify-center select-none h-10 sm:h-11 md:h-12 w-32 sm:w-36 md:w-40",
                "aria-hidden": i >= brands.length,
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: brand.src,
                    alt: brand.name,
                    loading: "lazy",
                    decoding: "async",
                    width: 160,
                    height: 48,
                    className: "max-h-full max-w-full object-contain opacity-60 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  }
                )
              },
              `brand-${i}-${brand.name}`
            ))
          }
        ) }) })
      ]
    }
  );
};
const CountUp = ({ end, duration = 1.2, suffix = "", className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let raf = 0;
    const start = performance.now();
    const d = duration * 1e3;
    const tick = (now) => {
      const progress = Math.min((now - start) / d, 1);
      const current = Math.floor(end * progress);
      setValue(current);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, duration]);
  const formatted = new Intl.NumberFormat("es-ES").format(value);
  return /* @__PURE__ */ jsxs("span", { ref, className, children: [
    formatted,
    suffix
  ] });
};
const Stats = () => {
  const { lang } = useI18n();
  const stats = lang === "es" ? [
    { label: "Proyectos completados", value: 450, suffix: "+" },
    { label: "Capital levantado por nuestros clientes", sublabel: "gracias a nuestros diseños", value: 12, suffix: "$M+" },
    { label: "Tiempo de entrega", value: 48, suffix: "h" },
    { label: "Tasa de éxito", value: 99, suffix: "%" }
  ] : [
    { label: "Projects delivered", value: 450, suffix: "+" },
    { label: "Capital raised by our clients", sublabel: "thanks to our design", value: 12, suffix: "$M+" },
    { label: "Delivery time", value: 48, suffix: "h" },
    { label: "Success rate", value: 99, suffix: "%" }
  ];
  return /* @__PURE__ */ jsx("section", { className: "kin-section bg-transparent overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "kin-container", children: /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-8", children: stats.map((stat, i) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: i * 0.1, duration: 0.8 },
      className: "text-center group",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative inline-block mb-3 sm:mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-4xl md:text-6xl font-black text-[#F5F5F5] tracking-tighter flex items-baseline justify-center", children: [
            /* @__PURE__ */ jsx(CountUp, { end: stat.value }),
            /* @__PURE__ */ jsx("span", { className: "text-[#B454FF] text-xl md:text-3xl ml-1", children: stat.suffix })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-[#B454FF]/0 group-hover:bg-[#B454FF]/5 rounded-full blur-xl transition-all duration-500" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-[#F5F5F5]/65 group-hover:text-[#B454FF]/80 transition-colors text-[10px] font-bold uppercase tracking-[0.3em] max-w-[160px] mx-auto leading-relaxed", children: [
          stat.label,
          "sublabel" in stat && stat.sublabel && /* @__PURE__ */ jsx("div", { className: "mt-1 text-[9px] text-[#B454FF]/60 normal-case tracking-[0.15em] font-semibold", children: stat.sublabel })
        ] })
      ]
    },
    i
  )) }) }) }) });
};
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const MouseParallax = ({
  children,
  className = "",
  intensity = 8,
  rotate = 3,
  scaleOnHover = 1.015,
  disabled = false
}) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const [isReady, setIsReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
    setIsReady(true);
    const update = () => setReduceMotion(mql.matches);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  const off = !isReady ? disabled : isMobile || reduceMotion || disabled;
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const scale = useMotionValue(1);
  const stx = useSpring(tx, { stiffness: 180, damping: 18, mass: 0.6 });
  const sty = useSpring(ty, { stiffness: 180, damping: 18, mass: 0.6 });
  const srx = useSpring(rx, { stiffness: 160, damping: 16, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 160, damping: 16, mass: 0.6 });
  const sScale = useSpring(scale, { stiffness: 220, damping: 20, mass: 0.6 });
  const reset = () => {
    tx.set(0);
    ty.set(0);
    rx.set(0);
    ry.set(0);
    scale.set(1);
  };
  const onMove = (e) => {
    if (off || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const clampedX = clamp(dx, -1, 1);
    const clampedY = clamp(dy, -1, 1);
    tx.set(clampedX * intensity);
    ty.set(clampedY * -intensity);
    rx.set(clampedY * rotate);
    ry.set(clampedX * -rotate);
  };
  const onEnter = () => {
    if (off) return;
    scale.set(scaleOnHover);
  };
  const onLeave = () => {
    reset();
  };
  const style = useMemo(
    () => off ? void 0 : {
      transformPerspective: 800,
      translateX: stx,
      translateY: sty,
      rotateX: srx,
      rotateY: sry,
      scale: sScale,
      willChange: "transform"
    },
    [off]
  );
  if (off) {
    return /* @__PURE__ */ jsx("div", { className, children });
  }
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      className,
      style,
      onMouseMove: onMove,
      onMouseEnter: onEnter,
      onMouseLeave: onLeave,
      children
    }
  );
};
const ValueProp = () => {
  const { lang } = useI18n();
  const copy = lang === "es" ? {
    pill: "Por qué las startups eligen Kinetora",
    titleTop: "El fin de la",
    titleAccent: "fricción creativa",
    sub: "Un modelo pensado para velocidad, claridad y consistencia visual — con kickoff claro, suscripción a medida y gestión profesional.",
    left: {
      title: "Otras agencias",
      badge: "Fricción",
      items: [
        { t: "Briefs difusos", d: "Cambios constantes sin una alineación inicial clara." },
        { t: "Planes rígidos", d: "Poca flexibilidad y costes variables según avance." },
        { t: "Canales dispersos", d: "Conversaciones fragmentadas y poca trazabilidad." },
        { t: "Entregas lentas", d: "Ritmos de semanas y demasiadas rondas de revisión." }
      ],
      metrics: [
        { k: "Ritmo", v: "Lento" },
        { k: "Reuniones", v: "Muchas" },
        { k: "Coste", v: "Variable" }
      ]
    },
    right: {
      title: "Kinetora",
      badge: "Premium",
      items: [
        { t: "Toma de contacto inicial", d: "Reunión inicial breve para alinear objetivo y presupuesto." },
        { t: "Suscripción a medida", d: "El plan se adapta a tu inversión y prioridades." },
        { t: "Comunicación profesional", d: "Email o chat y reuniones puntuales para decidir rápido." },
        { t: "Informamos y gestionamos", d: "Tareas, prioridades y entregas 48h con revisiones limitadas." }
      ],
      metrics: [
        { k: "Ritmo", v: "48h" },
        { k: "Reuniones", v: "Puntuales" },
        { k: "Coste", v: "A medida" }
      ],
      tag: "Recomendado para Series A/B"
    }
  } : {
    pill: "Why startups choose Kinetora",
    titleTop: "The end of",
    titleAccent: "creative friction",
    sub: "A model built for speed, clarity and consistency — with a clear kickoff, tailored subscription and professional management.",
    left: {
      title: "Other agencies",
      badge: "Friction",
      items: [
        { t: "Vague briefs", d: "Constant changes with no clear upfront alignment." },
        { t: "Rigid plans", d: "Low flexibility and variable costs along the way." },
        { t: "Scattered channels", d: "Fragmented conversations and poor traceability." },
        { t: "Slow delivery", d: "Weeks of work and too many review rounds." }
      ],
      metrics: [
        { k: "Pace", v: "Slow" },
        { k: "Meetings", v: "Many" },
        { k: "Cost", v: "Variable" }
      ]
    },
    right: {
      title: "Kinetora",
      badge: "Premium",
      items: [
        { t: "Clear kickoff", d: "Short initial meeting to align scope, goals and budget." },
        { t: "Tailored subscription", d: "The plan fits your budget and priorities." },
        { t: "Professional comms", d: "Email or chat, plus scheduled meetings when needed." },
        { t: "ClickUp (or your tool)", d: "Tasks, priorities and 48h turnarounds with limited revisions." }
      ],
      metrics: [
        { k: "Pace", v: "48h" },
        { k: "Meetings", v: "Focused" },
        { k: "Cost", v: "Tailored" }
      ],
      tag: "Recommended for Series A/B"
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "kin-section relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 z-0", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-[-14rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#B454FF]/14 blur-[120px] md:h-[42rem] md:w-[42rem] md:blur-[160px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute left-[-10%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-[#7C3AED]/10 blur-[110px] md:h-[30rem] md:w-[30rem] md:blur-[150px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute right-[-8%] bottom-[4%] h-[24rem] w-[24rem] rounded-full bg-[#5EEAD4]/7 blur-[120px] md:h-[34rem] md:w-[34rem] md:blur-[160px]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "kin-container relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center mb-16 lg:mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6", children: copy.pill }),
        /* @__PURE__ */ jsxs("h2", { className: "mb-6", children: [
          /* @__PURE__ */ jsx(RevealText, { text: copy.titleTop, className: "block text-white" }),
          /* @__PURE__ */ jsx(RevealText, { text: copy.titleAccent, className: "block text-[#B454FF]", delay: 0.3 })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 max-w-2xl mx-auto leading-relaxed underline-offset-4", children: copy.sub })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch", children: [
        /* @__PURE__ */ jsx(MouseParallax, { intensity: 9, rotate: 4, className: "will-change-transform", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileInView: { opacity: 1, y: 0 },
            initial: { opacity: 0, y: 16 },
            viewport: { once: true },
            transition: { duration: 0.45, ease: "easeOut" },
            className: "h-full kin-card relative flex flex-col overflow-hidden",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-9 sm:mb-10", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-11 h-11 shrink-0 rounded-full bg-red-500/10 border border-red-500/15 flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-red-300/70" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "uppercase", children: copy.left.title })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-flex rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase text-[#F5F5F5]/60", children: copy.left.badge })
              ] }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-6 sm:space-y-7", children: copy.left.items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsx("span", { className: "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-red-300/70" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[#F5F5F5] font-extrabold text-sm uppercase tracking-tight", children: item.t }),
                  /* @__PURE__ */ jsx("div", { className: "text-[#F5F5F5]/60 text-sm leading-snug mt-1", children: item.d })
                ] })
              ] }, i)) }),
              /* @__PURE__ */ jsx("div", { className: "mt-10 pt-7 border-t border-white/10", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: copy.left.metrics.map((m) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.22em] font-black text-[#F5F5F5]/55 break-words whitespace-normal leading-tight", children: m.k }),
                /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs sm:text-sm font-extrabold text-[#F5F5F5] break-words whitespace-normal leading-snug", children: m.v })
              ] }, m.k)) }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(MouseParallax, { intensity: 10, rotate: 5, className: "will-change-transform", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileInView: { opacity: 1, y: 0 },
            initial: { opacity: 0, y: 16 },
            viewport: { once: true },
            transition: { duration: 0.45, ease: "easeOut", delay: 0.05 },
            className: "h-full kin-card border-[#B454FF]/30 bg-white/[0.05] relative overflow-hidden shadow-[0_18px_90px_rgba(180,84,255,0.10)] flex flex-col",
            children: [
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-28 -right-28 w-72 h-72 bg-[#B454FF]/18 rounded-full blur-[90px]" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-9 sm:mb-10 relative z-10", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-11 h-11 shrink-0 rounded-full bg-[#B454FF]/15 border border-[#B454FF]/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: "/Favicon_Kinetora.png", alt: "Kinetora", className: "w-5 h-5 object-contain", loading: "lazy", decoding: "async" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "uppercase", children: copy.right.title })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-full bg-[#B454FF]/10 border border-[#B454FF]/25 px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase text-[#B454FF]", children: copy.right.badge })
              ] }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-6 sm:space-y-7 relative z-10", children: copy.right.items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsx("span", { className: "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B454FF]/10 border border-[#B454FF]/20", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-[#B454FF]" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[#F5F5F5] font-extrabold text-sm uppercase tracking-tight", children: item.t }),
                  /* @__PURE__ */ jsx("div", { className: "text-[#F5F5F5]/65 text-sm leading-snug mt-1", children: item.d })
                ] })
              ] }, i)) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-10 pt-7 border-t border-white/10 relative z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: copy.right.metrics.map((m) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.22em] font-black text-[#F5F5F5]/55 break-words whitespace-normal leading-tight", children: m.k }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs sm:text-sm font-extrabold text-[#F5F5F5] break-words whitespace-normal leading-snug", children: m.v })
                ] }, m.k)) }),
                /* @__PURE__ */ jsx("div", { className: "mt-6 inline-flex items-center rounded-full bg-[#B454FF]/10 border border-[#B454FF]/25 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#B454FF]", children: copy.right.tag })
              ] })
            ]
          }
        ) })
      ] })
    ] })
  ] });
};
function setMetaByName(name, content, managed = true) {
  if (typeof document === "undefined") return;
  let tag = document.querySelector(`meta[name="${name}"]${managed ? '[data-seo-managed="true"]' : ""}`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    if (managed) tag.setAttribute("data-seo-managed", "true");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}
function setMetaByProperty(property, content, managed = true) {
  if (typeof document === "undefined") return;
  let tag = document.querySelector(`meta[property="${property}"]${managed ? '[data-seo-managed="true"]' : ""}`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    if (managed) tag.setAttribute("data-seo-managed", "true");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}
function setCanonical(href) {
  if (typeof document === "undefined") return;
  let link = document.querySelector('link[rel="canonical"][data-seo-managed="true"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("data-seo-managed", "true");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}
function setAlternateLinks(alts) {
  if (typeof document === "undefined") return;
  document.querySelectorAll('link[rel="alternate"][data-seo-managed="true"]').forEach((el) => {
    var _a;
    return (_a = el.parentElement) == null ? void 0 : _a.removeChild(el);
  });
  if (!alts || !alts.length) return;
  alts.forEach(({ hrefLang, href }) => {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hrefLang);
    link.setAttribute("href", href);
    link.setAttribute("data-seo-managed", "true");
    document.head.appendChild(link);
  });
}
function setMultiMetaByProperty(property, values) {
  if (typeof document === "undefined") return;
  document.querySelectorAll(`meta[property="${property}"][data-seo-multi="true"]`).forEach((el) => {
    var _a;
    return (_a = el.parentElement) == null ? void 0 : _a.removeChild(el);
  });
  if (!values || !values.length) return;
  values.forEach((val) => {
    const tag = document.createElement("meta");
    tag.setAttribute("property", property);
    tag.setAttribute("content", val);
    tag.setAttribute("data-seo-multi", "true");
    document.head.appendChild(tag);
  });
}
function setJsonLd(data) {
  if (typeof document === "undefined") return;
  let script = document.getElementById("seo-jsonld");
  if (!data) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.id = "seo-jsonld";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(data);
}
const SEO = ({
  title,
  description,
  keywords,
  image,
  canonical,
  locale,
  siteName = "Kinetora",
  ogType = "website",
  twitterCard = "summary_large_image",
  robots,
  jsonLd = null,
  alternates,
  twitterSite,
  twitterCreator,
  localesAlternate
}) => {
  React__default.useEffect(() => {
    if (typeof document === "undefined") return;
    setMultiMetaByProperty("og:locale:alternate", []);
    setAlternateLinks([]);
    if (title) {
      document.title = title;
      setMetaByProperty("og:title", title);
      setMetaByName("twitter:title", title);
    }
    if (description) {
      setMetaByName("description", description);
      setMetaByProperty("og:description", description);
      setMetaByName("twitter:description", description);
    }
    const kw = Array.isArray(keywords) ? keywords.join(", ") : keywords;
    if (kw && kw.trim().length > 0) {
      setMetaByName("keywords", kw);
    }
    const url = canonical || (typeof window !== "undefined" ? window.location.href.split("#")[0] : void 0);
    if (url) {
      setMetaByProperty("og:url", url);
      setCanonical(url);
    }
    setMetaByProperty("og:type", ogType);
    setMetaByProperty("og:site_name", siteName);
    if (locale) setMetaByProperty("og:locale", locale);
    if (image) {
      setMetaByProperty("og:image", image);
      setMetaByName("twitter:image", image);
    }
    setMetaByName("twitter:card", twitterCard);
    if (twitterSite) setMetaByName("twitter:site", twitterSite);
    if (twitterCreator) setMetaByName("twitter:creator", twitterCreator);
    if (robots) {
      setMetaByName("robots", robots);
    }
    setJsonLd(jsonLd);
    setAlternateLinks(alternates);
    if (localesAlternate && localesAlternate.length) {
      setMultiMetaByProperty("og:locale:alternate", localesAlternate);
    }
  }, [title, description, keywords, image, canonical, locale, siteName, ogType, twitterCard, robots, jsonLd, alternates, twitterSite, twitterCreator, localesAlternate]);
  return null;
};
const seoDefaults = {
  es: {
    title: "Kinetora | Experiencias Digitales que Convierten Usuarios",
    description: "Diseñamos productos y experiencias digitales poco convencionales que hacen girar cabezas y convierten usuarios. Estudio para marcas que se niegan a pasar desapercibidas.",
    keywords: [
      "agencia creativa",
      "diseño web España",
      "diseño web Andalucía",
      "diseño web Priego de Córdoba",
      "cartelería premium",
      "branding",
      "identidad de marca",
      "diseño UX",
      "UI",
      "web performance",
      "interfaces interactivas",
      "diseño SaaS",
      "diseño landing page",
      "diseño gráfico España"
    ],
    locale: "es_ES",
    siteName: "Kinetora",
    shareImage: "https://kinetora.es/assets/social/kinetora-social-share.webp"
  },
  en: {
    title: "Kinetora | Unconventional Digital Experiences & High-Converting UX",
    description: "We design unconventional digital experiences that turn heads and convert users. A digital studio exclusively for brands that refuse to go unnoticed.",
    keywords: [
      "avant-garde web design",
      "interactive UX",
      "global creative studio",
      "bespoke web experiences",
      "premium UI design",
      "visual identity",
      "brand design",
      "web performance",
      "motion design",
      "SaaS design",
      "landing page design",
      "digital studio"
    ],
    locale: "en_US",
    siteName: "Kinetora",
    shareImage: "https://kinetora.tech/assets/social/kinetora-social-share.webp"
  }
};
function getSeoDefaults(lang = "es") {
  return seoDefaults[lang];
}
const HowItWorks = React__default.lazy(() => import("./HowItWorks.3gjPS2hy.js"));
const Services = React__default.lazy(() => import("./Services.CFqCk2Co.js"));
const Portfolio = React__default.lazy(() => import("./Portfolio.CnrUB1UF.js"));
const Testimonials = React__default.lazy(() => import("./Testimonials.B7_opHmM.js"));
const Contact = React__default.lazy(() => import("./Contact.Pc6GKPQj.js"));
const FAQ = React__default.lazy(() => import("./FAQ.CURofAPp.js"));
const Footer = React__default.lazy(() => import("./Footer.B11k3ri-.js"));
const FloatingCTA = React__default.lazy(() => import("./FloatingCTA.RXAbL0gB.js"));
React__default.lazy(() => import("./StackingSection.KX6lWicT.js"));
const PricingSection = React__default.lazy(() => import("./Pricing.qe3ZQGrA.js"));
const SafeLazyLoad = ({ children, height = "400px" }) => {
  if (typeof window === "undefined") {
    return /* @__PURE__ */ jsx(React__default.Suspense, { fallback: null, children });
  }
  const [isIntersecting, setIntersecting] = React__default.useState(false);
  const ref = React__default.useRef(null);
  React__default.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsx("div", { ref, style: { minHeight: isIntersecting ? "auto" : height }, children: isIntersecting ? /* @__PURE__ */ jsx(React__default.Suspense, { fallback: /* @__PURE__ */ jsx("div", { style: { height } }), children }) : null });
};
const Index = () => {
  const location = useLocation();
  const { lang } = useI18n();
  React__default.useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    if (!id) return;
    let attempts = 0;
    const maxAttempts = 20;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const nav = document.querySelector("nav");
        const offset = ((nav == null ? void 0 : nav.offsetHeight) || 0) + 16;
        const rect = el.getBoundingClientRect();
        const y = rect.top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
        return;
      }
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 150);
  }, [location.hash]);
  const isES = typeof window !== "undefined" && window.location.hostname.includes(".es");
  const currentLang = isES ? "es" : "en";
  const seo = getSeoDefaults(currentLang);
  const origin = isES ? "https://kinetora.es" : "https://kinetora.tech";
  const canonical = `${origin}/`;
  const alternates = [
    { hrefLang: "es", href: "https://kinetora.es/" },
    { hrefLang: "en", href: "https://kinetora.tech/" },
    { hrefLang: "x-default", href: "https://kinetora.tech/" }
  ];
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kinetora",
    "url": canonical,
    "logo": `${origin}/Logotipo.svg`,
    "@id": `${canonical}#organization`,
    "areaServed": isES ? ["ES", "España", "Madrid", "Barcelona", "Sevilla", "Andalucía", "Valencia", "Bilbao"] : "Worldwide",
    "sameAs": ["https://www.linkedin.com/company/kinetora", "https://www.instagram.com/kinetora_studio"]
  };
  const localJsonLd = isES ? {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Kinetora",
    "image": "https://kinetora.es/assets/social/kinetora-social-share.webp",
    "@id": "https://kinetora.es/#professional-service",
    "url": "https://kinetora.es",
    "telephone": "",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Priego de Córdoba",
      "postalCode": "14800",
      "addressRegion": "Andalucía",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.4381,
      "longitude": -4.1942
    },
    "areaServed": ["ES", "España", "Madrid", "Barcelona", "Sevilla", "Andalucía", "Valencia", "Bilbao"],
    "description": "Estudio de experiencias digitales que convierten usuarios. Creamos identidades visuales y webs poco convencionales para clientes de toda España desde Priego de Córdoba.",
    "knowsAbout": ["Diseño Web", "Branding", "Cartelería", "UX/UI", "Identidad Visual", "Desarrollo Frontend"],
    "sameAs": ["https://www.linkedin.com/company/kinetora", "https://www.instagram.com/kinetora_studio"]
  } : null;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        image: seo.shareImage,
        canonical,
        locale: seo.locale,
        siteName: seo.siteName,
        ogType: "website",
        twitterCard: "summary_large_image",
        robots: "index,follow",
        alternates,
        jsonLd: {
          "@context": "https://schema.org",
          "@graph": [
            orgJsonLd,
            localJsonLd,
            {
              "@type": "WebSite",
              "@id": `${canonical}#website`,
              "url": canonical,
              "name": seo.siteName,
              "publisher": { "@id": `${canonical}#organization` },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${canonical}?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            }
          ].filter(Boolean)
        }
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { id: "main-content", role: "main", "aria-label": "Main content", className: "relative", children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 bg-[#0D0D0D] shadow-[0_-30px_60px_rgba(0,0,0,0.8)]", children: [
        /* @__PURE__ */ jsx(Reveal, { as: "div", children: /* @__PURE__ */ jsx(Brands, {}) }),
        /* @__PURE__ */ jsx(Reveal, { as: "div", children: /* @__PURE__ */ jsx(Stats, {}) }),
        /* @__PURE__ */ jsx(Reveal, { as: "div", children: /* @__PURE__ */ jsx(ValueProp, {}) }),
        /* @__PURE__ */ jsx("div", { id: "servicios", className: "scroll-mt-24 md:scroll-mt-28", children: /* @__PURE__ */ jsx(SafeLazyLoad, { height: "600px", children: /* @__PURE__ */ jsx(Reveal, { as: "div", children: /* @__PURE__ */ jsx(Services, {}) }) }) }),
        /* @__PURE__ */ jsx("div", { id: "como-funciona", className: "scroll-mt-24 md:scroll-mt-28", children: /* @__PURE__ */ jsx(SafeLazyLoad, { height: "400px", children: /* @__PURE__ */ jsx(Reveal, { as: "div", children: /* @__PURE__ */ jsx(HowItWorks, {}) }) }) }),
        /* @__PURE__ */ jsx("div", { id: "casos", className: "scroll-mt-24 md:scroll-mt-28", children: /* @__PURE__ */ jsx(SafeLazyLoad, { height: "800px", children: /* @__PURE__ */ jsx(Reveal, { as: "div", children: /* @__PURE__ */ jsx(Portfolio, {}) }) }) }),
        /* @__PURE__ */ jsx(SafeLazyLoad, { height: "600px", children: /* @__PURE__ */ jsx(Reveal, { as: "div", children: /* @__PURE__ */ jsx(Testimonials, {}) }) }),
        /* @__PURE__ */ jsx("div", { id: "precios", className: "scroll-mt-24 md:scroll-mt-28 pt-8", children: /* @__PURE__ */ jsx(SafeLazyLoad, { height: "600px", children: /* @__PURE__ */ jsx(PricingSection, {}) }) }),
        /* @__PURE__ */ jsx("div", { id: "contacto", className: "scroll-mt-24 md:scroll-mt-28", children: /* @__PURE__ */ jsx(SafeLazyLoad, { height: "600px", children: /* @__PURE__ */ jsx(Contact, {}) }) }),
        /* @__PURE__ */ jsx(SafeLazyLoad, { height: "400px", children: /* @__PURE__ */ jsx(FAQ, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(SafeLazyLoad, { height: "300px", children: /* @__PURE__ */ jsx(Footer, {}) }),
    /* @__PURE__ */ jsx(React__default.Suspense, { fallback: null, children: /* @__PURE__ */ jsx(FloatingCTA, {}) })
  ] });
};
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isMobile || prefersReduced) return null;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      style: { scaleX: scrollYProgress },
      className: "fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B454FF] to-[#8A2BE2] origin-left z-[60] pointer-events-none"
    }
  );
};
const ScrollToTop = () => {
  const { scrollYProgress } = useScroll();
  const visible = useTransform(scrollYProgress, (v) => v > 0 ? 1 : 0);
  const pe = useTransform(scrollYProgress, (v) => v > 0 ? "auto" : "none");
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsx(
    motion.button,
    {
      "aria-label": "Volver arriba",
      onClick: handleClick,
      style: { opacity: visible, pointerEvents: pe },
      className: "fixed bottom-6 right-6 z-[55] rounded-full bg-[#111111] border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#B454FF]/40 hover:shadow-[0_0_20px_rgba(180,84,255,0.15)] w-11 h-11 flex items-center justify-center",
      children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-5 h-5 text-[#B454FF]" })
    }
  );
};
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = React__default.useState(false);
  React__default.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduced;
};
const BackgroundParallax = () => {
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const isStatic = reduced || isMobile;
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -120]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-hidden": true,
      className: "fixed inset-0 pointer-events-none overflow-hidden z-0",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,#0D0D0D_95%)] opacity-70" }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            style: isStatic ? {} : { y: ySlow },
            className: "absolute -top-40 -left-36 w-[42rem] h-[42rem] rounded-full bg-[#B454FF]/14 blur-[70px]"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            style: isStatic ? {} : { y: yMid },
            className: "absolute top-1/3 -right-48 w-[48rem] h-[48rem] rounded-full bg-[#33C3F0]/10 blur-[80px]"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            style: isStatic ? {} : { y: yFast },
            className: "absolute -bottom-48 left-1/4 w-[44rem] h-[44rem] rounded-full bg-[#B454FF]/10 blur-[70px]"
          }
        )
      ]
    }
  );
};
const SkipToContent = () => {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: "#main-content",
      className: "sr-only focus:not-sr-only fixed top-2 left-2 z-[100] px-4 py-2 rounded-full bg-[#B454FF] text-white text-sm font-bold shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
      children: "Saltar al contenido"
    }
  );
};
const GA_ID = "G-9RKJYMV9WX";
const STORAGE_KEY = "kinetora.cookies";
const DEFAULT_PREFS = {
  decided: false,
  analytics: false,
  functional: false
};
function readPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}
function writePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
  }
}
function pushConsentUpdate(analytics, functional) {
  if (typeof window === "undefined") return;
  const w = window;
  if (typeof w.gtag !== "function") return;
  w.gtag(
    "consent",
    "update",
    {
      analytics_storage: analytics ? "granted" : "denied",
      functionality_storage: functional ? "granted" : "denied",
      personalization_storage: "denied"
    }
  );
}
let gtmLoaded = false;
function loadGTM() {
  if (gtmLoaded || typeof document === "undefined") return;
  gtmLoaded = true;
  const w = window;
  const dl = "dataLayer";
  w[dl] = w[dl] || [];
  w[dl].push({ "gtm.start": (/* @__PURE__ */ new Date()).getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `/gtm.js`;
  document.head.appendChild(s);
  if (!document.querySelector(`script[src*="${GA_ID}"]`)) {
    const ga = document.createElement("script");
    ga.async = true;
    ga.src = `/gtag.js`;
    document.head.appendChild(ga);
  }
}
function useCookieConsent() {
  const [consent, setConsent] = useState(readPrefs);
  useEffect(() => {
    const prefs = readPrefs();
    if (prefs.decided && prefs.analytics) {
      pushConsentUpdate(true, prefs.functional);
      loadGTM();
    }
  }, []);
  const acceptAll = useCallback(() => {
    const prefs = { decided: true, analytics: true, functional: true };
    writePrefs(prefs);
    setConsent(prefs);
    pushConsentUpdate(true, true);
    loadGTM();
  }, []);
  const rejectAll = useCallback(() => {
    const prefs = { decided: true, analytics: false, functional: false };
    writePrefs(prefs);
    setConsent(prefs);
    pushConsentUpdate(false, false);
  }, []);
  const saveCustom = useCallback((analytics, functional) => {
    const prefs = { decided: true, analytics, functional };
    writePrefs(prefs);
    setConsent(prefs);
    pushConsentUpdate(analytics, functional);
    if (analytics) loadGTM();
  }, []);
  return {
    consent,
    hasDecided: consent.decided,
    acceptAll,
    rejectAll,
    saveCustom
  };
}
const CookieBanner = () => {
  const { t } = useI18n();
  const { hasDecided, acceptAll, rejectAll, saveCustom } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [prefs, setPrefs] = useState({
    analytics: true,
    functional: true
  });
  useEffect(() => {
    if (!hasDecided) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [hasDecided]);
  if (!isVisible && hasDecided) return null;
  const handleSaveCustom = () => {
    saveCustom(prefs.analytics, prefs.functional);
    setIsVisible(false);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "fixed z-[9999] transition-all duration-500 ease-out",
        // Mobile: full width, centrado y con safe area lateral
        "bottom-0 left-0 right-0 px-4 mx-auto",
        // Desktop: tarjeta flotante en esquina
        "sm:bottom-6 sm:left-auto sm:right-6 sm:px-0 sm:w-full sm:max-w-[420px]",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full sm:translate-y-12 opacity-0 pointer-events-none"
      ),
      style: {
        paddingBottom: "max(env(safe-area-inset-bottom), 1rem)",
        paddingLeft: "max(env(safe-area-inset-left), 1rem)",
        paddingRight: "max(env(safe-area-inset-right), 1rem)"
      },
      children: /* @__PURE__ */ jsx("div", { className: "bg-[#121212] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "p-5 sm:p-6", children: [
        !isExpanded ? (
          /* COMPACT VIEW */
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-[#B454FF]/20 flex items-center justify-center text-[#B454FF]", children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "h-5 w-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  strokeWidth: 2,
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-base tracking-tight", children: t("banner.title") })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/60 text-sm leading-relaxed", children: t("banner.desc") }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pt-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: acceptAll,
                  className: "w-full bg-[#B454FF] hover:bg-[#A040FF] text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm",
                  children: t("banner.accept")
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: rejectAll,
                    className: "bg-white/5 hover:bg-white/10 text-[#F5F5F5]/80 font-semibold py-2.5 px-4 rounded-xl transition-colors text-xs border border-white/5",
                    children: t("banner.reject")
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setIsExpanded(true),
                    className: "bg-white/5 hover:bg-white/10 text-[#F5F5F5]/80 font-semibold py-2.5 px-4 rounded-xl transition-colors text-xs border border-white/5",
                    children: t("banner.manage")
                  }
                )
              ] })
            ] })
          ] })
        ) : (
          /* EXPANDED VIEW */
          /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-base tracking-tight", children: t("banner.manage") }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsExpanded(false),
                  className: "text-[#F5F5F5]/40 hover:text-white transition-colors",
                  children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[60vh] overflow-y-auto pr-1 overscroll-contain", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: t("banner.cat.tech.title") }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded leading-none uppercase tracking-wider font-bold", children: t("banner.always") })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#F5F5F5]/60 leading-normal", children: t("banner.cat.tech.desc") })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: t("banner.cat.analytics.title") }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#F5F5F5]/60 leading-normal", children: t("banner.cat.analytics.desc") })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer mt-1", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      className: "sr-only peer",
                      checked: prefs.analytics,
                      onChange: (e) => setPrefs({ ...prefs, analytics: e.target.checked })
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/40 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#B454FF] peer-checked:after:bg-white" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: t("banner.cat.functional.title") }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#F5F5F5]/60 leading-normal", children: t("banner.cat.functional.desc") })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer mt-1", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      className: "sr-only peer",
                      checked: prefs.functional,
                      onChange: (e) => setPrefs({ ...prefs, functional: e.target.checked })
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/40 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#B454FF] peer-checked:after:bg-white" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSaveCustom,
                className: "w-full bg-[#B454FF] hover:bg-[#A040FF] text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm",
                children: t("banner.save")
              }
            )
          ] })
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-5 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-3 sm:gap-4 pt-4 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/legal/politica-cookies",
              className: "text-[10px] sm:text-[11px] font-bold text-[#F5F5F5]/50 hover:text-[#B454FF] transition-colors uppercase tracking-widest",
              children: t("banner.link.cookies")
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/legal/politica-privacidad",
              className: "text-[10px] sm:text-[11px] font-bold text-[#F5F5F5]/50 hover:text-[#B454FF] transition-colors uppercase tracking-widest",
              children: t("banner.link.privacy")
            }
          )
        ] }) })
      ] }) })
    }
  );
};
const showSuccess = (message) => {
  toast$1.success(message);
};
const PwaManager = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.hostname !== "localhost") {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("✅ SW registrado con éxito:", registration.scope);
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("🚀 Nueva versión disponible. Activando...");
                  handleUpdate(newWorker);
                }
              });
            }
          });
        } catch (error) {
          console.error("❌ Error registrando el SW:", error);
        }
      };
      const handleUpdate = (worker) => {
        const lastReload = sessionStorage.getItem("pwa_reload_guard");
        const now = Date.now();
        if (lastReload && now - parseInt(lastReload) < 1e4) {
          console.warn("⚠️ Loop de recarga detectado. Abortando auto-reload.");
          return;
        }
        sessionStorage.setItem("pwa_reload_guard", now.toString());
        showSuccess("Nueva versión cargada. Reiniciando para aplicar cambios...");
        worker.postMessage({ type: "SKIP_WAITING" });
      };
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
      registerSW();
    }
  }, []);
  return null;
};
const DynamicImportGuard = () => {
  React__default.useEffect(() => {
    const handler = (e) => {
      var _a;
      try {
        const msg = String(((_a = e == null ? void 0 : e.reason) == null ? void 0 : _a.message) || "");
        if (msg.includes("Failed to fetch dynamically imported module")) {
          const url = new URL(window.location.href);
          url.searchParams.set("v", Date.now().toString());
          window.location.replace(url.toString());
        }
      } catch {
        window.location.reload();
      }
    };
    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);
  return null;
};
const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    const handleAnchorClick = (e) => {
      const target = e.target;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        e.preventDefault();
        lenis.scrollTo(anchor.hash);
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children });
};
const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);
  useEffect(() => {
    if (!mounted || isMobile) return;
    const isMobileQuery = window.matchMedia("(max-width: 767px)");
    if (isMobileQuery.matches) return;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    const cursor = document.getElementById("custom-cursor-container");
    const dot = document.getElementById("custom-cursor-dot");
    if (!cursor || !dot) return;
    let reqRef;
    const moveCursor = (e) => {
      if (reqRef) cancelAnimationFrame(reqRef);
      reqRef = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
    };
    const handleMouseDown = (e) => {
      dot.classList.add("is-clicked");
      setTimeout(() => dot.classList.remove("is-clicked"), 150);
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple-anim fixed border-[#B454FF] rounded-full pointer-events-none z-[99998]";
      ripple.style.width = "40px";
      ripple.style.height = "40px";
      ripple.style.setProperty("--x", `${e.clientX}px`);
      ripple.style.setProperty("--y", `${e.clientY}px`);
      ripple.style.left = "0";
      ripple.style.top = "0";
      ripple.style.marginLeft = "-20px";
      ripple.style.marginTop = "-20px";
      document.body.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (reqRef) cancelAnimationFrame(reqRef);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [mounted]);
  if (!mounted || isMobile) return null;
  const cursorContent = /* @__PURE__ */ jsx("div", { id: "custom-cursor-container", children: /* @__PURE__ */ jsx("div", { id: "custom-cursor-dot" }) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
        
        #custom-cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          mix-blend-mode: difference;
          transition: transform 0.08s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        #custom-cursor-dot {
          width: 12px;
          height: 12px;
          margin-top: -6px;
          margin-left: -6px;
          background-color: #B454FF; 
          box-shadow: 0 0 12px 2px rgba(180, 84, 255, 0.45);
          border-radius: 50%;
          transform-origin: center center;
          will-change: transform;
        }

        #custom-cursor-dot.is-clicked {
          animation: cursorClickAnim 0.15s ease-out forwards;
        }

        /* 🚀 ZERO REFLOW: Usamos scale() en lugar de width/height */
        @keyframes cursorClickAnim {
          0% { transform: scale(1); }
          50% { transform: scale(0.6); }
          100% { transform: scale(1); }
        }

        .cursor-ripple-anim {
          animation: rippleExpand 0.6s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes rippleExpand {
          0% {
            transform: translate3d(var(--x, 0), var(--y, 0), 0) scale(0.5);
            opacity: 0.8;
            border-width: 3px;
          }
          100% {
            transform: translate3d(var(--x, 0), var(--y, 0), 0) scale(3.5);
            opacity: 0;
            border-width: 1px;
          }
        }
      ` }),
    createPortal(cursorContent, document.body)
  ] });
};
const Cases = lazy(() => import("./Cases.BfDf7C89.js"));
const CaseStudyPost = lazy(() => import("./CaseStudyPost.DAew1d1U.js"));
const NotFound = lazy(() => import("./NotFound.DSVPTEo-.js"));
const LegalNotice = lazy(() => import("./LegalNotice.FlOvlwTh.js"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy.dZsopLH3.js"));
const CookiesPolicy = lazy(() => import("./CookiesPolicy.BbJu4WFK.js"));
const SocialPrivacyPolicy = lazy(() => import("./SocialPrivacyPolicy.DPycK9bi.js"));
const PortalDashboard = lazy(() => import("./PortalDashboard.lX3uY6cn.js"));
const PortalLogin = lazy(() => import("./PortalLogin.7N72lzoF.js"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute.D_-QwoJ1.js"));
const PortalLayout = lazy(() => import("./PortalLayout.DuEC2wqn.js"));
const BillingView = lazy(() => import("./BillingView.AmcdhdLD.js"));
const Deliverables = lazy(() => import("./Deliverables.Xu_4JvZL.js"));
const queryClient = new QueryClient();
const App = ({ serverLang }) => {
  const isMobile = useIsMobile();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(I18nProvider, { serverLang, children: [
    /* @__PURE__ */ jsx(Toaster$1, {}),
    /* @__PURE__ */ jsx(Toaster, {}),
    /* @__PURE__ */ jsx(PwaManager, {}),
    /* @__PURE__ */ jsx(DynamicImportGuard, {}),
    !isMobile && /* @__PURE__ */ jsx(CustomCursor, {}),
    /* @__PURE__ */ jsx(CookieBanner, {}),
    /* @__PURE__ */ jsx(SkipToContent, {}),
    /* @__PURE__ */ jsx(BackgroundParallax, {}),
    /* @__PURE__ */ jsx(SmoothScroll, { children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsx(ScrollProgress, {}),
      /* @__PURE__ */ jsx(ScrollToTop, {}),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0A0A0A]" }), children: /* @__PURE__ */ jsxs(Routes, { children: [
        /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/casos", element: /* @__PURE__ */ jsx(Cases, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/casos/:slug", element: /* @__PURE__ */ jsx(CaseStudyPost, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/legal/aviso-legal", element: /* @__PURE__ */ jsx(LegalNotice, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/legal/politica-privacidad", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/legal/politica-cookies", element: /* @__PURE__ */ jsx(CookiesPolicy, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/legal/privacidad-redes-sociales", element: /* @__PURE__ */ jsx(SocialPrivacyPolicy, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/precios", element: /* @__PURE__ */ jsx(Navigate, { to: "/#precios", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "/portal/login", element: /* @__PURE__ */ jsx(PortalLogin, {}) }),
        /* @__PURE__ */ jsxs(Route, { path: "/portal", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(PortalLayout, {}) }), children: [
          /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(Navigate, { to: "/portal/dashboard", replace: true }) }),
          /* @__PURE__ */ jsx(Route, { path: "dashboard", element: /* @__PURE__ */ jsx(PortalDashboard, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "billing", element: /* @__PURE__ */ jsx(BillingView, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "entregables", element: /* @__PURE__ */ jsx(Deliverables, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "settings", element: /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black uppercase tracking-tighter", children: "Ajustes" }),
            /* @__PURE__ */ jsx("p", { className: "text-white/40 mt-4 font-bold uppercase tracking-widest", children: "Sección en desarrollo" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
      ] }) })
    ] }) })
  ] }) }) });
};
async function render(url, lang) {
  return new Promise((resolve, reject) => {
    let html = "";
    const transformStream = new Transform({
      transform(chunk, encoding, callback) {
        html += chunk.toString();
        callback();
      }
    });
    transformStream.on("finish", () => resolve(html));
    transformStream.on("error", reject);
    const { pipe } = renderToPipeableStream(
      /* @__PURE__ */ jsx(React__default.StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, { serverLang: lang }) }) }),
      {
        onAllReady() {
          pipe(transformStream);
        },
        onError(error) {
          console.error("[SSR Error]", error);
          reject(error);
        }
      }
    );
  });
}
export {
  Button as B,
  DropdownMenu as D,
  Logo as L,
  MouseParallax as M,
  Navbar as N,
  PremiumButton as P,
  Reveal as R,
  SEO as S,
  DropdownMenuTrigger as a,
  DropdownMenuContent as b,
  DropdownMenuItem as c,
  cn as d,
  ScrollParallax as e,
  RevealText as f,
  getSeoDefaults as g,
  SafeHydration as h,
  render,
  showSuccess as s,
  useI18n as u
};
