import { db } from "@/lib/db";
import { ideas } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Calendar, 
  User, 
  MapPin, 
  Clock,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function TimelinePage() {
  const dbIdeas = await db.query.ideas.findMany({
    orderBy: [desc(ideas.createdAt)],
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 animate-in fade-in duration-1000 pb-20 px-2">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900">Innovation Timeline</h1>
        <p className="text-slate-500 font-medium text-sm md:text-lg">Journey of ideas from concept to reality.</p>
      </div>

      <div className="relative">
        {/* Center Line */}
        <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-slate-200 -translate-x-1/2" />

        <div className="space-y-16">
          {dbIdeas.map((inv, index) => (
            <div key={inv.id} className={cn(
              "relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0",
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            )}>
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 h-4 w-4 rounded-full bg-indigo-600 border-4 border-white shadow-lg -translate-x-1/2 z-10" />

              {/* Date Label (Desktop) */}
              <div className={cn(
                "hidden md:block w-[45%] text-slate-400 font-black uppercase tracking-widest text-sm",
                index % 2 === 0 ? "text-left" : "text-right"
              )}>
                {new Date(inv.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>

              {/* Content Card */}
              <div className="w-full md:w-[45%] pl-10 md:pl-0">
                <div className="group bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100 transition-all hover:scale-[1.02] hover:shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-indigo-50 text-indigo-600 border-none font-black text-[10px] px-3 py-1">
                      {inv.status}
                    </Badge>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                       IGNITE 2026
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {inv.judul}
                  </h3>

                  <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 mb-6">
                    {inv.latarBelakang}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                       <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center">
                          <User className="h-3.5 w-3.5 text-slate-500" />
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Author</span>
                         <span className="text-xs font-bold text-slate-700">{inv.nama} ({inv.nid})</span>
                       </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href={`/board/${inv.id}`}>
                      <button className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                         Read Full Idea <ChevronRight className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {dbIdeas.length === 0 && (
            <div className="py-20 text-center space-y-6">
               <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto">
                 <Calendar className="h-10 w-10 text-slate-200" />
               </div>
               <p className="text-slate-400 font-black text-xl tracking-tighter uppercase">No innovations recorded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
