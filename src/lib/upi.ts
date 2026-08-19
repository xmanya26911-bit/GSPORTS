export const MERCHANT = {
  name: "GOLDEN WILLOWE",
  upiId: "MAB.037215010130296@AXISBANK",
  currency: "INR",
  whatsapp: "917889342459",
} as const;

export interface UPIURIParams {
  amount: number;
  orderId: string;
  merchantName?: string;
  upiId?: string;
  currency?: string;
  note?: string;
}

export function createUPIURI(params: UPIURIParams): string {
  const {
    amount,
    orderId,
    merchantName = MERCHANT.name,
    upiId = MERCHANT.upiId,
    currency = MERCHANT.currency,
    note,
  } = params;

  const uri = new URL("upi://pay");
  uri.searchParams.set("pa", upiId);
  uri.searchParams.set("pn", merchantName);
  uri.searchParams.set("am", String(Math.round(amount)));
  uri.searchParams.set("cu", currency);
  uri.searchParams.set("tn", note || `ORDER-${orderId}`);

  return uri.toString();
}

export function openUPIApp(uri: string): void {
  window.open(uri, "_blank");
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
