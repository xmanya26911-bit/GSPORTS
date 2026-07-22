export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: "published" | "draft" | "archived";
  image: string;
  sku: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment: "paid" | "pending" | "refunded";
  date: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  status: "active" | "inactive" | "vip";
  joined: Date;
  avatar?: string;
}

export const products: Product[] = [];

export const orders: Order[] = [];

export const customers: Customer[] = [];

export const revenueData: { month: string; revenue: number; profit: number; orders: number }[] = [];

export const trafficData: { name: string; value: number; color: string }[] = [];

export const topProducts: { name: string; sales: number; revenue: number }[] = [];
