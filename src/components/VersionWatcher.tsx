"use client";

import React from "react";
import { showSuccess } from "@/utils/toast";

function extractBundleHashFromHtml(html: string): string | null {
  // Busca la primera referencia a un JS con hash en /assets
  const match = html.match(/\/assets\/([A-Za-z0-9\.\-\_]+)\.js/);
  if (!match) return null;
  // Devuelve el nombre completo para comparar (p.ej. index.abcd1234.js)
  return match[1] || null;
}

function getCurrentBundleHash(): string | null {
  // Busca el primer script de /assets que haya cargado en la página
  const scripts = Array.from(document.querySelectorAll('script[src*="/assets/"]')) as HTMLScriptElement[];
  const first = scripts.find(Boolean);
  if (!first) return null;
  const src = first.getAttribute("src") || "";
  const m = src.match(/\/assets\/([A-Za-z0-9\.\-\_]+)\.js/);
  return m ? m[1] : null;
}

const VersionWatcher: React.FC = () => {
  const currentHashRef = React.useRef<string | null>(null);
  const timerRef = React.useRef<number | null>(null);

  const checkForUpdate = React.useCallback(async () => {
    const current = currentHashRef.current ?? getCurrentBundleHash();
    currentHashRef.current = current;

    const res = await fetch("/index.html", { cache: "no-cache" });
    const html = await res.text();
    const latest = extractBundleHashFromHtml(html);

    if (current && latest && latest !== current) {
      showSuccess("Actualizando Kinetora a la última versión...");
      console.log("🚀 Kinetora: Nueva versión detectada:", { current, latest });
      
      // Forzamos la recarga tras un pequeño delay para que el usuario vea el mensaje
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, []);

  React.useEffect(() => {
    currentHashRef.current = getCurrentBundleHash();
    // Revisión inicial
    checkForUpdate();

    // Intervalo de comprobación
    timerRef.current = window.setInterval(checkForUpdate, 60000);

    // Comprobar al volver a la pestaña
    const onVis = () => {
      if (document.visibilityState === "visible") {
        checkForUpdate();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [checkForUpdate]);

  return null;
};

export default VersionWatcher;