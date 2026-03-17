"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Video, MessageSquare } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

const Services = () => {
  const { lang } = useI18n();

  const copy =
    lang === "es"
      ? {
          badge: "Capacidades",
          titleTop: "Todo el músculo visual",
          titleBottom: "que tu startup necesita.",
          sub: "Branding, producto, web y contenido — con un sistema que mantiene calidad y consistencia a escala.",
          cards: {
            brandingTitle: "Construcción de marca",
            brandingDesc: "Logos, branding completo y pitch decks diseñados para convencer a inversores de primer nivel.",
            digitalTitle: "Digital",
            digitalDesc: "UX/UI en Figma, desarrollo web y tiendas online optimizadas para conversión.",
            multimediaTitle: "Multimedia",
            multimediaDesc: "Motion graphics, edición de vídeo y animación 3D de alto impacto.",
            commsTitle: "Comunicación",
            commsDesc: "Vídeos ADs de alta retención y copywriting estratégico para escalar tus campañas.",
          },
        }
      : {
          badge: "Capabilities",
          titleTop: "All the visual power",
          titleBottom: "your startup needs.",
          sub: "Brand, product, web and content — with a system that keeps quality and consistency at scale.",
          cards: {
            brandingTitle: "Brand building",
            brandingDesc: "Logos, full branding and pitch decks designed to win top-tier investors.",
            digitalTitle: "Digital",
            digitalDesc: "UX/UI in Figma, web development and online stores optimized for conversion.",
            multimediaTitle: "Multimedia",
            multimediaDesc: "Motion graphics, video editing and high-impact 3D animation.",
            commsTitle: "Communication",
            commsDesc: "High-retention ad videos and strategic copywriting to scale your campaigns.",
          },
        };

  return (
    <section id="servicios" className="kin-section relative overflow-hidden">
      <div className="kin-container">
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-24">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-5">
            {copy.badge}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#F5F5F5] tracking-tighter leading-[1.1]">
            {copy.titleTop.toUpperCase()} <br />
            <span className="text-[#F5F5F5]/65">{copy.titleBottom.toUpperCase()}</span>
          </h2>
          <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed">
            {copy.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Bloque 1: Branding */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden backdrop-blur-xl hover:border-[#B454FF]/35 hover:bg-white/[0.06] transition-[transform,background-color,border-color] duration-300"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/assets/service-photos/brand-identity.webp')] bg-cover bg-center opacity-25 sm:opacity-20 md:opacity-15" />
            <div className="relative mb-8">
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                <Palette className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-[#F5F5F5] mb-4 uppercase tracking-titter">
                {copy.cards.brandingTitle}
              </h3>
              <p className="text-[#F5F5F5]/70 font-medium text-lg md:text-xl max-w-md leading-relaxed">
                {copy.cards.brandingDesc}
              </p>
            </div>
          </motion.div>

          {/* Bloque 2: Digital */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] relative overflow-hidden backdrop-blur-xl transition-[transform,background-color,border-color] duration-300 hover:border-[#B454FF]/35 hover:bg-white/[0.06]"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/assets/service-photos/digital-uxui.webp')] bg-cover bg-center opacity-25 sm:opacity-20 md:opacity-15" />
            <div className="relative mb-8">
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                <Globe className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-titter">{copy.cards.digitalTitle}</h3>
              <p className="text-[#F5F5F5]/70 font-medium text-lg leading-relaxed">
                {copy.cards.digitalDesc}
              </p>
            </div>
          </motion.div>

          {/* Bloque 3: Multimedia */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] backdrop-blur-xl transition-[transform,background-color,border-color] duration-300 hover:border-[#B454FF]/35 hover:bg-white/[0.06]"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/assets/service-photos/video-editing.webp')] bg-cover bg-center opacity-25 sm:opacity-20 md:opacity-15" />
            <div className="relative mb-8">
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                <Video className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-titter">{copy.cards.multimediaTitle}</h3>
              <p className="text-[#F5F5F5]/70 font-medium text-lg leading-relaxed">
                {copy.cards.multimediaDesc}
              </p>
            </div>
          </motion.div>

          {/* Bloque 4: Comunicación */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden backdrop-blur-xl transition-[transform,background-color,border-color] duration-300 hover:border-[#B454FF]/35 hover:bg-white/[0.06]"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/assets/service-photos/communication-pitch-decks.webp')] bg-cover bg-center opacity-25 sm:opacity-20 md:opacity-15" />
            <div className="relative mb-8">
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                <MessageSquare className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">
                {copy.cards.commsTitle}
              </h3>
              <p className="text-[#F5F5F5]/70 font-medium text-lg md:text-xl max-w-md leading-relaxed">
                {copy.cards.commsDesc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;