export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  description: string;
  price: number;
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
