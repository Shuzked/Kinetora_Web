"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Lang } from "@/i18n/translations";

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "kinetora.lang";

function getInitialLang(): Lang {
  const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
  if (stored === "es" || stored === "en") return stored;

  const nav = typeof navigator !== "undefined" ? navigator.language : "";
  return nav.toLowerCase().startsWith("es") ? "es" : "en";
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => {
    const dict = dictionaries[lang] ?? {};
    return {
      lang,
      setLang,
      t: (key, vars) => interpolate(dict[key] ?? key, vars),
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
