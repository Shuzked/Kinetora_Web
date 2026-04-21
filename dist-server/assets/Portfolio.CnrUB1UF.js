import { jsxs, jsx } from "react/jsx-runtime";
import React__default, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { P as PortfolioCard } from "./PortfolioCard.DkB5PxTW.js";
import { u as useI18n, f as RevealText, P as PremiumButton } from "./entry-server.CjgQBIYg.js";
import { u as useEqualizeHeights, c as caseStudies } from "./use-equalize.DQ81Eq-z.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "framer-motion";
import "./ImageWithSkeleton.D8f3qhVA.js";
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
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "lenis";
import "react-dom";
const Portfolio = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [swiperRef, setSwiperRef] = React__default.useState(null);
  const [activeIndex, setActiveIndex] = React__default.useState(0);
  useEqualizeHeights(sectionRef, [{ selector: ".js-eq-header", varName: "--eq-header" }], [lang]);
  const baseCards = caseStudies;
  const ui = lang === "es" ? {
    badge: "Casos de éxito",
    titleA: "Diseño creado para",
    titleB: "convertir",
    sub: "Proyectos reales con impacto medible. Explora nuestra selección de casos destacados.",
    viewAll: "Ver todos",
    readMore: "Leer más",
    ariaReadMore: (t) => `Leer más: ${t}`
  } : {
    badge: "Case studies",
    titleA: "Design built to",
    titleB: "convert",
    sub: "Real projects with measurable impact. Explore our selection of featured cases.",
    viewAll: "View all",
    readMore: "Read more",
    ariaReadMore: (t) => `Read more: ${t}`
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: sectionRef,
      className: "kin-section bg-[#0D0D0D] relative overflow-hidden group/portfolio",
      children: [
        /* @__PURE__ */ jsx("div", { className: "kin-container mb-12 sm:mb-16 lg:mb-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6", children: ui.badge }),
            /* @__PURE__ */ jsxs("h2", { className: "", children: [
              /* @__PURE__ */ jsx(RevealText, { text: ui.titleA.toUpperCase(), className: "block" }),
              /* @__PURE__ */ jsx(
                RevealText,
                {
                  text: ui.titleB.toUpperCase(),
                  className: "block text-[#B454FF]",
                  delay: 0.2
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 text-[#F5F5F5]/60 font-medium max-w-lg leading-relaxed animate-in fade-in slide-in-from-left-4 duration-1000 delay-300", children: ui.sub })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-6", children: [
            /* @__PURE__ */ jsx(Link, { to: "/casos", className: "shrink-0 w-full sm:w-auto", children: /* @__PURE__ */ jsx(PremiumButton, { variant: "glass", size: "md", className: "w-full sm:w-auto h-12 px-8", children: ui.viewAll.toUpperCase() }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => swiperRef == null ? void 0 : swiperRef.slidePrev(),
                  className: "h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#B454FF]/40 transition-all active:scale-95",
                  children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => swiperRef == null ? void 0 : swiperRef.slideNext(),
                  className: "h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#B454FF]/40 transition-all active:scale-95",
                  children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "kin-container-fluid", children: [
          /* @__PURE__ */ jsx("div", { className: "relative py-4", children: /* @__PURE__ */ jsx(
            Swiper,
            {
              onSwiper: setSwiperRef,
              onSlideChange: (swiper) => setActiveIndex(swiper.realIndex),
              modules: [Autoplay, Navigation, Pagination],
              loop: true,
              speed: 600,
              autoplay: {
                delay: 5e3,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              },
              grabCursor: true,
              slidesPerView: 1.1,
              spaceBetween: 16,
              centeredSlides: true,
              breakpoints: {
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                  centeredSlides: true
                },
                768: {
                  slidesPerView: 2.2,
                  spaceBetween: 24,
                  centeredSlides: false
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                  centeredSlides: false
                }
              },
              className: "w-full px-[5vw] lg:px-0 lg:max-w-7xl lg:mx-auto !overflow-visible",
              children: baseCards.map((cs, i) => /* @__PURE__ */ jsx(SwiperSlide, { className: "h-auto", children: () => /* @__PURE__ */ jsx("div", { className: "h-full transition-all duration-700 opacity-100 blur-0 scale-100", children: /* @__PURE__ */ jsx(PortfolioCard, { cs, onNavigate: (slug) => navigate(`/casos/${slug}`), lang, ui }) }) }, `${cs.slug}-${i}`))
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center gap-3", children: baseCards.map((_, i) => {
            const isActive = activeIndex === i;
            return /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => swiperRef == null ? void 0 : swiperRef.slideToLoop(i),
                className: `h-1.5 rounded-full transition-all duration-500 ${isActive ? "w-8 bg-[#B454FF] shadow-[0_0_12px_rgba(180,84,255,0.5)]" : "w-2 bg-white/20 hover:bg-white/40"}`,
                "aria-label": `Go to slide ${i + 1}`
              },
              i
            );
          }) })
        ] })
      ]
    }
  );
};
PortfolioCard.displayName = "PortfolioCard";
export {
  Portfolio as default
};
