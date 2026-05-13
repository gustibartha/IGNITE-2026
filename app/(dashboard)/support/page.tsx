"use client";

import { useState } from "react";
import { 
  HelpCircle, 
  MessageCircle, 
  BookOpen, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Search,
  Plus,
  Send,
  LifeBuoy,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    { q: "Bagaimana cara mengupload file ECP yang benar?", a: "Pastikan file dalam format PDF dengan ukuran maksimal 10MB. Anda bisa menguploadnya di bagian akhir formulir submission." },
    { q: "Berapa jumlah maksimal anggota tim dalam satu ide?", a: "Sesuai ketentuan IGNITE 2026, satu ide dapat diajukan oleh tim yang terdiri dari maksimal 3 orang." },
    { q: "Apakah saya bisa mengedit ide yang sudah dikirim?", a: "Ide yang sudah dikirim (status: Submitted) hanya bisa diedit jika dikembalikan oleh admin untuk revisi." },
    { q: "Kapan pengumuman hasil seleksi dilakukan?", a: "Hasil seleksi tahap awal akan diumumkan melalui dashboard ini dan email korporat pada bulan Juli 2026." }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col gap-2 text-center lg:text-left">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Support Center</h1>
        <p className="text-slate-500 font-medium">Butuh bantuan terkait platform IGNITE 2026? Kami siap membantu Anda.</p>
      </div>

      {/* Hero Search Section */}
      <div className="relative p-12 md:p-20 rounded-[3.5rem] bg-indigo-600 overflow-hidden shadow-2xl shadow-indigo-100">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        <div className="relative z-10 space-y-8 text-center max-w-3xl mx-auto">
          <div className="flex justify-center">
             <div className="h-16 w-16 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                <LifeBuoy className="h-8 w-8 text-white animate-spin-slow" />
             </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Halo, ada yang bisa kami bantu?</h2>
          <div className="relative group max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-indigo-400" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari panduan, FAQ, atau tutorial..." 
              className="h-18 pl-16 pr-6 rounded-[1.5rem] bg-white border-none shadow-2xl text-slate-900 placeholder:text-slate-400 text-lg font-medium focus:ring-4 focus:ring-white/20 transition-all"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
             {["Cara Submit", "Format ECP", "Kriteria Penilaian", "Reset Akun"].map(tag => (
               <span key={tag} className="px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/10 hover:bg-white hover:text-indigo-600 transition-all cursor-pointer backdrop-blur-md">
                 {tag}
               </span>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "Knowledge Base", 
            description: "Panduan lengkap pengoperasian dashboard dan kriteria inovasi.", 
            icon: BookOpen, 
            color: "indigo" 
          },
          { 
            title: "Live Support", 
            description: "Bicara langsung dengan IT Support Muara Karang (Jam Kerja).", 
            icon: MessageCircle, 
            color: "teal" 
          },
          { 
            title: "Ticket System", 
            description: "Ajukan kendala teknis mendalam dan pantau statusnya.", 
            icon: FileText, 
            color: "rose" 
          },
        ].map((item) => (
          <Card key={item.title} className="border-none shadow-xl shadow-slate-100 rounded-[3rem] hover:translate-y-[-8px] transition-all cursor-pointer group bg-white">
            <CardContent className="p-10 space-y-6">
              <div className={`h-16 w-16 rounded-2xl bg-${item.color}-50 flex items-center justify-center transition-all group-hover:rotate-12`}>
                <item.icon className={`h-8 w-8 text-${item.color}-600`} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.description}</p>
              </div>
              <div className="pt-2 flex items-center text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-indigo-600 transition-colors">
                Open Channel <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Interactive FAQ Area */}
        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[3.5rem] bg-white overflow-hidden">
          <CardHeader className="p-12 pb-0">
            <div className="flex items-center justify-between mb-2">
               <CardTitle className="text-3xl font-black text-slate-900">FAQ Terpopuler</CardTitle>
               <Button variant="ghost" className="text-indigo-600 font-bold rounded-xl hover:bg-indigo-50">Lihat Semua</Button>
            </div>
            <CardDescription className="text-base font-medium">Jawaban cepat untuk pertanyaan yang paling sering diajukan.</CardDescription>
          </CardHeader>
          <CardContent className="p-12 pt-8 space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group p-6 rounded-3xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-slate-800 list-none">
                  <span className="pr-6">{faq.q}</span>
                  <Plus className="h-5 w-5 text-slate-300 group-open:rotate-45 transition-transform" />
                </summary>
                <div className="pt-4 text-sm text-slate-500 leading-relaxed font-medium">
                  {faq.a}
                </div>
              </details>
            ))}
          </CardContent>
        </Card>

        {/* Contact & Ticket Form Area */}
        <div className="space-y-8">
          <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[3.5rem] bg-slate-900 overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full transition-all group-hover:bg-indigo-500/20" />
             <CardContent className="p-12 space-y-8 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-white leading-tight">Hubungi Kami Langsung</h3>
                  <p className="text-slate-400 font-medium">Punya kendala mendesak? Tim support kami siap melayani.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-3">
                      <Mail className="h-6 w-6 text-teal-400" />
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Support</p>
                         <p className="font-bold text-white text-sm">support.mk@pln.co.id</p>
                      </div>
                   </div>
                   <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-3">
                      <HelpCircle className="h-6 w-6 text-indigo-400" />
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Internal Ext.</p>
                         <p className="font-bold text-white text-sm">Ext. 2405 (Divisi IT)</p>
                      </div>
                   </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full h-16 bg-teal-400 hover:bg-white text-slate-950 font-black rounded-2xl transition-all shadow-xl shadow-teal-500/20 group">
                    KIRIM PESAN SEKARANG
                    <Send className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
             </CardContent>
          </Card>

          <div className="p-8 rounded-[3rem] border-2 border-dashed border-slate-100 bg-slate-50/50 flex items-center justify-between px-12">
             <div className="space-y-1">
                <p className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Office Hours</p>
                <p className="text-sm font-bold text-slate-500">Senin - Jumat • 08:00 - 16:30 WIB</p>
             </div>
             <div className="h-3 w-3 rounded-full bg-teal-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
