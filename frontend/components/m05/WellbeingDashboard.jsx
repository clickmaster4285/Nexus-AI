"use client";

import { ShieldAlert, ArrowUpRight, ArrowDownRight, Settings2, Calendar, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { workforceAgents } from "@/lib/mock-data/workforce";
import { cn } from "@/lib/utils";


export default function WellbeingDashboard() {
   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h2 className="text-xl font-bold tracking-tight">Wellbeing & Burnout Engine</h2>
               <p className="text-xs text-muted-foreground">Proactive monitoring of team health and fatigue levels.</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2 text-xs font-bold">
               <Settings2 className="h-4 w-4" /> Threshold Config
            </Button>
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Wellbeing Status Feed */}
            <div className="xl:col-span-2 space-y-4">
               <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-1">Risk Watchlist</h3>
               <div className="space-y-3">
                  {workforceAgents.sort((a, b) => b.wellbeing.burnoutScore - a.wellbeing.burnoutScore).map((agent) => (
                     <Card key={agent.id} className={cn(
                        "border-primary/10 transition-all hover:shadow-md",
                        agent.wellbeing.burnoutScore > 50 ? "bg-red-500/2" : "bg-card"
                     )}>
                        <CardContent className="p-4">
                           <div className="flex flex-col md:flex-row items-center gap-6">
                              <div className="flex items-center gap-4 min-w-50">
                                 <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs border border-primary/10">
                                    {agent.fullName.split(" ").map(n => n[0]).join("")}
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold">{agent.fullName}</p>
                                    <p className="text-[10px] text-muted-foreground">{agent.team}</p>
                                 </div>
                              </div>

                              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                 <div className="text-center md:text-left space-y-1">
                                    <p className="text-[9px] uppercase font-bold text-muted-foreground">Burnout Score</p>
                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                       <span className={cn(
                                          "text-lg font-black",
                                          agent.wellbeing.burnoutScore > 50 ? "text-red-500" : "text-green-500"
                                       )}>{agent.wellbeing.burnoutScore}</span>
                                       <Badge variant="outline" className={cn(
                                          "text-[10px] py-0 px-2",
                                          agent.wellbeing.riskLevel === "High" ? "bg-red-500/10 text-red-600" : "bg-green-500/10 text-green-600"
                                       )}>{agent.wellbeing.riskLevel}</Badge>
                                    </div>
                                 </div>

                                 <div className="text-center md:text-left space-y-1">
                                    <p className="text-[9px] uppercase font-bold text-muted-foreground">Sentiment Trend</p>
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
                                    <p className="text-[9px] uppercase font-bold text-muted-foreground">Last PTO</p>
                                    <div className="flex items-center justify-center md:justify-start gap-1">
                                       <Calendar className="h-3 w-3 text-muted-foreground" />
                                       <span className="text-xs font-bold">{agent.wellbeing.lastPto}</span>
                                    </div>
                                 </div>

                                 <div className="flex items-center justify-center md:justify-end gap-2">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-600">
                                       <ShieldAlert className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" className="h-8 text-[10px] font-bold">Intervene</Button>
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
               <Card className="border-primary/10 shadow-lg bg-linear-to-b from-card to-secondary/5">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-bold flex items-center justify-between">
                        <span>Burnout Risk Logic</span>
                        <Info className="h-3 w-3 text-muted-foreground" />
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <div className="flex justify-between">
                              <Label className="text-[10px] font-bold uppercase tracking-wider">AHT Variance Weight</Label>
                              <span className="text-[10px] font-bold text-primary">35%</span>
                           </div>
                           <Slider defaultValue={[35]} max={100} step={1} className="py-1" />
                        </div>
                        <div className="space-y-2">
                           <div className="flex justify-between">
                              <Label className="text-[10px] font-bold uppercase tracking-wider">Sentiment Decline</Label>
                              <span className="text-[10px] font-bold text-primary">45%</span>
                           </div>
                           <Slider defaultValue={[45]} max={100} step={1} className="py-1" />
                        </div>
                        <div className="space-y-2">
                           <div className="flex justify-between">
                              <Label className="text-[10px] font-bold uppercase tracking-wider">Attendance Gaps</Label>
                              <span className="text-[10px] font-bold text-primary">20%</span>
                           </div>
                           <Slider defaultValue={[20]} max={100} step={1} className="py-1" />
                        </div>
                     </div>

                     <div className="pt-4 border-t border-dashed space-y-4">
                        <div className="flex items-center justify-between">
                           <div>
                              <p className="text-xs font-bold">Pulse Survey</p>
                              <p className="text-[9px] text-muted-foreground">Automated wellness check-in</p>
                           </div>
                           <Select defaultValue="weekly">
                              <SelectTrigger className="w-25 h-7 text-[10px]">
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="daily">Daily</SelectItem>
                                 <SelectItem value="weekly">Weekly</SelectItem>
                                 <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <Button className="w-full text-xs font-black h-9 shadow-md">Apply Logic Update</Button>
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-red-500/10 bg-red-500/5 shadow-inner">
                  <CardContent className="p-6 text-center space-y-4">
                     <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-md">
                        <ShieldAlert className="h-6 w-6 text-red-500 animate-pulse" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-sm font-black text-red-600 uppercase tracking-tighter">Critical Risk Alert</p>
                        <p className="text-[10px] text-red-900 font-medium leading-relaxed">
                           3 agents have reached a burnout score &gt; 60. Recommendation: Immediate 1-on-1 check-in or mandatory ACW extension.
                        </p>
                     </div>
                     <Button variant="destructive" size="sm" className="w-full h-8 text-[10px] font-black uppercase ring-2 ring-red-500/20">
                        Execute Intervention
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
