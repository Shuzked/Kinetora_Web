"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-1">
          KINETORA<span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-gray-400">
          <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
          <a href="#como-funciona" className="hover:text-white transition-colors">Método</a>
          <a href="#casos" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#precios" className="hover:text-white transition-colors">Planes</a>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
            LOGIN
          </button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-11 font-bold shadow-[0_0_20px_rgba(0,102,255,0.3)]">
            EMPEZAR
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;