import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenAccount }) => {
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'ARCHIVE', path: '/' },
    { label: 'TRACK ORDER', path: '/track' },
    { label: 'POLICIES', path: '/policies' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-black select-none">
        {/* Top Minimal Notification Bar */}
        <div className="bg-black text-white px-4 py-1 text-xs font-mono flex items-center justify-between tracking-wider border-b border-black">
          <span className="hidden sm:inline">ANON APPAREL</span>
          <span className="hidden sm:inline text-right">INDIA SHIPMENT</span>
        </div>

        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Left: Mobile Toggle & Desktop Nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border border-black hover:bg-black hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-1 hover:text-black transition-colors ${
                      isActive
                        ? 'font-bold border-b-2 border-black'
                        : 'text-neutral-600 hover:border-b hover:border-black'
                    }`}
                  >
                    [{link.label}]
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Wordmark (Strict pure black typography) */}
          <div className="flex-1 text-center md:flex-initial">
          <Link
               to="/"
               className="inline-block hover:opacity-80 transition-opacity"
  >
          <img 
               src="/logo@4x.png" 
              alt="ANON" 
              className="h-20 md:h-22 w-auto object-contain" 
              />
           </Link>
           </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 border border-black hover:bg-black hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
              title="Search Archive"
            >
              <Search size={16} />
              <span className="hidden lg:inline">SEARCH</span>
            </button>

            <button
              onClick={onOpenAccount}
              className="p-2 sm:px-3 sm:py-2 border border-black hover:bg-black hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
              title="Client ID / Account"
            >
              <User size={16} />
              <span className="hidden lg:inline">ACCOUNT</span>
            </button>

            <button
              onClick={openCart}
              className="p-2 sm:px-4 sm:py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 text-xs font-mono font-medium"
              aria-label={`Shopping Cart with ${totalItems} items`}
            >
              <ShoppingBag size={16} />
              <span>CART</span>
              <span className="px-1.5 py-0.5 bg-white text-black font-bold text-[11px] border border-black">
                {String(totalItems).padStart(2, '0')}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-black bg-white px-4 py-6 font-mono text-sm space-y-4">
            <div className="text-xs text-neutral-500 uppercase tracking-widest border-b border-black pb-2">
              NAVIGATION
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 border-b border-neutral-200 text-black font-bold tracking-wider"
              >
                &gt; {link.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full py-2 text-left border border-black px-3 flex items-center gap-2 text-xs"
              >
                <Search size={14} /> SEARCH ARCHIVE CATALOG
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="w-full py-2 text-left border border-black px-3 flex items-center gap-2 text-xs"
              >
                <User size={14} /> CLIENT PROFILE &amp; DISPATCH SPECS
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
