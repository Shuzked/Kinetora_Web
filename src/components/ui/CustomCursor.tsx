"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = document.getElementById("custom-cursor-dot");
    if (!cursor) return;

    let reqRef: number;
    const moveCursor = (e: MouseEvent) => {
      // Usamos requestAnimationFrame para no saturar al Event Loop y mejorar INP/TBT
      if (reqRef) cancelAnimationFrame(reqRef);
      reqRef = requestAnimationFrame(() => {
        // translate3d fuerza la aceleración por la GPU (Hardware Acceleration) en todos los navegadores
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Animación de escala puro CSS independiente
      cursor.classList.add("is-clicked");
      setTimeout(() => cursor.classList.remove("is-clicked"), 150);
      
      // Creamos el Ripple 100% con Vanilla JS. 
      // Hacer state-updates de React aquí causaba re-renderizados que rompían el "transform" del cursor
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple-anim fixed border-[#B454FF] rounded-full pointer-events-none z-[99998]";
      ripple.style.width = "40px";
      ripple.style.height = "40px";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      
      document.body.appendChild(ripple);

      // Limpiamos el DOM tras la animación
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (reqRef) cancelAnimationFrame(reqRef);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [mounted]);

  if (!mounted) return null;

  const cursorContent = (
    <>
      <div id="custom-cursor-dot" />
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
        
        #custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 12px;
          height: 12px;
          margin-top: -6px;
          margin-left: -6px;
          background-color: #B454FF; /* Solicitado a morado absoluto conservando modo diferencial */
          box-shadow: 0 0 12px 2px rgba(180, 84, 255, 0.45); /* Resplandor sutil animado (Glow) */
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

        /* El punto mantendrá el mix-blend-mode y su transform(X,Y). 
           La animación se hace con 'width' y 'height' para NUNCA tocar 'transform' y evitar bugs de Safari */
        @keyframes cursorClickAnim {
          0% { 
            width: 12px; height: 12px; 
            margin-top: -6px; margin-left: -6px; 
          }
          50% { 
            width: 6px; height: 6px; 
            margin-top: -3px; margin-left: -3px; 
          }
          100% { 
            width: 12px; height: 12px; 
            margin-top: -6px; margin-left: -6px; 
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
      
      {createPortal(cursorContent, document.body)}
    </>
  );
};

export default CustomCursor;
