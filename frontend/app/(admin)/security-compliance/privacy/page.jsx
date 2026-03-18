"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Fingerprint, Eraser, Plus, Trash2, Lock, ShieldAlert, Key } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { privacyRules } from "@/lib/mock-data/security";

import PrivacyRuleAddForm from "./PrivacyRuleAddForm";

export default function PrivacyDataProtection() {
   const [rules, setRules] = useState(privacyRules);
   const [isAdding, setIsAdding] = useState(false);

   if (isAdding) {
      return <PrivacyRuleAddForm onCancel={() => setIsAdding(false)} onSave={() => setIsAdding(false)} />;
   }

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* PII Redaction Engine */}
            <div className="lg:col-span-2 space-y-6">
               <div className="px-2">
                  <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">PII Redaction Logic</h2>
                  <p className="text-[10px] text-muted-foreground font-medium italic">Configure automated detection and masking patterns for sensitive customer data.</p>
               </div>

               <Card className="border-primary/10 shadow-lg overflow-hidden bg-card/30 backdrop-blur-sm">
                  <CardHeader className="p-6 border-b bg-primary/2 flex flex-row items-center justify-between">
                     <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Masking Rules</CardTitle>
                     <Button
                        onClick={() => setIsAdding(true)}
                        size="sm" className="h-8 px-4 bg-primary text-[9px] font-black uppercase gap-2 shadow-lg shadow-primary/20"
                     >
                        <Plus className="h-3 w-3" /> New Pattern
                     </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                     <div className="divide-y divide-primary/5">
                        {rules.map((rule) => (
                           <div key={rule.id} className="p-6 flex items-center justify-between hover:bg-muted/10 transition-colors group">
                              <div className="flex items-center gap-4">
                                 <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary/60 border border-primary/10">
                                    {rule.type === "Regex" ? <Fingerprint className="h-5 w-5" /> : <Eraser className="h-5 w-5" />}
                                 </div>
                                 <div>
                                    <div className="flex items-center gap-2">
                                       <p className="text-sm font-black tracking-tight">{rule.name}</p>
                                       <Badge variant="outline" className="text-[7px] font-black uppercase border-primary/10 scale-90">{rule.type}</Badge>
                                    </div>
                                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{rule.mask}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-6">
                                 <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter">Engine State</span>
                                    <Switch checked={rule.active} onCheckedChange={() => {
                                       setRules(rules.map(r => r.id === rule.id ? { ...r, active: !r.active } : r));
                                    }} />
                                 </div>
                                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-red-500/10 text-red-500/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                    <Trash2 className="h-4 w-4" />
                                 </Button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4 shadow-sm">
                  <ShieldAlert className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight text-amber-600">Privacy Enforcement Note</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        &quot;Redaction is applied at the ingestion layer. Masked data is never stored in plaintext within the system shards. Irreversible masking is applied to all recordings by default.&quot;
                     </p>
                  </div>
               </div>
            </div>

            {/* Access Governance Side Board */}
            <div className="space-y-6">
               <div className="px-2">
                  <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Privacy Governance</h2>
               </div>

               <Card className="border-primary/10 shadow-xl overflow-hidden text-sm bg-linear-to-b from-card to-background">
                  <CardHeader className="p-6 bg-primary/5 border-b border-primary/10">
                     <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">Data Protection Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     {[
                        { label: "Storage Duration", val: "90 Days (Active)", icon: Clock },
                        { label: "Access Level", val: "Strict (RBAC)", icon: Lock },
                        { label: "Encryption", val: "AES-256-GCM", icon: Key },
                     ].map((ctrl, i) => (
                        <div key={i} className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary/60 border border-primary/10">
                              <ctrl.icon className="h-5 w-5" />
                           </div>
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{ctrl.label}</p>
                              <p className="text-xs font-black tracking-tight">{ctrl.val}</p>
                           </div>
                        </div>
                     ))}

                     <div className="pt-6 border-t border-dashed space-y-3">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Compliance Actions</p>
                        <Button className="w-full h-11 text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl shadow-primary/10" onClick={() => toast.success("Right to be Forgotten process initiated.")}>
                           Right to be Forgotten
                        </Button>
                        <Button variant="outline" className="w-full h-11 text-[10px] font-black uppercase tracking-widest border-primary/10" onClick={() => toast.success("Data portability export started.")}>
                           Portability Export (JSON)
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               {/* AI Privacy Guard */}
               <div className="p-5 rounded-2xl bg-muted/40 border border-primary/5 space-y-3">
                  <div className="flex items-center gap-2">
                     <div className="h-2 w-2 rounded-full bg-green-500" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-foreground italic">AI Privacy Guard</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                     Intelligence models are trained on anonymized datasets. All conversational insights are decoupled from identity actors before processing.
                  </p>
               </div>
            </div>

         </div>
      </div>
   );
}

// Internal helper for Clock
function Clock({ className }) {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
   );
}
