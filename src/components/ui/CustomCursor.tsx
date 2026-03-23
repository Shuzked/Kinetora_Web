"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CustomCursor = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = document.getElementById("custom-cursor-dot");
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (cursor) {
        cursor.classList.add("is-clicked");
        setTimeout(() => cursor.classList.remove("is-clicked"), 150);
      }
      
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      
      setRipples(prev => [...prev, newRipple]);

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
  }, [mounted]);

  if (!mounted) return null;

  const cursorContent = (
    <>
      {/* DOT ÚNICO: Mantiene 'mix-blend-mode' global, se mueve con JS y se encoge con CSS scale puro */}
      <div id="custom-cursor-dot" />

      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="cursor-ripple-anim fixed w-10 h-10 border-[#B454FF] rounded-full pointer-events-none z-[99998]"
          style={{
            left: ripple.x + "px",
            top: ripple.y + "px",
          }}
        />
      ))}
    </>
  );

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
        
        /* Un solo elemento garantiza el mix-blend-mode y previene stacking contexts aislados */
        #custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 12px;
          height: 12px;
          margin-top: -6px;
          margin-left: -6px;
          background-color: #B454FF; /* Solicitado a morado absoluto conservando modo diferencial */
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          transform-origin: center center;
          transition: transform 0.05s ease-out;
          will-change: transform;
        }

        #custom-cursor-dot.is-clicked {
          animation: cursorClickAnim 0.15s ease-out forwards;
        }

        /* CLAVE MAESTRA: Usar 'scale' independiente. NUNCA usar 'transform: scale()' 
           porque machaca el 'transform: translate()' del JS, enviando el cursor al (0,0) al hacer click */
        @keyframes cursorClickAnim {
          0% { scale: 1; }
          50% { scale: 0.5; }
          100% { scale: 1; }
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
      
      {/* 
        El Portales clave: Montar elementos con mix-blend-mode directamente en el body, 
        fuera de toda la jerarquía de DOM de React, asegura que ningún contenedor padre aislará la luz.
      */}
      {createPortal(cursorContent, document.body)}
    </>
  );
};

export default CustomCursor;
