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
    "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-[0.18em] md:tracking-[0.24em] rounded-xl transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.97]";

  const variants: Record<NonNullable<PremiumButtonProps["variant"]>, string> = {
    primary:
      "text-white bg-[#B454FF] border border-white/10 " +
      "shadow-[0_2px_8px_rgba(180,84,255,0.25),0_1px_2px_rgba(0,0,0,0.1)] hover:brightness-110",
    glass:
      "text-[#F5F5F5] bg-white/10 border border-white/15 backdrop-blur-xl hover:bg-white/15 " +
      "shadow-[0_4px_12px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.05)]",
    outline: "text-[#F5F5F5] border border-[#B454FF] hover:bg-[#B454FF]/10",
    white:
      "text-[#0D0D0D] bg-white border border-white/10 " +
      "shadow-[0_4px_12px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.05)] hover:bg-white/95",
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