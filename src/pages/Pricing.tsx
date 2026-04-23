import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingSection from '@/components/Pricing';
import SEO from '@/components/SEO';
import { useI18n } from '@/i18n/I18nProvider';

export default function PricingPage() {
  const { lang } = useI18n();
  const isES = lang === 'es';

  const title = isES 
    ? "Planes de Diseño para Startups desde €1.900/mes | Kinetora" 
    : "Monthly Design Subscription for Startups | Kinetora";
  
  const description = isES
    ? "Suscripción de diseño para startups sin permanencia. Entrega en 48h, revisiones ilimitadas y pausa cuando quieras."
    : "Design subscription for startups with no commitment. 48h delivery, unlimited revisions, and pause anytime.";

  const alternates = [
    { hrefLang: 'es', href: 'https://kinetora.es/precios' },
    { hrefLang: 'en', href: 'https://kinetora.tech/precios' },
    { hrefLang: 'x-default', href: 'https://kinetora.tech/precios' }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
      <SEO 
        title={title}
        description={description}
        alternates={alternates}
      />
      <Navbar />
      <main className="pt-24">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
