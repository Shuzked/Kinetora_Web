"use client";

import React from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  radius?: number; // radio de influencia
  strength?: number; // fuerza del desplazamiento
  className?: string;
};

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, radius = 50, strength = 0.25, className }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isCoarse =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches;

  // Posición actual aplicada y objetivo al que moverse
  const posRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = React.useRef<number | null>(null);

  const applyTransform = (x: number, y: number) => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const loop = React.useCallback(() => {
    const { x, y } = posRef.current;
    const { x: tx, y: ty } = targetRef.current;
    // Lerp suave (damping)
    const nx = x + (tx - x) * 0.16;
    const ny = y + (ty - y) * 0.16;
    posRef.current = { x: nx, y: ny };
    applyTransform(nx, ny);

    // Si estamos muy cerca del objetivo, evitamos seguir animando
    const done = Math.hypot(tx - nx, ty - ny) < 0.2;
    if (!done) {
      rafRef.current = requestAnimationFrame(loop);
    } else {
      // Ajuste final exacto
      posRef.current = { x: tx, y: ty };
      applyTransform(tx, ty);
      rafRef.current = null;
    }
  }, []);

  const startLoopIfNeeded = () => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(loop);
    }
  };

  const onMove = React.useCallback((e: React.MouseEvent) => {
    if (prefersReduced || isCoarse) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < radius) {
      // Objetivo dentro del radio
      targetRef.current = { x: dx * strength, y: dy * strength };
    } else {
      // Fuera del radio: retornar al centro suavemente
      targetRef.current = { x: 0, y: 0 };
    }
    startLoopIfNeeded();
  }, [prefersReduced, isCoarse, radius, strength, loop]);

  const onLeave = React.useCallback(() => {
    if (prefersReduced || isCoarse) {
      // Sin animación: volver directo
      applyTransform(0, 0);
      posRef.current = { x: 0, y: 0 };
      targetRef.current = { x: 0, y: 0 };
      return;
    }
    // Volver suave al centro
    targetRef.current = { x: 0, y: 0 };
    startLoopIfNeeded();
  }, [prefersReduced, isCoarse, loop]);

  React.useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;