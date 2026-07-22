"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Store, Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@goldenwillowe.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-bg">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-text">Golden Willowe</h1>
                <p className="text-xs text-text-tertiary">Admin Portal</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-text mb-1">Welcome back</h2>
            <p className="text-sm text-text-tertiary">Sign in to manage your sports empire</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@goldenwillowe.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-border bg-bg accent-accent" />
                <span className="text-xs text-text-tertiary">Remember me</span>
              </label>
              <button type="button" className="text-xs text-accent hover:text-accent-light transition-colors">Forgot password?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-[11px] text-text-tertiary">
              Demo: admin@goldenwillowe.com / admin123
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-accent/5 via-transparent to-accent/5">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-purple/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 flex items-center justify-center p-16 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-10 max-w-md w-full border border-white/5"
          >
            <h3 className="text-xl font-bold text-text mb-4">Enterprise Sports Platform</h3>
            <div className="space-y-3">
              {[
                "AI-powered product generation",
                "Real-time inventory management",
                "Advanced analytics dashboard",
                "Multi-language support",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {feature}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple border-2 border-bg flex items-center justify-center text-[10px] font-bold text-white">
                    {["R", "P", "A", "N"][i - 1]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-tertiary mt-2">Trusted by sports retailers across India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
