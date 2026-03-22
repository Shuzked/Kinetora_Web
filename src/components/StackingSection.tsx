"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
  index: number;
  className?: string;
};

/**
 * StackingSection Component
 * Creates a "sticky" stacking effect where each section covers the previous one.
 * The underlying section scales down and reduces opacity as it's being covered.
 */
const StackingSection: React.FC<Props> = ({ children, index, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom scroll tracking for this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // Track as the section moves from top of viewport to fully out
  });

  // Animation values:
  // We only want to animate when this section is stationary (sticky) and being covered.
  // scrollYProgress [0, 1] maps the section passing the viewport.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen ${className}`}
      style={{
        zIndex: (index + 1) * 10, // Incremental z-index (10, 20, 30...)
      }}
    >
      <motion.section 
        style={{ 
          scale, 
          opacity,
          position: "sticky",
          top: 0
        }}
        className="min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {children}
      </motion.section>
    </div>
  );
};

export default StackingSection;
