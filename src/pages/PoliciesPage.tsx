import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shield, Truck, RefreshCw, FileText } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'privacy';

  const tabs = [
    { id: 'privacy', label: '01 // PRIVACY PROTOCOL', icon: Shield },
    { id: 'shipping', label: '02 // SHIPPING & DUTIES', icon: Truck },
    { id: 'returns', label: '03 // RETURNS & EXCHANGES', icon: RefreshCw },
    { id: 'terms', label: '04 // TERMS OF ARCHIVE', icon: FileText }
  ];

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  return (
    <div className="w-full bg-white text-black min-h-[80vh] select-none py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="border-b border-black pb-6 space-y-2">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            REGULATORY FRAMEWORK // ATELIER COMPLIANCE
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight">
            LEGAL PROTOCOLS &amp; POLICIES
          </h1>
          <p className="font-mono text-xs text-neutral-600 max-w-xl">
            Uncompromising terms governing client privacy, cryptographic anonymity, global express
            freight, and archival returns.
          </p>
        </div>

        {/* Tab Switcher Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-black divide-x divide-y sm:divide-y-0 divide-black font-mono text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`p-3.5 flex flex-col items-center justify-center gap-1.5 transition-colors uppercase font-bold text-center ${
                  isActive
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                <Icon size={16} />
                <span className="text-[11px]">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="border border-black p-6 sm:p-10 font-mono text-xs space-y-8 bg-white">
          {/* TAB 1: PRIVACY */}
          {currentTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b border-black pb-4">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">
                  POLICY SECTION 01
                </span>
                <h2 className="font-heading text-2xl font-bold">CLIENT PRIVACY &amp; ANONYMITY</h2>
                <span className="text-neutral-500 text-[11px]">REVISION: 2026.09.1</span>
              </div>

              <div className="space-y-4 text-neutral-800 leading-relaxed">
                <h3 className="font-bold text-black uppercase">1. PRINCIPLE OF RADICAL DATA MINIMALISM</h3>
                <p>
                  ANON collects only the essential telemetry required to dispatch physical garments to
                  your designated geographic address and securely process bank card settlements. We reject
                  third-party ad retargeting pixels, behavioral tracking scripts, and cross-site profiling cookies.
                </p>

                <h3 className="font-bold text-black uppercase pt-2">2. ORDER TRANSMISSION &amp; BACKEND DISPATCH</h3>
                <p>
                  When you initiate checkout, your garment selections, delivery coordinates, and email
                  address are encrypted via TLS 1.3 and transmitted to our dedicated order processing engine
                  at <code className="bg-neutral-100 px-1 border border-neutral-300">https://anon-backend-chi.vercel.app/api/order</code>.
                  This server initiates automated logistics fulfillment and sends a direct digital waybill
                  to your specified inbox.
                </p>

                <h3 className="font-bold text-black uppercase pt-2">3. ZERO-LEASE COMMITMENT</h3>
                <p>
                  Under no circumstance will customer identifiers, order histories, or physical street
                  addresses be leased, traded, or transferred to marketing consortiums. Your identity remains
                  anonymous within our archival records.
                </p>

                <h3 className="font-bold text-black uppercase pt-2">4. RIGHT TO IRREVOCABLE ERASURE</h3>
                <p>
                  Clients may request complete eradication of past shipment records upon confirmed delivery
                  of merchandise by contacting <span className="font-bold text-black">dispatch@anon-archive.com</span> with
                  their Order Waybill ID.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SHIPPING */}
          {currentTab === 'shipping' && (
            <div className="space-y-6">
              <div className="border-b border-black pb-4">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">
                  POLICY SECTION 02
                </span>
                <h2 className="font-heading text-2xl font-bold">SHIPPING &amp; CUSTOMS PROTOCOLS</h2>
                <span className="text-neutral-500 text-[11px]">WORLDWIDE CARRIER COURIER SERVICES</span>
              </div>

              <div className="space-y-4 text-neutral-800 leading-relaxed">
                <h3 className="font-bold text-black uppercase">1. DISPATCH ORIGIN &amp; SCHEDULE</h3>
                <p>
                  All garments are hand-checked, vacuum-sealed in nitrogen foil pouches, and dispatched from
                  either our Tokyo or Milan ateliers within 24 to 48 hours following allocation verification.
                </p>

                <h3 className="font-bold text-black uppercase pt-2">2. CARRIER TIERS &amp; TRANSIT ESTIMATES</h3>
                <div className="border border-black divide-y divide-black my-3">
                  <div className="p-3 bg-neutral-50 flex justify-between font-bold text-black">
                    <span>DESTINATION REGION</span>
                    <span>CARRIER &amp; ESTIMATED WINDOW</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span>JAPAN &amp; ASIA PACIFIC</span>
                    <span>DHL EXPRESS PRIORITY (1-2 BUSINESS DAYS)</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span>NORTH AMERICA</span>
                    <span>DHL EXPRESS AIR FREIGHT (2-4 BUSINESS DAYS)</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span>EUROPEAN UNION &amp; UK</span>
                    <span>DHL / FEDEX PRIORITY AIR (2-4 BUSINESS DAYS)</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span>REST OF WORLD</span>
                    <span>INTERNATIONAL EXPRESS (3-6 BUSINESS DAYS)</span>
                  </div>
                </div>

                <h3 className="font-bold text-black uppercase pt-2">3. DUTIES &amp; ATELIER TAXES</h3>
                <p>
                  All shipments are dispatched on a DDP (Delivered Duty Paid) basis whenever possible. Import
                  duties and local value-added taxes are calculated at checkout, eliminating unexpected custom
                  brokerage fees at the door.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: RETURNS */}
          {currentTab === 'returns' && (
            <div className="space-y-6">
              <div className="border-b border-black pb-4">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">
                  POLICY SECTION 03
                </span>
                <h2 className="font-heading text-2xl font-bold">RETURNS &amp; EXCHANGES PROTOCOL</h2>
                <span className="text-neutral-500 text-[11px]">14-DAY ARCHIVAL EVALUATION WINDOW</span>
              </div>

              <div className="space-y-4 text-neutral-800 leading-relaxed">
                <h3 className="font-bold text-black uppercase">1. ELIGIBILITY CONDITIONS</h3>
                <p>
                  We accept returns for store allocation or size exchange within 14 calendar days from the
                  confirmed carrier delivery timestamp. Garments must remain unwashed, unworn, and encased
                  in their original numbered vacuum seal sleeve with all archival identification tags intact.
                </p>

                <h3 className="font-bold text-black uppercase pt-2">2. NON-RETURNABLE SPECIAL EDITIONS</h3>
                <p>
                  Limited small-batch prototypes marked as &quot;FINAL ARCHIVE RUN&quot; are non-returnable unless
                  arriving with verified structural manufacturing flaws.
                </p>

                <h3 className="font-bold text-black uppercase pt-2">3. RETURN PROCESS INITIATION</h3>
                <p>
                  To request a return authorization waybill:
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-neutral-700">
                  <li>Navigate to the <span className="font-bold text-black">/track</span> portal and enter your Order ID.</li>
                  <li>Click &quot;INITIATE RETURN WAYBILL&quot; or email returns@anon-archive.com.</li>
                  <li>Securely re-seal the garment in its original protective packaging.</li>
                  <li>Affix the generated prepaid return air waybill and schedule courier pickup.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 4: TERMS */}
          {currentTab === 'terms' && (
            <div className="space-y-6">
              <div className="border-b border-black pb-4">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">
                  POLICY SECTION 04
                </span>
                <h2 className="font-heading text-2xl font-bold">TERMS OF ARCHIVE MEMBERSHIP</h2>
                <span className="text-neutral-500 text-[11px]">GOVERNING JURISDICTION &amp; RULES</span>
              </div>

              <div className="space-y-4 text-neutral-800 leading-relaxed">
                <h3 className="font-bold text-black uppercase">1. LIMITATION ON RESALE BOTS</h3>
                <p>
                  ANON reserves the unilateral right to cancel automated bot allocations, suspicious duplicate
                  card orders, or volume stockpiling intended for unauthorized secondary speculative markets.
                </p>

                <h3 className="font-bold text-black uppercase pt-2">2. INTELLECTUAL PROPERTY</h3>
                <p>
                  All architectural garment patterns, laser tag inscriptions, and brutalist digital assets
                  are the exclusive intellectual property of ANON STUDIO LTD.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
