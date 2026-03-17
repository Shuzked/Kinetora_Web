import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import WPPostContent from "@/components/WPPostContent";

type CaseStudyColumnsProps = {
  loading: boolean;
  textHtml: string;
  mediaHtml: string;
  stickySide: "left" | "right" | null;
  textLabel: string;
  mediaLabel: string;
  textWrapRef: React.RefObject<HTMLElement | null>;
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
    <section className="grid lg:grid-cols-[1fr_420px] gap-6 lg:gap-8 items-start">
      <article
        ref={textWrapRef}
        className={`wp-post self-start ${stickySide === "left" ? "lg:sticky lg:top-[108px]" : ""}`}
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
      </article>

      <aside className="self-start">
        <div
          ref={mediaWrapRef}
          className={`wp-media ${stickySide === "right" ? "lg:sticky lg:top-[108px]" : ""}`}
        >
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
            <div className="wp-post__content wp-post__media">
              <WPPostContent html={mediaHtml} />
            </div>
          )}
        </div>
      </aside>
    </section>
  );
};

export default CaseStudyColumns;