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
          badge: "Servicios B2B",
          title: "Ingeniería visual para startups que no tienen tiempo que perder",
          sub: "Cero humo. Diseñamos el sistema que tu negocio necesita para escalar, desde el pitch deck hasta el producto final.",
          cards: [
            {
              id: "branding",
              title: "Branding & Pitch Decks",
              desc: "No solo logos. Creamos identidades visuales para que tu startup levante capital. Activos que respiran confianza desde el PDF hasta el tuit.",
              icon: Palette,
              span: "md:col-span-2",
              img: "/assets/service-photos/brand-identity.webp",
            },
            {
              id: "product",
              title: "Producto & Web",
              desc: "UX/UI que convierte. De wireframes a prototipos interactivos que parecen la demo real.",
              icon: Globe,
              span: "md:col-span-1",
              img: "/assets/service-photos/digital-uxui.webp",
            },
            {
              id: "content",
              title: "Video & Estrategia",
              desc: "Contenido para retener. Motion graphics y estrategia para escalar tus canales sociales.",
              icon: Video,
              span: "md:col-span-1",
              img: "/assets/service-photos/video-editing.webp",
            },
            {
              id: "systems",
              title: "Design Systems",
              desc: "Consistencia a escala. Construimos sistemas de diseño para que tu equipo ejecute x10 más rápido.",
              icon: MessageSquare,
              span: "md:col-span-2",
              img: "/assets/service-photos/communication-pitch-decks.webp",
            },
          ],
        }
      : {
          badge: "B2B Services",
          title: "Visual engineering for startups with no time to waste",
          sub: "Zero hype. We design the system your business needs to scale, from pitch decks to the final product.",
          cards: [
            {
              id: "branding",
              title: "Branding & Pitch Decks",
              desc: "Not just logos. We build visual identities so your startup raises capital. Assets that breathe trust from the PDF to the tweet.",
              icon: Palette,
              span: "md:col-span-2",
              img: "/assets/service-photos/brand-identity.webp",
            },
            {
              id: "product",
              title: "Product & Web",
              desc: "UX/UI that converts. From wireframes to interactive prototypes that look like the real demo.",
              icon: Globe,
              span: "md:col-span-1",
              img: "/assets/service-photos/digital-uxui.webp",
            },
            {
              id: "content",
              title: "Video & Strategy",
              desc: "Content to retain. Motion graphics and strategy to scale your social channels.",
              icon: Video,
              span: "md:col-span-1",
              img: "/assets/service-photos/video-editing.webp",
            },
            {
              id: "systems",
              title: "Design Systems",
              desc: "Consistency at scale. We build design systems so your team executes 10x faster.",
              icon: MessageSquare,
              span: "md:col-span-2",
              img: "/assets/service-photos/communication-pitch-decks.webp",
            },
          ],
        };

  return (
    <section className="py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden">
      {/* Subtle glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#B454FF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#B454FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black tracking-[0.25em] uppercase text-[#B454FF] mb-6">
            {copy.badge}
          </div>
          <h2 className="mb-6 leading-[1.1] tracking-tighter">
            {copy.title.toUpperCase()}
          </h2>
          <p className="mt-4 text-[#F5F5F5]/70 text-lg leading-relaxed max-w-2xl font-medium">
            {copy.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {copy.cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className={`${card.span} group relative min-h-[320px] rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 flex flex-col justify-between overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-[#B454FF]/40 hover:bg-white/[0.05] shadow-[0_10px_40px_rgba(0,0,0,0.3)]`}
            >
              {/* Image background with overlay */}
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <ImageWithSkeleton
                  src={card.img}
                  alt=""
                  width={800}
                  height={500}
                  containerClassName="h-full w-full"
                  skeletonClassName="bg-white/5"
                  className="h-full w-full object-cover opacity-[0.08] group-hover:opacity-[0.14] transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:bg-[#B454FF]/10 group-hover:border-[#B454FF]/30">
                  <card.icon className="w-5 h-5 text-[#B454FF] transition-transform duration-500 group-hover:rotate-12" />
                </div>
                <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tighter mb-4 leading-none">
                  {card.title}
                </h3>
              </div>

              <div className="relative z-10 max-w-[260px] md:max-w-full">
                <p className="text-[#F5F5F5]/60 text-base font-medium leading-relaxed group-hover:text-[#F5F5F5]/80 transition-colors">
                  {card.desc}
                </p>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B454FF]/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;