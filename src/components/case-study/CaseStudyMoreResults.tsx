import React from "react";
import { Link } from "react-router-dom";
import PremiumButton from "@/components/PremiumButton";
import { useEqualizeHeights } from "@/hooks/use-equalize";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CaseStudy } from "@/data/caseStudies";
import type { CaseStudyMeta } from "./caseStudyUtils";

type CaseStudyMoreResultsProps = {
  cases: CaseStudy[];
  meta: Record<string, CaseStudyMeta>;
  lang: "es" | "en";
  readMoreLabel: string;
  moreResultsLabel: string;
  viewAllLabel: string;
  swipeLabel: string;
  onNavigate: (slug: string) => void;
};

const CaseStudyMoreResults = ({
  cases,
  meta,
  lang,
  readMoreLabel,
  moreResultsLabel,
  viewAllLabel,
  swipeLabel,
  onNavigate,
}: CaseStudyMoreResultsProps) => {
  const eqRef = React.useRef<HTMLDivElement | null>(null);

  useEqualizeHeights(eqRef, [{ selector: ".js-eq-header", varName: "--eq-header" }], [lang, cases.length]);

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

  return (
    <div className="relative" aria-label={moreResultsLabel} ref={eqRef}>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-7">
        <div>
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
            {moreResultsLabel}
          </div>
        </div>
        <Link to="/casos" className="shrink-0">
          <PremiumButton variant="glass" size="md" className="w-full sm:w-auto">
            {viewAllLabel.toUpperCase()}
          </PremiumButton>
        </Link>
      </div>

      <Carousel opts={{ align: "start", loop: true }} className="relative sm:px-6">
        <CarouselContent className="-ml-4">
          {cases.map((item) => {
            const itemMeta = meta[item.slug];
            const coverImg = item.coverImage || itemMeta?.img || "/assets/placeholder.svg";
            const hito =
              itemMeta?.hito ||
              (lang === "es" ? item.highlightFallback : item.highlightFallbackEn ?? item.highlightFallback);
            const alt =
              (lang === "es" ? item.coverAlt : item.coverAltEn ?? item.coverAlt) || item.coverAlt || itemMeta?.alt;
            const metricLabel =
              (lang === "es" ? item.metricLabel : item.metricLabelEn ?? item.metricLabel) ??
              metricLabelFor(itemMeta?.metricKind) ??
              null;
            const metricValue = item.metricValue ?? itemMeta?.metricValue;
            const title = lang === "es" ? item.title : item.titleEn ?? item.title;

            return (
              <CarouselItem key={item.slug} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="group block h-full rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-colors transition-transform will-change-transform transform-gpu hover:-translate-y-0.5">
                  <div className="aspect-[16/10] overflow-hidden rounded-[inherit]">
                    <img
                      src={coverImg}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/assets/placeholder.svg";
                      }}
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 rounded-[inherit] transform-gpu"
                    />
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    <div className="js-eq-header">
                      <div className="inline-flex items-center justify-center self-center rounded-full border border-[#B454FF]/30 bg-[#B454FF]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-[#B454FF]">
                        {hito}
                      </div>
                      <h3 className="mt-3 mb-2 sm:mb-3 text-lg sm:text-xl font-black tracking-tight title-rows-3 title-rows-3-min">
                        {title}
                      </h3>
                    </div>

                    <div className="mt-auto pt-4 sm:pt-5">
                      <div className="metric-block-min mb-2">
                        {metricLabel && metricValue ? (
                          <>
                            <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60">
                              {metricLabel}
                            </div>
                            <div className="mt-1 text-2xl sm:text-3xl font-black text-[#B454FF]">
                              {metricValue}
                            </div>
                          </>
                        ) : null}
                      </div>

                      <PremiumButton
                        variant="glass"
                        size="sm"
                        className="w-full h-11 rounded-full border-white/15 bg-white/5 hover:bg-white/10"
                        onClick={() => onNavigate(item.slug)}
                      >
                        {readMoreLabel.toUpperCase()}
                      </PremiumButton>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:inline-flex left-0 -translate-x-1/2 h-11 w-11 rounded-full border border-white/10 bg-[#0D0D0D]/80 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20" />
        <CarouselNext className="hidden sm:inline-flex right-0 translate-x-1/2 h-11 w-11 rounded-full border border-white/10 bg-[#0D0D0D]/80 text-[#F5F5F5] hover:bg-[#0D0D0D] hover:border-white/20" />
      </Carousel>

      <div className="mt-6 sm:hidden">
        <p className="text-center text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/55">
          {swipeLabel}
        </p>
      </div>
    </div>
  );
};

export default CaseStudyMoreResults;
