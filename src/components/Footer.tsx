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

  // Ticker content for flawless infinite loop
  const TickerContent = () => (
    <>
      {[...Array(4)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="mx-6">🔥 NO SECOND THOUGHT</span>
          <span className="mx-6">•</span>
          <span className="mx-6">PREMIUM HEAVYWEIGHT STREETWEAR</span>
          <span className="mx-6">•</span>
          <span className="mx-6">NEXT-DAY DISPATCH</span>
          <span className="mx-6">•</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <footer className="w-full bg-[#FFFFFF] text-[#000000] border-t border-neutral-200 select-none mt-auto">
      
      {/* Top Banner Ticker (Flawless Loop) */}
      <div className="w-full bg-black text-white py-3 flex overflow-hidden whitespace-nowrap">
        <div className="flex shrink-0 animate-marquee items-center font-['JetBrains_Mono'] text-[10px] font-bold tracking-widest uppercase">
          <TickerContent />
        </div>
        <div className="flex shrink-0 animate-marquee items-center font-['JetBrains_Mono'] text-[10px] font-bold tracking-widest uppercase" aria-hidden="true">
          <TickerContent />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Col 1: Brand & Identity */}
        <div className="md:col-span-4 space-y-6">
          <Link to="/" className="block">
            <span className="font-['Clash_Display'] text-5xl font-semibold tracking-tighter text-black uppercase">
              ANON
            </span>
          </Link>
          <p className="font-['JetBrains_Mono'] text-xs text-neutral-500 leading-relaxed max-w-sm">
            Heavyweight streetwear engineered for the archives. Boxy fits, premium fabrics, and unyielding aesthetics.
          </p>
          <div className="font-['JetBrains_Mono'] text-[10px] text-neutral-400 font-bold uppercase tracking-widest space-y-1">
            <div>HQ: INDIA</div>
            <div>STATUS: FW26 DROP 01 LIVE</div>
          </div>
        </div>

        {/* Col 2: Navigation Links (Split into 2 sub-columns) */}
        <div className="md:col-span-4 grid grid-cols-2 gap-8 font-['JetBrains_Mono'] text-xs">
          <div className="space-y-4">
            <div className="font-bold tracking-widest uppercase text-black mb-4">
              Shop
            </div>
            <ul className="space-y-3 text-neutral-500">
              <li><Link to="/" className="hover:text-black transition-colors uppercase">Latest Drop</Link></li>
              <li><Link to="/" className="hover:text-black transition-colors uppercase">All Products</Link></li>
              <li><Link to="/track" className="hover:text-black transition-colors uppercase">Track Order</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-bold tracking-widest uppercase text-black mb-4">
              Support
            </div>
            <ul className="space-y-3 text-neutral-500">
              <li><Link to="/policies?tab=shipping" className="hover:text-black transition-colors uppercase">Shipping Info</Link></li>
              <li><Link to="/policies?tab=returns" className="hover:text-black transition-colors uppercase">Returns & Exchanges</Link></li>
              <li><Link to="/policies?tab=privacy" className="hover:text-black transition-colors uppercase">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Col 3: Newsletter & Socials */}
        <div className="md:col-span-4 space-y-6 font-['JetBrains_Mono']">
          <div>
            <div className="font-bold tracking-widest uppercase text-black mb-2 text-xs">
              Unlock Early Access
            </div>
            <p className="text-neutral-500 text-[11px] leading-relaxed mb-4">
              Join the club for exclusive drops, private restocks, and early access to FW26.
            </p>
          </div>

          {subscribed ? (
            <div className="border border-black bg-black text-white p-3 text-[11px] flex items-center gap-2 font-bold tracking-widest uppercase animate-in fade-in">
              <Check size={16} />
              <span>You're on the list.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex border border-neutral-300 focus-within:border-black transition-colors group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 text-xs bg-white text-black outline-none font-['JetBrains_Mono'] placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  className="px-5 bg-black text-white hover:bg-neutral-800 transition-colors flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            </form>
          )}

          <div className="pt-6">
            <div className="text-[10px] font-bold tracking-widest text-black mb-3 uppercase">Connect</div>
            <div className="flex gap-4 text-[11px] font-bold text-neutral-500">
              <a href="https://www.instagram.com/anon.clo.in/" target="_blank" rel="noreferrer" className="hover:text-black transition-colors uppercase">
                Instagram
              </a>
              <a href="https://discord.gg/vXZzdbsDf" target="_blank" rel="noreferrer" className="hover:text-black transition-colors uppercase">
                Discord
              </a>
              <a href="https://x.com/anonapparelz" target="_blank" rel="noreferrer" className="hover:text-black transition-colors uppercase">
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Baseline */}
      <div className="border-t border-neutral-200 bg-neutral-50 px-4 md:px-8 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between text-[10px] font-['JetBrains_Mono'] font-bold text-neutral-400 uppercase tracking-widest gap-4 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} ANON APPAREL CO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-4">
            <Link to="/policies" className="hover:text-black transition-colors">Terms of Service</Link>
            <span className="text-neutral-300">|</span>
            <Link to="/policies?tab=privacy" className="hover:text-black transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};