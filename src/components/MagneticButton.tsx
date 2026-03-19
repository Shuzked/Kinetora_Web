"use client";

import React from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  radius?: number; // radio de influencia (px)
  strength?: number; // fuerza del desplazamiento (0..1)
  className?: string;
};

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  radius = 50,
  strength = 0.25,
  className
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  // Posición actual y objetivo
  const currentRef = React.useRef({ x: 0, y: 0 });
  const targetRef = React.useRef({ x: 0, y: 0 });

  // Factor de interpolación (inercia)
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const applyTransform = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const animate = React.useCallback(() => {
    const { x: cx, y: cy } = currentRef.current;
    const { x: tx, y: ty } = targetRef.current;

    const nx = lerp(cx, tx, 0.14); // suavidad; aumentar si quieres más inercia
    const ny = lerp(cy, ty, 0.14);

    currentRef.current = { x: nx, y: ny };
    applyTransform(nx, ny);

    // Continúa animando mientras no estemos lo bastante cerca del objetivo
    if (Math.hypot(tx - nx, ty - ny) > 0.2) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // Snap final al objetivo para evitar acumulación de microdiferencias
      currentRef.current = { x: tx, y: ty };
      applyTransform(tx, ty);
      rafRef.current = null;
    }
  }, []);

  const setTarget = React.useCallback((x: number, y: number) => {
    targetRef.current = { x, y };
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const onMove = React.useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        setTarget(dx * strength, dy * strength);
      } else {
        // fuera del radio, volver al origen suavemente
        setTarget(0, 0);
      }
    },
    [radius, strength, setTarget]
  );

  const onLeave = React.useCallback(() => {
    // al salir, regresar al centro con inercia suave
    setTarget(0, 0);
  }, [setTarget]);

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        // Sin transición CSS; controlamos con RAF para suavidad real
        willChange: "transform"
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;