"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navLinks = [
    { name: "Servicios", href: "#servicios" },
    { name: "Método", href: "#como-funciona" },
    { name: "Portfolio", href: "#casos" },
    { name: "Planes", href: "#precios" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#2A2A2A] bg-[#0D0D0D]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo className="h-7 md:h-8" />
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-[#B454FF] transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/login" className="hidden sm:block">
            <button className="text-[11px] font-bold text-[#2A2A2A] hover:text-[#F5F5F5] transition-colors tracking-widest">
              LOGIN
            </button>
          </Link>
          <Link to="/login">
            <Button className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-6 md:px-8 h-10 font-bold text-[10px] md:text-xs tracking-widest shadow-[0_0_20px_rgba(180,84,255,0.3)]">
              EMPEZAR
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#F5F5F5]">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5]">
                <div className="flex flex-col gap-8 mt-12">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      className="text-xl font-black uppercase tracking-tighter hover:text-[#B454FF] transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                  <hr className="border-[#2A2A2A]" />
                  <Link to="/login" className="text-xl font-black uppercase tracking-tighter hover:text-[#B454FF]">
                    LOGIN
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;