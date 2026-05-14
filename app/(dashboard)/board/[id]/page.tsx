import { db } from "@/lib/db";
import { ideas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { 
  Badge 
} from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Users, 
  Layers, 
  Calendar,
  CheckCircle2,
  FileText,
  Clock,
  Building,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function IdeaDetailPage({ params }: { params: { id: string } }) {
  const idea = await db.query.ideas.findFirst({
    where: eq(ideas.id, params.id),
  });

  if (!idea) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 px-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link href="/board">
          <Button variant="ghost" className="rounded-xl md:rounded-2xl gap-2 font-bold text-slate-500 hover:text-indigo-600 p-0 sm:px-4">
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Button>
        </Link>
        <Badge className={cn(
          "rounded-full px-4 py-1.5 font-bold text-xs uppercase tracking-widest border-none shadow-sm",
          idea.status === "Submitted" ? "bg-indigo-50 text-indigo-600" :
          idea.status === "Review" ? "bg-amber-50 text-amber-600" :
          idea.status === "Approved" ? "bg-emerald-50 text-emerald-600" :
          "bg-slate-50 text-slate-600"
        )}>
          {idea.status}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
           <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 rounded-lg px-2 py-0.5 text-[9px] md:text-[10px] font-black uppercase">{idea.bidang}</Badge>
           <Badge variant="secondary" className="bg-teal-100 text-teal-700 rounded-lg px-2 py-0.5 text-[9px] md:text-[10px] font-black uppercase">{idea.kategoriInovasi}</Badge>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[1.1]">
          {idea.judul}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-xs md:text-sm">Dikirim {new Date(idea.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-xs md:text-sm font-bold text-slate-600">{idea.nama}</span>
            <span className="text-[10px] md:text-xs">({idea.nid})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8 md:space-y-12">
          {/* Latar Belakang */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl md:rounded-2xl bg-indigo-50 flex items-center justify-center">
                <FileText className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Latar Belakang</h3>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem]">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                {idea.latarBelakang}
              </p>
            </div>
          </section>

          {/* Manfaat */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl md:rounded-2xl bg-amber-50 flex items-center justify-center">
                <Target className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Manfaat & Dampak</h3>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-amber-50/20 border-amber-100/50">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                {idea.manfaat}
              </p>
            </div>
          </section>

          {/* Peluang Diseminasi */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl md:rounded-2xl bg-teal-50 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-teal-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Peluang Diseminasi</h3>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem]">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                {idea.peluangDiseminasi}
              </p>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] space-y-6 lg:sticky lg:top-8">
            <h4 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-4">Info Inovasi</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Anggota Tim</p>
                  <p className="font-bold text-slate-700">{idea.jumlahAnggota} Orang</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Layers className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Kategori Bidang</p>
                  <p className="font-bold text-slate-700">{idea.kategoriBidangInovasi}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Implementasi</p>
                  <p className="font-bold text-slate-700">{idea.implementasi}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Building className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Bidang Unit</p>
                  <p className="font-bold text-slate-700 text-xs md:text-sm">{idea.bidang}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dokumen Pendukung</p>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                 <Button variant="outline" className="w-full justify-start rounded-xl border-slate-100 font-bold text-xs h-10 gap-2 hover:bg-slate-50 overflow-hidden">
                    <FileText className="h-3.5 w-3.5 text-rose-500" /> <span className="truncate">Analisa Resiko.pdf</span>
                 </Button>
                 <Button variant="outline" className="w-full justify-start rounded-xl border-slate-100 font-bold text-xs h-10 gap-2 hover:bg-slate-50 overflow-hidden">
                    <FileText className="h-3.5 w-3.5 text-blue-500" /> <span className="truncate">ECP Inovasi.pdf</span>
                 </Button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
