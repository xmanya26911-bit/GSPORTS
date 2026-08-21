import { NextRequest, NextResponse } from "next/server";
import { getCustomerByPhone, updateCustomer } from "@/lib/customers";
import { verifyCustomerSession, CUSTOMER_COOKIE } from "@/lib/auth-customer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(CUSTOMER_COOKIE)?.value;
  const phone = verifyCustomerSession(token);
  if (!phone) return NextResponse.json({ customer: null }, { status: 401 });
  const customer = await getCustomerByPhone(phone);
  return NextResponse.json({ customer: customer ?? null });
}

type PatchBody = { name?: string; email?: string; addresses?: import("@/lib/customers").Address[] };

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get(CUSTOMER_COOKIE)?.value;
  const phone = verifyCustomerSession(token);
  if (!phone) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let body: PatchBody = {};
  try {
    body = (await req.json()) as PatchBody;
  } catch {
    body = {};
  }
  const updated = await updateCustomer(phone, {
    name: body.name,
    email: body.email,
    addresses: body.addresses,
  });
  return NextResponse.json({ customer: updated });
}
