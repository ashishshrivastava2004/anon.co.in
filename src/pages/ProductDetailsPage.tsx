import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronDown, ChevronUp, ArrowLeft, ShoppingBag, ShieldCheck, Truck, RefreshCcw, ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Helper to Safely Parse Supabase JSON Strings/Arrays
const safeParseArray = (field: any) => {
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    try { 
      const parsed = JSON.parse(field); 
      return Array.isArray(parsed) ? parsed : [];
    } catch { 
      return []; 
    }
  }
  return [];
};

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const [addedFeedback, setAddedFeedback] = useState(false);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  // Phase 2: Wishlist & Reviews States
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch Product (Yahan .single() sahi hai kyunki product hona hi chahiye)
        const { data: currentData, error: fetchError } = await supabase.from('products').select('*').eq('id', id).single();
        if (fetchError) throw fetchError;
        
        if (currentData) {
          const rawImages = currentData.images_url || currentData.images;
          
          const safeProduct = { 
            ...currentData, 
            images: safeParseArray(rawImages), 
            sizes: safeParseArray(currentData.sizes) 
          } as Product;

          setProduct(safeProduct);
          if (safeProduct.sizes && safeProduct.sizes.length > 0) setSelectedSize(safeProduct.sizes[0] as any);
          
          // Fetch Related Products
          const { data: relatedData } = await supabase.from('products').select('*').neq('id', id).limit(4);
          if (relatedData) {
            setRelatedProducts(relatedData.map(rel => ({ 
              ...rel, 
              images: safeParseArray(rel.images_url || rel.images), 
              sizes: safeParseArray(rel.sizes) 
            })) as Product[]);
          }

          // Fetch Reviews (Yahan error nahi aayega kyunki list aati hai)
          const { data: reviewsData } = await supabase.from('reviews').select('*').eq('product_id', id).order('created_at', { ascending: false });
          if (reviewsData) setReviews(reviewsData);

          // Check if Wishlisted
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            // FIX APPLIED HERE: Used .maybeSingle() instead of .single()
            const { data: wishData } = await supabase.from('wishlist').select('*').eq('product_id', id).eq('user_id', user.id).maybeSingle();
            if (wishData) setIsWishlisted(true);
          }
        }
      } catch (err: any) {
        console.error("Product fetch error:", err);
        setError('PRODUCT ARCHIVE NOT FOUND.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductData();
  }, [id]);

  const handleWishlistToggle = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please login to save items to your wishlist.");
      return;
    }

    if (isWishlisted) {
      await supabase.from('wishlist').delete().eq('product_id', id).eq('user_id', user.id);
      setIsWishlisted(false);
    } else {
      await supabase.from('wishlist').insert([{ product_id: id, user_id: user.id }]);
      setIsWishlisted(true);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const userName = user?.email?.split('@')[0] || 'Anonymous Client';

    const { data, error } = await supabase.from('reviews').insert([
      { product_id: id, user_name: userName, rating: newReview.rating, comment: newReview.comment }
    ]).select();

    if (!error && data) {
      setReviews([data[0], ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  const toggleAccordion = (key: string) => setActiveAccordion((prev) => (prev === key ? null : key));

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, selectedSize, quantity);
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 2500);
    }
  };

  if (loading) return <div className="w-full min-h-[70vh] flex items-center justify-center bg-white"><span className="font-['JetBrains_Mono'] text-sm uppercase tracking-widest animate-pulse">LOADING ARCHIVE...</span></div>;
  if (error || !product) return <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-white space-y-4"><h1 className="font-['Clash_Display'] text-2xl uppercase tracking-widest">Archive Not Found</h1><button onClick={() => navigate('/')} className="mt-4 px-6 py-3 bg-black text-white font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest">RETURN TO HOME</button></div>;

  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) : '5.0';
  
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ['https://via.placeholder.com/600x800?text=Atelier+Monolith'];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#000000] selection:bg-black selection:text-white">
      <div className="px-4 md:px-8 py-4 max-w-[1400px] mx-auto flex items-center justify-between border-b border-neutral-200">
        <div className="flex items-center gap-2 text-neutral-500 font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider">
          <Link to="/" className="hover:text-black transition-colors flex items-center gap-1"><ArrowLeft size={14} /> HOME</Link><span>/</span><span className="text-black font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8">
        
        {/* Images */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
            {productImages.map((img, index) => (
              <button key={index} onClick={() => { setActiveImageIndex(index); if (swiperInstance) swiperInstance.slideTo(index); }} className={`aspect-[3/4] overflow-hidden bg-white transition-all border ${activeImageIndex === index ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover object-center" />
              </button>
            ))}
          </div>
          <div className="relative w-full group overflow-hidden border border-black/10 bg-white">
            <Swiper modules={[Navigation, Pagination]} spaceBetween={0} slidesPerView={1} onSwiper={setSwiperInstance} onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)} className="w-full h-full">
              {productImages.map((imgUrl, idx) => (
                <SwiperSlide key={idx} className="w-full h-full bg-white">
                  <img src={imgUrl} alt={`${product.name} view`} className="w-full h-full aspect-[4/5] md:aspect-[3/4] object-cover object-center" />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-['JetBrains_Mono'] font-bold rounded-sm border border-black/10">
              {String(activeImageIndex + 1).padStart(2, '0')} / {String(productImages.length || 1).padStart(2, '0')}
            </div>
            <button onClick={handleWishlistToggle} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-colors border border-black/10">
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : ""} />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-5 flex flex-col py-4 md:py-8 lg:pr-8">
          <div className="border-b border-black pb-6 mb-6">
            <h1 className="font-['Clash_Display'] font-semibold text-3xl sm:text-4xl uppercase tracking-tight leading-none mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-5 font-['JetBrains_Mono'] text-xs">
              <div className="flex text-black items-center gap-1">
                <Star size={14} fill="currentColor"/> <span className="font-bold">{averageRating}</span>
              </div>
              <span className="text-neutral-500 underline cursor-pointer" onClick={() => toggleAccordion('reviews')}>{reviews.length} REVIEWS</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-['Clash_Display'] font-medium text-2xl tracking-wide">₹{product.price || 0}</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-500 tracking-widest">MRP INCLUSIVE OF ALL TAXES</span>
            </div>
          </div>

          <p className="font-['JetBrains_Mono'] text-neutral-600 text-[13px] leading-relaxed mb-6">{product.description}</p>

          <div className="mb-6">
            <div className="flex justify-between items-end mb-3 font-['JetBrains_Mono']">
              <span className="text-[11px] font-bold uppercase tracking-widest">SELECT SIZE</span>
            </div>
            <div className="grid grid-cols-5 gap-2 font-['Clash_Display']">
              {(product.sizes && product.sizes.length > 0 ? product.sizes : ['Free Size']).map((sz: any) => (
                <button key={sz} onClick={() => setSelectedSize(sz)} className={`py-3 text-sm font-medium uppercase transition-all ${selectedSize === sz ? 'bg-black text-white border-black' : 'bg-white text-black border-neutral-300 hover:border-black'} border`}>{sz}</button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-8 h-14">
            <div className="flex items-center border border-black w-28 justify-between font-['JetBrains_Mono']">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-full h-full hover:bg-neutral-100 transition-colors">-</button>
              <span className="font-bold text-sm w-full text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-full h-full hover:bg-neutral-100 transition-colors">+</button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 bg-black text-white font-['Clash_Display'] font-medium uppercase tracking-widest text-sm hover:bg-white hover:text-black hover:border-black border border-black transition-all flex items-center justify-center gap-2">
              <ShoppingBag size={18} strokeWidth={1.5} /> {addedFeedback ? 'ADDED TO BAG' : 'ADD TO BAG'}
            </button>
          </div>

          {/* Accordions */}
          <div className="border-t border-black font-['JetBrains_Mono'] mt-8">
            <div className="border-b border-black">
              <button onClick={() => toggleAccordion('details')} className="w-full py-4 flex items-center justify-between text-left font-bold uppercase tracking-widest text-[11px]">
                <span>PRODUCT DETAILS & FIT</span>
                {activeAccordion === 'details' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {activeAccordion === 'details' && (
                <div className="pb-4 text-[12px] text-neutral-600 space-y-2">
                  <ul className="list-inside space-y-1">
                    <li><span className="text-black font-bold">PREMIUM FABRIC:</span> See inner label.</li>
                    <li><span className="text-black font-bold">FIT:</span> Boxy, dropped shoulder.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* REVIEWS SECTION */}
            <div className="border-b border-black">
              <button onClick={() => toggleAccordion('reviews')} className="w-full py-4 flex items-center justify-between text-left font-bold uppercase tracking-widest text-[11px]">
                <span>CLIENT REVIEWS ({reviews.length})</span>
                {activeAccordion === 'reviews' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {activeAccordion === 'reviews' && (
                <div className="pb-4">
                  <form onSubmit={handleReviewSubmit} className="mb-6 p-4 bg-neutral-50 border border-neutral-200">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Leave a Review</p>
                    <select value={newReview.rating} onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})} className="w-full mb-2 p-2 border border-neutral-300 text-xs outline-none">
                      <option value={5}>5 Stars - Perfect</option>
                      <option value={4}>4 Stars - Great</option>
                      <option value={3}>3 Stars - Average</option>
                      <option value={2}>2 Stars - Poor</option>
                      <option value={1}>1 Star - Terrible</option>
                    </select>
                    <textarea required value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} placeholder="Share your thoughts on the fit and quality..." className="w-full p-2 border border-neutral-300 text-xs mb-2 h-16 outline-none resize-none" />
                    <button type="submit" className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-neutral-800">Submit Review</button>
                  </form>

                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {reviews.length === 0 ? (
                      <p className="text-[11px] text-neutral-500 uppercase tracking-widest">No reviews yet. Be the first.</p>
                    ) : (
                      reviews.map((rev) => (
                        <div key={rev.id} className="border-b border-neutral-100 pb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold uppercase">{rev.user_name}</span>
                            <div className="flex text-black"><Star size={10} fill="currentColor"/><span className="text-[10px] ml-1">{rev.rating}/5</span></div>
                          </div>
                          <p className="text-xs text-neutral-600">{rev.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};