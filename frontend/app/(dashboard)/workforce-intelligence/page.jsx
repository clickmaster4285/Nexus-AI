"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Users} from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AgentDirectory from "@/components/workforce-intelligence/AgentDirectory";
import PerformanceAnalytics from "@/components/workforce-intelligence/PerformanceAnalytics";
import GamificationEngine from "@/components/workforce-intelligence/GamificationEngine";
import WellbeingDashboard from "@/components/workforce-intelligence/WellbeingDashboard";
import WFMForecasting from "@/components/workforce-intelligence/WFMForecasting";

export default function WorkforceIntelligencePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "directory";

  const setActiveTab = (tab) => {
    router.push(`/workforce-intelligence?tab=${tab}`);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Module Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workforce Intelligence</h1>
          <p className="text-muted-foreground">Comprehensive agent profiles, performance metrics, and wellbeing monitoring.</p>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
          <Badge variant="secondary" className="gap-1 font-mono">
            <Users className="h-3 w-3" />
            Active Force: 154
          </Badge>
          <span className="text-xs text-muted-foreground px-2">92% Adherence</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col gap-6">
        {/* 5.1 Agent Directory & Profiles */}
        <TabsContent value="directory" className="flex-1 min-h-0 data-[state=active]:block">
          <AgentDirectory />
        </TabsContent>

        {/* 5.2 Performance Analytics */}
        <TabsContent value="performance" className="flex-1 min-h-0 data-[state=active]:block">
          <PerformanceAnalytics />
        </TabsContent>

        {/* 5.3 Gamification Engine */}
        <TabsContent value="gamification" className="flex-1 min-h-0 data-[state=active]:block">
          <GamificationEngine />
        </TabsContent>

        {/* 5.4 Wellbeing & Burnout Engine */}
        <TabsContent value="wellbeing" className="flex-1 min-h-0 data-[state=active]:block">
          <WellbeingDashboard />
        </TabsContent>

        {/* 5.5 WFM Analytics & Forecasting */}
        <TabsContent value="forecasting" className="flex-1 min-h-0 data-[state=active]:block">
          <WFMForecasting />
        </TabsContent>
      </Tabs>
    </div>
  );
}
