import React from 'react';

/** Minimal fallback shown while lazy pages load — just bg + static navbar placeholder */
const PageSkeleton = () => (
  <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
    {/* Static Navbar */}
    <nav className="fixed top-0 z-50 w-full h-[68px] md:h-[88px] flex items-center">
      <div className="kin-container flex items-center justify-between">
        <div className="h-[38px] w-[38px] md:hidden">
          <img src="/Favicon_Kinetora.png" alt="" width={38} height={38} className="h-full w-full" />
        </div>
        <div className="hidden md:block h-6 w-28 opacity-50">
          <img src="/Logotipo.svg" alt="" className="h-full" />
        </div>
      </div>
    </nav>
  </div>
);

export default PageSkeleton;
