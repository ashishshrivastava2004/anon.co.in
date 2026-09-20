import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-white text-black border-t border-black select-none mt-auto">
      {/* Top Banner Ticker */}
      <div className="border-b border-black py-2.5 overflow-hidden bg-white">
        <div className="animate-marquee whitespace-nowrap text-xs font-mono tracking-widest text-black flex items-center">
          <span className="mx-6">★ ANON ARCHIVAL RESEARCH LAB</span>
          <span className="mx-6">SYSTEM_01 ACTIVE</span>
          <span className="mx-6">LIMITED SMALL BATCH RUNS ONLY</span>
          <span className="mx-6">580 GSM JAPANESE COTTON TERRY</span>
          <span className="mx-6">INDIAN EXPRESS COURIER</span>
          <span className="mx-6">★ ANON ARCHIVAL RESEARCH LAB</span>
          <span className="mx-6">SYSTEM_01 ACTIVE</span>
          <span className="mx-6">LIMITED SMALL BATCH RUNS ONLY</span>
          <span className="mx-6">580 GSM JAPANESE COTTON TERRY</span>
          <span className="mx-6">INDIAN EXPRESS COURIER</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Col 1: Brand & Manifesto (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="font-heading text-4xl font-extrabold tracking-tighter text-black block">
              ANON
            </span>
            <span className="text-xs font-mono text-neutral-600 block tracking-wider">
              ARCHIVAL RESEARCH // GARMENT ARCHITECTURE
            </span>
          </div>

          <p className="font-mono text-xs text-neutral-700 leading-relaxed max-w-sm">
            Constructing uncompromising brutalist silhouettes through heavy textile weights,
            functional modularity, and minimalist restraint. Founded on the principle of permanent
            garment utility.
          </p>

          <div className="font-mono text-[11px] text-neutral-500 space-y-1">
            <div>ATELIER COORDINATES: 35.6580° N, 139.7016° E</div>
            <div>STATUS: DROP 1 SOON // INDIA DISPATCH</div>
          </div>
        </div>

        {/* Col 2: Navigation Links (3 cols) */}
        <div className="md:col-span-3 space-y-4 font-mono text-xs">
          <div className="font-bold tracking-widest uppercase border-b border-black pb-2 text-black">
            DIRECTORY
          </div>
          <ul className="space-y-2.5 text-neutral-700">
            <li>
              <Link to="/" className="hover:text-black hover:underline block">
                &gt; ARCHIVE CATALOG
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-black hover:underline block">
                &gt; ORDER DISPATCH TRACKING
              </Link>
            </li>
            <li>
              <Link to="/policies?tab=shipping" className="hover:text-black hover:underline block">
                &gt; SHIPPING &amp; CUSTOMS
              </Link>
            </li>
            <li>
              <Link to="/policies?tab=returns" className="hover:text-black hover:underline block">
                &gt; RETURNS &amp; REPLACEMENTS
              </Link>
            </li>
            <li>
              <Link to="/policies?tab=privacy" className="hover:text-black hover:underline block">
                &gt; DATA &amp; PRIVACY POLICY
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Newsletter & Dispatch Alerts (4 cols) */}
        <div className="md:col-span-4 space-y-4 font-mono text-xs">
          <div className="font-bold tracking-widest uppercase border-b border-black pb-2 text-black">
            ARCHIVAL DISPATCH NOTICES
          </div>
          <p className="text-neutral-600 text-xs leading-relaxed">
            Receive encrypted cryptographic drops, private restock codes, and atelier production logs.
          </p>

          {subscribed ? (
            <div className="border border-black bg-black text-white p-3 flex items-center gap-2">
              <Check size={16} />
              <span>EMAIL TRANSMITTED. CLIENT RECORD CREATED.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex border border-black">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER CLIENT EMAIL"
                  className="flex-1 px-3 py-2.5 text-xs bg-white text-black outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-4 bg-black text-white hover:bg-neutral-800 transition-colors flex items-center justify-center font-bold"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
              <div className="text-[10px] text-neutral-500">
                NO PROMOTIONAL SPAM. IRREVOCABLE ZERO DATA LEASE GUARANTEE.
              </div>
            </form>
          )}

          <div className="pt-4 border-t border-neutral-200">
            <div className="text-[11px] font-bold text-black mb-2">COMMUNICATION CHANNELS:</div>
            <div className="flex flex-wrap gap-3 text-xs text-neutral-600">
              <a href="https://www.instagram.com/anon.clo.in/" target="_blank" rel="noreferrer" className="hover:text-black underline">
                [INSTAGRAM]
              </a>
              <a href="https://discord.gg/vXZzdbsDf" target="_blank" rel="noreferrer" className="hover:text-black underline">
                [DISCORD]
              </a>
              <a href="https://x.com/anonapparelz" target="_blank" rel="noreferrer" className="hover:text-black underline">
                [X / ARCHIVE]
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Baseline */}
      <div className="border-t border-black bg-white px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-600 gap-2">
          <div>
            © {new Date().getFullYear()} ANON APPAREL CO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-4">
            <Link to="/policies" className="hover:text-black underline">LEGAL PROTOCOLS</Link>
            <span>//</span>
            <span>SYSTEM 01 PRODUCTION GRADE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
