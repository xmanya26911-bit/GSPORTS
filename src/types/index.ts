export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  description: string;
  price: number | string;
  compareAtPrice?: number;
  images: string[];
  slug: string;
  features: string[];
  specifications: Specification[];
  highlights: string[];
  faqs: FAQ[];
  engraving?: EngravingOption;
  inventory: Inventory;
  createdAt: string;
  updatedAt: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface EngravingOption {
  available: boolean;
  price: number;
}

export interface Inventory {
  quantity: number;
  status: "in_stock" | "low_stock" | "out_of_stock" | "sold_out";
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
}

export interface Address {
  id: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Customer {
  id: string;
  phone: string; // E.164
  name?: string;
  email?: string;
  addresses: Address[];
  orderIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface OrderItem {
  name: string;
  slug: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  address?: Address;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  utr?: string;
  createdAt: number;
}
