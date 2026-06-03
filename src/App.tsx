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
import Spoluprace from "./pages/Spoluprace";
import SpoluVKondici from "./pages/SpoluVKondici";
import Zasady from "./pages/Zasady";
import Cookies from "./pages/Cookies";
import Koucink from "./pages/Koucink";
import KoucinkOsobni from "./pages/KoucinkOsobni";
import KoucinkTymovy from "./pages/KoucinkTymovy";
import KoucinkLeadership from "./pages/KoucinkLeadership";
import KoucinkFiremni from "./pages/KoucinkFiremni";
import KoucinkTymovyRozvoj from "./pages/KoucinkTymovyRozvoj";
import KoucinkPremium from "./pages/KoucinkPremium";
import VIP from "./pages/VIP";
import Farmasi from "./pages/Farmasi";
import CookieConsentBar from "./components/CookieConsentBar";

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
  <>
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
                <Route path="/spoluprace" element={<React.Suspense fallback={<>Načítání...</>}><Spoluprace /></React.Suspense>} />
                <Route path="/spolu-v-kondici" element={<React.Suspense fallback={<>Načítání...</>}><SpoluVKondici /></React.Suspense>} />
                <Route path="/koucink" element={<React.Suspense fallback={<>Načítání...</>}><Koucink /></React.Suspense>} />
                <Route path="/koucink/individualni" element={<React.Suspense fallback={<>Načítání...</>}><KoucinkOsobni /></React.Suspense>} />
                <Route path="/koucink/rodiny" element={<React.Suspense fallback={<>Načítání...</>}><KoucinkTymovy /></React.Suspense>} />
                <Route path="/koucink/podnikatele" element={<React.Suspense fallback={<>Načítání...</>}><KoucinkLeadership /></React.Suspense>} />
                <Route path="/koucink/firemni" element={<React.Suspense fallback={<>Načítání...</>}><KoucinkFiremni /></React.Suspense>} />
                <Route path="/koucink/tymovy-rozvoj" element={<React.Suspense fallback={<>Načítání...</>}><KoucinkTymovyRozvoj /></React.Suspense>} />
                <Route path="/koucink/premium" element={<React.Suspense fallback={<>Načítání...</>}><KoucinkPremium /></React.Suspense>} />
                <Route path="/koucink/zeny-maminky" element={<React.Suspense fallback={<>Načítání...</>}><VIP /></React.Suspense>} />
                <Route path="/farmasi" element={<React.Suspense fallback={<>Načítání...</>}><Farmasi /></React.Suspense>} />
                <Route path="/zasady" element={<React.Suspense fallback={<>Načítání...</>}><Zasady /></React.Suspense>} />
                <Route path="/cookies" element={<React.Suspense fallback={<>Načítání...</>}><Cookies /></React.Suspense>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
    <CookieConsentBar />
  </>
);

export default App;
