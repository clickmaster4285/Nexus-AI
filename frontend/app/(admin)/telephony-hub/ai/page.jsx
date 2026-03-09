"use client";

import { useState } from "react";
import { Bot, Link2, RefreshCw, Settings2, ShieldCheck, Plus, XCircle, Cloud, ChevronRight, Zap, Check, Key } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { aiConnectors } from "@/lib/mock-data/telephony";
import { cn } from "@/lib/utils";

export default function ConnectorConfiguration() {
   const [connectors, setConnectors] = useState(aiConnectors);
   const [configTarget, setConfigTarget] = useState(null);

   const toggleConnection = (id) => {
      setConnectors(prev => prev.map(c => {
         if (c.id === id) {
            if (c.status === "Connected" || c.status === "Active") return { ...c, status: "Disconnected", lastUsed: null };
            return { ...c, status: "Connected", lastUsed: "Just now" };
         }
         return c;
      }));
   };

   return (
      <div className="space-y-8 animate-in fade-in duration-500">
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Conversational AI Nodes</h2>
               <p className="text-[11px] text-muted-foreground italic font-medium">Configure external NLU engines and virtual agent endpoints.</p>
            </div>
            <Button size="sm" className="h-9 gap-2 text-[10px] font-black uppercase shadow-lg bg-primary hover:bg-primary/90">
               <Plus className="h-4 w-4" /> Provision AI Connector
            </Button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectors.map((ai) => (
               <Card key={ai.id} className="border-primary/10 bg-card/50 backdrop-blur-sm shadow-lg hover:border-primary/20 transition-all group overflow-hidden">
                  <CardHeader className="p-6 pb-2">
                     <div className="flex justify-between items-start">
                        <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                           <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <Badge className={cn(
                           "text-[8px] font-black uppercase border-none px-2",
                           (ai.status === "Connected" || ai.status === "Active") ? "bg-green-500/10 text-green-600" :
                              ai.status === "Disconnected" ? "bg-red-500/10 text-red-500" : "bg-muted text-muted-foreground"
                        )}>
                           {ai.status}
                        </Badge>
                     </div>
                     <div className="mt-4">
                        <CardTitle className="text-lg font-black tracking-tight">{ai.provider}</CardTitle>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">{ai.type}</p>
                     </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-4 space-y-6">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Region</p>
                           <p className="text-xs font-bold">{ai.region}</p>
                        </div>
                        <div className="space-y-1 text-right">
                           <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Latency</p>
                           <p className="text-xs font-black text-primary">{ai.latency}</p>
                        </div>
                     </div>

                     {ai.lastUsed && (
                        <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground">
                           <RefreshCw className="h-3 w-3 animate-spin-slow" /> Active session {ai.lastUsed}
                        </div>
                     )}

                     <div className="pt-4 border-t border-dashed border-primary/10 flex gap-2">
                        <Button
                           size="sm"
                           className={cn(
                              "flex-1 h-9 text-[10px] font-black uppercase tracking-widest",
                              (ai.status === "Connected" || ai.status === "Active") ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" : "bg-primary text-white"
                           )}
                           variant={(ai.status === "Connected" || ai.status === "Active") ? "outline" : "default"}
                           onClick={() => {
                              if (ai.status === "Connected" || ai.status === "Active") setConfigTarget(ai);
                              else toggleConnection(ai.id);
                           }}
                        >
                           {(ai.status === "Connected" || ai.status === "Active") ? (
                              <>
                                 <Settings2 className="h-3.5 w-3.5 mr-2" /> Configure
                              </>
                           ) : (
                              <>
                                 <Link2 className="h-3.5 w-3.5 mr-2" /> Connect
                              </>
                           )}
                        </Button>
                        {(ai.status === "Connected" || ai.status === "Active") && (
                           <Button variant="outline" size="icon" className="h-9 w-9 border-primary/10 text-red-500 hover:bg-red-500/5" onClick={() => toggleConnection(ai.id)}>
                              <XCircle className="h-4 w-4" />
                           </Button>
                        )}
                     </div>
                  </CardContent>
               </Card>
            ))}

            <Card className="border-dashed border-2 border-primary/10 bg-primary/2 flex flex-col items-center justify-center p-8 group cursor-pointer hover:bg-primary/5 transition-all">
               <Cloud className="h-10 w-10 text-muted-foreground opacity-40 mb-3 group-hover:scale-110 transition-transform" />
               <p className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Explore Marketplace</p>
            </Card>
         </div>

         {/* AI Processing Alert */}
         <div className="p-6 rounded-2xl bg-linear-to-r from-purple-500/10 via-background to-blue-500/10 border border-purple-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-600 shrink-0">
                     <Zap className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-sm font-black uppercase italic tracking-tight">Low-Latency Processing Enabled</h4>
                     <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl font-medium">
                        &quot;AI stream handoff is currently bypassing regional gateways to optimize for <span className="text-foreground font-black">150ms round-trip</span> targets. STT accuracy is maintaining 98.2% across active nodes.&quot;
                     </p>
                  </div>
               </div>
               <Button variant="outline" className="h-10 gap-2 font-black uppercase tracking-widest border-purple-500/20 text-purple-600 hover:bg-purple-500/5">
                  View Metrics <ChevronRight className="h-4 w-4" />
               </Button>
            </div>
         </div>

         {/* Configuration Dialog */}
         <Dialog open={!!configTarget} onOpenChange={() => setConfigTarget(null)}>
            <DialogContent className="min-w-2xl p-0 overflow-hidden border-primary/20 shadow-2xl">
               <DialogHeader className="p-8 bg-primary/5 border-b flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl">
                        <Bot className="h-6 w-6" />
                     </div>
                     <div>
                        <DialogTitle className="text-2xl font-black tracking-tighter uppercase">{configTarget?.provider} <span className="text-muted-foreground/50 font-mono ml-2">v4.1</span></DialogTitle>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Conversational AI Framework Configuration</p>
                     </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-none font-black uppercase text-[10px]">Active Node</Badge>
               </DialogHeader>

               <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div className="space-y-4">
                           <h4 className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                              <Key className="h-4 w-4" /> Authentication Keys
                           </h4>
                           <div className="space-y-4 p-4 rounded-2xl bg-muted/30 border border-primary/5">
                              <div className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase">API Key / Project ID</Label>
                                 <Input type="password" value="********-****-****-****-************" className="h-9 font-mono text-xs" readOnly />
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase">Service Account JSON</Label>
                                 <Button variant="outline" className="w-full h-9 text-[10px] font-black uppercase">Update Credentials</Button>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <h4 className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                              <Settings2 className="h-4 w-4" /> Processing Logic
                           </h4>
                           <div className="space-y-4 p-4 rounded-2xl bg-muted/30 border border-primary/5">
                              <div className="flex items-center justify-between">
                                 <div className="space-y-0.5">
                                    <Label className="text-[11px] font-black uppercase">Sentiment Analysis</Label>
                                    <p className="text-[10px] text-muted-foreground font-medium italic">Push live sentiment per turn</p>
                                 </div>
                                 <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                 <div className="space-y-0.5">
                                    <Label className="text-[11px] font-black uppercase">Auto-Summary</Label>
                                    <p className="text-[10px] text-muted-foreground font-medium italic">Generate summary on disconnect</p>
                                 </div>
                                 <Switch defaultChecked />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-4">
                           <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground text-center">Inbound Handoff Logic</h4>
                           <div className="space-y-3">
                              {[
                                 { nexus: "Trigger", val: "IVR_ESCALATION" },
                                 { nexus: "Intent", val: "TECHNICAL_SUPPORT" },
                                 { nexus: "Context", val: "PERSISTENT_STATE" },
                              ].map((item, i) => (
                                 <div key={i} className="flex items-center gap-3 text-xs p-3 rounded-xl border border-dashed border-primary/10 bg-background/50">
                                    <div className="flex-1 font-bold text-primary">{item.nexus}</div>
                                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                    <div className="flex-1 font-mono text-[10px] text-muted-foreground">{item.val}</div>
                                 </div>
                              ))}
                           </div>
                        </div>
                        
                        <div className="p-4 rounded-2xl bg-linear-to-r from-blue-500/5 to-blue-500/10 border border-blue-500/10 flex items-start gap-4">
                           <ShieldCheck className="h-5 w-5 text-blue-500 mt-1" />
                           <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                              All AI traffic is encrypted via <span className="text-foreground font-black">TLS 1.3</span> and follows GDPR/HIPAA data residency rules for the <span className="text-foreground font-black">{configTarget?.region}</span> region.
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-dashed border-primary/10">
                     <Button variant="ghost" onClick={() => setConfigTarget(null)} className="h-10 text-[10px] font-black uppercase tracking-widest">Cancel</Button>
                     <Button onClick={() => setConfigTarget(null)} className="h-10 px-8 bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-2">
                        <Check className="h-4 w-4" /> Commit Framework
                     </Button>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
}
