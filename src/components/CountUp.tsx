"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number; // en segundos
  suffix?: string;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 1.2, suffix = "", className = "" }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Inicializamos con 'end' para que el SSR/SSG renderice el valor final para SEO
  const [value, setValue] = useState(end);

  useEffect(() => {
    if (!isInView) return;
    
    let raf = 0;
    const start = performance.now();
    const d = duration * 1000;
    const isInt = Number.isInteger(end);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / d, 1);
      
      let current: number;
      if (isInt) {
        current = Math.floor(end * progress);
      } else {
        // Para decimales (ej. 14.2), animamos con un decimal de precisión
        current = parseFloat((end * progress).toFixed(1));
      }
      
      setValue(current);
      
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, duration]);

  const formatted = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: Number.isInteger(end) ? 0 : 1,
    maximumFractionDigits: Number.isInteger(end) ? 0 : 1,
  }).format(value);

  return (
    <span ref={ref} className={className}>
      {formatted}{suffix}
    </span>
  );
};

export default CountUp;