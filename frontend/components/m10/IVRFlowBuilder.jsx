"use client";

import { useState } from "react";
import { GitBranch, Plus, Play, MoreVertical, Zap, Clock, ChevronRight, Edit3, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ivrFlows } from "@/lib/mock-data/telephony";
import { cn } from "@/lib/utils";

export default function IVRFlowBuilder() {
   const [flows, setFlows] = useState(ivrFlows);

   const toggleStatus = (id) => {
      setFlows(prev => prev.map(f =>
         f.id === id ? { ...f, status: f.status === "Published" ? "Draft" : "Published" } : f
      ));
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between px-1">
            <div>
               <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">IVR Routing Strategy</h3>
               <p className="text-[10px] text-muted-foreground font-medium italic mt-1">Design and deploy high-conversion voice navigation flows.</p>
            </div>
            <Button size="sm" className="h-9 gap-2 text-[10px] font-black shadow-lg bg-primary hover:bg-primary/90">
               <Plus className="h-4 w-4" /> Create New Flow
            </Button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {flows.map((flow) => (
               <Card key={flow.id} className="border-primary/10 shadow-md group transition-all hover:border-primary/30 relative overflow-hidden bg-card">
                  <div className={cn(
                     "absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full opacity-5 group-hover:opacity-10 transition-opacity",
                     flow.status === "Published" ? "bg-green-500" : "bg-amber-500"
                  )} />

                  <CardHeader className="p-5 pb-2">
                     <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                           <GitBranch className="h-5 w-5 text-primary" />
                        </div>
                        <Badge className={cn(
                           "text-[8px] font-black uppercase px-2 py-0 border-none",
                           flow.status === "Published" ? "bg-green-500 shadow-green-500/20" : "bg-amber-500 shadow-amber-500/20"
                        )}>
                           {flow.status}
                        </Badge>
                     </div>
                     <div className="mt-4">
                        <CardTitle className="text-md font-black tracking-tight">{flow.name}</CardTitle>
                        <p className="text-[10px] text-muted-foreground font-mono mt-1">{flow.id} • Version {flow.version}</p>
                     </div>
                  </CardHeader>

                  <CardContent className="p-5 pt-4">
                     <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-muted/40 space-y-1">
                           <p className="text-[9px] font-black uppercase text-muted-foreground">Logic Nodes</p>
                           <p className="text-xl font-black">{flow.nodes}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/40 space-y-1 text-right">
                           <p className="text-[9px] font-black uppercase text-muted-foreground">Efficiency</p>
                           <p className="text-xl font-black text-primary">{flow.efficiency ? `${flow.efficiency}%` : "N/A"}</p>
                        </div>
                     </div>

                     <div className="flex items-center justify-between pt-4 border-t border-dashed">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                           <Clock className="h-3.5 w-3.5" /> Updated {flow.lastModified}
                        </div>
                        <div className="flex gap-1">
                           <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                              title="Open Visual Builder"
                           >
                              <Edit3 className="h-4 w-4" />
                           </Button>
                           <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                 "h-8 w-8 rounded-lg transition-all",
                                 flow.status === "Published" ? "text-amber-500 hover:bg-amber-500/10" : "text-green-500 hover:bg-green-500/10"
                              )}
                              onClick={() => toggleStatus(flow.id)}
                              title={flow.status === "Published" ? "Unpublish" : "Publish"}
                           >
                              <Play className="h-4 w-4 fill-current" />
                           </Button>
                           <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-40 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}

            <Card className="border-dashed border-2 border-primary/10 bg-primary/2 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center p-8 group h-full min-h-55">
               <Layers className="h-8 w-8 text-muted-foreground mb-3 group-hover:scale-110 transition-transform" />
               <p className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Import Template</p>
            </Card>
         </div>

         {/* AI Automation Tip */}
         <div className="p-6 rounded-2xl bg-linear-to-br from-primary/10 via-background to-secondary/5 border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <Zap className="h-24 w-24 text-primary" />
            </div>
            <div className="relative z-10 flex items-start gap-4">
               <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg shrink-0">
                  <Zap className="h-5 w-5 text-primary-foreground fill-current" />
               </div>
               <div className="space-y-4">
                  <div className="space-y-1">
                     <h4 className="text-lg font-black tracking-tight uppercase italic">Flow Intelligence Insight</h4>
                     <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl italic">
                        &quot;Our AI analysis shows a 15% drop-off at the &apos;Agent Selection&apos; node in your **Main Welcome Flow**. We recommend introducing a &apos;Wait Time Prediction&apos; message to increase containment.&quot;
                     </p>
                  </div>
                  <Button variant="outline" className="h-10 gap-2 font-black uppercase tracking-tight shadow-md border-primary/20 hover:bg-primary hover:text-white transition-all">
                     Auto-Optimize Flow <ChevronRight className="h-4 w-4" />
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
