"use client";

import React from "react";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const SmoothScrollLink: React.FC<Props> = ({ href, className = "", children }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return; // Enlaces externos o rutas normales
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) {
      // Si no existe la sección (p. ej. estando en otra ruta), dejamos que el navegador navegue
      window.location.href = href;
      return;
    }

    const nav = document.querySelector("nav");
    const navHeight = nav instanceof HTMLElement ? nav.offsetHeight : 0;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight - 8; // pequeño margen adicional

    window.scrollTo({ top: y, behavior: "smooth" });
    // Opcional: actualizar hash sin salto brusco
    history.replaceState(null, "", href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;