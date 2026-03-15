"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from './Logo';
import { Facebook, Twitter, Instagram, Youtube, Tiktok, ArrowRight } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Validación simple; el input HTML5 ya valida formato
    showSuccess("¡Gracias por suscribirte! Te enviaremos descuentos y novedades de Kinetora.");
    setEmail("");
  };

  return (
    <footer className="bg-[#0D0D0D] pt-20 sm:pt-24 lg:pt-32 pb-10 sm:pb-12 border-t border-[#2A2A2A]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* CTA superior */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-4xl md:text-8xl font-black text-[#F5F5F5] mb-9 sm:mb-10 md:mb-12 tracking-tighter leading-[1] md:leading-[0.9]">
            ¿LISTO PARA <br />
            <span className="text-[#B454FF]">ACELERAR?</span>
          </h2>
          <Button
            size="lg"
            className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-8 md:px-12 h-14 md:h-20 text-lg md:text-2xl font-black shadow-[0_0_50px_rgba(180,84,255,0.2)] w-full md:w-auto"
          >
            Agendar Sesión de Descubrimiento
          </Button>
        </div>

        {/* Newsletter + Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Newsletter card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl md:rounded-3xl border border-[#2A2A2A] bg-[#111111] p-5 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-[#F5F5F5] tracking-tight">
                    Únete a la newsletter
                  </h3>
                  <p className="text-[11px] md:text-xs text-[#2A2A2A] font-bold uppercase tracking-widest mt-1">
                    Descuentos, promociones y noticias de Kinetora — 1 o 2 emails/mes
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  inputMode="email"
                  className="bg-[#0D0D0D] border-[#2A2A2A] text-[#F5F5F5] rounded-xl h-12 sm:h-12"
                  required
                />
                <Button
                  type="submit"
                  className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-xl h-12 sm:h-12 px-6 font-bold tracking-widest inline-flex items-center justify-center gap-2"
                >
                  Suscribirme
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <p className="mt-3 text-[10px] text-[#2A2A2A]">
                Al suscribirte aceptas recibir comunicaciones de Kinetora. Puedes darte de baja en cualquier momento.
              </p>
            </div>
          </div>

          {/* Socials card */}
          <div className="rounded-2xl md:rounded-3xl border border-[#2A2A2A] bg-[#111111] p-5 sm:p-6 md:p-8">
            <h4 className="text-lg font-black text-[#F5F5F5] tracking-tight mb-4">Síguenos</h4>
            <div className="grid grid-cols-5 gap-2">
              {[
                { Icon: Tiktok, label: "TikTok", href: "#" },
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: Twitter, label: "Twitter (X)", href: "#" },
                { Icon: Youtube, label: "YouTube", href: "#" },
                { Icon: Instagram, label: "Instagram", href: "#" },
              ].map(({ Icon, label, href }, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <a
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center h-12 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                    >
                      <Icon className="w-5 h-5 text-[#F5F5F5] group-hover:text-[#B454FF] transition-colors" />
                      <span className="sr-only">{label}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]">
                    {label}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Línea inferior: logo + enlaces legales + copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#2A2A2A] pt-10 sm:pt-12">
          <Logo className="h-6" />

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A]">
            <a href="#" className="hover:text-[#F5F5F5] transition-colors">Privacidad</a>
            <a href="#" className="hover:text-[#F5F5F5] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#F5F5F5] transition-colors">Contacto</a>
          </div>

          <div className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest text-center">
            © {new Date().getFullYear()} Kinetora. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;