"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PremiumButton from "@/components/PremiumButton";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { caseStudies } from "@/data/caseStudies";

type WPListPost = {
  slug?: string;
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }> ;
  };
};

function stripHtml(html: string) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

function extractHito(text: string) {
  const t = text.replace(/\s+/g, " ");
  const m =
    t.match(/(\+?\d[\d.,]*\s?(?:M€|M\$|M|K€|K\$|K|€|\$|%))/i) ||
    t.match(/(\b\d{2,}\b)(?=\s?(?:ganadores|winners|participantes|users|usuarios))/i);
  return m ? m[0].trim() : null;
}

function extractMetric(html: string): { label: string; value: string } | null {
  const text = stripHtml(html).toLowerCase();
  // Captura valores monetarios o porcentajes con sufijos K/M/€/$/%
  const valueMatch =
    html.match(/[\+\-]?\s?\d[\d.,]*\s?(?:m€|m\$|m|k€|k\$|k|€|\$|%)/i) ||
    html.match(/\b\d{2,}\s?(?:usuarios|users|participantes|winners|views|impresiones|impressions)\b/i);
  if (!valueMatch) return null;
  const rawValue = valueMatch[0].trim();
  // Determina etiqueta en base a keywords del texto
  let label = "Hito";
  if (/(venta|ventas|sales)/i.test(text)) label = "Ventas realizadas";
  else if (/(impacto|org[aá]nico|organic|reach|views|impresiones|impressions|alcance)/i.test(text)) label = "Impacto orgánico";
  else if (/(recaud|inversi|raised|funding)/i.test(text)) label = "Recaudación";
  return { label, value: rawValue };
}

const Portfolio = () => {
  const [meta, setMeta] = React.useState<Record<string, { img?: string; alt?: string; excerpt?: string; hito?: string; metricLabel?: string; metricValue?: string }>>({});
  const metaReady = Object.keys(meta).length > 0;

  React.useEffect(() => {
    let cancelled = false;
    Promise.all(
      caseStudies.map(async (cs) => {
        const url = new URL("/wp-json/wp/v2/posts", cs.sourceUrl);
        url.searchParams.set("slug", cs.slug);
        url.searchParams.set("_embed", "1");
        url.searchParams.set("_fields", "slug,excerpt,content,_embedded");
        const res = await fetch(url.toString());
        const arr = (await res.json()) as WPListPost[];
        const p = arr?.[0];
        const featured = p?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        const alt = p?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text;
        const excerptText = p?.excerpt?.rendered ? stripHtml(p.excerpt.rendered) : "";
        const metric = p?.content?.rendered ? extractMetric(p.content.rendered) : null;
        return {
          slug: cs.slug,
          img: featured,
          alt,
          excerpt: excerptText,
          hito: excerptText ? extractHito(excerptText) ?? undefined : undefined,
          metricLabel: metric?.label,
          metricValue: metric?.value,
        };
      })
    ).then((items) => {
      if (cancelled) return;
      const next: Record<string, { img?: string; alt?: string; excerpt?: string; hito?: string; metricLabel?: string; metricValue?: string }> = {};
      items.forEach((it) => {
        next[it.slug] = { img: it.img, alt: it.alt, excerpt: it.excerpt, hito: it.hito, metricLabel: it.metricLabel, metricValue: it.metricValue };
      });
      setMeta(next);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="casos"
      className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] scroll-mt-24 md:scroll-mt-28 relative overflow-hidden"
    >
      {/* ambient glow (soft, no hard cuts) */}
      <div className="pointer-events-none absolute -top-32 -right-28 h-96 w-96 rounded-full bg-[#B454FF]/10 blur-[110px] z-0" />
      <div className="pointer-events-none absolute -bottom-36 -left-28 h-[26rem] w-[26rem] rounded-full bg-[#B454FF]/6 blur-[120px] z-0" />
      {/* edge fades to blend with adjacent sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,#0D0D0D,transparent)] z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,#0D0D0D,transparent)] z-[1]" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
              Casos de éxito
            </div>
            <h2 className="mt-5 text-3xl md:text-5xl font-black text-[#F5F5F5] tracking-tighter uppercase">
              Diseño creado para
              <span className="text-[#B454FF]"> convertir</span>.
            </h2>
            <p className="mt-3 text-[#F5F5F5]/70 text-sm sm:text-base max-w-2xl leading-relaxed">
              Proyectos reales con impacto medible. Desliza para ver más y entra al post para conocer el proceso.
            </p>
          </div>

          <Link to="/casos" className="shrink-0">
            <PremiumButton variant="glass" size="md" className="w-full sm:w-auto">
              VER TODOS
            </PremiumButton>
          </Link>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {caseStudies.map((cs) => (
              <CarouselItem
                key={cs.slug}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-full"
                >
                  {(() => {
                    const m = meta[cs.slug];
                    const cover = cs.coverImage || m?.img;
                    const excerpt = m?.excerpt || cs.summaryFallback;
                    const hito = m?.hito || cs.highlightFallback;
                    const alt = cs.coverAlt || m?.alt;
                    const metricLabel = cs.metricLabel ?? m?.metricLabel;
                    const metricValue = cs.metricValue ?? m?.metricValue;
                    return (
                      <div
                        className="group block h-full rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-colors transition-transform will-change-transform hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#B454FF]/40 focus-within:ring-offset-0"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          {!metaReady ? (
                            <Skeleton className="w-full h-full rounded-none" />
                          ) : (
                            <img
                              src={cover}
                              alt={alt}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/placeholder.svg"; }}
                              className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                          )}
                        </div>
                        <div className="p-6 sm:p-7 flex-1 flex flex-col">
                          {/* Tema (hito) como pill premium */}
                          <div className="inline-flex items-center justify-center self-center rounded-full border border-[#B454FF]/30 bg-[#B454FF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-[#B454FF]">
                            {hito}
                          </div>
                          {/* Titular */}
                          <h3 className="mt-3 mb-2 sm:mb-3 text-lg sm:text-xl font-black tracking-tight title-rows-3 title-rows-3-min">
                            {cs.title}
                          </h3>
                          {/* Footer: métrica + CTA juntos y alineados al fondo */}
                          <div className="mt-auto pt-4 sm:pt-5">
                            <div className="metric-block-min mb-2">
                              {metaReady ? (
                                metricLabel && metricValue ? (
                                  <>
                                    <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60">
                                      {metricLabel}
                                    </div>
                                    <div className="mt-1 text-2xl sm:text-3xl font-black text-[#B454FF]">
                                      {metricValue}
                                    </div>
                                  </>
                                ) : null
                              ) : (
                                <div className="space-y-2">
                                  <Skeleton className="h-3 w-24" />
                                  <Skeleton className="h-7 w-36" />
                                </div>
                              )}
                            </div>
                            <PremiumButton
                              variant="glass"
                              size="sm"
                              className="w-full h-11 rounded-full border-white/15 bg-white/5 hover:bg-white/10"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(cs.sourceUrl, "_blank", "noopener,noreferrer");
                              }}
                              aria-label={`Leer más: ${cs.title}`}
                            >
                              LEER MÁS
                            </PremiumButton>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className="hidden sm:inline-flex -left-4 md:-left-6 h-11 w-11 rounded-full border border-white/10 bg-[#0D0D0D]/70 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20"
          />
          <CarouselNext
            className="hidden sm:inline-flex -right-4 md:-right-6 h-11 w-11 rounded-full border border-white/10 bg-[#0D0D0D]/70 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20"
          />
        </Carousel>

        <div className="mt-6 sm:hidden">
          <p className="text-center text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/55">
            Desliza para ver más
          </p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;