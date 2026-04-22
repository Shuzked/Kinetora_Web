"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";
import RevealText from "@/components/ui/RevealText";
import ClientOnly from '@/components/ClientOnly';

const Testimonials = () => {
  const { lang } = useI18n();
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

  const copy =
    lang === "es"
      ? {
          titleA: "Prueba Social",
          titleB: "C-Level & Founders",
          sub: "Empresas que escalan su ingeniería visual con nosotros.",
          testimonials: [
            {
              name: "Victor Merino",
              role: "CTO @ Elixir Games",
              content:
                "Kinetora no es una agencia, es una extensión técnica de nuestro equipo. Redujeron nuestro ciclo de iteración de semanas a días.",
              avatar: "/assets/testimonials/victor-merino.webp",
            },
            {
              name: "Carlos Roldán",
              role: "CEO @ Elixir Games",
              content:
                "La capacidad para traducir conceptos de negocio complejos en interfaces intuitivas es de otro planeta. 10/10.",
              avatar: "/assets/testimonials/carlos-roldan.webp",
            },
            {
              name: "Enrique Phan",
              role: "CEO @ Robokiden",
              content:
                "Gracias a su rediseño del pitch deck y la plataforma, cerramos nuestra Series A en tiempo récord. El ROI fue inmediato.",
              avatar: "/assets/testimonials/enrique-phan.webp",
            },
            {
              name: "Danyil Shatko",
              role: "Product Manager @ Elixir",
              content:
                "Sistemas de diseño que realmente funcionan en producción. No solo Figma, sino código limpio y documentado.",
              avatar: "/assets/testimonials/danyil-shatko.webp",
            },
            {
              name: "Nicolas Francisquelo",
              role: "CEO @ ChronosWorlds",
              content:
                "Dominan la estética Web3 sin sacrificar usabilidad B2B. Sus transiciones son pura ingeniería.",
              avatar: "/assets/testimonials/nicolas-francisquelo.webp",
            },
            {
              name: "Ferran Puntí",
              role: "CEO @ The Breach Studios",
              content:
                "Cumplen lo que prometen: entregas en 48h sin que baje la calidad. Es el partner ideal para escalar rápido.",
              avatar: "/assets/testimonials/ferran-punti.webp",
            },
            {
              name: "Jorge Regalado",
              role: "Marketing Director @ Elixir",
              content:
                "La landing page que construyeron tiene una tasa de conversión un 40% superior a la anterior. Datos reales.",
              avatar: "/assets/testimonials/jorge-regalado.webp",
            },
          ],
        }
      : {
          titleA: "Social Proof",
          titleB: "C-Level & Founders",
          titleC: "",
          sub: "Companies scaling their visual engineering with us.",
          testimonials: [
            {
              name: "Victor Merino",
              role: "CTO @ Elixir Games",
              content:
                "Kinetora is not an agency, it's a technical extension of our team. They reduced our iteration cycle from weeks to days.",
              avatar: "/assets/testimonials/victor-merino.webp",
            },
            {
              name: "Carlos Roldán",
              role: "CEO @ Elixir Games",
              content:
                "The ability to translate complex business concepts into intuitive interfaces is out of this world. 10/10.",
              avatar: "/assets/testimonials/carlos-roldan.webp",
            },
            {
              name: "Enrique Phan",
              role: "CEO @ Robokiden",
              content:
                "Thanks to their pitch deck and platform redesign, we closed our Series A in record time. The ROI was immediate.",
              avatar: "/assets/testimonials/enrique-phan.webp",
            },
            {
              name: "Danyil Shatko",
              role: "Product Manager @ Elixir",
              content:
                "Design systems that actually work in production. Not just Figma, but clean and documented code.",
              avatar: "/assets/testimonials/danyil-shatko.webp",
            },
            {
              name: "Nicolas Francisquelo",
              role: "CEO @ ChronosWorlds",
              content:
                "They master the Web3 aesthetic without sacrificing B2B usability. Their transitions are pure engineering.",
              avatar: "/assets/testimonials/nicolas-francisquelo.webp",
            },
            {
              name: "Ferran Puntí",
              role: "CEO @ The Breach Studios",
              content:
                "They deliver what they promise: 48h turnarounds without dropping quality. Ideal partner for fast scaling.",
              avatar: "/assets/testimonials/ferran-punti.webp",
            },
            {
              name: "Jorge Regalado",
              role: "Marketing Director @ Elixir",
              content:
                "The landing page they built has a conversion rate 40% higher than the previous one. Real data.",
              avatar: "/assets/testimonials/jorge-regalado.webp",
            },
          ],
        };

  const duplicatedItems = [...copy.testimonials, ...copy.testimonials];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let lastTime = performance.now();
    const speed = 45; // Pixeles por segundo - ajustado para suavidad premium

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = Math.min((time - lastTime) / 1000, 0.1); // Cap para evitar saltos bruscos
      lastTime = time;

      if (!isPausedRef.current && !isDownRef.current) {
        scrollLeftRef.current += speed * deltaTime;
        
        const scrollWidth = container.scrollWidth;
        const originalWidth = scrollWidth / 2;

        if (scrollLeftRef.current >= originalWidth) {
          scrollLeftRef.current -= originalWidth;
        }
        
        if (scrollLeftRef.current < 0) {
          scrollLeftRef.current += originalWidth;
        }

        container.scrollLeft = scrollLeftRef.current;
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
              <RevealText text={copy.titleA.toUpperCase() + " "} />
              <RevealText 
                text={copy.titleB.toUpperCase()} 
                className="text-[#B454FF]" 
                delay={0.15}
              />
              {lang === "en" && copy.titleC && (
                <RevealText text={" " + copy.titleC.toUpperCase()} delay={0.3} />
              )}
            </h2>
            <p className="text-[#F5F5F5]/70 font-bold uppercase tracking-widest text-[10px] sm:text-xs">{copy.sub}</p>
          </div>

          <div 
            role="region" 
            aria-label={lang === "es" ? "Carrusel de testimonios" : "Testimonials carousel"}
            className="relative kin-fade-x pointer-events-auto"
            onMouseEnter={() => (isPausedRef.current = true)}
            onMouseLeave={() => {
              isPausedRef.current = false;
              stopInteraction();
            }}
          >
            {/* Contenedor de Scroll */}
            <div 
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopInteraction}
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