
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LiveMarkets from "./pages/LiveMarkets";
import MyPortfolio from "./pages/MyPortfolio";
import StockAnalysis from "./pages/StockAnalysis";
import CryptoTracker from "./pages/CryptoTracker";
import AIPredictions from "./pages/AIPredictions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/live-markets" element={<LiveMarkets />} />
          <Route path="/my-portfolio" element={<MyPortfolio />} />
          <Route path="/stock-analysis" element={<StockAnalysis />} />
          <Route path="/crypto-tracker" element={<CryptoTracker />} />
          <Route path="/ai-predictions" element={<AIPredictions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
