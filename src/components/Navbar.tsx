"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#2A2A2A] bg-[#0D0D0D]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo className="h-8" />
        </Link>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A] hover:text-[#F5F5F5] transition-colors">
          <a href="#servicios" className="hover:text-[#B454FF] transition-colors">Servicios</a>
          <a href="#como-funciona" className="hover:text-[#B454FF] transition-colors">Método</a>
          <a href="#casos" className="hover:text-[#B454FF] transition-colors">Portfolio</a>
          <a href="#precios" className="hover:text-[#B454FF] transition-colors">Planes</a>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login">
            <button className="text-[11px] font-bold text-[#2A2A2A] hover:text-[#F5F5F5] transition-colors tracking-widest">
              LOGIN
            </button>
          </Link>
          <Link to="/login">
            <Button className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-8 h-10 font-bold text-xs tracking-widest shadow-[0_0_20px_rgba(180,84,255,0.3)]">
              EMPEZAR
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;