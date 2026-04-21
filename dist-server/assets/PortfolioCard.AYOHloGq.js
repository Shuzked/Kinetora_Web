import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useRef } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { I as ImageWithSkeleton } from "./ImageWithSkeleton.DKP7qQz4.js";
import { P as PremiumButton } from "./entry-server.Dao3FwaC.js";
const PortfolioCard = React__default.memo(({ cs, onNavigate, lang, ui }) => {
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };
  const handleMouseMove = (e) => {
    const rect = rectRef.current;
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };
  const cover = cs.coverImage || "/assets/placeholder.svg";
  const hito = lang === "es" ? cs.highlightFallback : cs.highlightFallbackEn ?? cs.highlightFallback;
  const alt = (lang === "es" ? cs.coverAlt : cs.coverAltEn ?? cs.coverAlt) || cs.coverAlt;
  const metricLabel = (lang === "es" ? cs.metricLabel : cs.metricLabelEn ?? cs.metricLabel) ?? null;
  const metricValue = cs.metricValue ?? null;
  const title = lang === "es" ? cs.title : cs.titleEn ?? cs.title;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref: cardRef,
      onMouseEnter: handleMouseEnter,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale"
      },
      className: "h-full relative group",
      children: /* @__PURE__ */ jsxs("div", { className: "block h-full rounded-[2rem] border border-white/10 bg-[#111] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 focus-within:ring-2 focus-within:ring-[#B454FF]/40 focus-within:ring-offset-0 relative transform-gpu", style: { transform: "translateZ(0)" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "aspect-[16/9] overflow-hidden relative", style: { transform: "translateZ(40px)", backfaceVisibility: "hidden" }, children: [
          /* @__PURE__ */ jsx(
            ImageWithSkeleton,
            {
              src: cover,
              alt: alt || "",
              loading: "lazy",
              decoding: "async",
              width: 600,
              height: 375,
              containerClassName: "h-full w-full",
              skeletonClassName: "bg-white/10",
              className: "h-full w-full object-cover transition-all duration-700 hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-7 flex-1 flex flex-col", style: { transform: "translateZ(30px)" }, children: [
          /* @__PURE__ */ jsxs("div", { className: "js-eq-header", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center self-center rounded-full border border-[#B454FF]/30 bg-[#B454FF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-[#B454FF]", children: hito }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 mb-2 sm:mb-3 text-lg sm:text-xl font-black tracking-tight title-rows-3 title-rows-3-min", children: title })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-4 sm:pt-5", children: [
            /* @__PURE__ */ jsx("div", { className: "metric-block-min mb-2", children: metricLabel && metricValue ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/75", children: metricLabel }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-black text-[#B454FF] leading-[1.1] tracking-tighter drop-shadow-[0_0_12px_rgba(180,84,255,0.4)]", children: metricValue })
            ] }) : null }),
            /* @__PURE__ */ jsx(
              PremiumButton,
              {
                variant: "glass",
                size: "sm",
                className: "w-full h-11 rounded-full border-white/15 bg-white/5 hover:bg-white/10 shadow-lg",
                onClick: () => onNavigate(cs.slug),
                "aria-label": ui.ariaReadMore(title),
                children: ui.readMore.toUpperCase()
              }
            )
          ] })
        ] })
      ] })
    }
  );
});
PortfolioCard.displayName = "PortfolioCard";
export {
  PortfolioCard as P
};
