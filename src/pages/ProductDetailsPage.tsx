import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronDown, ChevronUp, ArrowLeft, ShoppingBag, ShieldCheck, Truck, RefreshCcw, ChevronLeft, ChevronRight, Star } from 'lucide-react';
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
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const [addedFeedback, setAddedFeedback] = useState(false);
  
  // States for Image Gallery Sync
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const toggleAccordion = (key: string) => {
    setActiveAccordion((prev) => (prev === key ? null : key));
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="w-full bg-[#FFFFFF] text-[#000000] selection:bg-black selection:text-white">
      {/* Breadcrumb & Top Bar */}
      <div className="px-4 md:px-8 py-4 max-w-[1400px] mx-auto flex items-center justify-between border-b border-neutral-200">
        <div className="flex items-center gap-2 text-neutral-500 font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider">
          <Link to="/" className="hover:text-black transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> HOME
          </Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-black transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-black font-semibold">{product.name}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 font-['JetBrains_Mono'] font-semibold text-[10px] tracking-widest uppercase">
          <Truck size={14} /> ⚡ SHIPS IN 24 HOURS
        </div>
      </div>

      {/* Main Product Layout: 2 Columns */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8">
        
        {/* Left Column: Swiper.js Image Gallery (7 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Desktop Thumbnail Strip */}
          <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveImageIndex(index);
                  if (swiperInstance) swiperInstance.slideTo(index);
                }}
                className={`aspect-[3/4] overflow-hidden bg-white transition-all border ${
                  activeImageIndex === index ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover object-center" />
              </button>
            ))}
          </div>

          {/* Main Image Slider (Gray Block Fixed 100%) */}
          <div className="relative w-full group overflow-hidden border border-black/10 bg-white">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev'
              }}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
              className="w-full h-full"
            >
              {product.images.map((imgUrl, idx) => (
                <SwiperSlide key={idx} className="w-full h-full bg-white">
                  <img 
                    src={imgUrl} 
                    alt={`${product.name} view`} 
                    className="w-full h-full aspect-[4/5] md:aspect-[3/4] object-cover object-center" 
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Clean Navigation Arrows */}
            <button className="swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white border border-black/10">
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button className="swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white border border-black/10">
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
            
            {/* Minimal Image Counter */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-['JetBrains_Mono'] font-bold rounded-sm border border-black/10">
              {String(activeImageIndex + 1).padStart(2, '0')} / {String(product.images.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Right Column: Details & Add to Cart (5 cols) */}
        <div className="lg:col-span-5 flex flex-col py-4 md:py-8 lg:pr-8">
          
          {/* Header */}
          <div className="border-b border-black pb-6 mb-6">
            <h1 className="font-['Clash_Display'] font-semibold text-3xl sm:text-4xl uppercase tracking-tight leading-none mb-3">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-5 font-['JetBrains_Mono'] text-xs">
              <div className="flex text-black">
                <Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/>
              </div>
              <span className="text-neutral-500 underline cursor-pointer">42 REVIEWS</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-['Clash_Display'] font-medium text-2xl tracking-wide">₹{product.price}</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-500 tracking-widest">MRP INCLUSIVE OF ALL TAXES</span>
            </div>
          </div>

          {/* Description */}
          <p className="font-['JetBrains_Mono'] text-neutral-600 text-[13px] leading-relaxed mb-6">
            {product.description} Upgrade your rotation with this premium drop. Cut for a relaxed, boxy fit to give you that effortless silhouette.
          </p>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-3 font-['JetBrains_Mono']">
              <span className="text-[11px] font-bold uppercase tracking-widest">SELECT SIZE</span>
              <button className="text-[10px] text-neutral-500 hover:text-black underline">SIZE GUIDE</button>
            </div>
            <div className="grid grid-cols-5 gap-2 font-['Clash_Display']">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-3 text-sm font-medium uppercase transition-all ${
                    selectedSize === sz
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-neutral-300 hover:border-black'
                  } border`}
                >
                  {sz}
                </button>
              ))}
            </div>
            {product.stockCount <= 5 && (
              <p className="font-['JetBrains_Mono'] text-red-500 text-[10px] font-bold mt-3 tracking-widest uppercase">
                🔥 HURRY, ONLY {product.stockCount} LEFT IN STOCK!
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8 h-14">
            <div className="flex items-center border border-black w-28 justify-between font-['JetBrains_Mono']">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-full h-full hover:bg-neutral-100 transition-colors">-</button>
              <span className="font-bold text-sm w-full text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-full h-full hover:bg-neutral-100 transition-colors">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white font-['Clash_Display'] font-medium uppercase tracking-widest text-sm hover:bg-white hover:text-black hover:border-black border border-black transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {addedFeedback ? 'ADDED TO BAG' : 'ADD TO BAG'}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 p-4 border border-black mb-8 font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-wider text-black">
            <div className="flex items-center gap-2"><Truck size={14} /> FREE EXPRESS SHIPPING</div>
            <div className="flex items-center gap-2"><RefreshCcw size={14} /> 7-DAY HASSLE FREE RETURNS</div>
            <div className="flex items-center gap-2"><ShieldCheck size={14} /> SECURE CHECKOUT</div>
            <div className="flex items-center gap-2"><Star size={14} /> PREMIUM QUALITY ASSURED</div>
          </div>

          {/* Accordions */}
          <div className="border-t border-black font-['JetBrains_Mono']">
            {/* Product Details */}
            <div className="border-b border-black">
              <button onClick={() => toggleAccordion('details')} className="w-full py-4 flex items-center justify-between text-left font-bold uppercase tracking-widest text-[11px]">
                <span>PRODUCT DETAILS & FIT</span>
                {activeAccordion === 'details' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {activeAccordion === 'details' && (
                <div className="pb-4 text-[12px] text-neutral-600 space-y-2">
                  <ul className="list-inside space-y-1">
                    <li><span className="text-black font-bold">MATERIAL:</span> {product.specs.material}</li>
                    <li><span className="text-black font-bold">WEIGHT:</span> {product.specs.weight}</li>
                    <li><span className="text-black font-bold">FIT:</span> {product.specs.fit}</li>
                    <li><span className="text-black font-bold">HARDWARE:</span> {product.specs.hardware}</li>
                  </ul>
                  <p className="pt-2 text-[10px] uppercase">Model is 6'1" and wearing size L.</p>
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div className="border-b border-black">
              <button onClick={() => toggleAccordion('care')} className="w-full py-4 flex items-center justify-between text-left font-bold uppercase tracking-widest text-[11px]">
                <span>WASH CARE</span>
                {activeAccordion === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {activeAccordion === 'care' && (
                <div className="pb-4 text-[12px] text-neutral-600">
                  <p>{product.specs.care}</p>
                  <p className="mt-2 text-[10px] uppercase">Machine wash cold. Do not tumble dry. Iron on reverse.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Complete The Look / Related Products */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 border-t border-black">
        <h2 className="font-['Clash_Display'] font-semibold text-2xl uppercase tracking-tight mb-8">COMPLETE THE LOOK</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((rel) => (
            <div key={rel.id} onClick={() => navigate(`/product/${rel.id}`)} className="cursor-pointer group">
              <div className="aspect-[3/4] bg-white mb-4 overflow-hidden relative border border-black/10 group-hover:border-black transition-colors">
                <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="space-y-1 font-['JetBrains_Mono']">
                <h3 className="font-bold text-[11px] uppercase tracking-wider truncate">{rel.name}</h3>
                <p className="text-[12px] font-medium text-neutral-600">₹{rel.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};