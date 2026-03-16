"use client";

import * as React from "react";

type Config = { selector: string; varName: string };

export function useEqualizeHeights(
  containerRef: React.RefObject<HTMLElement | null>,
  configs: Config[],
  deps: React.DependencyList = []
) {
  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let observers: ResizeObserver[] = [];

    const computeFor = (cfg: Config) => {
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(cfg.selector));
      if (!nodes.length) return;
      let max = 0;
      nodes.forEach((n) => {
        // Reset to measure natural height
        n.style.removeProperty("minHeight");
      });
      nodes.forEach((n) => {
        const h = n.offsetHeight;
        if (h > max) max = h;
      });
      root.style.setProperty(cfg.varName, `${max}px`);
      nodes.forEach((n) => {
        n.style.minHeight = `var(${cfg.varName})`;
      });
      return nodes;
    };

    const setup = () => {
      const observed: HTMLElement[] = [];
      configs.forEach((cfg) => {
        const nodes = computeFor(cfg);
        if (nodes) observed.push(...nodes);
      });

      // Observe changes
      observed.forEach((el) => {
        const ro = new ResizeObserver(() => {
          configs.forEach((cfg) => computeFor(cfg));
        });
        ro.observe(el);
        observers.push(ro);
      });
    };

    const onResize = () => {
      configs.forEach((cfg) => computeFor(cfg));
    };

    setup();
    window.addEventListener("resize", onResize);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}