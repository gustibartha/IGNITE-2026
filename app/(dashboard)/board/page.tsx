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
      <div className="relative overflow-hidden rounded-[3rem] bg-indigo-900 p-12 text-white shadow-2xl shadow-indigo-500/20 group">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-400 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-500/30 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
               <Zap className="h-5 w-5 text-teal-400 fill-teal-400" />
               <span className="text-xs font-black uppercase tracking-[0.4em] text-teal-400">Innovation Hub</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-[1.1]">
              Idea <span className="text-teal-400 text-glow">Gallery</span>
            </h1>
            <p className="text-indigo-200 font-medium text-lg max-w-lg">
              Wadah eksplorasi kreativitas dan solusi inovatif untuk UP Muara Karang yang lebih tangguh.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
             <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input 
                  placeholder="Cari ide inovasi..." 
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all"
                />
             </div>
             <Link href="/submit">
               <Button size="lg" className="bg-teal-400 hover:bg-white hover:text-slate-900 text-slate-950 font-black rounded-2xl gap-3 h-14 px-8 shadow-2xl shadow-teal-500/20 transition-all hover:scale-105 active:scale-95 group/btn">
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
            <Card key={idea.id} className="border-none shadow-2xl shadow-slate-200/50 hover:shadow-indigo-500/10 transition-all duration-500 rounded-[3rem] group overflow-hidden bg-white/80 backdrop-blur-xl border border-white">
              <CardHeader className="p-10 pb-0">
                <div className="flex items-center justify-between mb-6">
                  <Badge className={cn(
                    "rounded-xl px-4 py-1.5 font-black text-[10px] uppercase tracking-widest border-none shadow-sm",
                    idea.status === "Submitted" ? "bg-indigo-600 text-white" :
                    idea.status === "Review" ? "bg-amber-500 text-white" :
                    idea.status === "Approved" ? "bg-emerald-500 text-white" :
                    "bg-slate-500 text-white"
                  )}>
                    {idea.status}
                  </Badge>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {new Date(idea.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {idea.judul}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                   <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-none text-[9px] font-black uppercase tracking-widest px-2.5 py-1">{idea.bidang}</Badge>
                   {idea.subBidang && (
                     <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none text-[9px] font-black uppercase tracking-widest px-2.5 py-1">{idea.subBidang}</Badge>
                   )}
                   <Badge variant="secondary" className="bg-teal-50 text-teal-700 border-none text-[9px] font-black uppercase tracking-widest px-2.5 py-1">{idea.kategoriInovasi}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <p className="text-slate-500 text-base font-medium line-clamp-3 leading-relaxed">
                  {idea.latarBelakang}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                        {idea.nama ? idea.nama.charAt(0) : "U"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Inovator</span>
                        <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{idea.nama || idea.nid}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-300" />
                      <span className="text-xs font-black text-slate-400">{idea.jumlahAnggota}</span>
                   </div>
                </div>

                <div className="pt-2">
                   <Link href={`/board/${idea.id}`}>
                     <Button className="w-full h-14 rounded-2xl bg-slate-50 hover:bg-indigo-600 text-slate-900 hover:text-white font-black transition-all gap-2 group/btn border border-slate-100 hover:border-indigo-600 shadow-sm">
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
