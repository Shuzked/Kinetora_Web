import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { u as useI18n, C as ClientOnly, f as RevealText, M as MouseParallax } from "./entry-server.3RePvTPK.js";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "stream";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "react-router-dom";
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "lenis";
import "react-dom";
const Testimonials = () => {
  const { lang } = useI18n();
  const scrollContainerRef = useRef(null);
  const isPausedRef = useRef(false);
  const isDownRef = useRef(false);
  const scrollLeftRef = useRef(0);
  const rafIdRef = useRef(null);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const copy = lang === "es" ? {
    titleA: "Lo que dicen",
    titleB: "los fundadores",
    sub: "Startups que escalan con nosotros.",
    testimonials: [
      {
        name: "Carlos Roldán",
        role: "CEO @ Elixir Games",
        content: "Lo que más valoro de trabajar con el equipo de Kinetora es que no se limitan a picar código; entienden el producto. En Elixir Games necesitábamos a alguien que aguantara el ritmo y ellos estuvieron a la altura desde el primer día. Son de total confianza.",
        avatar: "/assets/testimonials/carlos-roldan.webp"
      },
      {
        name: "Enrique Phan",
        role: "CEO @ SphereStudios",
        content: "Para Chronos Worlds buscábamos una ejecución impecable y Kinetora nos dio justo eso. Se implican de verdad en el proyecto y eso se nota en el resultado final. Si buscas a alguien que cuide los detalles técnicos tanto como tú, son ellos.",
        avatar: "/assets/testimonials/enrique-phan.webp"
      },
      {
        name: "Danyil Shatko",
        role: "CEO @ Litlab Games",
        content: "Con Cybertitans íbamos a mil por hora y Kinetora fue el apoyo que necesitábamos. Se adaptan rápido, proponen soluciones inteligentes y, sobre todo, cumplen con lo que dicen. Trabajar así da gusto.",
        avatar: "/assets/testimonials/danyil-shatko.webp"
      },
      {
        name: "Nicolás Francisquelo",
        role: "CEO @ A2AX",
        content: "Es difícil encontrar gente que entienda tan bien la infraestructura técnica y sepa aterrizarla. En A2AX nos ayudaron a optimizar procesos que antes eran un quebradero de cabeza. Son profesionales, directos y muy resolutivos.",
        avatar: "/assets/testimonials/nicolas-francisquelo.webp"
      },
      {
        name: "Ferran Puntí",
        role: "CEO @ The Breach Studios",
        content: "Con proyectos como Robokiden no puedes jugártela con la parte técnica. Kinetora nos dio la tranquilidad de saber que todo iba a funcionar perfectamente. Son expertos en lo suyo y se nota en la calidad de lo que entregan.",
        avatar: "/assets/testimonials/ferran-punti.webp"
      },
      {
        name: "Victor Merino",
        role: "CTO @ BUU AI",
        content: "En el mundo de la IA todo cambia muy rápido y necesitas partners que no solo sigan el ritmo, sino que propongan. Con Kinetora la comunicación fluye de verdad y técnicamente están a un nivel altísimo. Da mucha tranquilidad delegar partes críticas del desarrollo en gente que sabe tanto de lo suyo.",
        avatar: "/assets/testimonials/victor-merino.webp"
      },
      {
        name: "Jorge Regalado",
        role: "CTO @ Elixir Games",
        content: "He trabajado con muchos equipos, pero lo de Kinetora es de otro nivel. Se nota que disfrutan con los retos técnicos y no paran hasta encontrar la solución más eficiente. En Elixir Games valoramos mucho esa actitud de ir un paso más allá en cada entrega. Son unos cracks.",
        avatar: "/assets/testimonials/jorge-regalado.webp"
      }
    ]
  } : {
    titleA: "What",
    titleB: "founders",
    titleC: "say",
    sub: "Startups scaling with us.",
    testimonials: [
      {
        name: "Carlos Roldán",
        role: "CEO @ Elixir Games",
        content: "What I value most about working with Kinetora is they don't just ship code—they understand the product. At Elixir Games we needed someone who could keep the pace and they delivered from day one. Totally trustworthy.",
        avatar: "/assets/testimonials/carlos-roldan.webp"
      },
      {
        name: "Enrique Phan",
        role: "CEO @ SphereStudios",
        content: "For Chronos Worlds we were aiming for impeccable execution—and Kinetora delivered exactly that. They truly engage with the project, and you see it in the result. If you want someone who cares about technical detail as much as you do, it's them.",
        avatar: "/assets/testimonials/enrique-phan.webp"
      },
      {
        name: "Danyil Shatko",
        role: "CEO @ Litlab Games",
        content: "With Cybertitans we were moving at full speed and Kinetora was the support we needed. They adapt fast, propose smart solutions and, above all, do what they say. Working like this is a pleasure.",
        avatar: "/assets/testimonials/danyil-shatko.webp"
      },
      {
        name: "Nicolás Francisquelo",
        role: "CEO @ A2AX",
        content: "It's rare to find a team that understands technical infrastructure this well and can land it effectively. At A2AX they helped us streamline processes that used to be a headache. Professional, direct and highly resolute.",
        avatar: "/assets/testimonials/nicolas-francisquelo.webp"
      },
      {
        name: "Ferran Puntí",
        role: "CEO @ The Breach Studios",
        content: "With projects like Robokiden you can't risk the technical side. Kinetora gave us peace of mind knowing everything would work flawlessly. They're experts at what they do and it shows in the quality they deliver.",
        avatar: "/assets/testimonials/ferran-punti.webp"
      },
      {
        name: "Victor Merino",
        role: "CTO @ BUU AI",
        content: "In the AI world, everything changes fast and you need partners who not only keep up but also propose. With Kinetora, communication truly flows and technically they're at a very high level. It's reassuring to delegate critical parts of development to people who know their craft so well.",
        avatar: "/assets/testimonials/victor-merino.webp"
      },
      {
        name: "Jorge Regalado",
        role: "CTO @ Elixir Games",
        content: "I've worked with many teams, but Kinetora is on another level. You can tell they enjoy technical challenges and don't stop until they find the most efficient solution. At Elixir Games we value that drive to go one step further with every delivery. They're outstanding.",
        avatar: "/assets/testimonials/jorge-regalado.webp"
      }
    ]
  };
  const duplicatedItems = [...copy.testimonials, ...copy.testimonials];
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let lastTime = 0;
    const speed = 60;
    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const deltaTime = (time - lastTime) / 1e3;
      lastTime = time;
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
  const handleMouseDown = (e) => {
    isDownRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollStartRef.current = scrollContainerRef.current.scrollLeft;
  };
  const handleMouseMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollLeftRef.current = scrollStartRef.current - walk;
    const originalWidth = scrollContainerRef.current.scrollWidth / 2;
    if (scrollLeftRef.current < 0) scrollLeftRef.current += originalWidth;
    if (scrollLeftRef.current >= originalWidth) scrollLeftRef.current -= originalWidth;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current;
  };
  const stopInteraction = () => {
    isDownRef.current = false;
    setIsGrabbing(false);
  };
  const handleTouchStart = (e) => {
    isDownRef.current = true;
    isPausedRef.current = true;
    startXRef.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollStartRef.current = scrollContainerRef.current.scrollLeft;
  };
  const handleTouchMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollLeftRef.current = scrollStartRef.current - walk;
    const originalWidth = scrollContainerRef.current.scrollWidth / 2;
    if (scrollLeftRef.current < 0) scrollLeftRef.current += originalWidth;
    if (scrollLeftRef.current >= originalWidth) scrollLeftRef.current -= originalWidth;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current;
  };
  const handleTouchEnd = () => {
    isDownRef.current = false;
    isPausedRef.current = false;
  };
  return /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("section", { className: "kin-section relative overflow-hidden pointer-events-auto", children: /* @__PURE__ */ jsxs("div", { className: "kin-container pointer-events-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 lg:mb-20 pointer-events-none", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-4 sm:mb-6", children: [
        /* @__PURE__ */ jsx(RevealText, { text: copy.titleA.toUpperCase() + " " }),
        /* @__PURE__ */ jsx(
          RevealText,
          {
            text: copy.titleB.toUpperCase(),
            className: "text-[#B454FF]",
            delay: 0.15
          }
        ),
        lang === "en" && copy.titleC && /* @__PURE__ */ jsx(RevealText, { text: " " + copy.titleC.toUpperCase(), delay: 0.3 })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/70 font-bold uppercase tracking-widest text-[10px] sm:text-xs", children: copy.sub })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        role: "region",
        "aria-label": lang === "es" ? "Carrusel de testimonios" : "Testimonials carousel",
        className: "relative kin-fade-x pointer-events-auto",
        onMouseEnter: () => isPausedRef.current = true,
        onMouseLeave: () => {
          isPausedRef.current = false;
          stopInteraction();
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref: scrollContainerRef,
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: stopInteraction,
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            className: `overflow-hidden whitespace-nowrap flex select-none pointer-events-auto ${isGrabbing ? "cursor-grabbing" : "cursor-grab"}`,
            style: {
              display: "flex",
              touchAction: "pan-y",
              pointerEvents: "auto",
              WebkitOverflowScrolling: "touch",
              userSelect: "none"
            },
            children: /* @__PURE__ */ jsx("div", { className: "flex gap-8 py-10 w-max pointer-events-auto", children: duplicatedItems.map((t, i) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-[85vw] sm:w-[45vw] lg:w-[32vw] flex-shrink-0 pointer-events-auto",
                children: /* @__PURE__ */ jsx(MouseParallax, { intensity: 7, rotate: 4, className: "h-full will-change-transform pointer-events-auto", children: /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    whileHover: {
                      y: -8,
                      scale: 1.02,
                      zIndex: 10,
                      boxShadow: "0 10px 30px rgba(168, 85, 247, 0.15)",
                      borderColor: "rgba(255, 255, 255, 0.2)"
                    },
                    viewport: { once: true },
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      delay: i % 3 * 0.08,
                      y: { duration: 0.3 },
                      scale: { duration: 0.3 }
                    },
                    className: "h-full bg-white/[0.04] border border-white/10 p-7 sm:p-8 md:p-10 rounded-[2.5rem] relative group hover:bg-white/[0.06] transition-colors flex flex-col pointer-events-auto cursor-default",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "flex gap-1 mb-6 pointer-events-none", "aria-hidden": "true", children: [...Array(5)].map((_, idx) => /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 fill-[#B454FF] text-[#B454FF]" }, idx)) }),
                      /* @__PURE__ */ jsxs("p", { className: "text-[#F5F5F5] mb-8 sm:mb-10 italic font-medium leading-relaxed select-none pointer-events-none whitespace-normal", children: [
                        '"',
                        t.content,
                        '"'
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center gap-4 pointer-events-none", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: t.avatar,
                            alt: t.name,
                            className: "w-12 h-12 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all",
                            width: 48,
                            height: 48,
                            loading: "lazy",
                            decoding: "async"
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("div", { className: "text-[#F5F5F5] font-black uppercase text-xs tracking-widest", children: t.name }),
                          /* @__PURE__ */ jsx("div", { className: "text-[#F5F5F5]/75 text-[10px] font-bold uppercase tracking-widest mt-1", children: t.role })
                        ] })
                      ] })
                    ]
                  }
                ) })
              },
              i
            )) })
          }
        )
      }
    )
  ] }) }) });
};
export {
  Testimonials as default
};
