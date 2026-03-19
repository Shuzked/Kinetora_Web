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

  const onMove = React.useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < radius) {
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    } else {
      el.style.transform = "translate(0, 0)";
    }
  }, [radius, strength]);

  const onLeave = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transition: "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;