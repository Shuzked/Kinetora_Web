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
  onError,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Fallback logic: check if src is webp to provide a png/jpg fallback, and vice versa
  const isWebp = typeof src === 'string' && src.toLowerCase().endsWith('.webp');
  
  // If we are currently pointing to a .webp, the fallback should be the same name but .png or .jpg
  // This is a heuristic since we don't know the exact original extension
  const srcOriginal = src;
  const srcWebp = isWebp ? src : (typeof src === 'string' ? src.replace(/\.(png|jpg|jpeg)$/i, '.webp') : src);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If the error happened on the fallback, we hide the whole thing
    setHasError(true);
    setIsLoaded(true);
    onError?.(e);
  };

  if (hasError) {
    return <div className={cn("img-fallback-container", containerClassName)} />;
  }

  return (
    <div className={cn("img-fallback-container", containerClassName)}>
      {!isLoaded && (
        <Skeleton
          className={cn("absolute inset-0 z-10 w-full h-full rounded-none bg-white/5", skeletonClassName)}
        />
      )}
      <picture className="w-full h-full">
        {srcWebp !== srcOriginal && (
           <source srcSet={srcWebp} type="image/webp" />
        )}
        <img
          src={srcOriginal}
          alt={alt}
          decoding="async"
          onLoad={(e) => {
            setIsLoaded(true);
            onLoad?.(e);
          }}
          onError={handleError}
          className={cn(
            "transition-opacity duration-500 w-full h-full object-cover",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          {...props}
        />
      </picture>
    </div>
  );
}
