import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import HousePlanning from "@/pages/HousePlanning";
import AIGenerator from "@/pages/AIGenerator";
import CostEstimation from "@/pages/CostEstimation";
import ContractReview from "@/pages/ContractReview";
import ComplianceGuide from "@/pages/ComplianceGuide";
import Marketplace from "@/pages/Marketplace";
import Dashboard from "@/pages/Dashboard";
import ProfessionalProfile from "@/pages/ProfessionalProfile";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/house-planning" element={<HousePlanning />} />
          <Route path="/cost-estimation" element={<CostEstimation />} />
          <Route path="/contract-review" element={<ContractReview />} />
          <Route path="/compliance-guide" element={<ComplianceGuide />} />
          <Route path="/generator" element={<AIGenerator />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/professional/:id" element={<ProfessionalProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
