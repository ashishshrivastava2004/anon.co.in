export interface Product {
  id: string;
  code: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  category: 'OUTERWEAR' | 'TOPS' | 'BOTTOMS' | 'ACCESSORIES' | 'FOOTWEAR';
  images: string[];
  description: string;
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  inStock: boolean;
  stockCount: number;
  specs: {
    material: string;
    weight: string;
    fit: string;
    hardware: string;
    origin: string;
    care: string;
  };
  dimensions?: {
    size: string;
    chest: string;
    length: string;
    shoulder: string;
    sleeve: string;
  }[];
}

export interface CartItem {
  product: Product;
  selectedSize: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;
  orderNotes?: string;
}

export interface OrderCheckoutPayload {
  cart: {
    productId: string;
    name: string;
    code: string;
    size: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  customer: CustomerDetails;
  totalAmount: number;
  currency: string;
  timestamp: string;
}

export interface TrackingCheckpoint {
  time: string;
  date: string;
  location: string;
  status: string;
  completed: boolean;
}

export interface TrackedOrder {
  orderId: string;
  email: string;
  createdAt: string;
  status: 'PENDING_ATELIER' | 'PROCESSING' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED';
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  shippingAddress: string;
  totalAmount: number;
  currency: string;
  items: {
    name: string;
    code: string;
    size: string;
    quantity: number;
    price: number;
  }[];
  timeline: TrackingCheckpoint[];
}
