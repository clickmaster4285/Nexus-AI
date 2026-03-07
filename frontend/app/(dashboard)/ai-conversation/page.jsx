"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Clock,
  User,
  Bot,
  PlayCircle,
  Library
} from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TranscriptViewer from "@/components/ai-conversation/TranscriptViewer";
import TranscriptSearch from "@/components/ai-conversation/TranscriptSearch";
import NLPInsights from "@/components/ai-conversation/NLPInsights";
import ConversationAnalytics from "@/components/ai-conversation/ConversationAnalytics";
import { mockTranscripts } from "@/lib/mock-data/transcripts";
import { cn } from "@/lib/utils";

export default function ConversationIntelligencePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "transcript";
  const [activeTranscript, setActiveTranscript] = useState(mockTranscripts[0]);

  const setActiveTab = (tab) => {
    router.push(`/ai-conversation?tab=${tab}`);
  };

  const handleWordClick = (time) => {
    // In a real app, this would seek the audio player
    console.log(`Seeking to ${time}s`);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Module Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Conversation Intelligence</h1>
          <p className="text-muted-foreground">Advanced transcription, NLP insights, and pattern recognition.</p>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
          <Badge variant="secondary" className="gap-1 font-mono">
            <Clock className="h-3 w-3" />
            LIVE
          </Badge>
          <span className="text-xs text-muted-foreground px-2">Processing 24 calls/min</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col gap-6">
        {/* Internal switchers removed to favor Sidebar navigation */}

        {/* 2.1 Transcription Management */}
        <TabsContent value="transcript" className="flex-1 flex flex-col min-h-0 data-[state=active]:flex">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 min-h-0">
            {/* Left: Metadata & Player Sidebar */}
            <div className="xl:col-span-1 space-y-6 overflow-y-auto pr-2">
              <Card className="border-primary/20 shadow-md">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-500">#{activeTranscript.callId}</Badge>
                    <span className="text-xs text-muted-foreground">Mar 04, 2026</span>
                  </div>

                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center group relative cursor-pointer overflow-hidden border-2 border-primary/20">
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <PlayCircle className="h-12 w-12 text-white/50 group-hover:text-white group-hover:scale-110 transition-all z-10" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white/80 z-10 font-mono">
                      <span>0:42 / 6:52</span>
                      <div className="w-24 h-1 bg-white/20 rounded-full">
                        <div className="w-1/3 h-full bg-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1"><User className="h-3 w-3" /> Agent</span>
                      <span className="font-bold">Sarah Jenkins (A001)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1"><Bot className="h-3 w-3" /> Customer</span>
                      <span className="font-bold">John Doe (CUST-982)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Queue</span>
                      <Badge variant="outline" className="h-5 text-[10px]">Billing Support</Badge>
                    </div>
                  </div>

                  <Button className="w-full gap-2 font-bold shadow-sm" size="sm">
                    <Library className="h-4 w-4" />
                    Archive Transcript
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Transcripts</h4>
                <div className="space-y-2">
                  {mockTranscripts.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setActiveTranscript(t)}
                      className={cn(
                        "p-3 rounded-xl border text-left cursor-pointer transition-all hover:shadow-md",
                        activeTranscript.id === t.id ? "bg-primary/5 border-primary shadow-sm ring-1 ring-primary/20" : "bg-card hover:border-primary/30"
                      )}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-xs">#{t.callId}</span>
                        <div className={cn("h-1.5 w-1.5 rounded-full", t.sentiment > 70 ? "bg-green-500" : "bg-yellow-500")} />
                      </div>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">{t.summary.primaryReason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle: Main Transcript Viewer */}
            <div className="xl:col-span-3 flex flex-col min-h-0">
              <TranscriptViewer transcript={activeTranscript} onWordClick={handleWordClick} />
            </div>
          </div>
        </TabsContent>

        {/* 2.1.2 Bulk Search */}
        <TabsContent value="search" className="flex-1 min-h-0 data-[state=active]:block">
          <TranscriptSearch />
        </TabsContent>

        {/* 2.2 NLP Insights Panel */}
        <TabsContent value="insights" className="flex-1 min-h-0 data-[state=active]:block overflow-y-auto pr-2">
          <NLPInsights data={activeTranscript} />
        </TabsContent>

        {/* 2.3 Conversation Analytics */}
        <TabsContent value="analytics" className="flex-1 min-h-0 data-[state=active]:block overflow-y-auto pr-2">
          <ConversationAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
