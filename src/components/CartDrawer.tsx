import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-black flex flex-col shadow-none">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-black flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-black inline-block"></span>
              <h2 className="font-heading text-xl font-bold tracking-tight text-black">
                {step === 'cart' && `CART [${String(totalItems).padStart(2, '0')}]`}
                {step === 'customer' && 'DISPATCH DETAILS'}
                {step === 'success' && 'ORDER CONFIRMED'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1 border border-black hover:bg-black hover:text-white transition-colors"
              aria-label="Close Cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 font-mono text-xs">
            {/* STEP 1: CART ITEMS */}
            {step === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 border border-black flex items-center justify-center mb-4 text-neutral-400 font-mono">
                      [ 00 ]
                    </div>
                    <p className="font-heading text-lg font-bold uppercase mb-2">Cart is Empty</p>
                    <p className="text-neutral-500 mb-6 text-xs max-w-xs">
                      No garments allocated to your session. Browse the archive to select garments.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors font-mono uppercase tracking-wider"
                    >
                      BROWSE ARCHIVE
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border-b border-neutral-300 pb-2 text-[10px] text-neutral-500 tracking-wider flex justify-between">
                      <span>PRODUCT // SPECIFICATION</span>
                      <span>SUBTOTAL</span>
                    </div>

                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}`}
                        className="border border-black p-3 flex gap-4 bg-white"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover border border-black flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <span className="font-heading font-bold text-sm text-black leading-tight">
                                {item.product.name}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                                className="text-neutral-400 hover:text-black p-1"
                                title="Remove item"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            <div className="text-[11px] text-neutral-600 mt-1">
                              CODE: {item.product.code}
                            </div>
                            <div className="text-[11px] text-black font-semibold mt-0.5">
                              SIZE: [{item.selectedSize}] // ₹{item.product.price} INR
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-200">
                            <div className="flex items-center border border-black">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                                className="px-2 py-0.5 hover:bg-black hover:text-white transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="px-3 py-0.5 text-center font-bold text-xs border-x border-black">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                                className="px-2 py-0.5 hover:bg-black hover:text-white transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <div className="font-bold text-sm">
                              ₹{item.product.price * item.quantity} INR
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="p-3 border border-neutral-200 bg-neutral-50 text-[11px] space-y-1">
                      <div className="flex items-center gap-1 font-bold text-black">
                        <ShieldCheck size={14} /> ARCHIVAL DISPATCH GUARANTEE
                      </div>
                      <p className="text-neutral-600">
                        All garments vacuum-sealed and inspected at Tokyo atelier prior to courier handoff.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CUSTOMER SHIPPING DETAILS FOR LIVE CHECKOUT */}
            {step === 'customer' && (
              <form id="checkout-form" onSubmit={handleFinalCheckout} className="space-y-4">
                

                {checkoutError && (
                  <div className="border border-black bg-black text-white p-3 text-xs flex items-center gap-2">
                    <AlertTriangle size={15} className="flex-shrink-0" />
                    <span>{checkoutError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase mb-1">
                    FULL CLIENT NAME *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={customer.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Kenzo Takahashi"
                    className="w-full border border-black p-2.5 text-xs bg-white text-black outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase mb-1">
                    EMAIL ADDRESS (FOR DISPATCH CONFIRMATION) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={customer.email}
                    onChange={handleInputChange}
                    placeholder="client@archival.org"
                    className="w-full border border-black p-2.5 text-xs bg-white text-black outline-none focus:ring-1 focus:ring-black"
                  />
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">
                    Our backend transmits automated tracking manifests to this address.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={customer.phone}
                      onChange={handleInputChange}
                      placeholder="+91 3438746343"
                      className="w-full border border-black p-2.5 text-xs bg-white text-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">
                      COUNTRY *
                    </label>
                    <select
                      name="country"
                      value={customer.country}
                      onChange={handleInputChange}
                      className="w-full border border-black p-2.5 text-xs bg-white text-black outline-none"
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase mb-1">
                    DELIVERY STREET ADDRESS *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    required
                    value={customer.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Street Address, Apt / Suite"
                    className="w-full border border-black p-2.5 text-xs bg-white text-black outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">
                      CITY *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={customer.city}
                      onChange={handleInputChange}
                      placeholder="City / Metropolitan"
                      className="w-full border border-black p-2.5 text-xs bg-white text-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">
                      POSTAL CODE *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={customer.postalCode}
                      onChange={handleInputChange}
                      placeholder="Zip / Postal"
                      className="w-full border border-black p-2.5 text-xs bg-white text-black outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase mb-1">
                    SPECIAL DISPATCH INSTRUCTIONS (OPTIONAL)
                  </label>
                  <textarea
                    name="orderNotes"
                    value={customer.orderNotes}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Gate codes, delivery notes, archival packaging preferences..."
                    className="w-full border border-black p-2 text-xs bg-white text-black outline-none resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-neutral-500 hover:text-black underline text-[11px] block mt-2"
                >
                  &lt; Back to Cart Review
                </button>
              </form>
            )}

            {/* STEP 3: ORDER SUCCESS / CONFIRMATION */}
            {step === 'success' && lastConfirmedOrder && (
              <div className="space-y-6 py-4">
                <div className="border border-black p-4 bg-black text-white space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-white" />
                    <span className="font-heading font-bold text-base">ORDER CONFIRMED</span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Your order payload was successfully confirmed. An automated confirmation email has been dispatched to:
                  </p>
                  <div className="font-mono text-xs font-bold text-white bg-neutral-900 border border-neutral-700 p-2 break-all">
                    {lastConfirmedOrder.customer.email}
                  </div>
                </div>

                <div className="border border-black p-4 space-y-3 bg-white">
                  <div className="text-[11px] text-neutral-500 uppercase tracking-widest border-b border-black pb-1">
                    MANIFEST REFERENCE
                  </div>
                  <div className="flex justify-between items-center font-bold text-sm">
                    <span>ORDER ID:</span>
                    <span className="font-mono bg-black text-white px-2 py-0.5">
                      {lastConfirmedOrder.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>RECIPIENT:</span>
                    <span className="font-semibold">{lastConfirmedOrder.customer.fullName}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>TOTAL CHARGED:</span>
                    <span className="font-bold text-black">₹{lastConfirmedOrder.total} INR</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>ITEMS ALLOCATED:</span>
                    <span>{lastConfirmedOrder.items.reduce((s, i) => s + i.quantity, 0)} UNITS</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleTrackCreatedOrder(lastConfirmedOrder.orderId)}
                    className="w-full py-3.5 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>TRACK SHIPMENT IN REAL-TIME</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 border border-black text-black hover:bg-neutral-100 transition-colors font-mono text-xs uppercase tracking-wider"
                  >
                    CLOSE &amp; BACK
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer / Totals & Action */}
          {items.length > 0 && step !== 'success' && (
            <div className="p-6 border-t border-black bg-white space-y-4">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>ITEMS SUB-TOTAL:</span>
                  <span className="text-black font-semibold">₹{subtotal} INR</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>INDIAN EXPRESS CARGO:</span>
                  <span className="text-black font-semibold">
                    {subtotal >= 300 ? 'FREE (PROMO)' : '₹25 INR'}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>DUTIES &amp; ATELIER TAX:</span>
                  <span className="text-black font-semibold">INCLUDED</span>
                </div>
                <div className="border-t border-black pt-2 flex justify-between font-bold text-sm text-black">
                  <span>TOTAL DISPATCH AMOUNT:</span>
                  <span>₹{subtotal >= 300 ? subtotal : subtotal + 25} INR</span>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={handleProceedToDetails}
                  className="w-full py-3.5 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 text-xs"
                >
                  <span>CHECKOUT</span>
                  <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isCheckingOut}
                  className="w-full py-3.5 bg-black text-white border border-black hover:bg-white hover:text-black disabled:bg-neutral-800 transition-colors font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 text-xs"
                >
                  {isCheckingOut ? (
                    <span className="animate-pulse">TRANSMITTING ORDER TO BACKEND...</span>
                  ) : (
                    <>
                      <span>CONFIRM &amp; EXECUTE ORDER</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              )}

              <div className="text-center text-[10px] text-neutral-500 font-mono">
                SECURE TRANSACTION VIA SECURED PAYMENT GATEWAY. ALL DATA IS ENCRYPTED
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
