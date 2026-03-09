"use client";

import { ShieldAlert, ShieldCheck, Activity, Globe, Lock, AlertTriangle, Terminal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { securityMetrics } from "@/lib/mock-data/security";
import { cn } from "@/lib/utils";

export default function SecurityMonitoring() {
   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Top Level Security Status */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
               { label: "Threat Level", value: securityMetrics.threatLevel, icon: ShieldAlert, color: "text-green-500", bg: "bg-green-500/10" },
               { label: "Active Alerts", value: securityMetrics.activeAlerts, icon: AlertTriangle, color: "text-blue-500", bg: "bg-blue-500/10" },
               { label: "Health Score", value: `${securityMetrics.healthScore}%`, icon: ShieldCheck, color: "text-primary", bg: "bg-primary/10" },
               { label: "Last System Scan", value: securityMetrics.lastScan, icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10" },
            ].map((stat, idx) => (
               <Card key={idx} className="border-primary/10 shadow-sm border-l-4 overflow-hidden" style={{ borderLeftColor: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : idx === 2 ? '#6366f1' : '#a855f7' }}>
                  <CardContent className="p-4 flex items-center gap-4">
                     <div className={cn("p-2 rounded-xl", stat.bg, stat.color)}>
                        <stat.icon className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                        <p className="text-xl font-black">{stat.value}</p>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Real-time Event Stream */}
            <Card className="lg:col-span-2 border-primary/10 shadow-lg overflow-hidden flex flex-col">
               <CardHeader className="p-6 border-b bg-muted/40 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                     <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Live Access Protocol</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary">View Full Logs</Button>
               </CardHeader>
               <CardContent className="p-0 flex-1">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="bg-primary/5 border-b border-primary/10">
                              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Event Type</th>
                              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Identity Actor</th>
                              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Network Origin</th>
                              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Timestamp</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                           {securityMetrics.events.map((event) => (
                              <tr key={event.id} className="hover:bg-muted/10 transition-colors group cursor-help">
                                 <td className="p-4">
                                    <div className="flex items-center gap-3">
                                       <Badge className={cn(
                                          "text-[9px] font-black uppercase border-none px-2",
                                          event.status === "Success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"
                                       )}>
                                          {event.type}
                                       </Badge>
                                    </div>
                                 </td>
                                 <td className="p-4">
                                    <div className="flex items-center gap-2">
                                       <span className="text-sm font-black tracking-tight">{event.user}</span>
                                    </div>
                                 </td>
                                 <td className="p-4">
                                    <div className="space-y-0.5">
                                       <p className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1">
                                          <Terminal className="h-3 w-3" /> {event.ip}
                                       </p>
                                       <p className="text-[9px] font-medium text-muted-foreground/60 italic">{event.location}</p>
                                    </div>
                                 </td>
                                 <td className="p-4 text-right">
                                    <span className="text-[10px] font-bold text-muted-foreground italic">{event.time}</span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>

            {/* Geographic Integrity */}
            <div className="space-y-6">
               <Card className="border-primary/10 shadow-lg relative overflow-hidden">
                  <div className="absolute -top-3 right-0 p-8 opacity-60">
                     <Globe className="h-12 w-12" />
                  </div>
                  <CardHeader className="p-6 bg-primary/2 border-b">
                     <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Geographic Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     {securityMetrics.loginsByRegion.map((region, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between items-center text-[10px] font-black uppercase italic">
                              <span>{region.region}</span>
                              <span className={cn(region.status === "Normal" ? "text-primary" : "text-amber-500")}>
                                 {region.count.toLocaleString()} Hits
                              </span>
                           </div>
                           <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden">
                              <div
                                 className={cn("h-full transition-all duration-1000", region.status === "Normal" ? "bg-primary" : "bg-amber-500")}
                                 style={{ width: `${(region.count / 1500) * 100}%` }}
                              />
                           </div>
                        </div>
                     ))}

                     <div className="pt-4 border-t border-dashed">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                           <Lock className="h-4 w-4 text-primary mt-0.5" />
                           <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                              &quot;Access from high-risk regions is automatically subjected to increased MFA friction.&quot;
                           </p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Security Insight */}
               <Card className="border-primary/5 bg-linear-to-br from-primary to-indigo-600 text-white shadow-xl">
                  <CardContent className="p-6 space-y-4">
                     <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-white" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-xl font-black tracking-tighter uppercase italic">SOC2 Hardened</p>
                        <p className="text-[10px] opacity-80 font-medium leading-relaxed italic">
                           The Nexus platform environment is cryptographically isolated. All system binaries are signed and verified pre-execution.
                        </p>
                     </div>
                     <Button className="w-full h-9 bg-white text-primary rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/90 shadow-xl">
                        Security Documentation
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
