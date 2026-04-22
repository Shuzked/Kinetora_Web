"use client";

import React from "react";
import { motion, useScroll } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

import { useIsMounted } from "@/hooks/use-is-mounted";

const ScrollProgress = () => {
  // Llamar hooks SIEMPRE en el mismo orden
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();
  const isMounted = useIsMounted();
  
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    
    const update = () => setPrefersReduced(mql.matches);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Render condicional, pero asegurando two-pass rendering
  if (!isMounted || isMobile || prefersReduced) return null;

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B454FF] to-[#8A2BE2] origin-left z-[60] pointer-events-none"
    />
  );
};

export default ScrollProgress;