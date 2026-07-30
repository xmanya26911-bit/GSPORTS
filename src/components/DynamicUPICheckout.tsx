"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Download,
  Smartphone,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Wallet,
  IndianRupee,
  QrCode,
} from "lucide-react";
import QRCode from "qrcode";
import { MERCHANT, createUPIURI, copyToClipboard } from "@/lib/upi";
import { generateOrderId, formatCurrency } from "@/utils/order";

interface DynamicUPICheckoutProps {
  amount: number;
  onPaid?: () => void;
  onCancel?: () => void;
  onOrderGenerated?: (orderId: string) => void;
  showDetails?: boolean;
  className?: string;
}

export default function DynamicUPICheckout({
  amount,
  onPaid,
  onOrderGenerated,
  showDetails = true,
  className = "",
}: DynamicUPICheckoutProps) {
  const [orderId] = useState(() => {
    const id = generateOrderId();
    setTimeout(() => onOrderGenerated?.(id), 0);
    return id;
  });
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(true);
  const [qrError, setQrError] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [expandDetails, setExpandDetails] = useState(true);
  const qrRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const upiUri = createUPIURI({ amount, orderId });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setQrLoading(true);
    setQrError(false);

    QRCode.toDataURL(upiUri, {
      width: 400,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })
      .then((url) => {
        if (!cancelled) {
          setQrDataUrl(url);
          setQrLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setQrError(true);
          setQrLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [upiUri]);

  const handleCopyUPI = useCallback(async () => {
    try {
      await copyToClipboard(MERCHANT.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } catch {}
  }, []);

  const handleCopyOrder = useCallback(async () => {
    try {
      await copyToClipboard(orderId);
      setCopiedOrder(true);
      setTimeout(() => setCopiedOrder(false), 2000);
    } catch {}
  }, [orderId]);

  const handleDownloadQR = useCallback(() => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `golden-willowe-payment-${orderId}.png`;
    link.href = qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrDataUrl, orderId]);

  const handleOpenApp = useCallback(
    (app: "gpay" | "phonepe" | "paytm") => {
      const urls: Record<string, string> = {
        gpay: upiUri,
        phonepe: `phonepe://pay?pa=${encodeURIComponent(MERCHANT.upiId)}&pn=${encodeURIComponent(MERCHANT.name)}&am=${amount}&cu=INR&tn=ORDER-${orderId}`,
        paytm: `paytmmp://pay?pa=${encodeURIComponent(MERCHANT.upiId)}&pn=${encodeURIComponent(MERCHANT.name)}&am=${amount}&cu=INR&tn=ORDER-${orderId}`,
      };
      const url = urls[app];
      if (url) {
        window.open(url, "_blank");
      }
    },
    [upiUri, amount, orderId]
  );

  const appButtons = [
    {
      id: "gpay" as const,
      label: "Google Pay",
      icon: "/images/gpay-icon.png",
      color: "from-[#4285F4] to-[#34A853]",
      action: () => handleOpenApp("gpay"),
    },
    {
      id: "phonepe" as const,
      label: "PhonePe",
      icon: "/images/phonepe-icon.png",
      color: "from-[#5F259F] to-[#7C3AED]",
      action: () => handleOpenApp("phonepe"),
    },
    {
      id: "paytm" as const,
      label: "Paytm",
      icon: "/images/paytm-icon.png",
      color: "from-[#00BAF2] to-[#002970]",
      action: () => handleOpenApp("paytm"),
    },
  ];

  return (
    <div
      className={`w-full max-w-md mx-auto ${className}`}
      role="region"
      aria-label="UPI Payment Checkout"
    >
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-premium rounded-3xl border border-border/60 overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/20"
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 text-center bg-gradient-to-b from-accent/[0.03] to-transparent">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 mb-3"
          >
            <Wallet className="w-6 h-6 text-accent" />
          </motion.div>
          <h2 className="text-lg font-semibold text-text">Pay with UPI</h2>
          <p className="text-xs text-text-muted mt-1">
            Scan QR or use any UPI app
          </p>

          {/* Amount Display */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-4 inline-flex items-baseline gap-1.5 bg-accent/10 px-5 py-2.5 rounded-2xl"
          >
            <IndianRupee className="w-5 h-5 text-accent" />
            <span className="text-3xl font-bold text-accent tracking-tight">
              {amount.toLocaleString("en-IN")}
            </span>
          </motion.div>
        </div>

        {/* QR Code Section */}
        <div className="px-6 py-5 flex flex-col items-center">
          <div
            ref={qrRef}
            className="relative w-56 h-56 rounded-2xl bg-white dark:bg-white flex items-center justify-center shadow-lg shadow-black/5"
            role="img"
            aria-label={`QR code for UPI payment of ${formatCurrency(amount)}`}
          >
            <AnimatePresence mode="wait">
              {qrLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-12 h-12">
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-accent/30"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-1 rounded-lg border-2 border-accent/60 border-t-transparent"
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-accent/40" />
                      </div>
                    </div>
                    <span className="text-xs text-text-muted font-medium">
                      Generating QR...
                    </span>
                  </div>
                </motion.div>
              )}

              {qrError && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl"
                >
                  <div className="text-center px-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-2">
                      <QrCode className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="text-xs text-text-muted">Failed to generate QR</p>
                    <p className="text-[11px] text-text-muted/60 mt-1">
                      Please try refreshing
                    </p>
                  </div>
                </motion.div>
              )}

              {qrDataUrl && !qrLoading && (
                <motion.img
                  key="qr"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  src={qrDataUrl}
                  alt={`QR code: Pay ${formatCurrency(amount)} to ${MERCHANT.name}`}
                  className="w-52 h-52 rounded-xl"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Pay via UPI ID */}
          <div className="mt-4 w-full">
            <div className="flex items-center justify-between bg-bg-alt/50 dark:bg-white/5 rounded-xl px-4 py-2.5 border border-border/40">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-text-muted uppercase tracking-wider font-medium">
                  UPI ID
                </p>
                <p className="text-sm font-medium text-text truncate">
                  {MERCHANT.upiId}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCopyUPI}
                className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/10 transition-all"
                aria-label={copiedUpi ? "UPI ID copied" : "Copy UPI ID"}
              >
                {copiedUpi ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-2 space-y-2">
          {/* App Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {appButtons.map((app) => (
              <motion.button
                key={app.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={app.action}
                className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-border/60 bg-bg-alt/30 hover:bg-accent/[0.04] hover:border-accent/20 transition-all group"
                aria-label={`Pay with ${app.label}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
                >
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] font-medium text-text-muted group-hover:text-text transition-colors">
                  {app.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownloadQR}
              disabled={!qrDataUrl}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border/60 text-xs font-medium text-text-muted hover:text-accent hover:border-accent/20 hover:bg-accent/[0.04] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Download QR code"
            >
              <Download className="w-3.5 h-3.5" />
              Download QR
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyOrder}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border/60 text-xs font-medium text-text-muted hover:text-accent hover:border-accent/20 hover:bg-accent/[0.04] transition-all"
              aria-label={copiedOrder ? "Order ID copied" : "Copy Order ID"}
            >
              {copiedOrder ? (
                <Check className="w-3.5 h-3.5 text-success" />
              ) : (
                <ExternalLink className="w-3.5 h-3.5" />
              )}
              {copiedOrder ? "Copied!" : "Copy Order ID"}
            </motion.button>
          </div>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div className="border-t border-border/40">
            <button
              onClick={() => setExpandDetails(!expandDetails)}
              className="w-full flex items-center justify-between px-6 py-3 text-xs text-text-muted hover:text-text transition-colors"
              aria-expanded={expandDetails}
            >
              <span className="font-medium">Payment Details</span>
              {expandDetails ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            <AnimatePresence>
              {expandDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Merchant</span>
                      <span className="text-text font-medium">
                        {MERCHANT.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Amount</span>
                      <span className="text-text font-semibold">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Order ID</span>
                      <span className="text-text font-mono text-[11px]">
                        {orderId}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Status</span>
                      <span className="text-amber-500 dark:text-amber-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Awaiting Payment
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 pb-5 pt-2">
          <p className="text-[11px] text-text-muted/50 text-center leading-relaxed">
            After payment, share the UTR number via WhatsApp to confirm your order.
            Your order will be processed within 24 hours.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
