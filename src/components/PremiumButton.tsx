"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PremiumButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
};

const sizeMap: Record<NonNullable<PremiumButtonProps["size"]>, string> = {
  sm: "h-10 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 md:h-16 px-9 md:px-10 text-sm md:text-base",
};

const PremiumButton: React.FC<PremiumButtonProps> = ({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  children,
  isLoading = false,
  disabled,
  ...props
}) => {
  const base =
    // Esquinas pill unificadas, tipografía y microinteracciones consistentes
    "inline-flex items-center justify-center rounded-full font-bold tracking-[0.2em] transition-all duration-200 group " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#B454FF] " +
    "hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<NonNullable<PremiumButtonProps["variant"]>, string> = {
    primary:
      "text-white bg-gradient-to-r from-[#B454FF] to-[#8A2BE2] " +
      "shadow-[0_10px_40px_rgba(180,84,255,0.22)] hover:shadow-[0_14px_46px_rgba(180,84,255,0.30)]",
    glass:
      "text-[#F5F5F5] bg-white/10 border border-white/15 backdrop-blur-xl hover:bg-white/14 " +
      "shadow-[0_6px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)]",
    outline:
      "text-[#F5F5F5] border border-white/15 hover:bg-white/5",
  };

  return (
    <Button
      disabled={disabled || isLoading}
      className={cn(base, variants[variant], sizeMap[size], className)}
      {...props}
    >
      {leftIcon ? <span className="mr-2 -ml-1 flex items-center">{leftIcon}</span> : null}
      <span className={cn(isLoading && "opacity-0")}>{children}</span>
      {rightIcon ? <span className="ml-2 -mr-1 flex items-center">{rightIcon}</span> : null}
      {isLoading && (
        <span
          aria-hidden
          className="absolute inline-flex animate-spin rounded-full border-2 border-white/60 border-t-transparent h-4 w-4"
        />
      )}
    </Button>
  );
};

export default PremiumButton;