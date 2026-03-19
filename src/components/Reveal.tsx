"use client";

import React from "react";
import { useReveal } from "@/hooks/useReveal";

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
  delayMs?: number;
  children: React.ReactNode;
};

const Reveal: React.FC<RevealProps> = ({ as = "div", delayMs = 0, className, style, children, ...rest }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag: any = as;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const startStyle: React.CSSProperties = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, transform: "translateY(20px)" };

  const endStyle: React.CSSProperties = { opacity: 1, transform: "translateY(0)" };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...(visible ? endStyle : startStyle),
        transition: prefersReduced
          ? "opacity 300ms ease-out"
          : "opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), transform 650ms cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delayMs}ms`,
        willChange: "transform, opacity",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;