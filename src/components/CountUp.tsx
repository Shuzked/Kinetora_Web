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
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf = 0;
    const start = performance.now();
    const d = duration * 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / d, 1);
      const current = end * progress;
      setValue(current);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, duration]);

  const hasDecimals = !Number.isInteger(end);
  const formatted = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: hasDecimals ? 1 : 0,
    maximumFractionDigits: hasDecimals ? 1 : 0
  }).format(value);
  return (
    <span ref={ref} className={className}>
      {formatted}{suffix}
    </span>
  );
};

export default CountUp;