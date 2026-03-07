"use client";

import {
   TrendingUp,
   Zap,
   AlertCircle,
   ShieldCheck,
   DollarSign,
   Percent,
   User,
   ArrowUpRight,
   ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function RevenueDashboard({ kpis }) {
   const stats = [
      {
         label: "Upsell Opportunities",
         value: kpis.upsellOpportunities,
         trend: "+12%",
         trendUp: true,
         icon: Zap,
         color: "text-blue-500",
         desc: "Detected in last 24h"
      },
      {
         label: "Upsell Conv. Rate",
         value: `${kpis.upsellConversion}%`,
         trend: "+2.1%",
         trendUp: true,
         icon: Percent,
         color: "text-green-500",
         desc: "Target: 15%",
         progress: (kpis.upsellConversion / 15) * 100
      },
      {
         label: "Missed Opportunities",
         value: kpis.missedOpportunities,
         trend: "Critical",
         trendUp: false,
         icon: AlertCircle,
         color: "text-red-500",
         desc: "Agent failed to offer"
      },
      {
         label: "Churn Risk Calls",
         value: kpis.churnRiskCalls,
         trend: "+3",
         trendUp: false,
         icon: AlertCircle,
         color: "text-red-600",
         desc: "High sentiment risk"
      },
      {
         label: "Revenue at Risk",
         value: `$${(kpis.revenueAtRisk / 1000).toFixed(1)}k`,
         trend: "High",
         trendUp: false,
         icon: DollarSign,
         color: "text-orange-500",
         desc: "Potential churn value"
      },
      {
         label: "Retention Saves",
         value: kpis.retentionSaves,
         trend: "+8",
         trendUp: true,
         icon: ShieldCheck,
         color: "text-indigo-500",
         desc: "Successfully retained"
      },
      {
         label: "Revenue Saved",
         value: `$${(kpis.revenueSaved / 1000).toFixed(1)}k`,
         trend: "Top Metric",
         trendUp: true,
         icon: DollarSign,
         color: "text-emerald-500",
         desc: "Retained contract value"
      },
      {
         label: "Sales Call Score",
         value: `${kpis.salesCallScore}%`,
         trend: "+5%",
         trendUp: true,
         icon: TrendingUp,
         color: "text-primary",
         desc: "Avg across team",
         progress: kpis.salesCallScore
      },
      {
         label: "Top Revenue Agent",
         value: kpis.topAgent,
         trend: "Gold",
         trendUp: true,
         icon: User,
         color: "text-yellow-500",
         desc: "Most converted upsells"
      }
   ];

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
               <Card key={i} className="relative overflow-hidden group hover:shadow-lg transition-all border-primary/10 hover:border-primary/30">
                  <div className={cn(
                     "absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 group-hover:scale-110 transition-transform",
                     stat.color.replace('text-', 'bg-')
                  )} style={{ borderRadius: '50%' }} />
                  <CardHeader className="pb-2">
                     <div className="flex items-center justify-between">
                        <div className={cn("p-2 rounded-lg bg-muted/50 transition-colors group-hover:bg-muted", stat.color)}>
                           <stat.icon className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className={cn(
                           "text-[10px] h-5 py-0",
                           stat.trendUp ? "text-green-600 border-green-200 bg-green-50" : "text-red-600 border-red-200 bg-red-50"
                        )}>
                           {stat.trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                           {stat.trend}
                        </Badge>
                     </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                           <h3 className="text-3xl font-bold font-mono tracking-tighter">{stat.value}</h3>
                        </div>
                     </div>

                     {stat.progress !== undefined && (
                        <div className="space-y-1.5">
                           <Progress value={stat.progress} className="h-1.5" />
                           <div className="flex justify-between text-[10px] text-muted-foreground">
                              <span>Performance</span>
                              <span>{stat.progress.toFixed(0)}%</span>
                           </div>
                        </div>
                     )}

                     <div className="flex items-center text-[10px] text-muted-foreground py-1 border-t border-dashed border-muted">
                        <p>{stat.desc}</p>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         {/* Advanced Chart / Comparison Layer */}
         <Card className="bg-primary/5 border-dashed border-primary/20">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="space-y-2 max-w-md">
                  <div className="flex items-center gap-2 text-primary">
                     <TrendingUp className="h-5 w-5" />
                     <h4 className="font-bold text-lg">Revenue Projection (Current Quarter)</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                     Based on active upsell signals and current conversion trends, we project an additional **$125k** in revenue by end of month.
                  </p>
               </div>
               <div className="flex gap-4">
                  <Button size="lg" className="shadow-md">Analyze Sales Cycle</Button>
                  <Button variant="outline" size="lg" className="bg-background/50">View Forecast Data</Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
