"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
};

import { useIsMounted } from "@/hooks/use-is-mounted";

const ParallaxSection: React.FC<Props> = ({ children, intensity = 12, className = "" }) => {
  const isMounted = useIsMounted();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const update = () => setIsMobile(mql.matches);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -intensity]);

  return (
    <motion.section 
      style={!isMounted || isMobile ? {} : { y }} 
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default ParallaxSection;