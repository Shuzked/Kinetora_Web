"use client";

import React from "react";
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B454FF] to-[#8A2BE2] origin-left z-[60] pointer-events-none"
    />
  );
};

export default ScrollProgress;