"use client";

import { 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck, 
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  X
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AIAssistPage() {
  const handleAction = (action) => {
    toast.info(`AI Action: ${action}`);
  };

  const handleFeedback = (id) => {
    toast.success(`Feedback recorded for suggestion #${id}`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] gap-6">
      {/* Live Sentiment & Compliance Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-blue-600 tracking-wider">Live Sentiment</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-blue-800">Positive</span>
                  <Badge className="bg-blue-200 text-blue-800 hover:bg-blue-300 border-none">85/100</Badge>
                </div>
              </div>
            </div>
            <div className="hidden md:block w-32 h-10">
              {/* Mock Sparkline */}
              <svg className="w-full h-full text-blue-400" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 25 5 50 10 T 100 2" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-green-600 tracking-wider">Compliance Status</p>
                <p className="text-lg font-bold text-green-800">All Checks Passed</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-white/50 border-green-200 text-green-700 hover:bg-green-100" onClick={() => handleAction("View Checklist")}>
              View Checklist
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Suggestions Stream */}
      <div className="flex-1 overflow-auto space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Live Suggestions Stream
          </h3>
          <Badge variant="outline" className="animate-pulse">Live Updating...</Badge>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="border-l-4 border-l-amber-500 shadow-sm animate-in slide-in-from-right-4 duration-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Upsell Opportunity Detected</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Customer mentioned &quot;scaling team&quot;. Suggest the <span className="font-semibold text-foreground">Enterprise Plan</span> which allows unlimited seats.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white border-none" onClick={() => handleAction("Accept Upsell Hint")}>
                        Show Pricing
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction("Dismiss Hint")}>
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleFeedback(1, 'up')}>
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleFeedback(1, 'down')}>
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 shadow-sm animate-in slide-in-from-right-4 delay-150 duration-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Retention Risk Alert</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Negative sentiment detected regarding &quot;pricing&quot;. Competitor &quot;X&quot; mentioned.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="destructive" onClick={() => handleAction("Open Retention Script")}>
                        Open Retention Script
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => handleAction("Close Alert")}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-sm animate-in slide-in-from-right-4 delay-300 duration-500 opacity-60">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Next Best Action</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      After resolving the technical issue, ask for a satisfaction rating.
                    </p>
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
