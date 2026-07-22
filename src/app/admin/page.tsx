"use client";

import { motion } from "framer-motion";
import { Package, IndianRupee, ShoppingCart, CheckCircle, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const cards = [
  { label: "Products Sold", value: "0", icon: Package, color: "text-accent", desc: "Total units sold across all orders" },
  { label: "Total Income", value: formatCurrency(0), icon: IndianRupee, color: "text-success", desc: "Revenue from all completed orders" },
  { label: "Total Products", value: "0", icon: ShoppingCart, color: "text-info", desc: "Products listed on your store" },
  { label: "New Orders", value: "0", icon: Clock, color: "text-warning", desc: "Pending orders to process" },
  { label: "Delivered Orders", value: "0", icon: CheckCircle, color: "text-success", desc: "Successfully completed orders" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-sm text-text-tertiary mt-0.5">Your store at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="kpi-card"
            >
              <div className={`w-10 h-10 rounded-xl bg-current/10 flex items-center justify-center ${card.color} mb-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-text mb-1">{card.value}</div>
              <div className="text-xs font-medium text-text-secondary">{card.label}</div>
              <div className="text-[10px] text-text-tertiary mt-1">{card.desc}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Welcome message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl border border-border p-8 text-center mt-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-xl font-bold text-text mb-2">Welcome to Golden Willowe Admin</h2>
        <p className="text-sm text-text-tertiary max-w-md mx-auto mb-6">
          Start by adding your products using the AI Product Generator. It creates descriptions, SEO fields, and publishes products instantly.
        </p>
        <a href="/admin/products/new" className="btn-primary">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3z" />
          </svg>
          Create Your First Product
        </a>
      </motion.div>
    </div>
  );
}
