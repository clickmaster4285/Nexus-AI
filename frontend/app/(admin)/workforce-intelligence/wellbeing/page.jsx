"use client";

import { toast } from "sonner";
import { ShieldAlert, ArrowUpRight, ArrowDownRight, Settings2, Calendar, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { workforceAgents } from "@/lib/mock-data/workforce";
import { cn } from "@/lib/utils";

export default function WellbeingPage() {
  return (
    <div className="space-y-6 p-1">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Wellbeing & Burnout Engine</h2>
          <p className="text-xs text-muted-foreground font-medium italic">Proactive monitoring of team health and fatigue levels.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs font-bold shadow-sm" onClick={() => toast.success("Opening threshold configuration...")}>
          <Settings2 className="h-4 w-4" /> Threshold Config
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Wellbeing Status Feed */}
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground px-1">Risk Watchlist</h3>
          <div className="space-y-3">
            {workforceAgents.sort((a, b) => b.wellbeing.burnoutScore - a.wellbeing.burnoutScore).map((agent) => (
              <Card key={agent.id} className={cn(
                "border-primary/10 transition-all hover:shadow-md group",
                agent.wellbeing.burnoutScore > 50 ? "bg-red-500/5 dark:bg-red-500/10 border-red-500/20" : "bg-card shadow-sm"
              )}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-4 min-w-50">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-black text-xs border border-primary/10 shadow-inner group-hover:scale-110 transition-transform">
                        {agent.fullName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold truncate">{agent.fullName}</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{agent.team}</p>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                      <div className="text-center md:text-left space-y-1">
                        <p className="text-[9px] uppercase font-black text-muted-foreground tracking-widest">Burnout Score</p>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <span className={cn(
                            "text-lg font-black font-mono",
                            agent.wellbeing.burnoutScore > 50 ? "text-red-500" : "text-green-500"
                          )}>{agent.wellbeing.burnoutScore}</span>
                          <Badge variant="outline" className={cn(
                            "text-[10px] py-0 px-2 font-bold shadow-sm",
                            agent.wellbeing.riskLevel === "High" ? "bg-red-500/10 text-red-600 border-transparent" : "bg-green-500/10 text-green-600 border-transparent"
                          )}>{agent.wellbeing.riskLevel}</Badge>
                        </div>
                      </div>

                      <div className="text-center md:text-left space-y-1">
                        <p className="text-[9px] uppercase font-black text-muted-foreground tracking-widest">Sentiment Trend</p>
                        <div className="flex items-center justify-center md:justify-start gap-1">
                          {agent.wellbeing.sentimentTrend === "Positive" ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-xs font-bold">{agent.wellbeing.sentimentTrend}</span>
                        </div>
                      </div>

                      <div className="text-center md:text-left space-y-1">
                        <p className="text-[9px] uppercase font-black text-muted-foreground tracking-widest">Last PTO</p>
                        <div className="flex items-center justify-center md:justify-start gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-bold font-mono">{agent.wellbeing.lastPto}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center md:justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-600 rounded-full" onClick={() => toast.success("Flagging risk for follow-up...")}>
                          <ShieldAlert className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest shadow-sm" onClick={() => toast.success("Executing wellbeing intervention...")}>Intervene</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Global Config & Insights */}
        <div className="space-y-6">
          <Card className="border-primary/10 shadow-lg bg-linear-to-b from-card to-secondary/5 overflow-hidden">
            <CardHeader className="pb-2 bg-primary/5 border-b">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center justify-between">
                <span>Burnout Risk Logic</span>
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">AHT Variance Weight</Label>
                    <span className="text-[10px] font-black text-primary font-mono">35%</span>
                  </div>
                  <Slider defaultValue={[35]} max={100} step={1} className="py-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sentiment Decline</Label>
                    <span className="text-[10px] font-black text-primary font-mono">45%</span>
                  </div>
                  <Slider defaultValue={[45]} max={100} step={1} className="py-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Attendance Gaps</Label>
                    <span className="text-[10px] font-black text-primary font-mono">20%</span>
                  </div>
                  <Slider defaultValue={[20]} max={100} step={1} className="py-1" />
                </div>
              </div>

              <div className="pt-4 border-t border-dashed space-y-4">
                <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg border border-dashed border-primary/10">
                  <div className="space-y-0.5">
                    <p className="text-xs font-black uppercase tracking-widest">Pulse Survey</p>
                    <p className="text-[9px] text-muted-foreground font-medium italic">Automated wellness check-in</p>
                  </div>
                  <Select defaultValue="weekly">
                    <SelectTrigger className="w-25 h-7 text-[10px] font-bold bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full text-xs font-black uppercase tracking-widest h-10 shadow-lg shadow-primary/10" onClick={() => toast.success("Burnout logic weights updated successfully!")}>Apply Logic Update</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/10 bg-red-500/5 shadow-inner overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -mr-8 -mt-8 blur-2xl" />
            <CardContent className="p-6 text-center space-y-4 relative z-10">
              <div className="h-12 w-12 bg-white dark:bg-red-950/20 rounded-full flex items-center justify-center mx-auto shadow-md border border-red-500/10">
                <ShieldAlert className="h-6 w-6 text-red-500 animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-red-600 uppercase tracking-tighter italic underline decoration-2 underline-offset-4">Critical Risk Alert</p>
                <p className="text-[10px] text-red-900 dark:text-red-200/80 font-medium leading-relaxed italic">
                  3 agents have reached a burnout score &gt; 60. Recommendation: Immediate 1-on-1 check-in or mandatory ACW extension for cooling.
                </p>
              </div>
              <Button variant="destructive" size="sm" className="w-full h-9 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20" onClick={() => toast.success("Batch intervention executed for high-risk agents.")}>
                Execute Intervention
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
