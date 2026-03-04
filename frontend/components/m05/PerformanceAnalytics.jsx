"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Clock, Zap, Target, Gauge, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { performanceTrends } from "@/lib/mock-data/workforce";
import { cn } from "@/lib/utils";

const KpiCard = ({ icon: Icon, label, value, trend, subtext, color }) => (
   <Card className="border-primary/10 shadow-sm overflow-hidden group">
      <div className={cn("h-1 w-full", color)} />
      <CardContent className="p-6">
         <div className="flex justify-between items-start">
            <div className="space-y-1">
               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
               <p className="text-2xl font-black">{value}</p>
            </div>
            <div className={cn("p-2 rounded-lg bg-muted group-hover:scale-110 transition-transform", color.replace("bg-", "text-"))}>
               <Icon className="h-5 w-5" />
            </div>
         </div>
         <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className={cn(
               "text-[10px] font-bold border-transparent",
               trend.startsWith("+") ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
            )}>
               {trend}
            </Badge>
            <span className="text-[10px] text-muted-foreground font-medium">{subtext}</span>
         </div>
      </CardContent>
   </Card>
);

export default function PerformanceAnalytics() {
   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h2 className="text-xl font-bold tracking-tight">Performance Analytics</h2>
               <p className="text-xs text-muted-foreground">Comprehensive workforce metrics and behavioral trends.</p>
            </div>
            <div className="flex gap-2">
               <Select defaultValue="30d">
                  <SelectTrigger className="w-30 h-8 text-xs">
                     <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="7d">Last 7 Days</SelectItem>
                     <SelectItem value="30d">Last 30 Days</SelectItem>
                     <SelectItem value="90d">Last Quarter</SelectItem>
                  </SelectContent>
               </Select>
               <Select defaultValue="all">
                  <SelectTrigger className="w-30 h-8 text-xs">
                     <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Depts</SelectItem>
                     <SelectItem value="sales">Sales</SelectItem>
                     <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>

         {/* KPI Grid - 15 Metrics (Simplified to 8 for UI layout) */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
               icon={TrendingUp}
               label="Total Handled"
               value="45,284"
               trend="+12.4%"
               subtext="vs last period"
               color="bg-blue-500"
            />
            <KpiCard
               icon={Clock}
               label="Avg Handle Time"
               value="5:42"
               trend="-0:15"
               subtext="Efficiency gain"
               color="bg-emerald-500"
            />
            <KpiCard
               icon={Target}
               label="First Call Res"
               value="78.2%"
               trend="+2.1%"
               subtext="Target: 80%"
               color="bg-purple-500"
            />
            <KpiCard
               icon={Zap}
               label="Occupancy Rate"
               value="88.5%"
               trend="+4.2%"
               subtext="High workload"
               color="bg-orange-500"
            />
            <KpiCard
               icon={Gauge}
               label="CSAT Score"
               value="4.72"
               trend="+0.05"
               subtext="Scale: 1-5"
               color="bg-yellow-500"
            />
            <KpiCard
               icon={CheckCircle2}
               label="QA Compliance"
               value="94.8%"
               trend="+1.2%"
               subtext="124 reviews"
               color="bg-indigo-500"
            />
            <KpiCard
               icon={Users}
               label="Attendance"
               value="98.1%"
               trend="-0.5%"
               subtext="Healthy level"
               color="bg-cyan-500"
            />
            <KpiCard
               icon={AlertCircle}
               label="Escalation Rate"
               value="4.2%"
               trend="-1.1%"
               subtext="Improving"
               color="bg-red-500"
            />
         </div>

         {/* Charts Section */}
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="border-primary/10 shadow-md">
               <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Volume & Sentiment Trend</CardTitle>
                  <CardDescription>Daily call distributions vs predicted sentiment</CardDescription>
               </CardHeader>
               <CardContent className="h-75 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={performanceTrends}>
                        <defs>
                           <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                        <Tooltip
                           contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                           cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                        />
                        <Area type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCalls)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-md">
               <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Efficiency Benchmarking</CardTitle>
                  <CardDescription>AHT vs CSAT performance by day</CardDescription>
               </CardHeader>
               <CardContent className="h-75 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={performanceTrends}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                        <Tooltip
                           contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="aht" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                        <Bar dataKey="csat" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                     </BarChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
