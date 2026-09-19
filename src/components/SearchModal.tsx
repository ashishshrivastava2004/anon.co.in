import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q)
    );
  });

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-start justify-center p-4 sm:p-6 pt-20">
      <div className="w-full max-w-2xl bg-white border border-black p-6 select-none shadow-none">
        <div className="flex items-center justify-between border-b border-black pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black inline-block"></span>
            <h2 className="font-heading text-xl font-bold tracking-tight">SEARCH ARCHIVE</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 border border-black hover:bg-black hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Input Field */}
        <div className="flex border border-black mb-6">
          <div className="p-3 bg-neutral-100 border-r border-black flex items-center justify-center">
            <Search size={18} />
          </div>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="TYPE SKU, SILHOUETTE, HOODIE, CARGO, JACKET..."
            className="flex-1 px-4 py-3 font-mono text-xs bg-white text-black outline-none tracking-wider"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="px-3 hover:text-neutral-500 font-mono text-xs"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="space-y-3 max-h-96 overflow-y-auto font-mono text-xs">
          <div className="text-[10px] text-neutral-500 uppercase tracking-widest border-b border-neutral-200 pb-1 flex justify-between">
            <span>RESULTS FOUND: [{filtered.length}]</span>
            <span>PRESS ITEM TO INSPECT</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-10 text-center text-neutral-500">
              NO MATCHING GARMENTS FOUND FOR &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectProduct(item.id)}
                className="border border-black p-3 flex items-center justify-between hover:bg-neutral-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-14 object-cover border border-black"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-heading font-bold text-sm text-black">{item.name}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      CODE: {item.code} // CAT: {item.category}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-sm">${item.price} USD</span>
                  <div className="p-1 border border-black hover:bg-black hover:text-white">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
