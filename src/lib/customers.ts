import { list, put } from "@vercel/blob";
import type { Address, Customer } from "@/types";

export const CUSTOMERS_TAG = "customers";
const PATH = "data/customers.json";

/** Normalizes an Indian phone number to E.164 (+91XXXXXXXXXX). Returns null if invalid. */
export function normalizePhone(raw?: string): string | null {
  if (!raw) return null;
  let p = raw.replace(/[^\d+]/g, "");
  if (p.startsWith("+")) return /^\+91\d{10}$/.test(p) ? p : null;
  p = p.replace(/^0+/, "");
  if (/^91\d{10}$/.test(p)) return "+" + p;
  if (/^\d{10}$/.test(p)) return "+91" + p;
  return null;
}

async function readAll(): Promise<Customer[]> {
  try {
    const { blobs } = await list({ prefix: PATH });
    if (!blobs.length) return [];
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as Customer[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeAll(customers: Customer[]): Promise<void> {
  await put(PATH, JSON.stringify(customers), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getCustomerByPhone(phone: string): Promise<Customer | null> {
  const all = await readAll();
  return all.find((c) => c.phone === phone) ?? null;
}

export async function getAllCustomers(): Promise<Customer[]> {
  return readAll();
}

export async function upsertCustomer(input: {
  phone: string;
  name?: string;
  email?: string;
  address?: Omit<Address, "id">;
}): Promise<Customer> {
  const all = await readAll();
  const now = Date.now();
  const idx = all.findIndex((c) => c.phone === input.phone);
  if (idx >= 0) {
    const c = all[idx];
    if (input.name) c.name = input.name;
    if (input.email) c.email = input.email;
    if (input.address) {
      const addr: Address = { id: crypto.randomUUID(), ...input.address, isDefault: c.addresses.length === 0 };
      c.addresses.push(addr);
    }
    c.updatedAt = now;
    all[idx] = c;
    await writeAll(all);
    return c;
  }
  const customer: Customer = {
    id: crypto.randomUUID(),
    phone: input.phone,
    name: input.name,
    email: input.email,
    addresses: input.address ? [{ id: crypto.randomUUID(), ...input.address, isDefault: true }] : [],
    orderIds: [],
    createdAt: now,
    updatedAt: now,
  };
  all.push(customer);
  await writeAll(all);
  return customer;
}

export async function updateCustomer(
  phone: string,
  patch: { name?: string; email?: string; addresses?: Address[] }
): Promise<Customer | null> {
  const all = await readAll();
  const idx = all.findIndex((c) => c.phone === phone);
  if (idx < 0) return null;
  const c = all[idx];
  if (patch.name !== undefined) c.name = patch.name;
  if (patch.email !== undefined) c.email = patch.email;
  if (patch.addresses !== undefined) c.addresses = patch.addresses;
  c.updatedAt = Date.now();
  all[idx] = c;
  await writeAll(all);
  return c;
}

export async function addOrderToCustomer(phone: string, orderId: string): Promise<void> {
  const all = await readAll();
  const c = all.find((x) => x.phone === phone);
  if (!c) return;
  if (!c.orderIds.includes(orderId)) c.orderIds.push(orderId);
  c.updatedAt = Date.now();
  await writeAll(all);
}
