import { db } from "@/lib/db";
import { ideas } from "@/lib/db/schema";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search,
  Filter,
  Users,
  Layers,
  Wallet,
  ArrowRight,
  Clock,
  Zap,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function BoardPage() {
  const dbIdeas = await db.query.ideas.findMany({
    orderBy: (ideas, { desc }) => [desc(ideas.createdAt)],
  });

  return (
    <div className="h-full flex flex-col space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[3rem] bg-indigo-900 p-5 md:p-12 text-white shadow-2xl shadow-indigo-500/20 group">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-48 h-48 md:w-96 md:h-96 bg-teal-400 rounded-full blur-[60px] md:blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-500/30 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
               <Zap className="h-5 w-5 text-teal-400 fill-teal-400" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">Innovation Hub</span>
            </div>
            <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-[1.1]">
              Idea <span className="text-teal-400 text-glow">Gallery</span>
            </h1>
            <p className="text-indigo-200 font-medium text-sm md:text-lg max-w-lg">
              Wadah kreativitas inovatif UP Muara Karang.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
             <div className="relative w-full sm:w-72">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input 
                  placeholder="Cari ide..." 
                  className="w-full h-12 md:h-14 pl-12 pr-4 rounded-xl md:rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all text-xs md:text-base"
                />
             </div>
             <Link href="/submit" className="w-full sm:w-auto">
               <Button size="lg" className="w-full sm:w-auto bg-teal-400 hover:bg-white hover:text-slate-900 text-slate-950 font-black rounded-xl md:rounded-2xl gap-3 h-12 md:h-14 px-8 shadow-2xl shadow-teal-500/20 transition-all hover:scale-105 active:scale-95 group/btn text-xs md:text-sm">
                 <Plus className="h-5 w-5" /> Kirim Ide Baru
               </Button>
             </Link>
          </div>
        </div>
      </div>

      {dbIdeas.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-32 border-4 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/30">
           <div className="h-24 w-24 bg-white rounded-3xl shadow-xl shadow-slate-200 flex items-center justify-center mb-8 animate-bounce duration-3000">
              <Lightbulb className="h-12 w-12 text-amber-400" />
           </div>
           <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Gudang Ide Masih Kosong</h3>
           <p className="text-slate-400 font-bold mt-2">Jadilah pionir inovasi pertama di unit Anda!</p>
           <Link href="/submit" className="mt-10">
             <Button className="bg-indigo-600 text-white rounded-2xl h-14 px-12 font-black shadow-2xl shadow-indigo-200 hover:scale-105 transition-all">MULAI BERINOVASI</Button>
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {dbIdeas.map((idea) => (
            <Card key={idea.id} className="border-none shadow-2xl shadow-slate-200/50 hover:shadow-indigo-500/10 transition-all duration-500 rounded-[1.5rem] md:rounded-[3rem] group overflow-hidden bg-white/80 backdrop-blur-xl border border-white">
              <CardHeader className="p-5 md:p-10 pb-0">
                <div className="flex items-center justify-between mb-6">
                  <Badge className={cn(
                    "rounded-xl px-4 py-1.5 font-black text-[9px] md:text-[10px] uppercase tracking-widest border-none shadow-sm",
                    idea.status === "Submitted" ? "bg-indigo-600 text-white" :
                    idea.status === "Review" ? "bg-amber-500 text-white" :
                    idea.status === "Approved" ? "bg-emerald-500 text-white" :
                    "bg-slate-500 text-white"
                  )}>
                    {idea.status}
                  </Badge>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                      {new Date(idea.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-lg md:text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {idea.judul}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                   <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-none text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 md:px-2.5 md:py-1">{idea.bidang}</Badge>
                   <Badge variant="secondary" className="bg-teal-50 text-teal-700 border-none text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 md:px-2.5 md:py-1">{idea.kategoriInovasi}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 md:p-10 space-y-6 md:space-y-8">
                <p className="text-slate-500 text-xs md:text-base font-medium line-clamp-3 leading-relaxed">
                  {idea.latarBelakang}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-[9px] md:text-xs">
                        {idea.nama ? idea.nama.charAt(0) : "U"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Inovator</span>
                        <span className="text-[9px] md:text-xs font-bold text-slate-900 truncate max-w-[80px] md:max-w-[120px]">{idea.nama || idea.nid}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 md:h-4 md:w-4 text-slate-300" />
                      <span className="text-[10px] md:text-xs font-black text-slate-400">{idea.jumlahAnggota}</span>
                   </div>
                </div>

                <div className="pt-2">
                   <Link href={`/board/${idea.id}`}>
                     <Button className="w-full h-11 md:h-14 rounded-xl md:rounded-2xl bg-slate-50 hover:bg-indigo-600 text-slate-900 hover:text-white font-black transition-all gap-2 group/btn border border-slate-100 hover:border-indigo-600 shadow-sm text-xs md:text-base">
                        LIHAT DETAIL 
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                     </Button>
                   </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
