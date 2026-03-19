"use client";

import React from 'react';
import PremiumButton from '@/components/PremiumButton';
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
import { useI18n } from "@/i18n/I18nProvider";
import LanguageSwitcher, { LanguagePills } from "@/components/LanguageSwitcher";

const Navbar = () => {
  const { t, lang } = useI18n();

  const navLinks = [
    { name: t("nav.services"), href: "#servicios" },
    { name: t("nav.method"), href: "#como-funciona" },
    { name: t("nav.successes"), href: "#casos" },
    { name: t("nav.contact"), href: "#contacto" },
  ];

  const activeId = useScrollSpy(["servicios", "como-funciona", "casos", "contacto"]);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, 140], [0, 1]);
  const blurMV = useTransform(progress, (v) => `blur(${14 * v}px)`);
  const bgMV = useTransform(progress, (v) => `rgba(13,13,13,${0.12 * v})`);
  const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 767px)").matches;
  const borderOpacity = progress;

  return (
    <nav className="fixed top-0 z-50 w-full" aria-label={lang === "es" ? "Navegación principal" : "Primary navigation"}>
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none will-change-[backdrop-filter,opacity]"
        style={{
          opacity: progress,
          // Glass effect on all devices if possible, with a fallback for mobile
          backdropFilter: blurMV as unknown as string,
          WebkitBackdropFilter: blurMV as unknown as string,
          backgroundColor: bgMV as unknown as string,
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-[#2A2A2A] pointer-events-none"
        style={{ opacity: borderOpacity }}
      />

      <motion.div
        className="kin-container grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center h-[68px] md:h-[88px] relative"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-full flex items-center justify-start min-w-0">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
            <img
              src="/Favicon_Kinetora.svg"
              alt="Kinetora icon"
              className="h-8 w-8 md:hidden"
              width={32}
              height={32}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <span className="hidden md:inline-flex">
              <Logo className="h-6" />
            </span>
          </Link>
        </div>

        <div className="hidden md:flex h-full items-center justify-center gap-9 lg:gap-12 text-[12px] leading-none font-bold uppercase tracking-[0.2em] text-[#F5F5F5]/70" role="menubar" aria-label={lang === "es" ? "Enlaces de sección" : "Section links"}>
          {navLinks.map((link) => {
            const isActive = activeId === link.href.replace('#','');
            return (
              <span key={link.name} className="relative">
                <SmoothScrollLink 
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`transition-colors hover:text-[#B454FF] ${isActive ? 'text-[#B454FF]' : ''}`}
                >
                  {link.name}
                </SmoothScrollLink>
              </span>
            );
          })}
        </div>

        <div className="h-full flex items-center justify-end gap-2.5 md:gap-6 min-w-0">
          <LanguageSwitcher hideOnSmall />
          <Link to="/#contacto" className="shrink-0 hidden md:inline-flex">
            <PremiumButton variant="primary" size="md" className="leading-none">
              {t("nav.start").toUpperCase()}
            </PremiumButton>
          </Link>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#F5F5F5] h-10 w-10 rounded-full kin-touch-target" aria-label={lang === "es" ? "Abrir menú" : "Open menu"}>
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
                      className="text-xl font-black uppercase transition-colors hover:text-[#B454FF]"
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
      </motion.div>
    </nav>
  );
};

export default Navbar;