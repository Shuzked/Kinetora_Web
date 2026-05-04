/**
 * useCookieConsent
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages cookie consent state with GDPR Prior Consent pattern.
 * Reads/writes `kinetora.cookies` in localStorage.
 * Controls GA4 (G-9RKJYMV9WX) and GTM (GTM-MKLGBK2S) via Consent Mode v2.
 */

import { useCallback, useEffect, useState } from "react";

const GA_ID  = "G-9RKJYMV9WX";
const GTM_ID = "GTM-MKLGBK2S";
const STORAGE_KEY = "kinetora.cookies";

export interface CookiePrefs {
  decided:    boolean;
  analytics:  boolean;
  functional: boolean;
}

const DEFAULT_PREFS: CookiePrefs = {
  decided:    false,
  analytics:  false,
  functional: false,
};

function readPrefs(): CookiePrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

function writePrefs(prefs: CookiePrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}

/** Push consent update to gtag Consent Mode v2 */
function pushConsentUpdate(analytics: boolean, functional: boolean): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as Record<string, unknown>;
  if (typeof w.gtag !== "function") return;
  (w.gtag as (...args: unknown[]) => void)(
    "consent",
    "update",
    {
      analytics_storage:    analytics  ? "granted" : "denied",
      functionality_storage: functional ? "granted" : "denied",
      personalization_storage: "denied",
    }
  );
}

/** Dynamically load GTM after consent (called only once per session) */
let gtmLoaded = false;
function loadGTM(): void {
  if (gtmLoaded || typeof document === "undefined") return;
  gtmLoaded = true;
  const w = window as unknown as Record<string, unknown>;
  const dl = "dataLayer";
  (w[dl] as unknown[]) = (w[dl] as unknown[]) || [];
  (w[dl] as unknown[]).push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const s = document.createElement("script");
  s.async = true;
  s.src = `/gtm.js`;
  document.head.appendChild(s);

  // Also load GA4 script if not already present
  if (!document.querySelector(`script[src*="${GA_ID}"]`)) {
    const ga = document.createElement("script");
    ga.async = true;
    ga.src = `/gtag.js`;
    document.head.appendChild(ga);
  }
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePrefs>(readPrefs);

  // On mount: if already decided and analytics granted, load tracking
  useEffect(() => {
    const prefs = readPrefs();
    if (prefs.decided && prefs.analytics) {
      pushConsentUpdate(true, prefs.functional);
      loadGTM();
    }
  }, []);

  const defer = useCallback((fn: () => void) => {
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(fn, { timeout: 2000 });
    } else {
      setTimeout(fn, 10);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const prefs: CookiePrefs = { decided: true, analytics: true, functional: true };
    writePrefs(prefs);
    setConsent(prefs);
    defer(() => {
      pushConsentUpdate(true, true);
      loadGTM();
    });
  }, [defer]);

  const rejectAll = useCallback(() => {
    const prefs: CookiePrefs = { decided: true, analytics: false, functional: false };
    writePrefs(prefs);
    setConsent(prefs);
    defer(() => {
      pushConsentUpdate(false, false);
    });
  }, [defer]);

  const saveCustom = useCallback((analytics: boolean, functional: boolean) => {
    const prefs: CookiePrefs = { decided: true, analytics, functional };
    writePrefs(prefs);
    setConsent(prefs);
    defer(() => {
      pushConsentUpdate(analytics, functional);
      if (analytics) loadGTM();
    });
  }, [defer]);

  return {
    consent,
    hasDecided: consent.decided,
    acceptAll,
    rejectAll,
    saveCustom,
  };
}
