"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const { t } = useI18n();

  const rights = [
    {
      titleKey: "privacy.s6.r1.title",
      descKey: "privacy.s6.r1.desc",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      titleKey: "privacy.s6.r2.title",
      descKey: "privacy.s6.r2.desc",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      titleKey: "privacy.s6.r3.title",
      descKey: "privacy.s6.r3.desc",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
    {
      titleKey: "privacy.s6.r4.title",
      descKey: "privacy.s6.r4.desc",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
    },
    {
      titleKey: "privacy.s6.r5.title",
      descKey: "privacy.s6.r5.desc",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      titleKey: "privacy.s6.r6.title",
      descKey: "privacy.s6.r6.desc",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
    },
  ];

  const s3rows = [
    { f: "privacy.s3.r1.finalidad", b: "privacy.s3.r1.base", p: "privacy.s3.r1.plazo" },
    { f: "privacy.s3.r2.finalidad", b: "privacy.s3.r2.base", p: "privacy.s3.r2.plazo" },
    { f: "privacy.s3.r3.finalidad", b: "privacy.s3.r3.base", p: "privacy.s3.r3.plazo" },
    { f: "privacy.s3.r4.finalidad", b: "privacy.s3.r4.base", p: "privacy.s3.r4.plazo" },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-[#F5F5F5]">
      <Navbar />
      <main className="pt-[100px] md:pt-[120px] pb-24">
        <div className="mx-auto w-full max-w-[800px] px-6 lg:px-0">

          {/* Back link */}
          <Link
            to="/"
            className="inline-block text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 hover:text-white transition-colors mb-4 uppercase"
          >
            {t("legal.back")}
          </Link>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.14em] uppercase text-[#F5F5F5] mb-4">
            {t("privacy.title")}
          </h1>

          <p className="text-[#F5F5F5]/75 text-base md:text-lg mb-8 font-semibold tracking-wide">
            {t("privacy.subtitle")}
          </p>

          <p className="text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16">
            {t("legal.updated")}
          </p>

          {/* ── 1. RESPONSABLE DEL TRATAMIENTO ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s1.title")}
            </h2>
            <div className="border border-white/10 bg-white/5 rounded-2xl p-6 md:p-8 space-y-6">
              <div>
                <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF] block mb-1">
                  {t("privacy.s1.l1.label")}
                </span>
                <p className="text-white font-medium text-base md:text-lg">
                  {t("privacy.s1.l1.value")}
                </p>
              </div>
              <div>
                <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF] block mb-1">
                  {t("privacy.s1.l2.label")}
                </span>
                <a
                  href="mailto:hola@kinetora.tech"
                  className="text-[#B454FF] font-medium text-base md:text-lg hover:underline"
                >
                  {t("privacy.s1.l2.value")}
                </a>
              </div>
              <div>
                <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF] block mb-1">
                  {t("privacy.s1.l3.label")}
                </span>
                <p className="text-white font-medium text-base md:text-lg">
                  {t("privacy.s1.l3.value")}
                </p>
              </div>
            </div>
          </section>

          {/* ── 2. DATOS QUE RECOPILAMOS ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s2.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6">
              {t("privacy.s2.p1")}
            </p>

            <div className="space-y-6">
              {/* Datos directos */}
              <div className="border border-white/10 bg-white/5 rounded-2xl p-6 md:p-8">
                <p className="text-white font-bold text-sm md:text-base mb-4 tracking-wide">
                  {t("privacy.s2.subtitle1")}
                </p>
                <ul className="space-y-2">
                  {["l1","l2","l3","l4","l5"].map((k) => (
                    <li key={k} className="flex items-center gap-3 text-[#F5F5F5]/75 text-sm md:text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B454FF] flex-shrink-0" />
                      {t(`privacy.s2.${k}`)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Datos de navegación */}
              <div className="border border-white/10 bg-white/5 rounded-2xl p-6 md:p-8">
                <p className="text-white font-bold text-sm md:text-base mb-3 tracking-wide">
                  {t("privacy.s2.subtitle2")}
                </p>
                <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
                  {t("privacy.s2.p2")}
                </p>
              </div>
            </div>
          </section>

          {/* ── 3. FINALIDADES Y BASES LEGALES ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s3.title")}
            </h2>
            <div className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-3 gap-4 px-6 py-3 bg-white/5 border-b border-white/10">
                <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF]">
                  {t("privacy.s3.col.finalidad")}
                </span>
                <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF]">
                  {t("privacy.s3.col.base")}
                </span>
                <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#B454FF]">
                  {t("privacy.s3.col.plazo")}
                </span>
              </div>
              {/* Rows */}
              {s3rows.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 px-6 py-4 text-sm md:text-base ${
                    i < s3rows.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <p className="text-[#F5F5F5] font-medium">{t(row.f)}</p>
                  <p className="text-[#F5F5F5]/60 md:text-[#F5F5F5]/75">{t(row.b)}</p>
                  <p className="text-[#B454FF] font-semibold">{t(row.p)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 4. DESTINATARIOS DE LOS DATOS ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s4.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-4">
              {t("privacy.s4.p1")}
            </p>
            <div className="border border-white/10 bg-white/5 rounded-2xl p-6 md:p-8">
              <ul className="space-y-3">
                {["l1","l2","l3","l4"].map((k) => (
                  <li key={k} className="flex items-center gap-3 text-[#F5F5F5]/75 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B454FF] flex-shrink-0" />
                    {t(`privacy.s4.${k}`)}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── 5. TRANSFERENCIAS INTERNACIONALES ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s5.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("privacy.s5.p1")}
            </p>
          </section>

          {/* ── 6. TUS DERECHOS ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s6.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6">
              {t("privacy.s6.p1")}
            </p>

            {/* Rights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {rights.map((r) => (
                <div
                  key={r.titleKey}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5"
                >
                  <div className="w-10 h-10 rounded-full bg-[#B454FF]/10 flex-shrink-0 flex items-center justify-center text-[#B454FF]">
                    {r.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base mb-1">
                      {t(r.titleKey)}
                    </h4>
                    <p className="text-[#F5F5F5]/60 text-sm leading-relaxed">
                      {t(r.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* AEPD note */}
            <p className="text-[#F5F5F5]/60 text-sm leading-relaxed">
              {t("privacy.s6.aepd")}{" "}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B454FF] hover:underline"
              >
                www.aepd.es
              </a>
              .
            </p>
          </section>

          {/* ── 7. SEGURIDAD DE LOS DATOS ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("privacy.s7.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("privacy.s7.p1")}
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;