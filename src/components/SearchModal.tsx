import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper to safely parse images array
const safeParseArray = (field: any) => {
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    try { return JSON.parse(field); } catch { return []; }
  }
  return [];
};

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all products when modal opens
  useEffect(() => {
    const fetchAllProducts = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) throw error;

        if (data) {
          const safeData = data.map(item => ({
            ...item,
            images: safeParseArray(item.images),
            sizes: safeParseArray(item.sizes)
          })) as Product[];
          setProducts(safeData);
        }
      } catch (err) {
        console.error('Failed to fetch search products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter products based on search query
  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  });

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 select-none">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-top-4 duration-300 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 bg-white">
          <h2 className="font-['Clash_Display'] text-2xl font-semibold tracking-tight uppercase text-black">
            Search Archive
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Input Field */}
        <div className="flex items-center px-6 py-4 border-b border-neutral-200 focus-within:border-black transition-colors group bg-white">
          <Search size={22} strokeWidth={1.5} className="text-neutral-400 group-focus-within:text-black transition-colors" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, categories, or keywords..."
            className="flex-1 px-4 py-2 font-['JetBrains_Mono'] text-[14px] bg-transparent text-black outline-none placeholder:text-neutral-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[10px] font-['JetBrains_Mono'] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto scrollbar-thin bg-neutral-50">
          
          <div className="px-6 py-3 text-[10px] font-['JetBrains_Mono'] font-bold text-neutral-500 uppercase tracking-widest border-b border-neutral-200 flex justify-between bg-neutral-50 sticky top-0 z-10">
            <span>{loading ? 'Searching...' : `Results: ${filtered.length}`}</span>
            <span className="hidden sm:inline">Press item to inspect</span>
          </div>

          {loading ? (
             <div className="py-16 text-center font-['JetBrains_Mono'] text-neutral-500 text-[11px] uppercase tracking-widest animate-pulse">
               Accessing Archive...
             </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center font-['JetBrains_Mono'] text-neutral-500 text-[11px] uppercase tracking-widest flex flex-col items-center gap-3">
              <Search size={32} strokeWidth={1} className="text-neutral-300" />
              <span>No matching garments found for "{query}"</span>
            </div>
          ) : (
            <div className="flex flex-col">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item.id)}
                  className="px-6 py-4 flex items-center justify-between border-b border-neutral-200 hover:bg-white cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 aspect-[3/4] bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="font-['Clash_Display'] font-medium text-[15px] uppercase text-black leading-tight mb-1">
                        {item.name}
                      </div>
                      <div className="font-['JetBrains_Mono'] text-[11px] text-neutral-500 uppercase tracking-wider">
                        {item.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-['JetBrains_Mono'] font-bold text-[13px] text-black">
                      ₹{item.price}
                    </span>
                    <ArrowRight size={16} className="text-neutral-300 group-hover:text-black transition-colors hidden sm:block" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};