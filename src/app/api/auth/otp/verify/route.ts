import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp";
import { normalizePhone, upsertCustomer } from "@/lib/customers";
import { createCustomerSession, CUSTOMER_COOKIE, CUSTOMER_COOKIE_OPTS } from "@/lib/auth-customer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AddressInput = { line1: string; city: string; state: string; pincode: string };
type VerifyBody = {
  phone?: string;
  otp?: string;
  name?: string;
  email?: string;
  address?: AddressInput;
};

export async function POST(req: NextRequest) {
  let body: VerifyBody = {};
  try {
    body = (await req.json()) as VerifyBody;
  } catch {
    body = {};
  }
  const norm = normalizePhone(body.phone);
  if (!norm) {
    return NextResponse.json({ success: false, error: "Invalid phone number." }, { status: 400 });
  }
  const otp = String(body.otp ?? "").trim();
  if (!/^\d{4,8}$/.test(otp)) {
    return NextResponse.json({ success: false, error: "Enter the code we sent." }, { status: 400 });
  }
  const ok = await verifyOtp(norm, otp);
  if (!ok.success) {
    return NextResponse.json({ success: false, error: ok.error ?? "Incorrect code." }, { status: 401 });
  }
  const customer = await upsertCustomer({
    phone: norm,
    name: body.name,
    email: body.email,
    address: body.address,
  });
  const res = NextResponse.json({ success: true, customer });
  res.cookies.set(CUSTOMER_COOKIE, createCustomerSession(norm), CUSTOMER_COOKIE_OPTS);
  return res;
}
