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
import { salesScores } from "@/lib/mock-data/revenue";

export default function SalesScoringPage() {
  const scores = salesScores;
  const [selectedCall, setSelectedCall] = useState(scores[0]);

  return (
    <div className="space-y-6 p-1">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left: Call List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Filter sales calls..." className="pl-8 h-9 text-xs bg-background" />
          </div>
          <div className="space-y-2 max-h-150 overflow-y-auto pr-2 custom-scrollbar">
            {scores.map((score) => (
              <Card
                key={score.id}
                className={cn(
                  "cursor-pointer transition-all border shadow-none group hover:border-primary/30",
                  selectedCall.id === score.id ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/20" : "hover:bg-muted/30"
                )}
                onClick={() => setSelectedCall(score)}
              >
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground font-bold">{score.id}</span>
                    <Badge className={cn(
                      "text-[9px] px-1.5 h-4 font-bold",
                      score.totalScore > 80 ? "bg-green-500" : score.totalScore > 60 ? "bg-amber-500" : "bg-red-500"
                    )}>
                      {score.totalScore}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold truncate">Sales Call Interaction</h5>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{score.outcome}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Detailed Analysis (4.4.1) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-primary/20 shadow-xl overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-primary/5 border-b pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-xl font-bold tracking-tight">Sales Performance Deep-Dive</CardTitle>
                    <Badge variant="outline" className="border-primary/30 text-primary font-mono text-[10px] bg-background">REF: {selectedCall.id}</Badge>
                  </div>
                  <CardDescription className="text-xs font-medium">AI-powered breakdown of 10 critical sales metrics and behaviors.</CardDescription>
                </div>
                <div className="text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Composite Score</p>
                  <div className="flex items-center gap-3">
                    <h2 className={cn(
                      "text-4xl font-bold font-mono tracking-tighter",
                      selectedCall.totalScore > 80 ? "text-green-500" : "text-primary"
                    )}>{selectedCall.totalScore}%</h2>
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 shadow-inner">
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
                      <m.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-xs font-bold font-mono">{m.val}%</span>
                    </div>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">{m.label}</p>
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
                    "flex flex-col items-center justify-center h-24 rounded-xl border-2 border-dashed transition-all",
                    selectedCall.closeAttempt ? "bg-green-50 border-green-200 text-green-700 shadow-inner" : "bg-red-50 border-red-200 text-red-700 grayscale"
                  )}>
                    <span className="text-xs font-black uppercase tracking-widest">{selectedCall.closeAttempt ? "SUCCESSFUL" : "MISSED"}</span>
                    <p className="text-[10px] mt-1 font-medium opacity-70">Direct close intent detected</p>
                  </div>
                </div>

                {/* 6. Talk-Listen Ratio Gauge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5 text-primary" /> 6. Talk-to-Listen Ratio
                    </Label>
                    <span className="text-xs font-bold font-mono">{selectedCall.talkListenRatio}% Agent</span>
                  </div>
                  <div className="relative pt-2">
                    <div className="h-3 bg-muted rounded-full overflow-hidden flex border border-muted-foreground/10">
                      <div className="h-full bg-primary" style={{ width: `${selectedCall.talkListenRatio}%` }} />
                      <div className="h-full bg-blue-300 dark:bg-blue-900" style={{ width: `${100 - selectedCall.talkListenRatio}%` }} />
                    </div>
                    <div className="flex justify-between text-[8px] mt-1.5 font-black uppercase tracking-tighter text-muted-foreground">
                      <span>AGENT VOICE</span>
                      <span>CUSTOMER VOICE</span>
                    </div>
                  </div>
                </div>

                {/* 7. Question Ratio */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                      <HelpCircle className="h-3.5 w-3.5 text-primary" /> 7. Engagement (Questions)
                    </Label>
                    <span className="text-xs font-bold font-mono">{selectedCall.questionRatio}%</span>
                  </div>
                  <div className="h-24 flex items-end justify-center gap-1 px-2 pb-1 bg-muted/20 rounded-lg">
                    {[3, 5, 8, 12, 10, 15, selectedCall.questionRatio].map((h, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-full rounded-t-sm transition-all duration-700 ease-out",
                          i === 6 ? "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" : "bg-muted-foreground/20"
                        )}
                        style={{ height: `${(h / 30) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-t bg-muted/10">
                {/* 8. Competitor Mention */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-background border shadow-sm group hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      selectedCall.competitorMention ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                    )}>
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-muted-foreground">8. Competitor?</span>
                  </div>
                  <Badge variant={selectedCall.competitorMention ? "destructive" : "secondary"} className="text-[9px] h-4 font-bold">
                    {selectedCall.competitorMention ? "YES" : "NO"}
                  </Badge>
                </div>

                {/* 9. Outcome */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-background border shadow-sm group hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <Star className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-muted-foreground">9. Outcome</span>
                  </div>
                  <Badge className={cn(
                    "text-[9px] h-4 font-black uppercase",
                    selectedCall.outcome === 'Sold' ? "bg-green-500" : "bg-red-500"
                  )}>
                    {selectedCall.outcome}
                  </Badge>
                </div>

                {/* Interaction Button */}
                <Button className="w-full h-11 gap-2 font-black uppercase tracking-widest shadow-lg" onClick={() => alert("Loading full interaction transcript...")}>
                  Full Transcript <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Coaching Insight Layer */}
          <Card className="bg-primary border-none text-primary-foreground shadow-2xl overflow-hidden relative">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start gap-5">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-inner border border-white/20">
                  <Star className="h-7 w-7 text-yellow-300 fill-yellow-300 animate-pulse" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-xl uppercase tracking-tighter italic">AI Coaching Recommendation</h4>
                    <Badge variant="outline" className="text-white border-white/30 font-bold bg-white/5">PRIORITY: HIGH</Badge>
                  </div>
                  <p className="text-sm font-medium opacity-90 leading-relaxed max-w-2xl">
                    Agent <span className="font-black underline decoration-2 underline-offset-4">Sarah Jenkins</span> excelled in Discovery but missed the Close Attempt. **Recommendation:** Implement the <span className="font-bold">&quot;Assumptive Close&quot;</span> technique defined in the Retention win-back protocol.
                  </p>
                  <div className="flex gap-4 pt-3">
                    <Button variant="secondary" size="sm" className="font-black uppercase tracking-widest text-[10px] h-9 px-4" onClick={() => alert("Coaching module assigned to agent dashboard.")}>ASSIGN MODULE</Button>
                    <Button variant="link" size="sm" className="text-white font-black uppercase tracking-widest text-[10px] h-9 p-0 hover:no-underline hover:opacity-70 transition-opacity" onClick={() => alert("Showing behavioral drill down...")}>VIEW DRILL DOWN</Button>
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
