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
      // IMPORTANTE: Usamos 'translate' en vez de 'translate3d' porque 'translate3d' fuerza renderizado por hardware,
      // lo cual aísla la capa y ROMPE el mix-blend-mode por completo en Safari y navegadores basados en Webkit.
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    };

    const handleMouseDown = (e: MouseEvent) => {
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
      <div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[99999]"
        style={{
          mixBlendMode: "difference",
          transition: "transform 0.05s ease-out" 
        }}
      />

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
