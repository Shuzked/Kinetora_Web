"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import SmoothScrollLink from '@/components/SmoothScrollLink';
import useScrollSpy from '@/hooks/use-scroll-spy';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
  const navLinks = [
    { name: "Servicios", href: "#servicios" },
    { name: "Método", href: "#como-funciona" },
    { name: "Portfolio", href: "#casos" },
    { name: "Planes", href: "#precios" },
  ];

  const activeId = useScrollSpy(["servicios", "como-funciona", "casos", "precios"]);

  // Progreso de scroll para calcular blur/opacidad de manera continua
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, 140], [0, 1]); // 0 a 140px de scroll
  const blurMV = useTransform(progress, (v) => `blur(${14 * v}px)`); // blur medio y sutil
  const bgMV = useTransform(progress, (v) => `rgba(13,13,13,${0.12 * v})`); // tinte muy ligero
  const borderOpacity = progress;

  return (
    <nav className="fixed top-0 z-50 w-full">
      {/* Fondo con blur progresivo (sin brillo) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none will-change-[backdrop-filter,opacity]"
        style={{
          opacity: progress,
          backdropFilter: blurMV as any,
          WebkitBackdropFilter: blurMV as any,
          backgroundColor: bgMV as any,
        }}
      />
      {/* Borde inferior con opacidad progresiva */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-[#2A2A2A] pointer-events-none"
        style={{ opacity: borderOpacity }}
      />

      {/* Contenido del navbar con animación de aparición inicial */}
      <motion.div
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center h-[68px] md:h-[88px] relative"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Izquierda: Logo (alineado verticalmente) */}
        <div className="h-full flex items-center justify-start">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo className="h-6" />
          </Link>
        </div>

        {/* Centro: Desktop Nav centrado y alineado verticalmente */}
        <div className="hidden md:flex h-full items-center justify-center gap-9 lg:gap-12 text-[12px] leading-none font-bold uppercase tracking-[0.2em] text-[#2A2A2A]">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.replace('#','');
            return (
              <span key={link.name} className="relative">
                <SmoothScrollLink 
                  href={link.href}
                  className={`transition-colors hover:text-[#B454FF] ${isActive ? 'text-[#B454FF]' : ''}`}
                >
                  {link.name}
                </SmoothScrollLink>
              </span>
            );
          })}
        </div>

        {/* Derecha: Acciones (alineado vertical y baseline consistente) */}
        <div className="h-full flex items-center justify-end gap-3 md:gap-6">
          <Link to="/login" className="hidden sm:block">
            <button className="inline-flex items-center justify-center h-10 md:h-12 px-3 text-[12px] leading-none font-bold text-[#2A2A2A] hover:text-[#F5F5F5] transition-colors">
              LOGIN
            </button>
          </Link>
          <Link to="/login">
            <Button className="inline-flex items-center justify-center h-10 md:h-12 px-6 md:px-9 bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full font-bold text-[12px] md:text-sm leading-none tracking-[0.2em] shadow-[0_0_20px_rgba(180,84,255,0.3)]">
              EMPEZAR
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#F5F5F5] h-10 w-10">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5]"
                onOpenAutoFocus={() => document.body.setAttribute("data-sheet-open", "true")}
                onCloseAutoFocus={() => document.body.removeAttribute("data-sheet-open")}
              >
                <div className="flex flex-col gap-8 mt-12">
                  {navLinks.map((link) => (
                    <SmoothScrollLink 
                      key={link.name} 
                      href={link.href} 
                      className={`text-xl font-black uppercase tracking-titter transition-colors ${activeId === link.href.replace('#','') ? 'text-[#B454FF]' : 'hover:text-[#B454FF]'}`}
                    >
                      {link.name}
                    </SmoothScrollLink>
                  ))}
                  <hr className="border-[#2A2A2A]" />
                  <Link to="/login" className="text-xl font-black uppercase tracking-titter hover:text-[#B454FF]">
                    LOGIN
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;