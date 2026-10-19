export type ProductCategory = 
  | 'all'
  | 'digital-showers'
  | 'smart-toilets'
  | 'luxury-bathtubs'
  | 'waterfall-sinks'
  | 'vanities-mirrors'
  | 'faucets-accessories';

export interface ProductFinish {
  id: string;
  name: string;
  hex: string;
  colorClass: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  avatarUrl?: string;
  productTitle: string;
  photoUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  originalPrice: number;
  salePrice: number;
  currency: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  stockLeft: number;
  images: string[];
  finishes: ProductFinish[];
  selectedFinishId?: string;
  highlights: string[];
  specs: ProductSpec[];
  boxContents: string[];
  description: string;
  dimensions: string;
  material: string;
  warranty: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  selectedFinish: ProductFinish;
  quantity: number;
}

export interface CustomerOrder {
  orderId: string;
  createdAt: string;
  items: {
    productId: string;
    productTitle: string;
    finishName: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
  customer: {
    fullName: string;
    phone: string;
    whatsappPhone: string;
    address: string;
    city: string;
    state: string;
    deliveryDatePreference: string;
    notes?: string;
  };
  pricing: {
    subtotal: number;
    discountAmount: number;
    deliveryFee: number;
    total: number;
  };
  paymentMethod: 'pay-on-delivery' | 'bank-transfer';
  status: 'confirmed' | 'processing' | 'dispatched' | 'out-for-delivery' | 'delivered';
  trackingNumber: string;
}
