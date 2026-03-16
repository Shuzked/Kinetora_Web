"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumButton from "@/components/PremiumButton";
import { Skeleton } from "@/components/ui/skeleton";
import { caseStudies } from "@/data/caseStudies";
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";
import { useEqualizeHeights } from "@/hooks/use-equalize";

type WPListPost = {
  slug?: string;
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>
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

function extractMetricKind(html: string): { kind: "milestone" | "sales" | "organic" | "funding"; value: string } | null {
  const text = stripHtml(html).toLowerCase();
  const valueMatch =
    html.match(/[\+\-]?\s?\d[\d.,]*\s?(?:m€|m\$|m|k€|k\$|k|€|\$|%)/i) ||
    html.match(/\b\d{2,}\s?(?:usuarios|users|participantes|winners|views|impresiones|impressions|alcance|reach)\b/i);
  if (!valueMatch) return null;
  const rawValue = valueMatch[0].trim();
  let kind: "milestone" | "sales" | "organic" | "funding" = "milestone";
  if (/(venta|ventas|sales)/i.test(text)) kind = "sales";
  else if (/(impacto|org[aá]nico|organic|reach|views|impresiones|impressions|alcance)/i.test(text)) kind = "organic";
  else if (/(recaud|inversi|raised|funding)/i.test(text)) kind = "funding";
  return { kind, value: rawValue };
}

const Cases = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();

  const [meta, setMeta] = React.useState<
    Record<
      string,
      {
        img?: string;
        alt?: string;
        excerpt?: string;
        hito?: string;
        metricKind?: "milestone" | "sales" | "organic" | "funding";
        metricValue?: string;
      }
    >
  >({});

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
        const fm = p?._embedded?.["wp:featuredmedia"]?.[0];
        const featured = fm?.source_url;
        const alt = fm?.alt_text;
        const excerptText = p?.excerpt?.rendered ? stripHtml(p.excerpt.rendered) : "";
        const metric = p?.content?.rendered ? extractMetricKind(p.content.rendered) : null;
        return {
          slug: cs.slug,
          img: featured,
          alt,
          excerpt: excerptText,
          hito: excerptText ? extractHito(excerptText) ?? undefined : undefined,
          metricKind: metric?.kind,
          metricValue: metric?.value,
        };
      })
    ).then((items) => {
      if (cancelled) return;
      const next: Record<string, any> = {};
      items.forEach((it) => {
        next[it.slug] = {
          img: it.img,
          alt: it.alt,
          excerpt: it.excerpt,
          hito: it.hito,
          metricKind: it.metricKind,
          metricValue: it.metricValue,
        };
      });
      setMeta(next);
    })
    .catch(() => {
      if (cancelled) return;
      setMeta({});
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const metaReady = Object.keys(meta).length > 0;

  const metricLabelFor = (kind?: "milestone" | "sales" | "organic" | "funding") => {
    if (!kind) return null;
    if (lang === "es") {
      if (kind === "sales") return "Ventas realizadas";
      if (kind === "organic") return "Impacto orgánico";
      if (kind === "funding") return "Recaudación";
      return "Hito";
    }
    if (kind === "sales") return "Sales";
    if (kind === "organic") return "Organic reach";
    if (kind === "funding") return "Funding";
    return "Milestone";
  };

  const ui =
    lang === "es"
      ? {
          badge: "Casos de éxito",
          titleA: "Proyectos reales.",
          titleB: "Resultados medibles",
          sub:
            "Selección de proyectos donde diseñamos el sistema, el producto y la narrativa para acelerar crecimiento.",
          readMore: "Leer más",
          ariaReadMore: (t: string) => `Leer más: ${t}`,
        }
      : {
          badge: "Case studies",
          titleA: "Real projects.",
          titleB: "Measurable results",
          sub:
            "A selection of projects where we designed the system, product and narrative to accelerate growth.",
          readMore: "Read more",
          ariaReadMore: (t: string) => `Read more: ${t}`,
        };

  const eqRef = React.useRef<HTMLDivElement | null>(null);
  useEqualizeHeights(eqRef, [{ selector: ".js-eq-header", varName: "--eq-header" }], [lang, meta]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <Navbar />
      <main className="pt-[68px] md:pt-[88px]">
        <section className="kin-section relative overflow-hidden" ref={eqRef}>
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />
          <div className="kin-container relative">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative">
              <div className="max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                  {ui.badge}
                </div>
                <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                  {ui.titleA}{" "}
                  <span className="text-[#B454FF]">{ui.titleB}</span>.
                </h1>
                <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed">
                  {ui.sub}
                </p>
              </div>

              <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 items-stretch">
                {caseStudies.map((cs) => {
                  const m = meta[cs.slug];
                  const cover = cs.coverImage || m?.img;
                  const hito =
                    m?.hito ||
                    (lang === "es" ? cs.highlightFallback : cs.highlightFallbackEn ?? cs.highlightFallback);
                  const alt =
                    (lang === "es" ? cs.coverAlt : cs.coverAltEn ?? cs.coverAlt) ||
                    cs.coverAlt ||
                    m?.alt;

                  const metricLabel =
                    (lang === "es" ? cs.metricLabel : cs.metricLabelEn ?? cs.metricLabel) ?? 
                    metricLabelFor(m?.metricKind) ?? 
                    null;
                  const metricValue = cs.metricValue ?? m?.metricValue;

                  const title = lang === "es" ? cs.title : cs.titleEn ?? cs.title;

                  return (
                    <MouseParallax key={cs.slug} intensity={8} rotate={3} className="h-full will-change-transform">
                      <div className="group h-full flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-colors transition-transform hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#B454FF]/40 focus-within:ring-offset-0">
                        <div className="aspect-[16/10] overflow-hidden">
                          {!metaReady ? (
                            <Skeleton className="w-full h-full rounded-none" />
                          ) : (
                            <img
                              src={cover}
                              alt={alt}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = "/assets/placeholder.svg";
                              }}
                              className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                          )}
                        </div>
                        <div className="p-6 sm:p-7 flex-1 flex flex-col">
                          <div className="js-eq-header">
                            <div className="inline-flex items-center justify-center self-center rounded-full border border-[#B454FF]/30 bg-[#B454FF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-[#B454FF]">
                              {hito}
                            </div>
                            <h2 className="mt-3 mb-2 sm:mb-3 text-lg sm:text-xl font-black tracking-tight title-rows-3 title-rows-3-min">
                              {title}
                            </h2>
                          </div>
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
                              onClick={() => navigate(`/casos/${cs.slug}`)}
                              aria-label={ui.ariaReadMore(title)}
                            >
                              {ui.readMore.toUpperCase()}
                            </PremiumButton>
                          </div>
                        </div>
                      </div>
                    </MouseParallax>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cases;