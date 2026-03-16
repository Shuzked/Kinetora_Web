"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
};

const ParallaxSection: React.FC<Props> = ({ children, intensity = 12, className = "" }) => {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 767px)").matches;
  const effectiveIntensity = prefersReduced || isMobile ? 0 : intensity;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -effectiveIntensity]);

  return (
    <motion.section style={{ y: effectiveIntensity ? y : undefined }} className={className}>
      {children}
    </motion.section>
  );
};

export default ParallaxSection;