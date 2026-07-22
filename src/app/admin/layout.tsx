import type { Metadata } from "next";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";

export const metadata: Metadata = {
  title: "Golden Willowe Admin — Brand Management Platform",
  description: "Admin panel for Golden Willowe Sports",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
