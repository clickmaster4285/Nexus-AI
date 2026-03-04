"use client";

import {
   ShieldAlert,
   BookOpen,
   Trash2,
   Plus,
   History,
   CheckCircle2,
   Users,
   Target,
   ArrowRight,
   Settings2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function ChurnRetention({ playbooks }) {
   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Left Sidebar: Churn Risk Configuration (4.3.1) */}
            <div className="lg:col-span-1 space-y-6">
               <Card className="h-full border-red-100 shadow-sm shadow-red-50">
                  <CardHeader className="bg-red-50/50 border-b">
                     <CardTitle className="text-sm font-bold flex items-center gap-2 text-red-700">
                        <ShieldAlert className="h-4 w-4" />
                        Churn Detection Model
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground mr-2">1. Risk Vocabulary</Label>
                        <Textarea
                           defaultValue="cancel, unhappy, competitor, too expensive, fraud, legal"
                           className="h-20 text-xs border-red-100 bg-red-50/10"
                        />
                     </div>

                     {[
                        { label: "2. Sentiment Threshold", min: 30, desc: "Trigger if score below" },
                        { label: "3. Alert Threshold", min: 70, desc: "Confidence for supervisor" },
                        { label: "6. High-Value Weight", min: 80, desc: "Priority for top-tier" }
                     ].map((s, i) => (
                        <div key={i} className="space-y-3">
                           <div className="flex items-center justify-between">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{s.label}</Label>
                              <span className="text-xs font-bold text-red-600">{s.min}%</span>
                           </div>
                           <Slider defaultValue={[s.min]} max={100} step={1} className="py-2" />
                           <p className="text-[9px] text-muted-foreground italic font-medium">{s.desc} {s.min}%</p>
                        </div>
                     ))}

                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">4. Retention Playbook</Label>
                        <Select defaultValue="p1">
                           <SelectTrigger className="h-8 border-red-100"><SelectValue /></SelectTrigger>
                           <SelectContent>
                              <SelectItem value="p1">Value Preservation</SelectItem>
                              <SelectItem value="p2">Win-Back Tier 1</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="space-y-2 pt-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">5. Lookback Window</Label>
                        <div className="flex items-center gap-2">
                           <Input type="number" defaultValue={30} className="h-8 w-20 border-red-100" />
                           <span className="text-xs text-muted-foreground font-bold">DAYS</span>
                        </div>
                     </div>

                     <Button className="w-full bg-red-600 hover:bg-red-700 shadow-md">
                        Update Model Weights
                     </Button>
                  </CardContent>
               </Card>
            </div>

            {/* Right Area: Retention Playbook Manager (4.3.2) */}
            <div className="lg:col-span-3 space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight">Retention Playbook Manager</h3>
                  <Button variant="outline" className="gap-2 border-dashed border-primary">
                     <Plus className="h-4 w-4 text-primary" />
                     New Playbook
                  </Button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {playbooks.map((p, i) => (
                     <Card key={i} className="group relative border-2 border-transparent hover:border-primary/20 transition-all overflow-hidden bg-card/50 backdrop-blur-sm">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                                 <Settings2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                 <Trash2 className="h-4 w-4" />
                              </Button>
                           </div>
                        </div>

                        <CardHeader className="pb-3 bg-muted/20 border-b">
                           <div className="flex items-center gap-2">
                              <div className="p-2 rounded-full bg-primary/10">
                                 <BookOpen className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                 <CardTitle className="text-sm font-bold uppercase tracking-widest">{p.name}</CardTitle>
                                 <CardDescription className="text-[10px]">Condition: **{p.trigger}**</CardDescription>
                              </div>
                           </div>
                        </CardHeader>

                        <CardContent className="pt-4 space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <Label className="text-[9px] uppercase font-bold text-muted-foreground">Offer Type</Label>
                                 <Badge variant="secondary" className="w-full h-7 justify-start border-none font-bold text-[10px]">{p.offerType}</Badge>
                              </div>
                              <div className="space-y-1">
                                 <Label className="text-[9px] uppercase font-bold text-muted-foreground">Auth Level</Label>
                                 <Badge variant="outline" className="w-full h-7 justify-start font-bold text-[10px] text-amber-600 border-amber-100">{p.auth}</Badge>
                              </div>
                           </div>

                           <div className="space-y-1">
                              <Label className="text-[9px] uppercase font-bold text-muted-foreground">Offer Details / Talk Track</Label>
                              <div className="p-3 bg-muted/30 rounded-lg text-xs leading-relaxed border border-dashed border-muted-foreground/20 italic">
                                 &quot;{p.details}&quot;
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <Label className="text-[9px] uppercase font-bold text-muted-foreground">Max Per Customer</Label>
                                 <div className="text-sm font-mono font-bold text-primary">{p.max} TIMES</div>
                              </div>
                              <div className="space-y-1">
                                 <Label className="text-[9px] uppercase font-bold text-muted-foreground">Escalation Path</Label>
                                 <div className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3" /> {p.escalation}
                                 </div>
                              </div>
                           </div>

                           <div className="pt-3 border-t flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <CheckCircle2 className="h-3 w-3 text-green-500" />
                                 <span className="text-[9px] font-bold text-muted-foreground">Success Track: {p.success}</span>
                              </div>
                              <Badge className="text-[9px] h-4 bg-green-50 text-green-600 border-green-200">ACTIVE</Badge>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>

               {/* Quick Insights Layer */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                     { label: "Active Churn Risks", value: "15", icon: Users, color: "text-red-500" },
                     { label: "Playbook Success Rate", value: "68%", icon: Target, color: "text-green-500" },
                     { label: "Revenue Preserved", value: "$45k", icon: History, color: "text-blue-500" }
                  ].map((stat, i) => (
                     <Card key={i} className="bg-card/50">
                        <CardContent className="p-4 flex items-center justify-between">
                           <div>
                              <p className="text-[9px] font-bold text-muted-foreground uppercase">{stat.label}</p>
                              <h4 className="text-xl font-bold font-mono">{stat.value}</h4>
                           </div>
                           <stat.icon className={cn("h-5 w-5 opacity-40", stat.color)} />
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
