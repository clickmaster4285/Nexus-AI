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
  ChevronRight
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
import { mockTranscripts } from "@/lib/mock-data/transcripts";

export default function NLPInsightsPage() {
  const [showHistory, setShowHistory] = useState(false);
  const data = mockTranscripts[0];

  if (!data) return (
    <div className="p-8 text-center text-muted-foreground">
      No conversation intelligence data found.
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-1">
      <div className="space-y-6">
        {/* Intent & Topic Classification (2.2.1) */}
        <Card>
          <CardHeader className="pb-3 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Layout className="h-5 w-5 text-primary" />
                Intent & Topics
              </CardTitle>
              <Badge variant="outline" className="bg-background">2.2.1</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Primary Intent</Label>
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary hover:bg-primary px-3 py-1 text-sm shadow-sm ring-2 ring-primary/20">
                    {data.nlp.intents[0].name}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Progress value={data.nlp.intents[0].confidence * 100} className="w-20 h-1.5" />
                    <span className="text-xs font-mono font-bold">{Math.round(data.nlp.intents[0].confidence * 100)}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Outcome</Label>
                <div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 capitalize">
                    {data.summary.resolutionStatus}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Secondary Intents</Label>
              <div className="flex flex-wrap gap-2">
                {data.nlp.intents.slice(1).map((intent, i) => (
                  <Badge key={i} variant="outline" className="bg-muted/50 border-dashed">
                    {intent.name} ({Math.round(intent.confidence * 100)}%)
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Topic Clusters</Label>
              <div className="flex flex-wrap gap-2">
                {data.nlp.topics.map((topic, i) => (
                  <Badge key={i} className="bg-secondary/30 text-secondary-foreground border-secondary/50 hover:bg-secondary/50 transition-colors">
                    #{topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Product Mentions</Label>
              <div className="flex flex-wrap gap-2">
                {data.nlp.products.map((product, i) => (
                  <Badge key={i} variant="outline" className="bg-primary/5 text-primary border-primary/30">
                    {product}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-muted/40 rounded-lg border border-dashed">
              <Label className="text-[9px] text-muted-foreground uppercase font-bold">RFC Reference</Label>
              <p className="text-xs font-mono mt-1 text-muted-foreground">RFC-2026-X99: Standard billing dispute protocol applied.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900/50">
                <Label className="text-[9px] text-red-600 dark:text-red-400 uppercase font-bold">Follow-up Required</Label>
                <div className="flex items-center gap-2 mt-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-semibold">{data.summary.nextSteps[0]}</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/50">
                <Label className="text-[9px] text-blue-600 dark:text-blue-400 uppercase font-bold">Competitor Mention</Label>
                <div className="flex items-center gap-2 mt-1">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-semibold">{data.nlp.competitors[0] || 'None'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Named Entity Recognition (2.2.2) */}
        <Card>
          <CardHeader className="pb-3 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Entity Recognition & PII
              </CardTitle>
              <Badge variant="outline" className="bg-background">2.2.2</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Entity Type</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Extracted Value</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4 text-right">Sentiment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.nlp.entities.map((entity, i) => (
                  <TableRow key={i} className="hover:bg-muted/20">
                    <TableCell className="text-xs font-medium px-4 py-2 border-r">{entity.type}</TableCell>
                    <TableCell className="text-xs px-4 py-2">
                      <span className={cn(
                        "font-mono px-1.5 py-0.5 rounded",
                        entity.type.includes('PII') ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-muted/70"
                      )}>
                        {entity.value}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-right px-4 py-2">
                      <div className="flex items-center justify-end gap-1.5">
                        {entity.sentiment === 'positive' && <TrendingUp className="h-3 w-3 text-green-500" />}
                        {entity.sentiment === 'negative' && <TrendingDown className="h-3 w-3 text-red-500" />}
                        {entity.sentiment === 'neutral' && <Minus className="h-3 w-3 text-yellow-500" />}
                        <span className="capitalize">{entity.sentiment}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* AI Call Summary (2.2.3) */}
        <Card className="h-full flex flex-col shadow-lg border-primary/20">
          <CardHeader className="pb-4 border-b bg-primary/5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Intelligence Summary
                </CardTitle>
                <CardDescription className="text-xs">Generated via Nexus LLM • Template: {data.summary.templateUsed}</CardDescription>
              </div>
              <Badge variant="outline" className="bg-background">2.2.3</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col space-y-6">
            <div className="space-y-3">
              <Label className="text-xs font-bold flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Primary Interaction Reason
              </Label>
              <p className="text-sm bg-muted/30 p-4 rounded-xl italic leading-relaxed text-foreground/90 border-l-4 border-primary">
                &quot;{data.summary.primaryReason}&quot;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold">Agent Actions</Label>
                <ul className="space-y-1.5">
                  {data.summary.agentActions.map((action, i) => (
                    <li key={i} className="text-xs flex items-center gap-2 text-muted-foreground bg-muted/20 px-2 py-1.5 rounded-md">
                      <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Next Steps</Label>
                <ul className="space-y-1.5">
                  {data.summary.nextSteps.map((step, i) => (
                    <li key={i} className="text-xs flex items-center gap-2 text-primary bg-primary/5 px-2 py-1.5 rounded-md border border-primary/10">
                      <ArrowRight className="h-3 w-3 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold">Key Insight Bullets</Label>
              <div className="grid grid-cols-1 gap-2">
                {data.summary.keyPoints.map((point, i) => (
                  <div key={i} className="flex gap-3 text-xs leading-relaxed group">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="space-y-0.5">
                    <Label className="text-[10px] text-muted-foreground uppercase font-bold">Sentiment</Label>
                    <div className="text-xs font-semibold">{data.summary.sentimentSummary}</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="gap-2 shadow-sm font-bold"
                  onClick={() => alert("Call intelligence pushed to CRM successfully!")}
                >
                  <Send className="h-3.5 w-3.5" />
                  Push to CRM
                </Button>
              </div>

              <Collapsible open={showHistory} onOpenChange={setShowHistory}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-between h-8 text-xs text-muted-foreground hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <History className="h-3.5 w-3.5" />
                      View Edit History
                    </div>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", showHistory ? "rotate-90" : "")} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="space-y-2 text-[10px] bg-muted/30 p-3 rounded-lg border border-dashed">
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Updated by System</span>
                      <span>2026-03-04 10:22 AM</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Reviewed by Agent A001</span>
                      <span>2026-03-04 10:25 AM</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
