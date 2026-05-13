"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Lightbulb, 
  BarChart2, 
  Calendar, 
  FileText,
  Settings,
  HelpCircle,
  Plus,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Idea Board", href: "/board", icon: Lightbulb },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Support", href: "/support", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-[#f8fafc] border-r border-slate-200">
      <div className="flex h-20 items-center gap-3 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-lg shadow-slate-900/20">
          <Zap className="h-6 w-6 text-white" fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-slate-900 leading-none">IGNITE 2026</span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">UP Muara Karang</span>
        </div>
      </div>

      <div className="px-4 py-4">
        <Link href="/submit">
          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold h-11 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Plus className="mr-2 h-4 w-4" /> New Submission
          </Button>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "bg-white text-indigo-600 shadow-sm shadow-indigo-100 ring-1 ring-slate-200" 
                  : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 transition-colors",
                  isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              {item.name}
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 px-3 py-6 space-y-1">
        {secondaryNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100/50 hover:text-slate-900 transition-all"
          >
            <item.icon className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-600" />
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
