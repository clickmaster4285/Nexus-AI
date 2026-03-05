"use client";

import { useState } from "react";
import { Link2, RefreshCw, Settings2, ShieldCheck, Plus, XCircle, Cloud, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { crmConnectors } from "@/lib/mock-data/integrations";
import { cn } from "@/lib/utils";

export default function CRMConnectors() {
   const [connectors, setConnectors] = useState(crmConnectors);

   const toggleConnection = (id) => {
      setConnectors(prev => prev.map(c => {
         if (c.id === id) {
            if (c.status === "Connected") return { ...c, status: "Available", lastSync: null };
            if (c.status === "Available" || c.status === "Disconnected") return { ...c, status: "Connected", lastSync: "Just now" };
         }
         return c;
      }));
   };

   return (
      <div className="space-y-8 animate-in fade-in duration-500">
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Ecosystem Registry</h2>
               <p className="text-[11px] text-muted-foreground italic font-medium">Bi-directional data synchronization with leading CRM and Helpdesk suites.</p>
            </div>
            <Button size="sm" className="h-9 gap-2 text-[10px] font-black uppercase shadow-lg bg-primary hover:bg-primary/90">
               <Plus className="h-4 w-4" /> Request Custom Integration
            </Button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectors.map((crm) => (
               <Card key={crm.id} className="border-primary/10 bg-card/50 backdrop-blur-sm shadow-lg hover:border-primary/20 transition-all group overflow-hidden">
                  <CardHeader className="p-6 pb-2">
                     <div className="flex justify-between items-start">
                        <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                           <div className="text-xl font-black text-primary uppercase">{crm.name[0]}</div>
                        </div>
                        <Badge className={cn(
                           "text-[8px] font-black uppercase border-none px-2",
                           crm.status === "Connected" ? "bg-green-500/10 text-green-600" :
                              crm.status === "Disconnected" ? "bg-red-500/10 text-red-500" : "bg-muted text-muted-foreground"
                        )}>
                           {crm.status}
                        </Badge>
                     </div>
                     <div className="mt-4">
                        <CardTitle className="text-lg font-black tracking-tight">{crm.name}</CardTitle>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">{crm.type}</p>
                     </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-4 space-y-6">
                     <div className="space-y-3">
                        <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Active Objects</p>
                        <div className="flex flex-wrap gap-1.5">
                           {crm.objects.length > 0 ? crm.objects.map((obj, i) => (
                              <Badge key={i} variant="secondary" className="text-[8px] font-bold h-5 px-2 bg-primary/10 border-none text-primary">
                                 {obj}
                              </Badge>
                           )) : <span className="text-[10px] italic text-muted-foreground/60">No objects mapped</span>}
                        </div>
                     </div>

                     {crm.lastSync && (
                        <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground">
                           <RefreshCw className="h-3 w-3 animate-spin-slow" /> Checked {crm.lastSync}
                        </div>
                     )}

                     <div className="pt-4 border-t border-dashed border-primary/10 flex gap-2">
                        <Button
                           size="sm"
                           className={cn(
                              "flex-1 h-9 text-[10px] font-black uppercase tracking-widest",
                              crm.status === "Connected" ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" : "bg-primary text-white"
                           )}
                           variant={crm.status === "Connected" ? "outline" : "default"}
                           onClick={() => toggleConnection(crm.id)}
                        >
                           {crm.status === "Connected" ? (
                              <>
                                 <Settings2 className="h-3.5 w-3.5 mr-2" /> Configure
                              </>
                           ) : (
                              <>
                                 <Link2 className="h-3.5 w-3.5 mr-2" /> Connect
                              </>
                           )}
                        </Button>
                        {crm.status === "Connected" && (
                           <Button variant="outline" size="icon" className="h-9 w-9 border-primary/10 text-red-500 hover:bg-red-500/5" onClick={() => toggleConnection(crm.id)}>
                              <XCircle className="h-4 w-4" />
                           </Button>
                        )}
                     </div>
                  </CardContent>
               </Card>
            ))}

            <Card className="border-dashed border-2 border-primary/10 bg-primary/2 flex flex-col items-center justify-center p-8 group cursor-pointer hover:bg-primary/5 transition-all">
               <Cloud className="h-10 w-10 text-muted-foreground opacity-40 mb-3 group-hover:scale-110 transition-transform" />
               <p className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">Browse App Directory</p>
            </Card>
         </div>

         {/* Sync Intelligence Alert */}
         <div className="p-6 rounded-2xl bg-linear-to-r from-green-500/10 via-background to-blue-500/10 border border-green-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-600 shrink-0">
                     <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-sm font-black uppercase italic tracking-tight">Sync Health Optimized</h4>
                     <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl font-medium">
                        &quot;Data integrity is at <span className="text-foreground font-black">99.9%</span> across all connected CRM environments. Automated de-duplication resolved 42 potential record conflicts in the last 24 hours.&quot;
                     </p>
                  </div>
               </div>
               <Button variant="outline" className="h-10 gap-2 font-black uppercase tracking-widest border-green-500/20 text-green-600 hover:bg-green-500/5">
                  Audit Logs <ChevronRight className="h-4 w-4" />
               </Button>
            </div>
         </div>
      </div>
   );
}
