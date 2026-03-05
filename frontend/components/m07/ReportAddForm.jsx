"use client";

import { useState } from "react";
import { BarChart, ArrowLeft, Save, X, Info, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function ReportAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState({
      title: "",
      type: "Standard Portfolio",
      format: "PDF",
      frequency: "Weekly",
      metrics: ["CSAT", "AHT", "Volume"]
   });

   const reportTypes = ["Standard Portfolio", "Executive KPI", "Regulatory Audit", "Anomaly Detection"];
   const metrics = ["CSAT", "AHT", "Volume", "FCR", "Cost per Interaction", "NPS", "Revenue Signal Rate"];

   const toggleMetric = (metric) => {
      const updated = formData.metrics.includes(metric)
         ? formData.metrics.filter(m => m !== metric)
         : [...formData.metrics, metric];
      setFormData({ ...formData, metrics: updated });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
   };

   return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
         <div className="flex items-center gap-4">
            <Button
               variant="ghost"
               size="icon"
               onClick={onCancel}
               className="h-9 w-9 rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
            >
               <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
               <h2 className="text-xl font-black tracking-tighter uppercase">Provision New Report</h2>
               <p className="text-[10px] text-muted-foreground font-medium italic">Configure automated data extraction and visualization parameters.</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Logic & Data Selection</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Report Narrative</label>
                           <Input
                              required
                              placeholder="e.g. Q4 Executive Operations Summary"
                              className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Architectural Type</label>
                           <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                              <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                                 <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                 {reportTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-dashed space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Metric Aggregation</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                           {metrics.map(metric => (
                              <div
                                 key={metric}
                                 onClick={() => toggleMetric(metric)}
                                 className={cn(
                                    "p-3 rounded-xl border text-[10px] font-black uppercase flex items-center gap-2 transition-all cursor-pointer select-none",
                                    formData.metrics.includes(metric)
                                       ? "bg-primary text-white border-primary shadow-lg shadow-primary/10"
                                       : "bg-background border-primary/5 text-muted-foreground hover:border-primary/20"
                                 )}
                              >
                                 <Checkbox
                                    checked={formData.metrics.includes(metric)}
                                    onCheckedChange={() => toggleMetric(metric)}
                                    className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-primary"
                                 />
                                 <span className="truncate">{metric}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight">AI Briefing Layer</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        By default, this report will include an AI-generated Executive Briefing summarizing trends and recommending next steps for leadership.
                     </p>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <Card className="border-primary/10 shadow-lg">
                  <CardHeader className="p-6 bg-primary/5 border-b">
                     <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Publication Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cadence</label>
                           <Select value={formData.frequency} onValueChange={(v) => setFormData({ ...formData, frequency: v })}>
                              <SelectTrigger className="h-10 bg-background border-primary/10 text-xs font-bold">
                                 <Calendar className="h-3.5 w-3.5 mr-2 text-primary" />
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="Daily">Daily Summary</SelectItem>
                                 <SelectItem value="Weekly">Weekly Digest</SelectItem>
                                 <SelectItem value="Monthly">Monthly Deep Dive</SelectItem>
                                 <SelectItem value="On-Demand">On-Demand Only</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Output Pipeline</label>
                           <Select value={formData.format} onValueChange={(v) => setFormData({ ...formData, format: v })}>
                              <SelectTrigger className="h-10 bg-background border-primary/10 text-xs font-bold">
                                 <BarChart className="h-3.5 w-3.5 mr-2 text-primary" />
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="PDF">Encrypted PDF</SelectItem>
                                 <SelectItem value="CSV">Raw CSV Stream</SelectItem>
                                 <SelectItem value="JSON">API Shard (JSON)</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-dashed space-y-3">
                        <Button
                           type="submit"
                           className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
                        >
                           <Save className="h-4 w-4 mr-2" /> Activate Report
                        </Button>
                        <Button
                           type="button"
                           variant="outline"
                           onClick={onCancel}
                           className="w-full h-11 border-primary/10 text-[10px] font-black uppercase tracking-widest"
                        >
                           <X className="h-4 w-4 mr-2" /> Discard
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </form>
      </div>
   );
}
