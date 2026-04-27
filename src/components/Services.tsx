"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Video, MessageSquare } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import ClientOnly from '@/components/ClientOnly';

const Services = () => {
  const { t } = useI18n();

  const cards = [
    {
      title: t("services.brand.title"),
      desc: t("services.brand.desc"),
      icon: Palette,
      size: "large",
      image: "/assets/service-photos/brand-identity.webp",
    },
    {
      title: t("services.product.title"),
      desc: t("services.product.desc"),
      icon: Globe,
      size: "small",
      image: "/assets/service-photos/digital-uxui.webp",
    },
    {
      title: t("services.web.title"),
      desc: t("services.web.desc"),
      icon: Video,
      size: "small",
      image: "/assets/service-photos/video-editing.webp",
    },
    {
      title: t("services.pitch.title"),
      desc: t("services.pitch.desc"),
      icon: MessageSquare,
      size: "medium",
      image: "/assets/service-photos/communication-pitch-decks.webp",
    },
  ];

  return (
    <ClientOnly>
      <section id="servicios" className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-28 h-96 w-96 rounded-full bg-[#B454FF]/12 blur-[120px] z-0" />
        <div className="pointer-events-none absolute -bottom-36 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#B454FF]/8 blur-[130px] z-0" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] z-[1] bg-[radial-gradient(circle_at_30%_20%,rgba(180,84,255,0.12),transparent_55%)]" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-24 mx-auto md:mx-0">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-5">
              {t("services.pill")}
            </div>
            <h2 className="mb-6">
              {t("services.titleTop").toUpperCase()} <br />
              <span className="text-[#B454FF]">{t("services.titleBottom").toUpperCase().replace(/\.$/, "")}</span>
            </h2>
            <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed px-4 md:px-0">
              {t("services.sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 sm:gap-6">
            {cards.map((card, i) => {
              const Icon = card.icon;
              const isLarge = card.size === "large";
              const isMedium = card.size === "medium";
              
              return (
                <motion.article
                  key={i}
                  whileHover={{ y: -5 }}
                  className={`
                    bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-6 md:p-10 
                    flex flex-col justify-between group relative overflow-hidden backdrop-blur-xl 
                    hover:border-[#B454FF]/35 hover:bg-white/[0.06] transition-all duration-300
                    ${isLarge ? "sm:col-span-2 md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-[450px]" : ""}
                    ${isMedium ? "sm:col-span-2 md:col-span-2 min-h-[220px] md:min-h-[300px]" : "min-h-[220px] md:min-h-[300px]"}
                  `}
                >
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    <ImageWithSkeleton
                      src={card.image}
                      alt=""
                      width={800}
                      height={450}
                      containerClassName="h-full w-full"
                      skeletonClassName="bg-white/10"
                      className="h-full w-full object-cover opacity-[0.14] transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="relative z-10 mb-8">
                    <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] transition-all duration-300 group-hover:bg-[#B454FF]/10 group-hover:border-[#B454FF]/30">
                      <Icon className="w-6 h-6 text-[#B454FF] transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className={`${isLarge ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"} font-black text-[#F5F5F5] mb-4 uppercase tracking-tighter`}>
                      {card.title}
                    </h3>
                    <p className={`text-[#F5F5F5]/70 font-medium ${isLarge ? "text-lg md:text-xl" : "text-sm md:text-base"} leading-relaxed max-w-sm`}>
                      {card.desc}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </ClientOnly>
  );
};

export default Services;