"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const { scrollYProgress } = useScroll();
  // Visible en cuanto se abandona el tope; oculto solo en la parte superior.
  const visible = useTransform(scrollYProgress, (v) => (v > 0 ? 1 : 0));
  const pe = useTransform(scrollYProgress, (v) => (v > 0 ? "auto" : "none"));

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      aria-label="Volver arriba"
      onClick={handleClick}
      style={{ opacity: visible as any, pointerEvents: pe as any }}
      className="fixed bottom-6 right-6 z-[55] rounded-full bg-[#111111] border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#B454FF]/40 hover:shadow-[0_0_20px_rgba(180,84,255,0.15)] w-11 h-11 flex items-center justify-center"
    >
      <ArrowUp className="w-5 h-5 text-[#B454FF]" />
    </motion.button>
  );
};

export default ScrollToTop;