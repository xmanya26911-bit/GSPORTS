import { createHmac, timingSafeEqual } from "node:crypto";

export const CUSTOMER_COOKIE = "gw_customer_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

/** Reuses the configured admin secret as the HMAC key for customer sessions. */
function secret(): string | null {
  const value = process.env.ADMIN_PASSWORD;
  return value && value.length >= 8 ? value : null;
}

function sign(payload: string): string {
  const key = secret();
  if (!key) throw new Error("Session auth is not configured");
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Creates a signed session token encoding the customer's phone number. */
export function createCustomerSession(phone: string): string {
  const payload = `${phone}.${Date.now() + MAX_AGE_SECONDS * 1000}`;
  return `${payload}.${sign(payload)}`;
}

/** Returns the phone number if the token is valid, otherwise null. */
export function verifyCustomerSession(token: string | undefined | null): string | null {
  if (!token) return null;
  const [phone, expiry, signature] = token.split(".");
  if (!phone || !expiry || !signature) return null;
  if (!safeEqual(signature, sign(`${phone}.${expiry}`))) return null;
  if (Number(expiry) <= Date.now()) return null;
  return phone;
}

export const CUSTOMER_COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
