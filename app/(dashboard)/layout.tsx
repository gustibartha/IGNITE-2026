"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fcfdfe]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar Content */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white lg:hidden transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
                   <Zap className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <span className="font-bold text-slate-900">IGNITE 2026</span>
             </div>
             <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5 text-slate-500" />
             </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 sticky top-0 z-40">
           <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
                 <Zap className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <span className="font-bold text-slate-900">IGNITE</span>
           </div>
           <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-slate-600" />
           </Button>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-12 md:py-8 lg:px-16">
          <div className="max-w-7xl mx-auto relative">
            {/* Background Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 md:w-96 md:h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -left-24 w-32 h-32 md:w-64 md:h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
