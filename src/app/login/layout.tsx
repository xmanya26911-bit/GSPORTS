import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login — Golden Willowe Sports",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
