"use client";

import React from "react";
import { motion, useScroll } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const ScrollProgress = () => {
  // Llamar hooks SIEMPRE en el mismo orden
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Render condicional, pero tras invocar los hooks
  if (isMobile || prefersReduced) return null;

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B454FF] to-[#8A2BE2] origin-left z-[60] pointer-events-none"
    />
  );
};

export default ScrollProgress;