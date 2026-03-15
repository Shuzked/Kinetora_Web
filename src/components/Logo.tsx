"use client";

import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "h-6" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Usamos el archivo SVG proporcionado */}
      <img 
        src="/Logotipo.svg" 
        alt="Kinetora Logo" 
        className="h-full w-auto"
        onError={(e) => {
          // Fallback en caso de que el archivo no esté en la ruta esperada durante el desarrollo
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = `
            <div class="text-2xl font-black tracking-tighter text-[#F5F5F5] flex items-center gap-1">
              KINETORA<span class="w-2 h-2 bg-[#B454FF] rounded-full shadow-[0_0_10px_#B454FF]"></span>
            </div>
          `;
        }}
      />
    </div>
  );
};

export default Logo;