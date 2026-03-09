"use client";

import { useState } from "react";
import { Users, Clock, ShieldAlert, Zap, TrendingUp, MoreVertical, Phone, BadgeCheck, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supervisorAgents } from "@/lib/mock-data/supervisor";
import { cn } from "@/lib/utils";

export default function LiveCopilotPage() {
  const [filter, setFilter] = useState("All");

  const filteredAgents = supervisorAgents.filter(agent =>
    filter === "All" || agent.status === filter || (filter === "Alerts" && agent.alerts.length > 0)
  );

  return (
    <div className="space-y-6 p-1">
      {/* Real-time Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Agents", value: "48", sub: "32 On Call", icon: Users, color: "text-blue-500" },
          { label: "Avg Service Level", value: "92%", sub: "Target 90%", icon: BadgeCheck, color: "text-green-500" },
          { label: "Critical Alerts", value: "4", sub: "Response Required", icon: AlertCircle, color: "text-red-500" },
          { label: "Avg Sentiment", value: "84%", sub: "Positive Index", icon: TrendingUp, color: "text-emerald-500" },
        ].map((stat, idx) => (
          <Card key={idx} className="border-primary/10 shadow-sm transition-all hover:shadow-md group bg-card/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("p-3 rounded-2xl bg-muted group-hover:scale-110 transition-transform", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-[9px] text-muted-foreground font-bold mt-0.5">{stat.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Monitoring Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {["All", "On Call", "Available", "Wrap Up", "Alerts"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 text-[10px] font-black uppercase tracking-tight h-8",
                  filter === f ? "shadow-lg scale-105" : "border-primary/10 bg-background"
                )}
              >
                {f} {f === "Alerts" && <Badge className="ml-2 h-4 min-w-4 px-1 bg-red-500 text-white border-none text-[8px] flex items-center justify-center">{supervisorAgents.filter(a => a.alerts.length > 0).length}</Badge>}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-2 text-[10px] font-black border-primary/10 bg-background" onClick={() => alert("Switching layout...")}>
              Layout View
            </Button>
            <Button size="sm" className="h-8 gap-2 text-[10px] font-black shadow-md bg-primary text-white" onClick={() => alert("Broadcast message modal...")}>
              Broadcast Message
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className={cn(
              "border-primary/10 transition-all hover:scale-[1.02] hover:shadow-xl relative overflow-hidden group",
              agent.alerts.length > 0 ? "border-red-500/30 ring-1 ring-red-500/10 shadow-red-500/5 bg-red-500/5" : "bg-card"
            )}>
              {agent.alerts.length > 0 && (
                <div className="absolute top-0 right-0 p-3 flex gap-1 z-20">
                  <ShieldAlert className="h-5 w-5 text-red-500 animate-pulse" />
                </div>
              )}
              <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-lg ring-2 ring-primary/5">
                    <AvatarFallback className="text-md font-black bg-secondary text-primary shadow-inner">{agent.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black truncate">{agent.name}</h4>
                      <MoreVertical className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={cn(
                        "text-[8px] px-1.5 py-0 font-black uppercase rounded-full border-none shadow-sm",
                        agent.status === "On Call" ? "bg-blue-500" :
                          agent.status === "Available" ? "bg-green-500" : "bg-amber-500"
                      )}>
                        {agent.status}
                      </Badge>
                      <span className="text-[10px] font-mono text-muted-foreground font-bold">{agent.duration}</span>
                    </div>
                  </div>
                </div>

                {agent.status === "On Call" ? (
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-muted/40 border border-primary/5 space-y-2 group-hover:bg-muted/60 transition-colors shadow-inner">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase text-muted-foreground tracking-widest">
                        <span>Customer</span>
                        <span>Sentiment</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold truncate pr-2">{agent.customer}</span>
                        <div className="flex items-center gap-1">
                          <div className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            agent.sentiment === "Positive" ? "bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]" : "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]"
                          )} />
                          <span className={cn(
                            "text-[10px] font-black",
                            agent.sentiment === "Positive" ? "text-green-600" : "text-red-600"
                          )}>{agent.sentiment}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 font-black uppercase text-[9px] text-muted-foreground tracking-tighter">
                      <div className="flex justify-between">
                        <span>Interaction Intensity</span>
                        <span className="text-foreground">{agent.workload}%</span>
                      </div>
                      <Progress value={agent.workload} className={cn(
                        "h-1.5 transition-all duration-500",
                        agent.workload > 80 ? "[&>div]:bg-red-500" : "[&>div]:bg-primary"
                      )} />
                    </div>

                    <div className="flex gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" size="sm" className="flex-1 h-8 gap-1 text-[9px] font-black uppercase bg-background shadow-sm hover:border-primary group/btn" onClick={() => alert("Barging into call...")}>
                        <Phone className="h-3 w-3 group-hover/btn:text-primary transition-colors" /> Listen
                      </Button>
                      <Button size="sm" className="flex-1 h-8 gap-1 text-[9px] font-black uppercase shadow-md bg-primary text-white hover:bg-primary/90" onClick={() => alert("Opening whisper coaching...")}>
                        <Zap className="h-3 w-3 fill-current" /> Whisper
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-31 flex flex-col items-center justify-center text-muted-foreground opacity-40">
                    <Clock className="h-8 w-8 mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-widest leading-none">Awaiting Call</p>
                  </div>
                )}

                {agent.alerts.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-red-500/10 space-y-1.5">
                    {agent.alerts.map((alert, i) => (
                      <div key={i} className="flex items-center gap-2 text-red-600 animate-in slide-in-from-left-2 duration-300">
                        <ShieldAlert className="h-3 w-3 shrink-0" />
                        <span className="text-[9px] font-black uppercase tracking-tight">{alert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
