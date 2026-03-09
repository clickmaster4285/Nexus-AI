"use client";

import { useState } from "react";
import { Zap, Send, Bot, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { coachingSuggestions, supervisorAgents } from "@/lib/mock-data/supervisor";
import { cn } from "@/lib/utils";

export default function WhisperCoachingPage() {
  const [selectedAgent, setSelectedAgent] = useState(
    supervisorAgents.find((a) => a.status === "On Call") || supervisorAgents[0]
  );
  const [whisperText, setWhisperText] = useState("");

  const activeAgents = supervisorAgents.filter((a) => a.status === "On Call");

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black tracking-tight text-foreground">Whisper Coaching</h1>
        <p className="text-sm text-muted-foreground font-medium">
          Provide real-time guidance and AI-powered suggestions to active agents.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0 overflow-hidden">
        {/* Active Sessions Sidebar */}
        <Card className="xl:col-span-1 flex flex-col min-h-0 border-primary/10 shadow-md">
          <CardHeader className="p-4 bg-primary/5 border-b">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <div className="divide-y divide-primary/5">
              {activeAgents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={cn(
                    "p-4 cursor-pointer transition-all hover:bg-muted/50 flex items-center gap-3",
                    selectedAgent.id === agent.id
                      ? "bg-primary/5 border-l-4 border-primary"
                      : "border-l-4 border-transparent"
                  )}
                >
                  <Avatar className="h-10 w-10 border border-primary/10 shadow-sm">
                    <AvatarFallback className="text-xs font-black">{agent.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black truncate">{agent.name}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">with {agent.customer}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[8px] font-black uppercase",
                      agent.sentiment === "Positive"
                        ? "text-green-600 border-green-200"
                        : "text-red-600 border-red-200"
                    )}
                  >
                    {agent.sentiment}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Coaching Interface */}
        <div className="xl:col-span-2 flex flex-col gap-6 min-h-0 overflow-hidden">
          {/* Whisper Console */}
          <Card className="flex-1 border-primary/10 shadow-lg flex flex-col min-h-0 bg-linear-to-b from-card to-secondary/5">
            <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary fill-current" />
                </div>
                <div>
                  <CardTitle className="text-md font-black">
                    Whisper Console: {selectedAgent.name}
                  </CardTitle>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">
                    Live Session Assistance
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 gap-1.5 font-black uppercase text-[9px] px-2">
                  <Sparkles className="h-3 w-3 animate-pulse" /> AI Analysis Active
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6 flex flex-col gap-6 overflow-hidden flex-1">
              {/* Context Area */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-muted/30 border border-primary/5 space-y-2">
                  <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1.5">
                    Active Topic
                  </p>
                  <p className="text-sm font-bold text-primary italic">
                    &quot;Troubleshooting hardware warranty for Nexus Pro v4&quot;
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-muted/30 border border-primary/5 space-y-2 text-right">
                  <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex items-center justify-end gap-1.5">
                    Sentiment Arc
                  </p>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-lg font-black text-green-600">82%</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>

              {/* AI Suggested Whispers */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2 px-1">
                  <Bot className="h-4 w-4 text-primary" /> Generated Suggestions
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {coachingSuggestions.map((sug) => (
                    <div
                      key={sug.id}
                      className="p-4 rounded-2xl border bg-card/50 hover:bg-card hover:border-primary/30 transition-all group cursor-pointer flex items-center justify-between"
                    >
                      <div className="space-y-1 pr-4">
                        <Badge
                          variant="outline"
                          className="text-[8px] font-black uppercase px-1 py-0 leading-none mb-1 border-primary/20 text-primary"
                        >
                          {sug.category} Trigger
                        </Badge>
                        <p className="text-xs font-medium leading-relaxed italic border-l-2 border-primary/20 pl-3">
                          &quot;{sug.suggestion}&quot;
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-sm"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manual Whisper Input */}
              <div className="mt-auto pt-6 border-t border-dashed">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Zap className="absolute left-3 top-3 h-4 w-4 text-primary opacity-50" />
                    <Input
                      placeholder="Type a manual whisper to the agent..."
                      className="pl-10 h-10 text-xs font-medium border-primary/10 bg-card rounded-2xl"
                      value={whisperText}
                      onChange={(e) => setWhisperText(e.target.value)}
                    />
                  </div>
                  <Button className="h-10 px-6 gap-2 font-black shadow-lg rounded-2xl">
                    <Send className="h-4 w-4" /> Send Whisper
                  </Button>
                </div>
                <p className="text-[9px] text-muted-foreground mt-3 italic text-center uppercase tracking-tight font-bold">
                  * Agent will hear this via text-to-speech or see it in their coaching HUD
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
