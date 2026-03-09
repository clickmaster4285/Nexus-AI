"use client";

import { useState } from "react";
import {
   BarChart3,
   Target,
   MessageSquare,
   Zap,
   BadgeCheck,
   Mic2,
   HelpCircle,
   Globe,
   Star,
   ChevronRight,
   Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SalesScorecards({ scores }) {
   const [selectedCall, setSelectedCall] = useState(scores[0]);

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Left: Call List */}
            <div className="lg:col-span-1 space-y-4">
               <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Filter sales calls..." className="pl-8 h-9 text-xs" />
               </div>
               <div className="space-y-2 max-h-175 overflow-y-auto pr-2">
                  {scores.map((score) => (
                     <Card
                        key={score.id}
                        className={cn(
                           "cursor-pointer transition-all border shadow-none",
                           selectedCall.id === score.id ? "border-primary bg-primary/5 shadow-md" : "hover:bg-muted/30"
                        )}
                        onClick={() => setSelectedCall(score)}
                     >
                        <CardContent className="p-3 space-y-2">
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-muted-foreground">{score.id}</span>
                              <Badge className={cn(
                                 "text-[9px] px-1.5 h-4",
                                 score.totalScore > 80 ? "bg-green-500" : score.totalScore > 60 ? "bg-amber-500" : "bg-red-500"
                              )}>
                                 {score.totalScore}%
                              </Badge>
                           </div>
                           <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold truncate">Sales Call Entry</h5>
                              <span className="text-[9px] font-bold text-muted-foreground">{score.outcome}</span>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>

            {/* Right: Detailed Analysis (4.4.1) */}
            <div className="lg:col-span-3 space-y-6">
               <Card className="border-primary/20 shadow-xl overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b pb-4">
                     <div className="flex items-center justify-between">
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-xl">Deep Sales Performance Analysis</CardTitle>
                              <Badge variant="outline" className="border-primary/30 text-primary font-mono text-[10px]">{selectedCall.id}</Badge>
                           </div>
                           <CardDescription>Comprehensive breakdown of 10 critical sales metrics.</CardDescription>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Composite Sales Score</p>
                           <div className="flex items-center gap-3">
                              <h2 className="text-4xl font-bold font-mono tracking-tighter text-primary">{selectedCall.totalScore}%</h2>
                              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                                 <Target className="h-6 w-6 text-primary" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </CardHeader>
                  <CardContent className="p-0">
                     {/* Performance Grid */}
                     <div className="grid grid-cols-2 md:grid-cols-4 border-b divide-x divide-y md:divide-y-0">
                        {[
                           { label: "1. Opening", val: selectedCall.opening, icon: Mic2 },
                           { label: "2. Discovery", val: selectedCall.discovery, icon: HelpCircle },
                           { label: "3. Value Prop", val: selectedCall.valueProp, icon: Zap },
                           { label: "4. Objection", val: selectedCall.objectionHandling, icon: MessageSquare }
                        ].map((m, i) => (
                           <div key={i} className="p-4 space-y-2 bg-muted/5 group hover:bg-muted/10 transition-colors">
                              <div className="flex items-center justify-between">
                                 <m.icon className="h-3.5 w-3.5 text-muted-foreground" />
                                 <span className="text-xs font-bold font-mono">{m.val}%</span>
                              </div>
                              <p className="text-[9px] font-bold text-muted-foreground uppercase">{m.label}</p>
                              <Progress value={m.val} className="h-1" />
                           </div>
                        ))}
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        {/* 5. Close Attempt Boolean */}
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                 <BadgeCheck className="h-3.5 w-3.5 text-primary" /> 5. Close Attempted?
                              </Label>
                           </div>
                           <div className={cn(
                              "flex items-center justify-center h-20 rounded-xl border-2 border-dashed transition-all",
                              selectedCall.closeAttempt ? "bg-green-50 border-green-200 text-green-700 font-bold" : "bg-red-50 border-red-200 text-red-700 font-bold grayscale"
                           )}>
                              {selectedCall.closeAttempt ? "SUCCESSFUL ATTEMPT" : "NO CLOSE ATTEMPTED"}
                           </div>
                        </div>

                        {/* 6. Talk-Listen Ratio Gauge */}
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                 <Globe className="h-3.5 w-3.5 text-primary" /> 6. Talk-to-Listen
                              </Label>
                              <span className="text-xs font-bold">{selectedCall.talkListenRatio}% Talk</span>
                           </div>
                           <div className="relative pt-2">
                              <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                                 <div className="h-full bg-primary" style={{ width: `${selectedCall.talkListenRatio}%` }} />
                                 <div className="h-full bg-blue-300" style={{ width: `${100 - selectedCall.talkListenRatio}%` }} />
                              </div>
                              <div className="flex justify-between text-[8px] mt-1 font-bold text-muted-foreground">
                                 <span>AGENT</span>
                                 <span>CUSTOMER</span>
                              </div>
                           </div>
                        </div>

                        {/* 7. Question Ratio */}
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                 <HelpCircle className="h-3.5 w-3.5 text-primary" /> 7. Question Ratio
                              </Label>
                              <span className="text-xs font-bold">{selectedCall.questionRatio}%</span>
                           </div>
                           <div className="h-20 flex items-end justify-center gap-1 px-4">
                              {[3, 5, 8, 12, 10, 15, selectedCall.questionRatio].map((h, i) => (
                                 <div
                                    key={i}
                                    className={cn(
                                       "w-full rounded-t-sm transition-all duration-500",
                                       i === 6 ? "bg-primary animate-bounce" : "bg-muted-foreground/20"
                                    )}
                                    style={{ height: `${(h / 30) * 100}%` }}
                                 />
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-t bg-muted/10">
                        {/* 8. Competitor Mention */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
                           <div className="flex items-center gap-2">
                              <div className={cn(
                                 "p-1.5 rounded-md",
                                 selectedCall.competitorMention ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                              )}>
                                 <BarChart3 className="h-4 w-4" />
                              </div>
                              <span className="text-[10px] font-bold uppercase text-muted-foreground">8. Competitor Mentioned?</span>
                           </div>
                           <Badge variant={selectedCall.competitorMention ? "destructive" : "secondary"} className="text-[9px] h-4">
                              {selectedCall.competitorMention ? "YES" : "NO"}
                           </Badge>
                        </div>

                        {/* 9. Outcome */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
                           <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
                                 <Star className="h-4 w-4" />
                              </div>
                              <span className="text-[10px] font-bold uppercase text-muted-foreground">9. Outcome</span>
                           </div>
                           <Badge className={cn(
                              "text-[9px] h-4",
                              selectedCall.outcome === 'Sold' ? "bg-green-500" : "bg-red-500"
                           )}>
                              {selectedCall.outcome.toUpperCase()}
                           </Badge>
                        </div>

                        {/* Interaction Button */}
                        <Button className="w-full gap-2 font-bold shadow-md">
                           Review Full Transcript <ChevronRight className="h-4 w-4" />
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               {/* AI Coaching Insight Layer */}
               <Card className="bg-primary border-none text-primary-foreground shadow-xl">
                  <CardContent className="p-6">
                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
                           <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                        </div>
                        <div className="space-y-2">
                           <h4 className="font-bold text-lg">AI Sales Coaching Recommendation</h4>
                           <p className="text-sm opacity-90 leading-relaxed">
                              Agent **Sarah Jenkins** excelled in Discovery but missed the Close Attempt. **Recommendation:** Implement the &quot;Assumptive Close&quot; technique shown in the Value Preservation playbook.
                           </p>
                           <div className="flex gap-4 pt-2">
                              <Button variant="secondary" size="sm" className="font-bold">ASSIGN COACHING MODULE</Button>
                              <Button variant="link" size="sm" className="text-white font-bold h-auto p-0">VIEW DRILL DOWN</Button>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
