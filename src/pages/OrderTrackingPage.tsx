import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, CheckCircle2, Clock, Truck, Package, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { MOCK_ORDERS } from '../data/products';
import { TrackedOrder } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialId = searchParams.get('id');

  const executeLookup = (query: string) => {
    if (!query.trim()) {
      setErrorMessage('Please provide an Order ID (e.g. ANON-990412) or Client Email.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      const clean = query.trim().toUpperCase();

      // 1. Check user orders placed during this session or persisted
      let localOrders: Record<string, TrackedOrder> = {};
      try {
        localOrders = JSON.parse(localStorage.getItem('anon_tracked_orders') || '{}');
      } catch {
        localOrders = {};
      }

      // Check by ID or Email
      let found: TrackedOrder | undefined =
        localOrders[clean] ||
        Object.values(localOrders).find(
          (o) => o.orderId.toUpperCase() === clean || o.email.toUpperCase() === clean
        );

      // 2. Check static/mock archival records
      if (!found) {
        found =
          MOCK_ORDERS[clean] ||
          Object.values(MOCK_ORDERS).find(
            (o) => o.orderId.toUpperCase() === clean || o.email.toUpperCase() === clean
          );
      }

      if (found) {
        setOrder(found);
      } else {
        setOrder(null);
        setErrorMessage(
          `No active dispatch manifest found for "${query}". Try sample ID "ANON-990412" or "ANON-771829", or check your confirmation email.`
        );
      }
      setLoading(false);
    }, 450);
  };

  useEffect(() => {
    if (initialId) {
      setSearchQuery(initialId);
      executeLookup(initialId);
    }
  }, [initialId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeLookup(searchQuery);
  };

  return (
    <div className="w-full bg-white text-black min-h-[80vh] select-none py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="border-b border-black pb-6 space-y-2">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            LOGISTICS PROTOCOL // WORLDWIDE FREIGHT
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight">
            ORDER DISPATCH TRACKING
          </h1>
          <p className="font-mono text-xs text-neutral-600 max-w-xl">
            Query real-time customs clearance, flight coordinates, and atelier packaging telemetry
            for all authorized ANON shipments.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="border border-black p-6 bg-white font-mono text-xs shadow-none space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2">
                ENTER ORDER IDENTIFIER OR CLIENT EMAIL:
              </label>
              <div className="flex flex-col sm:flex-row border border-black">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. ANON-990412 or client@archival.co"
                  className="flex-1 px-4 py-3.5 text-xs bg-white text-black outline-none font-mono uppercase"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-black text-white hover:bg-neutral-800 transition-colors font-bold uppercase tracking-widest flex items-center justify-center gap-2 border-t sm:border-t-0 sm:border-l border-black"
                >
                  <Search size={15} />
                  <span>{loading ? 'LOCATING...' : 'VERIFY SHIPMENT'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Demo Test Buttons */}
          <div className="pt-2 border-t border-neutral-200 flex flex-wrap items-center gap-2 text-[11px] text-neutral-600">
            <span className="font-bold text-black">TEST DEMO IDENTIFIERS:</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('ANON-990412');
                executeLookup('ANON-990412');
              }}
              className="px-2.5 py-1 border border-black bg-neutral-100 hover:bg-black hover:text-white transition-colors"
            >
              [ ANON-990412 : IN TRANSIT ]
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('ANON-771829');
                executeLookup('ANON-771829');
              }}
              className="px-2.5 py-1 border border-black bg-neutral-100 hover:bg-black hover:text-white transition-colors"
            >
              [ ANON-771829 : ATELIER ]
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="border border-black bg-black text-white p-4 font-mono text-xs flex items-start gap-3">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold mb-1">MANIFEST QUERY FAILURE</div>
              <p className="text-neutral-300">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Live Order Display Terminal */}
        {order && (
          <div className="border border-black bg-white font-mono text-xs space-y-8 p-6 sm:p-8">
            {/* Manifest Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black pb-6">
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">
                  OFFICIAL WAYBILL MANIFEST
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-bold">
                  {order.orderId}
                </div>
                <div className="text-neutral-500 text-[11px] mt-1">
                  ISSUED: {order.createdAt} // DESTINATION: {order.shippingAddress}
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-1">
                <span className="text-[10px] text-neutral-500 uppercase">STATUS CODE:</span>
                <span className="px-3 py-1 bg-black text-white font-bold text-xs border border-black tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white inline-block animate-ping"></span>
                  {order.status}
                </span>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-black divide-y sm:divide-y-0 sm:divide-x divide-black p-0 bg-neutral-50">
              <div className="p-4 space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase">FREIGHT CARRIER</div>
                <div className="font-bold text-black">{order.carrier}</div>
                <div className="text-[11px] text-neutral-600">WAYBILL: {order.trackingNumber}</div>
              </div>

              <div className="p-4 space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase">ESTIMATED ARRIVAL</div>
                <div className="font-bold text-black text-sm">{order.estimatedDelivery}</div>
                <div className="text-[11px] text-neutral-600">AIR PRIORITY COURIER</div>
              </div>

              <div className="p-4 space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase">TOTAL SETTLEMENT</div>
                <div className="font-bold text-black text-sm">${order.totalAmount} {order.currency}</div>
                <div className="text-[11px] text-neutral-600">DUTIES PRE-PAID</div>
              </div>
            </div>

            {/* Visual Logistics Checkpoints Timeline */}
            <div className="space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-2 flex items-center gap-2">
                <Truck size={15} />
                <span>REAL-TIME DISPATCH CHECKPOINTS</span>
              </div>

              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:top-2 before:bottom-2 before:left-2.5 before:w-px before:bg-black">
                {order.timeline.map((cp, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 border border-black flex items-center justify-center ${
                        cp.completed ? 'bg-black text-white' : 'bg-white text-neutral-400'
                      }`}
                    >
                      {cp.completed ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    </div>

                    <div className="flex-1 border border-black p-3 bg-white">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-xs text-black">{cp.status}</span>
                        <span className="text-[10px] text-neutral-500">
                          {cp.date} • {cp.time}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-600">
                        LOCATION: {cp.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Manifest Items List */}
            <div className="space-y-3 pt-4 border-t border-black">
              <div className="text-[11px] font-bold uppercase tracking-wider text-black flex items-center gap-2">
                <Package size={15} />
                <span>ALLOCATED GARMENTS IN PARCEL</span>
              </div>

              <div className="border border-black divide-y divide-black">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex justify-between items-center bg-white">
                    <div>
                      <div className="font-heading font-bold text-sm text-black">{item.name}</div>
                      <div className="text-[10px] text-neutral-500">
                        SKU: {item.code} // SIZE: [{item.size}] // QTY: {item.quantity}
                      </div>
                    </div>
                    <div className="font-bold text-xs">
                      ${item.price * item.quantity} USD
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier Security Note */}
            <div className="p-3 border border-neutral-300 bg-neutral-50 text-[11px] text-neutral-600 flex items-center gap-2">
              <ShieldCheck size={16} className="text-black flex-shrink-0" />
              <span>
                All ANON shipments require adult signature upon handover. In the event of transit delay, our Tokyo logistics desk will contact the destination consignee directly.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
