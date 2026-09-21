import React, { useState } from 'react';
import { X, UserCheck, Package, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [clientId] = useState('ANON-9104');
  const [tier] = useState('INNER CIRCLE');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 select-none">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 bg-white">
          <h2 className="font-['Clash_Display'] text-2xl font-semibold tracking-tight uppercase text-black">
            My Account
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 -mr-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 font-['JetBrains_Mono']">
          
          {/* Profile Details Card */}
          <div className="border border-neutral-200 p-4 bg-neutral-50 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-bold uppercase tracking-widest">Client ID:</span>
              <span className="font-bold text-black">{clientId}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-bold uppercase tracking-widest">Status:</span>
              <span className="text-black font-bold flex items-center gap-1">
                <UserCheck size={14} /> ACTIVE
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-bold uppercase tracking-widest">Tier:</span>
              <span className="text-white font-bold bg-black px-2 py-0.5 tracking-wider">{tier}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
              Quick Actions
            </div>
            
            <Link 
              to="/track" 
              onClick={onClose} 
              className="w-full py-3.5 px-4 border border-neutral-200 hover:border-black transition-colors flex items-center justify-between text-xs font-bold uppercase tracking-widest text-black group"
            >
              <span className="flex items-center gap-3">
                <Package size={16} strokeWidth={1.5} /> Track Order
              </span>
              <ArrowRight size={16} className="text-neutral-400 group-hover:text-black transition-colors" />
            </Link>
            
            <Link 
              to="/policies?tab=shipping" 
              onClick={onClose} 
              className="w-full py-3.5 px-4 border border-neutral-200 hover:border-black transition-colors flex items-center justify-between text-xs font-bold uppercase tracking-widest text-black group"
            >
              <span className="flex items-center gap-3">
                <ShieldCheck size={16} strokeWidth={1.5} /> Shipping & Returns
              </span>
              <ArrowRight size={16} className="text-neutral-400 group-hover:text-black transition-colors" />
            </Link>
          </div>

          {/* Security / Privacy Note */}
          <div className="pt-4 border-t border-neutral-200 text-[9px] text-neutral-400 leading-relaxed uppercase tracking-widest text-center">
            Secure session. Your data is encrypted and strictly used for order fulfillment. No third-party tracking.
          </div>
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
           <button 
             onClick={onClose} 
             className="w-full py-4 bg-black text-white font-['Clash_Display'] font-medium text-[15px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
           >
             Close Account
           </button>
        </div>
        
      </div>
    </div>
  );
};