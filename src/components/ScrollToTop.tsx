"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const { scrollYProgress } = useScroll();
  const visible = useTransform(scrollYProgress, [0.1, 0.15], [0, 1]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      aria-label="Volver arriba"
      onClick={handleClick}
      style={{ opacity: visible, pointerEvents: visible as unknown as "auto" }}
      className="fixed bottom-6 right-6 z-[55] rounded-full bg-[#111111] border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#B454FF]/40 hover:shadow-[0_0_20px_rgba(180,84,255,0.15)] w-11 h-11 flex items-center justify-center"
    >
      <ArrowUp className="w-5 h-5 text-[#B454FF]" />
    </motion.button>
  );
};

export default ScrollToTop;