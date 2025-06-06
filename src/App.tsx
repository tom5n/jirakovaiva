import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AllNews from "./pages/AllNews";
import Reservation from "./pages/Reservation";
import Beautybox from "./pages/Beautybox";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Omlouváme se, něco se pokazilo
            </h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#21435F] text-white rounded-md hover:bg-[#21435F]/90"
            >
              Obnovit stránku
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<React.Suspense fallback={<>Načítání...</>}><Login /></React.Suspense>} />
          <Route path="/admin" element={<React.Suspense fallback={<>Načítání...</>}><Admin /></React.Suspense>} />
          <Route path="/novinky" element={<React.Suspense fallback={<>Načítání...</>}><AllNews /></React.Suspense>} />
          <Route path="/rezervace" element={<React.Suspense fallback={<>Načítání...</>}><Reservation /></React.Suspense>} />
          <Route path="/beautybox" element={<React.Suspense fallback={<>Načítání...</>}><Beautybox /></React.Suspense>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
