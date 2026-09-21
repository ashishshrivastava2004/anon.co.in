import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Truck, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'SHIRTS', 'TROUSERS', 'TSHIRT', 'JEANS', 'CARGOS', 'POLO'];

  const filteredProducts = selectedCategory === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category?.toUpperCase() === selectedCategory);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], 1);
  };

  const TickerContent = () => (
    <>
      {[...Array(4)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="mx-8">🔥 FW26 DROP 01 NOW LIVE</span>
          <span className="mx-8">•</span>
          <span className="mx-8">HEAVYWEIGHT 500 GSM COTTON</span>
          <span className="mx-8">•</span>
          <span className="mx-8">FREE EXPRESS SHIPPING IN INDIA</span>
          <span className="mx-8">•</span>
          <span className="mx-8">NO ROUNDED EDGES. NO COMPROMISE.</span>
          <span className="mx-8">•</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div className="w-full bg-[#FFFFFF] text-[#000000] selection:bg-black selection:text-white pb-10">
      
      {/* 1. HERO BANNER (Video Background without dark overlay) */}
      <section className="relative w-full h-[85vh] bg-neutral-900 flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-top"
        >
          <source src="/bg video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="relative z-10 flex flex-col items-center text-center text-white px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-['JetBrains_Mono'] tracking-widest uppercase mb-6 rounded-full">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
            FW26 DROP 01 IS LIVE
          </div>
          
          <h1 className="font-['Clash_Display'] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold uppercase tracking-tight leading-[0.9]">
            NO SECOND<br />THOUGHT.
          </h1>
          
          <p className="font-['JetBrains_Mono'] text-sm md:text-base mt-6 text-neutral-200 max-w-lg tracking-wide">
            Heavyweight streetwear engineered for the archives. Boxy fits. Unyielding anonymity.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="#shop" className="px-8 py-4 bg-white text-black font-['Clash_Display'] font-medium uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300">
              SHOP THE DROP
            </a>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE TICKER */}
      <section className="w-full bg-black text-white py-3 flex overflow-hidden whitespace-nowrap">
        <div className="flex shrink-0 animate-marquee items-center font-['JetBrains_Mono'] text-[11px] font-bold tracking-widest uppercase">
          <TickerContent />
        </div>
        <div className="flex shrink-0 animate-marquee items-center font-['JetBrains_Mono'] text-[11px] font-bold tracking-widest uppercase" aria-hidden="true">
          <TickerContent />
        </div>
      </section>

      {/* 3. NEW ARRIVALS GRID */}
      <section id="shop" className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col items-center mb-12">
          <h2 className="font-['Clash_Display'] text-3xl md:text-4xl font-semibold tracking-tight uppercase mb-6">
            LATEST DROPS
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 font-['JetBrains_Mono'] text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full transition-colors uppercase tracking-widest border ${
                  selectedCategory === cat
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-neutral-500 border-neutral-200 hover:border-black hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-4 border border-black/5 group-hover:border-black/20 transition-colors">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {product.stockCount <= 5 && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-[9px] font-['JetBrains_Mono'] font-bold tracking-widest uppercase">
                    SELLING FAST
                  </div>
                )}

                <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 hidden md:block">
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="w-full py-3 bg-white/95 backdrop-blur text-black font-['Clash_Display'] font-medium text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} strokeWidth={2} /> QUICK ADD
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-1.5 px-2">
                <h3 className="font-['Clash_Display'] font-medium text-[15px] uppercase tracking-wide truncate w-full text-black">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs">
                  <span className="font-bold text-black">₹{product.price}</span>
                  <span className="text-neutral-400 line-through">₹{Math.round(product.price * 1.4)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BRAND USPs */}
      <section className="w-full border-t border-neutral-200 bg-neutral-50 mt-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            
            <div className="flex flex-col items-center space-y-3 pt-6 md:pt-0">
              <Zap size={28} strokeWidth={1.5} className="text-black" />
              <h4 className="font-['Clash_Display'] font-semibold text-lg uppercase tracking-wide">Next-Day Dispatch</h4>
              <p className="font-['JetBrains_Mono'] text-[11px] text-neutral-500 max-w-xs leading-relaxed">
                All orders are processed and shipped within 24 hours. Fast, tracked, and reliable delivery across India.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 pt-6 md:pt-0">
              <ShieldCheck size28={28} strokeWidth={1.5} className="text-black" />
              <h4 className="font-['Clash_Display'] font-semibold text-lg uppercase tracking-wide">Premium Heavyweight</h4>
              <p className="font-['JetBrains_Mono'] text-[11px] text-neutral-500 max-w-xs leading-relaxed">
                Engineered with 500+ GSM pure cotton. Boxy, oversized fits designed to outlast trends.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 pt-6 md:pt-0">
              <Truck size={28} strokeWidth={1.5} className="text-black" />
              <h4 className="font-['Clash_Display'] font-semibold text-lg uppercase tracking-wide">Free Shipping & Returns</h4>
              <p className="font-['JetBrains_Mono'] text-[11px] text-neutral-500 max-w-xs leading-relaxed">
                Enjoy free express shipping on all prepaid orders. Hassle-free 7-day return policy.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};