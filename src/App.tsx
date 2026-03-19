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
const ScrollProgress = React.lazy(() => import('./components/ScrollProgress'));
const ScrollToTop = React.lazy(() => import('./components/ScrollToTop'));
import { I18nProvider } from "@/i18n/I18nProvider";
const BackgroundParallax = React.lazy(() => import('@/components/BackgroundParallax'));
const SkipToContent = React.lazy(() => import('@/components/SkipToContent'));
const CookieBanner = React.lazy(() => import('@/components/CookieBanner'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <React.Suspense fallback={null}>
            <CookieBanner />
            <SkipToContent />
            <BackgroundParallax />
          </React.Suspense>
          <div className="relative z-10">
            <React.Suspense fallback={null}>
              <ScrollProgress />
              <ScrollToTop />
            </React.Suspense>
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