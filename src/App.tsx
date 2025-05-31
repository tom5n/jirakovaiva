import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AllNews from "./pages/AllNews";
import Reservation from "./pages/Reservation";
import Registrace from "./pages/Registrace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<React.Suspense fallback={<>Načítání...</>}><Login /></React.Suspense>} />
          <Route path="/admin" element={<React.Suspense fallback={<>Načítání...</>}><Admin /></React.Suspense>} />
          <Route path="/novinky" element={<React.Suspense fallback={<>Načítání...</>}><AllNews /></React.Suspense>} />
          <Route path="/rezervace" element={<React.Suspense fallback={<>Načítání...</>}><Reservation /></React.Suspense>} />
          <Route path="/registrace" element={<React.Suspense fallback={<>Načítání...</>}><Registrace /></React.Suspense>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
