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

  // 1. Prioridad: Inyección explícita del SSG/SSR
  const serverLang = (window as any).__KINETORA_LANG__;
  if (serverLang === "es" || serverLang === "en") return serverLang as Lang;

  // 2. Sincronización determinista: Leer el atributo 'lang' que el servidor ya puso en el HTML
  // Esto garantiza que el primer renderizado del cliente coincida exactamente con el del servidor
  const docLang = document.documentElement.getAttribute("lang");
  if (docLang === "es" || docLang === "en") return docLang as Lang;

  // 3. Detección por Hostname (Síncrona)
  // Útil para navegación directa o fallos en el atributo lang
  const hostname = window.location.hostname;
  if (hostname.endsWith('.es')) return "es";
  if (hostname.endsWith('.tech')) return "en";

  // 4. Preferencia guardada (solo si coincide con los criterios de arriba para evitar Mismatch)
  // O como fallback de última instancia
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored as Lang;
  } catch {
    // ignore
  }

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
    // Ya no hacemos detección de idioma aquí. El estado inicial se calculó síncronamente.
    // Solo sincronizamos el atributo lang del DOM por seguridad.
    document.documentElement.lang = lang;
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
      t: (key, vars) => {
        return interpolate(dict[key] ?? key, vars);
      },
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
