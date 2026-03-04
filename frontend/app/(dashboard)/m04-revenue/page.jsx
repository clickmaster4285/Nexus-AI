"use client";

import { } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  TrendingUp,
  BadgeDollarSign,
  Download,
  Calendar,
  Filter
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Components
import RevenueDashboard from "@/components/m04/RevenueDashboard";
import OpportunitySignals from "@/components/m04/OpportunitySignals";
import ChurnRetention from "@/components/m04/ChurnRetention";
import SalesScorecards from "@/components/m04/SalesScorecards";

// Mock Data
import {
  mockRevenueKpis,
  mockOpportunitySignals,
  mockOpportunities,
  mockChurnRisks,
  mockPlaybooks,
  mockSalesScores
} from "@/lib/mock-data/revenue";

export default function RevenueIntelligencePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  const setActiveTab = (tab) => {
    router.push(`/m04-revenue?tab=${tab}`);
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Revenue Intelligence</h2>
          </div>
          <p className="text-muted-foreground">Maximize conversion and minimize churn with AI-driven insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 text-primary font-bold px-3 py-1">
            <BadgeDollarSign className="h-3 w-3 mr-1.5" /> $450k REVENUE AT RISK
          </Badge>
          <div className="h-10 w-px bg-border/50 mx-2" />
          <Button variant="outline" size="sm" className="h-10 px-4 gap-2 font-bold backdrop-blur-sm bg-background/50">
            <Download className="h-4 w-4" /> Export Revenue Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between bg-muted/30 p-1.5 rounded-xl border">
          <TabsList className="bg-transparent border-none">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg px-6">
              KPI Overview
            </TabsTrigger>
            <TabsTrigger value="signals" className="data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg px-6">
              Upsell & Signals
            </TabsTrigger>
            <TabsTrigger value="churn" className="data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg px-6">
              Churn & Retention
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg px-6">
              Sales Scoring
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 px-2">
            <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs opacity-70">
              <Calendar className="h-3.5 w-3.5" /> Last 30 Days
            </Button>
            <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs opacity-70">
              <Filter className="h-3.5 w-3.5" /> Filter View
            </Button>
          </div>
        </div>

        <TabsContent value="dashboard" className="space-y-6 animate-in fade-in duration-300">
          <RevenueDashboard kpis={mockRevenueKpis} />
        </TabsContent>

        <TabsContent value="signals" className="space-y-6 animate-in fade-in duration-300">
          <OpportunitySignals signals={mockOpportunitySignals} opportunities={mockOpportunities} />
        </TabsContent>

        <TabsContent value="churn" className="space-y-6 animate-in fade-in duration-300">
          <ChurnRetention risks={mockChurnRisks} playbooks={mockPlaybooks} />
        </TabsContent>

        <TabsContent value="sales" className="space-y-6 animate-in fade-in duration-300">
          <SalesScorecards scores={mockSalesScores} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
