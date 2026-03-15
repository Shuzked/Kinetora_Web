"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PortalTopBar from "@/components/dashboard/PortalTopBar";

type PortalLayoutProps = {
  children: React.ReactNode;
};

const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed inset-y-0 left-0 w-[300px] max-w-[85vw] z-50 lg:hidden"
            >
              <DashboardSidebar />
              <button
                aria-label="Cerrar menú"
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
        <PortalTopBar
          showMobileMenuButton
          onOpenMobileMenu={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 min-w-0">
          <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10 max-w-[1400px] mx-auto w-full overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalLayout;