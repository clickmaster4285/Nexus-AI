"use client";

import { useState } from "react";
import { Search, BookOpen, HelpCircle, Calendar, MessageSquare, ExternalLink, Hash, Plus, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { kbArticles } from "@/lib/mock-data/agent";

export default function SelfServiceTools() {
   const [searchTerm, setSearchTerm] = useState("");

   const filteredArticles = kbArticles.filter(a =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="space-y-8 animate-in fade-in duration-500">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Knowledge Base Repository */}
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-xl overflow-hidden bg-card/30 backdrop-blur-sm">
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                           <CardTitle className="text-xl font-black tracking-tighter uppercase italic flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-primary" /> Intelligence Vault
                           </CardTitle>
                           <p className="text-[10px] text-muted-foreground font-medium italic">Search over 2,400 technical articles and policy documents.</p>
                        </div>
                        <div className="flex-1 max-w-sm relative mt-4 md:mt-0">
                           <Search className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                           <Input
                              placeholder="Query the framework..."
                              className="pl-10 h-11 bg-background border-primary/10 text-xs font-medium focus:ring-primary/20"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                           />
                        </div>
                     </div>
                  </CardHeader>
                  <CardContent className="p-0">
                     <div className="grid grid-cols-1 divide-y divide-primary/5">
                        {filteredArticles.map((art) => (
                           <div key={art.id} className="p-6 flex items-center justify-between hover:bg-muted/10 transition-colors group cursor-pointer">
                              <div className="flex items-center gap-4">
                                 <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary/60 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-[-5deg] duration-300">
                                    <Hash className="h-4 w-4" />
                                 </div>
                                 <div>
                                    <p className="text-sm font-black tracking-tight">{art.title}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                       <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/10">{art.category}</Badge>
                                       <span className="text-[9px] text-muted-foreground font-medium italic flex items-center gap-1">
                                          <ExternalLink className="h-2.5 w-2.5" /> {art.views.toLocaleString()} Protocol Hits
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground/20 group-hover:text-primary transition-all group-hover:translate-x-1" />
                           </div>
                        ))}
                     </div>
                     <div className="p-4 bg-muted/20 border-t border-primary/5 text-center">
                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-primary">
                           Sync historical deep-archives
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Rapid Utility Sideboard */}
            <div className="space-y-6">
               <div className="px-2">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground italic flex items-center gap-2">
                     <Plus className="h-4 w-4" /> Operations Room
                  </h3>
               </div>

               <Card className="border-primary/10 shadow-lg group hover:border-primary/20 transition-all cursor-pointer overflow-hidden bg-linear-to-br from-card to-background">
                  <CardContent className="p-6 space-y-4">
                     <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-2xl bg-blue-500/5 text-blue-500 flex items-center justify-center border border-blue-500/10">
                           <Calendar className="h-5 w-5" />
                        </div>
                        <Badge className="bg-blue-500 text-white text-[8px] font-black uppercase px-2 py-0 border-none">Active Shift</Badge>
                     </div>
                     <div>
                        <p className="text-sm font-black tracking-tight uppercase italic underline underline-offset-4 decoration-blue-500/30">Schedule Management</p>
                        <p className="text-[10px] text-muted-foreground font-medium mt-1 leading-relaxed italic">My rotation: <span className="text-foreground font-black">Mon-Fri (08:00 - 17:00 EST)</span>. Next vacation window: Jun 14 - Jun 20.</p>
                     </div>
                     <Button className="w-full h-9 bg-blue-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20">
                        Request Rotation Shift
                     </Button>
                  </CardContent>
               </Card>

               <Card className="border-primary/10 shadow-lg group hover:border-primary/20 transition-all cursor-pointer overflow-hidden bg-linear-to-br from-card to-background">
                  <CardContent className="p-6 space-y-4">
                     <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-2xl bg-purple-500/5 text-purple-500 flex items-center justify-center border border-purple-500/10">
                           <HelpCircle className="h-5 w-5" />
                        </div>
                     </div>
                     <div>
                        <p className="text-sm font-black tracking-tight uppercase italic underline underline-offset-4 decoration-purple-500/30">L1 Support Proxy</p>
                        <p className="text-[10px] text-muted-foreground font-medium mt-1 leading-relaxed italic">Access the internal developer hub for technical hardware issues or platform integration bugs.</p>
                     </div>
                     <Button className="w-full h-9 bg-purple-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-purple-600 transition-all shadow-md shadow-purple-500/20">
                        Open Technical Ticket
                     </Button>
                  </CardContent>
               </Card>

               {/* Security Reminder */}
               <div className="p-5 rounded-3xl bg-primary/5 border border-primary/10 flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 xl:rotate-[-10deg]">
                     <MessageSquare className="h-4 w-4" />
                  </div>
                  <p className="text-[9px] text-muted-foreground font-medium italic leading-tight">
                     &quot;All internal search queries and KB access patterns are monitored for SOC2 security protocol compliance.&quot;
                  </p>
               </div>
            </div>

         </div>
      </div>
   );
}
