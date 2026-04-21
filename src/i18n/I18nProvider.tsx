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
  if (typeof window === "undefined") return "en";

  // Identificador de SSG/SSR inyectado en index.html
  const serverLang = (window as any).__KINETORA_LANG__;
  if (serverLang === "es" || serverLang === "en") {
    return serverLang as Lang;
  }

  // Fallback seguro para la primera hidratación: inglés
  // La detección real del navegador o localStorage se hará en un useEffect
  // para evitar el "Hydration Mismatch".
  return "en";
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}

export const I18nProvider: React.FC<{ children: React.ReactNode; serverLang?: Lang }> = ({ children, serverLang }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    // Si el servidor nos pasó el idioma (SSG/SSR), usamos ese SIEMPRE para hidratar.
    if (serverLang) return serverLang;
    return getInitialLang();
  });

  const [isHydrated, setIsHydrated] = useState(false);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    setIsHydrated(true);
    document.documentElement.lang = lang;

    // Solo después de la hidratación inicial, buscamos preferencias locales
    // para evitar el mismatch si el usuario tenía guardada una elección distinta.
    if (!serverLang) {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") {
        setLangState(stored as Lang);
      } else {
        const hostname = window.location.hostname;
        if (hostname.endsWith('.es')) setLangState("es");
        else if (hostname.endsWith('.tech')) setLangState("en");
        else {
          const nav = navigator.language;
          if (nav.toLowerCase().startsWith("es")) setLangState("es");
        }
      }
    }
  }, []); // Solo al montar

  useEffect(() => {
    if (isHydrated) {
      document.documentElement.lang = lang;
    }
  }, [lang, isHydrated]);

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
