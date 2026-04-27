"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Clock, Calendar, RefreshCw, Zap, Timer } from 'lucide-react';
import PremiumButton from '@/components/PremiumButton';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";
import RevealText from "@/components/ui/RevealText";
import ScrollParallax from "@/components/ui/ScrollParallax";

const Pricing = () => {
  const { t } = useI18n();

  const guarantees = [
    { Icon: Zap, text: t("pricing.pill") },
    { Icon: Timer, text: t("hero.pill.delivery") },
    { Icon: RefreshCw, text: t("pricing.unlimited_revisions") },
  ];

  const plans = [
    {
      name: t("pricing.starter.name"),
      price: '1.900€',
      period: t("pricing.period"),
      highlight: false,
      desc: t("pricing.starter.desc"),
      includes: [
        t("pricing.starter.i1"),
        t("pricing.starter.i2"),
        t("pricing.starter.i3"),
        t("pricing.starter.i4"),
        t("pricing.starter.i5"),
      ],
      excludes: [
        t("pricing.starter.e1"),
        t("pricing.starter.e2"),
      ],
      cta: "COMENCEMOS",
    },
    {
      name: t("pricing.growth.name"),
      price: '3.500€',
      period: t("pricing.period"),
      highlight: true,
      badge: t("pricing.popular"),
      desc: t("pricing.growth.desc"),
      includes: [
        t("pricing.growth.i1"),
        t("pricing.growth.i2"),
        t("pricing.growth.i3"),
        t("pricing.growth.i4"),
        t("pricing.growth.i5"),
        t("pricing.growth.i6"),
      ],
      excludes: [],
      cta: "COMENCEMOS",
    },
    {
      name: t("pricing.scale.name"),
      price: t("pricing.scale.price"),
      isCustom: true,
      period: '',
      highlight: false,
      badge: t("pricing.enterprise"),
      desc: t("pricing.scale.desc"),
      includes: [
        t("pricing.scale.i1"),
        t("pricing.scale.i2"),
        t("pricing.scale.i3"),
        t("pricing.scale.i4"),
        t("pricing.scale.i5"),
      ],
      excludes: [],
      cta: "CONSÚLTALO",
    },
  ];

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
  ];

  const handleContact = () => {
    const el = document.getElementById("contacto");
    if (el) {
      const nav = document.querySelector("nav") as HTMLElement | null;
      const offset = (nav?.offsetHeight || 0) + 16;
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="precios" className="kin-section bg-[#0D0D0D] scroll-mt-24 md:scroll-mt-28 relative overflow-hidden">
      <ScrollParallax speed={0.08} invert={true} className="absolute top-1/2 -right-32">
        <div className="pointer-events-none h-80 w-80 rounded-full bg-[#B454FF]/5 blur-[120px]" />
      </ScrollParallax>
      
      <div className="kin-container">
        {/* ── HEADER ── */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
              {t("pricing.pill")}
            </div>
            <h2 className="mb-6">
              <RevealText text={t("pricing.title").toUpperCase()} /> <br />
              <RevealText text={t("pricing.titleAccent").toUpperCase()} className="text-[#B454FF]" delay={0.15} />
            </h2>
            <p className="text-[#F5F5F5]/70 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
              {t("pricing.sub")}
            </p>

            {/* Guarantees row */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {guarantees.map(({ Icon, text }, i) => (
                <div key={i} className="inline-flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#F5F5F5]/60 transition-colors hover:text-[#B454FF]">
                  <Icon className="w-3.5 h-3.5 text-[#B454FF]" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── PRICING CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-24">
          {plans.map((plan, i) => (
            <MouseParallax key={i} intensity={9} rotate={3} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative rounded-[2.5rem] p-8 sm:p-10 h-full flex flex-col border transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-[#B454FF]/10 border-[#B454FF]/40 shadow-[0_0_80px_rgba(180,84,255,0.08)]'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                    plan.highlight ? 'bg-[#B454FF] text-white' : 'bg-white/10 text-white/70 border border-white/20'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-sm font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span
                      className="font-black text-[#F5F5F5] tracking-tighter leading-none"
                      style={{ fontSize: 'clamp(2.25rem, 8vw, 3.75rem)' }}
                    >{plan.price}</span>
                    {!plan.isCustom && (
                      <span className="text-2xl font-black text-[#B454FF] leading-none ml-1">€</span>
                    )}
                    <span className="text-[#F5F5F5]/50 font-bold text-sm ml-1">{plan.period}</span>
                  </div>
                  <p className="text-[#F5F5F5]/60 text-sm leading-relaxed font-medium">{plan.desc}</p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-3.5 text-sm text-[#F5F5F5]/90 text-left">
                      <Check className="w-4 h-4 text-[#B454FF] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                  {plan.excludes.map((item, j) => (
                    <li key={j} className="flex items-start gap-3.5 text-sm text-[#F5F5F5]/30 text-left">
                      <X className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a href="#contacto" className="block w-full">
                  <PremiumButton
                    variant={plan.highlight ? 'primary' : 'glass'}
                    size="lg"
                    className="w-full rounded-full"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {plan.cta}
                  </PremiumButton>
                </a>
              </motion.div>
            </MouseParallax>
          ))}
        </div>

        {/* ── REFERRAL PROGRAM ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[2rem] p-8 md:p-12 border border-white/10 bg-white/[0.04] mb-14 md:mb-24 overflow-hidden group"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#B454FF]/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#B454FF]/15 transition-colors duration-500" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-4xl text-center md:text-left">
              <div className="inline-flex items-center rounded-full bg-[#B454FF]/20 text-[#B454FF] px-4 py-1.5 text-[10px] font-black tracking-widest uppercase mb-6">
                {t("pricing.partner.pill")}
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
                {t("pricing.partner.title")}
              </h3>
              <p className="text-[#F5F5F5]/60 text-lg leading-relaxed max-w-3xl">
                {t("pricing.partner.desc")}
              </p>
            </div>
            
            {/* Organic indicator - purely visual */}
            <div className="hidden md:flex flex-col items-end gap-2 opacity-20">
              <div className="h-px w-24 bg-gradient-to-l from-white to-transparent" />
              <div className="h-px w-16 bg-gradient-to-l from-white to-transparent" />
              <div className="h-px w-8 bg-gradient-to-l from-white to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* ── FAQ ── */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-black uppercase tracking-widest mb-10 text-center opacity-80">
            {t("faq.title")}
          </h3>
          <div className="grid gap-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 hover:bg-white/[0.05] transition-colors text-left"
              >
                <div className="font-black text-xs uppercase tracking-widest text-[#B454FF] mb-2">{faq.q}</div>
                <p className="text-[#F5F5F5]/65 text-sm leading-relaxed font-medium">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;