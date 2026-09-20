import { Product, TrackedOrder } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'anon-hoodie-01',
    code: 'AN-HD01-BLK',
    name: '01 / HEAVYWEIGHT OVERSHOT HOODIE',
    tagline: '580 GSM Custom Loopback Terry / Raw Edge Trim',
    price: 240,
    currency: 'INR',
    category: 'TOPS',
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
    category: 'BOTTOMS',
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
    id: 'anon-jacket-03',
    code: 'AN-JK03-BLK',
    name: '03 / TECHNICAL BALLISTIC SHELL JACKET',
    tagline: '3-Layer Membrane / Raccagni Asymmetric Two-Way Zip',
    price: 480,
    currency: 'INR',
    category: 'OUTERWEAR',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An uncompromising outer shell built to withstand extreme elements with an archival minimalist posture. Triple-layer laminate membrane bonded with waterproof taped seams throughout. Offset asymmetric Raccagni zipper closure with stowaway hood and sling strap system for hands-free transport.',
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    stockCount: 3,
    specs: {
      material: 'Cordura Ripstop / 3-Layer PTFE Waterproof Membrane',
      weight: '20,000mm Hydrostatic Head / 15,000g Breathability',
      fit: 'Oversized Technical Outer Shell / Layering Spec',
      hardware: 'Italian Raccagni SuperR Zippers / Duraflex Hardware',
      origin: 'Milan & Tokyo',
      care: 'Machine wash cool with technical fabric wash. Hang to air dry.'
    },
    dimensions: [
      { size: 'M', chest: '68 cm', length: '72 cm', shoulder: '56 cm', sleeve: '67 cm' },
      { size: 'L', chest: '71 cm', length: '74 cm', shoulder: '58 cm', sleeve: '68 cm' },
      { size: 'XL', chest: '74 cm', length: '76 cm', shoulder: '60 cm', sleeve: '69 cm' }
    ]
  },
  {
    id: 'anon-tee-04',
    code: 'AN-TS04-WHT',
    name: '04 / INTERLOCK BOX TEE',
    tagline: '310 GSM Double-Faced Cotton / Stark Architectural Seam',
    price: 130,
    currency: 'INR',
    category: 'TOPS',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The archetype basic reinvented through heavyweight architectural form. 310 GSM double-faced compact cotton jersey that holds a defined rigid box shape rather than draping casually. Features blind hem stitching, dense 1x1 rib collar that will not stretch over time, and laser-engraved identification patch at the inner spine.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 15,
    specs: {
      material: '100% Supima Combed Cotton Double-Knit',
      weight: '310 GSM Dense Jersey',
      fit: 'Boxy / Wide Neck / Elbow Length Sleeve',
      hardware: 'Sub-surface tonal stitching / heat-set spine tag',
      origin: 'Porto, Portugal',
      care: 'Gentle cycle cold. Do not bleach. Cool iron on reverse.'
    },
    dimensions: [
      { size: 'S', chest: '60 cm', length: '69 cm', shoulder: '54 cm', sleeve: '28 cm' },
      { size: 'M', chest: '63 cm', length: '71 cm', shoulder: '56 cm', sleeve: '29 cm' },
      { size: 'L', chest: '66 cm', length: '73 cm', shoulder: '58 cm', sleeve: '30 cm' },
      { size: 'XL', chest: '69 cm', length: '75 cm', shoulder: '60 cm', sleeve: '31 cm' }
    ]
  },
  {
    id: 'anon-vest-05',
    code: 'AN-VT05-BLK',
    name: '05 / TACTICAL HOLSTER VEST',
    tagline: '1000D Ballistic Cordura / Quick-Release Cobra Buckle',
    price: 280,
    currency: 'INR',
    category: 'ACCESSORIES',
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An archival utility harness engineered for modular layering over hoodies or under coats. Fabricated from 1000D high-tenacity ballistic Cordura nylon. Equipped with dual 3D volumetric front cargo pouches, rear hydration bladder sheath, and authentic AustriAlpin Cobra quick-release hardware.',
    sizes: ['S', 'M', 'L'],
    inStock: true,
    stockCount: 6,
    specs: {
      material: '1000D Ballistic Cordura Nylon / Mil-Spec Webbing',
      weight: '450g Total Dry Weight',
      fit: 'Fully Adjustable Webbing Harness / One Size Fits Most',
      hardware: 'AustriAlpin Cobra Buckles (Aluminium)',
      origin: 'Innsbruck & Tokyo',
      care: 'Spot clean only with damp cloth.'
    }
  },
  {
    id: 'anon-boot-06',
    code: 'AN-FT06-BLK',
    name: '06 / ARCHIVAL MONOLITH LEATHER BOOT',
    tagline: 'Vegetable-Tanned Calfskin / Goodyear Welted Vibram Lug',
    price: 590,
    currency: 'INR',
    category: 'FOOTWEAR',
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A monolithic silhouette crafted by third-generation bootmakers in Tuscany. 2.4mm full-grain Italian calf leather dipped in vegetable tannins. 360-degree Goodyear welt construction anchored by an exaggerated Vibram Montagna lug outsole. Heavy brass eyelets and waxed utilitarian laces.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 2,
    specs: {
      material: '2.4mm Full-Grain Italian Vegetable-Tanned Leather',
      weight: '820g per boot',
      fit: 'True to size / Includes leather insole spacer',
      hardware: 'Custom Vibram Montagna Lug / Antiqued Blackened Eyelets',
      origin: 'Tuscany, Italy',
      care: 'Condition with natural beeswax balsam. Store in cedar trees.'
    }
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
    carrier: 'DHL Express  Indian Archival',
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
