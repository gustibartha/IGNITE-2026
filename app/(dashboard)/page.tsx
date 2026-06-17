import Image from "next/image";
import { 
  FileText, 
  Users, 
  Banknote, 
  TrendingUp, 
  Download,
  ArrowUpRight,
  Plus,
  Target,
  AlertCircle,
  Clock
} from "lucide-react";
import { 
  Card, 
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { UnitDistributionChart, DoughnutChart } from "@/components/charts/overview-charts";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import { ideas } from "@/lib/db/schema";
import Link from "next/link";
import { ExportButton } from "@/components/dashboard/export-button";

export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  const dbIdeas = await db.query.ideas.findMany({
    orderBy: (ideas, { desc }) => [desc(ideas.createdAt)],
  });

  const totalIdeas = dbIdeas.length;
  const recentIdeas = dbIdeas.slice(0, 5);

  // Calculate distributions
  const bidangDistribution = dbIdeas.reduce((acc: any, idea) => {
    acc[idea.bidang] = (acc[idea.bidang] || 0) + 1;
    return acc;
  }, {});

  const kategoriDistribution = dbIdeas.reduce((acc: any, idea) => {
    acc[idea.kategoriInovasi] = (acc[idea.kategoriInovasi] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(kategoriDistribution).map(([name, value]) => ({ name, value }));
  const bidangChartData = Object.entries(bidangDistribution).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[3rem] bg-slate-900 p-5 md:p-12 text-white shadow-2xl shadow-indigo-500/20 group">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-48 h-48 md:w-96 md:h-96 bg-indigo-500 rounded-full blur-[60px] md:blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-teal-500/30 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <Badge variant="outline" className="border-indigo-400/50 text-indigo-300 font-bold px-3 py-1 bg-indigo-500/10 backdrop-blur-md text-[9px] md:text-xs">IGNITE 2026 EDITION</Badge>
            <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-[1.1]">
              Innovation <span className="text-indigo-400">Dashboard</span>
            </h1>
            <p className="text-slate-400 font-medium text-sm md:text-lg max-w-lg">
              Driving the future of UP Muara Karang through collective intelligence.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <ExportButton data={dbIdeas} />
            <Link href="/submit">
              <Button size="lg" className="bg-indigo-600 hover:bg-white hover:text-slate-900 text-white font-black rounded-2xl gap-3 h-16 px-8 shadow-2xl shadow-indigo-500/40 transition-all hover:scale-105 active:scale-95 group/btn">
                <Plus className="h-6 w-6 transition-transform group-hover/btn:rotate-90" /> Submit New Idea
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Innovation Formasi Metrics */}
      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Target Inovasi (Ideal)" 
          value="500" 
          change="Goal for 2026" 
          trend="neutral"
          icon={Target}
          iconBg="bg-slate-800 text-white"
          color="slate"
        />
        <MetricCard 
          title="Total Inovasi (Bezetting)" 
          value={totalIdeas.toString()} 
          change={`${totalIdeas > 0 ? "+100%" : "0%"} actual`} 
          trend="up"
          icon={FileText}
          iconBg="bg-indigo-600 text-white"
          color="indigo"
        />
        <MetricCard 
          title="Gap Inovasi" 
          value={(500 - totalIdeas).toString()} 
          change="Remaining target" 
          trend="down"
          icon={AlertCircle}
          iconBg="bg-rose-500 text-white"
          color="rose"
        />
        <MetricCard 
          title="Unit Participation" 
          value={Object.keys(bidangDistribution).length.toString()} 
          change="Active units" 
          trend="up"
          icon={Users}
          iconBg="bg-teal-500 text-white"
          color="teal"
        />
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-7">
        <UnitDistributionChart data={bidangChartData} className="lg:col-span-4" />
        <DoughnutChart data={chartData} className="lg:col-span-3" />
      </div>

      {/* Recent Submissions Table */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-2xl shadow-slate-200/50 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 p-5 md:p-10 gap-4">
            <div>
              <CardTitle className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">Recent Ideas</CardTitle>
              <CardDescription className="font-semibold text-slate-400 text-xs md:text-base">Latest contributions.</CardDescription>
            </div>
            <Link href="/board" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto rounded-xl md:rounded-2xl h-10 md:h-12 border-slate-200 font-bold text-slate-500 hover:bg-slate-50 hover:text-indigo-600 text-xs md:text-sm">
                View Gallery
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/30">
                <TableRow className="border-none">
                  <TableHead className="font-black py-6 px-10 text-slate-400 uppercase tracking-[0.2em] text-[10px]">Title & Timeline</TableHead>
                  <TableHead className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Origin</TableHead>
                  <TableHead className="font-black text-center text-slate-400 uppercase tracking-[0.2em] text-[10px]">Status</TableHead>
                  <TableHead className="font-black text-right px-10 text-slate-400 uppercase tracking-[0.2em] text-[10px]">Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentIdeas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                         <div className="h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center">
                            <FileText className="h-8 w-8 text-slate-200" />
                         </div>
                         <p className="text-slate-400 font-bold text-lg italic">No ideas have been submitted yet...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  recentIdeas.map((idea) => (
                    <TableRow key={idea.id} className="hover:bg-indigo-50/30 transition-all border-b border-slate-50 last:border-0 group">
                      <TableCell className="py-8 px-10">
                        <div className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{idea.judul}</div>
                        <div className="flex items-center gap-2 mt-1.5 text-slate-400 font-bold text-xs uppercase tracking-tighter">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(idea.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-700">{idea.nid}</div>
                        <div className="inline-flex mt-1 px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-tighter">{idea.bidang}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className={cn(
                          "inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm",
                          idea.status === "Submitted" ? "bg-indigo-600 text-white" : "bg-teal-500 text-white"
                        )}>
                          {idea.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-10">
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-none font-black text-[10px] px-3 py-1 uppercase tracking-tighter">
                          {idea.kategoriInovasi}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Department Leaderboard */}
        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[3rem] overflow-hidden bg-slate-900 p-10 text-white">
          <div className="space-y-8">
            <div>
               <h3 className="text-2xl font-black tracking-tight">Unit Leaderboard</h3>
               <p className="text-slate-400 font-medium text-sm">Most active departments in IGNITE 2026.</p>
            </div>
            
            <div className="space-y-6">
              {Object.entries(bidangDistribution)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 5)
                .map(([name, count], i) => (
                <div key={name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center font-black text-xs">
                          {i + 1}
                       </div>
                       <span className="font-bold text-sm">{name}</span>
                    </div>
                    <span className="font-black text-indigo-400">{count as number} Ideas</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full" 
                      style={{ width: `${((count as number) / totalIdeas) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              
              {Object.keys(bidangDistribution).length === 0 && (
                <div className="py-10 text-center opacity-20 italic">No department data yet</div>
              )}
            </div>

            <div className="pt-8 border-t border-white/5">
               <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                     <TrendingUp className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Top Growth</p>
                    <p className="font-bold text-white">Engineering Unit (+24%)</p>
                  </div>
               </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, trend, icon: Icon, iconBg, color }: any) {
  const colorMap = {
    indigo: "hover:shadow-indigo-500/10 hover:border-indigo-100",
    teal: "hover:shadow-teal-500/10 hover:border-teal-100",
    amber: "hover:shadow-amber-500/10 hover:border-amber-100",
    rose: "hover:shadow-rose-500/10 hover:border-rose-100",
    slate: "hover:shadow-slate-500/10 hover:border-slate-100"
  } as any;

  return (
    <Card className={cn(
      "border border-slate-100 shadow-2xl shadow-slate-100 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden p-5 md:p-10 bg-white transition-all duration-500 group",
      colorMap[color]
    )}>
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-4 w-full">
          <p className="text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">{title}</p>
          <h3 className="text-3xl md:text-5xl font-black text-slate-950 group-hover:scale-105 origin-left transition-transform duration-500 tracking-tighter">{value}</h3>
          <div className="flex items-center gap-2 pt-2">
             <div className={cn(
               "h-2 w-2 rounded-full",
               trend === "up" ? "bg-emerald-500 animate-ping" : "bg-slate-300"
             )} />
             <span className={cn(
               "text-[10px] font-black uppercase tracking-widest",
               trend === "up" ? "text-emerald-500" : "text-slate-400"
             )}>
               {change}
             </span>
          </div>
        </div>
        <div className={cn("p-4 md:p-5 rounded-xl md:rounded-[1.75rem] shadow-xl shadow-slate-200 transition-all group-hover:-translate-y-2 duration-500 shrink-0", iconBg)}>
          <Icon className="h-6 w-6 md:h-8 md:w-8" />
        </div>
      </div>
    </Card>
  );
}
