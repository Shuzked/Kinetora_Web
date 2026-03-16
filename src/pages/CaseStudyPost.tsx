"use client";

import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumButton from "@/components/PremiumButton";
import { Skeleton } from "@/components/ui/skeleton";
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

const sanitizeWpHtml = (html: string) => {
  // Allow common WP embeds while keeping things safe.
  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "loading",
      "referrerpolicy",
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

  return doc.body.innerHTML;
};

const CaseStudyPost = () => {
  const { lang } = useI18n();
  const { slug } = useParams();

  const cs = React.useMemo(
    () => caseStudies.find((c) => c.slug === slug),
    [slug]
  );

  const [post, setPost] = React.useState<WPPost | null>(null);
  const [loading, setLoading] = React.useState(true);

  const ui =
    lang === "es"
      ? {
          back: "Volver a casos",
          contact: "¿Contactamos?",
          readOriginal: "Ver original",
          notFound: "No encontramos este caso.",
        }
      : {
          back: "Back to cases",
          contact: "Let’s talk",
          readOriginal: "View original",
          notFound: "We couldn’t find this case study.",
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
                  className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-10"
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

                  <aside className="hidden lg:block">
                    <div className="sticky top-[108px] rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                      <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60">
                        {lang === "es" ? "¿Listo para un caso así?" : "Want results like this?"}
                      </div>
                      <p className="mt-3 text-sm text-[#F5F5F5]/75 leading-relaxed">
                        {lang === "es"
                          ? "Cuéntanos qué estás lanzando y te proponemos el mejor enfoque en menos de 24h."
                          : "Tell us what you’re launching and we’ll propose the best approach within 24h."}
                      </p>
                      <Link to="/#contacto" className="inline-flex w-full mt-5">
                        <PremiumButton variant="primary" size="md" className="w-full">
                          {ui.contact.toUpperCase()}
                        </PremiumButton>
                      </Link>
                    </div>
                  </aside>
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
