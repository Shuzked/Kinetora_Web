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

    const cursor = document.getElementById("custom-cursor-container");
    const dot = document.getElementById("custom-cursor-dot");
    if (!cursor || !dot) return;

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
      // Animación de escala puro CSS independiente sobre el DOT, no sobre el container
      dot.classList.add("is-clicked");
      setTimeout(() => dot.classList.remove("is-clicked"), 150);
      
      // Ripple hardware accelerated
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple-anim fixed border-[#B454FF] rounded-full pointer-events-none z-[99998]";
      ripple.style.width = "40px";
      ripple.style.height = "40px";
      ripple.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      ripple.style.left = "0";
      ripple.style.top = "0";
      ripple.style.marginLeft = "-20px";
      ripple.style.marginTop = "-20px";
      
      document.body.appendChild(ripple);

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
    <div id="custom-cursor-container">
      <div id="custom-cursor-dot" />
    </div>
  );

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
        
        #custom-cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          mix-blend-mode: difference;
          transition: transform 0.08s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        #custom-cursor-dot {
          width: 12px;
          height: 12px;
          margin-top: -6px;
          margin-left: -6px;
          background-color: #B454FF; 
          box-shadow: 0 0 12px 2px rgba(180, 84, 255, 0.45);
          border-radius: 50%;
          transform-origin: center center;
          will-change: transform;
        }

        #custom-cursor-dot.is-clicked {
          animation: cursorClickAnim 0.15s ease-out forwards;
        }

        /* 🚀 ZERO REFLOW: Usamos scale() en lugar de width/height */
        @keyframes cursorClickAnim {
          0% { transform: scale(1); }
          50% { transform: scale(0.6); }
          100% { transform: scale(1); }
        }

        .cursor-ripple-anim {
          animation: rippleExpand 0.6s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes rippleExpand {
          0% {
            transform: translate3d(var(--x, 0), var(--y, 0), 0) scale(0.5);
            opacity: 0.8;
            border-width: 3px;
          }
          100% {
            transform: translate3d(var(--x, 0), var(--y, 0), 0) scale(3.5);
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
