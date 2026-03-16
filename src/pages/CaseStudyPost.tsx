"use client";

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
import { useI18n } from "@/i18n/I18nProvider";

type WPPost = {
  slug?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>;
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

function extractMetricKind(
  html: string
): { kind: "milestone" | "sales" | "organic" | "funding"; value: string } | null {
  const text = stripHtml(html).toLowerCase();
  const valueMatch =
    html.match(/[\+\-]?\s?\d[\d.,]*\s?(?:m€|m\$|m|k€|k\$|k|€|\$|%)/i) ||
    html.match(
      /\b\d{2,}\s?(?:usuarios|users|participantes|winners|views|impresiones|impressions|alcance|reach)\b/i
    );
  if (!valueMatch) return null;
  const rawValue = valueMatch[0].trim();
  let kind: "milestone" | "sales" | "organic" | "funding" = "milestone";
  if (/(venta|ventas|sales)/i.test(text)) kind = "sales";
  else if (/(impacto|org[aá]nico|organic|reach|views|impresiones|impressions|alcance)/i.test(text)) kind = "organic";
  else if (/(recaud|inversi|raised|funding)/i.test(text)) kind = "funding";
  return { kind, value: rawValue };
}

const sanitizeWpHtml = (html: string) => {
  // Allow common WP embeds while keeping things safe.
  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe", "video", "source"],
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
      "type",
    ],
  });

  // Ensure external links are safe.
  if (typeof window === "undefined") return clean;
  const doc = new DOMParser().parseFromString(clean, "text/html");
  doc.querySelectorAll("a[target='_blank']").forEach((a) => {
    const rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
    if (!rel.includes("noopener")) rel.push("noopener");
    if (!rel.includes("noreferrer")) rel.push("noreferrer");
    a.setAttribute("rel", rel.join(" "));
  });

  // Basic allowlist for iframes (avoid arbitrary third-party embeds).
  const allowedHosts = new Set([
    "www.youtube.com",
    "youtube.com",
    "player.vimeo.com",
    "vimeo.com",
    "kinetora.tech",
  ]);

  doc.querySelectorAll("iframe").forEach((f) => {
    const src = f.getAttribute("src") || "";
    try {
      const u = new URL(src, window.location.origin);
      if (!allowedHosts.has(u.hostname)) {
        f.remove();
        return;
      }
      f.setAttribute("loading", "lazy");
      f.setAttribute("referrerpolicy", "no-referrer");
      f.classList.add("wp-embed");
    } catch {
      f.remove();
    }
  });

  doc.querySelectorAll("video").forEach((v) => {
    v.setAttribute("controls", "true");
    v.setAttribute("playsinline", "true");
    v.classList.add("wp-video");
  });

  return doc.body.innerHTML;
};

