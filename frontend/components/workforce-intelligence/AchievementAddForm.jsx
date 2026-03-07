"use client";

import { useState } from "react";
import { Trophy, Star, ArrowLeft, Save, X, Info, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function AchievementAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState({
      title: "",
      description: "",
      points: 100,
      category: "Performance",
      icon: "zap"
   });

   const categories = ["Performance", "Compliance", "Culture", "Learning"];
   const icons = [
      { id: "zap", icon: Zap },
      { id: "trophy", icon: Trophy },
      { id: "star", icon: Star }
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
               <h2 className="text-xl font-black tracking-tighter uppercase">Forge New Achievement</h2>
               <p className="text-[10px] text-muted-foreground font-medium italic">Define a new milestone and reward for the gamification ecosystem.</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Achievement Blueprint</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Achievement Name</label>
                           <Input
                              required
                              placeholder="e.g. CSR Overdrive"
                              className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Point Value (Nexus Credits)</label>
                           <Input
                              required
                              type="number"
                              placeholder="100"
                              className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                              value={formData.points}
                              onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Requirement Narrative</label>
                        <Input
                           required
                           placeholder="e.g. Maintain a 95% CSAT score for 10 consecutive interactions."
                           className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                           value={formData.description}
                           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Reward Category</label>
                           <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                              <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                                 <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent>
                                 {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Visual Badge Token</label>
                           <div className="flex gap-3">
                              {icons.map(({ id, icon: Icon }) => (
                                 <button
                                    key={id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, icon: id })}
                                    className={cn(
                                       "h-11 w-11 rounded-xl flex items-center justify-center border transition-all",
                                       formData.icon === id
                                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                          : "bg-background border-primary/10 text-muted-foreground hover:border-primary/30"
                                    )}
                                 >
                                    <Icon className="h-5 w-5" />
                                 </button>
                              ))}
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight">Gamification Protocol</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        Achievements are automatically calculated via the Nexus IQ engine. Points will be distributed to agent wallets upon verification.
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
                     <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
                        <Star className="h-4 w-4 text-amber-600 fill-amber-600" />
                        <span className="text-[10px] font-black uppercase text-amber-700">Premium Reward</span>
                     </div>

                     <Button
                        type="submit"
                        className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
                     >
                        <Save className="h-4 w-4 mr-2" /> Deploy Achievement
                     </Button>
                     <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="w-full h-11 border-primary/10 text-[10px] font-black uppercase tracking-widest"
                     >
                        <X className="h-4 w-4 mr-2" /> Cancel
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </form>
      </div>
   );
}
