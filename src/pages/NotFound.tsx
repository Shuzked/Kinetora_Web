import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumButton from "@/components/PremiumButton";
import { useI18n } from "@/i18n/I18nProvider";
// SEO
import SEO from "@/components/SEO";
import { getSeoDefaults } from "@/seo/defaults";

const NotFound = () => {
  const { lang } = useI18n();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const copy =
    lang === "es"
      ? {
          title: "Esta página no existe.",
          subA: "La ruta",
          subB: "no está disponible.",
          back: "Volver al inicio",
          cases: "Ver casos",
        }
      : {
          title: "This page doesn't exist.",
          subA: "The route",
          subB: "is not available.",
          back: "Back to home",
          cases: "View case studies",
        };

  const seo = getSeoDefaults(lang);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = `${origin}${location.pathname}`;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <SEO
        title={lang === "es" ? `404 — ${seo.siteName}` : `404 — ${seo.siteName}`}
        description={lang === "es" ? "La página solicitada no existe." : "The requested page does not exist."}
        keywords={seo.keywords}
        image={seo.shareImage}
        canonical={canonical}
        locale={seo.locale}
        siteName={seo.siteName}
        ogType="website"
        twitterCard="summary"
        robots="noindex,nofollow"
      />
      <Navbar />
      <main className="pt-[68px] md:pt-[88px]">
        <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                404
              </div>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                {copy.title}
              </h1>
              <p className="mt-4 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed">
                {copy.subA}{" "}
                <span className="text-[#F5F5F5] font-semibold">{location.pathname}</span>{" "}
                {copy.subB}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/">
                  <PremiumButton variant="primary" size="md" className="w-full sm:w-auto">
                    {copy.back.toUpperCase()}
                  </PremiumButton>
                </Link>
                <Link to="/casos">
                  <PremiumButton variant="glass" size="md" className="w-full sm:w-auto">
                    {copy.cases.toUpperCase()}
                  </PremiumButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;