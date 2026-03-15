"use client";

import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumButton from "@/components/PremiumButton";
import { caseStudies } from "@/data/caseStudies";
import { ArrowLeft, Check } from "lucide-react";

const CaseStudy = () => {
  const { slug } = useParams();
  const cs = caseStudies.find((c) => c.slug === slug);

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
              <div className="hidden sm:flex items-center gap-2">
                {cs.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black tracking-[0.24em] uppercase text-[#F5F5F5]/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <header className="mt-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60">
                  {cs.sector}
                </div>
                <div className="h-1 w-1 rounded-full bg-white/25" />
                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#B454FF]">
                  {cs.metric}
                </div>
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                {cs.title}
              </h1>
              <p className="mt-4 text-[#F5F5F5]/70 max-w-3xl text-sm sm:text-base leading-relaxed">
                {cs.summary}
              </p>
            </header>

            <div className="mt-10 rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.03]">
              <div className="aspect-[16/8] sm:aspect-[16/7] overflow-hidden">
                <img
                  src={cs.coverImage}
                  alt={cs.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
              <div className="space-y-10">
                <section>
                  <h2 className="text-sm font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                    El reto
                  </h2>
                  <p className="mt-3 text-[#F5F5F5]/70 leading-relaxed">
                    {cs.challenge}
                  </p>
                </section>

                <section>
                  <h2 className="text-sm font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                    La solución
                  </h2>
                  <p className="mt-3 text-[#F5F5F5]/70 leading-relaxed">
                    {cs.solution}
                  </p>
                </section>

                <section>
                  <h2 className="text-sm font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                    Lo que hicimos
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {cs.whatWeDid.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#B454FF]/10 border border-[#B454FF]/25">
                          <Check className="h-4 w-4 text-[#B454FF]" />
                        </span>
                        <span className="text-[#F5F5F5]/75 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-7 sm:p-8 h-fit">
                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/70">
                  Resultados
                </div>
                <div className="mt-5 grid grid-cols-3 lg:grid-cols-1 gap-3">
                  {cs.results.map((r) => (
                    <div
                      key={r.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#F5F5F5]/55">
                        {r.label}
                      </div>
                      <div className="mt-1 text-lg font-black text-[#F5F5F5]">{r.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 pt-7 border-t border-white/10">
                  <Link to="/login">
                    <PremiumButton variant="primary" size="md" className="w-full">
                      QUIERO ESTO
                    </PremiumButton>
                  </Link>
                  <p className="mt-3 text-[12px] text-[#F5F5F5]/60 leading-relaxed">
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
