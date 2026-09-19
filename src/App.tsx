import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { PoliciesPage } from './pages/PoliciesPage';

// Helper to reset scroll on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-black flex flex-col font-mono selection:bg-black selection:text-white">
          {/* Global Sticky Header */}
          <Header
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAccount={() => setIsAccountOpen(true)}
          />

          {/* Main Routing Views */}
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/track" element={<OrderTrackingPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              {/* Fallback route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Global Footnotes & Footer */}
          <Footer />

          {/* Global Overlays */}
          <CartDrawer />
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
          <AccountModal
            isOpen={isAccountOpen}
            onClose={() => setIsAccountOpen(false)}
          />
        </div>
      </CartProvider>
    </Router>
  );
}
