"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  FileText, 
  Send, 
  User, 
  Users, 
  ChevronRight, 
  Zap,
  Building,
  Layers,
  CheckCircle2,
  AlertCircle,
  Clock,
  Upload
} from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { createIdea } from "@/lib/actions/inovasi";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  nid: z.string().min(1, "NID wajib diisi"),
  nama: z.string().min(1, "Nama wajib diisi"),
  bidang: z.string().min(1, "Bidang wajib dipilih"),
  subBidang: z.string().min(1, "Sub Bidang wajib dipilih"),
  jumlahAnggota: z.string().min(1, "Jumlah anggota wajib dipilih"),
  kategoriBidangInovasi: z.string().min(1, "Kategori bidang inovasi wajib dipilih"),
  judul: z.string().min(5, "Judul minimal 5 karakter").max(200, "Judul terlalu panjang"),
  kategoriInovasi: z.string().min(1, "Kategori inovasi wajib dipilih"),
  latarBelakang: z.string().min(20, "Latar belakang minimal 20 karakter"),
  implementasi: z.string().min(1, "Status implementasi wajib dipilih"),
  manfaat: z.string().min(20, "Manfaat minimal 20 karakter"),
  peluangDiseminasi: z.string().min(10, "Peluang diseminasi minimal 10 karakter"),
});

const bidangSubMap: Record<string, string[]> = {
  "SENIOR MANAGER UNIT": [
    "SENIOR MANAGER UNIT",
    "FUNGSIONAL AHLI",
    "K3 & KEAMANAN",
    "LINGKUNGAN"
  ],
  "BUSINESS SUPPORT": [
    "MANAJER BUSINESS SUPPORT",
    "FUNGSIONAL BIDANG BUSINESS SUPPORT",
    "KEUANGAN",
    "PENGADAAN",
    "SDM, UMUM & CSR"
  ],
  "ENJINIRING & QA": [
    "MANAJER ENJINIRING & QA",
    "FUNGSIONAL BIDANG ENJINIRING & QA",
    "CONDITION BASED MAINTENANCE",
    "MAN MUTU, RESIKO, & KEPATUHAN",
    "SYSTEM OWNER"
  ],
  "OPERASI": [
    "MANAJER OPERASI",
    "FUNGSIONAL BIDANG OPERASI",
    "KIMIA & LABORATORIUM",
    "NIAGA & BAHAN BAKAR",
    "RENDAL OPERASI",
    "PRODUKSI PLTGU BLOK I (A,B,C,D)",
    "PRODUKSI PLTGU BLOK II (A,B,C,D)",
    "PRODUKSI PLTGU BLOK III (A,B,C,D)",
    "PRODUKSI PLTU 4-5 (A,B,C,D)"
  ],
  "PEMELIHARAAN": [
    "MANAJER PEMELIHARAAN",
    "FUNGSIONAL BIDANG PEMELIHARAAN",
    "INVENTORI & GUDANG",
    "OUTAGE MANAGEMENT",
    "RENDAL PEMELIHARAAN",
    "KONTROL & INSTRUMEN (PLTU & PLTGU)",
    "LISTRIK (PLTU & PLTGU)",
    "MESIN & SIPIL (PLTU & PLTGU)"
  ],
};

