"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import { customers } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter((c) =>
    search ? c.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text">Customers</h1><p className="text-sm text-text-tertiary mt-0.5">{customers.length} customers</p></div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers..." className="input-field pl-10" />
      </div>

      {filtered.length === 0 && customers.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl border border-border p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-bg-hover flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">No customers yet</h3>
          <p className="text-sm text-text-tertiary max-w-sm mx-auto">Customer profiles will appear here once people start placing orders. Each customer shows their order history, total spent, and loyalty status.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((customer, i) => (
            <motion.div key={customer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center text-sm font-bold text-white">
                    {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text">{customer.name}</h3>
                    <p className="text-xs text-text-tertiary">{customer.email}</p>
                  </div>
                </div>
                <Badge variant={customer.status === "vip" ? "success" : customer.status === "active" ? "info" : "neutral"}>{customer.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div><div className="text-xs text-text-tertiary">Orders</div><div className="text-sm font-semibold text-text mt-0.5">{customer.orders}</div></div>
                <div><div className="text-xs text-text-tertiary">Spent</div><div className="text-sm font-semibold text-text mt-0.5">{formatCurrency(customer.spent)}</div></div>
                <div><div className="text-xs text-text-tertiary">Joined</div><div className="text-sm font-semibold text-text mt-0.5">{formatDate(customer.joined)}</div></div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
