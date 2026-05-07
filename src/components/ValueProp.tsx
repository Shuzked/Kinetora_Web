"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertCircle, Zap } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";
import RevealText from "@/components/ui/RevealText";

const ValueProp = () => {
  const { t } = useI18n();

  const leftItems = [
    { t: t("valueprop.left.item1_t"), d: t("valueprop.left.item1_d") },
    { t: t("valueprop.left.item2_t"), d: t("valueprop.left.item2_d") },
    { t: t("valueprop.left.item3_t"), d: t("valueprop.left.item3_d") },
    { t: t("valueprop.left.item4_t"), d: t("valueprop.left.item4_d") },
  ];

  const rightItems = [
    { t: t("valueprop.right.item1_t"), d: t("valueprop.right.item1_d") },
    { t: t("valueprop.right.item2_t"), d: t("valueprop.right.item2_d") },
    { t: t("valueprop.right.item3_t"), d: t("valueprop.right.item3_d") },
    { t: t("valueprop.right.item4_t"), d: t("valueprop.right.item4_d") },
  ];

  const leftMetrics = [
    { k: t("valueprop.left.metric1_k"), v: t("valueprop.left.metric1_v") },
    { k: t("valueprop.left.metric2_k"), v: t("valueprop.left.metric2_v") },
    { k: t("valueprop.left.metric3_k"), v: t("valueprop.left.metric3_v") },
  ];

  const rightMetrics = [
    { k: t("valueprop.right.metric1_k"), v: t("valueprop.right.metric1_v") },
    { k: t("valueprop.right.metric2_k"), v: t("valueprop.right.metric2_v") },
    { k: t("valueprop.right.metric3_k"), v: t("valueprop.right.metric3_v") },
  ];

  return (
    <section className="kin-section relative">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute left-1/2 top-[-14rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#B454FF]/14 blur-[120px] md:h-[42rem] md:w-[42rem] md:blur-[160px]" />
        <div className="absolute left-[-10%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-[#7C3AED]/10 blur-[110px] md:h-[30rem] md:w-[30rem] md:blur-[150px]" />
        <div className="absolute right-[-8%] bottom-[4%] h-[24rem] w-[24rem] rounded-full bg-[#5EEAD4]/7 blur-[120px] md:h-[34rem] md:w-[34rem] md:blur-[160px]" />
      </div>

      <div className="kin-container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
            {t("valueprop.pill")}
          </div>
          <h2 className="mb-6 uppercase">
            <RevealText text={t("valueprop.titleTop")} className="block text-white" />
            <RevealText text={t("valueprop.titleAccent")} className="block text-[#B454FF]" delay={0.3} />
          </h2>
          <p className="text-[#F5F5F5]/70 max-w-2xl mx-auto leading-relaxed underline-offset-4">
            {t("valueprop.sub")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          <MouseParallax intensity={9} rotate={4} className="will-change-transform">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 16 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="h-full kin-card relative flex flex-col overflow-hidden text-left"
            >
              <div className="flex items-center justify-between gap-3 mb-9 sm:mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-300/70" />
                  </div>
                  <h3 className="uppercase">
                    {t("valueprop.left.title")}
                  </h3>
                </div>
                <span className="hidden sm:inline-flex rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase text-[#F5F5F5]/60">
                  {t("valueprop.left.badge")}
                </span>
              </div>

              <ul className="space-y-6 sm:space-y-7">
                {leftItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                      <X className="w-4 h-4 text-red-300/70" />
                    </span>
                    <div>
                      <div className="text-[#F5F5F5] font-extrabold text-sm uppercase tracking-tight">
                        {item.t}
                      </div>
                      <div className="text-[#F5F5F5]/60 text-sm leading-snug mt-1">{item.d}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-7 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {leftMetrics.map((m) => (
                    <div key={m.k} className="rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center">
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.22em] font-black text-[#F5F5F5]/55 break-words whitespace-normal leading-tight">
                        {m.k}
                      </div>
                      <div className="mt-1 text-xs sm:text-sm font-extrabold text-[#F5F5F5] break-words whitespace-normal leading-snug">
                        {m.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </MouseParallax>

          <MouseParallax intensity={10} rotate={5} className="will-change-transform">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 16 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
              className="h-full kin-card border-[#B454FF]/30 bg-white/[0.05] relative overflow-hidden shadow-[0_18px_90px_rgba(180,84,255,0.10)] flex flex-col text-left"
            >
              <div className="pointer-events-none absolute -top-28 -right-28 w-72 h-72 bg-[#B454FF]/18 rounded-full blur-[90px]" />

              <div className="flex items-center justify-between gap-3 mb-9 sm:mb-10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-[#B454FF]/15 border border-[#B454FF]/20 flex items-center justify-center">
                    <img src="/Favicon_Kinetora.png" alt="Kinetora" className="w-5 h-5 object-contain" loading="lazy" decoding="async" />
                  </div>
                  <h3 className="uppercase">
                    {t("valueprop.right.title")}
                  </h3>
                </div>
                <span className="inline-flex rounded-full bg-[#B454FF]/10 border border-[#B454FF]/25 px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase text-[#B454FF]">
                  {t("valueprop.right.badge")}
                </span>
              </div>

              <ul className="space-y-6 sm:space-y-7 relative z-10">
                {rightItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B454FF]/10 border border-[#B454FF]/20">
                      <Check className="w-4 h-4 text-[#B454FF]" />
                    </span>
                    <div>
                      <div className="text-[#F5F5F5] font-extrabold text-sm uppercase tracking-tight">
                        {item.t}
                      </div>
                      <div className="text-[#F5F5F5]/65 text-sm leading-snug mt-1">{item.d}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-7 border-t border-white/10 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {rightMetrics.map((m) => (
                    <div key={m.k} className="rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center">
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.22em] font-black text-[#F5F5F5]/55 break-words whitespace-normal leading-tight">
                        {m.k}
                      </div>
                      <div className="mt-1 text-xs sm:text-sm font-extrabold text-[#F5F5F5] break-words whitespace-normal leading-snug">
                        {m.v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center rounded-full bg-[#B454FF]/10 border border-[#B454FF]/25 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#B454FF]">
                  {t("valueprop.right.tag")}
                </div>
              </div>
            </motion.div>
          </MouseParallax>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;