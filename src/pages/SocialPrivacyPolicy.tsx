"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube, FaFacebook } from "react-icons/fa6";

const ExternalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const SocialPrivacyPolicy = () => {
  const { t } = useI18n();

  const profiles = [
    { nameKey: "social.profile.ig", urlKey: "social.platform.ig.url", icon: <FaInstagram size={18} /> },
    { nameKey: "social.profile.tk", urlKey: "social.platform.tk.url", icon: <FaTiktok size={18} /> },
    { nameKey: "social.profile.x",  urlKey: "social.platform.x.url",  icon: <FaXTwitter size={18} /> },
    { nameKey: "social.profile.yt", urlKey: "social.platform.yt.url", icon: <FaYoutube size={18} /> },
    { nameKey: "social.profile.fb", urlKey: "social.platform.fb.url", icon: <FaFacebook size={18} /> },
  ];

  const purposeItems = ["l1", "l2", "l3", "l4"] as const;

  const interactionBlocks = [
    { titleKey: "social.s4.b1.title", textKey: "social.s4.b1.text",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    { titleKey: "social.s4.b2.title", textKey: "social.s4.b2.text",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    { titleKey: "social.s4.b3.title", textKey: "social.s4.b3.text",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
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
            {t("social.title")}
          </h1>

          <p className="text-[#F5F5F5]/75 text-base md:text-lg mb-8 font-semibold tracking-wide">
            {t("social.subtitle")}
          </p>

          <p className="text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16">
            {t("legal.updated")}
          </p>

          {/* ── 1. NUESTRAS REDES SOCIALES ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s1.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6">
              {t("social.s1.p1")}
            </p>

            {/* Profile cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profiles.map(({ nameKey, urlKey, icon }) => (
                <a
                  key={nameKey}
                  href={t(urlKey)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex items-center justify-between hover:border-[#B454FF]/40 hover:bg-white/[0.07] transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#B454FF]/20 group-hover:text-[#B454FF] transition-colors">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm md:text-base">{t(nameKey)}</h3>
                      <p className="text-[#F5F5F5]/50 text-xs md:text-sm tracking-wide">{t("social.profile.handle")}</p>
                    </div>
                  </div>
                  <div className="text-white/30 group-hover:text-[#B454FF] transition-colors">
                    <ExternalIcon />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* ── 2. RESPONSABILIDAD Y TRATAMIENTO ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s2.title")}
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
              <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
                {t("social.s2.p1")}
              </p>
              <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
                {t("social.s2.p2")}
              </p>
            </div>
          </section>

          {/* ── 3. FINALIDAD DEL USO ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s3.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-4">
              {t("social.s3.p1")}
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <ul className="space-y-3">
                {purposeItems.map((k) => (
                  <li key={k} className="flex items-start gap-3 text-[#F5F5F5]/75 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B454FF] flex-shrink-0 mt-2" />
                    {t(`social.s3.${k}`)}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── 4. INTERACCIONES DE LOS USUARIOS ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s4.title")}
            </h2>
            <div className="space-y-4">
              {interactionBlocks.map((block) => (
                <div
                  key={block.titleKey}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex items-start gap-5"
                >
                  <div className="w-10 h-10 rounded-full bg-[#B454FF]/10 flex-shrink-0 flex items-center justify-center text-[#B454FF]">
                    {block.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-base mb-2">
                      {t(block.titleKey)}
                    </h3>
                    <p className="text-[#F5F5F5]/70 text-sm md:text-base leading-relaxed">
                      {t(block.textKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 5. POLÍTICAS DE PRIVACIDAD DE LAS PLATAFORMAS ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s5.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6">
              {t("social.s5.p1")}
            </p>
            <div className="space-y-3">
              {profiles.map(({ nameKey, urlKey, icon }) => (
                <a
                  key={nameKey}
                  href={t(urlKey)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 hover:border-[#B454FF]/40 hover:bg-white/[0.06] transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#B454FF]/20 group-hover:text-[#B454FF] transition-colors">
                      {icon}
                    </div>
                    <span className="text-white font-semibold text-sm md:text-base">{t(nameKey)}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[#F5F5F5]/40 group-hover:text-[#B454FF] text-xs font-semibold tracking-wide transition-colors">
                    {t("social.s5.see")}
                    <ExternalIcon />
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* ── 6. EJERCICIO DE DERECHOS ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s6.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6">
              {t("social.s6.p1")}
            </p>

            {/* Contact box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-4">
              <a
                href="mailto:hola@kinetora.tech"
                className="text-[#B454FF] font-bold text-base md:text-lg hover:underline block mb-2"
              >
                {t("social.s6.email")}
              </a>
              <p className="text-[#F5F5F5]/50 text-sm italic">
                {t("social.s6.subject")}
              </p>
            </div>

            {/* Note */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#F5F5F5]/40 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#F5F5F5]/50 text-xs leading-relaxed">
                {t("social.s6.note")}
              </p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SocialPrivacyPolicy;