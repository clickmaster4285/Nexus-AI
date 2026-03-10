"use client";

import { useState } from "react";
import { Shield, EyeOff, ArrowLeft, Save, X, Info, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PrivacyRuleAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState({
      name: "",
      pattern: "",
      maskType: "Redaction",
      sensitivity: "P4 - Critical",
      status: "Simulation"
   });

   const maskTypes = ["Redaction", "Partial Mask", "Tokenization", "Hashed"];
   const sensitivityLevels = ["P1 - Low", "P2 - Medium", "P3 - High", "P4 - Critical"];

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
               <h2 className="text-xl font-black tracking-tighter uppercase">Define Privacy Pattern</h2>
               <p className="text-[10px] text-muted-foreground font-medium italic">Configure automated PII detection and masking logic for the Nexus stream.</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Pattern Logic & Masking</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Pattern Identity</label>
                           <Input
                              required
                              placeholder="e.g. EU Passport Numbers"
                              className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Detection Logic (Regex)</label>
                           <div className="relative">
                              <Shield className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                              <Input
                                 required
                                 placeholder="^[A-Z][0-9]{8}$"
                                 className="pl-10 h-11 border-primary/10 text-xs font-mono bg-muted/20"
                                 value={formData.pattern}
                                 onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Transformation Strategy</label>
                           <Select value={formData.maskType} onValueChange={(v) => setFormData({ ...formData, maskType: v })}>
                              <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                                 <EyeOff className="h-4 w-4 mr-2 text-primary/40" />
                                 <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                 {maskTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Sensitivity Class</label>
                           <Select value={formData.sensitivity} onValueChange={(v) => setFormData({ ...formData, sensitivity: v })}>
                              <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                                 <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                 {sensitivityLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight">Compliance Governance</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        PII masking is applied at the ingestion layer. Redacted data is never stored in the primary database and is excluded from AI training sets.
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
                     <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3">
                        <Lock className="h-4 w-4 text-blue-600" />
                        <span className="text-[10px] font-black uppercase text-blue-700">Audit Enforced</span>
                     </div>

                     <Button
                        type="submit"
                        className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
                     >
                        <Save className="h-4 w-4 mr-2" /> Deploy Pattern
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
