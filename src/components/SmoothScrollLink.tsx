"use client";

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Encuentra el contenedor desplazable (window o un elemento con overflow).
 */
function getScrollContainer(): HTMLElement | Window {
  let node: HTMLElement | null = document.scrollingElement as HTMLElement;
  if (!node) return window;
  // Si el documento es el que scrollea, devolvemos window
  return window;
}

/**
 * Obtiene la altura del navbar fijo para compensar el ancla.
 */
function getNavbarOffset(): number {
  const nav = document.querySelector("nav");
  const h = nav instanceof HTMLElement ? nav.offsetHeight : 0;
  // Pequeño margen extra para no pegarse al borde
  return h + 8;
}

/**
 * Animación de scroll suave con requestAnimationFrame (fallback universal).
 */
function smoothScrollTo(targetY: number, duration = 600) {
  const container = getScrollContainer();
  const startY = window.scrollY;
  const dist = targetY - startY;
  let start: number | null = null;

  const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function step(ts: number) {
    if (start === null) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(1, elapsed / duration);
    const y = startY + dist * ease(progress);

    if ("scrollTo" in window) {
      window.scrollTo(0, y);
    } else {
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
    }

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const SmoothScrollLink: React.FC<Props> = ({ href, className = "", children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isHomeAnchor = href.startsWith("#") || href.startsWith("/#");
    if (!isHomeAnchor) return; 
    
    e.preventDefault();
    const anchorId = href.includes("#") ? href.split("#")[1] : "";
    if (!anchorId) return;

    // Si no estamos en la Home, navegamos a la Home con el hash
    if (location.pathname !== "/") {
      navigate(`/#${anchorId}`);
      return;
    }

    // Si estamos en la Home, ejecutamos el scroll suave
    // Cerrar menú móvil si está abierto (sheet radix)
    const anySheet = document.querySelector("[data-radix-sheet-content]");
    if (anySheet) {
      (document.activeElement as HTMLElement | null)?.blur();
      const esc = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(esc);
      setTimeout(() => scrollToAnchor(anchorId), 50);
    } else {
      scrollToAnchor(anchorId);
    }

    function scrollToAnchor(id: string) {
      const el = document.getElementById(id);
      if (!el) {
        window.location.hash = id;
        return;
      }

      const navOffset = getNavbarOffset();
      const rect = el.getBoundingClientRect();
      const absoluteY = rect.top + window.scrollY - navOffset;

      smoothScrollTo(absoluteY, 650);
      window.history.replaceState(null, "", `/#${id}`);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;