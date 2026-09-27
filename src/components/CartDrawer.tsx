import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, AlertTriangle, ShoppingBag, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerDetails } from '../types';
import { supabase } from '../lib/supabase';

export const CartDrawer: React.FC = () => {
  const { 
    items, isCartOpen, closeCart, removeFromCart, updateQuantity, 
    subtotal, totalItems, isCheckingOut, lastConfirmedOrder, 
    executeCheckout, resetLastConfirmedOrder 
  } = useCart();
  
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'customer' | 'success'>('cart');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // --- FEATURE: PROMO CODES ---
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase().trim();
    if (code === 'ANON10') {
      setDiscountPercent(10);
      setPromoMessage({ text: '10% OFF APPLIED!', type: 'success' });
    } else if (code === 'HEAVY20' && subtotal > 5000) {
      setDiscountPercent(20);
      setPromoMessage({ text: '20% OFF APPLIED!', type: 'success' });
    } else {
      setDiscountPercent(0);
      setPromoMessage({ text: 'INVALID OR EXPIRED CODE', type: 'error' });
    }
  };

  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  // --- FEATURE: DYNAMIC UPSELLING ---
  const upsellItem = {
    name: "ANON SIGNATURE ESSENTIAL SOCKS",
    price: 499,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&q=80&w=200",
  };

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '', email: '', phone: '', streetAddress: '', city: '', postalCode: '', country: 'India', orderNotes: ''
  });

  if (!isCartOpen) return null;

  const handleProceedToDetails = () => {
    setCheckoutError(null);
    setStep('customer');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleFinalCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.email || !customer.streetAddress || !customer.city || !customer.postalCode) {
      setCheckoutError('Please complete all required shipping fields.');
      return;
    }
    setCheckoutError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase.from('orders').insert([{
        user_id: user ? user.id : null,
        customer_name: customer.fullName,
        email: customer.email,
        mobile_number: customer.phone,
        address: customer.streetAddress,
        pincode: customer.postalCode,
        total_amount: finalTotal, 
        product_details: JSON.stringify({
          items: items.map(item => `${item.product.name} (Size: ${item.selectedSize}, Qty: ${item.quantity})`),
          discount_applied: promoCode,
          discount_value: discountAmount
        })
      }]);

      // NAYA ERROR HANDLING: Asli database error screen par dikhayega
      if (error) { 
        setCheckoutError(`SUPABASE ERROR: ${error.message}`);
        return; 
      }

      const result = await executeCheckout(customer);
      if (result.success) {
        setStep('success');
      } else {
        setCheckoutError(result.message || 'Failed to transmit order.');
      }
    } catch (err: any) {
      setCheckoutError(`SYSTEM ERROR: ${err.message || 'Check Console'}`);
    }
  };

  // --- FEATURE: TRACK ABANDONED CART ---
  const handleClose = async () => {
    if (step === 'customer' && customer.email && items.length > 0) {
      try {
        await supabase.from('abandoned_carts').insert([{
          email: customer.email,
          cart_data: items,
          total_amount: finalTotal
        }]);
        console.log("Abandoned cart logged silently.");
      } catch (e) {
        // Silent fail 
      }
    }

    setStep('cart');
    setCheckoutError(null);
    setPromoCode('');
    setDiscountPercent(0);
    setPromoMessage(null);
    resetLastConfirmedOrder();
    closeCart();
  };

  const isFreeShipping = finalTotal >= 3000;
  const amountToFreeShipping = 3000 - finalTotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={handleClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-[420px] bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between bg-white">
            <h2 className="font-['Clash_Display'] text-2xl font-semibold tracking-tight uppercase text-black">
              {step === 'cart' && 'Your Bag'}
              {step === 'customer' && 'Dispatch Details'}
              {step === 'success' && 'Confirmed'}
            </h2>
            <button onClick={handleClose} className="p-2 -mr-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          {step === 'cart' && items.length > 0 && (
            <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50">
              <p className="font-['JetBrains_Mono'] text-[10px] font-bold tracking-widest uppercase mb-2 text-center text-black">
                {isFreeShipping ? "🎉 FREE EXPRESS SHIPPING UNLOCKED!" : `ADD ₹${amountToFreeShipping} MORE FOR FREE SHIPPING`}
              </p>
              <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-black transition-all duration-500 ease-out" style={{ width: `${Math.min((finalTotal / 3000) * 100, 100)}%` }} />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {step === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-neutral-400">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <div className="space-y-1">
                      <p className="font-['Clash_Display'] font-medium text-lg uppercase text-black">Your bag is empty</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 group">
                        <div className="w-24 aspect-[3/4] bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h3 className="font-['Clash_Display'] font-medium text-[14px] uppercase leading-tight text-black line-clamp-2">{item.product.name}</h3>
                              <p className="font-['JetBrains_Mono'] text-[11px] text-neutral-500 mt-1 uppercase tracking-wider">SIZE: <span className="text-black font-bold">{item.selectedSize}</span></p>
                            </div>
                            <button onClick={() => removeFromCart(item.product.id, item.selectedSize)} className="text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          </div>
                          <div className="flex items-end justify-between mt-4">
                            <div className="flex items-center border border-black w-24 h-8 font-['JetBrains_Mono']">
                              <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)} className="flex-1 h-full flex items-center justify-center hover:bg-neutral-100"><Minus size={12} /></button>
                              <span className="font-bold text-[12px] flex-1 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)} className="flex-1 h-full flex items-center justify-center hover:bg-neutral-100"><Plus size={12} /></button>
                            </div>
                            <p className="font-['JetBrains_Mono'] font-bold text-[13px] text-black">₹{item.product.price * item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 p-4 border border-dashed border-neutral-300 bg-neutral-50 font-['JetBrains_Mono'] flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-neutral-200 shrink-0">
                           <img src={upsellItem.image} alt="Socks" className="w-full h-full object-cover" />
                         </div>
                         <div>
                           <p className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1"><Sparkles size={10}/> Complete The Look</p>
                           <p className="text-xs font-bold text-black uppercase">{upsellItem.name}</p>
                           <p className="text-[10px] text-black">₹{upsellItem.price}</p>
                         </div>
                      </div>
                      <button className="bg-black text-white px-3 py-1.5 text-[10px] font-bold uppercase hover:bg-neutral-800">ADD</button>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 'customer' && (
              <form id="checkout-form" onSubmit={handleFinalCheckout} className="space-y-4 font-['JetBrains_Mono']">
                {checkoutError && (
                  <div className="border border-red-200 bg-red-50 text-red-600 p-3 text-xs flex items-center gap-2 font-bold uppercase tracking-wider">
                    <AlertTriangle size={15} /> <span>{checkoutError}</span>
                  </div>
                )}
                <div><label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Full Name *</label><input type="text" name="fullName" required value={customer.fullName} onChange={handleInputChange} className="w-full border border-neutral-300 p-3 text-[13px] outline-none focus:border-black" /></div>
                <div><label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Email Address *</label><input type="email" name="email" required value={customer.email} onChange={handleInputChange} className="w-full border border-neutral-300 p-3 text-[13px] outline-none focus:border-black" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Phone *</label><input type="tel" name="phone" required value={customer.phone} onChange={handleInputChange} className="w-full border border-neutral-300 p-3 text-[13px] outline-none focus:border-black" /></div>
                  <div><label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Postal Code *</label><input type="text" name="postalCode" required value={customer.postalCode} onChange={handleInputChange} className="w-full border border-neutral-300 p-3 text-[13px] outline-none focus:border-black" /></div>
                </div>
                <div><label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Street Address *</label><input type="text" name="streetAddress" required value={customer.streetAddress} onChange={handleInputChange} className="w-full border border-neutral-300 p-3 text-[13px] outline-none focus:border-black" /></div>
                <div><label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">City *</label><input type="text" name="city" required value={customer.city} onChange={handleInputChange} className="w-full border border-neutral-300 p-3 text-[13px] outline-none focus:border-black" /></div>
                
                <button type="button" onClick={() => {
                  if (customer.email && items.length > 0) supabase.from('abandoned_carts').insert([{ email: customer.email, cart_data: items, total_amount: finalTotal }]);
                  setStep('cart');
                  setCheckoutError(null);
                }} className="text-neutral-500 hover:text-black underline text-[11px] block mt-4 font-bold tracking-widest uppercase">&lt; Back to Cart</button>
              </form>
            )}

            {step === 'success' && lastConfirmedOrder && (
              <div className="space-y-6 py-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white mb-2"><CheckCircle2 size={32} /></div>
                <div>
                  <h3 className="font-['Clash_Display'] text-2xl font-bold uppercase tracking-tight mb-2">Order Confirmed</h3>
                  <p className="font-['JetBrains_Mono'] text-xs text-neutral-500 leading-relaxed">Thank you, {lastConfirmedOrder.customer.fullName}.</p>
                </div>
                <button onClick={handleClose} className="w-full py-4 bg-black text-white font-['Clash_Display'] font-medium text-[15px] uppercase hover:bg-neutral-800 flex items-center justify-center gap-2">CONTINUE SHOPPING <ArrowRight size={18} /></button>
              </div>
            )}
          </div>

          {items.length > 0 && step !== 'success' && (
            <div className="border-t border-neutral-200 px-6 py-5 bg-white">
              
              {step === 'cart' && (
                <div className="mb-4 flex flex-col gap-2 font-['JetBrains_Mono']">
                  <div className="flex border border-neutral-300 focus-within:border-black transition-colors">
                    <div className="pl-3 py-2.5 flex items-center justify-center text-neutral-400"><Tag size={16}/></div>
                    <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Enter Promo Code" className="flex-1 px-3 py-2 text-xs uppercase outline-none" />
                    <button onClick={applyPromoCode} className="px-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800">Apply</button>
                  </div>
                  {promoMessage && <p className={`text-[10px] font-bold uppercase tracking-widest ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{promoMessage.text}</p>}
                </div>
              )}

              <div className="flex justify-between items-center mb-1 font-['JetBrains_Mono']">
                <span className="text-[12px] font-bold uppercase tracking-widest text-neutral-500">Subtotal</span>
                <span className={`text-[13px] font-bold ${discountPercent > 0 ? 'line-through text-neutral-400' : 'text-black'}`}>₹{subtotal}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="flex justify-between items-center mb-1 font-['JetBrains_Mono'] text-green-600">
                  <span className="text-[12px] font-bold uppercase tracking-widest">Discount ({discountPercent}%)</span>
                  <span className="text-[13px] font-bold">-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between items-center mb-4 font-['JetBrains_Mono'] border-t border-black pt-2 mt-2">
                <span className="text-[14px] font-bold uppercase tracking-widest text-black">Total</span>
                <span className="text-[18px] font-bold text-black">₹{finalTotal}</span>
              </div>

              {step === 'cart' ? (
                <button onClick={handleProceedToDetails} className="w-full bg-black text-white py-4 font-['Clash_Display'] font-medium text-[15px] uppercase tracking-widest hover:bg-neutral-800 flex items-center justify-center gap-2">PROCEED TO CHECKOUT <ArrowRight size={18} /></button>
              ) : (
                <button type="submit" form="checkout-form" disabled={isCheckingOut} className="w-full bg-black text-white py-4 font-['Clash_Display'] font-medium text-[15px] uppercase tracking-widest hover:bg-neutral-800 disabled:bg-neutral-400 flex items-center justify-center gap-2">
                  {isCheckingOut ? <span className="animate-pulse">PROCESSING...</span> : <>CONFIRM ORDER <ArrowRight size={18} /></>}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};