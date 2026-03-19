"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { cn } from "@/lib/utils";

const CookieBanner = () => {
  const { t } = useI18n();
  const { hasDecided, acceptAll, rejectAll, saveCustom } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Granular states for expanded view
  const [prefs, setPrefs] = useState({
    analytics: true,
    functional: true,
  });

  // Delay visibility slightly for smoother transition
  useEffect(() => {
    if (!hasDecided) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [hasDecided]);

  if (!isVisible && hasDecided) return null;

  const handleSaveCustom = () => {
    saveCustom(prefs.analytics, prefs.functional);
    setIsVisible(false);
  };

  return (
    <div
      className={cn(
        "fixed z-[9999] transition-all duration-500 ease-out",
        // Mobile: full width, centrado y con safe area lateral
        "bottom-0 left-0 right-0 px-4 mx-auto",
        // Desktop: tarjeta flotante en esquina
        "sm:bottom-6 sm:left-auto sm:right-6 sm:px-0 sm:w-full sm:max-w-[420px]",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full sm:translate-y-12 opacity-0 pointer-events-none"
      )}
      // Respetar zonas seguras en móviles (notch y barras de gestos)
      style={{
        paddingBottom: "max(env(safe-area-inset-bottom), 1rem)",
        paddingLeft: "max(env(safe-area-inset-left), 1rem)",
        paddingRight: "max(env(safe-area-inset-right), 1rem)",
      } as React.CSSProperties}
    >
      <div className="bg-[#121212] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="p-5 sm:p-6">
          {!isExpanded ? (
            /* COMPACT VIEW */
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#B454FF]/20 flex items-center justify-center text-[#B454FF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold tracking-tight">{t("banner.title")}</h3>
              </div>

              <p className="text-[#F5F5F5]/70 text-[13px] leading-relaxed">
                {t("banner.desc")}
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={acceptAll}
                  className="w-full bg-[#B454FF] hover:bg-[#A040FF] text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
                >
                  {t("banner.accept")}
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={rejectAll}
                    className="bg-white/5 hover:bg-white/10 text-[#F5F5F5]/80 font-semibold py-2.5 px-4 rounded-xl transition-colors text-xs border border-white/5"
                  >
                    {t("banner.reject")}
                  </button>
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="bg-white/5 hover:bg-white/10 text-[#F5F5F5]/80 font-semibold py-2.5 px-4 rounded-xl transition-colors text-xs border border-white/5"
                  >
                    {t("banner.manage")}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* EXPANDED VIEW */
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold tracking-tight">{t("banner.manage")}</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-[#F5F5F5]/40 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scroll interno en móvil para no tapar demasiado contenido */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 overscroll-contain">
                {/* Technical */}
                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{t("banner.cat.tech.title")}</span>
                      <span className="text-[10px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded leading-none uppercase tracking-wider font-bold">
                        {t("banner.always")}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#F5F5F5]/60 leading-normal">
                      {t("banner.cat.tech.desc")}
                    </p>
                  </div>
                </div>

                {/* Analytical */}
                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-white">{t("banner.cat.analytics.title")}</span>
                    <p className="text-[11px] text-[#F5F5F5]/60 leading-normal">
                      {t("banner.cat.analytics.desc")}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={prefs.analytics}
                      onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                    />
                    <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/40 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#B454FF] peer-checked:after:bg-white"></div>
                  </label>
                </div>

                {/* Functional */}
                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-white">{t("banner.cat.functional.title")}</span>
                    <p className="text-[11px] text-[#F5F5F5]/60 leading-normal">
                      {t("banner.cat.functional.desc")}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={prefs.functional}
                      onChange={(e) => setPrefs({ ...prefs, functional: e.target.checked })}
                    />
                    <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/40 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#B454FF] peer-checked:after:bg-white"></div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSaveCustom}
                className="w-full bg-[#B454FF] hover:bg-[#A040FF] text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                {t("banner.save")}
              </button>
            </div>
          )}

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-white/5">
            <div className="flex gap-3 sm:gap-4">
              <Link
                to="/legal/politica-cookies"
                className="text-[10px] sm:text-[11px] font-bold text-[#F5F5F5]/50 hover:text-[#B454FF] transition-colors uppercase tracking-widest"
              >
                {t("banner.link.cookies")}
              </Link>
              <Link
                to="/legal/politica-privacidad"
                className="text-[10px] sm:text-[11px] font-bold text-[#F5F5F5]/50 hover:text-[#B454FF] transition-colors uppercase tracking-widest"
              >
                {t("banner.link.privacy")}
              </Link>
            </div>
            <span className="text-[9px] text-white/30 font-medium uppercase tracking-tighter">
              KINETORA • 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;