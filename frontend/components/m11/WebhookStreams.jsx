"use client";

import { useState } from "react";
import { Radio, Plus, Play, Pause, Trash2, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { webhooks, webhookLogs } from "@/lib/mock-data/integrations";
import { cn } from "@/lib/utils";

export default function WebhookStreams() {
   const [streams, setStreams] = useState(webhooks);

   const toggleStatus = (id) => {
      setStreams(prev => prev.map(s =>
         s.id === id ? { ...s, status: s.status === "Active" ? "Paused" : "Active" } : s
      ));
   };

   return (
      <div className="space-y-8 animate-in fade-in duration-500">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Webhook Registry */}
            <div className="lg:col-span-2 space-y-6">
               <div className="flex items-center justify-between px-2">
                  <div>
                     <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Outbound Streams</h2>
                     <p className="text-[10px] text-muted-foreground font-medium italic">Push real-time interaction events to your custom endpoints.</p>
                  </div>
                  <Button size="sm" className="h-9 gap-2 text-[10px] font-black bg-primary">
                     <Plus className="h-4 w-4" /> Create Webhook
                  </Button>
               </div>

               <div className="space-y-4">
                  {streams.map((stream) => (
                     <Card key={stream.id} className="border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden group shadow-md hover:shadow-lg transition-all">
                        <CardContent className="p-0">
                           <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="flex items-start gap-4">
                                 <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center border border-primary/10 transition-colors",
                                    stream.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"
                                 )}>
                                    <Radio className={cn("h-5 w-5", stream.status === "Active" && "animate-pulse")} />
                                 </div>
                                 <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                       <p className="text-sm font-black tracking-tight">{stream.event}</p>
                                       <Badge variant="outline" className="text-[8px] font-black h-4 px-1 border-primary/10">{stream.id}</Badge>
                                    </div>
                                    <p className="text-[10px] font-mono text-muted-foreground truncate max-w-75">{stream.url}</p>
                                 </div>
                              </div>

                              <div className="flex items-center gap-8">
                                 <div className="text-right">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Success Rate</p>
                                    <div className="flex items-center gap-2">
                                       <span className="text-xs font-black">{stream.successRate}%</span>
                                       <div className="w-16 h-1 bg-primary/5 rounded-full overflow-hidden">
                                          <div className="h-full bg-green-500" style={{ width: `${stream.successRate}%` }} />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="text-right min-w-16">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Latency</p>
                                    <p className="text-xs font-black">{stream.latency}</p>
                                 </div>
                                 <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                                       onClick={() => toggleStatus(stream.id)}
                                    >
                                       {stream.status === "Active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-500/5">
                                       <Trash2 className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>

               {/* Developer Tip */}
               <Card className="border-dashed border-primary/10 bg-primary/2">
                  <CardContent className="p-6 flex items-start gap-4">
                     <Terminal className="h-5 w-5 text-primary mt-0.5" />
                     <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-tight">API Payload Explorer</p>
                        <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                           All Nexus webhooks carry a <span className="font-bold text-foreground font-mono">X-Nexus-Signature</span> header. Use our SDK to verify HMAC-SHA256 signatures and prevent spoofing.
                        </p>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Real-time Delivery Log */}
            <div className="space-y-6">
               <div className="px-2">
                  <h2 className="text-sm font-black uppercase tracking-widest ">Live Delivery logs</h2>
                  <p className="text-[10px] text-muted-foreground font-medium italic">Active traffic monitoring.</p>
               </div>

               <Card className="border-primary/10 bg-card shadow-xl h-140 flex flex-col relative overflow-hidden text-sm">
                  <div className="absolute top-0 inset-x-0 h-16 bg-linear-to-b from-card to-transparent z-10 pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-card to-transparent z-10 pointer-events-none" />

                  <CardContent className="p-4 pt-8 space-y-4 overflow-y-auto no-scrollbar relative z-0">
                     {webhookLogs.map((log, i) => (
                        <div key={i} className="p-3 rounded-xl bg-primary/2 border border-primary/5 space-y-2 hover:bg-primary/5 transition-colors cursor-help">
                           <div className="flex justify-between items-start">
                              <Badge className={cn(
                                 "text-[8px] font-black uppercase px-2 py-0 border-none",
                                 log.status < 300 ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"
                              )}>
                                 HTTP {log.status}
                              </Badge>
                              <span className="text-[9px] font-mono text-muted-foreground">{log.time}</span>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black tracking-tight">{log.event}</p>
                              <div className="flex items-center justify-between text-[9px] text-muted-foreground/70">
                                 <span className="truncate max-w-30 font-mono">{log.target}</span>
                                 <span className="font-bold">{log.duration}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                     <div className="text-center py-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Waiting for traffic...</p>
                     </div>
                  </CardContent>

                  <div className="p-4 border-t border-primary/5 bg-muted/20 mt-auto">
                     <Button variant="outline" className="w-full text-[9px] font-black uppercase h-9 border-primary/10">
                        Clear Console History
                     </Button>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   );
}
