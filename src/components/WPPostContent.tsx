"use client";

import React from "react";
import DOMPurify from "dompurify";

export default function WPPostContent({ html }: { html: string }) {
  const sanitized = React.useMemo(
    () =>
      DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ["target", "rel", "loading", "decoding", "referrerpolicy"],
      }),
    [html]
  );

  return (
    <div
      className="wp-post"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
