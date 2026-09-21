import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, MapPin, CheckCircle, Clock, Truck, ChevronRight } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState('');
  const [orderData, setOrderData] = useState<any | null>(null);
  const [error, setError] = useState('');

  // Auto-track if URL has ?id=... (from CartDrawer success screen)
  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setTrackingId(idFromUrl);
      executeTracking(idFromUrl);
    }
  }, [searchParams]);

  const executeTracking = (idToTrack: string) => {
    if (!idToTrack.trim()) return;

    try {
      const existingOrders = JSON.parse(localStorage.getItem('anon_tracked_orders') || '{}');
      const formattedId = idToTrack.toUpperCase().trim();
      
      if (existingOrders[formattedId]) {
        setOrderData(existingOrders[formattedId]);
        setError('');
      } else {
        setOrderData(null);
        setError(`We couldn't find an order matching "${formattedId}".`);
      }
    } catch (err) {
      setError('System error while fetching tracking details.');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeTracking(trackingId);
  };

  return (
    <div className="min-h-[80vh] bg-[#FFFFFF] text-[#000000] p-4 md:p-8 pt-12 md:pt-20 select-none">
      <div className="max-w-[800px] mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="font-['Clash_Display'] text-4xl sm:text-5xl font-semibold uppercase tracking-tight">
            Track Your Order
          </h1>
          <p className="font-['JetBrains_Mono'] text-xs text-neutral-500 uppercase tracking-widest">
            Real-time logistics and dispatch updates
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              placeholder="ENTER ORDER ID (e.g. ANON-123456)"
              className="w-full border border-neutral-300 pl-12 pr-4 py-4 font-['JetBrains_Mono'] text-sm focus:border-black outline-none transition-colors uppercase bg-neutral-50 focus:bg-white"
            />
          </div>
          <button 
            type="submit" 
            className="bg-black text-white px-8 py-4 font-['Clash_Display'] uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors whitespace-nowrap"
          >
            Track
          </button>
        </form>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 p-4 text-center font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-widest animate-in fade-in">
            ! {error}
          </div>
        )}

        {/* Order Details State */}
        {orderData && (
          <div className="border border-neutral-200 bg-white animate-in slide-in-from-bottom-4 duration-500">
            
            {/* Status Header */}
            <div className="border-b border-neutral-200 p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-50">
              <div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Order Reference</div>
                <div className="font-['Clash_Display'] text-2xl font-semibold uppercase">{orderData.orderId}</div>
              </div>
              <div className="bg-black text-white font-['JetBrains_Mono'] text-[11px] font-bold px-4 py-2 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {orderData.status}
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-5 sm:p-6 font-['JetBrains_Mono'] text-xs border-b border-neutral-200">
              <div>
                <div className="text-neutral-400 uppercase tracking-widest mb-1.5 text-[10px]">Carrier</div>
                <div className="font-bold flex items-center gap-1.5 uppercase"><Truck size={14} /> {orderData.carrier}</div>
              </div>
              <div>
                <div className="text-neutral-400 uppercase tracking-widest mb-1.5 text-[10px]">Tracking #</div>
                <div className="font-bold uppercase">{orderData.trackingNumber}</div>
              </div>
              <div>
                <div className="text-neutral-400 uppercase tracking-widest mb-1.5 text-[10px]">Est. Delivery</div>
                <div className="font-bold uppercase text-green-600">{orderData.estimatedDelivery}</div>
              </div>
              <div>
                <div className="text-neutral-400 uppercase tracking-widest mb-1.5 text-[10px]">Destination</div>
                <div className="font-bold uppercase line-clamp-2" title={orderData.shippingAddress}>{orderData.shippingAddress}</div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="p-5 sm:p-6">
              <h3 className="font-['Clash_Display'] font-semibold text-lg uppercase tracking-wide mb-6">
                Transit Timeline
              </h3>
              
              <div className="space-y-6 font-['JetBrains_Mono'] ml-2">
                {orderData.timeline.map((step: any, idx: number) => (
                  <div key={idx} className="relative pl-6">
                    {/* Vertical Line for timeline */}
                    {idx !== orderData.timeline.length - 1 && (
                      <div className="absolute left-[7px] top-6 bottom-[-24px] w-[2px] bg-neutral-100"></div>
                    )}
                    
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 bg-white ${
                      step.completed ? 'border-black' : 'border-neutral-200'
                    }`}>
                      {step.completed && <div className="w-1.5 h-1.5 bg-black rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>}
                    </div>

                    <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 ${
                      step.completed ? 'opacity-100' : 'opacity-40'
                    }`}>
                      <div>
                        <div className="font-bold text-[13px] text-black uppercase tracking-wide">
                          {step.status}
                        </div>
                        <div className="text-[11px] text-neutral-500 uppercase flex items-center gap-1.5 mt-1">
                          <MapPin size={12} /> {step.location}
                        </div>
                      </div>
                      <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest sm:text-right mt-1 sm:mt-0">
                        {step.date} <span className="mx-1">•</span> {step.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchased Items Preview */}
            <div className="p-5 sm:p-6 bg-neutral-50 border-t border-neutral-200">
               <h4 className="font-['JetBrains_Mono'] text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Items in this shipment</h4>
               <div className="flex flex-col gap-3 font-['JetBrains_Mono'] text-xs">
                 {orderData.items.map((item: any, i: number) => (
                   <div key={i} className="flex justify-between items-center bg-white p-3 border border-neutral-200">
                     <div className="flex items-center gap-3">
                       <span className="font-bold text-black uppercase">{item.name}</span>
                       <span className="text-neutral-400 text-[10px] bg-neutral-100 px-2 py-0.5">SIZE {item.size}</span>
                     </div>
                     <div className="text-neutral-500">
                       QTY: {item.quantity}
                     </div>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};