"use client";

import { useState } from "react";
import { ArrowLeft, Save, X, Info, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function SignalAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState({
      name: "",
      type: "upsell",
      priority: "High",
      phrases: "",
      offer: "Enterprise Suite",
      threshold: 85
   });

   const signalTypes = [
      { id: "upsell", label: "Upsell (Expansion)" },
      { id: "cross", label: "Cross-sell (New Product)" },
      { id: "bundle", label: "Bundle Offer" }
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
               <h2 className="text-xl font-black tracking-tighter uppercase">Initialize Revenue Signal</h2>
               <p className="text-[10px] text-muted-foreground font-medium italic">Configure AI-driven intent detection for high-value sales opportunities.</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Signal logic & Parameters</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Signal Narrative</label>
                           <Input
                              required
                              placeholder="e.g. Enterprise Upgrade Intent"
                              className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Intent Category</label>
                           <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                              <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                                 <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                 {signalTypes.map(t => <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Trigger Keywords (Comma Separated)</label>
                        <Input
                           required
                           placeholder="e.g. more users, annual plan, API access, scaling"
                           className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                           value={formData.phrases}
                           onChange={(e) => setFormData({ ...formData, phrases: e.target.value })}
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Recommended Offer</label>
                           <Select value={formData.offer} onValueChange={(v) => setFormData({ ...formData, offer: v })}>
                              <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                                 <SelectValue placeholder="Select Offer" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="Enterprise Suite">Enterprise Suite (+40% MRR)</SelectItem>
                                 <SelectItem value="Security Add-on">Security & Compliance Hub</SelectItem>
                                 <SelectItem value="WFM Pro">WFM Forecasting Pack</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">AI Confidence Threshold: {formData.threshold}%</label>
                           <div className="pt-4 px-2">
                              <Slider
                                 defaultValue={[formData.threshold]}
                                 max={100}
                                 step={1}
                                 onValueChange={([v]) => setFormData({ ...formData, threshold: v })}
                                 className="text-primary"
                              />
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight">Intelligence Protocol</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        Signals are processed in real-time. Once triggered, the recommended offer will appear in the Agent Workspace with an AI-generated talk track.
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
                     <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 flex items-center gap-3">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-[10px] font-black uppercase text-green-700">High Growth Potential</span>
                     </div>

                     <Button
                        type="submit"
                        className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
                     >
                        <Save className="h-4 w-4 mr-2" /> Activate Signal
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
