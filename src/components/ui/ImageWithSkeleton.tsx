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

  return (
    <div className={cn("relative w-full h-full", containerClassName)}>
      {!isLoaded && (
        <Skeleton
          className={cn("absolute inset-0 z-10 w-full h-full rounded-none", skeletonClassName)}
        />
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
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
    </div>
  );
}
