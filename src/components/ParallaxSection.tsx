"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
};

const ParallaxSection: React.FC<Props> = ({ children, intensity = 12, className = "" }) => {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 767px)").matches;

  // We only call these hooks if NOT on mobile to save main thread cycles
  // Note: in standard React you shouldn't call hooks conditionally,
  // but we use intensity=0 to "disable" the transform effect logic while keeping hook order if needed,
  // OR we can just use a simpler check for the style.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -intensity]);

  if (isMobile) {
    return (
      <section className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section style={{ y }} className={className}>
      {children}
    </motion.section>
  );
};

export default ParallaxSection;