"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "react-router-dom";

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

// Shield icon (Technical)
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

// Sliders icon (Functional)
const SlidersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

// Bar chart icon (Analytical)
const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CookiesPolicy = () => {
  const { t } = useI18n();

  const cookieTypes = [
    {
      titleKey: "cookie.types.tech",
      descKey: "cookie.types.tech.desc",
      icon: <ShieldIcon />,
      dotColor: "bg-emerald-500",
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400",
    },
    {
      titleKey: "cookie.types.func",
      descKey: "cookie.types.func.desc",
      icon: <SlidersIcon />,
      dotColor: "bg-blue-500",
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400",
    },
    {
      titleKey: "cookie.types.anal",
      descKey: "cookie.types.anal.desc",
      icon: <BarChartIcon />,
      dotColor: "bg-orange-500",
      iconBg: "bg-orange-500/15",
      iconColor: "text-orange-400",
    },
  ];

  const tableRows = [
    {
      nameKey: "cookie.table.row1.name",
      typeKey: "cookie.table.row1.type",
      providerKey: "cookie.table.row1.provider",
      purposeKey: "cookie.table.row1.purpose",
      durationKey: "cookie.table.row1.duration",
      typeColor: "text-orange-400",
    },
    {
      nameKey: "cookie.table.row2.name",
      typeKey: "cookie.table.row2.type",
      providerKey: "cookie.table.row2.provider",
      purposeKey: "cookie.table.row2.purpose",
      durationKey: "cookie.table.row2.duration",
      typeColor: "text-emerald-400",
    },
    {
      nameKey: "cookie.table.row3.name",
      typeKey: "cookie.table.row3.type",
      providerKey: "cookie.table.row3.provider",
      purposeKey: "cookie.table.row3.purpose",
      durationKey: "cookie.table.row3.duration",
      typeColor: "text-blue-400",
    },
  ];

  const browsers = [
    { labelKey: "cookie.manage.chrome",  urlKey: "cookie.manage.chrome.url" },
    { labelKey: "cookie.manage.firefox", urlKey: "cookie.manage.firefox.url" },
    { labelKey: "cookie.manage.safari",  urlKey: "cookie.manage.safari.url" },
    { labelKey: "cookie.manage.edge",    urlKey: "cookie.manage.edge.url" },
    { labelKey: "cookie.manage.opera",   urlKey: "cookie.manage.opera.url" },
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
            {t("cookie.title")}
          </h1>

          <p className="text-[#F5F5F5]/75 text-base md:text-lg mb-6 font-semibold tracking-wide">
            {t("cookie.subtitle")}
          </p>

          {/* Intro paragraphs */}
          <p className="text-[#F5F5F5]/60 text-sm md:text-base leading-relaxed mb-3">
            {t("cookie.intro1")}
          </p>
          <p className="text-[#F5F5F5]/60 text-sm md:text-base leading-relaxed mb-12">
            {t("cookie.intro2")}
          </p>

          <p className="text-[11px] font-black tracking-[0.14em] text-[#F5F5F5]/60 uppercase mb-16">
            {t("legal.updated")}
          </p>

          {/* ── 1. ¿QUÉ SON LAS COOKIES? ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("cookie.s1.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-8">
              {t("cookie.s1.p1")}
            </p>

            {/* Cookie type cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cookieTypes.map((ct) => (
                <div
                  key={ct.titleKey}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${ct.iconBg} flex items-center justify-center ${ct.iconColor}`}
                  >
                    {ct.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-base mb-2">
                      {t(ct.titleKey)}
                    </h3>
                    <p className="text-[#F5F5F5]/60 text-xs md:text-sm leading-relaxed">
                      {t(ct.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 2. COOKIES UTILIZADAS ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("cookie.s3.title")}
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left min-w-[640px] border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    {(["cookie.table.name","cookie.table.type","cookie.table.provider","cookie.table.purpose","cookie.table.duration"] as const).map((col) => (
                      <th
                        key={col}
                        className="p-4 text-[10px] font-black tracking-widest text-[#B454FF] uppercase whitespace-nowrap"
                      >
                        {t(col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {tableRows.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-[#B454FF] font-semibold whitespace-nowrap">
                        {t(row.nameKey)}
                      </td>
                      <td className={`p-4 font-medium whitespace-nowrap ${row.typeColor}`}>
                        {t(row.typeKey)}
                      </td>
                      <td className="p-4 text-[#F5F5F5]/60 whitespace-nowrap">
                        {t(row.providerKey)}
                      </td>
                      <td className="p-4 text-[#F5F5F5]/60 max-w-[200px]">
                        {t(row.purposeKey)}
                      </td>
                      <td className="p-4 text-[#F5F5F5]/60 whitespace-nowrap">
                        {t(row.durationKey)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── 3. CÓMO GESTIONAR LAS COOKIES ── */}
          <section className="mb-12">
            <h2 className="uppercase font-black tracking-[0.14em] text-lg md:text-xl mb-6 border-b border-white/10 pb-4">
              {t("cookie.s4.title")}
            </h2>
            <p className="text-[#F5F5F5]/75 text-sm md:text-base leading-relaxed mb-6">
              {t("cookie.s4.p1")}
            </p>

            {/* Browser links grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
              {browsers.map(({ labelKey, urlKey }) => (
                <a
                  key={labelKey}
                  href={t(urlKey)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] border border-white/10 px-3 py-4 text-center text-[#F5F5F5]/70 text-xs md:text-sm font-semibold hover:bg-[#B454FF]/10 hover:border-[#B454FF]/40 hover:text-[#B454FF] transition-all duration-200"
                >
                  <span>{t(labelKey)}</span>
                  <ExternalLinkIcon />
                </a>
              ))}
            </div>

            {/* Disable-cookies note */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#F5F5F5]/40 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#F5F5F5]/50 text-xs leading-relaxed">
                {t("cookie.s4.note")}
              </p>
            </div>
          </section>

          {/* ── 4. ACTUALIZACIONES ── */}
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