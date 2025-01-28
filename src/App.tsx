import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AudioProvider } from "./contexts/AudioContext";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./components/animations/PageTransition";
import { AudioPlayer } from "./components/AudioPlayer";
import { ScrollProgress } from "./components/ScrollProgress";
import { Nav } from "./components/Nav";
import Index from "./pages/Index";
import CatalogPage from "./pages/Catalog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Index />
          </PageTransition>
        } />
        <Route path="/catalog" element={
          <PageTransition>
            <CatalogPage />
          </PageTransition>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AudioProvider>
          <TooltipProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-prodpip-primary text-prodpip-text">
                <Nav />
                <ScrollProgress />
                <AnimatedRoutes />
                <AudioPlayer />
                <Toaster />
                <Sonner />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AudioProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;