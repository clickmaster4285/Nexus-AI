"use client";

import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Send,
  History,
  Layout,
  TrendingDown,
  TrendingUp,
  FileText,
  Minus,
  Bot,
  ChevronRight,
  Sparkles,
  BrainCircuit,
  Zap,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function InsightsPanel({ data }) {
  const [showHistory, setShowHistory] = useState(false);

  if (!data) return (
    <div className="p-8 text-center text-muted-foreground italic">
      No conversation intelligence data found.
    </div>
  );

  return (
    <div className="space-y-8 p-6 pb-20">
      {/* AI Executive Brief */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> AI Executive Brief
          </h3>
          <Badge className="bg-green-500/10 text-green-600 border-none uppercase text-[9px] font-black italic px-2">
            {data.summary.resolutionStatus}
          </Badge>
        </div>
        <div className="p-5 rounded-2xl bg-linear-to-br from-primary/5 to-transparent border border-primary/10 space-y-4">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Primary Intent</span>
            <p className="text-md font-black tracking-tighter uppercase">{data.summary.primaryReason}</p>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">AI Summary</span>
            <p className="text-xs font-medium leading-relaxed italic text-muted-foreground">
              &quot;{data.summary.sentimentSummary}&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Intents & Topics */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
          <BrainCircuit className="h-4 w-4" /> Intent & Entity Mapping
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {data.nlp.intents.map((intent, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border bg-card/50">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-tight">{intent.name}</span>
              </div>
              <span className="text-[10px] font-black font-mono text-muted-foreground">{Math.round(intent.confidence * 100)}%</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {data.nlp.topics.map(topic => (
            <Badge key={topic} variant="secondary" className="bg-muted text-muted-foreground text-[9px] font-black uppercase px-3 py-1 border-none tracking-widest">
              #{topic}
            </Badge>
          ))}
        </div>
      </section>

      {/* Product & Competitor Mentions */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" /> Market Intelligence
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl border bg-blue-500/5 space-y-2">
            <p className="text-[9px] font-black uppercase text-blue-600 tracking-widest">Products</p>
            <div className="flex flex-wrap gap-1">
              {data.nlp.products.map((p, i) => (
                <Badge key={i} variant="outline" className="text-[8px] bg-white dark:bg-black border-blue-200">{p}</Badge>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl border bg-red-500/5 space-y-2">
            <p className="text-[9px] font-black uppercase text-red-600 tracking-widest">Competitors</p>
            <div className="flex flex-wrap gap-1">
              {data.nlp.competitors.length > 0 ? data.nlp.competitors.map((c, i) => (
                <Badge key={i} variant="outline" className="text-[8px] bg-white dark:bg-black border-red-200">{c}</Badge>
              )) : <span className="text-[10px] font-medium italic text-muted-foreground">None detected</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Structured Insights (2.2.3 Data) */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
          <Zap className="h-4 w-4" /> Actionable Insights
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-widest">Agent Actions Taken</Label>
            <ul className="space-y-1.5">
              {data.summary.agentActions.map((action, i) => (
                <li key={i} className="text-xs flex items-center gap-2 text-muted-foreground bg-muted/20 px-3 py-2 rounded-lg border border-transparent hover:border-primary/10 transition-colors">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                  <span className="font-medium">{action}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-widest">Required Next Steps</Label>
            <ul className="space-y-1.5">
              {data.summary.nextSteps.map((step, i) => (
                <li key={i} className="text-xs flex items-center gap-2 text-primary bg-primary/5 px-3 py-2 rounded-lg border border-primary/10">
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  <span className="font-bold italic">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Entity Table (NER) */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
          <FileText className="h-4 w-4" /> Entity Extraction
        </h3>
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[9px] uppercase font-black h-8 px-4 tracking-tighter">Entity</TableHead>
                <TableHead className="text-[9px] uppercase font-black h-8 px-4 tracking-tighter text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.nlp.entities.map((entity, i) => (
                <TableRow key={i} className="hover:bg-muted/20">
                  <TableCell className="text-[10px] font-bold px-4 py-2 border-r">{entity.type}</TableCell>
                  <TableCell className="text-[10px] px-4 py-2 text-right">
                    <span className="font-mono font-black text-primary">{entity.value}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Edit History & Compliance */}
      <div className="pt-4 border-t border-dashed space-y-4">
        <Collapsible open={showHistory} onOpenChange={setShowHistory}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between h-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-muted/50">
              <div className="flex items-center gap-2">
                <History className="h-3.5 w-3.5" />
                Audit Trail
              </div>
              <ChevronRight className={cn("h-4 w-4 transition-transform", showHistory ? "rotate-90" : "")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="space-y-2 text-[9px] bg-muted/30 p-3 rounded-lg border border-dashed font-mono">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>System: AI Model V4.2</span>
                <span>2026-03-12 14:22</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Supervisor: Reviewed</span>
                <span>2026-03-12 14:25</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button className="w-full h-12 text-[10px] font-black uppercase tracking-widest gap-2 shadow-2xl shadow-primary/20">
          Sync to CRM (Account #{data.customerId}) <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
