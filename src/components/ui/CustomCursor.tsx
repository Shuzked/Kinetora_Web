"use client";

import React, { useEffect, useState } from "react";

/**
 * CustomCursor - Un cursor personalizado negro con ondas expansivas (ripples) moradas
 * 
 * Requisitos cumplidos:
 * - Oculta el cursor del sistema.
 * - Círculo negro de 12x12 ultra suave con transformaciones 3D.
 * - Ripple dinámico morado (#B454FF) creado y destruido en el JS (DOM state) tras la animación.
 * - z-index altísimo para flotar sobre todo el contenido web.
 */
const CustomCursor = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Detectamos si es un dispositivo táctil para no renderizar el cursor en móviles
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = document.getElementById("custom-cursor-dot");
    if (!cursor) return;

    // Animación fluida atada al ratón
    const moveCursor = (e: MouseEvent) => {
      // requestAnimationFrame aquí suele no ser tan necesario si usamos GPU transforms directly,
      // pero usar translate3d asegura renderizado ultra-rápido por hardware.
      // Restamos 6px para centrar el punto de 12x12
      cursor.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Creamos la onda en el punto exacto
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      
      setRipples(prev => [...prev, newRipple]);

      // Destruimos la onda después de 600ms para mantener el DOM limpio
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <>
      {/* 1. CSS INYECTADO: Ocultamos el cursor nativo globalmente y definimos la animación del Ripple */}
      <style>{`
        /* Oculta el cursor del sistema en móviles y escritorio */
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
        
        .cursor-ripple-anim {
          animation: rippleExpand 0.6s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
        }

        @keyframes rippleExpand {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
            border-width: 3px;
          }
          100% {
            transform: translate(-50%, -50%) scale(3.5);
            opacity: 0;
            border-width: 1px;
          }
        }
      `}</style>

      {/* 2. CURSOR NEGRO (Estático en DOM, movido por JS) */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
        <div
          id="custom-cursor-dot"
          className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full shadow-sm will-change-transform"
          style={{
            mixBlendMode: "difference",
            // El transition transform suaviza cuando el ratón frena bruscamente 
            transition: "transform 0.05s ease-out" 
          }}
        />

        {/* 3. ONDAS EXPANSIVAS (Creadas y destruidas dinámicamente) */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="cursor-ripple-anim absolute w-10 h-10 border-[#B454FF] rounded-full will-change-transform"
            style={{
              left: ripple.x + "px",
              top: ripple.y + "px",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default CustomCursor;
