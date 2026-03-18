"use client";

import { useState } from "react";
import { ScrollText, Search, Download, Filter, Terminal, User, ShieldCheck, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { auditLogs } from "@/lib/mock-data/admin";
import { toast } from "sonner";

export default function AuditLogs() {
   const [logs] = useState(auditLogs);
   const [searchTerm, setSearchTerm] = useState("");

   const filteredLogs = logs.filter(l =>
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Search and Stream Control */}
         <Card className="border-primary/10 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-wrap gap-4 items-center">
               <div className="relative flex-1 min-w-75">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                     placeholder="Search audit trail by actor, action or data object..."
                     className="pl-10 h-10 bg-background border-primary/5 text-sm font-medium"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-10 px-4 border-primary/10 text-[10px] font-black uppercase" onClick={() => toast.info("Extended filters opened")}>
                     <Filter className="h-3.5 w-3.5 mr-2" /> Extended filters
                  </Button>
                  <Button className="h-10 px-6 shadow-lg text-[10px] font-black uppercase bg-primary hover:bg-primary/90" onClick={() => toast.success("Exporting logs...")}>
                     <Download className="h-3.5 w-3.5 mr-2" /> Full Export
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Audit Log Streaming Table */}
         <div className="border border-primary/10 rounded-2xl overflow-hidden bg-card shadow-xl relative">
            <div className="p-4 bg-muted/40 border-b border-primary/5 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Live Protocol Stream Active</p>
               </div>
               <p className="text-[10px] font-bold text-muted-foreground/60">Showing {filteredLogs.length} events last 24h</p>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-primary/5 border-b border-primary/10">
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Protocol Index</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Identity Actor</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Action Narrative</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Object</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Network Origin</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                     {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-muted/10 transition-colors group cursor-help">
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                                    <ScrollText className="h-4 w-4 text-primary/60" />
                                 </div>
                                 <p className="text-xs font-mono text-muted-foreground font-bold">{log.timestamp}</p>
                              </div>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-2">
                                 <User className="h-3.5 w-3.5 text-muted-foreground" />
                                 <span className="text-sm font-black tracking-tight">{log.user}</span>
                              </div>
                           </td>
                           <td className="p-4">
                              <Badge variant="outline" className="text-[10px] font-bold border-primary/10 bg-primary/2 text-foreground h-6 px-3">
                                 {log.action}
                              </Badge>
                           </td>
                           <td className="p-4">
                              <p className="text-xs font-mono font-black text-muted-foreground uppercase">{log.target}</p>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/70 italic">
                                 <Terminal className="h-3 w-3" /> {log.ip}
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="p-4 bg-muted/20 border-t border-primary/5 text-center">
               <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 hover:text-primary" onClick={() => toast.info("Loading more logs...")}>
                  Load Historical archives <MoreHorizontal className="h-4 w-4 ml-2" />
               </Button>
            </div>
         </div>

         {/* Compliance Verification Footer */}
         <div className="p-6 rounded-2xl bg-linear-to-r from-emerald-500/5 via-background to-blue-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-6">
               <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-inner">
                  <ShieldCheck className="h-7 w-7" />
               </div>
               <div className="space-y-1">
                  <h4 className="text-sm font-black uppercase italic tracking-tight">Audit integrity verified</h4>
                  <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                     &quot;Log entries are cryptographically signed and stored in immutable volumes. Hash verification confirms zero tamper events in the current data shard.&quot;
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
