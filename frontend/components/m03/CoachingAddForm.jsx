"use client";

import { useState } from "react";
import { User, Calendar, ArrowLeft, Save, X, Info, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CoachingAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState({
      agent: "",
      topic: "Compliance & PII Redaction",
      priority: "Standard",
      date: "",
      notes: ""
   });

   const topics = [
      "Compliance & PII Redaction",
      "Customer Sentiment Handling",
      "Upsell Opportunity Detection",
      "Technical Troubleshooting",
      "Tone & Professionalism"
   ];

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
               <h2 className="text-xl font-black tracking-tighter uppercase">Initialize Coaching Session</h2>
               <p className="text-[10px] text-muted-foreground font-medium italic">Schedule and define the scope for an agent performance improvement session.</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Session Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Target Agent</label>
                           <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                              <Input
                                 required
                                 placeholder="e.g. Sarah Jenkins"
                                 className="pl-10 h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                                 value={formData.agent}
                                 onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                              />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Core Focus Topic</label>
                           <Select value={formData.topic} onValueChange={(v) => setFormData({ ...formData, topic: v })}>
                              <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                                 <SelectValue placeholder="Select topic" />
                              </SelectTrigger>
                              <SelectContent>
                                 {topics.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Schedule Date</label>
                           <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                              <Input
                                 required
                                 type="date"
                                 className="pl-10 h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                                 value={formData.date}
                                 onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                              />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Priority Level</label>
                           <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
                              <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                                 <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="Standard">Standard</SelectItem>
                                 <SelectItem value="High">High (Target Critical)</SelectItem>
                                 <SelectItem value="Immediate">Immediate (Compliance Escalation)</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     <div className="space-y-2 pt-4 border-t border-dashed">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Coaching Brief & Objectives</label>
                        <Input
                           required
                           placeholder="e.g. Reviewing recent PII leakage in chat interactions. Focus on redacted tool usage."
                           className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                           value={formData.notes}
                           onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight">Coaching Protocol</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        Agent workspaces will be notified of this session. Relevant interaction transcripts will be pre-loaded into the coaching viewer for efficient review.
                     </p>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <Card className="border-primary/10 shadow-lg">
                  <CardHeader className="p-6 bg-primary/5 border-b">
                     <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Publication</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                     <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3">
                        <GraduationCap className="h-4 w-4 text-indigo-600" />
                        <span className="text-[10px] font-black uppercase text-indigo-700">Skill Enhancement</span>
                     </div>

                     <Button
                        type="submit"
                        className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
                     >
                        <Save className="h-4 w-4 mr-2" /> Schedule Session
                     </Button>
                     <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="w-full h-11 border-primary/10 text-[10px] font-black uppercase tracking-widest"
                     >
                        <X className="h-4 w-4 mr-2" /> Discard
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </form>
      </div>
   );
}
