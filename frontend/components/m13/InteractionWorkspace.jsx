"use client";

import { useState } from "react";
import { Phone, MessageSquare, User, Shield, Star, Hash, Send, Mic, Video, Info, ChevronRight, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { activeInteractions } from "@/lib/mock-data/agent";
import { cn } from "@/lib/utils";

export default function InteractionWorkspace() {
   const [selectedId, setSelectedId] = useState(activeInteractions[0].id);
   const activeInt = activeInteractions.find(i => i.id === selectedId);

   return (
      <div className="h-[calc(100vh-180px)] overflow-hidden flex flex-col space-y-6 animate-in fade-in duration-500">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">

            {/* Active Interaction Queue */}
            <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
               <div className="px-2 mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-tight text-muted-foreground flex items-center gap-2">
                     <Hash className="h-3 w-3" /> Digital Sandbox
                  </h3>
               </div>

               {activeInteractions.map((int) => (
                  <button
                     key={int.id}
                     onClick={() => setSelectedId(int.id)}
                     className={cn(
                        "w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-3 group relative overflow-hidden",
                        selectedId === int.id
                           ? "bg-primary text-white border-primary shadow-xl shadow-primary/20"
                           : "bg-card border-primary/5 hover:bg-muted/30"
                     )}
                  >
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           {int.channel === "Voice" ? <Phone className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5" />}
                           <span className="text-[10px] font-black uppercase tracking-widest">{int.channel}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-80">{int.duration}</span>
                     </div>
                     <div>
                        <p className="text-sm font-black tracking-tight">{int.customer}</p>
                        <p className={cn("text-[10px] font-medium italic truncate", selectedId === int.id ? "text-white/80" : "text-muted-foreground")}>{int.issue}</p>
                     </div>
                     <div className="flex justify-between items-center mt-1">
                        <Badge className={cn("text-[8px] font-black uppercase border-none", selectedId === int.id ? "bg-white/20 text-white" : "bg-primary/5 text-primary")}>
                           {int.tier}
                        </Badge>
                        <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", int.sentiment === "Positive" ? "bg-green-400" : "bg-amber-400")} />
                     </div>
                     {selectedId === int.id && (
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                           <Zap className="h-12 w-12" />
                        </div>
                     )}
                  </button>
               ))}
            </div>

            {/* Interaction Sandbox */}
            <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
               <Card className="flex-1 border-primary/10 shadow-2xl relative flex flex-col overflow-hidden bg-card/50 backdrop-blur-xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/5 via-primary to-primary/5" />

                  <CardHeader className="p-6 border-b bg-primary/2 flex flex-row items-center justify-between">
                     <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-primary/10 shadow-sm">
                           <AvatarFallback className="bg-primary/5 text-primary font-black uppercase">{activeInt.customer.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                           <p className="text-sm font-black tracking-tight">{activeInt.customer} <span className="text-[10px] opacity-40 ml-2">ID: {activeInt.id}</span></p>
                           <div className="flex items-center gap-2">
                              <Badge className="bg-green-500/10 text-green-600 border-none text-[8px] font-black uppercase">Active Stream</Badge>
                              <p className="text-[10px] font-mono text-muted-foreground">0.0.0.0 via SIP/2.0</p>
                           </div>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-9 w-9 border-primary/10 rounded-xl hover:bg-primary/5">
                           <Mic className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9 border-primary/10 rounded-xl hover:bg-primary/5">
                           <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" className="h-9 px-6 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">
                           Release session
                        </Button>
                     </div>
                  </CardHeader>

                  <CardContent className="p-6 flex flex-col justify-center items-center text-center space-y-6 flex-1">
                     <div className="relative">
                        <div className="h-32 w-32 rounded-full border-4 border-primary/10 flex items-center justify-center bg-primary/2">
                           <Phone className="h-12 w-12 text-primary animate-pulse" />
                        </div>
                        <div className="absolute -top-4 -left-4 p-3 rounded-2xl bg-primary text-white shadow-xl -rotate-12">
                           <span className="text-[10px] font-black uppercase">Voice Link</span>
                        </div>
                     </div>
                     <div className="space-y-2 max-w-sm">
                        <p className="text-2xl font-black tracking-tighter uppercase italic">{activeInt.duration}</p>
                        <p className="text-[11px] text-muted-foreground font-medium italic px-8">&quot;Currently streaming real-time audio through the Nexus Intelligence core. NLP Sentiment analysis is being applied live.&quot;</p>
                     </div>

                     <div className="flex gap-2 w-full max-w-md pt-8">
                        <div className="flex-1 p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                           <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Live Sentiment</p>
                           <p className="text-lg font-black text-primary uppercase">{activeInt.sentiment}</p>
                        </div>
                        <div className="flex-1 p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                           <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Knowledge hits</p>
                           <p className="text-lg font-black text-primary uppercase">3 Active</p>
                        </div>
                     </div>
                  </CardContent>

                  <div className="p-4 border-t bg-muted/20 flex gap-2">
                     <div className="flex-1 relative">
                        <Send className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/40" />
                        <input
                           placeholder="Enter internal session notes or protocol logs..."
                           className="w-full h-10 px-4 pr-10 rounded-xl bg-background border border-primary/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                     </div>
                     <Button className="h-10 px-4 bg-primary text-white rounded-xl shadow-lg">
                        <Info className="h-4 w-4" />
                     </Button>
                  </div>
               </Card>
            </div>

            {/* Customer Context Intelligence */}
            <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
               <Card className="border-primary/10 shadow-md">
                  <CardHeader className="p-4 bg-muted/20 border-b">
                     <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <User className="h-3.5 w-3.5" /> Profile Intelligence
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-5">
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-tighter">Account Value</span>
                           <div className="flex items-center gap-0.5 text-amber-500">
                              <Star className="h-3 w-3 fill-current" />
                              <Star className="h-3 w-3 fill-current" />
                              <Star className="h-3 w-3 fill-current" />
                              <Star className="h-3 w-3 fill-current" />
                              <Star className="h-3 w-3 fill-current" />
                           </div>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-tighter">Tier Status</span>
                           <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase">{activeInt.tier}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-tighter">Lifetime Days</span>
                           <span className="text-xs font-black">1,420</span>
                        </div>
                     </div>

                     <div className="pt-4 border-t border-dashed">
                        <Button variant="outline" className="w-full h-9 text-[9px] font-black uppercase tracking-widest border-primary/10 hover:bg-primary/5">
                           Full Journey History <ChevronRight className="h-3 w-3 ml-2" />
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-primary/10 shadow-md">
                  <CardHeader className="p-4 bg-muted/20 border-b">
                     <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5" /> Retention Playbook
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                     <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/10 space-y-2">
                        <p className="text-[10px] font-black uppercase text-green-600">Active Suggestion</p>
                        <p className="text-[10px] text-muted-foreground italic leading-tight">Customer is approaching renewal. Mention the new Enterprise Analytics upgrade path if they express long-term scaling needs.</p>
                     </div>
                     <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-2">
                        <p className="text-[10px] font-black uppercase text-blue-600">Technical Tip</p>
                        <p className="text-[10px] text-muted-foreground italic leading-tight">Account uses SIP via Port 5060. Check firewall status if audio issues arise.</p>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
