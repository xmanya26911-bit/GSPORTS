import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { addOrderToCustomer, normalizePhone } from "@/lib/customers";
import type { Order, OrderItem } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  id?: string;
  customerPhone?: string;
  items?: OrderItem[];
  total?: number;
  address?: Order["address"];
};

export async function POST(req: NextRequest) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    body = {};
  }
  if (!body.id || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ success: false, error: "Invalid order." }, { status: 400 });
  }
  const customerPhone = normalizePhone(body.customerPhone);
  if (customerPhone) {
    try {
      await addOrderToCustomer(customerPhone, body.id);
    } catch {
      // non-fatal: order still recorded
    }
  }
  const order: Order = {
    id: body.id,
    customerPhone: customerPhone ?? "guest",
    items: body.items,
    total: Number(body.total) || 0,
    address: body.address,
    status: "pending",
    createdAt: Date.now(),
  };
  await createOrder(order);
  return NextResponse.json({ success: true });
}
