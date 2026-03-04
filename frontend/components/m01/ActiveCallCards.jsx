"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getActiveCalls } from "@/lib/mock-data/calls";
import { getAgentById } from "@/lib/mock-data/agents";
import { Phone, Mic, Ear, LogIn, PhoneOff, TrendingUp, TrendingDown, Minus, ShieldAlert } from "lucide-react";

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function ActiveCallCard({ call }) {
  const [duration, setDuration] = useState(call.duration);
  const [transcriptIndex, setTranscriptIndex] = useState(0);

  const agent = getAgentById(call.agentId);

  // Mock transcript snippets
  const transcriptSnippets = [
    "Thank you for calling our support center...",
    "I understand your concern about the billing...",
    "Let me check that for you right away...",
    "I can see the issue now and I'll resolve it...",
    "Is there anything else I can help you with?",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    const transcriptInterval = setInterval(() => {
      setTranscriptIndex((prev) => (prev + 1) % transcriptSnippets.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(transcriptInterval);
    };
  }, []);

  const sentimentTrend =
    call.sentiment >= 80 ? "rising" : call.sentiment >= 50 ? "stable" : "falling";
  const escalationRisk = 100 - call.sentiment;
  const holdCount = Math.floor(duration / 180); // Simulate holds every 3 mins

  const TrendIcon =
    sentimentTrend === "rising"
      ? TrendingUp
      : sentimentTrend === "falling"
      ? TrendingDown
      : Minus;

  return (
    <Card className={escalationRisk > 70 ? "border-red-500" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-green-500 animate-pulse" />
            <div>
              <p className="font-semibold text-sm">{call.id}</p>
              <p className="text-xs text-muted-foreground">{call.customerId}</p>
            </div>
          </div>
          <Badge variant={call.direction === "inbound" ? "default" : "secondary"}>
            {call.direction}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Agent</span>
            <span className="text-sm font-medium">{agent?.name || call.agentId}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="font-mono text-lg font-bold">{formatDuration(duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Queue</span>
            <span className="text-sm">{call.queue}</span>
          </div>

          <div className="p-2 bg-muted rounded text-xs text-muted-foreground">
            {transcriptSnippets[transcriptIndex]}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Sentiment</span>
              <div className="flex items-center gap-1">
                <TrendIcon className="h-3 w-3" />
                <span className="text-xs font-medium">{call.sentiment}%</span>
              </div>
            </div>
            <Progress value={call.sentiment} className="h-1.5" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Escalation Risk</span>
              <span className={`text-xs font-medium ${escalationRisk > 70 ? "text-red-500" : ""}`}>
                {escalationRisk}%
              </span>
            </div>
            <Progress
              value={escalationRisk}
              className={`h-1.5 ${escalationRisk > 70 ? "bg-red-200" : ""}`}
            />
          </div>

          {holdCount > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <ShieldAlert className={`h-3 w-3 ${holdCount > 3 ? "text-red-500" : "text-yellow-500"}`} />
              <span className={holdCount > 3 ? "text-red-500" : ""}>
                {holdCount} hold{holdCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          <div className="flex gap-1 pt-2">
            <Button size="sm" variant="outline" className="flex-1 text-xs h-7">
              <Ear className="h-3 w-3 mr-1" />
              Monitor
            </Button>
            <Button size="sm" variant="outline" className="flex-1 text-xs h-7">
              <Mic className="h-3 w-3 mr-1" />
              Whisper
            </Button>
            <Button size="sm" variant="outline" className="flex-1 text-xs h-7">
              <LogIn className="h-3 w-3 mr-1" />
              Barge
            </Button>
            <Button size="sm" variant="destructive" className="flex-1 text-xs h-7">
              <PhoneOff className="h-3 w-3 mr-1" />
              End
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ActiveCallCards() {
  const activeCalls = getActiveCalls();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Active Calls</CardTitle>
          <Badge variant="secondary" className="bg-green-500 text-white animate-pulse">
            {activeCalls.length} Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {activeCalls.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No active calls
          </div>
        ) : (
          <div className="grid gap-3">
            {activeCalls.map((call) => (
              <ActiveCallCard key={call.id} call={call} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
