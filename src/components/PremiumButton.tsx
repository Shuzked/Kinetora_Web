"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/MagneticButton";

type PremiumButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "glass" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
};

const sizeMap: Record<NonNullable<PremiumButtonProps["size"]>, string> = {
  sm: "min-h-[48px] h-10 md:h-10 px-5 md:px-4 text-xs",
  md: "min-h-[48px] h-12 px-6 text-sm",
  lg: "min-h-[48px] h-14 md:h-16 px-9 md:px-10 text-sm md:text-base",
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
    "inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.18em] md:tracking-[0.24em] rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02]";

  const variants: Record<NonNullable<PremiumButtonProps["variant"]>, string> = {
    primary:
      "text-white bg-[#B454FF] border border-white/10 " +
      "shadow-[0_12px_44px_rgba(180,84,255,0.22)] hover:bg-[#A74CFF] hover:shadow-[0_16px_54px_rgba(180,84,255,0.30)]",
    glass:
      "text-[#F5F5F5] bg-[#1A1A1A] border border-white/[0.12] hover:bg-[#252525] hover:border-white/[0.25] " +
      "shadow-[0_6px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)]",
    outline: "text-[#F5F5F5] border border-white/15 hover:bg-white/5",
    white:
      "text-[#0D0D0D] bg-white border border-white/10 " +
      "shadow-[0_12px_44px_rgba(255,255,255,0.12)] hover:bg-white/95 hover:shadow-[0_16px_54px_rgba(255,255,255,0.16)]",
  };

  return (
    <Button
      disabled={disabled || isLoading}
      className={cn(base, variants[variant], sizeMap[size], className)}
      {...props}
    >
      {/* Contenedor que asegura que el texto se dibuja por encima */}
      <div className="relative z-[1] flex items-center justify-center gap-2 pointer-events-none">
        <MagneticButton>
          <div className="pointer-events-auto flex items-center justify-center gap-2">
            {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
            <span className="shrink-0">{children}</span>
            {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
          </div>
        </MagneticButton>
      </div>
    </Button>
  );
};

export default PremiumButton;