import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { d as cn } from "./entry-server.C4bir1NN.js";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}
function ImageWithSkeleton({
  src,
  alt,
  className,
  skeletonClassName,
  containerClassName,
  onLoad,
  onError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isWebp = typeof src === "string" && src.toLowerCase().endsWith(".webp");
  const srcOriginal = src;
  const srcWebp = isWebp ? src : typeof src === "string" ? src.replace(/\.(png|jpg|jpeg)$/i, ".webp") : src;
  const handleError = (e) => {
    setHasError(true);
    setIsLoaded(true);
    onError == null ? void 0 : onError(e);
  };
  if (hasError) {
    return /* @__PURE__ */ jsx("div", { className: cn("img-fallback-container", containerClassName) });
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("img-fallback-container", containerClassName), children: [
    !isLoaded && /* @__PURE__ */ jsx(
      Skeleton,
      {
        className: cn("absolute inset-0 z-10 w-full h-full rounded-none bg-white/5", skeletonClassName)
      }
    ),
    /* @__PURE__ */ jsxs("picture", { className: "w-full h-full", children: [
      srcWebp !== srcOriginal && /* @__PURE__ */ jsx("source", { srcSet: srcWebp, type: "image/webp" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: srcOriginal,
          alt,
          decoding: "async",
          onLoad: (e) => {
            setIsLoaded(true);
            onLoad == null ? void 0 : onLoad(e);
          },
          onError: handleError,
          className: cn(
            "transition-opacity duration-500 w-full h-full object-cover",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          ),
          ...props
        }
      )
    ] })
  ] });
}
export {
  ImageWithSkeleton as I,
  Skeleton as S
};
