import React, { useState } from 'react';
import { X, UserCheck, Package, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [clientId] = useState('ANON-CLIENT-9104');
  const [tier] = useState('TIER 01 / ARCHIVAL INNER CIRCLE');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-black p-6 select-none font-mono text-xs shadow-none">
        <div className="flex items-center justify-between border-b border-black pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black inline-block"></span>
            <h2 className="font-heading text-xl font-bold tracking-tight">CLIENT TERMINAL</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 border border-black hover:bg-black hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="border border-black p-4 bg-neutral-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">CLIENT ID:</span>
              <span className="font-bold text-black bg-white px-2 py-0.5 border border-black">
                {clientId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">ACCESS STATUS:</span>
              <span className="text-black font-semibold flex items-center gap-1">
                <UserCheck size={14} /> ACTIVE &amp; VERIFIED
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">MEMBERSHIP:</span>
              <span className="text-black font-bold">{tier}</span>
            </div>
          </div>

          <div className="border border-black p-4 space-y-3">
            <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-black">
              <Package size={15} /> QUICK ACTIONS
            </div>
            <div className="space-y-2">
              <Link
                to="/track"
                onClick={onClose}
                className="w-full py-2.5 px-3 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-between text-xs"
              >
                <span>OPEN ORDER DISPATCH TRACKER</span>
                <ExternalLink size={14} />
              </Link>
              <Link
                to="/policies?tab=shipping"
                onClick={onClose}
                className="w-full py-2.5 px-3 border border-black hover:bg-neutral-100 transition-colors flex items-center justify-between text-xs"
              >
                <span>VIEW GLOBAL COURIER PROTOCOLS</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          <div className="p-3 border border-neutral-200 bg-neutral-50 text-[11px] space-y-1 text-neutral-600">
            <div className="flex items-center gap-1 font-bold text-black">
              <Shield size={13} /> ANONYMOUS SESSIONS
            </div>
            <p>
              Client records are bound to cryptographic identifiers. No marketing tracking or profiling algorithms are deployed.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-black flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors uppercase font-mono text-xs font-bold"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
