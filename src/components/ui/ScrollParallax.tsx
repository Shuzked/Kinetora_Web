"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number; // 0 to 1, where 0.1 is 10% of scroll speed
  className?: string;
  invert?: boolean;
  delay?: number;
}

const ScrollParallax = ({ children, speed = 0.1, className = "", invert = false, delay = 0 }: ScrollParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate the translation based on speed
  // A higher speed means more movement relative to scroll
  const yRange = invert ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed];
  
  const yTransform = useTransform(scrollYProgress, [0, 1], yRange);
  
  // Smooth out the movement with a spring
  const y = useSpring(yTransform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      ref={ref} 
      style={{ y, willChange: "transform" }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollParallax;
