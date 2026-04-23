import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';

interface SeoProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: any;
  alternates?: { hrefLang: string; href: string }[];
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = 'https://kinetora.tech/assets/social/kinetora-social-share.webp',
  jsonLd,
  alternates = [],
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Detect domain for canonical base
  const { lang } = useI18n();
  const isES = lang === 'es';
  const baseUrl = isES ? 'https://kinetora.es' : 'https://kinetora.tech';
  
  // Final canonical URL - Prioritize dynamic path over hardcoded props if props is just the root
  const sanitizedPath = currentPath === '/' ? '' : currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
  const dynamicCanonical = `${baseUrl}${sanitizedPath}`;
  
  // If canonical prop is provided but it's just the root domain and we are on a subpage, use the dynamic one instead
  const finalCanonical = (canonical && (canonical === 'https://kinetora.es/' || canonical === 'https://kinetora.tech/') && currentPath !== '/')
    ? dynamicCanonical
    : (canonical || dynamicCanonical);

  if (typeof window === 'undefined') {
    console.log(`[SEO] SSR Rendering. title: ${title}, lang: ${lang}, canonical: ${finalCanonical}`);
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta data-rh="true" name="title" content={title} />
      {description && <meta data-rh="true" name="description" content={description} />}
      {keywords && <meta data-rh="true" name="keywords" content={keywords} />}
      
      <link data-rh="true" rel="canonical" href={finalCanonical} />
      
      {/* Hreflang Tags */}
      {alternates.map((alt) => (
        <link key={alt.hrefLang} data-rh="true" rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}

      {jsonLd && (
        <meta name="json-ld-ssr" content={JSON.stringify(jsonLd)} data-rh="true" />
      )}
      
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={ogImage} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default Seo;