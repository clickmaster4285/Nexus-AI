"use client";

import { useState, useCallback, useMemo } from "react";
import { ArrowLeft, Save, X, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ReportAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState({
      title: "",
      type: "Standard Portfolio",
      format: "PDF",
      frequency: "Weekly",
      metrics: ["CSAT", "AHT", "Volume"]
   });

   const reportTypes = useMemo(() => ["Standard Portfolio", "Executive KPI", "Regulatory Audit", "Anomaly Detection"], []);
   const metrics = useMemo(() => ["CSAT", "AHT", "Volume", "FCR", "Cost per Interaction", "NPS", "Revenue Signal Rate"], []);

   const toggleMetric = useCallback((metric) => {
      setFormData(prev => {
         const updated = prev.metrics.includes(metric)
            ? prev.metrics.filter(m => m !== metric)
            : [...prev.metrics, metric];
         return { ...prev, metrics: updated };
      });
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
   };

   const selectClass = "w-full h-11 rounded-md border border-primary/10 bg-background px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer";

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
                              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Architectural Type</label>
                           <select
                              value={formData.type}
                              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                              className={selectClass}
                           >
                              {reportTypes.map(t => <option key={t} value={t}>{t}</option>)}
                           </select>
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
                                 <div className={cn(
                                    "h-4 w-4 rounded-sm border-2 flex items-center justify-center shrink-0",
                                    formData.metrics.includes(metric) ? "border-white bg-white" : "border-current"
                                 )}>
                                    {formData.metrics.includes(metric) && (
                                       <svg className="h-2.5 w-2.5 text-primary" viewBox="0 0 10 10" fill="none">
                                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                    )}
                                 </div>
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
                           <select
                              value={formData.frequency}
                              onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                              className={selectClass}
                           >
                              <option value="Daily">Daily Summary</option>
                              <option value="Weekly">Weekly Digest</option>
                              <option value="Monthly">Monthly Deep Dive</option>
                              <option value="On-Demand">On-Demand Only</option>
                           </select>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Output Pipeline</label>
                           <select
                              value={formData.format}
                              onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
                              className={selectClass}
                           >
                              <option value="PDF">Encrypted PDF</option>
                              <option value="CSV">Raw CSV Stream</option>
                              <option value="JSON">API Shard (JSON)</option>
                           </select>
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