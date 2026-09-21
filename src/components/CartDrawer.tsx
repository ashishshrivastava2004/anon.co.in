import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerDetails } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
    isCheckingOut,
    lastConfirmedOrder,
    executeCheckout,
    resetLastConfirmedOrder
  } = useCart();

  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'customer' | 'success'>('cart');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: 'India',
    orderNotes: ''
  });

  if (!isCartOpen) return null;

  const handleProceedToDetails = () => {
    setCheckoutError(null);
    setStep('customer');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleFinalCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.email || !customer.streetAddress || !customer.city || !customer.postalCode) {
      setCheckoutError('Please complete all required shipping fields.');
      return;
    }

    setCheckoutError(null);
    const result = await executeCheckout(customer);

    if (result.success) {
      setStep('success');
    } else {
      setCheckoutError(result.message || 'Failed to transmit order. Please retry.');
    }
  };

  const handleClose = () => {
    setStep('cart');
    setCheckoutError(null);
    resetLastConfirmedOrder();
    closeCart();
  };

  const handleTrackCreatedOrder = (orderId: string) => {
    handleClose();
    navigate(`/track?id=${encodeURIComponent(orderId)}`);
  };

  const isFreeShipping = subtotal >= 3000;
  const amountToFreeShipping = 3000 - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Slide-out Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-[420px] bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h2 className="font-['Clash_Display'] text-2xl font-semibold tracking-tight uppercase text-black">
                {step === 'cart' && 'Your Bag'}
                {step === 'customer' && 'Dispatch Details'}
                {step === 'success' && 'Confirmed'}
              </h2>
              {step === 'cart' && (
                <span className="font-['JetBrains_Mono'] bg-black text-white px-2 py-0.5 text-[10px] font-bold">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-2 -mr-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Close Cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress (Only on Cart step) */}
          {step === 'cart' && items.length > 0 && (
            <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50">
              <p className="font-['JetBrains_Mono'] text-[10px] font-bold tracking-widest uppercase mb-2 text-center text-black">
                {isFreeShipping 
                  ? "🎉 YOU'VE UNLOCKED FREE EXPRESS SHIPPING!" 
                  : `ADD ₹${amountToFreeShipping} MORE FOR FREE SHIPPING`}
              </p>
              <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-black transition-all duration-500 ease-out"
                  style={{ width: `${Math.min((subtotal / 3000) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            
            {/* STEP 1: CART ITEMS */}
            {step === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-neutral-400">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <div className="space-y-1">
                      <p className="font-['Clash_Display'] font-medium text-lg uppercase text-black">Your bag is empty</p>
                      <p className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-neutral-500">Time to add some heat.</p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-4 px-8 py-3.5 bg-black text-white font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                    >
                      RETURN TO SHOP
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 group">
                        <div className="w-24 aspect-[3/4] bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h3 className="font-['Clash_Display'] font-medium text-[14px] uppercase leading-tight text-black line-clamp-2">
                                {item.product.name}
                              </h3>
                              <p className="font-['JetBrains_Mono'] text-[11px] text-neutral-500 mt-1 uppercase tracking-wider">
                                SIZE: <span className="text-black font-bold">{item.selectedSize}</span>
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                              className="text-neutral-400 hover:text-red-500 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex items-end justify-between mt-4">
                            <div className="flex items-center border border-black w-24 h-8 font-['JetBrains_Mono']">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                                className="flex-1 h-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-bold text-[12px] flex-1 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                                className="flex-1 h-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            
                            <p className="font-['JetBrains_Mono'] font-bold text-[13px] text-black">
                              ₹{item.product.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CUSTOMER DETAILS */}
            {step === 'customer' && (
              <form id="checkout-form" onSubmit={handleFinalCheckout} className="space-y-4 font-['JetBrains_Mono']">
                {checkoutError && (
                  <div className="border border-red-200 bg-red-50 text-red-600 p-3 text-xs flex items-center gap-2 font-bold uppercase tracking-wider">
                    <AlertTriangle size={15} className="flex-shrink-0" />
                    <span>{checkoutError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={customer.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Kenzo Takahashi"
                    className="w-full border border-neutral-300 p-3 text-[13px] bg-white text-black outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={customer.email}
                    onChange={handleInputChange}
                    placeholder="client@archival.org"
                    className="w-full border border-neutral-300 p-3 text-[13px] bg-white text-black outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={customer.phone}
                      onChange={handleInputChange}
                      placeholder="+91 0000000000"
                      className="w-full border border-neutral-300 p-3 text-[13px] bg-white text-black outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={customer.country}
                      onChange={handleInputChange}
                      className="w-full border border-neutral-300 p-3 text-[13px] bg-white text-black outline-none focus:border-black transition-colors"
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    required
                    value={customer.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Street Address, Apt / Suite"
                    className="w-full border border-neutral-300 p-3 text-[13px] bg-white text-black outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={customer.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full border border-neutral-300 p-3 text-[13px] bg-white text-black outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={customer.postalCode}
                      onChange={handleInputChange}
                      placeholder="Pincode"
                      className="w-full border border-neutral-300 p-3 text-[13px] bg-white text-black outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-neutral-500 hover:text-black underline text-[11px] block mt-4 font-bold tracking-widest uppercase"
                >
                  &lt; Back to Cart
                </button>
              </form>
            )}

            {/* STEP 3: ORDER SUCCESS */}
            {step === 'success' && lastConfirmedOrder && (
              <div className="space-y-6 py-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white mb-2">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="font-['Clash_Display'] text-2xl font-bold uppercase tracking-tight mb-2">Order Confirmed</h3>
                  <p className="font-['JetBrains_Mono'] text-xs text-neutral-500 leading-relaxed">
                    Thank you, {lastConfirmedOrder.customer.fullName}.<br/>
                    Your tracking details will be sent to:<br/>
                    <span className="text-black font-bold">{lastConfirmedOrder.customer.email}</span>
                  </p>
                </div>

                <div className="w-full border border-neutral-200 p-4 space-y-3 bg-neutral-50 text-left font-['JetBrains_Mono']">
                  <div className="flex justify-between items-center text-xs border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500 font-bold tracking-widest uppercase">Order ID:</span>
                    <span className="font-bold text-black">{lastConfirmedOrder.orderId}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500 font-bold tracking-widest uppercase">Total Paid:</span>
                    <span className="font-bold text-black">₹{lastConfirmedOrder.total}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500 font-bold tracking-widest uppercase">Items:</span>
                    <span className="font-bold text-black">{lastConfirmedOrder.items.reduce((s, i) => s + i.quantity, 0)} Units</span>
                  </div>
                </div>

                <div className="w-full space-y-3 mt-4">
                  <button
                    onClick={() => handleTrackCreatedOrder(lastConfirmedOrder.orderId)}
                    className="w-full py-4 bg-black text-white font-['Clash_Display'] font-medium text-[15px] uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    TRACK ORDER <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-full py-3 text-neutral-500 hover:text-black font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-widest underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer / Checkout Action */}
          {items.length > 0 && step !== 'success' && (
            <div className="border-t border-neutral-200 px-6 py-5 bg-white">
              <div className="flex justify-between items-center mb-4 font-['JetBrains_Mono']">
                <span className="text-[12px] font-bold uppercase tracking-widest text-neutral-500">Subtotal</span>
                <span className="text-[16px] font-bold text-black">₹{subtotal}</span>
              </div>
              <p className="font-['JetBrains_Mono'] text-[10px] text-neutral-500 text-center uppercase tracking-widest mb-4">
                {isFreeShipping ? 'Shipping is free.' : 'Shipping calculated at checkout.'} Taxes included.
              </p>

              {step === 'cart' ? (
                <button
                  onClick={handleProceedToDetails}
                  className="w-full bg-black text-white py-4 font-['Clash_Display'] font-medium text-[15px] uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  PROCEED TO CHECKOUT <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isCheckingOut}
                  className="w-full bg-black text-white py-4 font-['Clash_Display'] font-medium text-[15px] uppercase tracking-widest hover:bg-neutral-800 disabled:bg-neutral-400 transition-colors flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <span className="animate-pulse">PROCESSING...</span>
                  ) : (
                    <>CONFIRM ORDER <ArrowRight size={18} /></>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};