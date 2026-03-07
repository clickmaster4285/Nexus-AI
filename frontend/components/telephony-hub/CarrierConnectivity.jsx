"use client";

import { useState } from "react";
import { Radio, ShieldAlert, Globe, Server, Activity, Settings2, RefreshCcw, Power, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { sipTrunks } from "@/lib/mock-data/telephony";
import { cn } from "@/lib/utils";

export default function CarrierConnectivity() {
   const [trunks, setTrunks] = useState(sipTrunks);
   const [isRefreshing, setIsRefreshing] = useState(false);

   const toggleTrunk = (id) => {
      setTrunks(prev => prev.map(t =>
         t.id === id ? { ...t, status: t.status === "Active" ? "Maintenance" : "Active" } : t
      ));
   };

   const handleRefresh = () => {
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 1500);
   };

   return (
      <div className="space-y-6">
         {/* Infrastructure Overview */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { label: "Active SIP Trunks", value: trunks.filter(t => t.status === "Active").length, total: trunks.length, icon: Radio, color: "text-blue-500" },
               { label: "Total Capacity", value: "850", sub: "Concurrent Channels", icon: Server, color: "text-purple-500" },
               { label: "Avg Latency", value: "24ms", sub: "Carrier Network", icon: Activity, color: "text-emerald-500" },
            ].map((stat, idx) => (
               <Card key={idx} className="border-primary/10 shadow-sm transition-all hover:shadow-md group">
                  <CardContent className="p-6 flex items-center gap-4">
                     <div className={cn("p-3 rounded-2xl bg-muted group-hover:scale-110 transition-transform", stat.color)}>
                        <stat.icon className="h-6 w-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-black">{stat.value}{stat.total && <span className="text-sm text-muted-foreground ml-1">/ {stat.total}</span>}</p>
                        <p className="text-[9px] text-muted-foreground font-bold mt-0.5">{stat.sub}</p>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         {/* Trunk Management */}
         <Card className="border-primary/10 shadow-xl overflow-hidden">
            <CardHeader className="p-6 border-b flex flex-row items-center justify-between bg-card/50">
               <div>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Carrier Trunk Registry</CardTitle>
                  <CardDescription className="text-[10px] font-medium">Real-time status and configuration for external SIP gateways.</CardDescription>
               </div>
               <div className="flex gap-2">
                  <Button
                     variant="outline"
                     size="sm"
                     className="h-8 gap-2 text-[10px] font-black border-primary/10"
                     onClick={handleRefresh}
                  >
                     <RefreshCcw className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin")} />
                     {isRefreshing ? "Syncing..." : "Sync Status"}
                  </Button>
                  <Button size="sm" className="h-8 gap-2 text-[10px] font-black shadow-md">
                     <Settings2 className="h-3.5 w-3.5" /> Provision Trunk
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-primary/5">
                  {trunks.map((trunk) => (
                     <div key={trunk.id} className="p-6 flex items-center justify-between hover:bg-muted/10 transition-colors group">
                        <div className="flex items-center gap-6 flex-1">
                           <div className={cn(
                              "h-12 w-12 rounded-2xl flex items-center justify-center border transition-all",
                              trunk.status === "Active" ? "bg-green-500/5 border-green-500/10 text-green-600" : "bg-amber-500/5 border-amber-500/10 text-amber-600"
                           )}>
                              <Globe className="h-6 w-6" />
                           </div>
                           <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                 <h4 className="text-sm font-black tracking-tight">{trunk.carrier}</h4>
                                 <Badge variant="outline" className="text-[8px] font-black uppercase px-1 py-0">{trunk.region}</Badge>
                              </div>
                              <p className="text-[10px] font-mono text-muted-foreground">{trunk.endpoint}</p>
                           </div>
                        </div>

                        <div className="flex items-center gap-12 flex-1">
                           <div className="space-y-1.5 w-32">
                              <div className="flex justify-between text-[9px] font-black uppercase text-muted-foreground">
                                 <span>Utilization</span>
                                 <span className="text-foreground">{trunk.utilization}%</span>
                              </div>
                              <Progress value={trunk.utilization} className="h-1" />
                              <p className="text-[9px] text-muted-foreground font-bold">{trunk.channels} Max Channels</p>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Latency</p>
                              <p className="text-xs font-black">{trunk.latency}</p>
                           </div>
                        </div>

                        <div className="flex items-center gap-3 ml-12">
                           <div className="text-right mr-4">
                              <Badge className={cn(
                                 "text-[9px] font-black uppercase border-none",
                                 trunk.status === "Active" ? "bg-green-500" : "bg-amber-500"
                              )}>
                                 {trunk.status}
                              </Badge>
                           </div>
                           <div className="flex gap-1">
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 className={cn(
                                    "h-9 w-9 rounded-xl transition-all",
                                    trunk.status === "Active" ? "text-amber-500 hover:bg-amber-500/10" : "text-green-500 hover:bg-green-500/10"
                                 )}
                                 onClick={() => toggleTrunk(trunk.id)}
                                 title={trunk.status === "Active" ? "Set to Maintenance" : "Activate"}
                              >
                                 <Power className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl opacity-40 group-hover:opacity-100 transition-opacity">
                                 <MoreVertical className="h-4 w-4" />
                              </Button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Network Alert */}
         <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldAlert className="h-5 w-5" />
               </div>
               <div>
                  <p className="text-xs font-black uppercase tracking-tight">Real-time Redundancy Check</p>
                  <p className="text-[10px] text-muted-foreground font-medium italic">High availability is enabled. Failover gateway in US West is 100% prepared for handoff.</p>
               </div>
            </div>
            <Button variant="link" className="text-[10px] font-black uppercase">Run Redundancy Test</Button>
         </div>
      </div>
   );
}
