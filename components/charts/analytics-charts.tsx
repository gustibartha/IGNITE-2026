"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";

const COLORS = ["#0f172a", "#3b82f6", "#14b8a6", "#6366f1", "#f59e0b", "#ec4899"];

export function BidangChart({ data }: { data: any[] }) {
  return (
    <Card className="border-none shadow-xl shadow-slate-100 rounded-3xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Distribution by Bidang</CardTitle>
        <CardDescription>Number of innovations submitted per department.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="bidang" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
            <Bar dataKey="count" fill="#0f172a" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CategoryChart({ data }: { data: any[] }) {
  return (
    <Card className="border-none shadow-xl shadow-slate-100 rounded-3xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Innovation Categories</CardTitle>
        <CardDescription>Breakdown by technical categories.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="count"
              nameKey="kategori"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
           {data.map((item, index) => (
             <div key={item.kategori} className="flex items-center gap-2">
               <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.kategori}</span>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatusChart({ data }: { data: any[] }) {
  return (
    <Card className="border-none shadow-xl shadow-slate-100 rounded-3xl overflow-hidden lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold">Status Pipeline</CardTitle>
          <CardDescription>Current stage of all submitted innovations.</CardDescription>
        </div>
        <Button variant="outline" className="h-9 px-4 rounded-xl text-xs font-bold gap-2">
           Download CSV <ArrowUpRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="h-[350px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.map(s => ({ ...s, value: s.count }))}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
