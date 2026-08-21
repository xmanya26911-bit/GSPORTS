const HOST = "https://api.otp.plus";
const USERNAME = process.env.OTP_USERNAME ?? "";
const KEY = process.env.OTP_ACCESS_KEY ?? "";

export type OtpResult = { success: boolean; error?: string };

/**
 * Sends an OTP to `phone` (E.164, e.g. +917889342459) via api.otp.plus.
 * The 6-character account username lives in OTP_USERNAME (URL path segment).
 */
export async function sendOtp(phone: string): Promise<OtpResult> {
  if (!USERNAME || !KEY) return { success: false, error: "OTP service is not configured." };
  try {
    const fd = new FormData();
    fd.append("to", phone);
    fd.append("extra", JSON.stringify({ VAR: "Golden Willowe" }));
    const res = await fetch(`${HOST}/api/otp/${USERNAME}`, {
      method: "PUT",
      headers: { "X-API-Key": KEY },
      body: fd,
    });
    if (!res.ok) return { success: false, error: `Could not send code (${res.status}).` };
    return { success: true };
  } catch {
    return { success: false, error: "Network error while sending code." };
  }
}

/** Verifies an OTP for `phone`. Returns success only when the service confirms. */
export async function verifyOtp(phone: string, otp: string): Promise<OtpResult> {
  if (!USERNAME || !KEY) return { success: false, error: "OTP service is not configured." };
  try {
    const fd = new FormData();
    fd.append("to", phone);
    fd.append("extra", JSON.stringify({ VAR: "Golden Willowe" }));
    fd.append("action", "check");
    fd.append("otp", otp);
    const res = await fetch(`${HOST}/api/otp/${USERNAME}`, {
      method: "POST",
      headers: { "X-API-Key": KEY },
      body: fd,
    });
    if (!res.ok) return { success: false, error: "Incorrect or expired code." };
    return { success: true };
  } catch {
    return { success: false, error: "Network error while verifying code." };
  }
}
