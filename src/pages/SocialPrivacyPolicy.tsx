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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: t("social.profile.ig"), handle: t("social.profile.handle") },
                { name: t("social.profile.tk"), handle: t("social.profile.handle") },
                { name: t("social.profile.x"), handle: t("social.profile.handle") },
                { name: t("social.profile.yt"), handle: t("social.profile.handle") },
                { name: t("social.profile.fb"), handle: t("social.profile.handle") }
              ].map((profile, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex items-center justify-between hover:border-[#B454FF]/30 hover:bg-white/[0.06] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#B454FF]/20 group-hover:text-[#B454FF] transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm md:text-base">{profile.name}</h3>
                      <p className="text-[#F5F5F5]/50 text-xs md:text-sm tracking-wide">{profile.handle}</p>
                    </div>
                  </div>
                  <div className="text-white/30 group-hover:text-[#B454FF] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. RESPONSABILIDAD Y TRATAMIENTO */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s2.title")}
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
                {t("social.s2.p1")}
              </p>
            </div>
          </section>

          {/* 3. FINALIDAD DEL USO */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("social.s3.title")}
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
                {t("social.s3.p1")}
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