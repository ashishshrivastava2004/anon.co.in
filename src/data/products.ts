import { Product, TrackedOrder } from '../types';

// 🛑 DROP 01 DATA IS NOW FETCHED DYNAMICALLY FROM SUPABASE
// Keeping this empty array so legacy imports in other components don't break.
export const PRODUCTS: Product[] = []; 

// Retaining mock orders for order tracking page UI testing
export const MOCK_ORDERS: Record<string, TrackedOrder> = {
  'ANON-990412': {
    orderId: 'ANON-990412',
    email: 'client@archival.co',
    createdAt: '2026-09-15 08:30 JST',
    status: 'IN_TRANSIT',
    carrier: 'DHL Express India / Priority Cargo',
    trackingNumber: 'DHL-EX-8829104812',
    estimatedDelivery: 'SEPTEMBER 21, 2026',
    shippingAddress: '4-28-12 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan',
    totalAmount: 560,
    currency: 'INR',
    items: [
      { name: '01 / HEAVYWEIGHT OVERSHOT HOODIE', code: 'AN-HD01-BLK', size: 'L', quantity: 1, price: 240 },
      { name: '02 / MODULAR TACTICAL CARGO PANT', code: 'AN-PT02-BLK', size: 'M', quantity: 1, price: 320 }
    ],
    timeline: [
      { time: '14:22', date: 'SEP 15', location: 'ANON ATELIER - TOKYO HUB', status: 'ORDER DISPATCHED & SEALED', completed: true },
      { time: '21:05', date: 'SEP 16', location: 'NARITA INTERNATIONAL AIRPORT', status: 'EXPORT CUSTOMS CLEARED', completed: true },
      { time: '04:18', date: 'SEP 18', location: 'LEIPZIG CENTRAL TRANSIT HUB', status: 'IN TRANSIT TO REGIONAL TERMINAL', completed: true },
      { time: 'EST', date: 'SEP 21', location: 'DESTINATION ADDRESS', status: 'OUT FOR DELIVERY', completed: false }
    ]
  },
  'ANON-771829': {
    orderId: 'ANON-771829',
    email: 'archivist@studio.org',
    createdAt: '2026-09-17 19:45 JST',
    status: 'PROCESSING',
    carrier: 'DHL Express Indian Archival',
    trackingNumber: 'DHL-EX-4491028301',
    estimatedDelivery: 'SEPTEMBER 24, 2026',
    shippingAddress: '14 Greene St, SoHo, New York, NY 10013, USA',
    totalAmount: 480,
    currency: 'INR',
    items: [
      { name: '03 / TECHNICAL BALLISTIC SHELL JACKET', code: 'AN-JK03-BLK', size: 'L', quantity: 1, price: 480 }
    ],
    timeline: [
      { time: '19:45', date: 'SEP 17', location: 'ANON ATELIER - MILAN', status: 'PAYMENT VERIFIED // ALLOCATION CONFIRMED', completed: true },
      { time: '10:00', date: 'SEP 18', location: 'ANON ATELIER - MILAN', status: 'GARMENT QUALITY CONTROL & HAND EMBOSSING', completed: true },
      { time: 'EST', date: 'SEP 19', location: 'MILANO CENTRALE FREIGHT', status: 'SCHEDULED CARRIER PICKUP', completed: false },
      { time: 'EST', date: 'SEP 24', location: 'NEW YORK TERMINAL', status: 'DELIVERY ESTIMATE', completed: false }
    ]
  }
};