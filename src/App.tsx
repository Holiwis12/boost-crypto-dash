import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Depositar from "./pages/Depositar";
import Retirar from "./pages/Retirar";
import Referidos from "./pages/Referidos";
import Juego from "./pages/Juego";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen w-full bg-background">
          <Sidebar />
          <main className="flex-1 min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/depositar" element={<Depositar />} />
              <Route path="/retirar" element={<Retirar />} />
              <Route path="/referidos" element={<Referidos />} />
              <Route path="/juego" element={<Juego />} />
              <Route path="/legal" element={<Legal />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
