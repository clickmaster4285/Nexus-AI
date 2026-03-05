"use client";

import { useState } from "react";
import { Globe, ArrowLeft, Save, X, Info, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function WebhookAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState(() => ({
      name: "",
      url: "",
      events: [],
      secret: `whsec_${Math.random().toString(36).substring(7)}`
   }));

   const availableEvents = [
      "interaction.started",
      "interaction.ended",
      "quality.score_published",
      "alert.threshold_reached",
      "user.login_anomaly"
   ];

   const toggleEvent = (event) => {
      const updated = formData.events.includes(event)
         ? formData.events.filter(e => e !== event)
         : [...formData.events, event];
      setFormData({ ...formData, events: updated });
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
               <h2 className="text-xl font-black tracking-tighter uppercase">Initialize Webhook Stream</h2>
               <p className="text-[10px] text-muted-foreground font-medium italic">Configure real-time event delivery to an external endpoint.</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Endpoint Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Friendly Name</label>
                           <Input
                              required
                              placeholder="e.g. CRM Sync Engine"
                              className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Target URL (HTTPS)</label>
                           <div className="relative">
                              <Globe className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                              <Input
                                 required
                                 type="url"
                                 placeholder="https://api.external.com/webhooks"
                                 className="pl-10 h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                                 value={formData.url}
                                 onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-dashed space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Event Subscriptions</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           {availableEvents.map(event => (
                              <div
                                 key={event}
                                 onClick={() => toggleEvent(event)}
                                 className={cn(
                                    "p-4 rounded-xl border text-left flex items-center justify-between transition-all group cursor-pointer select-none",
                                    formData.events.includes(event)
                                       ? "bg-primary/5 border-primary text-primary shadow-sm"
                                       : "bg-background border-primary/5 text-muted-foreground hover:border-primary/20"
                                 )}
                              >
                                 <span className="text-[10px] font-black font-mono">{event}</span>
                                 {formData.events.includes(event) && <Zap className="h-3 w-3 fill-current" />}
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="pt-6 border-t border-dashed space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Signing Secret</p>
                        <div className="p-4 rounded-xl bg-muted/30 border border-primary/5 font-mono text-xs flex justify-between items-center group">
                           <span className="opacity-60">{formData.secret}</span>
                           <Button variant="ghost" size="sm" className="h-6 text-[9px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">Regenerate</Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight">Security Protocol</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        Nexus AI uses HMAC-SHA256 signatures for payload verification. Ensure your endpoint validates the `X-Nexus-Signature` header to prevent spoofing.
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
                        <ShieldCheck className="h-4 w-4 text-blue-600" />
                        <span className="text-[10px] font-black uppercase text-blue-700">TLS 1.3 Required</span>
                     </div>

                     <Button
                        type="submit"
                        className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
                     >
                        <Save className="h-4 w-4 mr-2" /> Activate Stream
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
