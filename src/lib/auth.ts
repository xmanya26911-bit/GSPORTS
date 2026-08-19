import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "gw_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): string | null {
  const value = process.env.ADMIN_PASSWORD;
  return value && value.length >= 8 ? value : null;
}

function sign(payload: string): string {
  const key = secret();
  if (!key) throw new Error("Admin auth is not configured");
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Password check (constant-time). Fails closed when no password is configured. */
export function verifyAdminPassword(password: string): boolean {
  const expected = secret();
  if (!expected || !password) return false;
  const hashA = createHmac("sha256", expected).update(password).digest("hex");
  const hashB = createHmac("sha256", expected).update(expected).digest("hex");
  return safeEqual(hashA, hashB);
}

/** Returns a signed, expiring session token. */
export function createSessionToken(): string {
  const payload = `${Date.now() + SESSION_MAX_AGE * 1000}`;
  return `${payload}.${sign(payload)}`;
}

/** Verifies a session token's signature and expiry. */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;
  const expected = sign(expiry);
  if (!safeEqual(signature, expected)) return false;
  return Number(expiry) > Date.now();
}

export function isAdminConfigured(): boolean {
  return secret() !== null;
}

/**
 * Guards Route Handlers. Accepts either the signed session cookie
 * (browser admin) or an `x-admin-key` header equal to the configured
 * password (script/CI admin tooling).
 */
export function isAdminRequest(headers: Headers): boolean {
  const cookie = headers.get("cookie") ?? "";
  const token = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE}=`))
    ?.slice(ADMIN_COOKIE.length + 1);
  if (verifySessionToken(token)) return true;
  const apiKey = headers.get("x-admin-key");
  return apiKey ? verifyAdminPassword(apiKey) : false;
}