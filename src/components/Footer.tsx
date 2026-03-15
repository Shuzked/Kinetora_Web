"use client";

import React, { useState } from 'react';
import Logo from './Logo';
import PremiumButton from '@/components/PremiumButton';
import { Input } from "@/components/ui/input";
import { Mail } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { showSuccess } from '@/utils/toast';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) {
      setErr("Introduce un email válido.");
      return;
    }
    if (!consent) {
      setErr("Debes aceptar el consentimiento para suscribirte.");
      return;
    }

    setLoading(true);
    // Simulación de envío (aquí se conectaría tu backend o proveedor de email)
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      showSuccess("¡Gracias por suscribirte! Te enviaremos descuentos y novedades de Kinetora.");
      setEmail("");
      setConsent(false);
    }, 900);
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
            <Logo className="h-6 mb-4" />
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

            <form
              onSubmit={handleSubscribe}
              noValidate
              className="w-full max-w-lg space-y-2"
              aria-live="polite"
            >
              <div
                className={`relative flex items-center rounded-full border backdrop-blur-xl transition-all p-1
                ${err ? 'border-red-500/50' : 'border-white/15'}
                bg-white/10 hover:bg-white/12 focus-within:bg-white/14 focus-within:ring-2 focus-within:ring-[#B454FF]`}
              >
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F5F5]/60 pointer-events-none" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  className="min-w-0 flex-1 h-10 pl-11 pr-3 bg-transparent border-0 text-[#F5F5F5] placeholder:text-[#F5F5F5]/60 text-sm focus-visible:ring-0 focus-visible:outline-none"
                  autoComplete="email"
                  inputMode="email"
                  aria-label="Introduce tu email para suscribirte"
                  aria-invalid={!!err}
                />
                <PremiumButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="h-10 px-5 rounded-full leading-none inline-flex items-center gap-2 shrink-0"
                  aria-label="Suscribirse al newsletter"
                  isLoading={loading}
                >
                  Suscribirse
                </PremiumButton>
              </div>
            </form>

            <div className="w-full max-w-lg flex items-start gap-2 justify-start lg:justify-end">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(v) => setConsent(!!v)}
                className="rounded-[6px] border-white/30 data-[state=checked]:bg-[#B454FF] data-[state=checked]:border-[#B454FF]"
                aria-describedby="consent-desc"
              />
              <Label htmlFor="consent" className="text-[11px] text-[#F5F5F5]/70">
                Acepto recibir emails de Kinetora con descuentos, promociones y noticias. Podrás darte de baja en cualquier momento.
              </Label>
            </div>

            {/* Mensajes de error/success inline */}
            {err && (
              <p className="text-[12px] text-red-400" role="alert">
                {err}
              </p>
            )}
            {subscribed && !err && (
              <p className="text-[12px] text-green-400" role="status">
                ¡Listo! Revisa tu bandeja para confirmar la suscripción.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;