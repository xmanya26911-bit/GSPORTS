"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, ShieldCheck, User, MapPin, Check } from "lucide-react";
import { useCustomer } from "@/store/customer";
import type { Address, Customer } from "@/types";

type Step = "phone" | "otp" | "profile";

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const setCustomer = useCustomer((s) => s.setCustomer);
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [addr, setAddr] = useState({ line1: "", city: "", state: "", pincode: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setStep("phone");
    setOtp("");
    setName("");
    setAddr({ line1: "", city: "", state: "", pincode: "" });
    setError("");
  };

  const close = () => {
    reset();
    setPhone("");
    onClose();
  };

  const sendOtp = async () => {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = (await res.json()) as { success: boolean; error?: string };
      if (!data.success) {
        setError(data.error ?? "Could not send code.");
        return;
      }
      setStep("otp");
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = (await res.json()) as { success: boolean; error?: string; customer?: Customer };
      if (!data.success || !data.customer) {
        setError(data.error ?? "Incorrect code.");
        return;
      }
      if (!data.customer.name) {
        setStep("profile");
        return;
      }
      setCustomer(data.customer);
      close();
    } finally {
      setBusy(false);
    }
  };

  const saveProfile = async () => {
    setError("");
    setBusy(true);
    try {
      const address: Address = { id: crypto.randomUUID(), ...addr, isDefault: true };
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, addresses: [address] }),
      });
      const data = (await res.json()) as { customer: Customer | null };
      setCustomer(data.customer);
      close();
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          onClick={close}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-bg rounded-t-3xl sm:rounded-3xl border border-border p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text font-display">Welcome to Golden Willowe</h2>
              <button onClick={close} className="p-2 -mr-2 text-text-muted hover:text-text transition-colors rounded-lg focus-ring" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            {step === "phone" && (
              <div className="space-y-4">
                <p className="text-sm text-text-muted">Login with your mobile number. We&apos;ll send a one-time code.</p>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-bg-alt focus-within:border-accent transition-colors">
                  <Phone className="w-4 h-4 text-text-muted" />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="7889342459"
                    inputMode="tel"
                    autoFocus
                    className="flex-1 bg-transparent outline-none text-text text-sm"
                  />
                </div>
                {error && <p className="text-sm text-sale">{error}</p>}
                <button
                  onClick={sendOtp}
                  disabled={busy || phone.replace(/\D/g, "").length < 10}
                  className="w-full py-3.5 bg-accent text-bg-dark font-semibold rounded-xl hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {busy ? "Sending..." : "Send OTP"}
                </button>
              </div>
            )}

            {step === "otp" && (
              <div className="space-y-4">
                <p className="text-sm text-text-muted">Enter the 6-digit code sent to <span className="text-text font-medium">{phone}</span>.</p>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="••••••"
                  inputMode="numeric"
                  maxLength={8}
                  autoFocus
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-bg-alt text-center text-2xl tracking-[0.5em] text-text focus:outline-none focus:border-accent transition-colors"
                />
                {error && <p className="text-sm text-sale">{error}</p>}
                <button
                  onClick={verifyOtp}
                  disabled={busy || otp.length < 4}
                  className="w-full py-3.5 bg-accent text-bg-dark font-semibold rounded-xl hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {busy ? "Verifying..." : "Verify & Login"}
                </button>
                <button onClick={() => setStep("phone")} className="w-full text-sm text-text-muted hover:text-accent transition-colors">
                  Change number
                </button>
              </div>
            )}

            {step === "profile" && (
              <div className="space-y-3">
                <p className="text-sm text-text-muted flex items-center gap-2"><User className="w-4 h-4" /> Almost there — tell us about you.</p>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                <div className="flex items-center gap-2 text-text-muted text-xs"><MapPin className="w-3.5 h-3.5" /> Default delivery address</div>
                <input value={addr.line1} onChange={(e) => setAddr({ ...addr, line1: e.target.value })} placeholder="House/Flat, Street, Area" className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} placeholder="City" className="px-4 py-3 rounded-xl border border-border bg-bg-alt text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                  <input value={addr.state} onChange={(e) => setAddr({ ...addr, state: e.target.value })} placeholder="State" className="px-4 py-3 rounded-xl border border-border bg-bg-alt text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                </div>
                <input value={addr.pincode} onChange={(e) => setAddr({ ...addr, pincode: e.target.value.replace(/\D/g, "") })} placeholder="Pincode" inputMode="numeric" className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                {error && <p className="text-sm text-sale">{error}</p>}
                <button
                  onClick={saveProfile}
                  disabled={busy || !name.trim() || !addr.line1.trim() || !addr.pincode.trim()}
                  className="w-full py-3.5 bg-accent text-bg-dark font-semibold rounded-xl hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {busy ? "Saving..." : <>Finish <Check className="w-4 h-4" /></>}
                </button>
              </div>
            )}

            <p className="mt-5 text-[11px] text-text-tertiary flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure OTP login · Your data stays private
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
