import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronDown, ChevronUp, ArrowLeft, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

// Import Swiper CSS styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('fabric');
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const toggleAccordion = (key: string) => {
    setActiveAccordion((prev) => (prev === key ? null : key));
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="w-full bg-white text-black select-none">
      {/* Breadcrumb & Navigation Bar */}
      <div className="border-b border-black px-4 md:px-8 py-3 max-w-7xl mx-auto flex items-center justify-between font-mono text-xs">
        <Link
          to="/"
          className="flex items-center gap-1 hover:underline text-black font-semibold"
        >
          <ArrowLeft size={14} /> &lt; RETURN TO ARCHIVE
        </Link>
        <div className="text-neutral-500 hidden sm:block">
          CATALOG // {product.category} // {product.code}
        </div>
        <div className="text-neutral-500">
          DISPATCH: TOKYO ATELIER
        </div>
      </div>

      {/* Main Product Layout: 2 Columns with 1px black divider */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 border-b border-black">
        {/* Left Column: Swiper.js Image Gallery (7 cols) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-black p-4 sm:p-8 flex flex-col justify-between">
          <div className="relative border border-black bg-neutral-100 overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom'
              }}
              onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
              className="w-full aspect-[4/5]"
            >
              {product.images.map((imgUrl, idx) => (
                <SwiperSlide key={idx} className="w-full h-full">
                  <img
                    src={imgUrl}
                    alt={`${product.name} - view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Sharp Brutalist Swiper Controls */}
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button
                className="swiper-button-prev-custom px-3 py-2 bg-white text-black border border-black hover:bg-black hover:text-white transition-colors font-mono text-xs font-bold"
                aria-label="Previous image"
              >
                [PREV]
              </button>
              <button
                className="swiper-button-next-custom px-3 py-2 bg-white text-black border border-black hover:bg-black hover:text-white transition-colors font-mono text-xs font-bold"
                aria-label="Next image"
              >
                [NEXT]
              </button>
            </div>

            {/* Image Counter Badge */}
            <div className="absolute top-4 left-4 z-10 bg-black text-white px-2 py-1 font-mono text-xs border border-black">
              FRAME {String(activeImageIndex + 1).padStart(2, '0')} / {String(product.images.length).padStart(2, '0')}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`border aspect-[4/5] overflow-hidden bg-neutral-100 transition-opacity ${
                  activeImageIndex === index
                    ? 'border-2 border-black opacity-100'
                    : 'border-black opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Garment Specs, Size Selector, Add to Cart (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 font-mono text-xs flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            {/* Title & Price Header */}
            <div className="border-b border-black pb-6 space-y-2">
              <div className="flex justify-between items-center text-[11px] text-neutral-500 tracking-wider">
                <span>SKU: {product.code}</span>
                <span className="text-black font-bold">● READY FOR DISPATCH</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline justify-between pt-2">
                <span className="font-heading text-2xl sm:text-3xl font-bold">
                  ${product.price} {product.currency}
                </span>
                <span className="text-[11px] text-neutral-600">
                  TAX &amp; ATELIER SURCHARGE INCLUDED
                </span>
              </div>
            </div>

            {/* Garment Editorial Description */}
            <p className="text-neutral-700 leading-relaxed text-xs sm:text-sm">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase tracking-wider text-black">
                  SELECT GARMENT SIZE:
                </span>
                <button
                  onClick={() => toggleAccordion('fit')}
                  className="text-neutral-500 hover:text-black underline text-[11px]"
                >
                  SIZE DIMENSION CHART &gt;
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 text-center border border-black font-mono text-xs font-bold transition-colors ${
                      selectedSize === sz
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-neutral-500 flex items-center justify-between pt-1">
                <span>INVENTORY STATUS:</span>
                <span className="font-bold text-black">
                  {product.stockCount <= 4
                    ? `CRITICAL STOCK: ${product.stockCount} UNITS REMAINING`
                    : `ALLOCATION AVAILABLE (${product.stockCount} UNITS)`}
                </span>
              </div>
            </div>

            {/* Quantity Selector & Add To Cart Button */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <div className="flex items-center border border-black w-32 justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 hover:bg-black hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 hover:bg-black hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 text-xs"
                >
                  <ShoppingBag size={16} />
                  <span>ADD TO CART // ${product.price * quantity}</span>
                </button>
              </div>

              {addedFeedback && (
                <div className="border border-black bg-black text-white p-3 flex items-center justify-between text-xs animate-in fade-in duration-200">
                  <span className="flex items-center gap-2">
                    <Check size={16} />
                    ALLOCATED [{quantity}x {product.code} - {selectedSize}] TO CART
                  </span>
                  <Link to="/track" className="underline font-bold text-[11px]">
                    CHECKOUT &gt;
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200 text-[11px] text-neutral-600">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-black" />
                <span>WORLDWIDE AIR DISPATCH</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-black" />
                <span>ARCHIVAL AUTHENTICITY SEAL</span>
              </div>
            </div>

            {/* Technical Garment Specs Accordion */}
            <div className="border-t border-black pt-4 space-y-2">
              {/* Accordion 1: Material & Specs */}
              <div className="border border-black">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full p-3.5 flex items-center justify-between text-left font-bold uppercase tracking-wider hover:bg-neutral-50"
                >
                  <span>01 // FABRIC &amp; MATERIAL COMPOSITION</span>
                  {activeAccordion === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeAccordion === 'fabric' && (
                  <div className="p-4 border-t border-black bg-neutral-50 space-y-2 text-neutral-700 text-xs">
                    <div className="flex justify-between border-b border-neutral-200 pb-1">
                      <span className="text-neutral-500">MATERIAL:</span>
                      <span className="font-semibold text-black text-right">{product.specs.material}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-1">
                      <span className="text-neutral-500">WEIGHT:</span>
                      <span className="font-semibold text-black">{product.specs.weight}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-1">
                      <span className="text-neutral-500">ORIGIN:</span>
                      <span className="font-semibold text-black">{product.specs.origin}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fit & Measurements Matrix */}
              <div className="border border-black">
                <button
                  onClick={() => toggleAccordion('fit')}
                  className="w-full p-3.5 flex items-center justify-between text-left font-bold uppercase tracking-wider hover:bg-neutral-50"
                >
                  <span>02 // FIT ARCHITECTURE &amp; DIMENSIONS</span>
                  {activeAccordion === 'fit' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeAccordion === 'fit' && (
                  <div className="p-4 border-t border-black bg-neutral-50 space-y-3 text-neutral-700 text-xs">
                    <p className="font-semibold text-black">{product.specs.fit}</p>
                    {product.dimensions && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border border-black text-[11px] bg-white">
                          <thead className="bg-black text-white">
                            <tr>
                              <th className="p-1.5 border-r border-neutral-700">SIZE</th>
                              <th className="p-1.5 border-r border-neutral-700">CHEST</th>
                              <th className="p-1.5 border-r border-neutral-700">LENGTH</th>
                              <th className="p-1.5 border-r border-neutral-700">SHOULDER</th>
                              <th className="p-1.5">SLEEVE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.dimensions.map((dim) => (
                              <tr key={dim.size} className="border-t border-black">
                                <td className="p-1.5 font-bold border-r border-black">{dim.size}</td>
                                <td className="p-1.5 border-r border-black">{dim.chest}</td>
                                <td className="p-1.5 border-r border-black">{dim.length}</td>
                                <td className="p-1.5 border-r border-black">{dim.shoulder}</td>
                                <td className="p-1.5">{dim.sleeve}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 3: Hardware & Construction */}
              <div className="border border-black">
                <button
                  onClick={() => toggleAccordion('hardware')}
                  className="w-full p-3.5 flex items-center justify-between text-left font-bold uppercase tracking-wider hover:bg-neutral-50"
                >
                  <span>03 // HARDWARE &amp; CONSTRUCTION</span>
                  {activeAccordion === 'hardware' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeAccordion === 'hardware' && (
                  <div className="p-4 border-t border-black bg-neutral-50 space-y-2 text-neutral-700 text-xs">
                    <div className="flex justify-between border-b border-neutral-200 pb-1">
                      <span className="text-neutral-500">HARDWARE:</span>
                      <span className="font-semibold text-black text-right">{product.specs.hardware}</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 pt-1">
                      Reinforced bar-tack stress points. Laser-cut seam allowance. Vacuum sealed with non-degrading nitrogen pack.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Care Protocols */}
              <div className="border border-black">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full p-3.5 flex items-center justify-between text-left font-bold uppercase tracking-wider hover:bg-neutral-50"
                >
                  <span>04 // ARCHIVAL CARE PROTOCOLS</span>
                  {activeAccordion === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {activeAccordion === 'care' && (
                  <div className="p-4 border-t border-black bg-neutral-50 space-y-2 text-neutral-700 text-xs">
                    <p className="text-black font-semibold">{product.specs.care}</p>
                    <p className="text-[11px] text-neutral-600">
                      Do not expose to high heat tumble cycles. Iron on reverse using a protective cloth barrier.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Archival Pieces Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex justify-between items-end border-b border-black pb-4 mb-6">
          <div>
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              SYSTEM_01 COMPANION PIECES
            </div>
            <h3 className="font-heading text-2xl font-bold">
              RELATED ARCHIVAL SILHOUETTES
            </h3>
          </div>
          <Link to="/" className="font-mono text-xs hover:underline text-black font-bold">
            VIEW FULL ARCHIVE &gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-black divide-y md:divide-y-0 md:divide-x divide-black">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => navigate(`/product/${rel.id}`)}
              className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors group"
            >
              <div className="aspect-[4/5] bg-neutral-100 border border-black mb-3 overflow-hidden">
                <img
                  src={rel.images[0]}
                  alt={rel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="font-mono text-xs space-y-1">
                <div className="text-[10px] text-neutral-500">{rel.code}</div>
                <div className="font-heading font-bold text-sm group-hover:underline">{rel.name}</div>
                <div className="font-bold">${rel.price} USD</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
