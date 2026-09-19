import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, Plus, Shield, Layers, Box, Cpu } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'TOPS', 'BOTTOMS', 'OUTERWEAR', 'ACCESSORIES', 'FOOTWEAR'];

  const filteredProducts = selectedCategory === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], 1);
  };

  return (
    <div className="w-full bg-white text-black select-none">
      {/* 1. HERO BANNER */}
      <section className="relative w-full border-b border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[80vh] items-stretch">
          {/* Left Hero Column: Typographic Archival Statement */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black bg-white">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-black text-xs font-mono bg-white">
                <span className="w-2 h-2 bg-black inline-block animate-pulse"></span>
                <span>SYSTEM_01 // ARCHIVE RELEASE</span>
              </div>

              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] text-black">
                BRUTALIST<br />
                ARCHIVAL<br />
                STREETWEAR.
              </h1>

              <p className="font-mono text-xs sm:text-sm text-neutral-700 max-w-md pt-2 leading-relaxed">
                Sculptural heavy textiles. Unyielding monochrome palette. Monolithic silhouettes
                engineered for permanent anonymity in hyper-dense urban landscapes.
              </p>
            </div>

            <div className="pt-8 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4 border-t border-black pt-4">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest">EDITION</div>
                  <div className="font-bold text-sm">FW26 BATCH 01</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest">FABRICATION</div>
                  <div className="font-bold text-sm">580 GSM COTTON</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="#arrivals"
                  className="px-6 py-4 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors font-mono font-bold uppercase tracking-widest flex items-center justify-between text-xs"
                >
                  <span>INSPECT DROP 01</span>
                  <ArrowRight size={16} />
                </a>
                <Link
                  to="/track"
                  className="px-6 py-4 bg-white text-black border border-black hover:bg-neutral-100 transition-colors font-mono font-bold uppercase tracking-widest flex items-center justify-between text-xs"
                >
                  <span>TRACK SHIPMENT</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Large Visual Editorial */}
          <div className="lg:col-span-6 relative bg-neutral-100 overflow-hidden flex items-center justify-center group min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1600&q=85"
              alt="ANON Archival Editorial"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Spec Box Overlay */}
            <div className="absolute bottom-6 left-6 right-6 border border-black bg-white/95 p-4 font-mono text-xs flex items-center justify-between backdrop-blur-none">
              <div>
                <span className="font-bold block text-sm">SYSTEM_01 HOODIE / HEAVYWEIGHT</span>
                <span className="text-neutral-600 text-[11px]">SPEC: 580 GSM FRENCH TERRY // TOKYO ATELIER</span>
              </div>
              <button
                onClick={() => navigate('/product/anon-hoodie-01')}
                className="px-4 py-2 bg-black text-white text-xs hover:bg-neutral-800 transition-colors uppercase font-bold"
              >
                VIEW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE TICKER */}
      <section className="w-full border-b border-black py-3 bg-white overflow-hidden">
        <div className="animate-marquee whitespace-nowrap font-mono text-xs font-bold tracking-widest uppercase flex items-center">
          <span className="mx-8">[ ANON RESEARCH LAB ]</span>
          <span className="mx-8">•</span>
          <span className="mx-8">NO ROUNDED EDGES. NO COMPROMISE.</span>
          <span className="mx-8">•</span>
          <span className="mx-8">RACCAGNI HARDWARE // VENTILE CANVAS</span>
          <span className="mx-8">•</span>
          <span className="mx-8">DIRECT AIR FREIGHT TO ALL METROPOLITAN HUBS</span>
          <span className="mx-8">•</span>
          <span className="mx-8">LIMITED EDITION ARCHIVAL SYSTEM_01</span>
          <span className="mx-8">•</span>
          <span className="mx-8">[ ANON RESEARCH LAB ]</span>
          <span className="mx-8">•</span>
          <span className="mx-8">NO ROUNDED EDGES. NO COMPROMISE.</span>
          <span className="mx-8">•</span>
          <span className="mx-8">RACCAGNI HARDWARE // VENTILE CANVAS</span>
          <span className="mx-8">•</span>
          <span className="mx-8">DIRECT AIR FREIGHT TO ALL METROPOLITAN HUBS</span>
        </div>
      </section>

      {/* 3. NEW ARRIVALS GRID */}
      <section id="arrivals" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black pb-6 mb-8">
          <div>
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
              CATALOG SELECTION
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">
              NEW ARRIVALS // DROP 01
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 border border-black transition-colors uppercase ${
                  selectedCategory === cat
                    ? 'bg-black text-white font-bold'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid: 1px black borders separating all cells */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black divide-y md:divide-y-0 md:divide-x divide-black">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group bg-white flex flex-col justify-between cursor-pointer border-b border-black last:border-b-0 lg:last:border-b md:nth-[2n]:border-r-0 hover:bg-neutral-50 transition-colors"
            >
              {/* Product Image Stage */}
              <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden border-b border-black">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* SKU Badge */}
                <div className="absolute top-3 left-3 bg-white border border-black px-2 py-0.5 text-[10px] font-mono tracking-wider">
                  {product.code}
                </div>

                {/* Stock alert */}
                {product.stockCount <= 4 && (
                  <div className="absolute top-3 right-3 bg-black text-white border border-black px-2 py-0.5 text-[10px] font-mono">
                    LOW STOCK [{product.stockCount}]
                  </div>
                )}

                {/* Hover Quick Action */}
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="flex-1 py-2.5 bg-black text-white border border-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-neutral-900"
                  >
                    <Plus size={14} /> QUICK ADD [{product.sizes[0]}]
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="px-3 py-2.5 bg-white text-black border border-black hover:bg-neutral-100"
                    title="View Details"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>

              {/* Product Info Block */}
              <div className="p-5 font-mono text-xs space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-heading font-bold text-base text-black group-hover:underline">
                      {product.name}
                    </h3>
                    <span className="font-bold text-base whitespace-nowrap">
                      ${product.price} USD
                    </span>
                  </div>
                  <p className="text-neutral-500 text-[11px] mt-1 line-clamp-1">
                    {product.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-[11px]">
                  <div className="flex gap-1.5 text-neutral-600">
                    <span>SIZES:</span>
                    {product.sizes.map((s) => (
                      <span key={s} className="font-semibold text-black">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="text-neutral-400 group-hover:text-black flex items-center gap-1">
                    INSPECT <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BRAND MANIFESTO SECTION */}
      <section className="w-full border-t border-b border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              BRAND MANIFESTO // 001
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tighter leading-tight">
              ANONYMITY AS A FORM OF RESISTANCE.
            </h2>
            <div className="w-12 h-1 bg-black"></div>
          </div>

          <div className="lg:col-span-7 font-mono text-xs sm:text-sm text-neutral-800 space-y-4 leading-relaxed border-l-0 lg:border-l border-black lg:pl-10">
            <p>
              Contemporary fashion prioritizes ephemeral seasonal trends, plastic synthetic blends,
              and loud exterior branding that treats the wearer as an unpaid billboard.
            </p>
            <p>
              ANON was initiated as a brutalist design experiment in Tokyo and Milan: to strip away
              all superficial ornament, enforce absolute monochrome discipline, and construct
              monolithic garments engineered from the highest-density Japanese cotton and weatherproof
              technical membranes.
            </p>
            <p className="font-bold text-black pt-2">
              WE DO NOT DESIGN FOR SEASONS. WE CONSTRUCT ARCHIVAL SILHOUETTES DESIGNED TO OUTLAST.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ATELIER TECHNICAL SPECIFICATIONS */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
          CONSTRUCTION STANDARDS
        </div>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight mb-8">
          ARCHIVAL GARMENT DISCIPLINE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 border border-black divide-y md:divide-y-0 md:divide-x divide-black font-mono text-xs">
          <div className="p-6 space-y-3 bg-white">
            <div className="p-3 border border-black w-fit">
              <Layers size={20} />
            </div>
            <h4 className="font-heading font-bold text-base">580 GSM FABRICATION</h4>
            <p className="text-neutral-600 leading-relaxed text-xs">
              Custom long-staple cotton looped in Wakayama on vintage circular sinker machines.
              Double-weight density.
            </p>
          </div>

          <div className="p-6 space-y-3 bg-white">
            <div className="p-3 border border-black w-fit">
              <Cpu size={20} />
            </div>
            <h4 className="font-heading font-bold text-base">HARDWARE INTEGRITY</h4>
            <p className="text-neutral-600 leading-relaxed text-xs">
              AustriAlpin Cobra buckles, German Fidlock magnets, and Italian Raccagni SuperR
              matte-black teeth.
            </p>
          </div>

          <div className="p-6 space-y-3 bg-white">
            <div className="p-3 border border-black w-fit">
              <Box size={20} />
            </div>
            <h4 className="font-heading font-bold text-base">VACUUM ARCHIVAL PACK</h4>
            <p className="text-neutral-600 leading-relaxed text-xs">
              Every dispatched piece is de-oxygenated, foil sealed, and numbered by hand in Tokyo.
            </p>
          </div>

          <div className="p-6 space-y-3 bg-white">
            <div className="p-3 border border-black w-fit">
              <Shield size={20} />
            </div>
            <h4 className="font-heading font-bold text-base">LIFETIME SEAM SUPPORT</h4>
            <p className="text-neutral-600 leading-relaxed text-xs">
              All structural stress points reinforced with bar-tacks and bonded waterproof tape.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
