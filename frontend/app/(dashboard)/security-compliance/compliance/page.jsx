"use client";

import { CheckCircle2, Clock, FileText, ExternalLink, Shield, Target, Award, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { compliancePacks } from "@/lib/mock-data/security";
import { cn } from "@/lib/utils";

export default function ComplianceFrameworks() {
   return (
      <div className="space-y-8 animate-in fade-in duration-500">
         {/* Compliance Overview */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-primary/10 shadow-2xl relative overflow-hidden bg-linear-to-br from-card to-background">
               <div className="absolute top-0 right-0 p-12 opacity-90">
                  <Shield className="h-48 w-48 text-primary" />
               </div>
               <CardContent className="p-10 space-y-8">
                  <div>
                     <h2 className="text-3xl font-black tracking-tighter uppercase italic">Governance Logic</h2>
                     <p className="text-[11px] text-muted-foreground font-medium italic mt-1">Platform-wide regulatory readiness and audit tracking.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Global Readiness</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-black tracking-tight text-primary">94%</span>
                           <Badge className="bg-green-500/10 text-green-600 border-none text-[8px] font-black uppercase">High</Badge>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Open Controls</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-black tracking-tight text-amber-500">4</span>
                           <Badge variant="outline" className="border-primary/10 text-[8px] font-black uppercase">In Progress</Badge>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-dashed grid grid-cols-1 md:grid-cols-3 gap-4">
                     {[
                        { label: "Data Residency", val: "US/EU/APAC", icon: Target },
                        { label: "Audit Integrity", val: "Immutable", icon: ListChecks },
                        { label: "Auth Protocol", val: "FIDO2 / SSO", icon: Award },
                     ].map((feat, i) => (
                        <div key={i} className="flex flex-col gap-1">
                           <feat.icon className="h-4 w-4 text-primary" />
                           <span className="text-[10px] font-black uppercase tracking-tighter">{feat.label}</span>
                           <span className="text-[9px] text-muted-foreground font-bold italic">{feat.val}</span>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-lg flex flex-col justify-center bg-card/50 backdrop-blur-sm">
               <CardHeader className="p-8 border-b bg-primary/2">
                  <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Recent Certifications</CardTitle>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  <div className="relative p-6 rounded-3xl bg-linear-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 flex items-center gap-6 group cursor-pointer transition-all hover:border-emerald-500/40">
                     <div className="h-14 w-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-emerald-600 border border-emerald-500/10 shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="h-8 w-8" />
                     </div>
                     <div>
                        <p className="text-lg font-black tracking-tight uppercase italic text-emerald-700">SOC2 Type II Verified</p>
                        <p className="text-[10px] font-bold text-emerald-600/60 uppercase">Certified: Feb 14, 2024</p>
                        <p className="text-[9px] text-muted-foreground font-medium italic mt-1">&quot;Comprehensive evaluation of security, availability, and processing integrity controls.&quot;</p>
                     </div>
                     <ExternalLink className="h-4 w-4 absolute top-4 right-4 text-emerald-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <Button variant="outline" className="w-full h-12 border-dashed border-primary/20 text-[10px] font-black uppercase tracking-widest hover:bg-primary/5">
                     Request New Audit Shard
                  </Button>
               </CardContent>
            </Card>
         </div>

         {/* Compliance Checklist Table */}
         <Card className="border-primary/10 shadow-xl overflow-hidden">
            <CardHeader className="p-6 border-b bg-muted/40 flex flex-row items-center justify-between">
               <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Framework Status Matrix</CardTitle>
               <Button size="sm" className="h-9 px-6 bg-primary font-black uppercase text-[10px] shadow-lg shadow-primary/20">
                  Export Compliance Report
               </Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-primary/5 border-b border-primary/10">
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Regulatory Code</th>
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Control Logic</th>
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assessment Data</th>
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Publication Status</th>
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right w-32">Evidence</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-primary/5">
                        {compliancePacks.map((pack) => (
                           <tr key={pack.id} className="hover:bg-muted/10 transition-colors group">
                              <td className="p-4">
                                 <p className="text-sm font-black tracking-tight uppercase italic underline underline-offset-4 decoration-primary/20">{pack.name}</p>
                              </td>
                              <td className="p-4">
                                 <div className="space-y-1.5 w-48">
                                    <div className="flex justify-between text-[9px] font-black uppercase text-muted-foreground">
                                       <span>Controls</span>
                                       <span>{pack.passed}/{pack.checks}</span>
                                    </div>
                                    <Progress
                                       value={(pack.passed / pack.checks) * 100}
                                       className="h-1"
                                       indicatorClassName={pack.status === "Compliant" ? "bg-green-500" : "bg-amber-500"}
                                    />
                                 </div>
                              </td>
                              <td className="p-4">
                                 <div className="space-y-0.5">
                                    <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                                       <Clock className="h-3 w-3" /> Last: {pack.lastAudit}
                                    </p>
                                    <p className="text-[10px] font-black text-primary uppercase italic">Target: {pack.nextAudit}</p>
                                 </div>
                              </td>
                              <td className="p-4">
                                 <Badge className={cn(
                                    "text-[9px] font-black uppercase border-none px-3",
                                    pack.status === "Compliant" ? "bg-green-500/10 text-green-600" : "bg-amber-500/10 text-amber-600"
                                 )}>
                                    {pack.status}
                                 </Badge>
                              </td>
                              <td className="p-4 text-right">
                                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-primary transition-all">
                                    <FileText className="h-4 w-4" />
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
