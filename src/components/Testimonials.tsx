"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";
import RevealText from "@/components/ui/RevealText";

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
          title: "Lo que dicen los fundadores.",
          sub: "Startups que escalan con nosotros.",
          testimonials: [
            {
              name: "Carlos Roldán",
              role: "CEO @ Elixir Games",
              content:
                "Lo que más valoro de trabajar con el equipo de Kinetora es que no se limitan a picar código; entienden el producto. En Elixir Games necesitábamos a alguien que aguantara el ritmo y ellos estuvieron a la altura desde el primer día. Son de total confianza.",
              avatar: "/assets/testimonials/carlos-roldan.webp",
            },
            {
              name: "Enrique Phan",
              role: "CEO @ SphereStudios",
              content:
                "Para Chronos Worlds buscábamos una ejecución impecable y Kinetora nos dio justo eso. Se implican de verdad en el proyecto y eso se nota en el resultado final. Si buscas a alguien que cuide los detalles técnicos tanto como tú, son ellos.",
              avatar: "/assets/testimonials/enrique-phan.webp",
            },
            {
              name: "Danyil Shatko",
              role: "CEO @ Litlab Games",
              content:
                "Con Cybertitans íbamos a mil por hora y Kinetora fue el apoyo que necesitábamos. Se adaptan rápido, proponen soluciones inteligentes y, sobre todo, cumplen con lo que dicen. Trabajar así da gusto.",
              avatar: "/assets/testimonials/danyil-shatko.webp",
            },
            {
              name: "Nicolás Francisquelo",
              role: "CEO @ A2AX",
              content:
                "Es difícil encontrar gente que entienda tan bien la infraestructura técnica y sepa aterrizarla. En A2AX nos ayudaron a optimizar procesos que antes eran un quebradero de cabeza. Son profesionales, directos y muy resolutivos.",
              avatar: "/assets/testimonials/nicolas-francisquelo.webp",
            },
            {
              name: "Ferran Puntí",
              role: "CEO @ The Breach Studios",
              content:
                "Con proyectos como Robokiden no puedes jugártela con la parte técnica. Kinetora nos dio la tranquilidad de saber que todo iba a funcionar perfectamente. Son expertos en lo suyo y se nota en la calidad de lo que entregan.",
              avatar: "/assets/testimonials/ferran-punti.webp",
            },
            {
              name: "Victor Merino",
              role: "CTO @ BUU AI",
              content:
                "En el mundo de la IA todo cambia muy rápido y necesitas partners que no solo sigan el ritmo, sino que propongan. Con Kinetora la comunicación fluye de verdad y técnicamente están a un nivel altísimo. Da mucha tranquilidad delegar partes críticas del desarrollo en gente que sabe tanto de lo suyo.",
              avatar: "/assets/testimonials/victor-merino.webp",
            },
            {
              name: "Jorge Regalado",
              role: "CTO @ Elixir Games",
              content:
                "He trabajado con muchos equipos, pero lo de Kinetora es de otro nivel. Se nota que disfrutan con los retos técnicos y no paran hasta encontrar la solución más eficiente. En Elixir Games valoramos mucho esa actitud de ir un paso más allá en cada entrega. Son unos cracks.",
              avatar: "/assets/testimonials/jorge-regalado.webp",
            },
          ],
        }
      : {
          title: "What founders say.",
          sub: "Startups scaling with us.",
          testimonials: [
            {
              name: "Carlos Roldán",
              role: "CEO @ Elixir Games",
              content:
                "What I value most about working with Kinetora is they don't just ship code—they understand the product. At Elixir Games we needed someone who could keep the pace and they delivered from day one. Totally trustworthy.",
              avatar: "/assets/testimonials/carlos-roldan.webp",
            },
            {
              name: "Enrique Phan",
              role: "CEO @ SphereStudios",
              content:
                "For Chronos Worlds we were aiming for impeccable execution—and Kinetora delivered exactly that. They truly engage with the project, and you see it in the result. If you want someone who cares about technical detail as much as you do, it's them.",
              avatar: "/assets/testimonials/enrique-phan.webp",
            },
            {
              name: "Danyil Shatko",
              role: "CEO @ Litlab Games",
              content:
                "With Cybertitans we were moving at full speed and Kinetora was the support we needed. They adapt fast, propose smart solutions and, above all, do what they say. Working like this is a pleasure.",
              avatar: "/assets/testimonials/danyil-shatko.webp",
            },
            {
              name: "Nicolás Francisquelo",
              role: "CEO @ A2AX",
              content:
                "It's rare to find a team that understands technical infrastructure this well and can land it effectively. At A2AX they helped us streamline processes that used to be a headache. Professional, direct and highly resolute.",
              avatar: "/assets/testimonials/nicolas-francisquelo.webp",
            },
            {
              name: "Ferran Puntí",
              role: "CEO @ The Breach Studios",
              content:
                "With projects like Robokiden you can't risk the technical side. Kinetora gave us peace of mind knowing everything would work flawlessly. They're experts at what they do and it shows in the quality they deliver.",
              avatar: "/assets/testimonials/ferran-punti.webp",
            },
            {
              name: "Victor Merino",
              role: "CTO @ BUU AI",
              content:
                "In the AI world, everything changes fast and you need partners who not only keep up but also propose. With Kinetora, communication truly flows and technically they're at a very high level. It's reassuring to delegate critical parts of development to people who know their craft so well.",
              avatar: "/assets/testimonials/victor-merino.webp",
            },
            {
              name: "Jorge Regalado",
              role: "CTO @ Elixir Games",
              content:
                "I've worked with many teams, but Kinetora is on another level. You can tell they enjoy technical challenges and don't stop until they find the most efficient solution. At Elixir Games we value that drive to go one step further with every delivery. They're outstanding.",
              avatar: "/assets/testimonials/jorge-regalado.webp",
            },
          ],
        };

  const duplicatedItems = [...copy.testimonials, ...copy.testimonials];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let lastTime = 0;
    const speed = 60; // Pixeles por segundo

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      // El movimiento solo ocurre si NO se está pausado por hover Y NO se está moviendo manualmente
      if (!isPausedRef.current && !isDownRef.current) {
        scrollLeftRef.current += speed * deltaTime;
        
        const originalWidth = container.scrollWidth / 2;
        if (scrollLeftRef.current >= originalWidth) {
          scrollLeftRef.current -= originalWidth;
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
    <section className="kin-section relative overflow-hidden pointer-events-auto">
      <div className="kin-container pointer-events-auto">
        <div className="text-center mb-12 lg:mb-20 pointer-events-none">
          <h2 className="mb-4 sm:mb-6">
            <RevealText text={copy.title.toUpperCase().replace(/\.$/, "")} />
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
  );
};

export default Testimonials;