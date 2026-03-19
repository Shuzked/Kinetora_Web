"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "react-router-dom";

const SocialPrivacyPolicy = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-[#030303] text-[#F5F5F5]">
      <Navbar />
      <main className="pt-[100px] md:pt-[120px] pb-24">
        <div className="mx-auto w-full max-w-[800px] px-6 lg:px-0">
          
          <Link to="/" className="inline-block text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 hover:text-white transition-colors mb-4 uppercase">
            {t("legal.back")}
          </Link>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.14em] uppercase text-[#F5F5F5] mb-4">
            {t("social.title")}
          </h1>
          
          <p className="text-[#F5F5F5]/75 text-base md:text-lg mb-8 font-semibold tracking-wide">
            {t("social.subtitle")}
          </p>

          <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-12">
            {t("social.intro")}
          </p>

          <p className="text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16">
            {t("legal.updated")}
          </p>

          {/* 1. NUESTROS PERFILES */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s1.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("social.s1.p1")}
            </p>
          </section>

          {/* 2. RESPONSABILIDAD Y TRATAMIENTO */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s2.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("social.s2.p1")}
            </p>
          </section>

          {/* 3. FINALIDAD DEL USO */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s3.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("social.s3.p1")}
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SocialPrivacyPolicy;