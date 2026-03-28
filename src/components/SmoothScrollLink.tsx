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
    if (!href.startsWith("#")) return; // Enlaces externos/rutas normales
    e.preventDefault();

    // Cerrar menú móvil si está abierto (sheet radix)
    const anySheet = document.querySelector("[data-radix-sheet-content]");
    if (anySheet) {
      const closeBtn = anySheet.parentElement?.querySelector("button,[data-state='open']");
      // Dispara un click fuera o cambia el estado abriendo/cerrando con el trigger si existe
      (document.activeElement as HTMLElement | null)?.blur();
      // Forzamos cerrar con escape
      const esc = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(esc);
      // Pequeño delay para que cierre y no afecte al scroll
      setTimeout(() => scrollToAnchor(), 50);
    } else {
      scrollToAnchor();
    }

    function scrollToAnchor() {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) {
        // Si no está en la página actual, usamos React Router para navegar a la home con el hash
        navigate("/" + href);
        return;
      }

      const navOffset = getNavbarOffset();
      const rect = el.getBoundingClientRect();
      const absoluteY = rect.top + window.scrollY - navOffset;

      // Polyfill smooth scroll
      smoothScrollTo(absoluteY, 650);

      // Actualiza hash sin salto
      history.replaceState(null, "", href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;