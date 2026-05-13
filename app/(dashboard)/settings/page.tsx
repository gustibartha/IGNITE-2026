"use client";

import { useState } from "react";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Lock,
  ChevronRight,
  Save,
  Moon,
  Sun,
  Monitor,
  Key,
  Smartphone,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Tab = "Profile" | "Notifications" | "Security" | "Appearance";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Settings</h1>
        <p className="text-slate-500 font-medium">Kelola profil, keamanan, dan preferensi sistem IGNITE Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: "Profile", name: "Profile", icon: User },
            { id: "Notifications", name: "Notifications", icon: Bell },
            { id: "Security", name: "Security", icon: Shield },
            { id: "Appearance", name: "Appearance", icon: Palette },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold ${
                activeTab === item.id 
                ? "bg-white text-indigo-600 shadow-xl shadow-indigo-100/50 ring-1 ring-slate-200" 
                : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                {item.name}
              </div>
              <ChevronRight className={`h-4 w-4 transition-all ${activeTab === item.id ? "opacity-100 translate-x-1" : "opacity-0"}`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          {activeTab === "Profile" && (
            <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
              <CardHeader className="p-10 pb-4">
                <CardTitle className="text-2xl font-black text-slate-900">User Profile</CardTitle>
                <CardDescription>Informasi personal dan identitas kerja Anda.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 pt-4 space-y-10">
                <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-3xl bg-slate-50/50 border border-slate-100">
                  <div className="h-28 w-28 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center border-4 border-white shadow-2xl relative group cursor-pointer">
                    <User className="h-12 w-12 text-white" />
                    <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                       <Plus className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Admin Ignite</h3>
                      <p className="text-sm font-medium text-slate-500">Super Admin • UP Muara Karang</p>
                    </div>
                    <div className="flex gap-3">
                      <Button className="rounded-xl font-bold bg-indigo-600 shadow-lg shadow-indigo-100">Upload Foto</Button>
                      <Button variant="outline" className="rounded-xl font-bold">Hapus</Button>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-bold ml-1">Nama Lengkap</Label>
                    <Input defaultValue="Admin Ignite" className="h-14 rounded-2xl bg-white border-slate-200 focus:ring-indigo-500/20" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-bold ml-1">Email Korporat</Label>
                    <Input defaultValue="admin@upmuarakarang.com" className="h-14 rounded-2xl bg-white border-slate-200 focus:ring-indigo-500/20" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-bold ml-1">NID (Nomor Induk)</Label>
                    <Input defaultValue="8812345" className="h-14 rounded-2xl bg-white border-slate-200 focus:ring-indigo-500/20" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-bold ml-1">Bidang / Unit</Label>
                    <Input defaultValue="SENIOR MANAGER UNIT" disabled className="h-14 rounded-2xl bg-slate-50 border-slate-100 text-slate-400 font-bold" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "Notifications" && (
            <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
              <CardHeader className="p-10 pb-4">
                <CardTitle className="text-2xl font-black text-slate-900">Notification Settings</CardTitle>
                <CardDescription>Pilih bagaimana Anda ingin menerima update dari platform.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 pt-4 space-y-6">
                {[
                  { title: "Email Notifications", desc: "Terima ringkasan mingguan ide inovasi baru.", default: true },
                  { title: "Status Updates", desc: "Notifikasi saat status ide Anda berubah (Approved/Revision).", default: true },
                  { title: "New Comments", desc: "Beritahu saya jika ada diskusi di ide saya.", default: false },
                  { title: "System Alerts", desc: "Informasi terkait maintenance dan update sistem.", default: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 transition-all">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.default} />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === "Security" && (
            <div className="space-y-8">
              <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-4">
                  <CardTitle className="text-2xl font-black text-slate-900">Password & Authentication</CardTitle>
                  <CardDescription>Amankan akun Anda dengan password yang kuat.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-4 space-y-8">
                   <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-slate-700 font-bold ml-1">Password Saat Ini</Label>
                        <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-slate-50 border-slate-100" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-slate-700 font-bold ml-1">Password Baru</Label>
                          <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-slate-50 border-slate-100" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-slate-700 font-bold ml-1">Konfirmasi Password Baru</Label>
                          <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-slate-50 border-slate-100" />
                        </div>
                      </div>
                      <Button className="rounded-xl font-bold bg-indigo-600">Update Password</Button>
                   </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
                <CardContent className="p-10 space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center">
                         <Smartphone className="h-6 w-6 text-rose-600" />
                      </div>
                      <div className="flex-1">
                         <p className="font-bold text-slate-900">Two-Factor Authentication (2FA)</p>
                         <p className="text-xs text-slate-500 font-medium">Tambahkan lapisan keamanan ekstra pada akun Anda.</p>
                      </div>
                      <Button variant="outline" className="rounded-xl font-bold text-rose-600 border-rose-100 hover:bg-rose-50">Aktifkan 2FA</Button>
                   </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "Appearance" && (
            <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
              <CardHeader className="p-10 pb-4">
                <CardTitle className="text-2xl font-black text-slate-900">Appearance</CardTitle>
                <CardDescription>Sesuaikan tampilan dashboard sesuai kenyamanan Anda.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 pt-4 space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { id: "light", name: "Light Mode", icon: Sun, color: "orange" },
                      { id: "dark", name: "Dark Mode", icon: Moon, color: "indigo" },
                      { id: "system", name: "System", icon: Monitor, color: "slate" },
                    ].map((mode) => (
                      <div 
                        key={mode.id}
                        className="p-6 rounded-[2rem] border-2 border-slate-50 bg-slate-50/50 flex flex-col items-center gap-4 hover:border-indigo-500 hover:bg-white transition-all cursor-pointer group"
                      >
                         <div className={`h-16 w-16 rounded-[1.5rem] bg-${mode.color}-50 flex items-center justify-center transition-all group-hover:scale-110`}>
                            <mode.icon className={`h-8 w-8 text-${mode.color}-600`} />
                         </div>
                         <span className="font-black text-slate-700 text-sm">{mode.name}</span>
                      </div>
                    ))}
                 </div>
                 
                 <div className="space-y-6 pt-6">
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-indigo-50/30 border border-indigo-100">
                       <div className="space-y-1">
                          <p className="font-bold text-indigo-900">Compact Mode</p>
                          <p className="text-xs text-indigo-600/70 font-medium">Kurangi spasi antar elemen untuk menampilkan lebih banyak data.</p>
                       </div>
                       <Switch />
                    </div>
                 </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" className="rounded-2xl font-bold h-14 px-10 text-slate-400">Cancel</Button>
            <Button className="rounded-2xl font-black h-14 px-12 bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
              <Save className="mr-3 h-5 w-5" /> SIMPAN PERUBAHAN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
