import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
// ... (imports remain the same, ensure Outlet is there)

import Index from "./pages/Index"; // Componente Crítico -> NO es Lazy

// Optimizacion Lazy Loading: Las páginas secundarias y grandes dependencias se cargan bajo demanda
const Cases = lazy(() => import("./pages/Cases"));
const CaseStudyPost = lazy(() => import("./pages/CaseStudyPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const SocialPrivacyPolicy = lazy(() => import("./pages/SocialPrivacyPolicy"));

// Portal - Rutas Pesadas diferidas
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
import VersionWatcher from "@/components/VersionWatcher";
import DynamicImportGuard from "@/components/DynamicImportGuard";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <VersionWatcher />
          <DynamicImportGuard />
          <CustomCursor />
          <CookieBanner />
          <SkipToContent />
          <BackgroundParallax />
          <SmoothScroll>
            <div className="relative z-10">
              <ScrollProgress />
              <ScrollToTop />
              <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
                <Routes>
                  {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/casos" element={<Cases />} />
                <Route path="/casos/:slug" element={<CaseStudyPost />} />
                <Route path="/legal/aviso-legal" element={<LegalNotice />} />
                <Route path="/legal/politica-privacidad" element={<PrivacyPolicy />} />
                <Route path="/legal/politica-cookies" element={<CookiesPolicy />} />
                <Route path="/legal/privacidad-redes-sociales" element={<SocialPrivacyPolicy />} />
                
                {/* Portal Login */}
                <Route path="/portal/login" element={<PortalLogin />} />

                {/* Protected Portal Routes */}
                <Route path="/portal" element={
                  <ProtectedRoute>
                    <PortalLayout />
                  </ProtectedRoute>
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
              </Suspense>
            </div>
          </SmoothScroll>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;