export default function SubmitIdeaPage() {
  const [isPending, setIsPending] = useState(false);
  const [files, setFiles] = useState<{
    resiko: File[];
    foto: File[];
    ecp: File[];
  }>({
    resiko: [],
    foto: [],
    ecp: [],
  });
  
  const resikoRef = useRef<HTMLInputElement>(null);
  const fotoRef = useRef<HTMLInputElement>(null);
  const ecpRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nid: "",
      nama: "",
      bidang: "",
      subBidang: "",
      jumlahAnggota: "",
      kategoriBidangInovasi: "",
      judul: "",
      kategoriInovasi: "",
      latarBelakang: "",
      implementasi: "",
      manfaat: "",
      peluangDiseminasi: "",
    },
  });

  const selectedBidang = form.watch("bidang");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resiko' | 'foto' | 'ecp') => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => ({
        ...prev,
        [type]: [...prev[type], ...newFiles].slice(0, 5) // Limit to 5
      }));
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      const formData = new FormData();
      
      // Append all form values
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append files
      if (files.resiko.length > 0) formData.append("resiko", files.resiko[0]);
      if (files.foto.length > 0) formData.append("foto", files.foto[0]);
      if (files.ecp.length > 0) formData.append("ecp", files.ecp[0]);

      const result = await createIdea(formData);

      if (result.success) {
        toast.success("Ide Berhasil Dikirim!", {
          description: "Inovasi Anda telah tercatat di sistem IGNITE 2026.",
        });
        router.push("/board");
      } else {
        toast.error("Gagal mengirim ide", { description: result.error });
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 px-3">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
        <div className="h-14 w-14 md:h-20 md:w-20 rounded-xl md:rounded-[2rem] bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200 shrink-0">
          <Zap className="h-6 w-6 md:h-10 md:w-10 text-white fill-white" />
        </div>
        <div>
          <h1 className="text-xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase">Submit Innovation</h1>
          <p className="text-slate-500 font-medium mt-1 text-xs md:text-base">
            Bagikan ide kreatif Anda untuk membantu UP Muara Karang.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Data Diri */}
          <div className="glass-card p-5 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 mb-2">
               <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <User className="h-4 w-4 text-indigo-600" />
               </div>
               <h3 className="text-base md:text-xl font-bold text-slate-900">Data Pengirim</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <FormField
                control={form.control}
                name="nid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">NID (Nomor Induk) <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan NID Anda" {...field} className="h-14 rounded-2xl bg-white/50 border-slate-200 focus:ring-indigo-500/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">Nama Lengkap <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nama Lengkap Anda" {...field} className="h-14 rounded-2xl bg-white/50 border-slate-200 focus:ring-indigo-500/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subBidang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">Sub Bidang <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedBidang}>
                      <FormControl>
                        <SelectTrigger className="h-14 rounded-2xl bg-white/50 border-slate-200">
                          <SelectValue placeholder={selectedBidang ? "Pilih Sub Bidang" : "Pilih Bidang terlebih dahulu"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-2xl min-w-[400px]">
                        {selectedBidang && bidangSubMap[selectedBidang]?.map((sub) => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="bidang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">Bidang <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-14 rounded-2xl bg-white/50 border-slate-200">
                          <SelectValue placeholder="Pilih Bidang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-2xl min-w-[280px]">
                        <SelectItem value="SENIOR MANAGER UNIT">SENIOR MANAGER UNIT</SelectItem>
                        <SelectItem value="BUSINESS SUPPORT">BUSINESS SUPPORT</SelectItem>
                        <SelectItem value="ENJINIRING & QA">ENJINIRING & QA</SelectItem>
                        <SelectItem value="OPERASI">OPERASI</SelectItem>
                        <SelectItem value="PEMELIHARAAN">PEMELIHARAAN</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jumlahAnggota"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-bold">Jumlah Anggota Tim <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-4 pt-2"
                      >
                        {["1", "2", "3"].map((val) => (
                          <FormItem key={val} className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={val} />
                            </FormControl>
                            <FormLabel className="font-bold text-slate-600">{val}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 2: Detail Inovasi */}
          <div className="glass-card p-5 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 mb-2">
               <div className="h-8 w-8 rounded-xl bg-teal-50 flex items-center justify-center">
                  <Layers className="h-4 w-4 text-teal-600" />
               </div>
               <h3 className="text-base md:text-xl font-bold text-slate-900">Detail Inovasi</h3>
            </div>

            <FormField
              control={form.control}
              name="kategoriBidangInovasi"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-slate-700 font-bold">Kategori Bidang Inovasi <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Inovasi" />
                        </FormControl>
                        <FormLabel className="font-medium">Inovasi</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Ide Kreatif Inovasi" />
                        </FormControl>
                        <FormLabel className="font-medium">Ide Kreatif Inovasi</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-bold">Judul Inovasi / Ide Kreatif <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul inovasi Anda" {...field} className="h-14 rounded-2xl bg-white/50 border-slate-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kategoriInovasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-bold">Kategori Inovasi <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-14 rounded-2xl bg-white/50 border-slate-200">
                        <SelectValue placeholder="Pilih Kategori Inovasi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-2xl min-w-[280px]">
                      <SelectItem value="Pembangkitan">Pembangkitan</SelectItem>
                      <SelectItem value="Technical Supporting">Technical Supporting</SelectItem>
                      <SelectItem value="Proses Bisnis Manajemen">Proses Bisnis Manajemen</SelectItem>
                      <SelectItem value="EBT">EBT</SelectItem>
                      <SelectItem value="Aplikasi">Aplikasi</SelectItem>
                      <SelectItem value="Breakthrough Idea">Breakthrough Idea</SelectItem>
                      <SelectItem value="Business Development">Business Development</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="latarBelakang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-bold">Latar Belakang <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Jelaskan masalah atau peluang yang melatarbelakangi ide ini" 
                      className="min-h-[150px] rounded-2xl bg-white/50 border-slate-200 resize-none p-5" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="implementasi"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-slate-700 font-bold">Implementasi <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {[
                        "Diatas 6 Bulan", 
                        "Dibawah 6 Bulan", 
                        "Belum Terimplementasi", 
                        "Tahap Pengajuan"
                      ].map((item) => (
                        <FormItem key={item} className="flex items-center space-x-3 space-y-0 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                          <FormControl>
                            <RadioGroupItem value={item} />
                          </FormControl>
                          <FormLabel className="font-medium text-slate-700">{item}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section 3: Analisis & Dampak */}
          <div className="glass-card p-5 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 mb-2">
               <div className="h-8 w-8 rounded-xl bg-amber-50 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" />
               </div>
               <h3 className="text-base md:text-xl font-bold text-slate-900">Manfaat & Dampak</h3>
            </div>

            <FormField
              control={form.control}
              name="manfaat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-bold">Manfaat Financial dan Non Financial <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Jelaskan potensi penghematan biaya atau peningkatan efisiensi" 
                      className="min-h-[120px] rounded-2xl bg-white/50 border-slate-200 resize-none p-5" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="peluangDiseminasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-bold">Peluang Diseminasi atau Penerapan di Unit Lain <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Apakah ide ini bisa diterapkan di pembangkit lain?" 
                      className="min-h-[120px] rounded-2xl bg-white/50 border-slate-200 resize-none p-5" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
               <div className="relative h-full">
                 <input 
                    type="file" 
                    id="resiko-upload"
                    className="hidden" 
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'resiko')}
                    multiple
                 />
                 <label 
                    htmlFor="resiko-upload"
                    className="p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center space-y-2 bg-slate-50/30 group hover:border-indigo-200 hover:bg-indigo-50/10 transition-all cursor-pointer h-full"
                 >
                    <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                       <Upload className="h-5 w-5 text-slate-400 group-hover:text-indigo-600" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 group-hover:text-indigo-600">Analisa Resiko</p>
                    <p className="text-[10px] text-slate-400">
                      {files.resiko.length > 0 ? `${files.resiko.length} files selected` : "Max 5 files (PDF)"}
                    </p>
                 </label>
               </div>

               <div className="relative h-full">
                 <input 
                    type="file" 
                    id="foto-upload"
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'foto')}
                    multiple
                 />
                 <label 
                    htmlFor="foto-upload"
                    className="p-6 rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center space-y-2 bg-slate-50/30 group hover:border-teal-200 hover:bg-teal-50/10 transition-all cursor-pointer h-full"
                 >
                    <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                       <Upload className="h-5 w-5 text-slate-400 group-hover:text-teal-600" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 group-hover:text-teal-600">Foto Inovasi</p>
                    <p className="text-[10px] text-slate-400">
                      {files.foto.length > 0 ? `${files.foto.length} files selected` : "Max 5 files (JPG, PNG)"}
                    </p>
                 </label>
               </div>

               <div className="relative h-full">
                 <input 
                    type="file" 
                    id="ecp-upload"
                    className="hidden" 
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'ecp')}
                 />
                 <label 
                    htmlFor="ecp-upload"
                    className="p-6 rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center space-y-2 bg-slate-50/30 group hover:border-rose-200 hover:bg-rose-50/10 transition-all cursor-pointer h-full"
                 >
                    <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                       <Upload className="h-5 w-5 text-slate-400 group-hover:text-rose-600" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 group-hover:text-rose-600 uppercase">Upload ECP</p>
                    <p className="text-[10px] text-slate-400">
                      {files.ecp.length > 0 ? files.ecp[0].name : "Jika Ada (PDF)"}
                    </p>
                 </label>
               </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="ghost" 
              className="h-12 md:h-14 px-8 rounded-xl md:rounded-2xl font-bold text-slate-500 hover:bg-slate-50"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
              className="h-12 md:h-14 px-10 rounded-xl md:rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
            >
              {isPending ? "Mengirim..." : (
                <>
                  <Send className="h-5 w-5" /> Kirim Ide Inovasi
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
