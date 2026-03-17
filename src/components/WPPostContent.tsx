"use client";

import React from "react";
import DOMPurify from "dompurify";

function enhanceMedia(html: string) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.querySelectorAll("img").forEach((img) => {
    if (!img.getAttribute("loading")) img.setAttribute("loading", "lazy");
    if (!img.getAttribute("decoding")) img.setAttribute("decoding", "async");
    if (!img.getAttribute("fetchpriority")) img.setAttribute("fetchpriority", "low");
    // Tamaños responsivos por defecto (420px en columna de entregables en pantallas grandes)
    if (!img.getAttribute("sizes")) img.setAttribute("sizes", "(min-width:1024px) 420px, 100vw");
    // Clases utilitarias para responsividad
    const cls = new Set((img.getAttribute("class") || "").split(/\s+/).filter(Boolean));
    ["max-w-full","w-full","h-auto","block","rounded-xl","bg-transparent"].forEach(c => cls.add(c));
    img.setAttribute("class", Array.from(cls).join(" "));
  });

  doc.querySelectorAll("figure").forEach((fig) => {
    const cls = new Set((fig.getAttribute("class") || "").split(/\s+/).filter(Boolean));
    ["rounded-2xl","overflow-hidden","bg-white/[0.06]","mb-4"].forEach(c => cls.add(c));
    fig.setAttribute("class", Array.from(cls).join(" "));
  });

  doc.querySelectorAll("iframe").forEach((ifr) => {
    if (!ifr.getAttribute("loading")) ifr.setAttribute("loading", "lazy");
    if (!ifr.getAttribute("referrerpolicy")) ifr.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    if (!ifr.getAttribute("title")) ifr.setAttribute("title", "Embedded content");
    // Quitar width/height fijos y forzar ajuste al contenedor
    ifr.removeAttribute("width");
    ifr.removeAttribute("height");
    const cls = new Set((ifr.getAttribute("class") || "").split(/\s+/).filter(Boolean));
    ["absolute","inset-0","w-full","h-full"].forEach(c => cls.add(c));
    ifr.setAttribute("class", Array.from(cls).join(" "));
    // Envolver cada iframe en un contenedor 16:9 responsivo
    const wrapper = doc.createElement("div");
    wrapper.setAttribute("class", "relative w-full aspect-video overflow-hidden rounded-xl bg-white/[0.06] mb-4");
    const parent = ifr.parentNode;
    if (parent) {
      parent.insertBefore(wrapper, ifr);
      wrapper.appendChild(ifr);
    }
  });

  return doc.body.innerHTML;
}

export default function WPPostContent({ html }: { html: string }) {
  const sanitized = React.useMemo(
    () =>
      DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
        ADD_TAGS: ["iframe", "video", "source"],
        ADD_ATTR: [
          "target",
          "rel",
          "loading",
          "decoding",
          "referrerpolicy",
          "allow",
          "allowfullscreen",
          "frameborder",
          "scrolling",
          "controls",
          "playsinline",
          "muted",
          "loop",
          "autoplay",
          "poster",
          "preload",
          "src",
          "type",
          "title",
          "width",
          "height",
        ],
      }),
    [html]
  );

  const enhanced = React.useMemo(() => enhanceMedia(sanitized), [sanitized]);

  return <div className="wp-post" dangerouslySetInnerHTML={{ __html: enhanced }} />;
}