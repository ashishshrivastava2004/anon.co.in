import { Product, TrackedOrder } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'anon-hoodie-01',
    code: 'AN-HD01-BLK',
    name: '01 / HEAVYWEIGHT OVERSHOT HOODIE',
    tagline: '580 GSM Custom Loopback Terry / Raw Edge Trim',
    price: 240,
    currency: 'INR',
    category: 'TSHIRT', // mapped to filter
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Developed in collaboration with an archival knitting mill in Wakayama. Constructed from 580 GSM French Terry woven from long-staple organic cotton yarns. Cut with a sculptural drop shoulder, double-layered rigid hood without drawstrings, and an unrefined raw hemline treated with anti-fray bar-tacks.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 8,
    specs: {
      material: '100% GOTS Certified Long-Staple Organic Cotton',
      weight: '580 GSM / 17.1 oz Heavy Loopback',
      fit: 'Sculptural Boxy / Cropped Torso / Elongated Sleeve',
      hardware: 'Brushed matte black eyelets, internal woven label',
      origin: 'Kojima & Wakayama, Japan',
      care: 'Cold water wash inside-out. Do not tumble dry. Flat dry in shade.'
    },
    dimensions: [
      { size: 'S', chest: '64 cm', length: '63 cm', shoulder: '60 cm', sleeve: '65 cm' },
      { size: 'M', chest: '67 cm', length: '65 cm', shoulder: '62 cm', sleeve: '66 cm' },
      { size: 'L', chest: '70 cm', length: '67 cm', shoulder: '64 cm', sleeve: '67 cm' },
      { size: 'XL', chest: '73 cm', length: '69 cm', shoulder: '66 cm', sleeve: '68 cm' }
    ]
  },
  {
    id: 'anon-cargo-02',
    code: 'AN-PT02-BLK',
    name: '02 / MODULAR TACTICAL CARGO PANT',
    tagline: 'Technical Ventile Cotton / Magnetic Fidlock Closures',
    price: 320,
    currency: 'INR',
    category: 'CARGOS', // mapped to filter
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Engineered for metropolitan mobility and weather shielding. Tailored from high-density weatherproof Ventile cotton canvas. Features 8 utility compartments with custom German Fidlock magnetic fasteners, articulated knee darts for range of motion, and adjustable hem cinches for custom tapering.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 4,
    specs: {
      material: '100% Water-Resistant Ventile Cotton (L19 weave)',
      weight: '320 GSM Structural Canvas',
      fit: 'Relaxed Tapered / Articulated Knee Architecture',
      hardware: 'Fidlock V-Buckles & Matte YKK Excella Zippers',
      origin: 'Osaka, Japan',
      care: 'Specialist wipe clean or dry clean only. Preserve DWR coating.'
    },
    dimensions: [
      { size: 'S', chest: 'W30', length: '104 cm', shoulder: 'N/A', sleeve: 'Inseam 76 cm' },
      { size: 'M', chest: 'W32', length: '106 cm', shoulder: 'N/A', sleeve: 'Inseam 78 cm' },
      { size: 'L', chest: 'W34', length: '108 cm', shoulder: 'N/A', sleeve: 'Inseam 80 cm' },
      { size: 'XL', chest: 'W36', length: '110 cm', shoulder: 'N/A', sleeve: 'Inseam 82 cm' }
    ]
  },
  {
    id: 'anon-shirt-03',
    code: 'AN-SH03-WHT',
    name: '03 / ARCHIVAL OXFORD SHIRT',
    tagline: 'Heavyweight Japanese Oxford Cotton / Mother of Pearl Buttons',
    price: 290,
    currency: 'INR',
    category: 'SHIRTS',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A classic silhouette re-engineered with dense oxford cloth. Features structured button-down collar, single chest pocket, and curved hemline.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 6,
    specs: {
      material: '100% Japanese Oxford Cotton',
      weight: '240 GSM',
      fit: 'Relaxed Fit',
      hardware: 'Mother of Pearl Buttons',
      origin: 'Okayama, Japan',
      care: 'Machine wash cold. Hang dry.'
    },
    dimensions: [
      { size: 'M', chest: '112 cm', length: '74 cm', shoulder: '48 cm', sleeve: '65 cm' }
    ]
  },
  {
    id: 'anon-trouser-04',
    code: 'AN-TR04-CHR',
    name: '04 / STRUCTURED PLEATED TROUSER',
    tagline: 'Draped Wool-Blend / Tailored Wide Leg',
    price: 360,
    currency: 'INR',
    category: 'TROUSERS',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Crisp front pleats with a relaxed wide-leg drape. Crafted from a premium wool-blend fabric designed for transitional seasons.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 5,
    specs: {
      material: 'Wool & Organic Cotton Blend',
      weight: '300 GSM',
      fit: 'Wide Leg Tailored',
      hardware: 'Concealed hook-and-bar closure',
      origin: 'Milan, Italy',
      care: 'Dry clean only.'
    },
    dimensions: [
      { size: 'M', chest: 'W32', length: '108 cm', shoulder: 'N/A', sleeve: 'Inseam 79 cm' }
    ]
  },
  {
    id: 'anon-tee-05',
    code: 'AN-TS05-WHT',
    name: '05 / INTERLOCK BOX TEE',
    tagline: '310 GSM Double-Faced Cotton / Stark Architectural Seam',
    price: 130,
    currency: 'INR',
    category: 'TSHIRT',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The archetype basic reinvented through heavyweight architectural form. 310 GSM double-faced compact cotton jersey that holds a defined rigid box shape rather than draping casually.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 15,
    specs: {
      material: '100% Supima Combed Cotton Double-Knit',
      weight: '310 GSM Dense Jersey',
      fit: 'Boxy / Wide Neck',
      hardware: 'Sub-surface tonal stitching',
      origin: 'Porto, Portugal',
      care: 'Gentle cycle cold.'
    },
    dimensions: [
      { size: 'M', chest: '63 cm', length: '71 cm', shoulder: '56 cm', sleeve: '29 cm' }
    ]
  },
  {
    id: 'anon-jeans-06',
    code: 'AN-JN06-IND',
    name: '06 / RAW SELVEDGE DENIM JEANS',
    tagline: '14oz Kuroki Mills Selvedge / Relaxed Straight Cut',
    price: 420,
    currency: 'INR',
    category: 'JEANS',
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Unwashed 14oz Japanese selvedge denim from Kuroki Mills. Built to mold uniquely to the wearer over years of wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 7,
    specs: {
      material: '100% Japanese Selvedge Cotton',
      weight: '14 oz Heavyweight Denim',
      fit: 'Relaxed Straight',
      hardware: 'Copper rivets & custom button fly',
      origin: 'Okayama, Japan',
      care: 'Wash cold inside out after 6 months of wear.'
    },
    dimensions: [
      { size: 'M', chest: 'W32', length: '106 cm', shoulder: 'N/A', sleeve: 'Inseam 80 cm' }
    ]
  },
  {
    id: 'anon-polo-07',
    code: 'AN-PL07-BLK',
    name: '07 / KNIT ARCHIVAL POLO',
    tagline: 'Merino Wool Blend / Open Placket Design',
    price: 260,
    currency: 'INR',
    category: 'POLO',
    images: [
      'https://images.unsplash.com/photo-1625910513411-79b2960662d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A refined take on the classic polo. Knit from breathable merino wool with an open collar placket and clean ribbed trims.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 9,
    specs: {
      material: 'Merino Wool & Cotton Knit',
      weight: '220 GSM',
      fit: 'Slim Boxy',
      hardware: 'Seamless knit placket',
      origin: 'Florence, Italy',
      care: 'Hand wash cold or dry clean.'
    },
    dimensions: [
      { size: 'M', chest: '104 cm', length: '70 cm', shoulder: '45 cm', sleeve: '26 cm' }
    ]
  }
];

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