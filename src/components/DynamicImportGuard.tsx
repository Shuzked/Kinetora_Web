"use client";

import React from "react";

const DynamicImportGuard: React.FC = () => {
  React.useEffect(() => {
    const handler = (e: PromiseRejectionEvent) => {
      try {
        const msg = String(e?.reason?.message || "");
        if (msg.includes("Failed to fetch dynamically imported module")) {
          const url = new URL(window.location.href);
          url.searchParams.set("v", Date.now().toString());
          window.location.replace(url.toString());
        }
      } catch {
        // fallback duro
        window.location.reload();
      }
    };
    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);
  return null;
};

export default DynamicImportGuard;