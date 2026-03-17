"use client";

import React from "react";
import DOMPurify from "dompurify";

function enhanceMedia(html: string) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.querySelectorAll("img").forEach((img) => {
    img.setAttribute("loading", img.getAttribute("loading") || "lazy");
    img.setAttribute("decoding", img.getAttribute("decoding") || "async");
    if (!img.getAttribute("width")) img.setAttribute("width", "0"); // deja al navegador calcular; evita CLS si WP no provee
    if (!img.getAttribute("height")) img.setAttribute("height", "0");
  });

  doc.querySelectorAll("iframe").forEach((ifr) => {
    ifr.setAttribute("loading", ifr.getAttribute("loading") || "lazy");
    ifr.setAttribute("referrerpolicy", ifr.getAttribute("referrerpolicy") || "strict-origin-when-cross-origin");
    if (!ifr.getAttribute("title")) ifr.setAttribute("title", "Embedded content");
  });

  return doc.body.innerHTML;
}

export default function WPPostContent({ html }: { html: string }) {
  const sanitized = React.useMemo(
    () =>
      DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ["target", "rel", "loading", "decoding", "referrerpolicy"],
      }),
    [html]
  );

  const enhanced = React.useMemo(() => enhanceMedia(sanitized), [sanitized]);

  return <div className="wp-post" dangerouslySetInnerHTML={{ __html: enhanced }} />;
}