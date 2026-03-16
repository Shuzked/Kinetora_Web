"use client";

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumButton from "@/components/PremiumButton";
import { Skeleton } from "@/components/ui/skeleton";
import CaseStudyColumns from "@/components/case-study/CaseStudyColumns";
import CaseStudyMoreResults from "@/components/case-study/CaseStudyMoreResults";
import {
  type CaseStudyMeta,
  type WPPost,
  extractHito,
  extractMetricKind,
  injectEmbedsAtPoints,
  sanitizeWpHtml,
  splitWpContentIntoTextAndMedia,
  stripHtml,
} from "@/components/case-study/caseStudyUtils";
import { caseStudies } from "@/data/caseStudies";
import { caseContentOverrides } from "@/data/caseOverrides";
import { useI18n } from "@/i18n/I18nProvider";
import { isLikelySpanish, translateHtmlEsToEn, translateTextEsToEn } from "@/utils/translate";

const CaseStudyPost = () => {
  const { lang } = useI18n();
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentCase = React.useMemo(() => caseStudies.find((item) => item.slug === slug), [slug]);
  const otherCases = React.useMemo(() => caseStudies.filter((item) => item.slug !== slug), [slug]);

  const [post, setPost] = React.useState<WPPost | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [meta, setMeta] = React.useState<Record<string, CaseStudyMeta>>({});
  const [stickySide, setStickySide] = React.useState<"left" | "right" | null>(null);

  const textWrapRef = React.useRef<HTMLElement | null>(null);
  const mediaWrapRef = React.useRef<HTMLDivElement | null>(null);

  const ui =
    lang === "es"
      ? {
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
          letsTalk: "¿Contactamos?",
        }
      : {
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
          letsTalk: "Let's talk",
        };

  const caseTag = React.useMemo(() => {
    if (!currentCase) return lang === "es" ? "Caso de éxito" : "Case study";

    const excerptText = post?.excerpt?.rendered ? stripHtml(post.excerpt.rendered) : "";
    const extracted = excerptText ? extractHito(excerptText) : null;
    const fallback =
      lang === "es"
        ? currentCase.highlightFallback
        : currentCase.highlightFallbackEn ?? currentCase.highlightFallback;

    if (lang === "en") {
      if (extracted) {
        return isLikelySpanish(extracted) ? translateTextEsToEn(extracted) : extracted;
      }
      return fallback;
    }

    return extracted || fallback;
  }, [currentCase, lang, post?.excerpt?.rendered]);

  const title = React.useMemo(() => {
    const wpTitle = post?.title?.rendered ? stripHtml(post.title.rendered) : undefined;
    if (lang === "en") {
      if (wpTitle) return isLikelySpanish(wpTitle) ? translateTextEsToEn(wpTitle) : wpTitle;
      return currentCase?.titleEn ?? currentCase?.title;
    }
    return wpTitle ?? currentCase?.title;
  }, [currentCase?.title, currentCase?.titleEn, lang, post?.title?.rendered]);

  const cover = currentCase?.coverImage;
  const coverAlt = lang === "es" ? currentCase?.coverAlt : currentCase?.coverAltEn ?? currentCase?.coverAlt;

  const { textHtml, mediaHtml } = React.useMemo(() => {
    const base = post?.content?.rendered ? sanitizeWpHtml(post.content.rendered) : "";
    const withEmbeds = currentCase?.embeds?.length ? injectEmbedsAtPoints(base, currentCase.embeds) : base;
    const splitContent = splitWpContentIntoTextAndMedia(withEmbeds);

    if (!currentCase) return splitContent;

    if (lang === "es") {
      const override = caseContentOverrides[currentCase.slug]?.esTextHtml;
      if (!override) return splitContent;
      const safeOverride = sanitizeWpHtml(override);
      return splitWpContentIntoTextAndMedia(safeOverride);
    }

    const override = caseContentOverrides[currentCase.slug]?.enTextHtml;
    if (override) {
      const safeOverride = sanitizeWpHtml(override);
      return splitWpContentIntoTextAndMedia(safeOverride);
    }

    return {
      textHtml: translateHtmlEsToEn(splitContent.textHtml),
      mediaHtml: splitContent.mediaHtml,
    };
  }, [currentCase, lang, post?.content?.rendered]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  React.useEffect(() => {
    let cancelled = false;

    if (!currentCase) {
      setPost(null);
      setLoading(false);
      return;
    }

    const baseUrl = lang === "en" && currentCase.sourceUrlEn ? currentCase.sourceUrlEn : currentCase.sourceUrl;
    const slugParam = lang === "en" && currentCase.slugEn ? currentCase.slugEn : currentCase.slug;
    const url = new URL("/wp-json/wp/v2/posts", baseUrl);

    url.searchParams.set("slug", slugParam);
    url.searchParams.set("_embed", "1");
    url.searchParams.set("_fields", "slug,title,excerpt,content,_embedded");

    setLoading(true);

    fetch(url.toString())
      .then((response) => response.json())
      .then((items: WPPost[]) => {
        if (cancelled) return;
        setPost(items?.[0] ?? null);
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
  }, [currentCase, lang]);

  React.useEffect(() => {
    let cancelled = false;

    Promise.all(
      otherCases.map(async (item) => {
        const baseUrl = lang === "en" && item.sourceUrlEn ? item.sourceUrlEn : item.sourceUrl;
        const slugParam = lang === "en" && item.slugEn ? item.slugEn : item.slug;
        const url = new URL("/wp-json/wp/v2/posts", baseUrl);

        url.searchParams.set("slug", slugParam);
        url.searchParams.set("_embed", "1");
        url.searchParams.set("_fields", "slug,excerpt,content,_embedded");

        const response = await fetch(url.toString());
        const items = (await response.json()) as WPPost[];
        const foundPost = items?.[0];
        const featuredMedia = foundPost?._embedded?.["wp:featuredmedia"]?.[0];
        const excerptText = foundPost?.excerpt?.rendered ? stripHtml(foundPost.excerpt.rendered) : "";
        const metric = foundPost?.content?.rendered ? extractMetricKind(foundPost.content.rendered) : null;

        return {
          slug: item.slug,
          img: featuredMedia?.source_url,
          alt: featuredMedia?.alt_text,
          excerpt: excerptText,
          hito: excerptText ? extractHito(excerptText) ?? undefined : undefined,
          metricKind: metric?.kind,
          metricValue: metric?.value,
        } satisfies CaseStudyMeta & { slug: string };
      })
    )
      .then((items) => {
        if (cancelled) return;
        const nextMeta: Record<string, CaseStudyMeta> = {};
        items.forEach(({ slug: itemSlug, ...rest }) => {
          nextMeta[itemSlug] = rest;
        });
        setMeta(nextMeta);
      })
      .catch(() => {
        if (cancelled) return;
        setMeta({});
      });

    return () => {
      cancelled = true;
    };
  }, [lang, otherCases]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      setStickySide(null);
      return;
    }

    const textEl = textWrapRef.current;
    const mediaEl = mediaWrapRef.current;
    if (!textEl || !mediaEl) return;

    const computeStickySide = () => {
      const textHeight = textEl.offsetHeight;
      const mediaHeight = mediaEl.offsetHeight;
      if (!textHeight || !mediaHeight) return;
      setStickySide(textHeight <= mediaHeight ? "left" : "right");
    };

    computeStickySide();

    const resizeObserver = new ResizeObserver(computeStickySide);
    resizeObserver.observe(textEl);
    resizeObserver.observe(mediaEl);

    window.addEventListener("resize", computeStickySide);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", computeStickySide);
    };
  }, [mediaHtml, textHtml]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <Navbar />

      <main className="pt-[68px] md:pt-[88px]">
        <section className="relative kin-no-overflow">
          <div className="pointer-events-none absolute -top-28 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#B454FF]/10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-44 -left-44 h-[32rem] w-[32rem] rounded-full bg-[#33C3F0]/[0.07] blur-[140px]" />

          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
            <div className="flex flex-col gap-7">
              <div className="flex items-center justify-between gap-4">
                <Link to="/casos" className="inline-flex">
                  <PremiumButton variant="glass" size="sm" className="h-11 rounded-full">
                    {ui.back.toUpperCase()}
                  </PremiumButton>
                </Link>
              </div>

              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                  {caseTag}
                </div>
                <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">{title}</h1>
              </div>

              <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.03] overflow-hidden shadow-[0_24px_110px_rgba(0,0,0,0.35)]">
                <div className="aspect-[16/9] bg-white/[0.04]">
                  {loading ? (
                    <Skeleton className="h-full w-full rounded-none" />
                  ) : cover ? (
                    <img src={cover} alt={coverAlt || ""} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  ) : null}
                </div>
              </div>

              {!currentCase ? (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
                  <p className="text-[#F5F5F5]/80 font-bold">{ui.notFound}</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <CaseStudyColumns
                    loading={loading}
                    textHtml={textHtml}
                    mediaHtml={mediaHtml}
                    stickySide={stickySide}
                    textLabel={ui.textCol}
                    mediaLabel={ui.mediaCol}
                    textWrapRef={textWrapRef}
                    mediaWrapRef={mediaWrapRef}
                  />

                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                    <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60">
                      {ui.readyTitle}
                    </div>
                    <p className="mt-3 text-sm sm:text-base text-[#F5F5F5]/75 leading-relaxed max-w-2xl">
                      {ui.readyBody}
                    </p>
                    <Link to="/#contacto" className="inline-flex mt-5">
                      <PremiumButton variant="primary" size="md" className="w-full sm:w-auto">
                        {ui.letsTalk.toUpperCase()}
                      </PremiumButton>
                    </Link>
                  </div>

                  <CaseStudyMoreResults
                    cases={otherCases}
                    meta={meta}
                    lang={lang}
                    moreResultsLabel={ui.moreResults}
                    viewAllLabel={ui.viewAll}
                    readMoreLabel={ui.readMore}
                    swipeLabel={ui.swipe}
                    onNavigate={(targetSlug) => navigate(`/casos/${targetSlug}`)}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyPost;
