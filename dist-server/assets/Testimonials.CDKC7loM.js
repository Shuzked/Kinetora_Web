import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { u as useI18n, C as ClientOnly, e as RevealText, M as MouseParallax } from "./entry-server.Dn9wYq1J.js";
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
    titleA: "Prueba Social",
    titleB: "C-Level & Founders",
    sub: "Empresas que escalan su ingeniería visual con nosotros.",
    testimonials: [
      {
        name: "Alex V.",
        role: "CTO @ VentureSaaS",
        content: "Kinetora no es una agencia, es una extensión técnica de nuestro equipo. Redujeron nuestro ciclo de iteración de semanas a días.",
        avatar: "/assets/testimonials/victor-merino.webp"
      },
      {
        name: "Elena M.",
        role: "Founding Partner @ Alpha Capital",
        content: "La capacidad para traducir conceptos de negocio complejos en interfaces intuitivas es de otro planeta. 10/10.",
        avatar: "/assets/testimonials/carlos-roldan.webp"
      },
      {
        name: "David S.",
        role: "CEO @ NexaFlow",
        content: "Gracias a su rediseño del pitch deck y la plataforma, cerramos nuestra Series A en tiempo récord. El ROI fue inmediato.",
        avatar: "/assets/testimonials/enrique-phan.webp"
      },
      {
        name: "Sara L.",
        role: "Product Manager @ Orbit",
        content: "Sistemas de diseño que realmente funcionan en producción. No solo Figma, sino código limpio y documentado.",
        avatar: "/assets/testimonials/danyil-shatko.webp"
      },
      {
        name: "Marcus K.",
        role: "Crypto Lead @ BlockChain HQ",
        content: "Dominan la estética Web3 sin sacrificar usabilidad B2B. Sus transiciones son pura ingeniería.",
        avatar: "/assets/testimonials/nicolas-francisquelo.webp"
      },
      {
        name: "Jordi T.",
        role: "Operations @ ScaleUp Inc.",
        content: "Cumplen lo que prometen: entregas en 48h sin que baje la calidad. Es el partner ideal para escalar rápido.",
        avatar: "/assets/testimonials/ferran-punti.webp"
      },
      {
        name: "Sofia R.",
        role: "Marketing Director @ Fintech Now",
        content: "La landing page que construyeron tiene una tasa de conversión un 40% superior a la anterior. Datos reales.",
        avatar: "/assets/testimonials/jorge-regalado.webp"
      }
    ]
  } : {
    titleA: "Social Proof",
    titleB: "C-Level & Founders",
    titleC: "",
    sub: "Companies scaling their visual engineering with us.",
    testimonials: [
      {
        name: "Alex V.",
        role: "CTO @ VentureSaaS",
        content: "Kinetora is not an agency, it's a technical extension of our team. They reduced our iteration cycle from weeks to days.",
        avatar: "/assets/testimonials/victor-merino.webp"
      },
      {
        name: "Elena M.",
        role: "Founding Partner @ Alpha Capital",
        content: "The ability to translate complex business concepts into intuitive interfaces is out of this world. 10/10.",
        avatar: "/assets/testimonials/carlos-roldan.webp"
      },
      {
        name: "David S.",
        role: "CEO @ NexaFlow",
        content: "Thanks to their pitch deck and platform redesign, we closed our Series A in record time. The ROI was immediate.",
        avatar: "/assets/testimonials/enrique-phan.webp"
      },
      {
        name: "Sara L.",
        role: "Product Manager @ Orbit",
        content: "Design systems that actually work in production. Not just Figma, but clean and documented code.",
        avatar: "/assets/testimonials/danyil-shatko.webp"
      },
      {
        name: "Marcus K.",
        role: "Crypto Lead @ BlockChain HQ",
        content: "They master the Web3 aesthetic without sacrificing B2B usability. Their transitions are pure engineering.",
        avatar: "/assets/testimonials/nicolas-francisquelo.webp"
      },
      {
        name: "Jordi T.",
        role: "Operations @ ScaleUp Inc.",
        content: "They deliver what they promise: 48h turnarounds without dropping quality. Ideal partner for fast scaling.",
        avatar: "/assets/testimonials/ferran-punti.webp"
      },
      {
        name: "Sofia R.",
        role: "Marketing Director @ Fintech Now",
        content: "The landing page they built has a conversion rate 40% higher than the previous one. Real data.",
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
