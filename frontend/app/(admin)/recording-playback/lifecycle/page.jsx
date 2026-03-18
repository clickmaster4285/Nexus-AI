"use client";

import { toast } from "sonner";
import { HardDrive, ShieldCheck, Trash2, Archive, Lock, Settings, BadgeCheck, History, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { retentionPolicies } from "@/lib/mock-data/recording";
import { cn } from "@/lib/utils";

export default function LifecycleManagement() {
   return (
      <div className="space-y-8">
         {/* Retention Policy Deck */}
         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
               <div className="flex items-center justify-between px-1">
                  <div>
                     <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Active Retention Policies</h3>
                     <p className="text-[10px] text-muted-foreground font-medium italic mt-1">Configure how long interactions are stored before auto-purging.</p>
                  </div>
                  <Button size="sm" className="h-8 gap-2 text-[10px] font-black shadow-md border-primary/20" onClick={() => toast.success("Creating new retention policy...")}>
                     New Policy
                  </Button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {retentionPolicies.map((policy) => (
                     <Card key={policy.id} className="border-primary/10 shadow-md group transition-all hover:border-primary/30 relative overflow-hidden">
                        <CardHeader className="p-5 pb-2">
                           <div className="flex justify-between items-start">
                              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                                 <Database className="h-5 w-5 text-primary" />
                              </div>
                              <Badge variant="outline" className="text-[8px] font-black uppercase border-green-200 text-green-600 px-2 py-0">
                                 {policy.status}
                              </Badge>
                           </div>
                           <div className="mt-4">
                              <CardTitle className="text-md font-black italic uppercase tracking-tighter">{policy.name}</CardTitle>
                              <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-tight font-mono">{policy.duration} Retention</p>
                           </div>
                        </CardHeader>
                        <CardContent className="p-5 pt-2">
                           <p className="text-[11px] leading-relaxed text-muted-foreground h-16 line-clamp-3">
                              {policy.description}
                           </p>
                           <div className="mt-6 flex items-center justify-between pt-4 border-t border-dashed">
                              <div className="flex items-center gap-2">
                                 <span className="text-[9px] font-black uppercase text-muted-foreground">Auto-Archive</span>
                                 <Switch checked={policy.autoArchive} />
                              </div>
                              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => toast.success("Editing policy...")}><Settings className="h-3.5 w-3.5" /></Button>
                                 <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-500/5" onClick={() => toast.success("Deleting policy...")}><Trash2 className="h-3.5 w-3.5" /></Button>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>

            {/* Storage Health & Stats */}
            <div className="space-y-6">
               <Card className="border-primary/20 shadow-xl bg-linear-to-br from-card to-secondary/5 h-full">
                  <CardHeader>
                     <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-primary" /> Storage Infrastructure
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2 space-y-8">
                     <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-background border border-primary/10 shadow-inner space-y-3">
                           <div className="flex justify-between items-end">
                              <span className="text-[10px] font-black uppercase text-muted-foreground">Used Capacity</span>
                              <span className="text-lg font-black">1.2 TB <span className="text-[10px] opacity-40">/ 5 TB</span></span>
                           </div>
                           <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full w-[24%]" />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-center">
                           <div className="p-3 rounded-xl border bg-card/50">
                              <p className="text-[9px] font-black uppercase text-muted-foreground">Total Recordings</p>
                              <p className="text-lg font-black tracking-tight">142,402</p>
                           </div>
                           <div className="p-3 rounded-xl border bg-card/50">
                              <p className="text-[9px] font-black uppercase text-muted-foreground">Daily Purge</p>
                              <p className="text-lg font-black tracking-tight">~140 GB</p>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4 pt-4 border-t border-dashed">
                        <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">Compliance Health</h4>
                        <div className="space-y-2">
                           {[
                              { label: "GDPR Deletion Protocol", status: "Compliant" },
                              { label: "PCI Data Masking", status: "Active" },
                              { label: "SOC2 Access Logs", status: "Verified" }
                           ].map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 rounded-xl border bg-background/50 hover:border-primary/20 transition-all">
                                 <span className="text-[10px] font-bold">{item.label}</span>
                                 <BadgeCheck className="h-3.5 w-3.5 text-green-500" />
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="pt-4">
                        <Button variant="outline" className="w-full h-11 text-[11px] font-black uppercase shadow-sm gap-2" onClick={() => toast.success("Audit logs downloaded.")}>
                           <ShieldCheck className="h-4 w-4" /> Download Audit Logs
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Global Lifecyle Log */}
         <Card className="border-primary/10 shadow-lg">
            <CardHeader className="p-6 border-b flex flex-row items-center justify-between">
               <div className="space-y-1">
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">System Lifecycle Events</CardTitle>
                  <CardDescription className="text-[10px] font-medium">Real-time log of background storage and compliance actions.</CardDescription>
               </div>
               <History className="h-5 w-5 text-muted-foreground opacity-30" />
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-primary/5">
                  {[
                     { action: "Policy Purge", target: "Standard Audio", count: "1,204 Files Deleted", time: "2 min ago", icon: Trash2, color: "text-red-500" },
                     { action: "Legal Hold Applied", target: "Interaction #49202", count: "Manual Override", time: "14 min ago", icon: Lock, color: "text-amber-500" },
                     { action: "Auto-Archive", target: "Financial Data", count: "482 Files Migrated", time: "1h ago", icon: Archive, color: "text-blue-500" },
                     { action: "Integrity Check", target: "Storage Node B", count: "Pass (No errors)", time: "3h ago", icon: BadgeCheck, color: "text-green-500" },
                  ].map((log, idx) => (
                     <div key={idx} className="p-5 flex items-center justify-between hover:bg-muted/5 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className={cn("h-10 w-10 rounded-xl bg-muted/40 flex items-center justify-center", log.color)}>
                              <log.icon className="h-5 w-5" />
                           </div>
                           <div>
                              <p className="text-sm font-black tracking-tight">{log.action}</p>
                              <p className="text-[10px] text-muted-foreground font-medium">{log.target} • {log.count}</p>
                           </div>
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground opacity-60 font-black italic">{log.time}</span>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
