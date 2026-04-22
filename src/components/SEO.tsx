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
  
  // Final canonical URL
  const finalCanonical = canonical || `${baseUrl}${currentPath === '/' ? '' : currentPath}`;

  if (typeof window === 'undefined') {
    console.log(`[SEO] SSR Rendering. title: ${title}, lang: ${lang}, canonical: ${finalCanonical}`);
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      
      <link rel="canonical" href={finalCanonical} />
      
      {/* Hreflang Tags */}
      {alternates.map((alt) => (
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}
      
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={ogImage} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;