const CaseStudyPost = () => {
  const { lang } = useI18n();
  const { slug } = useParams();
  const navigate = useNavigate();

  const cs = React.useMemo(
    () => caseStudies.find((c) => c.slug === slug),
    [slug]
  );

  const otherCases = React.useMemo(
    () => caseStudies.filter((c) => c.slug !== slug),
    [slug]
  );

  const [post, setPost] = React.useState<WPPost | null>(null);
  const [loading, setLoading] = React.useState(true);

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
          back: "Volver a casos",
          contact: "¿Contactamos?",
          readOriginal: "Ver original",
          notFound: "No encontramos este caso.",
          readyTitle: "¿Listo para un caso así?",
          readyBody: "Cuéntanos qué estás lanzando y te proponemos el mejor enfoque en menos de 24h.",
          moreResults: "Más resultados",
          viewAll: "Ver todos",
          readMore: "Leer más",
        }
      : {
          back: "Back to cases",
          contact: "Let's talk",
          readOriginal: "View original",
          notFound: "We couldn't find this case study.",
          readyTitle: "Want results like this?",
          readyBody: "Tell us what you're launching and we'll propose the best approach within 24h.",
          moreResults: "More results",
          viewAll: "View all",
          readMore: "Read more",
        };

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [slug]);

  React.useEffect(() => {
    let cancelled = false;

    if (!cs) {
      setLoading(false);
      setPost(null);
      return;
    }

    const url = new URL("/wp-json/wp/v2/posts", cs.sourceUrl);
    url.searchParams.set("slug", cs.slug);
    url.searchParams.set("_embed", "1");
    url.searchParams.set("_fields", "slug,title,excerpt,content,_embedded");

    setLoading(true);
    fetch(url.toString())
      .then((r) => r.json())
      .then((arr: WPPost[]) => {
        if (cancelled) return;
        setPost(arr?.[0] ?? null);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setPost(null);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cs]);

  React.useEffect(() => {
    let cancelled = false;

    Promise.all(
      otherCases.map(async (it) => {
        const url = new URL("/wp-json/wp/v2/posts", it.sourceUrl);
        url.searchParams.set("slug", it.slug);
        url.searchParams.set("_embed", "1");
        url.searchParams.set("_fields", "slug,excerpt,content,_embedded");
        const res = await fetch(url.toString());
        const arr = (await res.json()) as WPPost[];
        const p = arr?.[0];
        const fm = p?._embedded?.["wp:featuredmedia"]?.[0];
        const excerptText = p?.excerpt?.rendered ? stripHtml(p.excerpt.rendered) : "";
        const metric = p?.content?.rendered ? extractMetricKind(p.content.rendered) : null;
        return {
          slug: it.slug,
          img: fm?.source_url,
          alt: fm?.alt_text,
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
        next[it.slug || ""] = {
          img: it.img,
          alt: it.alt,
          excerpt: it.excerpt,
          hito: it.hito,
          metricKind: it.metricKind,
          metricValue: it.metricValue,
        };
      });
      setMeta(next);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const title =
    post?.title?.rendered
      ? stripHtml(post.title.rendered)
      : lang === "es"
        ? cs?.title
        : cs?.titleEn ?? cs?.title;

  const excerpt = post?.excerpt?.rendered ? stripHtml(post.excerpt.rendered) : "";

  const featured = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const featuredAlt = post?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text;
  const cover = featured || cs?.coverImage;

  const contentHtml = post?.content?.rendered ? sanitizeWpHtml(post.content.rendered) : "";

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <Navbar />

      <main className="pt-[68px] md:pt-[88px]">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-28 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#B454FF]/10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-44 -left-44 h-[32rem] w-[32rem] rounded-full bg-[#33C3F0]/[0.07] blur-[140px]" />

          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-7"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Link to="/casos" className="inline-flex">
                  <PremiumButton variant="glass" size="sm" className="h-11 rounded-full">
                    {ui.back.toUpperCase()}
                  </PremiumButton>
                </Link>

                <div className="flex items-center gap-3">
                  {cs?.sourceUrl ? (
                    <a
                      href={cs.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <PremiumButton variant="outline" size="sm" className="h-11 rounded-full">
                        {ui.readOriginal.toUpperCase()}
                      </PremiumButton>
                    </a>
                  ) : null}

                  <Link to="/#contacto" className="inline-flex">
                    <PremiumButton variant="primary" size="sm" className="h-11 rounded-full">
                      {ui.contact.toUpperCase()}
                    </PremiumButton>
                  </Link>
                </div>
              </div>

              <div className="max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                  {lang === "es" ? "Caso de éxito" : "Case study"}
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                  {title}
                </h1>

                {excerpt ? (
                  <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed">
                    {excerpt}
                  </p>
                ) : null}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[2.25rem] border border-white/10 bg-white/[0.03] overflow-hidden shadow-[0_24px_110px_rgba(0,0,0,0.35)]"
              >
                <div className="aspect-[16/9] bg-white/[0.04]">
                  {loading ? (
                    <Skeleton className="h-full w-full rounded-none" />
                  ) : cover ? (
                    <img
                      src={cover}
                      alt={featuredAlt || cs?.coverAlt || ""}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>
              </motion.div>

              {!cs ? (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
                  <p className="text-[#F5F5F5]/80 font-bold">{ui.notFound}</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-8"
                >
                  <article className="wp-post">
                    {loading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-3/5" />
                        <Skeleton className="h-4 w-4/6" />
                        <Skeleton className="h-48 w-full rounded-2xl" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ) : (
                      <div
                        className="wp-post__content"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                      />
                    )}
                  </article>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60">
                          {ui.readyTitle}
                        </div>
                        <p className="mt-3 text-sm sm:text-base text-[#F5F5F5]/75 leading-relaxed max-w-2xl">
                          {ui.readyBody}
                        </p>
                      </div>
                      <Link to="/#contacto" className="inline-flex md:shrink-0">
                        <PremiumButton variant="primary" size="md" className="w-full md:w-auto">
                          {ui.contact.toUpperCase()}
                        </PremiumButton>
                      </Link>
                    </div>
                  </motion.div>

                  <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden"
                    aria-label={ui.moreResults}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-7">
                      <div>
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                          {ui.moreResults}
                        </div>
                      </div>
                      <Link to="/casos" className="shrink-0">
                        <PremiumButton variant="glass" size="md" className="w-full sm:w-auto">
                          {ui.viewAll.toUpperCase()}
                        </PremiumButton>
                      </Link>
                    </div>

                    <Carousel opts={{ align: "start", loop: true }} className="relative">
                      <CarouselContent className="-ml-4">
                        {otherCases.map((it) => {
                          const m = meta[it.slug];
                          const coverImg = it.coverImage || m?.img;
                          const hito =
                            m?.hito ||
                            (lang === "es" ? it.highlightFallback : it.highlightFallbackEn ?? it.highlightFallback);
                          const alt =
                            (lang === "es" ? it.coverAlt : it.coverAltEn ?? it.coverAlt) || it.coverAlt || m?.alt;

                          const metricLabel =
                            (lang === "es" ? it.metricLabel : it.metricLabelEn ?? it.metricLabel) ??
                            metricLabelFor(m?.metricKind) ??
                            null;
                          const metricValue = it.metricValue ?? m?.metricValue;

                          const cardTitle = lang === "es" ? it.title : it.titleEn ?? it.title;

                          return (
                            <CarouselItem
                              key={it.slug}
                              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                            >
                              <motion.div
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="h-full"
                              >
                                <div className="group block h-full rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-colors transition-transform will-change-transform hover:-translate-y-0.5">
                                  <div className="aspect-[16/10] overflow-hidden">
                                    {!metaReady ? (
                                      <Skeleton className="w-full h-full rounded-none" />
                                    ) : (
                                      <img
                                        src={coverImg}
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
                                    <div className="inline-flex items-center justify-center self-center rounded-full border border-[#B454FF]/30 bg-[#B454FF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-[#B454FF]">
                                      {hito}
                                    </div>
                                    <h3 className="mt-3 mb-2 sm:mb-3 text-lg sm:text-xl font-black tracking-tight title-rows-3 title-rows-3-min">
                                      {cardTitle}
                                    </h3>
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
                                        onClick={() => navigate(`/casos/${it.slug}`)}
                                      >
                                        {ui.readMore.toUpperCase()}
                                      </PremiumButton>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>

                      <CarouselPrevious className="hidden sm:inline-flex -left-4 md:-left-6 h-11 w-11 rounded-full border border-white/10 bg-[#0D0D0D]/70 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20" />
                      <CarouselNext className="hidden sm:inline-flex -right-4 md:-right-6 h-11 w-11 rounded-full border border-white/10 bg-[#0D0D0D]/70 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20" />
                    </Carousel>
                  </motion.section>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyPost;