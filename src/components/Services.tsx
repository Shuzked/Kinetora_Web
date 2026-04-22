"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Video, MessageSquare } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";

const Services = () => {
  const { lang } = useI18n();
  const isEs = lang === "es";

  const copy = isEs
    ? {
        badge: "Capacidades",
        titleTop: "Todo el músculo visual",
        titleBottom: "que tu startup necesita.",
        sub: "Ingeniería visual y sistemas de diseño para startups que buscan dominar su mercado.",
        cards: [
          {
            title: "Ingeniería Visual Estratégica",
            desc: "Diseño que no solo se ve bien, sino que convierte. Landing pages de alto rendimiento y assets que aceleran el ciclo de venta B2B.",
            icon: Palette,
            size: "large",
            image: "/assets/service-photos/brand-identity.webp",
          },
          {
            title: "Sistemas de Diseño Scalable",
            desc: "Construimos la base técnica (Figma + Code) para que tu equipo de producto pueda iterar a máxima velocidad.",
            icon: Globe,
            size: "small",
            image: "/assets/service-photos/digital-uxui.webp",
          },
          {
            title: "Optimización UX/UI",
            desc: "Rediseño de interfaces complejas para reducir el churn y maximizar la adopción en plataformas SaaS.",
            icon: Video,
            size: "small",
            image: "/assets/service-photos/video-editing.webp",
          },
          {
            title: "Narrativas de Capital",
            desc: "Diseñamos la historia visual (Pitch Decks) para tu próxima ronda de financiación. Impresiona a VCs y ángeles.",
            icon: MessageSquare,
            size: "medium",
            image: "/assets/service-photos/communication-pitch-decks.webp",
          },
        ],
      }
    : {
        badge: "Capabilities",
        titleTop: "All the visual power",
        titleBottom: "your startup needs.",
        sub: "Visual engineering and design systems for startups aiming to dominate their market.",
        cards: [
          {
            title: "Strategic Visual Engineering",
            desc: "Design that doesn't just look good, it converts. High-performance landing pages and assets that accelerate the B2B sales cycle.",
            icon: Palette,
            size: "large",
            image: "/assets/service-photos/brand-identity.webp",
          },
          {
            title: "Scalable Design Systems",
            desc: "We build the technical foundation (Figma + Code) so your product team can iterate at maximum speed.",
            icon: Globe,
            size: "small",
            image: "/assets/service-photos/digital-uxui.webp",
          },
          {
            title: "UX/UI Optimization",
            desc: "Redesign of complex interfaces to reduce churn and maximize adoption in SaaS platforms.",
            icon: Video,
            size: "small",
            image: "/assets/service-photos/video-editing.webp",
          },
          {
            title: "Capital Narratives",
            desc: "We design the visual story (Pitch Decks) for your next funding round. Impress VCs and angel investors.",
            icon: MessageSquare,
            size: "medium",
            image: "/assets/service-photos/communication-pitch-decks.webp",
          },
        ],
      };

  return (
    <ClientOnly>
      <section id="servicios" className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-28 h-96 w-96 rounded-full bg-[#B454FF]/12 blur-[120px] z-0" />
        <div className="pointer-events-none absolute -bottom-36 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#B454FF]/8 blur-[130px] z-0" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] z-[1] bg-[radial-gradient(circle_at_30%_20%,rgba(180,84,255,0.12),transparent_55%)]" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-24 mx-auto md:mx-0">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-5">
              {copy.badge}
            </div>
            <h2 className="mb-6">
              {copy.titleTop.toUpperCase()} <br />
              <span className="text-[#B454FF]">{copy.titleBottom.toUpperCase().replace(/\.$/, "")}</span>
            </h2>
            <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed px-4 md:px-0">
              {copy.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 sm:gap-6">
            {copy.cards.map((card, i) => {
              const Icon = card.icon;
              const isLarge = card.size === "large";
              const isMedium = card.size === "medium";
              
              return (
                <motion.article
                  key={i}
                  whileHover={{ y: -5 }}
                  className={`
                    bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-8 md:p-10 
                    flex flex-col justify-between group relative overflow-hidden backdrop-blur-xl 
                    hover:border-[#B454FF]/35 hover:bg-white/[0.06] transition-all duration-300
                    ${isLarge ? "md:col-span-2 md:row-span-2 min-h-[450px]" : ""}
                    ${isMedium ? "md:col-span-2 min-h-[300px]" : "min-h-[300px]"}
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