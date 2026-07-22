
export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["glass-card rounded-2xl p-6", className || ""].filter(Boolean).join(" ")} {...props}>{children}</div>;
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={["flex items-center justify-between mb-5", className || ""].filter(Boolean).join(" ")}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={["text-base font-semibold text-text", className || ""].filter(Boolean).join(" ")}>{children}</h3>;
}
