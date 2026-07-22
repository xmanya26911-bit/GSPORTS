"use client";
import { motion } from "framer-motion";

interface ButtonProps {
  variant?: "primary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({ variant = "primary", size = "md", loading, className, children, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-lg hover:shadow-accent/20",
    ghost: "bg-transparent border border-border text-text-secondary hover:bg-bg-hover hover:text-text",
    danger: "bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20",
    success: "bg-success/10 text-success border border-success/20 hover:bg-success/20",
  };
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      disabled={loading || props.disabled}
      onClick={props.onClick}
      type={props.type || "button"}
      className={["inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200", variants[variant], sizes[size], (loading || props.disabled) ? "opacity-60" : "", className].filter(Boolean).join(" ")}
    >
      {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
      {children}
    </motion.button>
  );
}
