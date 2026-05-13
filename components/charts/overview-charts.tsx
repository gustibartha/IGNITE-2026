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
  Cell
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const trendData = [
  { name: "Jan", value: 45 },
  { name: "Feb", value: 52 },
  { name: "Mar", value: 48 },
  { name: "Apr", value: 70 },
  { name: "May", value: 61 },
  { name: "Jun", value: 85 },
  { name: "Jul", value: 120 },
];

const categoryData = [
  { name: "Operasional", value: 400 },
  { name: "Teknis", value: 300 },
  { name: "Manajemen", value: 300 },
  { name: "EBT", value: 200 },
];

const COLORS = ["#6366f1", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export function UnitDistributionChart({ data, className }: { data: any[], className?: string }) {
  const displayData = data && data.length > 0 ? data : trendData;

  return (
    <Card className={cn("border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between p-8 pb-2">
        <CardTitle className="text-xl font-black text-slate-900">Bidang Terbanyak</CardTitle>
        <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 border border-slate-100"><MoreHorizontal className="h-4 w-4 text-slate-400" /></Button>
      </CardHeader>
      <CardContent className="h-[350px] p-8 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.1)", padding: "15px" }}
            />
            <Bar 
              dataKey="value" 
              fill="#6366f1" 
              radius={[10, 10, 0, 0]}
              barSize={40}
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function DoughnutChart({ data, className }: { data: any[], className?: string }) {
  const displayData = data.length > 0 ? data : categoryData;

  return (
    <Card className={cn("border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between p-8 pb-2">
        <CardTitle className="text-xl font-black text-slate-900">Innovation Categories</CardTitle>
        <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 border border-slate-100"><MoreHorizontal className="h-4 w-4 text-slate-400" /></Button>
      </CardHeader>
      <CardContent className="h-[350px] flex flex-col items-center justify-center p-8">
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.1)" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 w-full mt-6">
           {displayData.map((item, index) => (
             <div key={item.name} className="flex items-center gap-2.5">
               <div className="h-2.5 w-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate max-w-[100px]">{item.name}</span>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  );
}
