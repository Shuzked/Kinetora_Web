import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import Cases from "./pages/Cases";
import CaseStudyPost from "./pages/CaseStudyPost";
import NotFound from "./pages/NotFound";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import SocialPrivacyPolicy from "./pages/SocialPrivacyPolicy";

// Portal - Rutas Pesadas diferidas (Keep lazy as they are not SEO critical)
const PortalDashboard = lazy(() => import("./pages/PortalDashboard"));
const PortalLogin = lazy(() => import("./pages/portal/PortalLogin"));
const ProtectedRoute = lazy(() => import("./components/portal/ProtectedRoute"));
const PortalLayout = lazy(() => import("./components/portal/PortalLayout"));
const BillingView = lazy(() => import("./components/portal/BillingView"));
const Deliverables = lazy(() => import("./pages/portal/Deliverables"));

import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import { I18nProvider } from "@/i18n/I18nProvider";
import BackgroundParallax from "@/components/BackgroundParallax";
import SkipToContent from "@/components/SkipToContent";
import CookieBanner from "@/components/CookieBanner";
import PwaManager from "./components/PwaManager";
import DynamicImportGuard from "@/components/DynamicImportGuard";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import { useIsMobile } from "@/hooks/use-mobile";

// SEO Shock Plan Pages
import Pricing from "./pages/Pricing";
import About from "./pages/About";

import { useWebVitals } from "@/hooks/useWebVitals";

const queryClient = new QueryClient();

const App = ({ serverLang }: { serverLang?: "en" | "es" }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useWebVitals();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider serverLang={serverLang}>
          <Toaster />
          <Sonner />
          <PwaManager />
          <DynamicImportGuard />
          {!isMobile && <CustomCursor />}
          <CookieBanner />
          <SkipToContent />
          <BackgroundParallax />
          <SmoothScroll>
            <div className="relative z-10 w-full">
              <ScrollProgress />
              <ScrollToTop />
              <Routes>
                {/* Public Routes (Static Imports for SSR) */}
                <Route path="/" element={<Index />} />
                <Route path="/casos" element={<Cases />} />
                <Route path="/casos/:slug" element={<CaseStudyPost />} />
                <Route path="/precios" element={<Pricing />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/legal/aviso-legal" element={<LegalNotice />} />
                <Route path="/legal/politica-privacidad" element={<PrivacyPolicy />} />
                <Route path="/legal/politica-cookies" element={<CookiesPolicy />} />
                <Route path="/legal/privacidad-redes-sociales" element={<SocialPrivacyPolicy />} />
                
                {/* Portal Login (Lazy) */}
                <Route path="/portal/login" element={
                  <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
                    <PortalLogin />
                  </Suspense>
                } />

                {/* Protected Portal Routes (Lazy) */}
                <Route path="/portal" element={
                  <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
                    <ProtectedRoute>
                      <PortalLayout />
                    </ProtectedRoute>
                  </Suspense>
                }>
                  <Route index element={<Navigate to="/portal/dashboard" replace />} />
                  <Route path="dashboard" element={<PortalDashboard />} />
                  <Route path="billing" element={<BillingView />} />
                  <Route path="entregables" element={<Deliverables />} />
                  <Route path="settings" element={
                    <div className="py-20 text-center">
                      <h2 className="text-4xl font-black uppercase tracking-tighter">Ajustes</h2>
                      <p className="text-white/40 mt-4 font-bold uppercase tracking-widest">Sección en desarrollo</p>
                    </div>
                  } />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </SmoothScroll>
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;