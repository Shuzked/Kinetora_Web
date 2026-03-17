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
  alternates?: Array<{ hrefLang: string; href: string }>;
  twitterSite?: string;
  twitterCreator?: string;
  localesAlternate?: string[];
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

function setAlternateLinks(alts: Array<{ hrefLang: string; href: string }> | undefined) {
  if (typeof document === "undefined") return;
  // Remove old managed alternates
  document
    .querySelectorAll('link[rel="alternate"][data-seo-managed="true"]')
    .forEach((el) => el.parentElement?.removeChild(el));
  if (!alts || !alts.length) return;
  alts.forEach(({ hrefLang, href }) => {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hrefLang);
    link.setAttribute("href", href);
    link.setAttribute("data-seo-managed", "true");
    document.head.appendChild(link);
  });
}

function setMultiMetaByProperty(property: string, values: string[] | undefined) {
  if (typeof document === "undefined") return;
  // Remove previous managed multi values for this property
  document
    .querySelectorAll(`meta[property="${property}"][data-seo-multi="true"]`)
    .forEach((el) => el.parentElement?.removeChild(el));
  if (!values || !values.length) return;
  values.forEach((val) => {
    const tag = document.createElement("meta");
    tag.setAttribute("property", property);
    tag.setAttribute("content", val);
    tag.setAttribute("data-seo-multi", "true");
    document.head.appendChild(tag);
  });
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
  alternates,
  twitterSite,
  twitterCreator,
  localesAlternate,
}) => {
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    // Clear previous multi metas to avoid stale values on route change
    setMultiMetaByProperty("og:locale:alternate", []);
    setAlternateLinks([]);

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
    if (twitterSite) setMetaByName("twitter:site", twitterSite);
    if (twitterCreator) setMetaByName("twitter:creator", twitterCreator);

    if (robots) {
      setMetaByName("robots", robots);
    }

    setJsonLd(jsonLd);

    // alternates and locale alternates
    setAlternateLinks(alternates);
    if (localesAlternate && localesAlternate.length) {
      setMultiMetaByProperty("og:locale:alternate", localesAlternate);
    }

    // No cleanup: next pages overwrite tags on route change
  }, [title, description, keywords, image, canonical, locale, siteName, ogType, twitterCard, robots, jsonLd, alternates, twitterSite, twitterCreator, localesAlternate]);

  return null;
};

export default SEO;