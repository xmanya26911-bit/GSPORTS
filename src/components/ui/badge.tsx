import { cn } from "@/lib/utils";

export function Badge({ variant = "neutral", children }: { variant?: "success" | "warning" | "danger" | "info" | "neutral"; children: React.ReactNode }) {
  return <span className={cn("badge", `badge-${variant}`)}>{children}</span>;
}
