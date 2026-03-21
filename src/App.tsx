import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cases from "./pages/Cases";
import CaseStudyPost from "./pages/CaseStudyPost";
import NotFound from "./pages/NotFound";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import SocialPrivacyPolicy from "./pages/SocialPrivacyPolicy";
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
              <Route path="/" element={<Index />} />
              <Route path="/casos" element={<Cases />} />
              <Route path="/casos/:slug" element={<CaseStudyPost />} />
              <Route path="/legal/aviso-legal" element={<LegalNotice />} />
              <Route path="/legal/politica-privacidad" element={<PrivacyPolicy />} />
              <Route path="/legal/politica-cookies" element={<CookiesPolicy />} />
              <Route path="/legal/privacidad-redes-sociales" element={<SocialPrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </HashRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;