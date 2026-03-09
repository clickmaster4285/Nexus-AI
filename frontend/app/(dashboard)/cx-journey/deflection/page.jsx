"use client";

import { Cell, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";
import { ShieldAlert, DollarSign, Navigation, Activity, CheckCircle2, AlertTriangle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deflectionMetrics } from "@/lib/mock-data/cx";
import { cn } from "@/lib/utils";

const StatBox = ({ label, value, subtext, icon: Icon, color }) => (
   <div className="p-6 rounded-2xl bg-card border border-primary/10 shadow-sm space-y-3 relative overflow-hidden group">
      <div className={cn("absolute top-0 right-0 p-4 opacity-70 group-hover:opacity-95 transition-opacity", color)}>
         <Icon className="h-16 w-16" />
      </div>
      <div className="relative z-10">
         <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{label}</p>
         <p className="text-3xl font-black">{value}</p>
         <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-tight">{subtext}</p>
      </div>
   </div>
);

export default function SelfServiceAnalytics() {
   const pathData = [
      { name: 'Deflected', value: deflectionMetrics.pathAnalysis.deflected, color: '#10b981' },
      { name: 'Transferred', value: deflectionMetrics.pathAnalysis.transferred, color: '#3b82f6' },
      { name: 'Abandoned', value: deflectionMetrics.pathAnalysis.abandoned, color: '#ef4444' },
   ];

   return (
      <div className="space-y-6">
         {/* High Level Metrics */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatBox
               label="Containment Rate"
               value={`${deflectionMetrics.containmentRate}%`}
               subtext="Target: 60-80%"
               icon={CheckCircle2}
               color="text-green-500"
            />
            <StatBox
               label="Deflection ROI"
               value={`$${(deflectionMetrics.roi / 1000).toFixed(1)}k`}
               subtext="Estimated Savings"
               icon={DollarSign}
               color="text-emerald-500"
            />
            <StatBox
               label="Abandonment Rate"
               value={`${deflectionMetrics.abandonmentRate}%`}
               subtext="Alert if > 10%"
               icon={AlertTriangle}
               color="text-red-500"
            />
            <StatBox
               label="IVR Satisfaction"
               value={deflectionMetrics.ivrSatisaction}
               subtext="Scale: 1-5"
               icon={Users}
               color="text-blue-500"
            />
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* IVR Journey Analysis */}
            <div className="xl:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-md">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Self-Service Path Resolution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-72 pt-4 flex flex-col md:flex-row items-center gap-12">
                     <div className="h-full w-full max-w-70 shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie
                                 data={pathData}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={70}
                                 outerRadius={100}
                                 paddingAngle={8}
                                 dataKey="value"
                              >
                                 {pathData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                 ))}
                              </Pie>
                              <Tooltip />
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="grid grid-cols-1 gap-4 w-full">
                        {pathData.map(item => (
                           <div key={item.name} className="p-4 rounded-xl border bg-muted/20 flex justify-between items-center group hover:bg-muted/40 transition-colors">
                              <div className="flex items-center gap-3">
                                 <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                 <span className="text-xs font-black uppercase tracking-tight">{item.name}</span>
                              </div>
                              <div className="text-right">
                                 <span className="text-lg font-black">{item.value}</span>
                                 <span className="text-[10px] text-muted-foreground ml-2">interactions</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-primary/10 shadow-md">
                  <CardHeader className="p-4 bg-primary/2 border-b">
                     <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4" /> Top Drop-Off Points
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                     <div className="divide-y divide-primary/5">
                        {deflectionMetrics.dropOffPoints.map((point, idx) => (
                           <div key={idx} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                              <div className="flex items-center gap-4">
                                 <div className="h-8 w-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center font-black text-xs">
                                    {idx + 1}
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold">{point.stage}</p>
                                    <p className="text-[10px] text-muted-foreground italic">Primary Reason: {point.reason}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-lg font-black text-red-600">{point.rate}</p>
                                 <p className="text-[9px] uppercase font-black text-muted-foreground">Drop Rate</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Self-Service Opportunities */}
            <div className="space-y-6">
               <Card className="border-primary/10 shadow-lg bg-linear-to-b from-card to-secondary/5 h-full">
                  <CardHeader>
                     <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" /> Deflection Opportunities
                     </CardTitle>
                     <p className="text-[10px] text-muted-foreground mt-1">AI-detected high-volume topics for new IVR/Bot paths.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {deflectionMetrics.opportunityTopics.map(topic => (
                        <div key={topic.topic} className="p-4 rounded-2xl border bg-background shadow-inner space-y-4 group hover:border-primary/30 transition-all">
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <p className="text-xs font-black">{topic.topic}</p>
                                 <Badge variant="outline" className={cn(
                                    "text-[8px] font-black uppercase border-transparent",
                                    topic.ease === "High" ? "bg-green-500/10 text-green-600" : "bg-blue-500/10 text-blue-600"
                                 )}>
                                    {topic.ease} Ease of Implementation
                                 </Badge>
                              </div>
                              <span className="text-xl font-black text-primary">{topic.count}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                                 <div className="h-full bg-primary" style={{ width: `${(topic.count / 215) * 100}%` }} />
                              </div>
                              <span className="text-[9px] font-bold text-muted-foreground uppercase">Volume</span>
                           </div>
                           <Button variant="outline" className="w-full h-8 text-[10px] font-black uppercase group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                              Create Deflection Path
                           </Button>
                        </div>
                     ))}

                     <div className="pt-4 mt-6 border-t border-dashed">
                        <Button className="w-full h-10 gap-2 font-black shadow-lg">
                           <Navigation className="h-4 w-4" /> Open Path Designer
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
