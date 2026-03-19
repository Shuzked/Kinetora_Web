"use client";

import React from "react";

type RevealOptions = {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useReveal<T extends HTMLElement>(opts: RevealOptions = {}) {
  const ref = React.useRef<T | null>(null);
  const [visible, setVisible] = React.useState(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced) {
      setVisible(true);
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (opts.once !== false) {
              io.disconnect();
            }
          }
        });
      },
      {
        root: null,
        rootMargin: opts.rootMargin ?? "0px 0px -10% 0px",
        threshold: opts.threshold ?? 0.1,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [opts.once, opts.rootMargin, opts.threshold, prefersReduced]);

  return { ref, visible };
}