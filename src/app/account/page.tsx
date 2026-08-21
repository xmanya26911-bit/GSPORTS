"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, MapPin, Plus, Trash2, Star, LogOut, Package, ShieldCheck } from "lucide-react";
import { useCustomer } from "@/store/customer";
import { LoginModal } from "@/components/auth/LoginModal";
import type { Address, Customer } from "@/types";

export default function AccountPage() {
  const { customer, load, logout, setCustomer } = useCustomer();
  const [loginOpen, setLoginOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addr, setAddr] = useState({ line1: "", city: "", state: "", pincode: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (customer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(customer.name ?? "");
      setEmail(customer.email ?? "");
      setAddresses(customer.addresses);
    }
  }, [customer]);

  if (!customer) {
    return (
      <div className="pt-28 min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
            <User className="w-7 h-7 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-text font-display mb-2">Your Account</h1>
          <p className="text-text-muted mb-6">Log in to view orders, saved addresses and faster checkout.</p>
          <button onClick={() => setLoginOpen(true)} className="px-8 py-3.5 bg-accent text-bg-dark font-semibold rounded-xl hover:bg-accent-light transition-colors">
            Login / Sign up
          </button>
          <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
        </div>
      </div>
    );
  }

  const saveProfile = async () => {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, addresses }),
      });
      const data = (await res.json()) as { customer: Customer | null };
      if (data.customer) setCustomer(data.customer);
      setMsg("Saved");
    } finally {
      setSaving(false);
    }
  };

  const addAddress = () => {
    if (!addr.line1.trim() || !addr.pincode.trim()) return;
    const next: Address = { id: crypto.randomUUID(), ...addr, isDefault: addresses.length === 0 };
    setAddresses([...addresses, next]);
    setAddr({ line1: "", city: "", state: "", pincode: "" });
  };

  const removeAddress = (id: string) => setAddresses(addresses.filter((a) => a.id !== id));
  const setDefault = (id: string) =>
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text font-display">My Account</h1>
            <p className="text-sm text-text-muted mt-1">{customer.phone}</p>
          </div>
          <button onClick={() => void logout()} className="flex items-center gap-2 text-sm text-text-muted hover:text-sale transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Profile */}
        <section className="bg-bg-alt rounded-2xl border border-border p-6 mb-6">
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2"><User className="w-4 h-4 text-accent" /> Profile</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="px-4 py-3 rounded-xl border border-border bg-bg text-text text-sm focus:outline-none focus:border-accent transition-colors" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" className="px-4 py-3 rounded-xl border border-border bg-bg text-text text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
        </section>

        {/* Addresses */}
        <section className="bg-bg-alt rounded-2xl border border-border p-6 mb-6">
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> Saved Addresses</h2>
          <div className="space-y-3">
            {addresses.length === 0 && <p className="text-sm text-text-muted">No addresses saved yet.</p>}
            {addresses.map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-3 p-4 rounded-xl border border-border bg-bg">
                <div className="text-sm text-text">
                  <p className="font-medium">{a.line1}</p>
                  <p className="text-text-muted">{a.city}, {a.state} — {a.pincode}</p>
                  {a.isDefault && <span className="inline-flex items-center gap-1 text-xs text-accent mt-1"><Star className="w-3 h-3" /> Default</span>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!a.isDefault && (
                    <button onClick={() => setDefault(a.id)} className="text-xs text-text-muted hover:text-accent px-2 py-1" title="Set default">Default</button>
                  )}
                  <button onClick={() => removeAddress(a.id)} className="p-2 text-text-muted hover:text-sale transition-colors rounded-lg" title="Remove">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <input value={addr.line1} onChange={(e) => setAddr({ ...addr, line1: e.target.value })} placeholder="House/Flat, Street, Area" className="sm:col-span-2 px-4 py-3 rounded-xl border border-border bg-bg text-text text-sm focus:outline-none focus:border-accent transition-colors" />
            <input value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} placeholder="City" className="px-4 py-3 rounded-xl border border-border bg-bg text-text text-sm focus:outline-none focus:border-accent transition-colors" />
            <input value={addr.state} onChange={(e) => setAddr({ ...addr, state: e.target.value })} placeholder="State" className="px-4 py-3 rounded-xl border border-border bg-bg text-text text-sm focus:outline-none focus:border-accent transition-colors" />
            <input value={addr.pincode} onChange={(e) => setAddr({ ...addr, pincode: e.target.value.replace(/\D/g, "") })} placeholder="Pincode" inputMode="numeric" className="px-4 py-3 rounded-xl border border-border bg-bg text-text text-sm focus:outline-none focus:border-accent transition-colors" />
            <button onClick={addAddress} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-accent/30 text-accent text-sm font-medium hover:bg-accent/5 transition-colors">
              <Plus className="w-4 h-4" /> Add Address
            </button>
          </div>
        </section>

        {/* Orders */}
        <section className="bg-bg-alt rounded-2xl border border-border p-6 mb-6">
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2"><Package className="w-4 h-4 text-accent" /> Orders</h2>
          {customer.orderIds.length === 0 ? (
            <p className="text-sm text-text-muted">No orders yet. <Link href="/products" className="text-accent hover:underline">Start shopping →</Link></p>
          ) : (
            <p className="text-sm text-text-muted">{customer.orderIds.length} order(s) placed. Track them on WhatsApp.</p>
          )}
        </section>

        <div className="flex items-center justify-end gap-4">
          {msg && <span className="text-sm text-success">{msg}</span>}
          <button onClick={saveProfile} disabled={saving} className="px-8 py-3.5 bg-accent text-bg-dark font-semibold rounded-xl hover:bg-accent-light transition-colors disabled:opacity-40">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <p className="mt-6 text-[11px] text-text-tertiary flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> Secure OTP login · Your data stays private
        </p>
      </div>
    </div>
  );
}
