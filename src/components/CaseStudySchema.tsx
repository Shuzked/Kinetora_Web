import React from 'react';
import { useI18n } from '@/i18n/I18nProvider';

interface CaseStudySchemaProps {
  title: string;
  description: string;
  url: string;
  label: string;
  slug: string;
}

const CaseStudySchema: React.FC<CaseStudySchemaProps> = ({ 
  title, 
  description, 
  url, 
  label,
  slug 
}) => {
  const { lang } = useI18n();
  const isES = lang === 'es';
  
  const baseUrl = isES ? 'https://kinetora.es' : 'https://kinetora.tech';
  const urlId = `${baseUrl}/casos/${slug}`;
  
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${urlId}#creativework`,
        "name": title,
        "description": description,
        "url": urlId,
        "author": { "@type": "Organization", "name": "Kinetora" }
      },
      {
        "@type": "Article",
        "@id": `${urlId}#article`,
        "headline": title,
        "description": description,
        "mainEntityOfPage": { "@type": "WebPage", "@id": urlId },
        "author": { "@type": "Organization", "name": "Kinetora" },
        "publisher": {
          "@type": "Organization",
          "name": "Kinetora",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/Logotipo.svg`
          }
        },
        "image": `${baseUrl}/assets/social/kinetora-social-share.webp`
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${urlId}#breadcrumb`,
        "itemListElement": [
          { 
            "@type": "ListItem", 
            "position": 1, 
            "name": isES ? "Inicio" : "Home", 
            "item": baseUrl 
          },
          { 
            "@type": "ListItem", 
            "position": 2, 
            "name": isES ? "Casos" : "Case Studies", 
            "item": `${baseUrl}/casos` 
          },
          { 
            "@type": "ListItem", 
            "position": 3, 
            "name": label, 
            "item": urlId 
          }
        ]
      }
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(graphSchema)}
    </script>
  );
};

export default CaseStudySchema;
