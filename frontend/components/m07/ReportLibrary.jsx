"use client";

import { Search, FileText, Calendar, Plus, Clock, FileDown, Settings, Layers, Terminal, MoreVertical, CheckCircle2, Mail, Slack } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { reports, schedules } from "@/lib/mock-data/reporting";
import { cn } from "@/lib/utils";
import ReportAddForm from "./ReportAddForm";
import { useState, useCallback } from "react";

export default function ReportLibrary() {
   const [searchTerm, setSearchTerm] = useState("");
   const [isAdding, setIsAdding] = useState(false);

   const handleCancel = useCallback(() => setIsAdding(false), []);
   const handleSave = useCallback(() => setIsAdding(false), []);

   const filteredReports = reports.filter(r =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
   );

   if (isAdding) {
      return <ReportAddForm onCancel={handleCancel} onSave={handleSave} />;
   }

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
               <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Master Report Library</h3>
                  <div className="flex gap-2">
                     <div className="relative w-48">
                        <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                           placeholder="Search reports..."
                           className="h-8 pl-7 text-[10px] bg-card"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                     <Button onClick={() => setIsAdding(true)} size="sm" className="h-9 px-6 bg-primary font-black uppercase text-[10px] shadow-lg shadow-primary/20 transition-all">
                        <Plus className="h-3.5 w-3.5" /> Create Report
                     </Button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredReports.map((report) => (
                     <Card key={report.id} className="border-primary/10 hover:border-primary/30 transition-all hover:shadow-md group">
                        <CardContent className="p-4">
                           <div className="flex justify-between items-start mb-4">
                              <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center">
                                 <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex gap-1">
                                 <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <FileDown className="h-3.5 w-3.5" />
                                 </Button>
                                 <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <Settings className="h-3.5 w-3.5" />
                                 </Button>
                              </div>
                           </div>
                           <div className="space-y-1">
                              <p className="text-sm font-black tracking-tight">{report.name}</p>
                              <div className="flex items-center gap-2">
                                 <Badge variant="secondary" className="text-[8px] font-black uppercase px-1.5 py-0">{report.category}</Badge>
                                 <span className="text-[10px] text-muted-foreground font-medium">Type: {report.type}</span>
                              </div>
                           </div>
                           <div className="mt-4 pt-4 border-t border-dashed flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                                 <Clock className="h-3 w-3" /> Last run: {report.lastRun}
                              </div>
                              <div className="flex gap-1">
                                 {report.formats.map(fmt => (
                                    <span key={fmt} className="text-[8px] font-black text-primary/60 border border-primary/20 px-1 rounded">{fmt}</span>
                                 ))}
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
                  <Card className="border-dashed border-2 border-primary/10 bg-primary/1 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center p-8 group">
                     <Plus className="h-6 w-6 text-muted-foreground mb-2 group-hover:scale-110 transition-transform" />
                     <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Build Custom Template</p>
                  </Card>
               </div>
            </div>

            <div className="space-y-4">
               <div className="px-1">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Automated Delivery</h3>
               </div>
               <Card className="border-primary/10 shadow-lg bg-linear-to-b from-card to-secondary/5 h-full">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Active Schedules</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                     {schedules.map((schedule) => (
                        <div key={schedule.id} className="p-4 rounded-xl border bg-background shadow-inner space-y-3 relative group overflow-hidden">
                           <div className="absolute top-0 right-0 p-3">
                              <Badge className={cn(
                                 "text-[8px] font-black uppercase py-0 px-1.5 border-none",
                                 schedule.status === "Scheduled" ? "bg-amber-500" : "bg-green-500"
                              )}>
                                 {schedule.status}
                              </Badge>
                           </div>
                           <div className="space-y-1">
                              <p className="text-xs font-black pr-16">{schedule.name}</p>
                              <p className="text-[9px] text-muted-foreground font-medium flex items-center gap-1">
                                 <Layers className="h-3 w-3" /> {schedule.report}
                              </p>
                           </div>
                           <div className="flex items-center gap-4 pt-1">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary">
                                 <Calendar className="h-3.5 w-3.5" /> {schedule.frequency}
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                                 {schedule.delivery === "Email" ? <Mail className="h-3.5 w-3.5" /> :
                                    schedule.delivery === "Slack" ? <Slack className="h-3.5 w-3.5" /> : <Terminal className="h-3.5 w-3.5" />}
                                 {schedule.delivery}
                              </div>
                           </div>
                           <div className="pt-3 border-t border-dashed flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="outline" size="sm" className="flex-1 h-7 text-[9px] font-black uppercase">Run Now</Button>
                              <Button variant="outline" size="sm" className="h-7 w-7 p-0 shadow-sm"><MoreVertical className="h-3 w-3" /></Button>
                           </div>
                        </div>
                     ))}
                     <Button variant="ghost" className="w-full border border-dashed border-primary/20 hover:bg-primary/5 h-10 text-[10px] font-black uppercase">
                        <Plus className="h-4 w-4 mr-2" /> New Delivery Schedule
                     </Button>

                     <div className="pt-6 border-t border-dashed mt-auto">
                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                           <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <p className="text-[10px] font-black uppercase tracking-tight">System Health</p>
                           </div>
                           <p className="text-[9px] text-muted-foreground leading-relaxed">
                              Last 24h: <span className="text-foreground font-bold">142</span> reports delivered with <span className="text-green-600 font-bold">0 errors</span>.
                           </p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}