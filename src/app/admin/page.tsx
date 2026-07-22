"use client";

import { motion } from "framer-motion";
import { Package, IndianRupee, ShoppingCart, CheckCircle, Clock, Sparkles, TrendingUp, Eye, PlusCircle, Store, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const cards = [
  { label: "Products Sold", value: "0", icon: TrendingUp, color: "text-accent", desc: "Total units sold across all orders", bg: "from-accent/10 to-accent/5" },
  { label: "Total Income", value: formatCurrency(0), icon: IndianRupee, color: "text-success", desc: "Revenue from all completed orders", bg: "from-emerald/10 to-emerald/5" },
  { label: "Total Products", value: "0", icon: Package, color: "text-info", desc: "Products listed on your store", bg: "from-sky/10 to-sky/5" },
  { label: "New Orders", value: "0", icon: Clock, color: "text-warning", desc: "Pending orders to process", bg: "from-amber/10 to-amber/5" },
  { label: "Delivered Orders", value: "0", icon: CheckCircle, color: "text-success", desc: "Successfully completed orders", bg: "from-emerald/10 to-emerald/5" },
];

const quickActions = [
  { label: "Add New Product", href: "/admin/products/new", icon: PlusCircle, desc: "Create with AI generator" },
  { label: "View Products", href: "/admin/products", icon: Package, desc: "Manage your catalog" },
  { label: "View Orders", href: "/admin/orders", icon: ShoppingCart, desc: "Process new orders" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Dashboard</h1>
          <p className="text-sm text-text-tertiary mt-1">Your store at a glance</p>
        </div>
        <Link
          href="/admin/products/new"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-bg text-xs font-semibold hover:bg-accent-light transition-all duration-300"
        >
          <Sparkles className="w-4 h-4" />
          New Product
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-bg-alt/50 hover:border-accent/20 transition-all duration-500 p-5"
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${card.bg}`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div className="text-2xl font-bold text-text mb-1 font-mono tracking-tight">{card.value}</div>
                <div className="text-xs font-medium text-text-secondary">{card.label}</div>
                <div className="text-[10px] text-text-tertiary mt-1.5">{card.desc}</div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${card.bg} blur-xl`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider text-text-secondary">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-bg-alt/30 hover:border-accent/20 hover:bg-bg-alt/60 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text">{action.label}</div>
                  <div className="text-[11px] text-text-tertiary">{action.desc}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Welcome section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-accent/10 bg-gradient-to-br from-accent/[0.03] to-transparent p-8 text-center"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-xl font-bold text-text mb-2">Welcome to Golden Willowe Admin</h2>
          <p className="text-sm text-text-tertiary max-w-md mx-auto mb-6">
            Start by adding your products using the AI Product Generator. It creates descriptions, SEO fields, and publishes products instantly.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/admin/products/new" className="btn-primary">
              <Sparkles className="w-4 h-4" />
              Create Your First Product
            </Link>
            <Link href="/" target="_blank" className="btn-ghost text-xs">
              <Eye className="w-4 h-4" />
              View Store
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
