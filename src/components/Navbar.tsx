"use client";

import React, { useEffect, useState } from 'react';
import PremiumButton from '@/components/PremiumButton';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import KinetoraIcon from './KinetoraIcon';
import { Link } from 'react-router-dom';
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
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: t("nav.services"), href: "#servicios" },
    { name: t("nav.method"), href: "#como-funciona" },
    // Éxitos: scroll suave al bloque de casos en la home
    { name: t("nav.successes"), href: "#casos" },
    { name: t("nav.contact"), href: "#contacto" },
  ];

  const activeId = useScrollSpy(["servicios", "como-funciona", "casos", "contacto"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full" aria-label={lang === "es" ? "Navegación principal" : "Primary navigation"}>
      {/* Glass overlay - CSS only, no Framer Motion */}
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-[14px] bg-[#0D0D0D]/70 border-b border-[#2A2A2A]'
            : 'backdrop-blur-none bg-transparent border-b border-transparent'
        }`}
      />

      <div className="kin-container nav-height-protection grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center py-8 md:py-12 relative">
        <div className="flex items-center justify-start min-w-0">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
            <Logo className="h-6 hidden md:flex" />
            <KinetoraIcon className="h-8 w-8 flex md:hidden" />
          </Link>
        </div>

        <div
          className="hidden md:flex items-center justify-center gap-9 lg:gap-12 text-[12px] leading-none font-bold uppercase tracking-[0.2em] text-[#F5F5F5]/70"
          role="menubar"
          aria-label={lang === "es" ? "Enlaces de sección" : "Section links"}
        >
          {navLinks.map((link) => {
            const isActive = activeId === link.href.replace('#', '');
            return (
              <span key={link.name} className="relative">
                <SmoothScrollLink
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`transition-colors hover:text-[#B454FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded px-1 -mx-1 ${isActive ? 'text-[#B454FF]' : ''}`}
                >
                  {link.name}
                </SmoothScrollLink>
              </span>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2.5 md:gap-6 min-w-0">
          <LanguageSwitcher hideOnSmall />
          <Link to="/#contacto" className="shrink-0 hidden md:inline-flex">
            <PremiumButton variant="primary" size="md" className="leading-none">
              {t("nav.start").toUpperCase()}
            </PremiumButton>
          </Link>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#F5F5F5] h-10 w-10 rounded-full kin-touch-target"
                  aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
                >
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
                      className="text-xl font-black uppercase transition-colors hover:text-[#B454FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
                    >
                      {link.name}
                    </SmoothScrollLink>
                  ))}
                  <LanguagePills />
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