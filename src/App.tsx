import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Index = React.lazy(() => import("./pages/Index"));
import HomeSkeleton from "@/components/HomeSkeleton";
const Cases = React.lazy(() => import("./pages/Cases"));
const CaseStudyPost = React.lazy(() => import("./pages/CaseStudyPost"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const LegalNotice = React.lazy(() => import("./pages/LegalNotice"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const CookiesPolicy = React.lazy(() => import("./pages/CookiesPolicy"));
const SocialPrivacyPolicy = React.lazy(() => import("./pages/SocialPrivacyPolicy"));
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import { I18nProvider } from "@/i18n/I18nProvider";
import BackgroundParallax from "@/components/BackgroundParallax";
import SkipToContent from "@/components/SkipToContent";
import CookieBanner from "@/components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CookieBanner />
          <SkipToContent />
          <BackgroundParallax />
          <div className="relative z-10">
            <ScrollProgress />
            <ScrollToTop />
            <React.Suspense fallback={<HomeSkeleton />}>
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
            </React.Suspense>
          </div>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;