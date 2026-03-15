import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cases from "./pages/Cases";
import CaseStudy from "./pages/CaseStudy";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Messages from "./pages/Messages";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollProgress />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/casos" element={<Cases />} />
          <Route path="/casos/:slug" element={<CaseStudy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/billing" element={<Billing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ScrollToTop />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;