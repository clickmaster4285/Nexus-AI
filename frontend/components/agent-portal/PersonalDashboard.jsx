"use client";

import { useState } from "react";
import { Clock, TrendingUp, TrendingDown, Minus, CheckCircle2, AlertCircle, Zap, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { agentStats } from "@/lib/mock-data/agent";
import { cn } from "@/lib/utils";

export default function PersonalDashboard() {
   const [status, setStatus] = useState(agentStats.status);
   const [timer ] = useState(agentStats.statusTime);

   const statuses = [
      { label: "Available", color: "bg-green-500", text: "text-green-500" },
      { label: "On Break", color: "bg-amber-500", text: "text-amber-500" },
      { label: "Lunch", color: "bg-blue-500", text: "text-blue-500" },
      { label: "Training", color: "bg-purple-500", text: "text-purple-500" },
      { label: "Offline", color: "bg-red-500", text: "text-red-500" }
   ];

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Status Bar */}
         <Card className="border-primary/10 shadow-lg bg-linear-to-r from-card to-primary/5">
            <CardContent className="p-6 flex flex-wrap items-center justify-between gap-6">
               <div className="flex items-center gap-6">
                  <div className="relative">
                     <div className={cn(
                        "h-16 w-16 rounded-full flex items-center justify-center border-4 border-background shadow-xl",
                        statuses.find(s => s.label === status).color
                     )}>
                        <CheckCircle2 className="h-8 w-8 text-white" />
                     </div>
                     <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center">
                        <ShieldCheck className="h-3 w-3 text-primary" />
                     </div>
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current State</p>
                     <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black tracking-tighter">{status}</h2>
                        <Badge variant="outline" className="font-mono text-xs border-primary/10 bg-background/50">
                           <Clock className="h-3 w-3 mr-1 text-primary" /> {timer}
                        </Badge>
                     </div>
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  {statuses.map((s) => (
                     <Button
                        key={s.label}
                        variant={status === s.label ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatus(s.label)}
                        className={cn(
                           "h-10 px-4 text-[10px] font-black uppercase tracking-widest transition-all",
                           status === s.label ? "shadow-lg" : "border-primary/10 hover:bg-primary/5"
                        )}
                     >
                        {s.label}
                     </Button>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* KPI Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agentStats.dailyKpis.map((kpi, idx) => (
               <Card key={idx} className="border-primary/10 shadow-sm group hover:border-primary/30 transition-all">
                  <CardContent className="p-6 space-y-4">
                     <div className="flex justify-between items-start">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{kpi.label}</p>
                        {kpi.trend === "up" ? (
                           <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : kpi.trend === "down" ? (
                           <TrendingDown className="h-4 w-4 text-red-500" />
                        ) : (
                           <Minus className="h-4 w-4 text-muted-foreground" />
                        )}
                     </div>
                     <div className="space-y-1">
                        <p className={cn("text-3xl font-black tracking-tight", kpi.color)}>{kpi.value}</p>
                        <p className="text-[10px] font-bold text-muted-foreground italic">Target: {kpi.target}</p>
                     </div>
                     <Progress
                        value={parseFloat(kpi.value.replace(/[^0-9.]/g, '')) / parseFloat(kpi.target.replace(/[^0-9.]/g, '')) * 100}
                        className="h-1"
                        indicatorClassName={kpi.color.replace('text-', 'bg-')}
                     />
                  </CardContent>
               </Card>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Shift Progress */}
            <Card className="lg:col-span-1 border-primary/10 shadow-lg">
               <CardHeader className="p-6 border-b bg-primary/2">
                  <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                     Shift Timeline
                     <Zap className="h-4 w-4 text-amber-500" />
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-8 space-y-8 text-center">
                  <div className="relative inline-flex items-center justify-center">
                     <svg className="h-40 w-40">
                        <circle
                           className="text-primary/10"
                           strokeWidth="8"
                           stroke="currentColor"
                           fill="transparent"
                           r="70"
                           cx="80"
                           cy="80"
                        />
                        <circle
                           className="text-primary"
                           strokeWidth="8"
                           strokeDasharray={440}
                           strokeDashoffset={440 - (440 * agentStats.shiftProgress) / 100}
                           strokeLinecap="round"
                           stroke="currentColor"
                           fill="transparent"
                           r="70"
                           cx="80"
                           cy="80"
                        />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-4xl font-black tracking-tight">{agentStats.shiftProgress}%</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">of 8h Shift</p>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <p className="text-sm font-black tracking-tight italic">Approx. 2h 45m remaining</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic">Next event: Training Session at 14:00</p>
                  </div>
               </CardContent>
            </Card>

            {/* Action Items / Coaching */}
            <Card className="lg:col-span-2 border-primary/10 shadow-lg">
               <CardHeader className="p-6 border-b bg-card/50 flex flex-row items-center justify-between">
                  <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">My Priority Tasks</CardTitle>
                  <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary">View All</Button>
               </CardHeader>
               <CardContent className="p-0">
                  {[
                     { title: "Review QA Feedback", desc: "Session ID: #4928 regarding customer sentiment.", type: "Review", icon: AlertCircle, color: "text-amber-500" },
                     { title: "Escalation Follow-up", desc: "Consult with supervisor on Jonathan Reed case.", type: "Task", icon: Zap, color: "text-blue-500" },
                     { title: "New Feature Training", desc: "Complete the module on Nexus AI Summaries.", type: "Training", icon: CheckCircle2, color: "text-green-500" },
                  ].map((task, idx) => (
                     <div key={idx} className="p-5 border-b border-primary/5 last:border-0 flex items-start justify-between hover:bg-muted/10 transition-colors group cursor-pointer">
                        <div className="flex items-start gap-4">
                           <div className={cn("p-2 rounded-lg bg-primary/5 mt-1", task.color)}>
                              <task.icon className="h-4 w-4" />
                           </div>
                           <div>
                              <p className="text-sm font-black tracking-tight">{task.title}</p>
                              <p className="text-[10px] text-muted-foreground font-medium italic">{task.desc}</p>
                           </div>
                        </div>
                        <Badge variant="outline" className="text-[9px] font-black uppercase border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                           {task.type}
                        </Badge>
                     </div>
                  ))}
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
