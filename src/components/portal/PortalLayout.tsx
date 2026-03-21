import React from "react";
import Sidebar from "./Sidebar";
import SEO from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PortalLayoutProps {
  children: React.ReactNode;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] font-sans overflow-x-hidden selection:bg-[#B454FF]/30">
      <SEO 
        title="Portal de Clientes | Kinetora" 
        robots="noindex, nofollow" 
      />
      
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B454FF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8A2BE2]/5 rounded-full blur-[100px]" />
      </div>

      <Sidebar />

      <main className="pl-64 min-h-screen relative z-10 w-full">
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default PortalLayout;
