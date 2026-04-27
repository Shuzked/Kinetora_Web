"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/i18n/I18nProvider";
import RevealText from "@/components/ui/RevealText";

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
          <h2 className="text-center mb-12 sm:mb-16 lg:mb-24">
            <RevealText text={t("faq.section.title")} />
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-white/10 bg-white/[0.04] px-5 sm:px-6 rounded-2xl hover:bg-white/[0.06] transition-colors"
              >
                <AccordionTrigger className="text-[#F5F5F5] hover:text-[#B454FF] data-[state=open]:text-[#B454FF] transition-colors text-left font-bold uppercase tracking-tight py-4 sm:py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded-xl px-1 sm:px-2 -mx-1 sm:-mx-2 text-sm sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="group/acc text-[#F5F5F5]/70 leading-relaxed font-medium pb-5 sm:pb-6 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="will-change-transform will-change-opacity group-data-[state=open]/acc:animate-faq-in group-data-[state=closed]/acc:animate-faq-out">
                    {faq.a}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;