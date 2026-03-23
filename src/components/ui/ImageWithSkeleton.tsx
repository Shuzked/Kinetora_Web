"use client";

import React, { useState } from "react";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
  containerClassName?: string;
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  skeletonClassName,
  containerClassName,
  onLoad,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generamos la ruta WebP asumiendo que el script de conversión se ha ejecutado
  const srcWebp = typeof src === 'string' ? src.replace(/\.(png|jpg|jpeg)$/i, '.webp') : src;

  return (
    <div className={cn("relative w-full h-full", containerClassName)}>
      {!isLoaded && (
        <Skeleton
          className={cn("absolute inset-0 z-10 w-full h-full rounded-none", skeletonClassName)}
        />
      )}
      <picture className="w-full h-full">
        {typeof src === 'string' && src.match(/\.(png|jpg|jpeg)$/i) && (
          <source srcSet={srcWebp} type="image/webp" />
        )}
        <img
          src={src}
          alt={alt}
          decoding="async"
          onLoad={(e) => {
            setIsLoaded(true);
            onLoad?.(e);
          }}
          className={cn(
            "transition-opacity duration-500 w-full h-full",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          {...props}
        />
      </picture>
    </div>
  );
}
