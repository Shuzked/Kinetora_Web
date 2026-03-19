"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "react-router-dom";

const LegalNotice = () => {
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
            {t("legal.title")}
          </h1>
          
          <p className="text-[#F5F5F5]/75 text-base md:text-lg mb-8">
            {t("legal.subtitle")}
          </p>

          <p className="text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16">
            {t("legal.updated")}
          </p>

          {/* 1. OWNER IDENTIFICATION */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("legal.s1.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6">
              {t("legal.s1.p1")}
            </p>
            <div className="kin-card space-y-3">
              <p><strong className="text-white font-semibold">{t("legal.s1.company")}:</strong> Kinetora Studio S.L.</p>
              <p><strong className="text-white font-semibold">{t("legal.s1.address")}:</strong> España</p>
              <p><strong className="text-white font-semibold">{t("legal.s1.cif")}:</strong> {t("legal.s1.cif.val")}</p>
              <p><strong className="text-white font-semibold">{t("legal.s1.email")}:</strong> hola@kinetora.tech</p>
              <p><strong className="text-white font-semibold">{t("legal.s1.web")}:</strong> https://kinetora.tech</p>
            </div>
          </section>

          {/* 2. PURPOSE AND SCOPE */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("legal.s2.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-4">
              {t("legal.s2.p1")}
            </p>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("legal.s2.p2")}
            </p>
          </section>

          {/* 3. INTELLECTUAL AND INDUSTRIAL PROPERTY */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("legal.s3.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-4">
              {t("legal.s3.p1")}
            </p>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("legal.s3.p2")}
            </p>
          </section>

          {/* 4. LIABILITY */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("legal.s4.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("legal.s4.p1")}
            </p>
          </section>

          {/* 5. APPLICABLE LAW AND JURISDICTION */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("legal.s5.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("legal.s5.p1")}
            </p>
          </section>

          {/* 6. MODIFICATIONS */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("legal.s6.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("legal.s6.p1")}
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalNotice;