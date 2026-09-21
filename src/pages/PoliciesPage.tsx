import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shield, Truck, RefreshCw, FileText } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'shipping';

  const tabs = [
    { id: 'shipping', label: 'Shipping Info', icon: Truck },
    { id: 'returns', label: 'Returns & Exchanges', icon: RefreshCw },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText }
  ];

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#000000] min-h-[80vh] select-none py-12 px-4 md:px-8">
      <div className="max-w-[900px] mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 space-y-3 text-center sm:text-left">
          <div className="text-[10px] font-['JetBrains_Mono'] font-bold text-neutral-500 uppercase tracking-widest">
            Help Center & Legal
          </div>
          <h1 className="font-['Clash_Display'] text-4xl sm:text-5xl font-semibold tracking-tight uppercase">
            Policies & Protocols
          </h1>
          <p className="font-['JetBrains_Mono'] text-xs text-neutral-500 max-w-xl mx-auto sm:mx-0 leading-relaxed">
            Everything you need to know about dispatch timelines, our 7-day return policy, and how we protect your data.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex overflow-x-auto scrollbar-none border-b border-neutral-200">
          <div className="flex min-w-max w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 transition-all font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest relative ${
                    isActive
                      ? 'text-black'
                      : 'text-neutral-400 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                  <span className="hidden sm:inline whitespace-nowrap">{tab.label}</span>
                  
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="p-2 sm:p-6 font-['JetBrains_Mono'] text-xs space-y-8 bg-white min-h-[400px]">
          
          {/* TAB 1: SHIPPING */}
          {currentTab === 'shipping' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-2">
                <h2 className="font-['Clash_Display'] text-2xl font-semibold uppercase tracking-wide">Shipping & Dispatch</h2>
                <span className="text-neutral-400 text-[10px] uppercase tracking-widest">Updated: September 2026</span>
              </div>

              <div className="space-y-6 text-neutral-600 leading-relaxed">
                <div>
                  <h3 className="font-bold text-black uppercase mb-2">1. Dispatch Timelines</h3>
                  <p>
                    All orders are processed and handed over to our delivery partners within 24 hours of confirmation. You will receive a tracking link via email as soon as your order leaves our warehouse.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black uppercase mb-2">2. Free Express Shipping</h3>
                  <p>
                    We offer <span className="font-bold text-black">FREE Express Shipping</span> on all prepaid orders across India with a cart value of ₹3000 or above. For orders below ₹3000, a standard shipping fee of ₹100 applies.
                  </p>
                </div>

                <div className="border border-neutral-200 mt-4">
                  <div className="bg-neutral-50 p-3 border-b border-neutral-200 flex justify-between font-bold text-black text-[10px] uppercase tracking-widest">
                    <span>Delivery Region</span>
                    <span>Estimated Transit Time</span>
                  </div>
                  <div className="p-3 flex justify-between border-b border-neutral-100">
                    <span>Metro Cities (India)</span>
                    <span>1-3 Business Days</span>
                  </div>
                  <div className="p-3 flex justify-between border-b border-neutral-100">
                    <span>Rest of India</span>
                    <span>3-5 Business Days</span>
                  </div>
                  <div className="p-3 flex justify-between text-neutral-400">
                    <span>International Orders</span>
                    <span>Currently Unavailable</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RETURNS */}
          {currentTab === 'returns' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-2">
                <h2 className="font-['Clash_Display'] text-2xl font-semibold uppercase tracking-wide">Returns & Exchanges</h2>
                <span className="text-neutral-400 text-[10px] uppercase tracking-widest">7-Day Hassle Free Policy</span>
              </div>

              <div className="space-y-6 text-neutral-600 leading-relaxed">
                <div>
                  <h3 className="font-bold text-black uppercase mb-2">1. Eligibility Conditions</h3>
                  <p>
                    We accept returns and size exchanges within <span className="font-bold text-black">7 calendar days</span> from the date of delivery. Garments must remain unwashed, unworn, and in their original packaging with all tags intact.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black uppercase mb-2">2. Non-Returnable Items</h3>
                  <p>
                    Limited edition drops marked as "FINAL SALE", accessories, and innerwear are strictly non-returnable unless they arrive with a verified manufacturing defect.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black uppercase mb-2">3. How to Initiate a Return</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Navigate to the <span className="font-bold text-black">Track Order</span> page.</li>
                    <li>Enter your Order ID and select "Initiate Return / Exchange".</li>
                    <li>Pack the garment securely in its original box.</li>
                    <li>Our courier partner will pick up the package within 24-48 hours.</li>
                  </ul>
                  <p className="mt-3">Once the item reaches our warehouse and passes quality check, your refund or exchange will be processed within 3 business days.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY */}
          {currentTab === 'privacy' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-2">
                <h2 className="font-['Clash_Display'] text-2xl font-semibold uppercase tracking-wide">Privacy Policy</h2>
                <span className="text-neutral-400 text-[10px] uppercase tracking-widest">Strict Data Protection</span>
              </div>

              <div className="space-y-6 text-neutral-600 leading-relaxed">
                <div>
                  <h3 className="font-bold text-black uppercase mb-2">1. Data Collection Minimalism</h3>
                  <p>
                    ANON collects only the essential details required to process and deliver your physical garments (Name, Shipping Address, Contact Info). We do not sell, lease, or trade your data to third-party marketing consortiums.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black uppercase mb-2">2. Secure Transactions</h3>
                  <p>
                    All payment processing is handled via encrypted TLS 1.3 banking gateways. We do not store your credit card or bank details on our servers at any point.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black uppercase mb-2">3. Right to Erasure</h3>
                  <p>
                    You maintain full control over your digital footprint. To request complete deletion of your account and past shipment records, contact <span className="font-bold text-black">support@anon-archive.com</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TERMS */}
          {currentTab === 'terms' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-2">
                <h2 className="font-['Clash_Display'] text-2xl font-semibold uppercase tracking-wide">Terms of Service</h2>
                <span className="text-neutral-400 text-[10px] uppercase tracking-widest">Governing Rules</span>
              </div>

              <div className="space-y-6 text-neutral-600 leading-relaxed">
                <div>
                  <h3 className="font-bold text-black uppercase mb-2">1. Anti-Bot & Resale Limitation</h3>
                  <p>
                    To ensure fair access to our limited drops, ANON reserves the right to unilaterally cancel automated bot allocations, suspicious duplicate orders, or volume stockpiling intended for unauthorized secondary resale markets.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black uppercase mb-2">2. Intellectual Property</h3>
                  <p>
                    All architectural garment patterns, imagery, logos, and digital assets on this site are the exclusive intellectual property of ANON APPAREL CO. Unauthorized reproduction is prohibited.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};