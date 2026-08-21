import { NextRequest, NextResponse } from "next/server";
import { sendOtp } from "@/lib/otp";
import { normalizePhone } from "@/lib/customers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const lastSent = new Map<string, number>();
const WINDOW_MS = 60_000;

type SendBody = { phone?: string };

export async function POST(req: NextRequest) {
  let body: SendBody = {};
  try {
    body = (await req.json()) as SendBody;
  } catch {
    body = {};
  }
  const norm = normalizePhone(body.phone);
  if (!norm) {
    return NextResponse.json(
      { success: false, error: "Enter a valid 10-digit Indian mobile number." },
      { status: 400 }
    );
  }
  const now = Date.now();
  if (now - (lastSent.get(norm) ?? 0) < WINDOW_MS) {
    return NextResponse.json(
      { success: false, error: "Please wait a moment before requesting another code." },
      { status: 429 }
    );
  }
  const result = await sendOtp(norm);
  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error ?? "Could not send OTP." }, { status: 502 });
  }
  lastSent.set(norm, now);
  return NextResponse.json({ success: true });
}
