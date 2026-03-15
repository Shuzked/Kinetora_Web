"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-bold text-white mb-12 tracking-tighter">
            ¿Listo para acelerar <br/> tu crecimiento?
          </h2>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-12 h-20 text-2xl shadow-[0_0_50px_rgba(37,99,235,0.2)]">
            Agendar Sesión de Descubrimiento
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
          <div className="text-2xl font-bold text-white">
            KINETORA<span className="text-blue-500">.</span>
          </div>
          
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>

          <div className="text-sm text-gray-600">
            © 2024 Kinetora. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;