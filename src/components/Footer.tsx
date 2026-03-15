"use client";

import React, { useState } from 'react';
import Logo from './Logo';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube, Music2, ArrowRight } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showSuccess("¡Gracias por suscribirte! Te enviaremos descuentos y novedades de Kinetora.");
    setEmail("");
  };

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#2A2A2A]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Columna izquierda: Logo + legales */}
          <div>
            <Logo className="h-10 mb-4" />
            <p className="text-[#F5F5F5]/80 text-sm mb-6">
              © {new Date().getFullYear()} Kinetora Studio. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-[#F5F5F5]/80">
              <a href="#" className="hover:text-[#B454FF] transition-colors">Terms And Conditions</a>
              <a href="#" className="hover:text-[#B454FF] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#B454FF] transition-colors">Cookies Settings</a>
            </div>
          </div>

          {/* Columna derecha: Newsletter + redes */}
          <div className="flex flex-col items-start lg:items-end text-center lg:text-right">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F5F5F5] uppercase">
              Suscríbete a nuestro<br className="hidden sm:block" /> newsletter
            </h3>
            <p className="text-[#F5F5F5]/70 mt-3 mb-6 max-w-xl">
              No te pierdas ninguna noticia, promoción o descuentos de nuestros servicios. ¿A qué esperas?
            </p>

            <form onSubmit={handleSubscribe} className="w-full max-w-lg flex gap-3">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 h-12 bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] rounded-xl"
                autoComplete="email"
                inputMode="email"
              />
              <Button
                type="submit"
                className="h-12 px-6 bg-[#B454FF] hover:bg-[#B454FF]/90 text-white font-bold rounded-xl inline-flex items-center gap-2"
              >
                Suscribirse
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-5">
              <a aria-label="TikTok" href="#" className="p-2 rounded-full hover:bg-white/5 transition-colors">
                <Music2 className="w-5 h-5 text-[#F5F5F5] hover:text-[#B454FF] transition-colors" />
              </a>
              <a aria-label="Facebook" href="#" className="p-2 rounded-full hover:bg-white/5 transition-colors">
                <Facebook className="w-5 h-5 text-[#F5F5F5] hover:text-[#B454FF] transition-colors" />
              </a>
              <a aria-label="Twitter (X)" href="#" className="p-2 rounded-full hover:bg-white/5 transition-colors">
                <Twitter className="w-5 h-5 text-[#F5F5F5] hover:text-[#B454FF] transition-colors" />
              </a>
              <a aria-label="YouTube" href="#" className="p-2 rounded-full hover:bg-white/5 transition-colors">
                <Youtube className="w-5 h-5 text-[#F5F5F5] hover:text-[#B454FF] transition-colors" />
              </a>
              <a aria-label="Instagram" href="#" className="p-2 rounded-full hover:bg-white/5 transition-colors">
                <Instagram className="w-5 h-5 text-[#F5F5F5] hover:text-[#B454FF] transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;