import { jsx } from "react/jsx-runtime";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
const StackingSection = ({ children, index, className = "" }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
    // Track as the section moves from top of viewport to fully out
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: `relative min-h-screen ${className}`,
      style: {
        zIndex: (index + 1) * 10
        // Incremental z-index (10, 20, 30...)
      },
      children: /* @__PURE__ */ jsx(
        motion.section,
        {
          style: {
            scale,
            opacity,
            position: "sticky",
            top: 0
          },
          className: "min-h-screen flex flex-col items-center justify-center overflow-hidden",
          children
        }
      )
    }
  );
};
export {
  StackingSection as default
};
