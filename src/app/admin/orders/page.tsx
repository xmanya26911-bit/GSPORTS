"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, ShoppingCart } from "lucide-react";
import { orders } from "@/lib/mock-data";
import { formatCurrency, formatRelative } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  const statusVariant = (status: string) => {
    switch (status) {
      case "delivered": return "success";
      case "processing": case "shipped": return "warning";
      case "cancelled": return "danger";
      default: return "neutral";
    }
  };

  const filtered = orders.filter((o) =>
    search ? o.customer.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text">Orders</h1><p className="text-sm text-text-tertiary mt-0.5">{orders.length} orders</p></div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost text-xs"><Filter className="w-4 h-4" /> Filters</button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." className="input-field pl-10" />
      </div>

      {filtered.length === 0 && orders.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl border border-border p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-bg-hover flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">No orders yet</h3>
          <p className="text-sm text-text-tertiary max-w-sm mx-auto">When customers start placing orders, they will appear here with their status, payment info, and tracking details.</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Order ID", "Customer", "Items", "Total", "Status", "Payment", "Date", ""].map((h) => (
                    <th key={h} className="text-left text-[11px] font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => (
                  <motion.tr key={order.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-border/50 last:border-0 hover:bg-bg-hover/50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono font-medium text-text">{order.id}</td>
                    <td className="px-4 py-3"><div className="text-sm font-medium text-text">{order.customer}</div><div className="text-[11px] text-text-tertiary">{order.email}</div></td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{order.items}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-text">{formatCurrency(order.total)}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(order.status) as any}>{order.status}</Badge></td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium ${order.payment === "paid" ? "text-success" : order.payment === "refunded" ? "text-danger" : "text-warning"}`}>{order.payment}</span></td>
                    <td className="px-4 py-3 text-xs text-text-tertiary">{formatRelative(order.date)}</td>
                    <td className="px-4 py-3"><button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-bg-hover transition-colors"><MoreHorizontal className="w-4 h-4" /></button></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
