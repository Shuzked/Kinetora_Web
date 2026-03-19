"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
            {t("privacy.title")}
          </h1>
          
          <p className="text-[#F5F5F5]/75 text-base md:text-lg mb-8 font-semibold tracking-wide">
            {t("privacy.subtitle")}
          </p>

          <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-12">
            {t("privacy.intro")}
          </p>

          <p className="text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16">
            {t("legal.updated")}
          </p>

          {/* 1. RESPONSABLE DEL TRATAMIENTO */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s1.title")}
            </h2>
            <div className="border border-white/10 bg-white/5 rounded-2xl p-6 md:p-8 text-sm md:text-base text-[#F5F5F5]/75 space-y-3">
              <p><strong className="text-white font-semibold">Titular:</strong> Kinetora Studio</p>
              <p><strong className="text-white font-semibold">Email:</strong> hola@kinetora.tech</p>
            </div>
          </section>

          {/* 2. DATOS QUE RECOPILAMOS */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s2.title")}
            </h2>
            <ul className="list-disc pl-5 text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed space-y-2">
              <li>{t("privacy.s2.l1")}</li>
              <li>{t("privacy.s2.l2")}</li>
            </ul>
          </section>

          {/* 3. FINALIDADES */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s3.title")}
            </h2>
            <ul className="list-disc pl-5 text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed space-y-2">
              <li>{t("privacy.s3.l1")}</li>
              <li>{t("privacy.s3.l2")}</li>
              <li>{t("privacy.s3.l3")}</li>
            </ul>
          </section>

          {/* 4. LEGITIMACIÓN */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s4.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("privacy.s4.p1")}
            </p>
          </section>

          {/* 5. CONSERVACIÓN */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s5.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("privacy.s5.p1")}
            </p>
          </section>

          {/* 6. DESTINATARIOS */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s6.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("privacy.s6.p1")}
            </p>
          </section>

          {/* 7. DERECHOS */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s7.title")}
            </h2>
            <ul className="list-disc pl-5 text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed space-y-2 mb-4">
              <li>{t("privacy.s7.l1")}</li>
              <li>{t("privacy.s7.l2")}</li>
              <li>{t("privacy.s7.l3")}</li>
            </ul>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed font-semibold">
              {t("privacy.s7.p1")}
            </p>
          </section>

          {/* 8. MEDIDAS DE SEGURIDAD */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s8.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("privacy.s8.p1")}
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;