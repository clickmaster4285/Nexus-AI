"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import { MessageSquare, Heart, Zap, Target, TrendingUp, TrendingDown, ShieldAlert, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { vocMetrics } from "@/lib/mock-data/cx";
import {Button} from "@/components/ui/button";
import { cn } from "@/lib/utils";

const KpiCard = ({ label, value, subtext, icon: Icon, trend, trendValue, color }) => (
   <Card className="border-primary/10 shadow-sm overflow-hidden group">
      <div className={cn("h-1 w-full", color)} />
      <CardContent className="p-6">
         <div className="flex justify-between items-start">
            <div className="space-y-1">
               <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{label}</p>
               <p className="text-3xl font-black">{value}</p>
            </div>
            <div className={cn("p-2 rounded-lg bg-muted group-hover:scale-110 transition-transform", color.replace("bg-", "text-"))}>
               <Icon className="h-5 w-5" />
            </div>
         </div>
         <div className="mt-4 flex items-center gap-2 text-[10px] font-bold">
            <span className={cn(
               "flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border",
               trend === "up" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-red-500/10 text-red-600 border-red-500/20"
            )}>
               {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
               {trendValue}
            </span>
            <span className="text-muted-foreground">{subtext}</span>
         </div>
      </CardContent>
   </Card>
);

export default function VoCAnalytics() {
   return (
      <div className="space-y-6">
         {/* KPI Overview */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KpiCard
               label="Net Promoter Score"
               value={vocMetrics.nps}
               subtext="vs last month"
               icon={Heart}
               trend="up"
               trendValue="+5"
               color="bg-purple-500"
            />
            <KpiCard
               label="Predicted CSAT"
               value={vocMetrics.csat}
               subtext="Scale: 1-5"
               icon={Target}
               trend="up"
               trendValue="+0.2"
               color="bg-emerald-500"
            />
            <KpiCard
               label="Customer Effort Score"
               value={vocMetrics.effortScore}
               subtext="Lower is better"
               icon={Zap}
               trend="down"
               trendValue="-0.3"
               color="bg-blue-500"
            />
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* NPS Trend & Sentiment */}
            <div className="xl:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-md">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">NPS Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 pt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={vocMetrics.npsTrend}>
                           <defs>
                              <linearGradient id="colorNps" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                                 <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                           <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                           <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                           <Tooltip
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                           />
                           <Area type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorNps)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </CardContent>
               </Card>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-primary/10 shadow-md">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Sentiment Distribution</CardTitle>
                     </CardHeader>
                     <CardContent className="flex flex-col md:flex-row items-center gap-8">
                        <div className="h-40 w-40 shrink-0">
                           <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                 <Pie
                                    data={vocMetrics.sentimentDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                 >
                                    {vocMetrics.sentimentDistribution.map((entry, index) => (
                                       <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                 </Pie>
                                 <Tooltip />
                              </PieChart>
                           </ResponsiveContainer>
                        </div>
                        <div className="space-y-4 w-full">
                           {vocMetrics.sentimentDistribution.map(item => (
                              <div key={item.name} className="space-y-1">
                                 <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span>{item.name}</span>
                                    <span>{item.value}%</span>
                                 </div>
                                 <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                       className="h-full rounded-full transition-all duration-1000"
                                       style={{ width: `${item.value}%`, backgroundColor: item.color }}
                                    />
                                 </div>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="border-primary/10 shadow-md">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Top Thematic Clusters</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        {vocMetrics.topThemes.map(theme => (
                           <div key={theme.theme} className="flex items-center justify-between p-3 rounded-xl border bg-card/50">
                              <div className="flex items-center gap-3">
                                 <div className={cn(
                                    "p-2 rounded-lg",
                                    theme.type === "Positive" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                                 )}>
                                    <MessageSquare className="h-4 w-4" />
                                 </div>
                                 <div>
                                    <p className="text-xs font-bold">{theme.theme}</p>
                                    <p className="text-[10px] text-muted-foreground">{theme.count} mentions</p>
                                 </div>
                              </div>
                              <Badge variant="outline" className={cn(
                                 "text-[8px] font-black uppercase",
                                 theme.type === "Positive" ? "border-green-200 text-green-600" : "border-red-200 text-red-600"
                              )}>
                                 {theme.type}
                              </Badge>
                           </div>
                        ))}
                     </CardContent>
                  </Card>
               </div>
            </div>

            {/* Product Signals & Feedback */}
            <div className="space-y-6">
               <Card className="border-primary/10 shadow-lg bg-linear-to-b from-card to-secondary/5 h-full">
                  <CardHeader>
                     <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" /> Feature Intelligence
                     </CardTitle>
                     <CardDescription className="text-[10px]">Real-time sentiment tracking per product area.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     {vocMetrics.productFeedback.map(signal => (
                        <div key={signal.feature} className="space-y-2">
                           <div className="flex justify-between items-end">
                              <div>
                                 <p className="text-xs font-black">{signal.feature}</p>
                                 <p className="text-[9px] text-muted-foreground uppercase font-medium tracking-tight">Sentiment Score</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-lg font-black">{Math.round(signal.sentiment * 100)}%</p>
                                 <Badge className={cn(
                                    "text-[8px] py-0 px-1 font-bold",
                                    signal.status === "Rising" ? "bg-green-500" :
                                       signal.status === "Falling" ? "bg-red-500" : "bg-blue-500"
                                 )}>
                                    {signal.status}
                                 </Badge>
                              </div>
                           </div>
                           <Progress
                              value={signal.sentiment * 100}
                              className={cn(
                                 "h-1.5",
                                 signal.sentiment > 0.7 ? "bg-green-500" : signal.sentiment > 0.4 ? "bg-yellow-500" : "bg-red-500"
                              )}
                           />
                        </div>
                     ))}

                     <div className="pt-6 border-t border-dashed">
                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                           <div className="flex items-center gap-2">
                              <ShieldAlert className="h-4 w-4 text-primary animate-pulse" />
                              <p className="text-xs font-black uppercase tracking-tighter">AI Insight</p>
                           </div>
                           <p className="text-[10px] text-muted-foreground leading-relaxed">
                              Negative sentiment around &quot;Mobile UI&quot; has increased by 15% this week. Primary cause: Login session timeouts.
                           </p>
                           <Button variant="outline" size="sm" className="w-full text-[10px] h-8 font-black uppercase">View Detailed Logs</Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
