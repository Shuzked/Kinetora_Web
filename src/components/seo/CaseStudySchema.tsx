import React from 'react';
import { Helmet } from 'react-helmet-async';

interface CaseStudySchemaProps {
  study: any;
  lang: string;
}

const CaseStudySchema: React.FC<CaseStudySchemaProps> = ({ study, lang }) => {
  if (!study) return null;
  
  const isEs = lang === 'es';
  const baseUrl = isEs ? 'https://kinetora.es' : 'https://kinetora.tech';
  const siteName = "Kinetora";
  const logoUrl = "https://kinetora.tech/Logotipo.svg";
  
  const title = isEs ? (study.title || study.label) : (study.titleEn || study.labelEn || study.label);
  const description = isEs ? (study.summaryFallback || "") : (study.summaryFallbackEn || study.summaryFallback || "");
  const url = `${baseUrl}/casos/${study.slug}`;
  const image = `${baseUrl}${study.coverImage}`;

  const creativeWork = {
    "@type": "CreativeWork",
    "@id": `${url}#creativework`,
    "name": title,
    "description": description,
    "image": image,
    "author": { "@type": "Organization", "name": "Kinetora" },
    "creator": {
      "@type": "Person",
      "name": "Rafael Muñoz",
      "url": `${baseUrl}/sobre`
    },
    "publisher": { "@type": "Organization", "name": "Kinetora" },
    "url": url,
    "dateCreated": "2024-04-01"
  };

  const articleSchema = {
    "@type": "Article",
    "@id": `${url}#article`,
    "headline": title,
    "description": description,
    "image": image,
    "inLanguage": isEs ? "es" : "en",
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "author": { "@type": "Organization", "name": "Kinetora" },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": logoUrl
      }
    }
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    "itemListElement": [
      { 
        "@type": "ListItem", 
        "position": 1, 
        "name": isEs ? "Inicio" : "Home", 
        "item": baseUrl 
      },
      { 
        "@type": "ListItem", 
        "position": 2, 
        "name": isEs ? "Casos" : "Case Studies", 
        "item": `${baseUrl}/casos` 
      },
      { 
        "@type": "ListItem", 
        "position": 3, 
        "name": study.label || study.slug, 
        "item": url 
      }
    ]
  };

  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      creativeWork,
      articleSchema,
      breadcrumbSchema
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(graphSchema)}
      </script>
    </Helmet>
  );
};

export default CaseStudySchema;
