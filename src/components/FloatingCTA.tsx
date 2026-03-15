"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

const FloatingCTA: React.FC = () => {
  const { scrollY } = useScroll();
  // Muestra el CTA a partir de ~240px de scroll
  const visible = useTransform(scrollY, [0, 240, 300], [0, 0, 1]);

  const handlePlanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("precios");
    if (!el) return;
    const nav = document.querySelector("nav");
    const navH = nav instanceof HTMLElement ? nav.offsetHeight : 0;
    const y = el.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleServiciosClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("servicios");
    if (!el) return;
    const nav = document.querySelector("nav");
    const navH = nav instanceof HTMLElement ? nav.offsetHeight : 0;
    const y = el.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <motion.div
      style={{ opacity: visible, pointerEvents: visible as unknown as "auto" }}
      className="fixed bottom-5 left-0 right-0 z-[55] px-4 sm:px-6 md:hidden"
    >
      <div className="mx-auto max-w-6xl">
        <div className="backdrop-blur-xl bg-[#0D0D0D]/70 border border-[#2A2A2A] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-2 flex items-center gap-2">
          <Button
            onClick={handlePlanClick}
            className="flex-1 bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-xl h-11 text-[11px] font-bold tracking-widest"
          >
            Ver Planes
          </Button>
          <Button
            variant="outline"
            onClick={handleServiciosClick}
            className="flex-1 border-white/10 text-[#F5F5F5] hover:bg-white/5 rounded-xl h-11 text-[11px] font-bold tracking-widest"
          >
            Servicios
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingCTA;