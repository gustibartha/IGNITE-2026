"use client";

import Image from "next/image";
import { Mail, Lock, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { login } from "@/lib/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const result = await login(email);
      
      if (result.success) {
        toast.success("Login Berhasil", {
          description: "Selamat datang kembali di Dashboard IGNITE.",
        });
        router.push("/");
      } else {
        toast.error("Login Gagal", {
          description: result.error,
        });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pembangkit-bg.png"
          alt="Power Plant Background"
          fill
          className="object-cover opacity-60 scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-slate-950/70 to-teal-900/40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Side: Massive Branding */}
        <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
             <Zap className="h-4 w-4 text-teal-400 fill-teal-400" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">UP Muara Karang</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white leading-none">
              IGNITE<span className="text-teal-400">.</span>
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-slate-300 max-w-xl leading-snug">
              Pusat Inovasi Energi Terintegrasi & Transformasi <span className="text-teal-400 font-bold">Masa Depan</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-10 pt-8 opacity-60">
             <div className="space-y-1">
                <p className="text-3xl font-black text-white">500+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ide Terkumpul</p>
             </div>
             <div className="h-8 w-[1px] bg-white/10" />
             <div className="space-y-1">
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kolaborasi Digital</p>
             </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full max-w-md animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
          <Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-8 rounded-[2.5rem]">
            <CardContent className="space-y-8 p-0">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white">Login Workspace</h2>
                <p className="text-slate-400 text-sm font-medium">Masuk untuk mengelola ide inovasi Anda.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">NID / Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-teal-400" />
                    <Input 
                      required
                      name="email"
                      type="email"
                      defaultValue="admin@upmuarakarang.com"
                      placeholder="Masukkan NID atau Email" 
                      className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-teal-400/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</Label>
                    <a href="#" className="text-[10px] font-bold text-teal-400 hover:text-teal-300 transition-colors">Lupa Password?</a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-teal-400" />
                    <Input 
                      required
                      type="password" 
                      defaultValue="admin123"
                      placeholder="••••••••" 
                      className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-teal-400/20 transition-all"
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="h-14 w-full bg-teal-400 hover:bg-white text-slate-950 font-black rounded-2xl transition-all duration-500 group shadow-xl shadow-teal-500/20"
                >
                  {isLoading ? "PROSES MASUK..." : (
                    <>
                      MASUK KE DASHBOARD
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>

              <div className="pt-4 text-center">
                <p className="text-xs text-slate-500 font-medium">
                  Belum punya akses? <a href="#" className="text-white font-bold hover:underline">Hubungi Administrator</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
