import { list, put } from "@vercel/blob";
import type { Order } from "@/types";

export const ORDERS_TAG = "orders";
const PATH = "data/orders.json";

async function readAll(): Promise<Order[]> {
  try {
    const { blobs } = await list({ prefix: PATH });
    if (!blobs.length) return [];
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as Order[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeAll(orders: Order[]): Promise<void> {
  await put(PATH, JSON.stringify(orders), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getOrderById(id: string): Promise<Order | null> {
  const all = await readAll();
  return all.find((o) => o.id === id) ?? null;
}

export async function getAllOrders(): Promise<Order[]> {
  const all = await readAll();
  return all.sort((a, b) => b.createdAt - a.createdAt);
}

export async function createOrder(order: Order): Promise<Order> {
  const all = await readAll();
  all.push(order);
  await writeAll(all);
  return order;
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | null> {
  const all = await readAll();
  const idx = all.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...patch };
  await writeAll(all);
  return all[idx];
}
