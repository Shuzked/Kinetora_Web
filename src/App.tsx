import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Index = React.lazy(() => import("./pages/Index"));
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
import HomeSkeleton from "@/components/HomeSkeleton";
import PageSkeleton from "@/components/PageSkeleton";

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
            <Routes>
              {/* Home — uses hero skeleton as loading state */}
              <Route
                path="/"
                element={
                  <React.Suspense fallback={<HomeSkeleton />}>
                    <Index />
                  </React.Suspense>
                }
              />
              {/* All other pages — minimal neutral skeleton */}
              <Route
                path="/casos"
                element={
                  <React.Suspense fallback={<PageSkeleton />}>
                    <Cases />
                  </React.Suspense>
                }
              />
              <Route
                path="/casos/:slug"
                element={
                  <React.Suspense fallback={<PageSkeleton />}>
                    <CaseStudyPost />
                  </React.Suspense>
                }
              />
              <Route
                path="/legal/aviso-legal"
                element={
                  <React.Suspense fallback={<PageSkeleton />}>
                    <LegalNotice />
                  </React.Suspense>
                }
              />
              <Route
                path="/legal/politica-privacidad"
                element={
                  <React.Suspense fallback={<PageSkeleton />}>
                    <PrivacyPolicy />
                  </React.Suspense>
                }
              />
              <Route
                path="/legal/politica-cookies"
                element={
                  <React.Suspense fallback={<PageSkeleton />}>
                    <CookiesPolicy />
                  </React.Suspense>
                }
              />
              <Route
                path="/legal/privacidad-redes-sociales"
                element={
                  <React.Suspense fallback={<PageSkeleton />}>
                    <SocialPrivacyPolicy />
                  </React.Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <React.Suspense fallback={<PageSkeleton />}>
                    <NotFound />
                  </React.Suspense>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;