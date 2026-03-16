import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cases from "./pages/Cases";
import CaseStudyPost from "./pages/CaseStudyPost";
import NotFound from "./pages/NotFound";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import { I18nProvider } from "@/i18n/I18nProvider";
import BackgroundParallax from "@/components/BackgroundParallax";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <BackgroundParallax />
          <div className="relative z-10">
            <ScrollProgress />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/casos" element={<Cases />} />
              <Route path="/casos/:slug" element={<CaseStudyPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;