import DOMPurify from "dompurify";

export type WPPost = {
  slug?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>;
  };
};

export type CaseStudyMeta = {
  img?: string;
  alt?: string;
  excerpt?: string;
  hito?: string;
  metricKind?: "milestone" | "sales" | "organic" | "funding";
  metricValue?: string;
};

export function stripHtml(html: string) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

export function extractHito(text: string) {
  const t = text.replace(/\s+/g, " ");
  const m =
    t.match(/(\+?\d[\d.,]*\s?(?:M€|M\$|M|K€|K\$|K|€|\$|%))/i) ||
    t.match(/(\b\d{2,}\b)(?=\s?(?:ganadores|winners|participantes|users|usuarios))/i);
  return m ? m[0].trim() : null;
}

export function extractMetricKind(
  html: string
): { kind: "milestone" | "sales" | "organic" | "funding"; value: string } | null {
  const text = stripHtml(html).toLowerCase();
  const valueMatch =
    html.match(/[\+\-]?\s?\d[\d.,]*\s?(?:m€|m\$|m|k€|k\$|k|€|\$|%)/i) ||
    html.match(
      /\b\d{2,}\s?(?:usuarios|users|participantes|winners|views|impresiones|impressions|alcance|reach)\b/i
    );

  if (!valueMatch) return null;

  const rawValue = valueMatch[0].trim();
  let kind: "milestone" | "sales" | "organic" | "funding" = "milestone";

  if (/(venta|ventas|sales)/i.test(text)) kind = "sales";
  else if (/(impacto|org[aá]nico|organic|reach|views|impresiones|impressions|alcance)/i.test(text)) kind = "organic";
  else if (/(recaud|inversi|raised|funding)/i.test(text)) kind = "funding";

  return { kind, value: rawValue };
}

const youtubeEmbedHtml = (src: string) => `
  <figure class="wp-block-embed">
    <iframe
      class="wp-embed"
      src="${src}"
      title="YouTube video player"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </figure>
`.trim();

export const injectEmbedsAtPoints = (html: string, embeds: Array<{ point: number; src: string }>) => {
  if (typeof window === "undefined" || !embeds.length) return html;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const headings = Array.from(doc.querySelectorAll("h2, h3, h4"));

  const isPointHeading = (el: Element, n: number) => {
    const t = (el.textContent || "").trim();
    if (new RegExp(`\\b(?:punto|point)\\s*${n}\\b`, "i").test(t)) return true;
    return new RegExp(`^${n}\\s*[.)\\-:]`, "i").test(t) || new RegExp(`^${n}\\s+`, "i").test(t);
  };

  const findPointIdx = (n: number) => headings.findIndex((h) => isPointHeading(h, n));

  const insertBeforeNextPoint = (point: number, htmlToInsert: string) => {
    const i = findPointIdx(point);
    if (i === -1) return;

    const nextHeading = headings.slice(i + 1).find((h) => isPointHeading(h, point + 1));
    const marker = doc.createElement("div");
    marker.innerHTML = htmlToInsert;

    const srcMatch = marker.querySelector("iframe")?.getAttribute("src");
    if (srcMatch && doc.querySelector(`iframe[src='${CSS.escape(srcMatch)}']`)) return;

    if (nextHeading?.parentNode) {
      nextHeading.parentNode.insertBefore(marker, nextHeading);
      return;
    }

    doc.body.appendChild(marker);
  };

  embeds.forEach((embed) => insertBeforeNextPoint(embed.point, youtubeEmbedHtml(embed.src)));
  return doc.body.innerHTML;
};

export const splitWpContentIntoTextAndMedia = (html: string) => {
  if (typeof window === "undefined") return { textHtml: html, mediaHtml: "" };

  const doc = new DOMParser().parseFromString(html, "text/html");
  const mediaSelectors = [
    "iframe",
    "video",
    "img",
    "figure",
    ".wp-block-image",
    ".wp-block-embed",
    ".wp-block-video",
    ".wp-block-gallery",
    ".blocks-gallery-grid",
  ];

  const mediaEls = Array.from(doc.body.querySelectorAll(mediaSelectors.join(",")));

  const mediaHtml = mediaEls
    .map((el) => {
      const wrapper = el.closest(
        "figure, .wp-block-embed, .wp-block-image, .wp-block-video, .wp-block-gallery, .blocks-gallery-grid"
      );
      return (wrapper || el).outerHTML;
    })
    .filter((value, index, arr) => (index === 0 ? true : value !== arr[index - 1]))
    .join("\n");

  mediaEls.forEach((el) => {
    const wrapper = el.closest(
      "figure, .wp-block-embed, .wp-block-image, .wp-block-video, .wp-block-gallery, .blocks-gallery-grid"
    );
    (wrapper || el).remove();
  });

  Array.from(doc.body.querySelectorAll("p, h2, h3, h4, li"))
    .filter((node) => !(node.textContent || "").trim() && node.children.length === 0)
    .forEach((node) => node.remove());

  return { textHtml: doc.body.innerHTML, mediaHtml };
};

export const sanitizeWpHtml = (html: string) => {
  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe", "video", "source", "picture"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "loading",
      "referrerpolicy",
      "controls",
      "playsinline",
      "muted",
      "loop",
      "autoplay",
      "poster",
      "preload",
      "src",
      "srcset",
      "srcSet",
      "type",
      "title",
      "width",
      "height",
    ],
  });

  if (typeof window === "undefined") return clean;

  const doc = new DOMParser().parseFromString(clean, "text/html");

  doc.querySelectorAll("a[target='_blank']").forEach((a) => {
    const rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
    if (!rel.includes("noopener")) rel.push("noopener");
    if (!rel.includes("noreferrer")) rel.push("noreferrer");
    a.setAttribute("rel", rel.join(" "));
  });

  const allowedHosts = new Set([
    "www.youtube.com",
    "youtube.com",
    "player.vimeo.com",
    "vimeo.com",
    "kinetora.tech",
  ]);

  doc.querySelectorAll("iframe").forEach((iframe) => {
    const src = iframe.getAttribute("src") || "";
    try {
      const url = new URL(src, window.location.origin);
      if (!allowedHosts.has(url.hostname)) {
        iframe.remove();
        return;
      }
      iframe.setAttribute("loading", "lazy");
      iframe.classList.add("wp-embed");
    } catch {
      iframe.remove();
    }
  });

  doc.querySelectorAll("video").forEach((video) => {
    video.setAttribute("controls", "true");
    video.setAttribute("playsinline", "true");
    video.classList.add("wp-video");
  });

  return doc.body.innerHTML;
};
