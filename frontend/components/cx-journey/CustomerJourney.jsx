"use client";

import { useState } from "react";
import { Search, User, MessageCircle, Mail, Phone, ArrowRight, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { customerJourneys } from "@/lib/mock-data/cx";
import { cn } from "@/lib/utils";

export default function CustomerJourney() {
   const [searchTerm, setSearchTerm] = useState("Alex Thompson");
   const customer = customerJourneys.find(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())) || customerJourneys[0];

   const getIcon = (type) => {
      switch (type) {
         case "Voice": return <Phone className="h-4 w-4" />;
         case "Chat": return <MessageCircle className="h-4 w-4" />;
         case "Email": return <Mail className="h-4 w-4" />;
         default: return <User className="h-4 w-4" />;
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full max-w-sm">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input
                  placeholder="Search customer by name, email or ID..."
                  className="pl-9 bg-card border-primary/10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
               <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2 text-xs font-bold">
                  <ArrowRight className="h-4 w-4" /> CRM Profile
               </Button>
               <Button size="sm" className="flex-1 md:flex-none gap-2 text-xs font-black shadow-lg">
                  Add Interaction
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left: Customer Profile & Stats */}
            <div className="xl:col-span-1 space-y-6">
               <Card className="border-primary/10 shadow-md bg-linear-to-b from-primary/5 to-transparent">
                  <CardContent className="p-6 text-center">
                     <Avatar className="h-24 w-24 mx-auto border-4 border-background ring-4 ring-primary/10 shadow-2xl mb-4">
                        <AvatarFallback className="text-2xl font-black bg-secondary text-primary">
                           {customer.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                     </Avatar>
                     <h3 className="text-xl font-black tracking-tight">{customer.name}</h3>
                     <p className="text-xs text-muted-foreground font-mono mb-4">{customer.customerId}</p>
                     <Badge className={cn(
                        "px-4 py-1 font-black uppercase text-[10px]",
                        customer.tier === "Platinum" ? "bg-primary text-primary-foreground shadow-lg" : "bg-secondary text-secondary-foreground"
                     )}>
                        {customer.tier} TIER
                     </Badge>

                     <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-dashed">
                        <div className="text-center">
                           <p className="text-[10px] font-black text-muted-foreground uppercase">Interactions</p>
                           <p className="text-xl font-black">{customer.totalInteractions}</p>
                        </div>
                        <div className="text-center border-l border-dashed">
                           <p className="text-[10px] font-black text-muted-foreground uppercase">Tenure</p>
                           <p className="text-xl font-black">9mo</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-primary/10 shadow-sm">
                  <CardHeader className="p-4 pb-2">
                     <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Channels Used</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                     <div className="flex flex-wrap gap-2">
                        {customer.channels.map(channel => (
                           <Badge key={channel} variant="secondary" className="gap-1.5 py-1 px-3 text-[10px] font-bold bg-muted/50">
                              {getIcon(channel)} {channel}
                           </Badge>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               {customer.unresolvedIssues.length > 0 && (
                  <Card className="border-red-500/20 bg-red-500/5 shadow-inner">
                     <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-red-600 flex items-center gap-2">
                           <AlertCircle className="h-4 w-4" /> Unresolved Issues
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="p-4 pt-0 space-y-2">
                        {customer.unresolvedIssues.map(issue => (
                           <div key={issue.id} className="p-3 rounded-lg bg-white border border-red-100 shadow-sm">
                              <p className="text-xs font-bold leading-tight">{issue.title}</p>
                              <Badge variant="outline" className="mt-2 text-[8px] font-black uppercase border-red-200 text-red-600">
                                 {issue.priority} Priority
                              </Badge>
                           </div>
                        ))}
                     </CardContent>
                  </Card>
               )}
            </div>

            {/* Right: Journey Timeline & Sentiment Arc */}
            <div className="xl:col-span-3 space-y-6">
               <Card className="border-primary/10 shadow-md">
                  <CardHeader className="pb-2">
                     <div className="flex items-center justify-between">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Journey Sentiment Arc</CardTitle>
                        <Badge variant="outline" className="text-[10px] font-bold gap-1 border-green-500/20 text-green-600 bg-green-500/5">
                           <TrendingUp className="h-3 w-3" /> Positive Trend
                        </Badge>
                     </div>
                  </CardHeader>
                  <CardContent className="h-64 pt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={customer.sentimentArc}>
                           <defs>
                              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                           <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                           <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} domain={[0, 100]} />
                           <Tooltip
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px' }}
                           />
                           <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </CardContent>
               </Card>

               <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground px-1">Interaction History</h3>
                  <div className="relative">
                     <div className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-primary/50 via-muted to-transparent dashed" />
                     <div className="space-y-6 relative">
                        {customer.timeline.map((event) => (
                           <div key={event.id} className="flex gap-4 group">
                              <div className={cn(
                                 "h-12 w-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-background shadow-lg transition-transform group-hover:scale-110",
                                 event.sentiment === "Positive" ? "bg-green-500 text-white" :
                                    event.sentiment === "Negative" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                              )}>
                                 {getIcon(event.type)}
                              </div>
                              <Card className="flex-1 border-primary/10 shadow-sm transition-all group-hover:shadow-md group-hover:border-primary/30">
                                 <CardContent className="p-4">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                                       <div className="flex items-center gap-3">
                                          <span className="text-xs font-black">{event.date}</span>
                                          <Badge variant="outline" className="text-[10px] font-bold py-0 leading-tight">
                                             {event.type}
                                          </Badge>
                                          <Badge variant="secondary" className={cn(
                                             "text-[10px] font-black uppercase py-0 leading-tight",
                                             event.outcome === "Resolved" ? "bg-green-500/10 text-green-600" : "bg-blue-500/10 text-blue-600"
                                          )}>
                                             {event.outcome}
                                          </Badge>
                                       </div>
                                       <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                          <User className="h-3 w-3" /> {event.agent}
                                       </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
                                       &quot;{event.details}&quot;
                                    </p>
                                 </CardContent>
                              </Card>
                           </div>
                        ))}
                     </div>
                  </div>
                  <Button variant="ghost" className="w-full text-xs font-bold text-muted-foreground hover:text-primary">
                     View All 12 Interactions
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
