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
import { useI18n } from "@/i18n/I18nProvider";

const Footer = () => {
  const { lang } = useI18n();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const strings =
    lang === "es"
      ? {
          badge: "-10% primer mes • Promos y noticias",
          title: "Suscríbete a nuestro\nnewsletter",
          sub:
            "No te pierdas ninguna noticia, promoción o descuentos de nuestros servicios. ¿A qué esperas?",
          placeholder: "Tu email",
          inputAria: "Introduce tu email para suscribirte",
          btn: "Suscribirse",
          btnAria: "Suscribirse al newsletter",
          consent:
            "Acepto recibir emails de Kinetora con descuentos, promociones y noticias. Podrás darte de baja en cualquier momento.",
          errEmail: "Introduce un email válido.",
          errConsent: "Debes aceptar el consentimiento para suscribirte.",
          toast: "¡Gracias por suscribirte! Te enviaremos descuentos y novedades de Kinetora.",
          inlineOk: "¡Listo! Revisa tu bandeja para confirmar la suscripción.",
          legal1: "Términos y condiciones",
          legal2: "Política de privacidad",
          legal3: "Cookies",
          rights: "Todos los derechos reservados.",
        }
      : {
          badge: "-10% first month • Promos & updates",
          title: "Subscribe to our\nnewsletter",
          sub: "Don't miss any updates, promotions or discounts. Ready to start?",
          placeholder: "Your email",
          inputAria: "Enter your email to subscribe",
          btn: "Subscribe",
          btnAria: "Subscribe to the newsletter",
          consent:
            "I agree to receive emails from Kinetora with discounts, promotions and updates. You can unsubscribe at any time.",
          errEmail: "Please enter a valid email.",
          errConsent: "You must accept consent to subscribe.",
          toast: "Thanks for subscribing! We'll send you discounts and Kinetora updates.",
          inlineOk: "All set! Check your inbox to confirm your subscription.",
          legal1: "Terms & Conditions",
          legal2: "Privacy Policy",
          legal3: "Cookie Settings",
          rights: "All rights reserved.",
        };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) {
      setErr(strings.errEmail);
      return;
    }
    if (!consent) {
      setErr(strings.errConsent);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      showSuccess(strings.toast);
      setEmail("");
      setConsent(false);
    }, 900);
  };

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#2A2A2A]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Logo className="h-6 mb-4" />
            <p className="text-[#F5F5F5]/80 text-sm mb-3">
              © {new Date().getFullYear()} Kinetora Studio. {strings.rights}
            </p>
            
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://www.tiktok.com/@kinetora_studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <SiTiktok className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61585355507008"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/Kinetora_Studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@Kinetora_Studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <FaYoutube className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/kinetora_studio/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-[#F5F5F5]/80">
              <a href="#" className="hover:text-[#B454FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded">
                {strings.legal1}
              </a>
              <a href="#" className="hover:text-[#B454FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded">
                {strings.legal2}
              </a>
              <a href="#" className="hover:text-[#B454FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded">
                {strings.legal3}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-start lg:items-end text-center lg:text-right"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B454FF]/10 border border-[#B454FF]/30 text-[#B454FF] text-[11px] font-extrabold tracking-widest uppercase mb-3">
              {strings.badge}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F5F5F5] uppercase whitespace-pre-line">
              {strings.title}
            </h3>
            <p className="text-[#F5F5F5]/70 mt-3 mb-6 max-w-xl">
              {strings.sub}
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
                  placeholder={strings.placeholder}
                  className="min-w-0 flex-1 h-10 pl-11 pr-3 bg-transparent border-0 text-[#F5F5F5] placeholder:text-[#F5F5F5]/60 text-sm focus-visible:ring-0 focus-visible:outline-none"
                  autoComplete="email"
                  inputMode="email"
                  aria-label={strings.inputAria}
                  aria-invalid={!!err}
                />
                <PremiumButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="h-10 px-5 rounded-full shrink-0 text-center"
                  aria-label={strings.btnAria}
                  isLoading={loading}
                >
                  {strings.btn}
                </PremiumButton>
              </div>
            </form>

            <div className="w-full max-w-lg mt-4 sm:mt-5 flex items-start gap-2 justify-start lg:justify-end">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(v) => setConsent(!!v)}
                className="rounded-[6px] border-white/30 data-[state=checked]:bg-[#B454FF] data-[state=checked]:border-[#B454FF]"
                aria-describedby="consent-desc"
              />
              <Label htmlFor="consent" className="text-[11px] text-[#F5F5F5]/70">
                {strings.consent}
              </Label>
            </div>

            {err && (
              <p className="text-[12px] text-red-400" role="alert">
                {err}
              </p>
            )}
            {subscribed && !err && (
              <p className="text-[12px] text-green-400" role="status">
                {strings.inlineOk}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;