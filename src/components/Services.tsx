"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Video, MessageSquare } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";

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
    <section className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden">
      {/* ambient glow (soft, no hard cuts) */}
      <div className="pointer-events-none absolute -top-32 -left-28 h-96 w-96 rounded-full bg-[#B454FF]/12 blur-[120px] z-0" />
      <div className="pointer-events-none absolute -bottom-36 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#B454FF]/8 blur-[130px] z-0" />
      {/* subtle texture + blend */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] z-[1] bg-[radial-gradient(circle_at_30%_20%,rgba(180,84,255,0.12),transparent_55%)]" />
      {/* edge fades to blend with adjacent sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,#0D0D0D,transparent)] z-[2]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,#0D0D0D,transparent)] z-[2]" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-24">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-5">
            {copy.badge}
          </div>
          <h2 className="mb-6">
            {copy.titleTop.toUpperCase()} <br />
            <span className="text-[#B454FF]">{copy.titleBottom.toUpperCase().replace(/\.$/, "")}</span>
          </h2>
          <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed">
            {copy.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Bloque 1: Branding */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden backdrop-blur-xl hover:border-[#B454FF]/35 hover:bg-white/[0.06] transition-all duration-300"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <ImageWithSkeleton
                src="/assets/service-photos/brand-identity.webp"
                alt=""
                width={800}
                height={450}
                containerClassName="h-full w-full"
                skeletonClassName="bg-white/10"
                className="h-full w-full object-cover opacity-[0.16] transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="relative z-10 mb-8">
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                <Palette className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">
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
            className="bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-[#B454FF]/35 hover:bg-white/[0.06]"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <ImageWithSkeleton
                src="/assets/service-photos/digital-uxui.webp"
                alt=""
                width={600}
                height={400}
                containerClassName="h-full w-full"
                skeletonClassName="bg-white/10"
                className="h-full w-full object-cover opacity-[0.16] transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="relative z-10 mb-8">
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B454FF]/12 border border-[#B454FF]/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-[#B454FF]/16 group-hover:border-[#B454FF]/30">
                <Globe className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">{copy.cards.digitalTitle}</h3>
              <p className="text-[#F5F5F5]/70 font-medium text-lg leading-relaxed">
                {copy.cards.digitalDesc}
              </p>
            </div>
          </motion.div>

          {/* Bloque 3: Multimedia */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-[#B454FF]/35 hover:bg-white/[0.06]"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <ImageWithSkeleton
                src="/assets/service-photos/video-editing.webp"
                alt=""
                width={600}
                height={400}
                containerClassName="h-full w-full"
                skeletonClassName="bg-white/10"
                className="h-full w-full object-cover opacity-[0.16] transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="relative z-10 mb-8">
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                <Video className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter">{copy.cards.multimediaTitle}</h3>
              <p className="text-[#F5F5F5]/70 font-medium text-lg leading-relaxed">
                {copy.cards.multimediaDesc}
              </p>
            </div>
          </motion.div>

          {/* Bloque 4: Comunicación */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-[#B454FF]/35 hover:bg-white/[0.06]"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <ImageWithSkeleton
                src="/assets/service-photos/communication-pitch-decks.webp"
                alt=""
                width={800}
                height={450}
                containerClassName="h-full w-full"
                skeletonClassName="bg-white/10"
                className="h-full w-full object-cover opacity-[0.16] transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="relative z-10 mb-8">
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                <MessageSquare className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
              </div>
            </div>
            <div className="relative z-10">
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