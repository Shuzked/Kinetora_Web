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
  
  const [isReady, setIsReady] = React.useState(false);
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql?.matches || false);
    setIsReady(true);
    
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    if (mql?.addEventListener) mql.addEventListener("change", onChange);
    return () => {
      if (mql?.removeEventListener) mql.removeEventListener("change", onChange);
    };
  }, []);

  const startStyle: React.CSSProperties = { 
    opacity: 0, 
    transform: (!isReady || !prefersReduced) ? "translateY(20px)" : "none" 
  };

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