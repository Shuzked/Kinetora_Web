"use client";

import React from "react";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[] | string;
  image?: string;
  canonical?: string;
  locale?: string;
  siteName?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  robots?: string; // e.g. "index,follow" | "noindex,nofollow"
  jsonLd?: Record<string, any> | null;
};

function setMetaByName(name: string, content: string, managed = true) {
  if (typeof document === "undefined") return;
  let tag = document.querySelector(`meta[name="${name}"]${managed ? '[data-seo-managed="true"]' : ""}`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    if (managed) tag.setAttribute("data-seo-managed", "true");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string, managed = true) {
  if (typeof document === "undefined") return;
  let tag = document.querySelector(`meta[property="${property}"]${managed ? '[data-seo-managed="true"]' : ""}`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    if (managed) tag.setAttribute("data-seo-managed", "true");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  if (typeof document === "undefined") return;
  let link = document.querySelector('link[rel="canonical"][data-seo-managed="true"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("data-seo-managed", "true");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function setJsonLd(data: Record<string, any> | null) {
  if (typeof document === "undefined") return;
  let script = document.getElementById("seo-jsonld") as HTMLScriptElement | null;
  if (!data) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.id = "seo-jsonld";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(data);
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  canonical,
  locale,
  siteName = "Kinetora",
  ogType = "website",
  twitterCard = "summary_large_image",
  robots,
  jsonLd = null,
}) => {
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    if (title) {
      document.title = title;
      setMetaByProperty("og:title", title);
      setMetaByName("twitter:title", title);
    }
    if (description) {
      setMetaByName("description", description);
      setMetaByProperty("og:description", description);
      setMetaByName("twitter:description", description);
    }

    const kw = Array.isArray(keywords) ? keywords.join(", ") : keywords;
    if (kw && kw.trim().length > 0) {
      setMetaByName("keywords", kw);
    }

    const url =
      canonical ||
      (typeof window !== "undefined" ? window.location.href.split("#")[0] : undefined);
    if (url) {
      setMetaByProperty("og:url", url);
      setCanonical(url);
    }

    setMetaByProperty("og:type", ogType);
    setMetaByProperty("og:site_name", siteName);
    if (locale) setMetaByProperty("og:locale", locale);

    if (image) {
      setMetaByProperty("og:image", image);
      setMetaByName("twitter:image", image);
    }

    setMetaByName("twitter:card", twitterCard);

    if (robots) {
      setMetaByName("robots", robots);
    }

    setJsonLd(jsonLd);

    // No cleanup: next pages overwrite tags on route change
  }, [title, description, keywords, image, canonical, locale, siteName, ogType, twitterCard, robots, jsonLd]);

  return null;
};

export default SEO;