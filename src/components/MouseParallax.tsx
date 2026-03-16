"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

type MouseParallaxProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // máximo translate en px
  rotate?: number; // máximo tilt en grados
  scaleOnHover?: number; // escala al pasar el cursor
  disabled?: boolean;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const MouseParallax: React.FC<MouseParallaxProps> = ({
  children,
  className = "",
  intensity = 10,
  rotate = 6,
  scaleOnHover = 1.015,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const off = disabled || isMobile || reduceMotion;

  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rx = useMotionValue(0); // rotateX
  const ry = useMotionValue(0); // rotateY
  const scale = useMotionValue(1);

  const stx = useSpring(tx, { stiffness: 180, damping: 18, mass: 0.6 });
  const sty = useSpring(ty, { stiffness: 180, damping: 18, mass: 0.6 });
  const srx = useSpring(rx, { stiffness: 160, damping: 16, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 160, damping: 16, mass: 0.6 });
  const sScale = useSpring(scale, { stiffness: 220, damping: 20, mass: 0.6 });

  const reset = () => {
    tx.set(0);
    ty.set(0);
    rx.set(0);
    ry.set(0);
    scale.set(1);
  };

  const onMove = (e: React.MouseEvent) => {
    if (off || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2); // -1 .. 1
    const dy = (e.clientY - cy) / (rect.height / 2); // -1 .. 1

    const clampedX = clamp(dx, -1, 1);
    const clampedY = clamp(dy, -1, 1);

    // Movimiento: invertimos Y para que el elemento acompañe sutilmente al cursor
    tx.set(clampedX * intensity);
    ty.set(clampedY * -intensity);

    // Tilt: rotateX responde a Y, rotateY a X (invertimos para sensación natural)
    rx.set(clampedY * rotate);
    ry.set(clampedX * -rotate);
  };

  const onEnter = () => {
    if (off) return;
    scale.set(scaleOnHover);
  };

  const onLeave = () => {
    reset();
  };

  const style = useMemo(
    () =>
      off
        ? undefined
        : {
            transformPerspective: 800,
            translateX: stx,
            translateY: sty,
            rotateX: srx,
            rotateY: sry,
            scale: sScale,
            willChange: "transform",
          } as React.CSSProperties,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [off]
  );

  if (off) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
};

export default MouseParallax;