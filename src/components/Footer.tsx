"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] pt-24 pb-12 border-t border-[#2A2A2A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-black text-[#F5F5F5] mb-12 tracking-tighter leading-[0.9]">
            ¿LISTO PARA <br/> <span className="text-[#B454FF]">ACELERAR?</span>
          </h2>
          <Button size="lg" className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-12 h-20 text-2xl font-black shadow-[0_0_50px_rgba(180,84,255,0.2)]">
            Agendar Sesión de Descubrimiento
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#2A2A2A] pt-12">
          <Logo className="h-6" />
          
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A]">
            <a href="#" className="hover:text-[#F5F5F5] transition-colors">Privacidad</a>
            <a href="#" className="hover:text-[#F5F5F5] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#F5F5F5] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#F5F5F5] transition-colors">Twitter</a>
          </div>

          <div className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest">
            © 2024 Kinetora. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;