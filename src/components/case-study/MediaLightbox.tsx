"use client";

import React from "react";
import WPPostContent from "@/components/WPPostContent";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type MediaLightboxProps = {
  html: string;
  className?: string;
};

const MediaLightbox: React.FC<MediaLightboxProps> = ({ html, className }) => {
  const [open, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState<string | null>(null);
  const [alt, setAlt] = React.useState<string>("");

  const onContainerClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const img = target.closest("img") as HTMLImageElement | null;
    if (img && img.src) {
      e.preventDefault();
      setSrc(img.src);
      setAlt(img.getAttribute("alt") || "Preview image");
      setOpen(true);
    }
  }, []);

  return (
    <>
      <div
        onClick={onContainerClick}
        className={[
          "wp-post__content wp-post__media",
          // Todas las imágenes dentro muestran cursor de zoom
          "[&_img]:cursor-zoom-in",
          className || "",
        ].join(" ").trim()}
      >
        <WPPostContent html={html} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-[92vw] md:max-w-4xl lg:max-w-5xl border border-white/10 bg-white/10 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-2xl focus:outline-none"
        >
          <DialogTitle className="sr-only">Image preview</DialogTitle>
          <DialogDescription className="sr-only">
            Enlarged preview of the selected deliverable image
          </DialogDescription>
          <div className="relative w-full flex items-center justify-center">
            {src && (
              // Imagen responsiva centrada
              <img
                src={src}
                alt={alt}
                className="max-h-[82vh] md:max-h-[84vh] w-auto h-auto object-contain rounded-xl"
                loading="eager"
                decoding="sync"
              />
            )}
          </div>
          {alt ? (
            <div className="mt-3 text-center text-xs text-[#F5F5F5]/70">
              {alt}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaLightbox;