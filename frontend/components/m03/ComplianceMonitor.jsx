"use client";

import { useState } from "react";
import {
   ShieldCheck,
   ShieldAlert,
   History,
   Search,
   Filter,
   Download,
   Plus,
   AlertTriangle,
   CheckCircle2,
   ExternalLink,
   ChevronRight,
   TrendingDown,
   TrendingUp,
   Minus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function ComplianceMonitor({ rules }) {
   const [searchTerm, setSearchTerm] = useState("");

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Compliance Packs Configuration (3.3.1) */}
            <div className="lg:col-span-1 space-y-6">
               <Card className="h-full">
                  <CardHeader className="pb-3 border-b bg-muted/30">
                     <CardTitle className="text-base flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        Active Compliance Packs
                     </CardTitle>
                     <CardDescription className="text-xs">Manage regulatory enforcement rules.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                     {[
                        { name: "PCI-DSS", desc: "Credit card handling & redaction", status: true, severity: "critical" },
                        { name: "TCPA", desc: "Telemarketing & consent rules", status: true, severity: "high" },
                        { name: "HIPAA", desc: "Healthcare privacy standards", status: false, severity: "high" },
                        { name: "GDPR", desc: "Data protection & right to erase", status: true, severity: "critical" },
                        { name: "CCPA", desc: "California consumer privacy", status: true, severity: "medium" }
                     ].map((pack, i) => (
                        <div key={i} className="flex items-start justify-between gap-4 p-3 rounded-xl bg-card border hover:border-primary/30 transition-all group">
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                 <span className="font-bold text-sm">{pack.name}</span>
                                 <Badge variant="outline" className={cn(
                                    "text-[9px] h-3.5 uppercase px-1 border-none",
                                    pack.severity === 'critical' ? "bg-red-50 text-red-600" :
                                       pack.severity === 'high' ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                                 )}>
                                    {pack.severity}
                                 </Badge>
                              </div>
                              <p className="text-[10px] text-muted-foreground">{pack.desc}</p>
                           </div>
                           <Switch checked={pack.status} className="scale-75 group-hover:scale-90 transition-transform" />
                        </div>
                     ))}

                     <Button variant="outline" className="w-full border-dashed gap-2 group">
                        <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                        Request Custom Compliance Pack
                     </Button>
                  </CardContent>
               </Card>
            </div>

            {/* Compliance Violation Log (3.3.2) */}
            <div className="lg:col-span-2 space-y-6">
               <Card>
                  <CardHeader className="pb-3 border-b bg-muted/30">
                     <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                           <ShieldAlert className="h-5 w-5 text-red-500" />
                           Violation Detection Log
                        </CardTitle>
                        <div className="flex items-center gap-2">
                           <div className="relative w-48">
                              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                              <Input placeholder="Search logs..." className="pl-8 h-8 text-xs bg-background" />
                           </div>
                           <Button variant="outline" size="sm" className="h-8">
                              <Download className="h-3.5 w-3.5" />
                           </Button>
                        </div>
                     </div>
                  </CardHeader>
                  <CardContent className="p-0">
                     <Table>
                        <TableHeader className="bg-muted/50">
                           <TableRow>
                              <TableHead className="text-[10px] uppercase font-bold h-10 px-4 whitespace-nowrap">ID / Type</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Severity</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Evidence</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Agent</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold h-10 px-4 text-right">Status</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {[
                              { id: "V092", type: "PCI-DSS CC Leak", severity: "critical", agent: "Sarah Jenkins", time: "2 min ago", status: "unresolved", quote: "... customer said card is 4111 2222 ... agent failed to mask ..." },
                              { id: "V088", type: "Missing Disclosure", severity: "high", agent: "Mike Ross", time: "1 hour ago", status: "reviewed", quote: "... greeting started immediately without regulatory disclaimer ..." },
                              { id: "V085", type: "Data Sharing", severity: "medium", agent: "Alex Chen", time: "4 hours ago", status: "resolved", quote: "... mentioned internal system node names to unauthorized user ..." }
                           ].map((v) => (
                              <TableRow key={v.id} className="group hover:bg-muted/20">
                                 <TableCell className="px-4 py-3">
                                    <div className="space-y-1">
                                       <span className="font-mono text-[10px] text-muted-foreground">#{v.id}</span>
                                       <p className="text-xs font-bold leading-none">{v.type}</p>
                                       <p className="text-[9px] text-muted-foreground font-mono italic">{v.time}</p>
                                    </div>
                                 </TableCell>
                                 <TableCell className="px-4 py-3">
                                    <Badge variant="outline" className={cn(
                                       "text-[9px] h-4 rounded-sm border-none shadow-sm",
                                       v.severity === 'critical' ? "bg-red-500 text-white" :
                                          v.severity === 'high' ? "bg-orange-400 text-white" : "bg-blue-400 text-white"
                                    )}>
                                       {v.severity.toUpperCase()}
                                    </Badge>
                                 </TableCell>
                                 <TableCell className="px-4 py-3">
                                    <div className="max-w-[200px]">
                                       <p className="text-[10px] text-muted-foreground line-clamp-2 bg-muted/30 p-1.5 rounded-md italic font-mono border-l border-primary/20">
                                          {v.quote}
                                       </p>
                                    </div>
                                 </TableCell>
                                 <TableCell className="px-4 py-3 text-xs font-medium">{v.agent}</TableCell>
                                 <TableCell className="px-4 py-3 text-right">
                                    <div className="flex flex-col items-end gap-2">
                                       <Badge variant="secondary" className={cn(
                                          "text-[9px] px-1.5 py-0",
                                          v.status === 'unresolved' ? "bg-red-100 text-red-600 animate-pulse" :
                                             v.status === 'reviewed' ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"
                                       )}>
                                          {v.status}
                                       </Badge>
                                       <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <ExternalLink className="h-3 w-3" />
                                       </Button>
                                    </div>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>

                     <div className="p-4 border-t flex items-center justify-between text-xs text-muted-foreground bg-muted/10">
                        <div className="flex items-center gap-4">
                           <span className="flex items-center gap-1"><ShieldAlert className="h-3 w-3 text-red-500" /> 1 Critical Item Found</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold">VIEW FULL AUDIT LOG <ChevronRight className="h-3 w-3 ml-1" /></Button>
                     </div>
                  </CardContent>
               </Card>

               {/* Compliance Trends Chart Layer (Simulated) */}
               <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-card/50">
                     <CardContent className="p-4 flex items-center justify-between">
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase">Violations (WoW)</p>
                           <div className="flex items-center gap-2">
                              <span className="text-xl font-bold font-mono text-red-500">24</span>
                              <TrendingUp className="h-4 w-4 text-red-500" />
                           </div>
                        </div>
                        <div className="flex items-center gap-0.5 h-10 items-end">
                           {[20, 15, 25, 30, 22, 28, 24].map((h, i) => (
                              <div key={i} className="w-1.5 bg-red-400/20 rounded-t-sm" style={{ height: `${h}%` }} />
                           ))}
                        </div>
                     </CardContent>
                  </Card>
                  <Card className="bg-card/50">
                     <CardContent className="p-4 flex items-center justify-between">
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase">Audit Coverage</p>
                           <div className="flex items-center gap-2">
                              <span className="text-xl font-bold font-mono text-green-500">100%</span>
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                           </div>
                        </div>
                        <div className="flex items-center gap-0.5 h-10 items-end">
                           {[80, 85, 90, 100, 100, 100, 100].map((h, i) => (
                              <div key={i} className="w-1.5 bg-green-400/20 rounded-t-sm" style={{ height: `${h}%` }} />
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
}
