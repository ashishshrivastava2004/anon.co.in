import React, { useState } from 'react';
import { Search, Package, MapPin, CheckCircle, Clock } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [orderData, setOrderData] = useState<any | null>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    try {
      const existingOrders = JSON.parse(localStorage.getItem('anon_tracked_orders') || '{}');
      if (existingOrders[trackingId]) {
        setOrderData(existingOrders[trackingId]);
        setError('');
      } else {
        setOrderData(null);
        setError('TRACKING ID NOT FOUND IN ARCHIVE.');
      }
    } catch (err) {
      setError('SYSTEM ERROR.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 font-mono select-none pt-24">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-black pb-4">
          <h1 className="text-2xl font-bold uppercase tracking-widest">GLOBAL DISPATCH TRACKING</h1>
          <p className="text-xs text-neutral-500 mt-2 uppercase">Locate your archival unit</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
            placeholder="ENTER ANON-XXXXXX"
            className="flex-1 border border-black p-3 text-sm focus:outline-none focus:bg-neutral-50 uppercase"
          />
          <button type="submit" className="bg-black text-white px-6 border border-black hover:bg-white hover:text-black transition-colors font-bold text-sm flex items-center gap-2">
            <Search size={16} /> TRACK
          </button>
        </form>

        {error && (
          <div className="bg-black text-white p-4 text-xs font-bold uppercase animate-pulse">
            ! {error}
          </div>
        )}

        {orderData && (
          <div className="border border-black bg-white">
            <div className="bg-black text-white p-4 flex justify-between items-center text-xs font-bold">
              <span>ORDER: {orderData.orderId}</span>
              <span className="bg-white text-black px-2 py-0.5">{orderData.status}</span>
            </div>

            <div className="p-4 md:p-6 space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-neutral-500 mb-1">CARRIER</div>
                  <div className="font-bold">{orderData.carrier}</div>
                </div>
                <div>
                  <div className="text-neutral-500 mb-1">TRACKING #</div>
                  <div className="font-bold">{orderData.trackingNumber}</div>
                </div>
                <div>
                  <div className="text-neutral-500 mb-1">EST. DELIVERY</div>
                  <div className="font-bold">{orderData.estimatedDelivery}</div>
                </div>
                <div>
                  <div className="text-neutral-500 mb-1">DESTINATION</div>
                  <div className="font-bold line-clamp-2">{orderData.shippingAddress}</div>
                </div>
              </div>

              <div className="border-t border-black pt-6">
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                  <Package size={16} /> DISPATCH TIMELINE
                </h3>
                <div className="space-y-4">
                  {orderData.timeline.map((step: any, idx: number) => (
                    <div key={idx} className={`p-4 border ${step.completed ? 'border-black' : 'border-neutral-200 text-neutral-500'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-xs flex items-center gap-2">
                          {step.completed ? <CheckCircle size={14} /> : <Clock size={14} />}
                          {step.status}
                        </span>
                        <span className="text-[10px]">{step.time}</span>
                      </div>
                      <div className="text-[10px] flex items-center gap-1 mt-2">
                        <MapPin size={10} /> {step.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};