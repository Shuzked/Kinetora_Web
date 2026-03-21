import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Cases from "./pages/Cases";
import CaseStudyPost from "./pages/CaseStudyPost";
import NotFound from "./pages/NotFound";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import SocialPrivacyPolicy from "./pages/SocialPrivacyPolicy";
import PortalDashboard from "./pages/PortalDashboard";
import PortalLogin from "./pages/portal/PortalLogin";
import ProtectedRoute from "./components/portal/ProtectedRoute";
import PortalLayout from "./components/portal/PortalLayout";
import BillingView from "./components/portal/BillingView";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import { I18nProvider } from "@/i18n/I18nProvider";
import BackgroundParallax from "@/components/BackgroundParallax";
import SkipToContent from "@/components/SkipToContent";
import CookieBanner from "@/components/CookieBanner";
import VersionWatcher from "@/components/VersionWatcher";
import DynamicImportGuard from "@/components/DynamicImportGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <VersionWatcher />
          <DynamicImportGuard />
          <CookieBanner />
          <SkipToContent />
          <BackgroundParallax />
          <div className="relative z-10">
            <ScrollProgress />
            <ScrollToTop />
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
                  <PortalLayout>
                    <Navigate to="/portal/dashboard" replace />
                  </PortalLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/portal/dashboard" element={
                <ProtectedRoute>
                  <PortalLayout>
                    <PortalDashboard />
                  </PortalLayout>
                </ProtectedRoute>
              } />

              <Route path="/portal/billing" element={
                <ProtectedRoute>
                  <PortalLayout>
                    <BillingView />
                  </PortalLayout>
                </ProtectedRoute>
              } />

              {/* Placeholders for other portal routes */}
              <Route path="/portal/entregables" element={
                <ProtectedRoute>
                  <PortalLayout>
                    <div className="py-20 text-center">
                        <h2 className="text-4xl font-black uppercase tracking-tighter">Mis Entregables</h2>
                        <p className="text-white/40 mt-4 font-bold uppercase tracking-widest">Sección en desarrollo</p>
                    </div>
                  </PortalLayout>
                </ProtectedRoute>
              } />

              <Route path="/portal/settings" element={
                <ProtectedRoute>
                  <PortalLayout>
                    <div className="py-20 text-center">
                        <h2 className="text-4xl font-black uppercase tracking-tighter">Ajustes</h2>
                        <p className="text-white/40 mt-4 font-bold uppercase tracking-widest">Sección en desarrollo</p>
                    </div>
                  </PortalLayout>
                </ProtectedRoute>
              } />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </HashRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;