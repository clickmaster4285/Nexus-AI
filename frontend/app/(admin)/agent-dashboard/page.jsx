"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Clock, 
  Phone, 
  MessageSquare, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Bell,
  Star,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function AgentTempDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Handled Calls", value: "42", target: "50", icon: Phone, color: "text-blue-500" },
    { label: "Avg Handling Time", value: "4:12", target: "4:30", icon: Clock, color: "text-green-500" },
    { label: "CSAT Score", value: "4.8", target: "5.0", icon: Star, color: "text-amber-500" },
    { label: "Occupancy", value: "88%", target: "85%", icon: Activity, color: "text-primary" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-4">
      
      {/* Personalized Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.4em]">
            <Zap className="h-4 w-4" /> Agent Command Center
          </div>
          <h1 className="text-4xl font-black tracking-tighter">
            Welcome back, <span className="text-primary italic">Agent Smith</span>.
          </h1>
          <p className="text-muted-foreground text-sm font-bold">
            System synchronized. Your shift is <span className="text-foreground">62% complete</span>.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-border shadow-sm">
           <div className="text-right">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Global Sync Time</p>
              <p className="text-lg font-black tracking-tighter uppercase">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
           </div>
           <div className="h-10 w-px bg-border mx-2" />
           <Badge className="h-10 px-4 bg-green-500/10 text-green-600 border-none uppercase text-[10px] font-black tracking-widest gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Available
           </Badge>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="rounded-[2rem] border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className={cn("p-3 rounded-2xl bg-muted/50 group-hover:bg-primary/10 transition-colors", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                   <p className="text-3xl font-black tracking-tighter mt-1">{stat.value}</p>
                </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-[9px] font-black uppercase text-muted-foreground italic">
                    <span>Performance</span>
                    <span>Target: {stat.target}</span>
                 </div>
                 <Progress value={80} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Interaction Preview */}
        <Card className="lg:col-span-2 rounded-[2.5rem] border-border bg-white shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-border bg-muted/10 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
              <MessageSquare className="h-4 w-4 text-primary" /> Recent Synchronizations
            </CardTitle>
            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest gap-2">
              Deep Analytics <TrendingUp className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-12 text-center space-y-6">
               <div className="h-24 w-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-border">
                  <Activity className="h-8 w-8 text-muted-foreground/40 animate-pulse" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-xl font-black tracking-tight uppercase">Waiting for interaction...</h3>
                  <p className="text-muted-foreground text-sm font-medium max-w-sm mx-auto italic">
                    Once you handle a call or chat, real-time AI transcription and sentiment analysis will populate here.
                  </p>
               </div>
               <Button className="h-12 px-8 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20">
                  Manual Entry Log
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Notifications / Agent Tasks */}
        <Card className="rounded-[2.5rem] border-border bg-card shadow-sm">
          <CardHeader className="p-8 border-b border-border">
            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
              <Bell className="h-4 w-4 text-primary" /> Neural Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
               {[
                 { title: "Shift Update", time: "10m ago", desc: "Break window scheduled for 14:15", icon: Clock },
                 { title: "New Resource", time: "1h ago", desc: "QA Guidelines v4.2 updated in KB", icon: Zap },
                 { title: "Sync Success", time: "2h ago", desc: "CRM Records successfully pushed", icon: CheckCircle2 }
               ].map((item, i) => (
                 <div key={i} className="p-5 rounded-3xl bg-white border border-border hover:border-primary/20 hover:shadow-md transition-all cursor-pointer group flex items-start gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-muted/50 flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
                       <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-1">
                       <div className="flex items-center justify-between gap-4">
                          <p className="text-xs font-black tracking-tight">{item.title}</p>
                          <span className="text-[9px] font-bold text-muted-foreground italic">{item.time}</span>
                       </div>
                       <p className="text-[10px] text-muted-foreground font-medium">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Temporary Footer Information */}
      <div className="flex items-center justify-center p-8 bg-primary/5 rounded-[2rem] border border-primary/10 border-dashed">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">
            Nexus AI Infrastructure • Secure Node #821
         </p>
      </div>

    </div>
  );
}
