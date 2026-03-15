"use client";

import React, { useState } from 'react';
import Logo from './Logo';
import PremiumButton from '@/components/PremiumButton';
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { showSuccess } from '@/utils/toast';
import { motion } from 'framer-motion';

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
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Logo className="h-10 mb-4" />
            <p className="text-[#F5F5F5]/80 text-sm mb-6">
              © {new Date().getFullYear()} Kinetora Studio. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-[#F5F5F5]/80">
              <a href="#" className="hover:text-[#B454FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded">
                Terms And Conditions
              </a>
              <a href="#" className="hover:text-[#B454FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#B454FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded">
                Cookies Settings
              </a>
            </div>
          </motion.div>

          {/* Columna derecha: Newsletter + redes */}
          <motion.div
            className="flex flex-col items-start lg:items-end text-center lg:text-right"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B454FF]/10 border border-[#B454FF]/30 text-[#B454FF] text-[11px] font-extrabold tracking-widest uppercase mb-3">
              -10% primer mes • Promos y noticias
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F5F5F5] uppercase">
              Suscríbete a nuestro<br className="hidden sm:block" /> newsletter
            </h3>
            <p className="text-[#F5F5F5]/70 mt-3 mb-6 max-w-xl">
              No te pierdas ninguna noticia, promoción o descuentos de nuestros servicios. ¿A qué esperas?
            </p>

            <form onSubmit={handleSubscribe} className="w-full max-w-lg flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F5F5]/60 pointer-events-none" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  className="h-12 w-full pl-11 pr-4 rounded-full bg-white/10 hover:bg-white/12 focus:bg-white/14 backdrop-blur-xl border border-white/15 text-[#F5F5F5] placeholder:text-[#F5F5F5]/50 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                  autoComplete="email"
                  inputMode="email"
                  aria-label="Introduce tu email para suscribirte"
                />
              </div>
              <PremiumButton
                type="submit"
                variant="primary"
                size="md"
                className="h-12 px-6 rounded-full inline-flex items-center gap-2"
                aria-label="Suscribirse al newsletter"
              >
                Suscribirse
                <ArrowRight className="w-4 h-4" />
              </PremiumButton>
            </form>

            <div className="mt-6 flex items-center gap-2 sm:gap-3">
              <a
                aria-label="TikTok"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                title="TikTok"
              >
                <SiTiktok className="w-5 h-5 text-[#F5F5F5] hover:text-[#B454FF] transition-colors" />
              </a>
              <a
                aria-label="Facebook"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                title="Facebook"
              >
                <FaFacebookF className="w-5 h-5 text-[#F5F5F5] hover:text-[#B454FF] transition-colors" />
              </a>
              <a
                aria-label="Twitter (X)"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                title="Twitter (X)"
              >
                <FaTwitter className="w-5 h-5 text-[#F5F5F5] hover:text-[#B454FF] transition-colors" />
              </a>
              <a
                aria-label="YouTube"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                title="YouTube"
              >
                <FaYoutube className="w-5 h-5 text-[#F5F5F5] hover:text-[#B454FF] transition-colors" />
              </a>
              <a
                aria-label="Instagram"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                title="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-[#F5F5F5] hover:text-[#B454FF] transition-colors" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;