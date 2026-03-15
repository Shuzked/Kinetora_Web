"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PremiumButton from "@/components/PremiumButton";

const FloatingCTA: React.FC = () => {
  const { scrollY } = useScroll();
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
          <PremiumButton
            onClick={handlePlanClick}
            variant="primary"
            size="sm"
            className="flex-1 rounded-xl"
          >
            Ver Planes
          </PremiumButton>
          <PremiumButton
            variant="glass"
            size="sm"
            onClick={handleServiciosClick}
            className="flex-1 rounded-xl"
          >
            Servicios
          </PremiumButton>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingCTA;