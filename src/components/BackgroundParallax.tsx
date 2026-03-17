"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduced;
};

const BackgroundParallax: React.FC = () => {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  // En móvil o con reduce-motion: sin animación y sin hooks de scroll
  if (isMobile || reduced) {
    return (
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,#0D0D0D_95%)] opacity-70" />
        <div className="absolute -top-40 -left-36 w-[42rem] h-[42rem] rounded-full bg-[#B454FF]/14 blur-[130px]" />
        <div className="absolute top-1/3 -right-48 w-[48rem] h-[48rem] rounded-full bg-[#33C3F0]/10 blur-[150px]" />
        <div className="absolute -bottom-48 left-1/4 w-[44rem] h-[44rem] rounded-full bg-[#B454FF]/10 blur-[140px]" />
      </div>
    );
  }

  // Solo en desktop: animación ligera
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,#0D0D0D_95%)] opacity-70" />
      <motion.div style={{ y: ySlow }} className="absolute -top-40 -left-36 w-[42rem] h-[42rem] rounded-full bg-[#B454FF]/14 blur-[130px]" />
      <motion.div style={{ y: yMid }} className="absolute top-1/3 -right-48 w-[48rem] h-[48rem] rounded-full bg-[#33C3F0]/10 blur-[150px]" />
      <motion.div style={{ y: yFast }} className="absolute -bottom-48 left-1/4 w-[44rem] h-[44rem] rounded-full bg-[#B454FF]/10 blur-[140px]" />
    </div>
  );
};

export default BackgroundParallax;