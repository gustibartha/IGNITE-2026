import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  User, 
  ArrowRight, 
  ChevronDown, 
  Filter, 
  MessageSquare,
  Search,
  LayoutGrid,
  List as ListIcon,
  Lightbulb,
  Zap,
  Users,
  Clock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { desc } from "drizzle-orm";
import { ideas } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

export default async function SubmissionsPage() {
  const dbSubmissions = await db.query.ideas.findMany({
    orderBy: [desc(ideas.createdAt)],
  });

  const categories = ["All Ideas", "Pembangkitan", "EBT", "Aplikasi", "Proses Bisnis"];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">Innovation Gallery</h1>
          <p className="text-slate-500 font-medium text-lg">Explore and collaborate on all submitted ideas for IGNITE 2026.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
            <LayoutGrid className="h-4 w-4 text-indigo-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl text-slate-400">
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hero Banner with Pembangkit Background */}
      <section className="relative h-64 w-full overflow-hidden rounded-[2.5rem] ignite-gradient shadow-2xl shadow-indigo-500/20">
        <Image
          src="/pembangkit-bg.png"
          alt="Power Plant"
          fill
          className="object-cover opacity-60 mix-blend-overlay scale-105 hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-center px-12 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-teal-400" fill="currentColor" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-teal-400">UP Muara Karang</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-2">Pusat Inovasi Energi 2026</h2>
          <p className="text-slate-300 font-medium max-w-md">
            Wadah kolaborasi insan pembangkitan untuk menciptakan masa depan energi yang lebih cerdas dan efisien.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row items-center gap-6 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300" />
          <input 
            placeholder="Search by title, author, or keyword..." 
            className="w-full h-12 pl-12 border-none bg-transparent focus-visible:outline-none text-base font-medium text-slate-900 placeholder:text-slate-300"
          />
        </div>
        <div className="h-8 w-px bg-slate-100 hidden lg:block" />
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          {categories.map((cat, i) => (
            <Button 
              key={cat}
              variant="ghost"
              className={cn(
                "rounded-xl px-5 font-bold text-sm h-10 transition-all",
                i === 0 ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
        <Button variant="outline" className="h-10 px-4 gap-2 rounded-xl border-slate-200 font-bold ml-auto">
          <Filter className="h-4 w-4" /> More Filters
        </Button>
      </div>

      {/* List Content */}
      <div className="space-y-6">
        {dbSubmissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-4 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/30">
             <div className="h-20 w-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <Lightbulb className="h-10 w-10 text-slate-200" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">No ideas yet</h3>
             <p className="text-slate-400 font-bold mt-2">Be the first to share your innovation for IGNITE 2026!</p>
             <Link href="/submit" className="mt-8">
               <Button className="bg-indigo-600 text-white font-bold h-12 px-10 rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.05] transition-all">Submit Now</Button>
             </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {dbSubmissions.map((sub) => (
              <Card key={sub.id} className="border-none shadow-xl shadow-slate-100 rounded-[2.5rem] overflow-hidden bg-white group hover:shadow-2xl transition-all border border-slate-50">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-72 bg-slate-950 p-8 flex flex-col justify-between text-white relative overflow-hidden shrink-0">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                     <div className="relative z-10">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-2">
                         IGNITE 2026
                       </p>
                       <h4 className="text-xl font-black leading-tight mb-4">{sub.judul}</h4>
                       <Badge className="bg-teal-400 hover:bg-teal-500 text-slate-950 text-[10px] font-black border-none uppercase px-4 py-1.5 rounded-full">
                         {sub.status}
                       </Badge>
                     </div>
                     <div className="relative z-10 mt-12 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 backdrop-blur-sm">
                           <Clock className="h-5 w-5" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Submitted On</p>
                           <p className="text-xs font-bold">{new Date(sub.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                     </div>
                  </div>
                  <div className="flex-1 p-10 flex flex-col justify-between">
                     <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                           <div className="space-y-2">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NID / Author</p>
                              <div className="flex items-center gap-2">
                                 <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center">
                                    <User className="h-3.5 w-3.5 text-slate-400" />
                                 </div>
                                 <p className="text-sm font-black text-slate-900">{sub.nid}</p>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bidang</p>
                              <p className="text-sm font-black text-slate-900">{sub.bidang}</p>
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tim</p>
                              <div className="flex items-center gap-2">
                                 <Users className="h-4 w-4 text-slate-400" />
                                 <p className="text-sm font-black text-slate-900">{sub.jumlahAnggota} Orang</p>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori</p>
                              <p className="text-sm font-black text-indigo-600">{sub.kategoriInovasi}</p>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Summary</p>
                           <p className="text-base text-slate-500 font-medium leading-relaxed line-clamp-2">
                             {sub.latarBelakang}
                           </p>
                        </div>
                     </div>
                     <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100">
                              <div className="h-2 w-2 rounded-full bg-indigo-500" />
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{sub.kategoriBidangInovasi}</span>
                           </div>
                           <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 border border-teal-100">
                              <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{sub.implementasi}</span>
                           </div>
                        </div>
                        <Link href={`/board/${sub.id}`}>
                           <Button variant="ghost" className="h-12 rounded-2xl text-slate-400 font-black text-xs gap-3 px-6 hover:bg-indigo-50 hover:text-indigo-600 transition-all group/btn">
                              VIEW FULL DETAILS <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                           </Button>
                        </Link>
                     </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
