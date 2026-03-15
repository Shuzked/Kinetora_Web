"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="text-2xl font-bold tracking-tighter text-white">
          KINETORA<span className="text-blue-500">.</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
          <a href="#como-funciona" className="hover:text-white transition-colors">Cómo Funciona</a>
          <a href="#casos" className="hover:text-white transition-colors">Casos de Éxito</a>
          <a href="#precios" className="hover:text-white transition-colors">Precios</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Login
          </button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
            Agendar Llamada
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;