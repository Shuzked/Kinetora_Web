import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Cases from "./pages/Cases";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import Requests from "./pages/Requests";
import NewRequest from "./pages/NewRequest";
import Files from "./pages/Files";
import Support from "./pages/Support";

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
          <Route path="/login" element={<Login />} />

          {/* Portal */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/requests" element={<Requests />} />
          <Route path="/dashboard/new" element={<NewRequest />} />
          <Route path="/dashboard/files" element={<Files />} />
          <Route path="/dashboard/billing" element={<Billing />} />
          <Route path="/dashboard/support" element={<Support />} />

          {/* Aliases to avoid breaking old links */}
          <Route path="/dashboard/projects" element={<Navigate to="/dashboard/requests" replace />} />
          <Route path="/dashboard/messages" element={<Navigate to="/dashboard/support" replace />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ScrollToTop />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;