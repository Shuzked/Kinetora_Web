"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const { lang } = useI18n();

  const copy =
    lang === "es"
      ? {
          title: "Lo que dicen los fundadores.",
          sub: "Startups que escalan con nosotros.",
          testimonials: [
            {
              name: "Alex Rivera",
              role: "CEO @ TechFlow",
              content:
                "Kinetora cambió las reglas del juego para nosotros. Pasamos de esperar semanas por un diseño a tener entregas constantes cada 48h.",
              avatar: "https://i.pravatar.cc/150?u=alex",
            },
            {
              name: "Elena Gómez",
              role: "Product Manager @ HealthUp",
              content:
                "La calidad del UX/UI es excepcional. Entienden perfectamente el lenguaje de las startups y lo que los inversores buscan.",
              avatar: "https://i.pravatar.cc/150?u=elena",
            },
            {
              name: "Marc Soler",
              role: "Founder @ Nexus AI",
              content:
                "Lo mejor es la ausencia de reuniones. Todo fluye por el tablero y las revisiones son rapidísimas. No vuelvo atrás.",
              avatar: "https://i.pravatar.cc/150?u=marc",
            },
            {
              name: "Lucía Paredes",
              role: "COO @ FinNest",
              content:
                "El onboarding fue instantáneo y las entregas cada 48h nos permitieron lanzar dos features clave antes de lo previsto.",
              avatar: "https://i.pravatar.cc/150?u=lucia",
            },
            {
              name: "Jordi Planas",
              role: "CTO @ Orbital",
              content:
                "Ritmo alto y criterio senior. La combinación de producto + web + motion nos dio coherencia de marca en semanas.",
              avatar: "https://i.pravatar.cc/150?u=jordi",
            },
          ],
        }
      : {
          title: "What founders say.",
          sub: "Startups scaling with us.",
          testimonials: [
            {
              name: "Alex Rivera",
              role: "CEO @ TechFlow",
              content:
                "Kinetora changed the game for us. We went from waiting weeks for design to consistent deliveries every 48 hours.",
              avatar: "https://i.pravatar.cc/150?u=alex",
            },
            {
              name: "Elena Gómez",
              role: "Product Manager @ HealthUp",
              content:
                "The UX/UI quality is outstanding. They truly understand startups and what investors look for.",
              avatar: "https://i.pravatar.cc/150?u=elena",
            },
            {
              name: "Marc Soler",
              role: "Founder @ Nexus AI",
              content:
                "The best part is no meetings. Everything flows through the board and revisions are lightning-fast. I'm never going back.",
              avatar: "https://i.pravatar.cc/150?u=marc",
            },
            {
              name: "Lucia Paredes",
              role: "COO @ FinNest",
              content:
                "Onboarding was instant and the 48h drops let us ship two key features ahead of schedule.",
              avatar: "https://i.pravatar.cc/150?u=luciap",
            },
            {
              name: "Jordi Planas",
              role: "CTO @ Orbital",
              content:
                "Fast pace and senior taste. The product + web + motion combo gave us brand coherence in weeks.",
              avatar: "https://i.pravatar.cc/150?u=jordipl",
            },
          ],
        };

  return (
    <section className="kin-section relative overflow-hidden">
      <div className="kin-container">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-4 tracking-tighter">
            {copy.title.toUpperCase()}
          </h2>
          <p className="text-[#F5F5F5]/70 font-bold uppercase tracking-widest text-xs">{copy.sub}</p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="relative">
          <CarouselContent className="-ml-4">
            {copy.testimonials.map((t, i) => (
              <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <MouseParallax intensity={7} rotate={4} className="h-full will-change-transform">
                  <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.08 }}
                    className="h-full bg-white/[0.04] border border-white/10 p-7 sm:p-8 md:p-10 rounded-[2.5rem] relative group hover:border-white/15 hover:bg-white/[0.06] transition-colors flex flex-col"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-[#B454FF] text-[#B454FF]" />
                      ))}
                    </div>
                    <p className="text-[#F5F5F5] mb-8 sm:mb-10 italic font-medium text-base sm:text-lg leading-relaxed">
                      "{t.content}"
                    </p>
                    <div className="mt-auto flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all"
                      />
                      <div>
                        <div className="text-[#F5F5F5] font-black uppercase text-xs tracking-widest">{t.name}</div>
                        <div className="text-[#F5F5F5]/60 text-[10px] font-bold uppercase tracking-widest mt-1">{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                </MouseParallax>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex -left-4 md:-left-6 h-11 w-11 rounded-full border border-white/10 bg-[#0D0D0D]/80 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20" />
          <CarouselNext className="hidden sm:inline-flex -right-4 md:-right-6 h-11 w-11 rounded-full border border-white/10 bg-[#0D0D0D]/80 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;