"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "react-router-dom";

const CookiesPolicy = () => {
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
            {t("cookie.title")}
          </h1>
          
          <p className="text-[#F5F5F5]/75 text-base md:text-lg mb-8 font-semibold tracking-wide">
            {t("cookie.subtitle")}
          </p>

          <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-12">
            {t("cookie.intro")}
          </p>

          <p className="text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16">
            {t("legal.updated")}
          </p>

          {/* 1. ¿QUÉ SON LAS COOKIES? */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("cookie.s1.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("cookie.s1.p1")}
            </p>
          </section>

          {/* 2. TIPOS DE COOKIES */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("cookie.s2.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-green-500"></div>
                <h3 className="text-white font-bold ml-6">{t("cookie.types.tech")}</h3>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-blue-500"></div>
                <h3 className="text-white font-bold ml-6">{t("cookie.types.func")}</h3>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-orange-500"></div>
                <h3 className="text-white font-bold ml-6">{t("cookie.types.anal")}</h3>
              </div>
            </div>
          </section>

          {/* 3. COOKIES UTILIZADAS */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("cookie.s3.title")}
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left min-w-[700px] border-collapse">
                <thead>
                  <tr className="bg-white/5 text-[10px] font-black tracking-widest text-[#F5F5F5]/40 uppercase">
                    <th className="p-4 font-black">{t("cookie.table.name")}</th>
                    <th className="p-4 font-black">{t("cookie.table.type")}</th>
                    <th className="p-4 font-black">{t("cookie.table.provider")}</th>
                    <th className="p-4 font-black">{t("cookie.table.purpose")}</th>
                    <th className="p-4 font-black">{t("cookie.table.duration")}</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-[#B454FF] font-semibold">{t("cookie.table.row1.name")}</td>
                    <td className="p-4 text-[#F5F5F5]/60">{t("cookie.table.row1.type")}</td>
                    <td className="p-4 text-[#F5F5F5]/60">{t("cookie.table.row1.provider")}</td>
                    <td className="p-4 text-[#F5F5F5]/60">{t("cookie.table.row1.purpose")}</td>
                    <td className="p-4 text-[#F5F5F5]/60">{t("cookie.table.row1.duration")}</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-[#B454FF] font-semibold">{t("cookie.table.row2.name")}</td>
                    <td className="p-4 text-[#F5F5F5]/60">{t("cookie.table.row2.type")}</td>
                    <td className="p-4 text-[#F5F5F5]/60">{t("cookie.table.row2.provider")}</td>
                    <td className="p-4 text-[#F5F5F5]/60">{t("cookie.table.row2.purpose")}</td>
                    <td className="p-4 text-[#F5F5F5]/60">{t("cookie.table.row2.duration")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. CÓMO GESTIONAR LAS COOKIES */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("cookie.s4.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                t("cookie.manage.chrome"), 
                t("cookie.manage.firefox"), 
                t("cookie.manage.safari"), 
                t("cookie.manage.edge"), 
                t("cookie.manage.opera")
              ].map((browser, i) => (
                <div key={i} className="rounded-xl bg-white/[0.03] border border-white/10 p-4 text-center text-[#F5F5F5]/75 text-sm md:text-base font-semibold hover:bg-white/[0.05] transition-colors cursor-pointer">
                  {browser}
                </div>
              ))}
            </div>
          </section>

          {/* 5. ACTUALIZACIONES */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("cookie.s5.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed">
              {t("cookie.s5.p1")}
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPolicy;