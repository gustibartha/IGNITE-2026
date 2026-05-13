import { db } from "@/lib/db";
import { ideas } from "@/lib/db/schema";
import { count } from "drizzle-orm";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Lightbulb, 
  Award,
} from "lucide-react";
import { StatusChart } from "@/components/charts/analytics-charts";

export default async function AnalyticsPage() {
  // Fetch live data for charts
  const statuses = await db.select({ 
    status: ideas.status, 
    count: count() 
  }).from(ideas).groupBy(ideas.status);

  const totalSubmissions = await db.select({ value: count() }).from(ideas);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Analytics Insights</h1>
        <p className="text-slate-500 font-medium text-lg">Deep dive into innovation metrics and performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatItem title="Total Ideas" value={totalSubmissions[0].value.toString()} icon={Lightbulb} color="bg-indigo-50 text-indigo-600" />
        <StatItem title="Avg. Score" value="78.5" icon={Award} color="bg-teal-50 text-teal-600" />
        <StatItem title="Active Users" value="156" icon={Users} color="bg-amber-50 text-amber-600" />
        <StatItem title="Growth" value="+24%" icon={TrendingUp} color="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="grid gap-8">
        <StatusChart data={statuses} />
      </div>
    </div>
  );
}

function StatItem({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="border-none shadow-lg shadow-slate-100 rounded-3xl p-6">
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
          <p className="text-2xl font-black text-slate-900">{value}</p>
        </div>
      </div>
    </Card>
  );
}
