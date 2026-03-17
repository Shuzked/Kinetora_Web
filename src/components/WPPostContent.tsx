"use client";

import React from "react";
import DOMPurify from "dompurify";

function enhanceMedia(html: string) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.querySelectorAll("img").forEach((img) => {
    if (!img.getAttribute("loading")) img.setAttribute("loading", "lazy");
    if (!img.getAttribute("decoding")) img.setAttribute("decoding", "async");
    // REMOVED: no establecer width/height=0
  });

  doc.querySelectorAll("iframe").forEach((ifr) => {
    if (!ifr.getAttribute("loading")) ifr.setAttribute("loading", "lazy");
    if (!ifr.getAttribute("referrerpolicy")) ifr.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
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