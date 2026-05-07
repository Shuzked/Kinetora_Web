"use client";

import React from 'react';
import { useI18n } from "@/i18n/I18nProvider";

// ──────────────────────────────────────────────────────────────────────────────
// FAQ — migrated from @radix-ui/react-accordion to native <details>/<summary>
//
// Benefits:
//  • Zero JS for open/close — browser handles it natively
//  • name="faq" provides exclusivity (only one open at a time) natively
//  • grid-template-rows: 0fr → 1fr animation replicates Radix height animation
//    without --radix-accordion-content-height CSS variable
//  • Preserves: focus-visible ring, chevron rotate, faq-in content animation,
//    hover color change, identical visual design
// ──────────────────────────────────────────────────────────────────────────────

const FAQ = () => {
  const { t } = useI18n();

  const faqs = [
    { q: t("faq.section.q1"), a: t("faq.section.a1") },
    { q: t("faq.section.q2"), a: t("faq.section.a2") },
    { q: t("faq.section.q3"), a: t("faq.section.a3") },
    { q: t("faq.section.q4"), a: t("faq.section.a4") },
    { q: t("faq.section.q5"), a: t("faq.section.a5") },
    { q: t("faq.section.q6"), a: t("faq.section.a6") },
    { q: t("faq.section.q7"), a: t("faq.section.a7") },
    { q: t("faq.section.q8"), a: t("faq.section.a8") },
  ];

  return (
    <section className="kin-section bg-[#0D0D0D]">
      <div className="kin-container">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center mb-16 font-black tracking-tighter leading-tight uppercase"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {t("faq.section.title")}
          </h2>

          <div className="w-full space-y-6">
            {faqs.map((faq, i) => (
              <details
                key={i}
                name="faq"
                className="faq-item group border-white/[0.03] bg-[#111111] px-8 sm:px-10 rounded-[2rem] hover:bg-white/[0.02] transition-all duration-500"
              >
                {/* ── SUMMARY: the clickable trigger ── */}
                <summary className="faq-summary list-none flex items-center justify-between gap-4 cursor-pointer text-white group-open:text-[#B454FF] hover:text-[#B454FF] transition-all duration-500 text-left font-medium tracking-tight py-6 sm:py-8 text-base sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded-lg select-none">
                  <span>{faq.q}</span>
                  {/* Chevron — rotates 180° when open, identical to Radix AccordionTrigger */}
                  <svg
                    className="faq-chevron h-4 w-4 shrink-0 text-white/50 group-open:text-[#B454FF] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>

                {/* ── CONTENT: grid animation 0fr → 1fr ── */}
                <div className="faq-content-grid">
                  <div className="faq-content-inner overflow-hidden">
                    <div className="max-w-2xl text-white/40 leading-relaxed font-normal pb-8 sm:pb-10">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;