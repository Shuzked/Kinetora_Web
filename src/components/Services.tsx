"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Video, MessageSquare } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from '@/components/MouseParallax';
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import RevealText from "@/components/ui/RevealText";
import ScrollParallax from "@/components/ui/ScrollParallax";

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
    <section id="servicios" className="kin-section relative">
      <ScrollParallax speed={0.05} invert={true} className="absolute -top-24 -right-24">
        <div className="pointer-events-none h-96 w-96 rounded-full bg-[#B454FF]/5 blur-[100px]" />
      </ScrollParallax>
      <div className="kin-container">
        <div className="max-w-4xl mb-12 sm:mb-16 lg:mb-24">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
            {copy.badge}
          </div>
          <h2 className="">
            <RevealText text={copy.titleTop.toUpperCase()} className="block" />
            <RevealText 
              text={copy.titleBottom.toUpperCase().replace(/\.$/, "")} 
              className="block text-[#B454FF]" 
              delay={0.2} 
            />
          </h2>
          <p className="mt-6 text-[#F5F5F5]/70 max-w-2xl leading-relaxed">
            {copy.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Bloque 1: Branding */}
          <div className="md:col-span-2 light-sweep-container h-full">
            <MouseParallax intensity={10} rotate={2} className="h-full">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden backdrop-blur-2xl hover:border-[#B454FF]/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(180,84,255,0.18)] transition-[background-color,border-color,shadow] duration-300"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <ImageWithSkeleton
                    src="/assets/service-photos/brand-identity.webp"
                    alt=""
                    width={800}
                    height={450}
                    containerClassName="w-full h-full"
                    skeletonClassName="bg-white/10"
                    className="w-full h-full object-cover opacity-25 sm:opacity-20 md:opacity-15"
                  />
                </div>
                <div className="light-sweep" />
                
                <div className="relative mb-8">
                  <ScrollParallax speed={0.15}>
                    <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                      <Palette className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                  </ScrollParallax>
                </div>
                <div>
                  <h3 className="mb-4 uppercase">
                    {copy.cards.brandingTitle}
                  </h3>
                  <p className="text-[#F5F5F5]/70 font-medium leading-relaxed max-w-sm">
                    {copy.cards.brandingDesc}
                  </p>
                </div>
              </motion.div>
            </MouseParallax>
          </div>

          {/* Bloque 2: Digital */}
          <div className="light-sweep-container h-full">
            <MouseParallax intensity={12} rotate={3} className="h-full">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] relative overflow-hidden backdrop-blur-2xl transition-[background-color,border-color,shadow] duration-300 hover:border-[#B454FF]/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(180,84,255,0.18)]"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <ImageWithSkeleton
                    src="/assets/service-photos/digital-uxui.webp"
                    alt=""
                    width={400}
                    height={300}
                    containerClassName="w-full h-full"
                    skeletonClassName="bg-white/10"
                    className="w-full h-full object-cover opacity-25 sm:opacity-20 md:opacity-15"
                  />
                </div>
                <div className="light-sweep" />
                
                <div className="relative mb-8">
                  <ScrollParallax speed={0.15}>
                    <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                      <Globe className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                  </ScrollParallax>
                </div>
                <div>
                  <h3 className="mb-4 uppercase">{copy.cards.digitalTitle}</h3>
                  <p className="text-[#F5F5F5]/70 font-medium leading-relaxed max-w-[280px]">
                    {copy.cards.digitalDesc}
                  </p>
                </div>
              </motion.div>
            </MouseParallax>
          </div>

          {/* Bloque 3: Multimedia */}
          <div className="light-sweep-container h-full">
            <MouseParallax intensity={12} rotate={3} className="h-full">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] relative overflow-hidden backdrop-blur-2xl transition-[background-color,border-color,shadow] duration-300 hover:border-[#B454FF]/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(180,84,255,0.18)]"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <ImageWithSkeleton
                    src="/assets/service-photos/video-editing.webp"
                    alt=""
                    width={400}
                    height={300}
                    containerClassName="w-full h-full"
                    skeletonClassName="bg-white/10"
                    className="w-full h-full object-cover opacity-25 sm:opacity-20 md:opacity-15"
                  />
                </div>
                <div className="light-sweep" />
                
                <div className="relative mb-8">
                  <ScrollParallax speed={0.15}>
                    <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                      <Video className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                  </ScrollParallax>
                </div>
                <div>
                  <h3 className="mb-4 uppercase">{copy.cards.multimediaTitle}</h3>
                  <p className="text-[#F5F5F5]/70 font-medium leading-relaxed max-w-[280px]">
                    {copy.cards.multimediaDesc}
                  </p>
                </div>
              </motion.div>
            </MouseParallax>
          </div>

          {/* Bloque 4: Comunicación */}
          <div className="md:col-span-2 light-sweep-container h-full">
            <MouseParallax intensity={10} rotate={2} className="h-full">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between group min-h-[300px] md:min-h-[400px] relative overflow-hidden backdrop-blur-2xl transition-[background-color,border-color,shadow] duration-300 hover:border-[#B454FF]/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(180,84,255,0.18)]"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <ImageWithSkeleton
                    src="/assets/service-photos/communication-pitch-decks.webp"
                    alt=""
                    width={800}
                    height={450}
                    containerClassName="w-full h-full"
                    skeletonClassName="bg-white/10"
                    className="w-full h-full object-cover opacity-25 sm:opacity-20 md:opacity-15"
                  />
                </div>
                <div className="light-sweep" />
                
                <div className="relative mb-8">
                  <ScrollParallax speed={0.15}>
                    <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#B454FF]/30">
                      <MessageSquare className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                  </ScrollParallax>
                </div>
                <div>
                  <h3 className="mb-4 uppercase">
                    {copy.cards.commsTitle}
                  </h3>
                  <p className="text-[#F5F5F5]/70 font-medium leading-relaxed max-w-sm">
                    {copy.cards.commsDesc}
                  </p>
                </div>
              </motion.div>
            </MouseParallax>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;