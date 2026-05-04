"use client";

import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "h-6" }: LogoProps) => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {!hasError ? (
        <img
          src="/Logotipo.svg"
          alt="Kinetora Logo"
          className="h-full w-auto"
          width={120}
          height={24}
          fetchpriority="high"
          loading="eager"
          decoding="sync"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="text-2xl font-black tracking-tighter text-[#F5F5F5] flex items-center gap-1">
          KINETORA
          <span className="w-2 h-2 bg-[#B454FF] rounded-full shadow-[0_0_10px_#B454FF]" />
        </div>
      )}
    </div>
  );
};

export default Logo;