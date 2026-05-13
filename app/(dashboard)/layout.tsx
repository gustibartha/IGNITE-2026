import { Sidebar } from "@/components/layout/sidebar";
import { Zap } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#fcfdfe]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-8 py-8 md:px-12">
        <div className="max-w-7xl mx-auto relative">
          {/* Background Decorative Elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -left-24 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
          
          {children}
        </div>
      </main>
    </div>
  );
}
