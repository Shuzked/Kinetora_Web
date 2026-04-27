"use client";

import React, { useEffect, useState } from 'react';
import PremiumButton from '@/components/PremiumButton';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import KinetoraIcon from './KinetoraIcon';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import SmoothScrollLink from '@/components/SmoothScrollLink';
import useScrollSpy from '@/hooks/use-scroll-spy';
import { useI18n } from "@/i18n/I18nProvider";
import LanguageSwitcher, { LanguagePills } from "@/components/LanguageSwitcher";

const Navbar = () => {
  const { t, lang } = useI18n();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: t("nav.services"), href: "#servicios" },
    { name: t("nav.method"), href: "#como-funciona" },
    // Éxitos: scroll suave al bloque de casos en la home
    { name: t("nav.successes"), href: "#casos" },
    { name: t("nav.about"), to: "/sobre" },
    { name: t("nav.plans"), href: "#precios" },
  ];

  const activeId = useScrollSpy(["servicios", "como-funciona", "casos", "precios"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full" aria-label={lang === "es" ? "Navegación principal" : "Primary navigation"}>
      {/* Solid background - No Glassmorphism */}
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
          scrolled
            ? 'bg-[#0D0D0D] border-b border-[#2A2A2A]'
            : 'bg-transparent border-b border-transparent'
        }`}
      />

      <div className="kin-container nav-height-protection flex items-center justify-between py-4 md:py-6 relative">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
            <Logo className="h-6 hidden md:flex" />
            <KinetoraIcon className="h-6 w-6 flex md:hidden" />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div
          className="hidden md:flex items-center justify-center gap-6 lg:gap-10 text-[11px] lg:text-[12px] leading-none font-bold uppercase tracking-[0.2em] text-[#F5F5F5]/70 absolute left-1/2 -translate-x-1/2"
          role="menubar"
          aria-label={lang === "es" ? "Enlaces de sección" : "Section links"}
        >
          {navLinks.map((link) => {
            const isActive = link.href ? activeId === link.href.replace('#', '') : location.pathname === link.to;
            
            return (
              <span key={link.name} className="relative">
                {link.href ? (
                  <SmoothScrollLink
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`transition-colors hover:text-[#B454FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded px-1 -mx-1 ${isActive ? 'text-[#B454FF]' : ''}`}
                  >
                    {link.name}
                  </SmoothScrollLink>
                ) : (
                  <Link
                    to={link.to!}
                    aria-current={isActive ? "page" : undefined}
                    className={`transition-colors hover:text-[#B454FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded px-1 -mx-1 ${isActive ? 'text-[#B454FF]' : ''}`}
                  >
                    {link.name}
                  </Link>
                )}
              </span>
            );
          })}
        </div>

        {/* Right: Flag + Button */}
        <div className="flex-1 flex items-center justify-end gap-2.5 md:gap-6 min-w-0">
          <LanguageSwitcher hideOnSmall />
          <PremiumButton 
            variant="primary" 
            size="md" 
            className="shrink-0 hidden md:inline-flex leading-none"
            onClick={() => {
              const el = document.getElementById('contacto');
              if (el) {
                const nav = document.querySelector('nav');
                const offset = (nav?.offsetHeight || 0) + 16;
                const rect = el.getBoundingClientRect();
                const y = rect.top + window.scrollY - offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              } else {
                window.location.href = '/#contacto';
              }
            }}
          >
            {t("nav.start").toUpperCase()}
          </PremiumButton>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#F5F5F5] h-12 w-12 min-h-[48px] min-w-[48px] rounded-full kin-touch-target"
                  aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[360px] border-l border-[#2A2A2A] text-[#F5F5F5] bg-[#0D0D0D]/95 backdrop-blur-md p-0 transition-transform duration-300 ease-out"
                onOpenAutoFocus={() => document.body.setAttribute("data-sheet-open", "true")}
                onCloseAutoFocus={() => document.body.removeAttribute("data-sheet-open")}
              >
                <div className="flex flex-col gap-2 mt-20 px-8 pb-10">
                  {navLinks.map((link) => (
                    link.href ? (
                      <SmoothScrollLink
                        key={link.name}
                        href={link.href}
                        className="text-2xl font-black uppercase transition-colors hover:text-[#B454FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded-xl py-4 px-3 -mx-3 flex items-center min-h-[56px] kin-touch-target border-b border-white/5"
                      >
                        {link.name}
                      </SmoothScrollLink>
                    ) : (
                      <Link
                        key={link.name}
                        to={link.to!}
                        className="text-2xl font-black uppercase transition-colors hover:text-[#B454FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded-xl py-4 px-3 -mx-3 flex items-center min-h-[56px] kin-touch-target border-b border-white/5"
                      >
                        {link.name}
                      </Link>
                    )
                  ))}
                  <div className="mt-8">
                    <LanguagePills />
                  </div>
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