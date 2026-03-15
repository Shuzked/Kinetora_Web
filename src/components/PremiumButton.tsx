"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PremiumButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
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
  className,
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-bold tracking-[0.2em] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#B454FF]";
  const variants: Record<NonNullable<PremiumButtonProps["variant"]>, string> = {
    primary:
      // Degradado morado + glow sutil + hover elegante
      "text-white bg-gradient-to-r from-[#B454FF] to-[#8A2BE2] shadow-[0_10px_40px_rgba(180,84,255,0.25)] hover:shadow-[0_14px_44px_rgba(180,84,255,0.32)]",
    glass:
      // Fondo translúcido con desenfoque y borde sutil (glass)
      "text-[#F5F5F5] bg-white/10 border border-white/15 backdrop-blur-xl hover:bg-white/14",
    outline:
      "text-[#F5F5F5] border border-white/15 hover:bg-white/5",
  };

  return (
    <Button
      className={cn(base, variants[variant], sizeMap[size], className)}
      {...props}
    >
      {leftIcon ? <span className="mr-2 -ml-1 flex items-center">{leftIcon}</span> : null}
      {children}
    </Button>
  );
};

export default PremiumButton;