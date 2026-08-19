import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Golden Willowe Admin — Brand Management Platform",
  description: "Admin panel for Golden Willowe Sports",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-[260px] transition-all duration-500">
        <TopNav />
        <main className="p-4 sm:p-6 pt-16 lg:pt-6">{children}</main>
      </div>
    </div>
  );
}