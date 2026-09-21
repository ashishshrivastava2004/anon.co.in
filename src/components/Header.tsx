import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  // Smooth blur effect when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'SHOP', path: '/' },
    { label: 'TRACK ORDER', path: '/track' },
    { label: 'POLICIES', path: '/policies' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 select-none ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-transparent' : 'bg-white border-b border-neutral-100'
      }`}
    >
      {/* Top Minimal Notification Bar (Snitch style) */}
      <div className="bg-black text-white px-4 py-1.5 text-[10px] font-['JetBrains_Mono'] flex items-center justify-center tracking-widest uppercase font-bold">
        ⚡ FREE EXPRESS SHIPPING ON ALL PREPAID ORDERS
      </div>

      {/* Main Header Row */}
      <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-8 max-w-[1400px] mx-auto">
        
        {/* Left: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-['JetBrains_Mono'] font-bold tracking-widest uppercase w-1/3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 transition-colors hover:text-black ${
                  isActive ? 'text-black' : 'text-neutral-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile: Hamburger Toggle */}
        <div className="flex md:hidden w-1/3 items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-black hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Center: Brand Wordmark */}
        <div className="w-1/3 flex justify-center">
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
        <img 
               src="/logo@4x.png" 
               alt="ANON" 
               className="h-20 md:h-22 w-auto object-contain" 
              />
            </Link>
        </div>

        {/* Right: Actions (Ultra minimal icons) */}
        <div className="w-1/3 flex items-center justify-end gap-2 md:gap-4">
          <button
            onClick={onOpenSearch}
            className="p-2 text-black hover:bg-neutral-100 rounded-full transition-colors hidden sm:flex items-center"
            title="Search"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          <button
            onClick={onOpenAccount}
            className="p-2 text-black hover:bg-neutral-100 rounded-full transition-colors hidden sm:flex items-center"
            title="Account"
          >
            <User size={20} strokeWidth={1.5} />
          </button>

          <button
            onClick={openCart}
            className="p-2 text-black hover:bg-neutral-100 rounded-full transition-colors flex items-center relative"
            aria-label={`Shopping Cart with ${totalItems} items`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute top-1.5 right-1 bg-black text-white font-bold text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-['JetBrains_Mono']">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full border-t border-neutral-100 bg-white/95 backdrop-blur-md shadow-lg font-['JetBrains_Mono'] flex flex-col animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 border-b border-neutral-100 text-black font-bold tracking-widest uppercase text-xs flex items-center justify-between"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Bottom Actions */}
          <div className="flex items-center justify-between px-6 py-6 bg-neutral-50 border-t border-neutral-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
            >
              <Search size={18} strokeWidth={1.5} className="text-black" /> Search
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
            >
              <User size={18} strokeWidth={1.5} className="text-black" /> Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};