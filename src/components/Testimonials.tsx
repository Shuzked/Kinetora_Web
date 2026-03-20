"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";

const Testimonials = () => {
  const { lang } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

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

  // Triplicamos para un loop infinito muy amplio que soporte momentum
  const items = copy.testimonials;
  const duplicatedItems = [...items, ...items, ...items];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let lastTime = 0;
    const scrollSpeed = 40; // Pixeles por segundo aprox

    const step = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed * deltaTime;

        // Loop infinito nativo
        const sectionWidth = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= sectionWidth * 2) {
          scrollContainer.scrollLeft -= sectionWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    // Posición inicial segura
    if (scrollContainer.scrollLeft === 0) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <section className="kin-section relative overflow-hidden">
      <div className="kin-container overflow-hidden">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-4 tracking-tighter">
            {copy.title.toUpperCase().replace(/\.$/, "")}
          </h2>
          <p className="text-[#F5F5F5]/70 font-bold uppercase tracking-widest text-xs">{copy.sub}</p>
        </div>

        <div 
          role="region" 
          aria-label={lang === "es" ? "Carrusel de testimonios" : "Testimonials carousel"}
          className="relative kin-fade-x"
        >
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto no-scrollbar scroll-smooth flex select-none cursor-grab active:cursor-grabbing"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div className="flex gap-8 py-4 w-max">
              {duplicatedItems.map((t, i) => (
                <div 
                  key={i} 
                  className="w-[85vw] sm:w-[45vw] lg:w-[32vw] flex-shrink-0"
                  style={{ 
                    scrollSnapAlign: 'start',
                    scrollSnapStop: 'normal' 
                  }}
                >
                  <MouseParallax intensity={7} rotate={4} className="h-full will-change-transform">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i % 3) * 0.08 }}
                      className="h-full bg-white/[0.04] border border-white/10 p-7 sm:p-8 md:p-10 rounded-[2.5rem] relative group hover:border-white/15 hover:bg-white/[0.06] transition-colors flex flex-col pointer-events-none"
                    >
                      <div className="flex gap-1 mb-6" aria-hidden="true">
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
                          loading="lazy"
                          decoding="async"
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