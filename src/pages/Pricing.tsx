import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingSection from '@/components/Pricing';
import SEO from '@/components/SEO';
import { useI18n } from '@/i18n/I18nProvider';

const PricingPage = () => {
  const { lang } = useI18n();
  const isES = lang === 'es';

  const title = isES 
    ? "Suscripción de Diseño Mensual para Startups | Kinetora" 
    : "Monthly Design Subscription for Startups | Kinetora";
  
  const description = isES
    ? "Suscripción de diseño mensual sin permanencia. Entregas en 48h para startups Seed y Series A/B. Pausa o cancela cuando quieras."
    : "Monthly design subscription with no commitment. 48h delivery for Seed and Series A/B startups. Pause or cancel anytime.";

  const alternates = [
    { hrefLang: 'es', href: 'https://kinetora.es/precios' },
    { hrefLang: 'en', href: 'https://kinetora.tech/pricing' },
    { hrefLang: 'x-default', href: 'https://kinetora.tech/pricing' }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
      <SEO 
        title={title}
        description={description}
        alternates={isES ? alternates : alternates.map(a => ({ ...a, href: a.href.replace('/precios', '/pricing') }))}
      />
      <Navbar />
      <main className="pt-24">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
