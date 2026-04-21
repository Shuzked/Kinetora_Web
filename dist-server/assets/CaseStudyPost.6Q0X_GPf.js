import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { P as PremiumButton, u as useI18n, S as SEO, N as Navbar, R as Reveal, g as getSeoDefaults } from "./entry-server.DD-cyNZX.js";
import Footer from "./Footer.CoJxyP2_.js";
import "clsx";
import { S as Skeleton } from "./ImageWithSkeleton.etqQ9V6y.js";
import DOMPurify from "dompurify";
import { D as Dialog, a as DialogContent, b as DialogTitle, c as DialogDescription } from "./dialog.PEj82Z1u.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { P as PortfolioCard } from "./PortfolioCard.ByyDaa36.js";
import { u as useEqualizeHeights, c as caseStudies } from "./use-equalize.DQ81Eq-z.js";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "stream";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "framer-motion";
import "lenis";
import "react-dom";
import "./input.DbWUSKtp.js";
import "react-icons/si";
import "react-icons/fa";
import "./label.DDh2-1nC.js";
import "@radix-ui/react-label";
import "./checkbox.B6uppU3e.js";
import "@radix-ui/react-checkbox";
function enhanceMedia(html) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("img").forEach((img) => {
    if (!img.getAttribute("loading")) img.setAttribute("loading", "lazy");
    if (!img.getAttribute("decoding")) img.setAttribute("decoding", "async");
    if (!img.getAttribute("fetchpriority")) img.setAttribute("fetchpriority", "low");
    if (!img.getAttribute("sizes")) img.setAttribute("sizes", "(min-width:1024px) 420px, 100vw");
    const cls = new Set((img.getAttribute("class") || "").split(/\s+/).filter(Boolean));
    ["max-w-full", "w-full", "h-auto", "block", "rounded-xl", "bg-transparent"].forEach((c) => cls.add(c));
    img.setAttribute("class", Array.from(cls).join(" "));
  });
  doc.querySelectorAll("figure").forEach((fig) => {
    const cls = new Set((fig.getAttribute("class") || "").split(/\s+/).filter(Boolean));
    ["rounded-2xl", "overflow-hidden", "mb-4"].forEach((c) => cls.add(c));
    fig.setAttribute("class", Array.from(cls).join(" "));
  });
  doc.querySelectorAll("iframe").forEach((ifr) => {
    if (!ifr.getAttribute("loading")) ifr.setAttribute("loading", "lazy");
    if (!ifr.getAttribute("referrerpolicy")) ifr.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    if (!ifr.getAttribute("title")) ifr.setAttribute("title", "Embedded content");
    ifr.removeAttribute("width");
    ifr.removeAttribute("height");
    const cls = new Set((ifr.getAttribute("class") || "").split(/\s+/).filter(Boolean));
    ["absolute", "inset-0", "w-full", "h-full"].forEach((c) => cls.add(c));
    ifr.setAttribute("class", Array.from(cls).join(" "));
    const wrapper = doc.createElement("div");
    wrapper.setAttribute("class", "relative w-full aspect-video overflow-hidden rounded-xl mb-4");
    const parent = ifr.parentNode;
    if (parent) {
      parent.insertBefore(wrapper, ifr);
      wrapper.appendChild(ifr);
    }
  });
  return doc.body.innerHTML;
}
function WPPostContent({ html }) {
  const sanitized = React__default.useMemo(
    () => DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ADD_TAGS: ["iframe", "video", "source", "picture"],
      ADD_ATTR: [
        "target",
        "rel",
        "loading",
        "decoding",
        "referrerpolicy",
        "allow",
        "allowfullscreen",
        "frameborder",
        "scrolling",
        "controls",
        "playsinline",
        "muted",
        "loop",
        "autoplay",
        "poster",
        "preload",
        "src",
        "srcset",
        "srcSet",
        "type",
        "title",
        "width",
        "height"
      ]
    }),
    [html]
  );
  const enhanced = React__default.useMemo(() => enhanceMedia(sanitized), [sanitized]);
  return /* @__PURE__ */ jsx("div", { className: "wp-post-inner", dangerouslySetInnerHTML: { __html: enhanced } });
}
const MediaLightbox = ({ html, className }) => {
  const [open, setOpen] = React__default.useState(false);
  const [src, setSrc] = React__default.useState(null);
  const [alt, setAlt] = React__default.useState("");
  const onContainerClick = React__default.useCallback((e) => {
    const target = e.target;
    const img = target.closest("img");
    if (img && img.src) {
      e.preventDefault();
      setSrc(img.src);
      setAlt(img.getAttribute("alt") || "Preview image");
      setOpen(true);
    }
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: onContainerClick,
        className: [
          "wp-post__content wp-post__media",
          // Todas las imágenes dentro muestran cursor de "manita"
          "[&_img]:cursor-pointer",
          className || ""
        ].join(" ").trim(),
        children: /* @__PURE__ */ jsx(WPPostContent, { html })
      }
    ),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(
      DialogContent,
      {
        className: "max-w-[92vw] md:max-w-4xl lg:max-w-5xl border border-white/10 bg-white/10 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-2xl focus:outline-none",
        children: [
          /* @__PURE__ */ jsx(DialogTitle, { className: "sr-only", children: "Image preview" }),
          /* @__PURE__ */ jsx(DialogDescription, { className: "sr-only", children: "Enlarged preview of the selected deliverable image" }),
          /* @__PURE__ */ jsx("div", { className: "relative w-full flex items-center justify-center", children: src && // Imagen responsiva centrada
          /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt,
              className: "max-h-[82vh] md:max-h-[84vh] w-auto h-auto object-contain rounded-xl",
              loading: "eager",
              decoding: "sync"
            }
          ) }),
          alt ? /* @__PURE__ */ jsx("div", { className: "mt-3 text-center text-xs text-[#F5F5F5]/70", children: alt }) : null
        ]
      }
    ) })
  ] });
};
const CaseStudyColumns = ({
  loading,
  textHtml,
  mediaHtml,
  stickySide,
  textLabel,
  mediaLabel,
  textWrapRef,
  mediaWrapRef
}) => {
  return /* @__PURE__ */ jsxs("section", { className: "flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch relative", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: textWrapRef,
        className: `wp-post flex-1 lg:h-fit ${stickySide === "left" ? "lg:sticky lg:bottom-[20px] lg:self-end" : ""}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-4 mb-5", children: /* @__PURE__ */ jsx("div", { className: "text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60", children: textLabel }) }),
          loading ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4/5" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/5" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4/6" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-48 w-full rounded-2xl" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-5/6" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4" })
          ] }) : /* @__PURE__ */ jsx("div", { className: "wp-post__content", children: /* @__PURE__ */ jsx(WPPostContent, { html: textHtml }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: mediaWrapRef,
        className: `w-full lg:w-[420px] flex-shrink-0 lg:h-fit ${stickySide === "right" ? "lg:sticky lg:bottom-[20px] lg:self-end" : ""}`,
        children: /* @__PURE__ */ jsxs("div", { className: "wp-media", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60 mb-5", children: mediaLabel }),
          loading ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-48 w-full rounded-2xl" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-48 w-full rounded-2xl" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-48 w-full rounded-2xl" })
          ] }) : /* @__PURE__ */ jsx(MediaLightbox, { html: mediaHtml })
        ] })
      }
    )
  ] });
};
const CaseStudyMoreResults = ({
  cases,
  lang,
  readMoreLabel,
  moreResultsLabel,
  viewAllLabel,
  swipeLabel,
  onNavigate
}) => {
  const containerRef = useRef(null);
  const [swiperRef, setSwiperRef] = React__default.useState(null);
  const [activeIndex, setActiveIndex] = React__default.useState(0);
  useEqualizeHeights(containerRef, [{ selector: ".js-eq-header", varName: "--eq-header" }], [lang, cases.length]);
  const ui = {
    readMore: readMoreLabel,
    ariaReadMore: (t) => `${readMoreLabel}: ${t}`
  };
  if (cases.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "relative mt-16 sm:mt-20 lg:mt-24 pt-16 border-t border-white/10", ref: containerRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-10 sm:mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6", children: lang === "es" ? "Proyectos relacionados" : "Related projects" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-black tracking-tighter uppercase whitespace-pre-line", children: moreResultsLabel })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-6", children: [
        /* @__PURE__ */ jsx(Link, { to: "/casos", className: "shrink-0 w-full sm:w-auto", children: /* @__PURE__ */ jsx(PremiumButton, { variant: "glass", size: "md", className: "w-full sm:w-auto h-12 px-8", children: viewAllLabel.toUpperCase() }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => swiperRef == null ? void 0 : swiperRef.slidePrev(),
              className: "h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#B454FF]/40 transition-all active:scale-95",
              "aria-label": "Previous cases",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => swiperRef == null ? void 0 : swiperRef.slideNext(),
              className: "h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#B454FF]/40 transition-all active:scale-95",
              "aria-label": "Next cases",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
      Swiper,
      {
        onSwiper: setSwiperRef,
        onSlideChange: (swiper) => setActiveIndex(swiper.realIndex),
        modules: [Autoplay, Navigation, Pagination],
        a11y: { enabled: false },
        loop: cases.length > 3,
        speed: 600,
        autoplay: {
          delay: 5e3,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        grabCursor: true,
        slidesPerView: 1.1,
        spaceBetween: 16,
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32
          }
        },
        className: "w-full !overflow-visible",
        children: cases.map((cs) => /* @__PURE__ */ jsx(SwiperSlide, { className: "h-auto", children: /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx(PortfolioCard, { cs, onNavigate, lang, ui }) }) }, cs.slug))
      }
    ) }),
    cases.length > 1 && /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center gap-3", children: cases.map((_, i) => {
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
    }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 sm:hidden text-center", children: /* @__PURE__ */ jsx("p", { className: "text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/55", children: swipeLabel }) })
  ] });
};
const caseContentOverrides = {
  "elixir-games": {
    esTextHtml: [
      "<p>El sector de los videojuegos descentralizados se mueve a una velocidad de vértigo. Mantenerse en la cima durante años exige una Dirección Creativa de alto rendimiento. Nuestra colaboración con <strong>Elixir Games</strong>, la mayor plataforma de distribución de juegos Web3 del mundo, se ha consolidado a lo largo de tres años de crecimiento ininterrumpido (2023-2026).</p>",
      "<p>Durante este periodo, asumimos la responsabilidad de liderar toda su evolución visual. No se trató solo de un cambio de imagen, sino de una transformación integral de su ecosistema: desde plataformas web y aplicaciones móviles hasta la comunicación institucional para inversores.</p>",
      '<p>Lideramos este desafío logrando un impacto social masivo y una recaudación de capital histórica que ha posicionado a Elixir como el referente absoluto del mercado. <a href="https://elixir.games" target="_blank" rel="noopener noreferrer">Visita la plataforma oficial de Elixir Games</a> para conocer su ecosistema.</p>',
      "<h2>Algunos entregables</h2>",
      "<p>Para sostener este nivel de liderazgo profesional, creamos un flujo constante de recursos de máxima calidad visual:</p>",
      "<h3>1. Pitch Decks & Material para Inversores</h3>",
      "<p>Durante todo el proceso de financiación, diseñamos múltiples Pitch Decks interactivos y persuasivos. Nuestra capacidad para presentar datos financieros mediante animaciones dinámicas y una narrativa empresarial sólida fue determinante para cerrar rondas de inversión privada multimillonarias.</p>",
      "<h3>2. Evolución de Marca y Ecosistema Web</h3>",
      "<p>Ejecutamos la renovación completa de su identidad y el desarrollo de todo su ecosistema digital. Esto incluyó la creación de sitios oficiales para sus videojuegos propios, landings de campañas estratégicas y la web central de Elixir Studios que cohesiona todas sus verticales.</p>",
      "<h3>3. UX/UI de Próxima Gen</h3>",
      "<p>Diseñamos las interfaces de usuario para su plataforma principal y su ecosistema de aplicaciones móviles. Con una estética vanguardista, optimizamos la navegación y la retención del jugador en títulos de gran calado, elevando el estándar visual de la industria.</p>",
      "<h3>4. Producción Audiovisual & Motion Graphics</h3>",
      "<p>Fuimos los encargados de toda la narrativa audiovisual. Desde la edición de vídeos manifiesto con efectos visuales (VFX) de calidad cinematográfica hasta la creación de un flujo constante de motion graphics para redes sociales.</p>",
      "<h3>5. Diseño Integral para Eventos Globales</h3>",
      "<p>Proyectamos la presencia física de Elixir en los eventos más importantes de la industria (Dreamhack, Token2049, etc.). Diseñamos desde cartelería de gran formato hasta activos de networking que reforzaron su autoridad internacional.</p>",
      "<h3>6. Mantenimiento & Estrategia Digital Diaria</h3>",
      "<p>Más allá de los grandes hitos, gestionamos el mantenimiento visual diario. Diseñamos banners y creatividades tácticas para sus canales oficiales, asegurando que la marca Elixir Games se mantuviera siempre fresca y líder.</p>",
      "<h2>Resultados de un Liderazgo Continuado</h2>",
      "<p>El éxito sostenido de Elixir Games confirma el valor de una dirección creativa impecable. Durante estos 3 años, logramos hitos que han redefinido el mercado:</p>",
      "<ul>",
      "<li><strong>Ronda Semilla Total Cerrada:</strong> +14 Millones de Dólares</li>",
      "<li><strong>Impacto Orgánico:</strong> +5,1 Millones de visualizaciones</li>",
      "<li><strong>Usuarios Únicos Registrados:</strong> +500.000</li>",
      "</ul>"
    ].join(""),
    esMediaHtml: [
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/ux-reimagined.webp" type="image/webp"><img src="/assets/cases/elixir-games/ux-reimagined.webp" alt="ELIXIR GAMES — Interfaz de Usuario y Experiencia de Aplicación" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/kbw-event.webp" type="image/webp"><img src="/assets/cases/elixir-games/kbw-event.webp" alt="ELIXIR GAMES — Evento Korean Blockchain Week y Networking" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/hoodie-design.webp" type="image/webp"><img src="/assets/cases/elixir-games/hoodie-design.webp" alt="ELIXIR GAMES — Diseño de Merchandising y Ropa Oficial" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/elix-character.webp" type="image/webp"><img src="/assets/cases/elixir-games/elix-character.webp" alt="ELIXIR GAMES — Diseño de Personajes y Activos 3D de $ELIX" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/token-burn.webp" type="image/webp"><img src="/assets/cases/elixir-games/token-burn.webp" alt="ELIXIR GAMES — Campaña de Quemado de Tokens $ELIX" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/season-pass.webp" type="image/webp"><img src="/assets/cases/elixir-games/season-pass.webp" alt="ELIXIR GAMES — Recompensas de Pase de Temporada y Clasificaciones" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/lottery.webp" type="image/webp"><img src="/assets/cases/elixir-games/lottery.webp" alt="ELIXIR GAMES — Sorteo Comunitario y Evento de Cierre" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/launcher-banner.webp" type="image/webp"><img src="/assets/cases/elixir-games/launcher-banner.webp" alt="ELIXIR GAMES — Diseño de Roll-ups y Cartelería para Eventos Globales" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/yd9LRPZ7EcQ" title="Elixir Games — Evolución de la Plataforma y Funcionalidades" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/CVZGqn06Lzs" title="Elixir Games — Revelación de Gameplay y Nuevos Mundos" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/fbNkAekm8e0" title="Elixir Games — Portafolio Creativo y Dirección de Arte" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/hZ-Z8dtvshE" title="Elixir Games — Integración Web3 de Alto Rendimiento" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/6NhEtTPYJkI" title="Elixir Games — Marketing Estratégico e Impacto de Marca" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/LF61aJLSfkQ" title="Elixir Games — Crecimiento de la Comunidad Global" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/-zh8JhYhMVQ" title="Elixir Games — VFX Avanzados y Motion Graphics" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/ee5oTpbSYnY" title="Elixir Games — Pitch Decks y Materiales para Inversores" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/K_kUS2zPV_U" title="Elixir Games — Ecosistema de Token $ELIX y Utilidad" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/FoUMzboMMko" title="Elixir Games — 3 Años de Crecimiento Imparable" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/sYZaBaDl5ts" title="Elixir Games — Estrategia Digital y Excelencia UX" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/L1XyY1ldGkA" title="Elixir Games — El Futuro de la Distribución Web3" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/1QUsy5eJd5g" title="Elixir Games — Colaboración e Innovación Continua" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>'
    ].join(""),
    enTextHtml: [
      "<p>The decentralized gaming sector moves at breakneck speed. Staying at the top for years demands high-performance Creative Direction. Our collaboration with <strong>Elixir Games</strong>, the world's largest Web3 game distribution platform, has been built over three years of uninterrupted growth (2023-2026).</p>",
      "<p>During this period, we took the lead on their entire visual evolution. This wasn't just a rebrand, but a complete transformation of their ecosystem: from web platforms and mobile apps to corporate communications for investors.</p>",
      '<p>We led this challenge achieving massive social impact and a historic capital raise that positioned Elixir as the absolute market leader. <a href="https://elixir.games" target="_blank" rel="noopener noreferrer">Visit the official Elixir Games platform</a> to explore their ecosystem.</p>',
      "<h2>Some deliverables</h2>",
      "<p>To sustain this level of market leadership, we created a constant flow of top-tier visual resources:</p>",
      "<h3>1. Pitch Decks & Investor Materials</h3>",
      "<p>Throughout the funding process, we designed multiple persuasive interactive Pitch Decks. Our ability to present financial data through dynamic animations and a solid business narrative was key to successfully closing multimillion-dollar private investment rounds.</p>",
      "<h3>2. Brand Evolution & Web Ecosystem</h3>",
      "<p>We executed a complete identity overhaul and developed their entire digital ecosystem. This included creating official websites for their in-house video games, strategic campaign landings, and the central Elixir Studios web that unifies all business verticals.</p>",
      "<h3>3. Next-Gen UX/UI</h3>",
      "<p>We designed the user interfaces for their main platform and mobile app ecosystem. With a forward-thinking aesthetic, we optimized navigation and player retention in major titles, raising the industry's visual standard.</p>",
      "<h3>4. Audiovisual Production & Motion Graphics</h3>",
      "<p>We were responsible for the entire audiovisual narrative. From editing manifesto videos with cinematic-quality VFX to creating a steady stream of motion graphics for social media.</p>",
      "<h3>5. Comprehensive Design for Global Events</h3>",
      "<p>We projected Elixir's physical presence at the industry's most important events (Dreamhack, Token2049, etc.). We designed everything from large-format signage to networking assets that reinforced their authority.</p>",
      "<h3>6. Daily Digital Strategy & Maintenance</h3>",
      "<p>Beyond major milestones, we managed the daily visual maintenance of their entire ecosystem. We designed tactical banners and creatives for their official channels, ensuring the Elixir Games brand remained fresh and ahead of the competition.</p>",
      "<h2>Results of Continued Leadership</h2>",
      "<p>Elixir Games' sustained success confirms the value of flawless creative direction. Over these 3 years, we achieved milestones that have redefined the market:</p>",
      "<ul>",
      "<li><strong>Total Seed Round Closed:</strong> +$14 Million</li>",
      "<li><strong>Organic Reach:</strong> +5.1 Million views</li>",
      "<li><strong>Unique Registered Users:</strong> +500,000</li>",
      "</ul>"
    ].join(""),
    enMediaHtml: [
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/ux-reimagined.webp" type="image/webp"><img src="/assets/cases/elixir-games/ux-reimagined.webp" alt="ELIXIR GAMES — User Interface and Application Experience" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/kbw-event.webp" type="image/webp"><img src="/assets/cases/elixir-games/kbw-event.webp" alt="ELIXIR GAMES — Korean Blockchain Week Event & Networking" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/hoodie-design.webp" type="image/webp"><img src="/assets/cases/elixir-games/hoodie-design.webp" alt="ELIXIR GAMES — Official Merchandise and Apparel Design" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/elix-character.webp" type="image/webp"><img src="/assets/cases/elixir-games/elix-character.webp" alt="ELIXIR GAMES — $ELIX Character and 3D Assets" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/token-burn.webp" type="image/webp"><img src="/assets/cases/elixir-games/token-burn.webp" alt="ELIXIR GAMES — $ELIX Token Burn Campaign and Supply Reduction" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/season-pass.webp" type="image/webp"><img src="/assets/cases/elixir-games/season-pass.webp" alt="ELIXIR GAMES — Season Pass Rewards and Leaderboards" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/lottery.webp" type="image/webp"><img src="/assets/cases/elixir-games/lottery.webp" alt="ELIXIR GAMES — Community Lottery and Closing Event" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      `<figure class="wp-block-image"><picture><source srcset="/assets/cases/elixir-games/launcher-banner.webp" type="image/webp"><img src="/assets/cases/elixir-games/launcher-banner.webp" alt="ELIXIR GAMES — Roll-up and Signage Design for Global Events" onerror="this.style.display='none'" loading="lazy" /></picture></figure>`,
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/yd9LRPZ7EcQ" title="Elixir Games — Platform Evolution and Features" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/CVZGqn06Lzs" title="Elixir Games — Gameplay Reveal and New Worlds" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/fbNkAekm8e0" title="Elixir Games — Creative Portfolio and Art Direction" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/hZ-Z8dtvshE" title="Elixir Games — High-Performance Web3 Integration" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/6NhEtTPYJkI" title="Elixir Games — Strategic Marketing and Brand Impact" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/LF61aJLSfkQ" title="Elixir Games — Global Community Growth" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/-zh8JhYhMVQ" title="Elixir Games — Advanced VFX and Motion Graphics" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/ee5oTpbSYnY" title="Elixir Games — Pitch Decks and Investor Materials Overview" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/K_kUS2zPV_U" title="Elixir Games — $ELIX Token Ecosystem and Utility" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/FoUMzboMMko" title="Elixir Games — 3 Years of Unstoppable Growth" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/sYZaBaDl5ts" title="Elixir Games — Digital Strategy and UX Excellence" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/L1XyY1ldGkA" title="Elixir Games — Future of Web3 Gaming Distribution" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/1QUsy5eJd5g" title="Elixir Games — Collaboration and Innovation Journey" loading="lazy" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></figure>'
    ].join("")
  },
  "dunk-low-elixir-edition": {
    esTextHtml: [
      "<p>Unir moda urbana y tecnología blockchain es un gran reto. Esto exige un nivel experto de Marketing Web3. El equipo de Elixir Games nos planteó un proyecto único. Querían lanzar una edición exclusiva de las zapatillas Nike Dunk Low. Era un producto muy limitado de solo 100 unidades físicas y digitales.</p>",
      "<p><strong>¿Qué hicimos?</strong> Diseñamos toda la experiencia visual y técnica desde cero. Entregamos la plataforma de registro, un tráiler oficial con efectos visuales (VFX) y todo el plan estratégico de recompensas.</p>",
      "<p><strong>¿El resultado?</strong> Logramos llenar las listas de espera rápidamente. Además, generamos recompensas por valor de 100 dólares en tokens para cada comprador. Construimos una comunidad élite de forma muy rápida y exitosa.</p>",
      '<p>Nuestra agencia de marketing digital logró un impacto total en este proyecto. A continuación, detallamos nuestro trabajo. <a href="https://elixir.games" target="_blank" rel="noopener noreferrer">Visita la web oficial de Elixir Games</a> para ver todo su ecosistema.</p>',
      "<h2>Estrategia de Marketing Web3: Activos Creados</h2>",
      "<p>Para este gran lanzamiento preparamos recursos de máxima calidad. Este fue el trabajo entregado a nuestro cliente:</p>",
      "<h3>1. Landing Page</h3>",
      "<p>Desarrollamos la página web oficial del evento. Entregamos una interfaz rápida y muy atractiva. Aplicamos un diseño UX/UI estratégico para retener al visitante. Dividimos la plataforma en dos fases clave. Primero, lanzamos un formulario seguro para la lista de espera (waitlist). Después, activamos el flujo de compra al terminar el contador. La web soportó un tráfico masivo sin caídas ni problemas técnicos. Hubo miles de usuarios en espera. A pesar de esto, el sistema aseguró el registro perfecto de los 100 afortunados.</p>",
      "<h3>2. Vídeos, Motion e Imágenes</h3>",
      "<p>Producimos todo el material audiovisual para las redes sociales. El trabajo entregado incluyó animaciones y motion graphics de primer nivel. Diseñamos banners estáticos y exclusivos para Discord y Twitter. También creamos píldoras de vídeo para el lanzamiento del producto. Estas piezas visuales destacaron los grandes premios disponibles. Así logramos mantener el interés del público por las nubes en todo momento.</p>",
      "<h3>3. Video Lanzamiento (Edición, VFX, etc.)</h3>",
      "<p>Creamos el tráiler oficial para revelar estas zapatillas exclusivas. Este entregable exigió una edición avanzada de vídeo. Aplicamos corrección de color y efectos visuales (VFX) en 3D de alta calidad. Mostramos la textura real y detallada de las Nike Dunk Low. Logramos una estética muy inmersiva y cinematográfica. Este vídeo detonó al máximo el entusiasmo del público coleccionista.</p>",
      "<h3>4. Estrategia de Marketing</h3>",
      "<p>Diseñamos un plan maestro para retener a todos los usuarios. Nuestra estrategia de Marketing Web3 incluyó la entrega de grandes premios. Creamos una campaña festiva para repartir airdrops durante todo el mes de diciembre. Los compradores recibieron recompensas valoradas en 100 dólares. Entregamos monedas virtuales gratuitas como $ELIX o $KIDEN. Esta gran acción táctica aseguró la lealtad absoluta de todo este grupo VIP.</p>",
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/SmxMZZUsqIo?si=EqO1GaCOdw0TfdQ0" title="YouTube video player" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/6FQVlBRWU-Y?si=95MSDbWVsfvD9g-q" title="YouTube video player" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/dunk-low-elixir/Gif_NFT_Nike.webp" alt="DUNK LOW ELIXIR — Asset animado" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/dunk-low-elixir/Post_Nike.webp" alt="DUNK LOW ELIXIR — Post Nike" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/dunk-low-elixir/Post_Nike_Join.webp" alt="DUNK LOW ELIXIR — Join Post" loading="lazy" /></figure>'
    ].join(""),
    enTextHtml: [
      "<p>Combining urban fashion with blockchain technology is a major challenge—one that demands expert-level Web3 marketing. The Elixir Games team came to us with a unique project: launch an exclusive edition of Nike Dunk Low sneakers, limited to just 100 physical and digital units.</p>",
      "<p><strong>What did we do?</strong> We designed the entire visual and technical experience from scratch. We delivered the registration platform, the official trailer with visual effects (VFX), and the complete strategic rewards plan.</p>",
      "<p><strong>The result?</strong> We quickly filled the waitlists and granted $100 in token rewards to every buyer—building an elite community fast and effectively.</p>",
      '<p>Our digital marketing agency had a total impact on this project. Below we break down our work. <a href="https://elixir.games" target="_blank" rel="noopener noreferrer">Visit the official Elixir Games website</a> to explore their ecosystem.</p>',
      "<h2>Web3 Marketing Strategy: Assets Created</h2>",
      "<p>For this major launch, we prepared top-quality resources. Here's what we delivered:</p>",
      "<h3>1. Landing Page</h3>",
      "<p>We built the event's official website with a fast, engaging interface and strategic UX/UI designed to retain visitors. The platform launched in two phases: first, a secure waitlist form; then, once the countdown ended, the purchase flow. The site handled massive traffic without crashes, seamlessly registering the 100 winners amid thousands of waitlist users.</p>",
      "<h3>2. Videos, Motion, and Images</h3>",
      "<p>We produced all audiovisual assets for social channels, including top-tier animations and motion graphics. We designed exclusive static banners for Discord and Twitter and created short video clips for the product reveal—highlighting the rewards and keeping public interest sky-high.</p>",
      "<h3>3. Launch Trailer (Editing, VFX, etc.)</h3>",
      "<p>We crafted the official trailer to unveil the exclusive sneakers—requiring advanced video editing, color grading, and high-quality 3D VFX. We showcased the realistic texture of the Nike Dunk Low in an immersive, cinematic style that energized the collector community.</p>",
      "<h3>4. Marketing Strategy</h3>",
      "<p>We designed a master plan to retain users, with festive airdrops throughout December. Buyers received $100 in rewards and free coins such as $ELIX or $KIDEN—ensuring complete loyalty across this VIP group.</p>",
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/SmxMZZUsqIo?si=EqO1GaCOdw0TfdQ0" title="YouTube video player" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/6FQVlBRWU-Y?si=95MSDbWVsfvD9g-q" title="YouTube video player" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/dunk-low-elixir/Gif_NFT_Nike.webp" alt="DUNK LOW ELIXIR — Animated asset" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/dunk-low-elixir/Post_Nike.webp" alt="DUNK LOW ELIXIR — Nike post" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/dunk-low-elixir/Post_Nike_Join.webp" alt="DUNK LOW ELIXIR — Join post" loading="lazy" /></figure>'
    ].join("")
  },
  "elixir-token": {
    esTextHtml: [
      "<p>Elixir Games es el gigante del gaming descentralizado. Esta gran empresa tiene el fuerte apoyo de Square Enix y la Fundación Solana. Ellos necesitaban un Marketing Web3 de nivel mundial para lanzar su propia moneda. Así nació el gran reto del Token Elixir ($ELIX).</p>",
      "<p>No queríamos hacer un lanzamiento normal o aburrido. Diseñamos una experiencia visual y técnica totalmente arrolladora. Nuestro trabajo logró movilizar a toda la comunidad global. Gracias a esto, el proyecto superó los 14,2 millones de dólares en ventas.</p>",
      '<p>Nuestra agencia de marketing digital se encargó de liderar toda esta campaña. A continuación, te contamos el paso a paso de este gran desarrollo tecnológico. Conoce más sobre este ecosistema en la <a href="https://elixir.games" target="_blank" rel="noopener noreferrer">plataforma oficial de Elixir Games</a>.</p>',
      "<h2>El desarrollo visual y técnico del proyecto</h2>",
      "<p>Dejamos atrás las típicas plantillas corporativas. Apostamos por un formato dinámico, futurista y muy premium. Así ejecutamos cada área del proyecto:</p>",
      "<h3>1. Dirección de arte y diseño del token</h3>",
      "<p>Toda gran moneda necesita una identidad visual muy fuerte. Nosotros lideramos el diseño de la moneda virtual ($ELIX). El cliente nos pidió una réplica del token $LITT a la inversa. Esa otra moneda pertenece a su exitoso videojuego CyberTitans.</p>",
      "<p>Para lograrlo, creamos un concepto visual basado en el Ying y el Yang. Usamos tonos rosados muy vibrantes y texturas metálicas. El diseño final transmite la calidad pura de un videojuego de alto presupuesto (AAA). Este branding generó una enorme confianza en todos los grandes inversores. Fue una pieza visual clave de nuestro Marketing Web3.</p>",
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/elix-token.webp" alt="ELIXIR TOKEN — Diseño del token $ELIX" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/litt-elix.webp" alt="ELIXIR TOKEN — Comparativa visual entre $LITT y $ELIX" loading="lazy" /></figure>',
      "<h3>2. Vídeo de lanzamiento (edición y VFX)</h3>",
      "<p>El anuncio oficial debía impactar al mundo entero en segundos. Por eso, produjimos un tráiler cinemático espectacular. Hicimos una edición de vídeo muy dinámica y ágil.</p>",
      "<p>Aplicamos grandes efectos visuales (VFX) en 3D. Integramos gráficos holográficos y entornos digitales muy inmersivos. Mostramos el token brillando con mucha energía. Esta pieza audiovisual detonó un entusiasmo brutal en el mercado.</p>",
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/video-launch.webp" alt="ELIXIR TOKEN — Visual del vídeo de lanzamiento" loading="lazy" /></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/t3IcVBkewrg?si=ZghOyWriAUOFA7PF" title="ELIXIR TOKEN launch video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/fuS1WG1g7iA?si=bxtiuHgDgvdxOACq" title="ELIXIR TOKEN campaign video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      "<h3>3. Motion graphics e imágenes para RRSS</h3>",
      "<p>Antes de lanzar el token $ELIX, creamos un vídeo IDO estratégico. En él explicamos visualmente las fechas y fases de compra. El contenido social de hoy debe atrapar al usuario al instante. Por eso, diseñamos un paquete audiovisual muy potente y dinámico.</p>",
      "<p>Usamos motion graphics rápidos para explicar conceptos financieros complejos en pocos segundos. Mostramos la moneda brillante y animaciones de alta calidad. Así logramos mantener a toda la audiencia atenta y muy conectada durante meses.</p>",
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/launchpad.webp" alt="ELIXIR TOKEN — Creatividad de launchpad" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/ido-live.webp" alt="ELIXIR TOKEN — Creatividad IDO is live" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/ido-closed.webp" alt="ELIXIR TOKEN — Creatividad IDO is closed" loading="lazy" /></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/XNdB0Z5n6rQ?si=nt_6If0rQntFe-wz" title="ELIXIR TOKEN IDO video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/DSQek3qNhq8?si=kg3KIHqBHEgkpxwo" title="ELIXIR TOKEN motion graphics video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/FSkTdXPqlSY?si=0kchOtKsvXVA5ZRQ" title="ELIXIR TOKEN social asset video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      "<h3>4. Estrategia de Marketing Web3</h3>",
      "<p>Un buen diseño visual siempre necesita un gran motor de ventas. Diseñamos una estrategia de Marketing Web3 muy ambiciosa. Gamificamos el proceso de compra para retener al usuario.</p>",
      "<p>Creamos la gran campaña del Season Pass. Repartimos más de un millón de dólares en premios reales. Esta acción masiva aseguró ventas récord y fidelizó a una comunidad inmensa.</p>",
      "<h2>Resultados que rompen el mercado</h2>",
      "<p>El éxito nunca llega por pura suerte. Requiere un Marketing Web3 estructurado y visualmente impecable. Lograr más de 14,2 millones de dólares confirma la calidad de nuestro trabajo.</p>"
    ].join(""),
    enTextHtml: [
      "<p>Elixir Games is a giant in decentralized gaming, backed by Square Enix and the Solana Foundation. They needed world-class Web3 marketing to launch their own token. That is how the major challenge of Elixir Token ($ELIX) was born.</p>",
      "<p>We did not want to create a standard or forgettable launch. We designed a fully striking visual and technical experience. Our work activated the entire global community. Thanks to this, the project surpassed $14.2 million in sales.</p>",
      '<p>Our digital marketing agency led the entire campaign. Below, we walk you through each stage of this major technological rollout. Discover more about the ecosystem on the <a href="https://elixir.games" target="_blank" rel="noopener noreferrer">official Elixir Games platform</a>.</p>',
      "<h2>The visual and technical development of the project</h2>",
      "<p>We moved away from typical corporate templates. Instead, we chose a dynamic, futuristic, and highly premium format. This is how we executed every area of the project:</p>",
      "<h3>1. Art direction and token design</h3>",
      "<p>Every major token needs a strong visual identity. We led the design of the virtual currency ($ELIX). The client asked us to create an inverted counterpart to the $LITT token, the currency from their successful game CyberTitans.</p>",
      "<p>To achieve that, we created a visual concept inspired by Yin and Yang. We used vibrant pink tones and metallic textures. The final design communicates the pure quality of a high-budget AAA video game. This branding generated strong confidence among major investors and became a key visual asset within our Web3 marketing strategy.</p>",
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/elix-token.webp" alt="ELIXIR TOKEN — $ELIX token design" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/litt-elix.webp" alt="ELIXIR TOKEN — Visual comparison between $LITT and $ELIX" loading="lazy" /></figure>',
      "<h3>2. Launch video (editing and VFX)</h3>",
      "<p>The official announcement needed to impact the entire world in seconds. That is why we produced a spectacular cinematic trailer with fast, dynamic editing.</p>",
      "<p>We applied major 3D visual effects (VFX), integrating holographic graphics and deeply immersive digital environments. We showcased the token glowing with energy. This audiovisual piece triggered massive excitement across the market.</p>",
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/video-launch.webp" alt="ELIXIR TOKEN — Launch video visual" loading="lazy" /></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/t3IcVBkewrg?si=ZghOyWriAUOFA7PF" title="ELIXIR TOKEN launch video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/fuS1WG1g7iA?si=bxtiuHgDgvdxOACq" title="ELIXIR TOKEN campaign video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      "<h3>3. Motion graphics and social media assets</h3>",
      "<p>Before launching the $ELIX token, we created a strategic IDO video that visually explained the purchase phases and timeline. Social content today must capture attention instantly, so we designed a powerful and highly dynamic audiovisual package.</p>",
      "<p>We used fast-paced motion graphics to explain complex financial concepts in just a few seconds. We showcased the glowing token and premium-quality animations. That allowed us to keep the audience engaged, attentive, and deeply connected for months.</p>",
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/launchpad.webp" alt="ELIXIR TOKEN — Launchpad creative" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/ido-live.webp" alt="ELIXIR TOKEN — IDO is live creative" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/elixir-token/ido-closed.webp" alt="ELIXIR TOKEN — IDO is closed creative" loading="lazy" /></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/XNdB0Z5n6rQ?si=nt_6If0rQntFe-wz" title="ELIXIR TOKEN IDO video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/DSQek3qNhq8?si=kg3KIHqBHEgkpxwo" title="ELIXIR TOKEN motion graphics video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/FSkTdXPqlSY?si=0kchOtKsvXVA5ZRQ" title="ELIXIR TOKEN social asset video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      "<h3>4. Web3 marketing strategy</h3>",
      "<p>Strong visual design always needs a powerful sales engine behind it. We designed an ambitious Web3 marketing strategy and gamified the purchase process to improve retention.</p>",
      "<p>We created the major Season Pass campaign and distributed more than $1 million in real rewards. This large-scale activation secured record-breaking sales and built loyalty across a massive community.</p>",
      "<h2>Results that break the market</h2>",
      "<p>Success never comes down to luck alone. It requires structured Web3 marketing and flawless visual execution. Surpassing $14.2 million in sales is clear proof of the quality of our work.</p>"
    ].join("")
  },
  "chronosworlds": {
    esTextHtml: [
      "<p>Evolucionar un videojuego activo exige audacia visual. Este proceso requiere un excelente Diseño Web3. El equipo de Sphere Studios nos propuso un desafío inmenso. Querían dejar atrás su antiguo formato 2D. Su visión era crear un universo 3D inmersivo y mucho más ambicioso.</p>",
      "<p>La misión principal era muy clara. Debíamos reestructurar por completo su narrativa visual. El objetivo era enamorar a su comunidad y atraer a nuevos inversores.</p>",
      "<p>Tomamos el control de toda su identidad corporativa y su interfaz. Entregamos un nuevo logotipo, menús interactivos, vídeos virales y un documento de inversión. El impacto fue masivo. Alcanzamos más de 2 millones de visualizaciones orgánicas reales. Además, el proyecto logró levantar 50.000 dólares (USDC) en una venta privada. Su nuevo token ($SPHR) alcanzó una valoración total de 12 millones de dólares.</p>",
      "<p>Nuestra agencia de marketing digital hizo magia pura en este proyecto. Mira los detalles de nuestro trabajo a continuación.</p>",
      '<p><a href="https://pitch.com/public/cb74ae8c-6054-4e5f-9fa8-dc9f1bbc3310/d8388bd8-6dbc-4cec-bdb4-850e287dfefb" target="_blank" rel="noopener noreferrer">Ver el Pitch Deck de ChronosWorlds</a></p>',
      "<h2>Estrategia de Diseño Web3: Los Activos Entregados</h2>",
      "<p>Para liderar esta gran evolución, creamos recursos de máxima calidad visual. Rompimos los esquemas tradicionales con estos cuatro pilares:</p>",
      "<h3>1. Rebranding Total del Logotipo</h3>",
      "<p>Un cambio tecnológico profundo siempre requiere una nueva cara. Ejecutamos un rebranding integral para todo el proyecto. Descartamos el estilo 2D clásico de inmediato.</p>",
      "<p>Creamos un logotipo tridimensional, brillante y con muchísima fuerza. Esta nueva imagen proyecta una acción imparable. Capturó rápidamente la atención de todo el público gamer. Fue el primer gran paso de nuestro Diseño Web3.</p>",
      "<h3>2. Diseño del Pitch Deck Estratégico</h3>",
      '<p>Convencer a grandes inversores exige datos claros y mucho impacto visual. Por este motivo, creamos un Pitch Deck totalmente persuasivo y directo. <a href="https://pitch.com/public/cb74ae8c-6054-4e5f-9fa8-dc9f1bbc3310/d8388bd8-6dbc-4cec-bdb4-850e287dfefb" target="_blank" rel="noopener noreferrer">Ver el Pitch Deck</a>.</p>',
      "<p>Organizamos sus métricas y su visión de futuro. Ilustramos todo el potencial del nuevo entorno 3D. Explicamos al detalle la economía interna de la plataforma. Esta pieza clave transmitió mucha seguridad. Ayudó directamente a conseguir los 50.000 USDC de capital inicial en su venta privada.</p>",
      "<h3>3. Nueva UX/UI del Videojuego</h3>",
      "<p>La interfaz lo es todo para lograr retener al jugador. Rediseñamos completamente la experiencia de usuario (UX/UI).</p>",
      "<p>Como se aprecia en nuestros diseños, destacamos al viajero 3D en el centro de la pantalla. Organizamos el inventario, los niveles y el poder de combate en paneles laterales muy limpios. Todo resulta súper intuitivo para gestionar el equipo y las habilidades. Este nivel de Diseño Web3 potenció la inmersión del juego de forma brutal.</p>",
      "<h3>4. Vídeos, Motion e Imágenes (RRSS)</h3>",
      "<p>Para lograr millones de vistas, necesitas contenido altamente dinámico. Producimos vídeos espectaculares para Twitter, YouTube y Discord.</p>",
      "<p>Lanzamos animaciones mostrando los nuevos mundos generados y la fluidez del 3D. Todo este contenido generó un enorme entusiasmo en las redes. Superamos la barrera de los 2 millones de visualizaciones de forma puramente orgánica.</p>",
      "<h2>El Valor de una Gran Renovación Visual</h2>",
      "<p>La profunda transformación de ChronosWorlds demuestra el gran poder del buen Diseño Web3. Su salto al mundo 3D multiplicó su alcance social y su valor financiero de forma espectacular.</p>"
    ].join(""),
    esMediaHtml: [
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/bAkjumF6hXk?si=4t-uhNHSYIi9G4n-" title="ChronosWorlds — video 1" frameborder="0" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/oDVrybkl44k?si=QnjgElB3HInp0Dxi" title="ChronosWorlds — video 2" frameborder="0" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/chronosworlds/before-after.webp" alt="ChronosWorlds — Rebranding antes y después" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/chronosworlds/play.webp" alt="ChronosWorlds — Pantalla principal del juego" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/chronosworlds/inventory.webp" alt="ChronosWorlds — Pantalla de inventario y equipo" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/chronosworlds/pitch-cover.webp" alt="ChronosWorlds — Portada del Pitch Deck" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/chronosworlds/pitch-problem.webp" alt="ChronosWorlds — Slide del problema en el Pitch Deck" loading="lazy" /></figure>'
    ].join(""),
    enTextHtml: [
      "<p>Evolving an active video game demands visual boldness. This process requires excellent Web3 Design. The Sphere Studios team brought us a massive challenge. They wanted to leave their old 2D format behind and create an immersive, more ambitious 3D universe.</p>",
      "<p>Our main mission was crystal clear: fully restructure their visual narrative to win over the community and attract new investors.</p>",
      "<p>We took ownership of the entire corporate identity and interface. We delivered a new logo, interactive menus, viral videos, and an investment document. The impact was massive—over 2 million real organic views. The project also raised $50,000 USDC in a private sale, and the new token ($SPHR) reached a $12M valuation.</p>",
      "<p>Our digital marketing agency worked pure magic on this project. See the details of our work below.</p>",
      '<p><a href="https://pitch.com/public/cb74ae8c-6054-4e5f-9fa8-dc9f1bbc3310/d8388bd8-6dbc-4cec-bdb4-850e287dfefb" target="_blank" rel="noopener noreferrer">View the ChronosWorlds Pitch Deck</a></p>',
      "<h2>Web3 Design Strategy: Delivered Assets</h2>",
      "<p>To lead this major evolution, we produced top-quality resources. We broke traditional molds across four pillars:</p>",
      "<h3>1. Total Logo Rebrand</h3>",
      "<p>A deep technological shift needs a new face. We executed a full rebrand for the entire project, discarding the classic 2D style immediately.</p>",
      "<p>We created a powerful, brilliant 3D logotype that projects unstoppable momentum. It quickly captured the attention of the gaming audience and marked the first big step of our Web3 Design.</p>",
      "<h3>2. Strategic Pitch Deck Design</h3>",
      '<p>Winning over major investors requires clear data and high visual impact, so we built a fully persuasive, straight-to-the-point pitch deck. <a href="https://pitch.com/public/cb74ae8c-6054-4e5f-9fa8-dc9f1bbc3310/d8388bd8-6dbc-4cec-bdb4-850e287dfefb" target="_blank" rel="noopener noreferrer">View the Pitch Deck</a>.</p>',
      "<p>We organized their metrics and future vision, illustrated the potential of the 3D environment, and explained the platform's internal economy in detail. This key asset conveyed strong confidence and directly helped secure $50,000 USDC in the private sale.</p>",
      "<h3>3. New Game UX/UI</h3>",
      "<p>Interface is everything when it comes to player retention—so we redesigned the experience end-to-end.</p>",
      "<p>As seen in our designs, the 3D traveler takes center stage. We organized inventory, levels, and combat power into clean side panels. Everything is highly intuitive for managing gear and abilities—this level of Web3 Design dramatically boosted immersion.</p>",
      "<h3>4. Videos, Motion, and Images (Social)</h3>",
      "<p>To achieve millions of views, you need highly dynamic content. We produced standout videos for Twitter, YouTube, and Discord.</p>",
      "<p>We launched animations showing the new generated worlds and the fluidity of 3D. This content sparked huge excitement on social channels, surpassing 2 million organic views.</p>",
      "<h2>The Value of a Major Visual Overhaul</h2>",
      "<p>ChronosWorlds' transformation proves the power of strong Web3 Design. Their leap into 3D multiplied both social reach and financial value.</p>"
    ].join(""),
    enMediaHtml: [
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/bAkjumF6hXk?si=4t-uhNHSYIi9G4n-" title="ChronosWorlds — video 1" frameborder="0" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/oDVrybkl44k?si=QnjgElB3HInp0Dxi" title="ChronosWorlds — video 2" frameborder="0" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/chronosworlds/before-after.webp" alt="ChronosWorlds — Rebrand before and after" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/chronosworlds/play.webp" alt="ChronosWorlds — Main menu UI" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/chronosworlds/inventory.webp" alt="ChronosWorlds — Inventory and loadout UI" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/chronosworlds/pitch-cover.webp" alt="ChronosWorlds — Pitch Deck cover" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/chronosworlds/pitch-problem.webp" alt="ChronosWorlds — Pitch Deck problem slide" loading="lazy" /></figure>'
    ].join("")
  },
  "cybertitans-pulse-series": {
    esTextHtml: [
      "<p>El sector de los deportes electrónicos es gigante. Destacar aquí exige un excelente Marketing Web3. La empresa LitLab Games nos lanzó un reto brutal. Querían presentar la gran temporada de su juego CyberTitans. Este enorme torneo mundial se llamó Pulse Series.</p>",
      "<p>La competición fue masiva. Repartió increíbles premios para los jugadores. Como ves en nuestra galería, anunciamos recompensas de hasta 300.000 dólares. El proyecto necesitaba una imagen visual que transmitiera pura adrenalina.</p>",
      "<p>Nosotros tomamos la dirección de arte completa. Entregamos el logo, la web, los diseños y vídeos muy potentes. Logramos más de 1,4 millones de visualizaciones orgánicas reales.</p>",
      "<p>Nuestra agencia de marketing digital creó todo este motor gráfico. Descubre nuestro trabajo paso a paso.</p>",
      "<h2>Estrategia de Marketing Web3: Los Activos Creados</h2>",
      "<p>Rompimos las reglas clásicas del diseño. Creamos un paquete visual muy dinámico. Nos basamos en cuatro entregables clave:</p>",
      "<h3>1. Diseño de Logotipo Competitivo</h3>",
      "<p>Un gran torneo necesita un emblema muy fuerte. Nosotros creamos el logo oficial de las Pulse Series. Usamos formas geométricas muy afiladas.</p>",
      "<p>Aplicamos colores turquesas brillantes sobre fondos oscuros. Este fuerte contraste aporta mucha agresividad y presencia. Fue la gran base estética de nuestro Marketing Web3.</p>",
      "<h3>2. Diseño UX/UI del Videojuego</h3>",
      "<p>La adrenalina debe sentirse dentro de la partida. Por este motivo, adaptamos la interfaz de usuario (UX/UI) del juego.</p>",
      "<p>Como muestran las imágenes, destacamos los premios gigantes. Anunciamos la bolsa de 300.000 dólares y el gran premio de 5.000 dólares. Mostramos el tablero de juego en un formato isométrico. Todo el diseño web invitaba a competir de inmediato.</p>",
      "<h3>3. Vídeos, Motion e Imágenes (RRSS)</h3>",
      "<p>El contenido social debe ser muy explosivo. Entregamos decenas de recursos para sus redes sociales.</p>",
      "<p>Nuestras miniaturas anunciaban las fechas clave de noviembre a febrero. Creamos vídeos para confirmar a los «1000 Winners» del torneo. También integramos a los personajes 3D rompiendo los esquemas. Este material mantuvo a la comunidad jugando cada día.</p>",
      "<h3>4. Vídeo Manifiesto y Actualización (VFX)</h3>",
      "<p>Un torneo de este nivel necesita una gran presentación. Editamos un vídeo muy cercano y totalmente directo.</p>",
      "<p>Mostramos al equipo explicando la nueva temporada. Añadimos gráficos y efectos visuales (VFX) de altísima calidad. Cuidamos la iluminación y la corrección de color al máximo. Este gran vídeo sumó miles de visitas en pocas horas.</p>",
      "<h2>El Impacto de un Buen Ecosistema Visual</h2>",
      "<p>Este evento fue una victoria total para LitLab Games. Movilizar a miles de jugadores demuestra el gran poder del Marketing Web3. Una gran imagen gráfica siempre multiplica tus ingresos reales.</p>"
    ].join(""),
    esMediaHtml: [
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/za4N6K06wno?si=5abUViTHta2IIK5k" title="CYBERTITANS PULSE — Video 1" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/FbMu9-idxVg?si=rT2sXPz5El3jAM_c" title="CYBERTITANS PULSE — Video 2" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/Z3Qj1_-ROs0?si=L-l-ygiiTIEBfC77" title="CYBERTITANS PULSE — Video 3" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-pulse-series/pulse-hero.webp" alt="CYBERTITANS PULSE — Identidad y emblema del torneo" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-pulse-series/ladder-prizes.webp" alt="CYBERTITANS PULSE — New Ladder Prizes x2 $5,000" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-pulse-series/promo-lateral-banner.webp" alt="CYBERTITANS PULSE — Banner lateral promocional 300.000$" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-pulse-series/lobby-banner.webp" alt="CYBERTITANS PULSE — Banner de lobby nueva temporada" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-pulse-series/board-ads.webp" alt="CYBERTITANS PULSE — Tablero con publicidad de premios" loading="lazy" /></figure>'
    ].join(""),
    enTextHtml: [
      "<p>The esports sector is massive. Standing out requires excellent Web3 Marketing. LitLab Games challenged us to present the new season of their game CyberTitans—a global tournament called Pulse Series.</p>",
      "<p>The competition was huge, with incredible prizes for players. As shown in our gallery, we announced rewards up to $300,000. The project needed a visual identity that conveyed pure adrenaline.</p>",
      "<p>We took full creative direction—delivering the logo, website, bold designs, and high-impact videos. We achieved over 1.4 million real organic views.</p>",
      "<p>Our digital marketing agency built the entire visual engine. Explore our work step-by-step below.</p>",
      "<h2>Web3 Marketing Strategy: Created Assets</h2>",
      "<p>We broke classic design rules to craft a dynamic visual package around four key deliverables:</p>",
      "<h3>1. Competitive Logotype Design</h3>",
      "<p>A major tournament needs a strong emblem. We created the official logo for the Pulse Series—using sharp geometric forms.</p>",
      "<p>We applied bright turquoise over dark backgrounds for high contrast, aggression, and presence—forming the aesthetic foundation of our Web3 Marketing.</p>",
      "<h3>2. Game UX/UI Design</h3>",
      "<p>Adrenaline must be felt in-match, so we adapted the game's interface (UX/UI).</p>",
      "<p>As the visuals show, we highlighted the massive rewards—announcing a $300,000 prize pool and a $5,000 top prize. We presented the game board in an isometric format. The web design pushed players to compete immediately.</p>",
      "<h3>3. Videos, Motion, and Images (Social)</h3>",
      "<p>Social content must be explosive. We delivered dozens of assets for their channels.</p>",
      `<p>Our thumbnails announced key dates from November through February. We created videos to confirm the tournament's "1000 Winners." We also integrated 3D characters breaking the frame. This material kept the community engaged daily.</p>`,
      "<h3>4. Manifesto and Update Video (VFX)</h3>",
      "<p>A tournament of this scale needs a standout presentation—so we edited a direct, human manifesto video.</p>",
      "<p>We showed the team explaining the season and added high-grade VFX, careful lighting, and color. The video reached thousands of views within hours.</p>",
      "<h2>The Impact of a Strong Visual Ecosystem</h2>",
      "<p>This event was a total win for LitLab Games. Mobilizing thousands of players proves the power of Web3 Marketing. A strong visual identity always multiplies real revenue.</p>"
    ].join(""),
    enMediaHtml: [
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/za4N6K06wno?si=5abUViTHta2IIK5k" title="CYBERTITANS PULSE — Video 1" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/FbMu9-idxVg?si=rT2sXPz5El3jAM_c" title="CYBERTITANS PULSE — Video 2" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/Z3Qj1_-ROs0?si=L-l-ygiiTIEBfC77" title="CYBERTITANS PULSE — Video 3" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-pulse-series/pulse-hero.webp" alt="CYBERTITANS PULSE — Tournament identity and emblem" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-pulse-series/ladder-prizes.webp" alt="CYBERTITANS PULSE — New Ladder Prizes x2 $5,000" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-pulse-series/promo-lateral-banner.webp" alt="CYBERTITANS PULSE — Lateral promo banner 300,000$" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-pulse-series/lobby-banner.webp" alt="CYBERTITANS PULSE — Lobby banner new season" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-pulse-series/board-ads.webp" alt="CYBERTITANS PULSE — Board with prizes ads" loading="lazy" /></figure>'
    ].join("")
  },
  "cybertitans-clash-impacto-brutal-y-evolucion-web3": {
    esTextHtml: [
      '<p>Updating a video game demands strong visual impact. Presenting a new game mode is a major challenge—one that requires a solid Web3 Marketing strategy. LitLab Games entrusted our agency once again to launch their new update. The "Clash" mode was built to revolutionize gameplay and keep the world in constant evolution.</p>',
      "<p>Our main objective was crystal clear: generate massive anticipation ahead of the official launch and keep the entire player community engaged.</p>",
      "<p>We took creative control of this update. We designed an aggressive, tech‑forward visual environment, delivered the official campaign website, and created in‑game artwork and visual patch‑note announcements. The impact was massive: we surpassed 1.5 million organic views, and the update kept players highly active and invested in the ecosystem.</p>",
      "<p>Our agency built the entire visual platform. Below, we detail each deliverable shipped to the developer.</p>",
      "<h2>Web3 Marketing Strategy: Created Assets</h2>",
      "<p>We broke classic digital design rules to craft a direct, highly effective visual package—focused strictly on three key deliverables:</p>",
      "<h3>1. Landing Page and Interactive Web Environment</h3>",
      "<p>We developed a spectacular landing page. The new logo and its fire icon take center stage in the header. We used vibrant orange and yellow tones over deep purple and dark blue backgrounds.</p>",
      "<p>We highlighted the new mode's key messages: the fast 3‑player matches and the prize multiplier system. The site loaded fast and guided users straight into play—becoming the core of our Web3 Marketing.</p>",
      "<h3>2. In‑Game Banners and Images</h3>",
      "<p>The excitement of the update must be felt the moment the game opens, so we adapted CyberTitans' internal visual surfaces.</p>",
      "<p>We designed high‑impact static banners and exclusive images for the main game menus. This visual system kept the community alert and interacting as soon as they entered—seamlessly integrated to boost participation in the new challenges and events.</p>",
      "<h3>3. Visual Patch Notes and Announcements</h3>",
      "<p>Informing players requires clarity and style. We designed all graphical announcements for the patch notes.</p>",
      "<p>We created strong visuals to accompany developer updates, explaining new mechanics in a direct, highly visual way. These assets educated the entire community quickly—making the Clash mode instantly understandable and fueling organic virality.</p>",
      "<h2>The Impact of a Great Visual Campaign</h2>",
      "<p>This update was a decisive win for LitLab Games. Mobilizing thousands of players proves the power of Web3 Marketing. Impeccable visual communication consistently improves real user retention—helping reinforce the game's leadership in a competitive market.</p>"
    ].join(""),
    esMediaHtml: [
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/BsNW-a8h96Q?si=khApu-RFQsst2eJC" title="CYBERTITANS CLASH — Tráiler de actualización" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-clash/clash-lobby-banner.webp" alt="CYBERTITANS CLASH — Banner de lobby" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-clash/clash-lateral-banner.webp" alt="CYBERTITANS CLASH — Banner lateral" loading="lazy" /></figure>'
    ].join(""),
    enTextHtml: [
      '<p>Updating a video game demands strong visual impact. Presenting a new game mode is a major challenge—one that requires a solid Web3 Marketing strategy. LitLab Games entrusted our agency once again to launch their new update. The "Clash" mode was built to revolutionize gameplay and keep the world in constant evolution.</p>',
      "<p>Our main objective was crystal clear: generate massive anticipation ahead of the official launch and keep the entire player community engaged.</p>",
      "<p>We took creative control of this update. We designed an aggressive, tech‑forward visual environment, delivered the official campaign website, and created in‑game artwork and visual patch‑note announcements. The impact was massive: we surpassed 1.5 million organic views, and the update kept players highly active and invested in the ecosystem.</p>",
      "<p>Our agency built the entire visual platform. Below, we detail each deliverable shipped to the developer.</p>",
      "<h2>Web3 Marketing Strategy: Created Assets</h2>",
      "<p>We broke classic digital design rules to craft a direct, highly effective visual package—focused strictly on three key deliverables:</p>",
      "<h3>1. Landing Page and Interactive Web Environment</h3>",
      "<p>We developed a spectacular landing page. The new logo and its fire icon take center stage in the header. We used vibrant orange and yellow tones over deep purple and dark blue backgrounds.</p>",
      "<p>We highlighted the new mode's key messages: the fast 3‑player matches and the prize multiplier system. The site loaded fast and guided users straight into play—becoming the core of our Web3 Marketing.</p>",
      "<h3>2. In‑Game Banners and Images</h3>",
      "<p>The excitement of the update must be felt the moment the game opens, so we adapted CyberTitans' internal visual surfaces.</p>",
      "<p>We designed high‑impact static banners and exclusive images for the main game menus. This visual system kept the community alert and interacting as soon as they entered—seamlessly integrated to boost participation in the new challenges and events.</p>",
      "<h3>3. Visual Patch Notes and Announcements</h3>",
      "<p>Informing players requires clarity and style. We designed all graphical announcements for the patch notes.</p>",
      "<p>We created strong visuals to accompany developer updates, explaining new mechanics in a direct, highly visual way. These assets educated the entire community quickly—making the Clash mode instantly understandable and fueling organic virality.</p>",
      "<h2>The Impact of a Great Visual Campaign</h2>",
      "<p>This update was a decisive win for LitLab Games. Mobilizing thousands of players proves the power of Web3 Marketing. Impeccable visual communication consistently improves real user retention—helping reinforce the game's leadership in a competitive market.</p>"
    ].join(""),
    enMediaHtml: [
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/BsNW-a8h96Q?si=khApu-RFQsst2eJC" title="CYBERTITANS CLASH — Tráiler de actualización" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-clash/clash-lobby-banner.webp" alt="CYBERTITANS CLASH — Banner de lobby" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/cybertitans-clash/clash-lateral-banner.webp" alt="CYBERTITANS CLASH — Banner lateral" loading="lazy" /></figure>'
    ].join("")
  },
  "robokiden-token": {
    esTextHtml: [
      "<p>Lanzar un proyecto digital hoy exige más que una buena idea. Necesitas una estructura de conversión muy efectiva. Esto resulta fundamental en una estrategia de Marketing Web3.</p>",
      "<p>El equipo de RoboKiden confió en nosotros. Ellos crearon un emocionante shooter multijugador. Cuentan con el respaldo de empresas como Square Enix, la Fundación Solana y Shima Capital. Nos encargaron el lanzamiento global de su token nativo ($KIDEN). Este proyecto se desarrolló en la red Avalanche. Sabíamos que las tácticas de siempre no iban a funcionar.</p>",
      "<p>Nuestra misión fue muy clara desde el principio. Queríamos generar un gran interés antes del lanzamiento. Buscábamos mantener la atención constante en las redes sociales. Por último, debíamos convertir ese interés en ventas directas.</p>",
      "<p>A continuación, te mostramos nuestra metodología paso a paso. Nuestra agencia de marketing digital implementó un plan estratégico completo. Usamos branding, diseño UX/UI y gran contenido audiovisual. Así logramos superar el millón de dólares en ventas.</p>",
      "<h2>Estrategia de Marketing Web3: Activos Creados</h2>",
      "<p>Generar ventas millonarias exige un gran Marketing Web3. A continuación, detallamos el trabajo ejecutado de forma directa. Estos son los entregables de nuestra agencia de marketing digital, basados en el despliegue visual de la campaña:</p>",
      "<h3>1. Estrategia de Marketing Web3</h3>",
      "<p>Ejecutamos el embudo de captación de forma impecable. El entregable clave fue la estrategia visual de los «RoboKiden Misfits». Esta fue una colección de 999 NFTs totalmente gratuitos. Entregamos la estructura visual para promocionar estos avatares. Esto funcionó como el motor de nuestro Marketing Web3. Aseguramos la fidelidad de la comunidad hasta cerrar la venta.</p>",
      "<h3>2. Diseño del Token en el Marketing Web3</h3>",
      "<p>Creamos el branding y la identidad visual de la moneda $KIDEN. Entregamos el desarrollo y modelado gráfico del activo digital. Su diseño transmite una gran confianza financiera a los inversores. Además, encaja perfecto con los personajes de un videojuego AAA. Este juego cuenta con el gran respaldo de la red Avalanche. Estará disponible en consolas y PC. Conoce más sobre nuestros servicios de branding.</p>",
      "<h3>3. Vídeos y Motion Graphics (RRSS)</h3>",
      "<p>Producimos un ecosistema audiovisual completo para cada plataforma. El trabajo entregado incluyó la edición del Gameplay Trailer oficial. También entregamos piezas dinámicas de motion graphics. Destacan creatividades enfocadas totalmente en la urgencia y la conversión. Creamos diseños de alto impacto visual como «Season Pass» y «$KIDEN Burn». Estas piezas dominaron las redes sociales.</p>",
      "<h3>4. Landing Page de Alta Conversión</h3>",
      "<p>Desarrollamos la página web oficial para el evento de venta. Entregamos una interfaz con estética premium en modo oscuro. Este diseño de experiencia de usuario integró contenedores multimedia nativos. Así logramos retener a los visitantes en la web. Además, programamos un flujo de ventas en cuatro fases. El proceso empezó con los inversores Tier Holders y terminó con la ronda pública. Esto aseguró el éxito tecnológico de la campaña.</p>",
      "<h2>Resultados Reales: El Poder del Alto Rendimiento</h2>",
      "<p>Unir creatividad, tecnología y psicología fue un éxito total. Logramos una gran meta en el mundo digital. Generamos más de 1,15 millones de dólares en ventas.</p>",
      "<p>El caso de RoboKiden deja una gran lección. En la era digital, no basta con estar online. Tu marca debe ser muy fácil de recordar. El buen Marketing Web3 ayuda a lograrlo.</p>"
    ].join(""),
    esMediaHtml: [
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/RkqxhkuitMA?si=6l1w1YgJRZSF1lDF" title="ROBOKIDEN — Video 1" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/QUyiRiKI4U4?si=nNYea91flGpvXf5r" title="ROBOKIDEN — Video 2" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/EQXJD-CVhqc?si=Vxn7ysCfd9YDvKlF" title="ROBOKIDEN — Video 3" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/E4WACjOCVxo?si=Da7pZVBFr0ZgBWmo" title="ROBOKIDEN — Video 4" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/robokiden-token/misfits-art.webp" alt="RoboKiden Misfits — Arte de colección" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/robokiden-token/misfits-post.webp" alt="RoboKiden Misfits — Creatividad de anuncio" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/robokiden-token/misfits-grid.webp" alt="RoboKiden Misfits — Galería de avatares" loading="lazy" /></figure>'
    ].join(""),
    enTextHtml: [
      "<p>Launching a digital project today takes more than a good idea—you need a highly effective conversion structure. That is fundamental in a Web3 Marketing strategy.</p>",
      "<p>The RoboKiden team trusted us with their global launch. They created an exciting multiplayer shooter backed by Square Enix, the Solana Foundation, and Shima Capital. They tasked us with launching their native token ($KIDEN) on the Avalanche network. We knew the usual tactics wouldn't work.</p>",
      "<p>Our mission was crystal clear from the start: generate strong pre‑launch interest, keep attention high on social media, and convert that interest into direct sales.</p>",
      "<p>Below is our step‑by‑step methodology. Our digital marketing agency implemented a complete strategic plan—using branding, UX/UI design, and premium audiovisual content—to surpass one million dollars in sales.</p>",
      "<h2>Web3 Marketing Strategy: Created Assets</h2>",
      "<p>Generating million‑dollar sales demands strong Web3 Marketing. Here is the work executed directly—our agency's deliverables based on the visual rollout of the campaign:</p>",
      "<h3>1. Web3 Marketing Strategy</h3>",
      '<p>We executed the acquisition funnel flawlessly. The key deliverable was the visual strategy for "RoboKiden Misfits," a collection of 999 completely free NFTs. We delivered the visual system to promote these avatars—turning them into the engine of our Web3 Marketing and securing community loyalty through to conversion.</p>',
      "<h3>2. Token Design within Web3 Marketing</h3>",
      "<p>We created the branding and visual identity for the $KIDEN token, delivering design and graphical modeling of the digital asset. Its look conveys strong financial confidence to investors while fitting perfectly with AAA‑level game characters. Backed by Avalanche, the game targets consoles and PC. Learn more about our branding services.</p>",
      "<h3>3. Videos and Motion Graphics (Social)</h3>",
      '<p>We produced a complete audiovisual ecosystem for every platform. The deliverables included editing of the official Gameplay Trailer and dynamic motion graphics focused on urgency and conversion. High‑impact creatives such as "Season Pass" and "$KIDEN Burn" dominated social channels.</p>',
      "<h3>4. High‑Converting Landing Page</h3>",
      "<p>We built the event's official website with a premium dark aesthetic and native media containers to retain visitors. We also implemented a four‑phase sales flow—from Tier Holders to the public round—ensuring the campaign's technical success.</p>",
      "<h2>Real Results: The Power of High Performance</h2>",
      "<p>Combining creativity, technology, and psychology was a total success. We achieved a major milestone in the digital world—generating more than $1.15 million in sales.</p>",
      "<p>The RoboKiden case delivers a clear lesson: in the digital era, being online is not enough. Your brand must be truly memorable. Strong Web3 Marketing makes it happen.</p>"
    ].join(""),
    enMediaHtml: [
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/RkqxhkuitMA?si=6l1w1YgJRZSF1lDF" title="ROBOKIDEN — Video 1" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/QUyiRiKI4U4?si=nNYea91flGpvXf5r" title="ROBOKIDEN — Video 2" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/EQXJD-CVhqc?si=Vxn7ysCfd9YDvKlF" title="ROBOKIDEN — Video 3" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-embed"><iframe class="wp-embed" src="https://www.youtube.com/embed/E4WACjOCVxo?si=Da7pZVBFr0ZgBWmo" title="ROBOKIDEN — Video 4" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/robokiden-token/misfits-art.webp" alt="RoboKiden Misfits — Collection art" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/robokiden-token/misfits-post.webp" alt="RoboKiden Misfits — Announcement creative" loading="lazy" /></figure>',
      '<figure class="wp-block-image"><img src="/assets/cases/robokiden-token/misfits-grid.webp" alt="RoboKiden Misfits — Avatar gallery" loading="lazy" /></figure>'
    ].join("")
  }
};
const splitWpContentIntoTextAndMedia = (html) => {
  if (typeof window === "undefined") return { textHtml: html, mediaHtml: "" };
  const doc = new DOMParser().parseFromString(html, "text/html");
  const mediaSelectors = [
    "iframe",
    "video",
    "img",
    "figure",
    ".wp-block-image",
    ".wp-block-embed",
    ".wp-block-video",
    ".wp-block-gallery",
    ".blocks-gallery-grid"
  ];
  const mediaEls = Array.from(doc.body.querySelectorAll(mediaSelectors.join(",")));
  const mediaHtml = mediaEls.map((el) => {
    const wrapper = el.closest(
      "figure, .wp-block-embed, .wp-block-image, .wp-block-video, .wp-block-gallery, .blocks-gallery-grid"
    );
    return (wrapper || el).outerHTML;
  }).filter((value, index, arr) => index === 0 ? true : value !== arr[index - 1]).join("\n");
  mediaEls.forEach((el) => {
    const wrapper = el.closest(
      "figure, .wp-block-embed, .wp-block-image, .wp-block-video, .wp-block-gallery, .blocks-gallery-grid"
    );
    (wrapper || el).remove();
  });
  Array.from(doc.body.querySelectorAll("p, h2, h3, h4, li")).filter((node) => !(node.textContent || "").trim() && node.children.length === 0).forEach((node) => node.remove());
  return { textHtml: doc.body.innerHTML, mediaHtml };
};
const sanitizeWpHtml = (html) => {
  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe", "video", "source", "picture"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "loading",
      "referrerpolicy",
      "controls",
      "playsinline",
      "muted",
      "loop",
      "autoplay",
      "poster",
      "preload",
      "src",
      "srcset",
      "srcSet",
      "type",
      "title",
      "width",
      "height"
    ]
  });
  if (typeof window === "undefined") return clean;
  const doc = new DOMParser().parseFromString(clean, "text/html");
  doc.querySelectorAll("a[target='_blank']").forEach((a) => {
    const rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
    if (!rel.includes("noopener")) rel.push("noopener");
    if (!rel.includes("noreferrer")) rel.push("noreferrer");
    a.setAttribute("rel", rel.join(" "));
  });
  const allowedHosts = /* @__PURE__ */ new Set([
    "www.youtube.com",
    "youtube.com",
    "player.vimeo.com",
    "vimeo.com",
    "kinetora.tech"
  ]);
  doc.querySelectorAll("iframe").forEach((iframe) => {
    const src = iframe.getAttribute("src") || "";
    try {
      const url = new URL(src, window.location.origin);
      if (!allowedHosts.has(url.hostname)) {
        iframe.remove();
        return;
      }
      iframe.setAttribute("loading", "lazy");
      iframe.classList.add("wp-embed");
    } catch {
      iframe.remove();
    }
  });
  doc.querySelectorAll("video").forEach((video) => {
    video.setAttribute("controls", "true");
    video.setAttribute("playsinline", "true");
    video.classList.add("wp-video");
  });
  return doc.body.innerHTML;
};
const CaseStudyPost = () => {
  const { lang } = useI18n();
  const { slug } = useParams();
  const navigate = useNavigate();
  const currentCase = React__default.useMemo(() => caseStudies.find((item) => item.slug === slug), [slug]);
  const otherCases = React__default.useMemo(() => caseStudies.filter((item) => item.slug !== slug), [slug]);
  const loading = false;
  const ui = lang === "es" ? {
    back: "Volver a casos",
    notFound: "No encontramos este caso.",
    readyTitle: "¿Listo para un caso así?",
    readyBody: "Cuéntanos qué estás lanzando y te proponemos el mejor enfoque en menos de 24h.",
    moreResults: "Más resultados",
    viewAll: "Ver todos",
    readMore: "Leer más",
    textCol: "Lo que hicimos",
    mediaCol: "Algunos entregables",
    swipe: "Desliza para ver más",
    letsTalk: "¿Contactamos?"
  } : {
    back: "Back to cases",
    notFound: "We couldn't find this case study.",
    readyTitle: "Want results like this?",
    readyBody: "Tell us what you're launching and we'll propose the best approach within 24h.",
    moreResults: "More results",
    viewAll: "View all",
    readMore: "Read more",
    textCol: "What we did",
    mediaCol: "Some deliverables",
    swipe: "Swipe to see more",
    letsTalk: "Let's talk"
  };
  const caseTag = React__default.useMemo(() => {
    if (!currentCase) return lang === "es" ? "Caso de éxito" : "Case study";
    return lang === "es" ? currentCase.highlightFallback : currentCase.highlightFallbackEn ?? currentCase.highlightFallback;
  }, [currentCase, lang]);
  const title = React__default.useMemo(() => {
    if (!currentCase) return "";
    return lang === "es" ? currentCase.title : currentCase.titleEn ?? currentCase.title;
  }, [currentCase, lang]);
  const cover = currentCase == null ? void 0 : currentCase.coverImage;
  const coverAlt = lang === "es" ? currentCase == null ? void 0 : currentCase.coverAlt : (currentCase == null ? void 0 : currentCase.coverAltEn) ?? (currentCase == null ? void 0 : currentCase.coverAlt);
  const { textHtml, mediaHtml } = React__default.useMemo(() => {
    if (!currentCase) {
      return { textHtml: "", mediaHtml: "" };
    }
    const overrides = caseContentOverrides[currentCase.slug] || {};
    const rawText = lang === "es" ? overrides.esTextHtml ?? null : overrides.enTextHtml ?? overrides.esTextHtml ?? null;
    if (rawText) {
      const safe = sanitizeWpHtml(rawText);
      const split = splitWpContentIntoTextAndMedia(safe);
      const extraMedia = lang === "es" ? overrides.esMediaHtml : overrides.enMediaHtml ?? overrides.esMediaHtml;
      const mediaCombined = [split.mediaHtml, extraMedia].filter(Boolean).join("\n");
      return { textHtml: split.textHtml, mediaHtml: mediaCombined };
    }
    const fallbackText = lang === "es" ? `<p>Resumen del proyecto: ${currentCase.title}. Diseñamos e implementamos el sistema visual, la narrativa y los entregables principales para acelerar crecimiento.</p>` : `<p>Project summary: ${currentCase.titleEn ?? currentCase.title}. We designed and implemented the visual system, narrative and key deliverables to accelerate growth.</p>`;
    return { textHtml: fallbackText, mediaHtml: "" };
  }, [currentCase, lang]);
  React__default.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, [slug]);
  const seoDefaults = getSeoDefaults(lang);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = `${origin}/casos/${slug ?? ""}`;
  const description = lang === "es" ? (currentCase == null ? void 0 : currentCase.summaryFallback) || ui.readyBody : (currentCase == null ? void 0 : currentCase.summaryFallbackEn) || (currentCase == null ? void 0 : currentCase.summaryFallback) || ui.readyBody;
  const keywords = [
    ...seoDefaults.keywords,
    ...lang === "es" ? ["caso de éxito", "portafolio", "resultados"] : ["case study", "portfolio", "results"]
  ];
  const ogLocale = lang === "es" ? "es_ES" : "en_US";
  const ogLocaleAlternate = lang === "es" ? ["en_US"] : ["es_ES"];
  const alternates = [{ hrefLang: "x-default", href: canonical }];
  const absoluteImage = cover ? origin ? new URL(cover, origin).href : cover : seoDefaults.shareImage;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": title || seoDefaults.title,
        "description": description,
        "image": absoluteImage,
        "inLanguage": lang === "es" ? "es-ES" : "en-US",
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
        "publisher": {
          "@type": "Organization",
          "name": seoDefaults.siteName,
          "logo": {
            "@type": "ImageObject",
            "url": origin ? new URL("/Logotipo.svg", origin).href : "/Logotipo.svg"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": lang === "es" ? "Inicio" : "Home", "item": origin ? new URL("/", origin).href : "/" },
          { "@type": "ListItem", "position": 2, "name": lang === "es" ? "Casos" : "Cases", "item": origin ? new URL("/casos", origin).href : "/casos" },
          { "@type": "ListItem", "position": 3, "name": title || (lang === "es" ? "Caso" : "Case"), "item": canonical }
        ]
      }
    ]
  };
  const textWrapRef = React__default.useRef(null);
  const mediaWrapRef = React__default.useRef(null);
  const [stickySide, setStickySide] = React__default.useState(null);
  React__default.useEffect(() => {
    const updateStickySide = () => {
      var _a, _b;
      if (window.innerWidth < 1024) {
        setStickySide(null);
        return;
      }
      const textHeight = ((_a = textWrapRef.current) == null ? void 0 : _a.offsetHeight) || 0;
      const mediaHeight = ((_b = mediaWrapRef.current) == null ? void 0 : _b.offsetHeight) || 0;
      if (textHeight > 0 && mediaHeight > 0) {
        if (textHeight < mediaHeight - 60) {
          setStickySide("left");
        } else if (mediaHeight < textHeight - 60) {
          setStickySide("right");
        } else {
          setStickySide(null);
        }
      }
    };
    const observer = new ResizeObserver(updateStickySide);
    if (textWrapRef.current) observer.observe(textWrapRef.current);
    if (mediaWrapRef.current) observer.observe(mediaWrapRef.current);
    window.addEventListener("resize", updateStickySide);
    const timer = setTimeout(updateStickySide, 300);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStickySide);
      clearTimeout(timer);
    };
  }, [slug, lang, textHtml, mediaHtml]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: title ? `${title} — ${seoDefaults.siteName}` : seoDefaults.title,
        description,
        keywords,
        image: cover || seoDefaults.shareImage,
        canonical,
        locale: ogLocale,
        localesAlternate: ogLocaleAlternate,
        alternates,
        twitterSite: "@Kinetora_Studio",
        twitterCreator: "@Kinetora_Studio",
        siteName: seoDefaults.siteName,
        ogType: "article",
        twitterCard: "summary_large_image",
        robots: "index,follow",
        jsonLd
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { id: "main-content", role: "main", className: "pt-[68px] md:pt-[88px]", children: /* @__PURE__ */ jsxs("section", { className: "relative kin-no-overflow", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-28 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#B454FF]/10 blur-[120px]" }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-44 -left-44 h-[32rem] w-[32rem] rounded-full bg-[#33C3F0]/[0.07] blur-[140px]" }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-7", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-4", children: /* @__PURE__ */ jsx(Link, { to: "/casos", className: "inline-flex", children: /* @__PURE__ */ jsx(PremiumButton, { variant: "glass", size: "sm", className: "h-11 rounded-full", children: ui.back.toUpperCase() }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80", children: caseTag }) }),
          /* @__PURE__ */ jsx(Reveal, { as: "h1", className: "mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase", children: title })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-[2.25rem] border border-white/10 bg-white/[0.03] overflow-hidden shadow-[0_24px_110px_rgba(0,0,0,0.35)]", children: /* @__PURE__ */ jsx("div", { className: "aspect-[16/9] bg-white/[0.04]", children: cover ? /* @__PURE__ */ jsx(Reveal, { as: "div", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: cover,
            alt: coverAlt || "",
            width: "1920",
            height: "1080",
            loading: "eager",
            decoding: "sync",
            fetchPriority: "high",
            sizes: "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw",
            onError: (e) => {
              e.currentTarget.src = "/assets/placeholder.svg";
            },
            className: "h-full w-full object-cover transition-all duration-700 rounded-[inherit] transform-gpu"
          }
        ) }) : null }) }),
        !currentCase ? /* @__PURE__ */ jsx("div", { className: "rounded-[2rem] border border-white/10 bg-white/[0.04] p-7", children: /* @__PURE__ */ jsx("p", { className: "text-[#F5F5F5]/80 font-bold", children: ui.notFound }) }) : /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx(
            CaseStudyColumns,
            {
              loading,
              textHtml,
              mediaHtml,
              stickySide,
              textLabel: ui.textCol,
              mediaLabel: ui.mediaCol,
              textWrapRef,
              mediaWrapRef
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60", children: ui.readyTitle }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm sm:text-base text-[#F5F5F5]/75 leading-relaxed max-w-2xl", children: ui.readyBody }),
            /* @__PURE__ */ jsx(Link, { to: "/#contacto", className: "inline-flex mt-5", children: /* @__PURE__ */ jsx(PremiumButton, { variant: "primary", size: "md", className: "w-full sm:w-auto", children: ui.letsTalk.toUpperCase() }) })
          ] }),
          /* @__PURE__ */ jsx(
            CaseStudyMoreResults,
            {
              cases: otherCases,
              lang,
              moreResultsLabel: ui.moreResults,
              viewAllLabel: ui.viewAll,
              readMoreLabel: ui.readMore,
              swipeLabel: ui.swipe,
              onNavigate: (targetSlug) => navigate(`/casos/${targetSlug}`)
            }
          )
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  CaseStudyPost as default
};
