"use client";

import { Search, Bell, UserCircle, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Board", href: "/board" },
  { name: "Dashboard", href: "/" },
  { name: "Submissions", href: "/submissions" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b bg-white/80 px-8 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <div className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "text-sm font-bold transition-all relative py-1",
                  isActive ? "text-slate-950" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
        
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input 
            placeholder="Search ideas..." 
            className="pl-10 h-10 bg-slate-100/80 border-none focus-visible:ring-indigo-500/20 rounded-xl font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Link href="/submit">
          <Button className="h-10 px-6 bg-slate-950 text-white font-bold hover:bg-slate-800 rounded-xl transition-all shadow-lg shadow-slate-900/10">
            Submit Idea
          </Button>
        </Link>
        <div className="h-8 w-px bg-slate-200 mx-1" />
        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-900 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal-500 border-2 border-white" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 ring-1 ring-slate-100 p-0.5">
          <div className="h-full w-full rounded-full bg-slate-200 overflow-hidden">
            <UserCircle className="h-full w-full text-slate-400" />
          </div>
        </Button>
      </div>
    </header>
  );
}
