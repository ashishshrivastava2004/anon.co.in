import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CustomerDetails, OrderCheckoutPayload } from '../types';

interface CheckoutResult {
  success: boolean;
  orderId?: string;
  message?: string;
  data?: any;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCheckingOut: boolean;
  lastConfirmedOrder: {
    orderId: string;
    customer: CustomerDetails;
    items: CartItem[];
    total: number;
  } | null;
  executeCheckout: (customer: CustomerDetails) => Promise<CheckoutResult>;
  resetLastConfirmedOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('anon_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<{
    orderId: string;
    customer: CustomerDetails;
    items: CartItem[];
    total: number;
  } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('anon_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart:', e);
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity
        };
        return copy;
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  /**
   * CRITICAL BACKEND INTEGRATION:
   * Asynchronously posts order and cart data to Vercel Backend
   */
  const executeCheckout = async (customer: CustomerDetails): Promise<CheckoutResult> => {
    if (items.length === 0) {
      return { success: false, message: 'Cart is empty' };
    }

    setIsCheckingOut(true);
    const generatedOrderId = `ANON-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload: OrderCheckoutPayload = {
      cart: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        code: item.product.code,
        size: item.selectedSize,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
        image: item.product.images?.[0] || ""
      })),
      customer,
      totalAmount: subtotal,
      currency: 'INR',
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://anon-store-backend.vercel.app/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...payload,
          orderId: generatedOrderId,
          items: payload.cart,
          customerDetails: customer,
          total: subtotal,
          
          cartItems: payload.cart, 
          customerName: customer.fullName,
          customerEmail: customer.email,
          address: `${customer.streetAddress}, ${customer.city}, ${customer.postalCode}, ${customer.country}`,
          totalAmount: subtotal,
          paymentMode: "CASH ON DELIVERY"
        })
      });

      let responseData: any = null;
      try {
        responseData = await response.json();
      } catch {
        responseData = { status: response.statusText };
      }

      if (!response.ok && response.status !== 200 && response.status !== 201) {
        throw new Error(
          responseData?.message ||
          responseData?.error ||
          `Backend returned status ${response.status}`
        );
      }

      const confirmedId = responseData?.orderId || responseData?.id || generatedOrderId;

      saveLocalOrder(confirmedId, customer, items, subtotal);

      setLastConfirmedOrder({
        orderId: confirmedId,
        customer,
        items: [...items],
        total: subtotal
      });

      clearCart();
      return {
        success: true,
        orderId: confirmedId,
        message: 'Order placed successfully. Archival dispatch dispatched.',
        data: responseData
      };
    } catch (err: any) {
      console.error('CRITICAL BACKEND ERROR:', err);
      return {
        success: false,
        message: err.message || 'Network/CORS Error: Could not connect to the backend.'
      };
    } finally {
      setIsCheckingOut(false);
    }
  };

  const resetLastConfirmedOrder = () => setLastConfirmedOrder(null);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCheckingOut,
        lastConfirmedOrder,
        executeCheckout,
        resetLastConfirmedOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

function saveLocalOrder(orderId: string, customer: CustomerDetails, items: CartItem[], total: number) {
  try {
    const existing = JSON.parse(localStorage.getItem('anon_tracked_orders') || '{}');
    existing[orderId] = {
      orderId,
      email: customer.email,
      createdAt: new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
      status: 'PROCESSING',
      carrier: 'DHL Express  Indian Archival',
      trackingNumber: `DHL-EX-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      estimatedDelivery: '3-5 BUSINESS DAYS',
      shippingAddress: `${customer.streetAddress}, ${customer.city}, ${customer.postalCode}, ${customer.country}`,
      totalAmount: total,
      currency: 'INR',
      items: items.map((i) => ({
        name: i.product.name,
        code: i.product.code,
        size: i.selectedSize,
        quantity: i.quantity,
        price: i.product.price
      })),
      timeline: [
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: 'TODAY',
          location: 'ANON ATELIER - GLOBAL DISPATCH',
          status: 'ORDER ALLOCATED // CONFIRMATION SENT',
          completed: true
        },
        {
          time: 'EST',
          date: 'TOMORROW',
          location: 'SECURITY INSPECTION & PACKING',
          status: 'SEALED IN ARCHIVAL VACUUM POUCH',
          completed: false
        },
        {
          time: 'EST',
          date: 'NEXT DAY',
          location: 'DHL LOGISTICS HUB',
          status: 'SCHEDULED FREIGHT HANDOFF',
          completed: false
        }
      ]
    };
    localStorage.setItem('anon_tracked_orders', JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save order to localStorage:', e);
  }
}