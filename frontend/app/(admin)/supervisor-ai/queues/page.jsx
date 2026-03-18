"use client";

import { toast } from "sonner";
import { AlertCircle, Clock, ArrowRight, Settings2, CheckCircle2, TrendingUp, BellRing, Zap, TrendingDown, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { queueHealth } from "@/lib/mock-data/supervisor";
import { cn } from "@/lib/utils";

export default function QueueHealthPage() {
  return (
    <div className="space-y-6 p-1">
      {/* High Level Queue Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {queueHealth.map((queue) => (
          <Card key={queue.id} className={cn(
            "border-primary/10 shadow-md group transition-all hover:shadow-xl relative overflow-hidden",
            queue.status === "Critical" ? "border-red-500/30 bg-red-500/5" : "bg-card"
          )}>
            <div className={cn(
              "h-1 w-full",
              queue.status === "Critical" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            )} />
            <CardHeader className="p-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Queue Service Group</CardTitle>
                <h3 className="text-lg font-black tracking-tight">{queue.name}</h3>
              </div>
              <Badge className={cn(
                "text-[8px] font-black uppercase py-0 px-2 shadow-sm border-none",
                queue.status === "Critical" ? "bg-red-500 text-white" : "bg-green-500 text-white"
              )}>
                {queue.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-muted/40 space-y-1 shadow-inner group-hover:bg-muted/60 transition-colors">
                  <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Active Agents</p>
                  <p className="text-xl font-black">{queue.activeAgents}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 space-y-1 shadow-inner group-hover:bg-muted/60 transition-colors">
                  <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Calls In Queue</p>
                  <p className="text-xl font-black flex items-center gap-2 font-mono">
                    {queue.waitingCalls}
                    {queue.waitingCalls > queue.thresholds.warning && <AlertCircle className="h-4 w-4 text-amber-500 animate-bounce" />}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                    <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Max Wait Time</span>
                    <span className={cn("font-mono font-bold", queue.status === "Critical" ? "text-red-600" : "text-foreground")}>{queue.longestWait}</span>
                  </div>
                  <Progress value={(parseInt(queue.longestWait.split(":")[0]) * 60 + parseInt(queue.longestWait.split(":")[1])) / 600 * 100} className="h-1 shadow-inner" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                    <span className="text-muted-foreground flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> SLA Performance</span>
                    <span className={cn("font-mono font-bold", queue.sla < 80 ? "text-red-600" : "text-foreground")}>{queue.sla}%</span>
                  </div>
                  <Progress value={queue.sla} className={cn("h-1 shadow-inner transition-all duration-500", queue.sla < 80 ? "[&>div]:bg-red-500" : "[&>div]:bg-primary")} />
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full h-9 text-[10px] font-black uppercase gap-2 border-primary/10 group-hover:border-primary transition-all bg-background shadow-sm hover:shadow-md" onClick={() => toast.success("Loading capacity management dashboard...")}>
                  Manage Capacity <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Threshold Configuration */}
        <Card className="xl:col-span-2 border-primary/10 shadow-md bg-card/50">
          <CardHeader className="p-6 border-b bg-primary/5 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Queue Threshold Management</CardTitle>
              <CardDescription className="text-[10px] font-medium italic">Configure real-time alerts and automated surfacing logic.</CardDescription>
            </div>
            <Button size="sm" className="h-9 gap-2 text-[10px] font-black shadow-lg bg-primary text-white hover:bg-primary/90 uppercase tracking-widest" onClick={() => toast.success("Threshold configuration saved successfully!")}>
              <Settings2 className="h-3.5 w-3.5" /> Save Configuration
            </Button>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            <div className="divide-y divide-primary/5">
              {[
                { label: "Long Wait Threshold", desc: "Flag call as 'Long Wait' in supervisor HUD.", value: "05:00", unit: "min", icon: Clock },
                { label: "SLA Alert Buffer", desc: "Notify supervisors when SLA drops below target.", value: "85%", unit: "target", icon: BellRing },
                { label: "Sentiment Drop Surge", desc: "Auto-surface if 3+ calls drop in sentiment.", value: "3", unit: "calls", icon: Zap },
                { label: "Agent Idle Limit", desc: "Threshold for 'Available' time before coaching nudge.", value: "10:00", unit: "min", icon: Activity },
              ].map((item, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 shadow-inner group-hover:scale-110 transition-transform">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black tracking-tight uppercase tracking-widest">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground font-medium italic">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-background border border-primary/10 rounded-lg px-4 py-2 text-sm font-black shadow-sm font-mono ring-1 ring-primary/5">
                      {item.value} <span className="text-[9px] text-muted-foreground font-black uppercase ml-1 opacity-60">{item.unit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Routing Optimization Insights */}
        <Card className="border-primary/20 shadow-lg bg-linear-to-b from-card to-secondary/5 h-full overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 blur-2xl pointer-events-none" />
          <CardHeader className="bg-primary/5 border-b pb-4">
            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-primary">
              <Zap className="h-4 w-4 fill-primary" /> Routing Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-6 space-y-6 relative z-10">
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-4 shadow-inner">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 animate-pulse shadow-sm" />
                <p className="text-[11px] font-black uppercase tracking-widest text-amber-700">Predictive Capacity Alert</p>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed italic font-medium">
                SLA in <span className="font-bold text-foreground underline decoration-amber-500/30 italic">&quot;Billing&quot;</span> is dropping. AI recommends re-routing 4 agents from &quot;Sales&quot; to handle volume surge.
              </p>
              <div className="pt-2">
                <Button size="sm" className="w-full h-10 gap-2 font-black shadow-lg bg-amber-500 hover:bg-amber-600 text-white border-none transition-all text-[10px] uppercase tracking-widest" onClick={() => toast.success("Executing AI routing optimization plan...")}>
                  Approve Re-Routing Plan
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1 flex items-center justify-between">
                SLA Predictions (Next 1h)
                <Badge variant="outline" className="text-[8px] font-bold h-4 bg-background">LIVE ML FEED</Badge>
              </h4>
              {[
                { name: "Technical", val: 92, status: "stable" },
                { name: "Billing", val: 58, status: "declining" },
                { name: "Sales", val: 95, status: "rising" },
              ].map((sla) => (
                <div key={sla.name} className="flex items-center justify-between p-3 rounded-xl border bg-background/50 shadow-sm hover:shadow-md transition-shadow group/item">
                  <span className="text-[10px] font-black uppercase tracking-widest">{sla.name}</span>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-xs font-black font-mono",
                      sla.val < 80 ? "text-red-500" : "text-green-500"
                    )}>{sla.val}%</span>
                    {sla.status === "rising" ? <TrendingUp className="h-3 w-3 text-green-500 group-hover/item:scale-125 transition-transform" /> :
                      sla.status === "declining" ? <TrendingDown className="h-3 w-3 text-red-500 group-hover/item:scale-125 transition-transform" /> :
                        <Activity className="h-3 w-3 text-muted-foreground opacity-30" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
