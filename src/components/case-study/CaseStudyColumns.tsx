import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import WPPostContent from "@/components/WPPostContent";
import MediaLightbox from "@/components/case-study/MediaLightbox";

type CaseStudyColumnsProps = {
  loading: boolean;
  textHtml: string;
  mediaHtml: string;
  stickySide: "left" | "right" | null;
  textLabel: string;
  mediaLabel: string;
  textWrapRef: React.RefObject<HTMLDivElement | null>;
  mediaWrapRef: React.RefObject<HTMLDivElement | null>;
};

const CaseStudyColumns = ({
  loading,
  textHtml,
  mediaHtml,
  stickySide,
  textLabel,
  mediaLabel,
  textWrapRef,
  mediaWrapRef,
}: CaseStudyColumnsProps) => {
  return (
    <section className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch relative">
      <div
        ref={textWrapRef}
        className={`wp-post flex-1 lg:h-fit ${
          stickySide === "left" ? "lg:sticky lg:bottom-[20px] lg:self-end" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60">
            {textLabel}
          </div>
        </div>

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
          <div className="wp-post__content">
            <WPPostContent html={textHtml} />
          </div>
        )}
      </div>

      <div
        ref={mediaWrapRef}
        className={`w-full lg:w-[420px] flex-shrink-0 lg:h-fit ${
          stickySide === "right" ? "lg:sticky lg:bottom-[20px] lg:self-end" : ""
        }`}
      >
        <div className="wp-media">
          <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60 mb-5">
            {mediaLabel}
          </div>

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
          ) : (
            <MediaLightbox html={mediaHtml} />
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyColumns;