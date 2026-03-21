"use client";

import React from "react";

const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] px-4 py-2 rounded-full bg-[#B454FF] text-white text-sm font-bold shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      Saltar al contenido
    </a>
  );
};

export default SkipToContent;