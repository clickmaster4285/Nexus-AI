"use client";

import { useState } from "react";
import { MessageCircle, Activity, Play, Square, Volume2, Mic, ShieldAlert, ArrowRight, TrendingUp, ListFilter, Maximize2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { liveInteractions } from "@/lib/mock-data/supervisor";
import { cn } from "@/lib/utils";

export default function InteractionsPage() {
  const [selectedInteraction, setSelectedInteraction] = useState(liveInteractions[0]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-220px)] overflow-hidden p-1">
      {/* Interaction List Sidebar */}
      <Card className="xl:col-span-1 flex flex-col min-h-0 border-primary/10 shadow-md">
        <CardHeader className="p-4 bg-primary/5 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Live Interactions</CardTitle>
            <ListFilter className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto flex-1 custom-scrollbar">
          <div className="divide-y divide-primary/5">
            {liveInteractions.map((int) => (
              <div
                key={int.id}
                onClick={() => setSelectedInteraction(int)}
                className={cn(
                  "p-4 cursor-pointer transition-all hover:bg-muted/50 group",
                  selectedInteraction.id === int.id ? "bg-primary/5 border-l-4 border-primary" : "border-l-4 border-transparent"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-2 w-2 rounded-full animate-pulse",
                      int.sentiment === "Positive" ? "bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]" : "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]"
                    )} />
                    <span className="text-xs font-black">{int.agent}</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground font-bold">{int.duration}</span>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium truncate mb-1">Customer: {int.customer}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[8px] font-black uppercase px-1 py-0 shadow-sm">{int.topic}</Badge>
                  <span className="text-[9px] text-muted-foreground flex items-center gap-1 font-bold">
                    <Activity className="h-2.5 w-2.5" /> {int.confidence}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Monitoring Deck */}
      <div className="xl:col-span-3 flex flex-col gap-6 min-h-0 overflow-hidden">
        {/* Interaction Header */}
        <Card className="border-primary/10 shadow-md px-6 py-4 flex flex-row items-center justify-between bg-card/50 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Agent</span>
              <span className="text-lg font-black">{selectedInteraction.agent}</span>
            </div>
            <div className="h-8 w-px bg-primary/10 hidden md:block" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Customer</span>
              <span className="text-lg font-black">{selectedInteraction.customer}</span>
            </div>
            <div className="h-8 w-px bg-primary/10 hidden lg:block" />
            <div className="hidden sm:block">
              <Badge variant="outline" className={cn(
                "text-[10px] font-black uppercase px-3 py-1 gap-2 shadow-sm bg-background",
                selectedInteraction.sentiment === "Positive" ? "text-green-600 border-green-200" : "text-red-600 border-red-200"
              )}>
                <TrendingUp className="h-3 w-3" /> {selectedInteraction.sentiment} Sentiment
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={isMonitoring ? "destructive" : "default"}
              size="sm"
              className="h-10 px-6 gap-2 font-black shadow-lg uppercase tracking-widest text-[10px]"
              onClick={() => setIsMonitoring(!isMonitoring)}
            >
              {isMonitoring ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              {isMonitoring ? "Stop Monitoring" : "Start Live Monitor"}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Transcript Area */}
          <Card className="lg:col-span-2 flex flex-col border-primary/10 shadow-lg min-h-0 overflow-hidden bg-card/30">
            <CardHeader className="p-4 border-b bg-muted/20 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" /> Live Transcript (AI Powered)
              </CardTitle>
              <Maximize2 className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => alert("Expanding viewer...")} />
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
              {selectedInteraction.transcript.map((line, idx) => (
                <div key={idx} className={cn(
                  "flex gap-4",
                  line.speaker === "Agent" ? "flex-row-reverse" : "flex-row"
                )}>
                  <div className={cn(
                    "h-8 w-8 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black shadow-sm",
                    line.speaker === "Agent" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  )}>
                    {line.speaker === "Agent" ? "AG" : "CU"}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl relative shadow-sm transition-all hover:shadow-md",
                    line.speaker === "Agent" ? "bg-primary/5 border border-primary/10 rounded-tr-none" : "bg-muted/50 border border-border rounded-tl-none"
                  )}>
                    <p className="text-sm font-medium leading-relaxed">{line.text}</p>
                    <span className="absolute -bottom-5 right-1 text-[8px] font-black text-muted-foreground opacity-50 uppercase tracking-tighter italic">10:4{idx} AM</span>
                  </div>
                </div>
              ))}
              {isMonitoring && (
                <div className="flex gap-4 items-center justify-center pt-8 opacity-50 italic">
                  <div className="flex gap-1">
                    <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-1 w-1 bg-primary rounded-full animate-bounce" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Agent is typing / speaking...</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action & Tools Panel */}
          <div className="space-y-6 flex flex-col min-h-0">
            <Card className="border-primary/10 shadow-md bg-card/50">
              <CardHeader className="p-4 pb-2 bg-primary/5 border-b mb-4">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary">In-Call Controls</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="h-16 flex-col gap-1 text-[9px] font-black uppercase border-primary/10 hover:border-primary hover:bg-primary/5 transition-all group" onClick={() => alert("Listening to live audio...")}>
                    <Volume2 className="h-4 w-4 group-hover:scale-110 transition-transform" /> Listen
                  </Button>
                  <Button variant="outline" size="sm" className="h-16 flex-col gap-1 text-[9px] font-black uppercase border-primary/10 hover:border-primary hover:bg-primary/5 transition-all group" onClick={() => alert("Opening whisper channel...")}>
                    <Mic className="h-4 w-4 group-hover:scale-110 transition-transform" /> Barge In
                  </Button>
                </div>
                <Button className="w-full h-10 gap-2 font-black shadow-lg bg-orange-500 hover:bg-orange-600 text-white border-none transition-all text-[10px] uppercase tracking-widest" onClick={() => alert("Taking over session control...")}>
                  Take Over Session
                </Button>
              </CardContent>
            </Card>

            <Card className="flex-1 border-primary/20 bg-linear-to-b from-card to-secondary/5 shadow-inner overflow-hidden relative">
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
              <CardHeader className="p-4 pb-2 bg-primary/5 border-b mb-4">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" /> Risk Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4 relative z-10">
                <div className="p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-primary/10 space-y-2 shadow-sm">
                  <p className="text-[11px] font-black text-primary uppercase italic underline decoration-2 underline-offset-4">Churn Signal Detected</p>
                  <p className="text-[10px] text-muted-foreground font-medium leading-relaxed italic">
                    Customer mentioned <span className="font-bold text-foreground underline decoration-red-500/30">&quot;cancelation&quot;</span> twice. AI Score: 88% Churn Risk.
                  </p>
                </div>
                <div className="space-y-1.5 pt-2">
                  <p className="text-[9px] font-black uppercase text-muted-foreground px-1 tracking-widest">Active Compliance</p>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-green-500/5 border border-green-500/20 text-green-600 shadow-sm">
                    <span className="text-[9px] font-black uppercase">Privacy Disclosure Verified</span>
                    <CheckCircle2 className="h-3 w-3 shadow-sm" />
                  </div>
                </div>
                <Button variant="link" className="w-full text-[10px] font-black uppercase h-auto p-0 flex items-center gap-1 justify-center pt-2 text-primary hover:no-underline hover:opacity-70 transition-opacity" onClick={() => alert("Loading case file...")}>
                  Open Full Case File <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
