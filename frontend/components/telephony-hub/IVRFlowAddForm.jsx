"use client";

import { useState } from "react";
import {  Hash, ArrowLeft, Save, X, Info, Settings, Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function IVRFlowAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState({
      name: "",
      description: "",
      triggerNumber: "",
      language: "English (US)",
      holdMusic: "Nexus Default"
   });

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
               <h2 className="text-xl font-black tracking-tighter uppercase">Initialize IVR Logic</h2>
               <p className="text-[10px] text-muted-foreground font-medium italic">Define the entry criteria and global settings for a new voice navigation flow.</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Global Flow Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Flow Identity</label>
                           <Input
                              required
                              placeholder="e.g. Main Inbound 2024"
                              className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Trigger DID (Number)</label>
                           <div className="relative">
                              <Hash className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                              <Input
                                 required
                                 placeholder="+1 (888) 000-0000"
                                 className="pl-10 h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                                 value={formData.triggerNumber}
                                 onChange={(e) => setFormData({ ...formData, triggerNumber: e.target.value })}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Internal Description</label>
                        <Input
                           placeholder="e.g. Core routing logic for premium support tier customers."
                           className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                           value={formData.description}
                           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Primary Voice Locale</label>
                           <Select value={formData.language} onValueChange={(v) => setFormData({ ...formData, language: v })}>
                              <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                                 <SelectValue placeholder="Select Language" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="English (US)">English (US) - Neural High</SelectItem>
                                 <SelectItem value="Spanish (ES)">Spanish (ES) - Neural High</SelectItem>
                                 <SelectItem value="French (FR)">French (FR) - Neural High</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">System Audio Experience</label>
                           <Select value={formData.holdMusic} onValueChange={(v) => setFormData({ ...formData, holdMusic: v })}>
                              <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                                 <Music className="h-4 w-4 mr-2 text-primary/40" />
                                 <SelectValue placeholder="Select Hold Music" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="Nexus Default">Nexus Default (Ambient)</SelectItem>
                                 <SelectItem value="Lo-fi Focus">Lo-fi Focus</SelectItem>
                                 <SelectItem value="Smooth Corporate">Smooth Corporate</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight">Designer Logic</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        After initialization, you will be redirected to the Visual Canvas where you can drag-and-drop nodes for menu options, AI summaries, and agent transfers.
                     </p>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <Card className="border-primary/10 shadow-lg overflow-hidden">
                  <CardHeader className="p-6 bg-primary/5 border-b">
                     <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Publication Status</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                     <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-center gap-3">
                        <Settings className="h-4 w-4 text-orange-600 animate-spin-slow" />
                        <span className="text-[10px] font-black uppercase text-orange-700">Initialization Pending</span>
                     </div>

                     <Button
                        type="submit"
                        className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
                     >
                        <Save className="h-4 w-4 mr-2" /> Start Designer
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
