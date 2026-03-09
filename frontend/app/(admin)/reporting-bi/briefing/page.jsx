"use client";

import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, Calendar, Share2, Download, MessageSquare, ShieldCheck, Zap, ArrowRight, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { executiveBriefing } from "@/lib/mock-data/reporting";

export default function ExecutiveBriefing() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header / Meta */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-primary/10 pb-6">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 py-1 px-3 gap-2 font-black uppercase text-[10px] tracking-widest">
            <Sparkles className="h-3 w-3" /> AI GENERATED BRIEFING
          </Badge>
          <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Weekly Performance Narrative</h2>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium pt-1">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Period: Feb 26 - Mar 04, 2024</span>
            <span className="flex items-center gap-1.5 border-l border-primary/10 pl-4"><ShieldCheck className="h-4 w-4" /> Confidential - Internal Only</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-bold border-primary/10">
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button size="sm" className="h-9 gap-2 text-xs font-black shadow-lg">
            <Download className="h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Executive Summary Narrative */}
      <Card className="border-none shadow-2xl bg-linear-to-br from-primary/10 via-background to-secondary/5 overflow-hidden">
        <CardContent className="p-8 relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <MessageSquare className="h-32 w-32 text-primary" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-primary/10">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-black tracking-tight uppercase italic">Intelligence Summary</h3>
            </div>
            <p className="text-xl font-medium leading-relaxed italic text-foreground/80 border-l-4 border-primary/30 pl-8 py-2">
              &quot;{executiveBriefing.summary}&quot;
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Positive Performance Drivers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Key Highlights</h4>
          </div>
          <div className="space-y-3">
            {executiveBriefing.highlights.map((item, idx) => (
              <Card key={idx} className="border-green-500/10 bg-green-500/5 shadow-sm hover:shadow-md transition-all group">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="h-8 w-8 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-sm font-bold leading-tight">{item}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[8px] font-black uppercase border-green-200 text-green-600 px-1 py-0">Verified</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Strategic Risks */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Identified Risks</h4>
          </div>
          <div className="space-y-3">
            {executiveBriefing.risks.map((item, idx) => (
              <Card key={idx} className="border-amber-500/10 bg-amber-500/5 shadow-sm hover:shadow-md transition-all group">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-sm font-bold leading-tight">{item}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="link" className="p-0 h-auto text-[10px] font-bold text-amber-600 flex items-center gap-1 group/btn">
                        Investigate Root Cause <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Recommendation */}
      <Card className="border-primary/20 shadow-xl bg-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-black uppercase tracking-widest">Strategic Recommendation</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="p-6 rounded-2xl bg-background/50 border border-primary/10 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Based on the positive trajectory of revenue signals but slight decline in mobile sentiment, we recommend a cross-functional <span className="font-bold text-foreground italic">&quot;Mobile Conversion Sprint&quot;</span> focusing on the billing interface. Automating the high-volume billing FAQs could deflect 15% of inbound pressure, allowing staff to focus on Platinum tier retention.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-muted-foreground">Estimated Impact</span>
                <span className="text-lg font-black text-primary">+8.5% Growth</span>
              </div>
              <div className="flex flex-col border-l border-primary/10 pl-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground">Resourcing</span>
                <span className="text-lg font-black text-primary">Medium Priority</span>
              </div>
            </div>
            <Button className="w-full h-12 text-sm font-black uppercase tracking-tight shadow-lg gap-2 mt-4">
              <Zap className="h-5 w-5 fill-current" /> Initialize Action Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
