"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";
import RevealText from "@/components/ui/RevealText";
import ClientOnly from '@/components/ClientOnly';

const Testimonials = () => {
  const { lang, t } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Refs para estado de animación y drag
  const isPausedRef = useRef(false);
  const isDownRef = useRef(false);
  const scrollLeftRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);

  // Estado para feedback visual del cursor
  const [isGrabbing, setIsGrabbing] = useState(false);

  const testimonials = [
    {
      name: t("testimonials.t1.name"),
      role: t("testimonials.t1.role"),
      content: t("testimonials.t1.content"),
      avatar: "/assets/testimonials/victor-merino.webp",
    },
    {
      name: t("testimonials.t2.name"),
      role: t("testimonials.t2.role"),
      content: t("testimonials.t2.content"),
      avatar: "/assets/testimonials/carlos-roldan.webp",
    },
    {
      name: t("testimonials.t3.name"),
      role: t("testimonials.t3.role"),
      content: t("testimonials.t3.content"),
      avatar: "/assets/testimonials/enrique-phan.webp",
    },
    {
      name: t("testimonials.t4.name"),
      role: t("testimonials.t4.role"),
      content: t("testimonials.t4.content"),
      avatar: "/assets/testimonials/danyil-shatko.webp",
    },
    {
      name: t("testimonials.t5.name"),
      role: t("testimonials.t5.role"),
      content: t("testimonials.t5.content"),
      avatar: "/assets/testimonials/nicolas-francisquelo.webp",
    },
    {
      name: t("testimonials.t6.name"),
      role: t("testimonials.t6.role"),
      content: t("testimonials.t6.content"),
      avatar: "/assets/testimonials/ferran-punti.webp",
    },
    {
      name: t("testimonials.t7.name"),
      role: t("testimonials.t7.role"),
      content: t("testimonials.t7.content"),
      avatar: "/assets/testimonials/jorge-regalado.webp",
    },
  ];

  const duplicatedItems = [...testimonials, ...testimonials];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Inicializar scrollLeftRef con el valor actual (por si acaso)
    scrollLeftRef.current = container.scrollLeft;

    let lastTime = performance.now();
    const speed = 55; // Un poco más rápido para que se note el movimiento

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      // Solo mover si no hay interacción manual
      if (!isPausedRef.current && !isDownRef.current) {
        scrollLeftRef.current += speed * deltaTime;
        
        const scrollWidth = container.scrollWidth;
        const originalWidth = scrollWidth / 2;

        if (scrollLeftRef.current >= originalWidth) {
          scrollLeftRef.current -= originalWidth;
        }
        
        container.scrollLeft = scrollLeftRef.current;
      } else {
        // Sincronizar scrollLeftRef con la posición actual si el usuario está arrastrando
        scrollLeftRef.current = container.scrollLeft;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Handlers de Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    isDownRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.pageX - scrollContainerRef.current!.offsetLeft;
    scrollStartRef.current = scrollContainerRef.current!.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollLeftRef.current = scrollStartRef.current - walk;
    
    const originalWidth = scrollContainerRef.current!.scrollWidth / 2;
    if (scrollLeftRef.current < 0) scrollLeftRef.current += originalWidth;
    if (scrollLeftRef.current >= originalWidth) scrollLeftRef.current -= originalWidth;
    
    scrollContainerRef.current!.scrollLeft = scrollLeftRef.current;
  };

  const stopInteraction = () => {
    isDownRef.current = false;
    setIsGrabbing(false);
  };

  // Handlers de Touch (Móvil)
  const handleTouchStart = (e: React.TouchEvent) => {
    isDownRef.current = true;
    isPausedRef.current = true; // Pausar también en touch
    startXRef.current = e.touches[0].pageX - scrollContainerRef.current!.offsetLeft;
    scrollStartRef.current = scrollContainerRef.current!.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDownRef.current) return;
    
    // Evitar scroll vertical mientras se arrastra el carrusel horizontalmente
    e.preventDefault();
    
    const x = e.touches[0].pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollLeftRef.current = scrollStartRef.current - walk;
    
    const originalWidth = scrollContainerRef.current!.scrollWidth / 2;
    if (scrollLeftRef.current < 0) scrollLeftRef.current += originalWidth;
    if (scrollLeftRef.current >= originalWidth) scrollLeftRef.current -= originalWidth;
    
    scrollContainerRef.current!.scrollLeft = scrollLeftRef.current;
  };

  const handleTouchEnd = () => {
    isDownRef.current = false;
    isPausedRef.current = false; // Reanudar al soltar
  };

  return (
    <ClientOnly>
      <section className="kin-section relative overflow-hidden pointer-events-auto">
        <div className="kin-container pointer-events-auto">
          {/* ... existing content ... */}
          <div className="text-center mb-12 lg:mb-20 pointer-events-none">
            <h2 className="mb-4 sm:mb-6">
              <RevealText text={t("testimonials.titleA").toUpperCase() + " "} />
              <RevealText 
                text={t("testimonials.titleB").toUpperCase()} 
                className="text-[#B454FF]" 
                delay={0.15}
              />
            </h2>
            <p className="text-[#F5F5F5]/70 font-bold uppercase tracking-widest text-[10px] sm:text-xs">{t("testimonials.sub")}</p>
          </div>

          <div 
            role="region" 
            aria-label={t("testimonials.titleA")}
            className="relative kin-fade-x pointer-events-auto"
          >
            {/* Contenedor de Scroll */}
            <div 
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopInteraction}
              onMouseEnter={() => (isPausedRef.current = true)}
              onMouseLeave={() => {
                isPausedRef.current = false;
                stopInteraction();
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`overflow-hidden whitespace-nowrap flex select-none pointer-events-auto ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ 
                display: 'flex',
                touchAction: 'pan-y',
                pointerEvents: 'auto',
                WebkitOverflowScrolling: 'touch',
                userSelect: 'none'
              }}
            >
              <div className="flex gap-8 py-10 w-max pointer-events-auto">
                {duplicatedItems.map((t, i) => (
                  <div 
                    key={i} 
                    className="w-[85vw] sm:w-[45vw] lg:w-[32vw] flex-shrink-0 pointer-events-auto"
                  >
                    <MouseParallax intensity={7} rotate={4} className="h-full will-change-transform pointer-events-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ 
                          y: -8, 
                          scale: 1.02, 
                          zIndex: 10,
                          boxShadow: "0 10px 30px rgba(168, 85, 247, 0.15)",
                          borderColor: "rgba(255, 255, 255, 0.2)"
                        }}
                        viewport={{ once: true }}
                        transition={{ 
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          delay: (i % 3) * 0.08,
                          y: { duration: 0.3 },
                          scale: { duration: 0.3 }
                        }}
                        className="h-full bg-white/[0.04] border border-white/10 p-7 sm:p-8 md:p-10 rounded-[2.5rem] relative group hover:bg-white/[0.06] transition-colors flex flex-col pointer-events-auto cursor-default"
                      >
                        {/* Cabecera */}
                        <div className="flex gap-1 mb-6 pointer-events-none" aria-hidden="true">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-[#B454FF] text-[#B454FF]" />
                          ))}
                        </div>

                        {/* Contenido */}
                        <p className="text-[#F5F5F5] mb-8 sm:mb-10 italic font-medium leading-relaxed select-none pointer-events-none whitespace-normal">
                          "{t.content}"
                        </p>

                        {/* Footer */}
                        <div className="mt-auto flex items-center gap-4 pointer-events-none">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            className="w-12 h-12 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all"
                            width={48}
                            height={48}
                            loading="lazy"
                            decoding="async"
                          />
                          <div>
                            <div className="text-[#F5F5F5] font-black uppercase text-xs tracking-widest">{t.name}</div>
                            <div className="text-[#F5F5F5]/75 text-[10px] font-bold uppercase tracking-widest mt-1">{t.role}</div>
                          </div>
                        </div>
                      </motion.div>
                    </MouseParallax>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ClientOnly>
  );
};

export default Testimonials;