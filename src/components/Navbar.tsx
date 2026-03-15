"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#2A2A2A] bg-[#0D0D0D]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="text-2xl font-black tracking-tighter text-[#F5F5F5] flex items-center gap-1">
          KINETORA<span className="w-2 h-2 bg-[#B454FF] rounded-full shadow-[0_0_10px_#B454FF]" />
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A] hover:text-[#F5F5F5] transition-colors">
          <a href="#servicios" className="hover:text-[#B454FF] transition-colors">Servicios</a>
          <a href="#como-funciona" className="hover:text-[#B454FF] transition-colors">Método</a>
          <a href="#casos" className="hover:text-[#B454FF] transition-colors">Portfolio</a>
          <a href="#precios" className="hover:text-[#B454FF] transition-colors">Planes</a>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-[11px] font-bold text-[#2A2A2A] hover:text-[#F5F5F5] transition-colors tracking-widest">
            LOGIN
          </button>
          <Button className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-8 h-10 font-bold text-xs tracking-widest shadow-[0_0_20px_rgba(180,84,255,0.3)]">
            EMPEZAR
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;