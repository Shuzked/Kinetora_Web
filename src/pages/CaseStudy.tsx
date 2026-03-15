"use client";

import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumButton from "@/components/PremiumButton";
import { caseStudies } from "@/data/caseStudies";
import { ArrowLeft, ExternalLink } from "lucide-react";
import WPPostContent from "@/components/WPPostContent";

type WPPost = {
  id: number;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>;
  };
};

function extractYouTubeIds(html: string) {
  const ids = new Set<string>();

  const embed = /youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{6,})/g;
  const watch = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{6,})/g;
  const short = /youtu\.be\/([a-zA-Z0-9_-]{6,})/g;

  for (const re of [embed, watch, short]) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(html))) ids.add(m[1]);
  }
  return Array.from(ids);
}

function stripYouTubeIframes(html: string) {
  return html.replace(/<iframe[^>]*?(youtube(?:-nocookie)?\.com|youtu\.be)[\s\S]*?<\/iframe>/gi, "");
}

const CaseStudy = () => {
  const { slug } = useParams();
  const cs = caseStudies.find((c) => c.slug === slug);

  const [post, setPost] = React.useState<WPPost | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!cs) return;

    let cancelled = false;
    setLoading(true);

    const url = new URL("/wp-json/wp/v2/posts", cs.sourceUrl);
    url.searchParams.set("slug", cs.slug);
    url.searchParams.set("_embed", "1");

    fetch(url.toString())
      .then((r) => r.json())
      .then((arr) => {
        if (cancelled) return;
        const p = Array.isArray(arr) ? (arr[0] as WPPost | undefined) : undefined;
        setPost(p ?? null);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cs]);

  if (!cs) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
        <Navbar />
        <main className="pt-[68px] md:pt-[88px]">
          <section className="py-16 sm:py-20">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
              <p className="text-[#F5F5F5]/70">Este caso no existe.</p>
              <div className="mt-6">
                <Link to="/casos">
                  <PremiumButton variant="glass" size="md">
                    VOLVER A CASOS
                  </PremiumButton>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const featured = post?._embedded?.["wp:featuredmedia"]?.[0];
  const featuredUrl = featured?.source_url;
  const featuredAlt = featured?.alt_text || cs.coverAlt;

  const postTitle = post?.title?.rendered
    ? post.title.rendered.replace(/<[^>]+>/g, "").trim()
    : cs.title;

  const postExcerpt = post?.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
    : cs.summaryFallback;

  const ytIds = React.useMemo(
    () => (post?.content?.rendered ? extractYouTubeIds(post.content.rendered) : []),
    [post?.content?.rendered]
  );

  const cleanedHtml = React.useMemo(
    () => (post?.content?.rendered ? stripYouTubeIframes(post.content.rendered) : ""),
    [post?.content?.rendered]
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <Navbar />
      <main className="pt-[68px] md:pt-[88px]">
        <article className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />

          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center justify-between gap-4">
              <Link to="/casos" className="inline-flex">
                <PremiumButton variant="glass" size="sm" className="h-11 px-4">
                  <span className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    CASOS
                  </span>
                </PremiumButton>
              </Link>

              <a
                href={cs.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex"
              >
                <PremiumButton variant="glass" size="sm" className="h-11 px-4">
                  <span className="inline-flex items-center gap-2">
                    VER ORIGINAL
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </PremiumButton>
              </a>
            </div>

            <header className="mt-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60">
                  {cs.label}
                </div>
                <div className="h-1 w-1 rounded-full bg-white/25" />
                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#B454FF]">
                  PORTFOLIO
                </div>
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                {postTitle}
              </h1>
              <p className="mt-4 text-[#F5F5F5]/70 max-w-3xl text-sm sm:text-base leading-relaxed">
                {postExcerpt}
              </p>
            </header>

            <div className="mt-10 rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.03] max-w-5xl mx-auto">
              <div className="aspect-[16/8] sm:aspect-[16/7] overflow-hidden">
                <img
                  src={featuredUrl || cs.coverImage}
                  alt={featuredAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
              <div className="space-y-6">
                {ytIds.length > 0 && (
                  <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-7 sm:p-8 max-w-3xl mx-auto">
                    <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/70">
                      Vídeos
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-4">
                      {ytIds.map((id) => (
                        <div
                          key={id}
                          className="rounded-[1.75rem] overflow-hidden border border-white/10 bg-black/30"
                        >
                          <div className="aspect-video">
                            <iframe
                              title={`YouTube ${id}`}
                              className="h-full w-full"
                              src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              referrerPolicy="strict-origin-when-cross-origin"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-7 sm:p-8 max-w-3xl mx-auto">
                  {loading ? (
                    <p className="text-[#F5F5F5]/70">Cargando contenido…</p>
                  ) : cleanedHtml ? (
                    <WPPostContent html={cleanedHtml} />
                  ) : (
                    <p className="text-[#F5F5F5]/70">
                      No se pudo cargar el contenido automáticamente. Puedes verlo en el enlace
                      original.
                    </p>
                  )}
                </section>
              </div>

              <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-7 sm:p-8 h-fit">
                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/70">
                  Acciones
                </div>

                <div className="mt-5 space-y-3">
                  <a href={cs.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <PremiumButton variant="glass" size="md" className="w-full">
                      VER POST COMPLETO
                    </PremiumButton>
                  </a>
                  <Link to="/login">
                    <PremiumButton variant="primary" size="md" className="w-full">
                      QUIERO ESTO
                    </PremiumButton>
                  </Link>
                </div>

                <div className="mt-7 pt-7 border-t border-white/10">
                  <p className="text-[12px] text-[#F5F5F5]/60 leading-relaxed">
                    Te montamos un sistema visual igual de sólido — con entregas en 48h.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;