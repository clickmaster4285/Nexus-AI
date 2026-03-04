"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  Settings,
  Layout,
  ShieldCheck,
  Users,
  Search,
  Filter,
  Download,
  Plus,
  PlayCircle,
  FileText
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockQualityForms, mockEvaluations, mockComplianceRules } from "@/lib/mock-data/qa";

// M03 Components
import ScorecardBuilder from "@/components/m03/ScorecardBuilder";
import EvaluationReview from "@/components/m03/EvaluationReview";
import ComplianceMonitor from "@/components/m03/ComplianceMonitor";
import CoachingWorkflow from "@/components/m03/CoachingWorkflow";

export default function QACompliancePage() {
  const [activeTab, setActiveTab] = useState("scorecards");

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-transparent">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-primary/10 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <ClipboardCheck className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">QA & Compliance</h1>
            <p className="text-muted-foreground font-medium">Standardizing excellence through AI-powered oversight.</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 text-primary font-bold px-3 py-1">
            <ShieldCheck className="h-3 w-3 mr-1.5" /> 100% AUDIT COVERAGE
          </Badge>
          <div className="h-10 w-[1px] bg-border/50 mx-2" />
          <Button variant="outline" size="sm" className="h-10 px-4 gap-2 font-bold backdrop-blur-sm bg-background/50">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Main Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col gap-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 h-12 bg-muted/30 backdrop-blur-sm border p-1 rounded-xl">
          <TabsTrigger value="scorecards" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Scorecards</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
            <Layout className="h-4 w-4" />
            <span className="hidden sm:inline">Reviews</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Compliance</span>
          </TabsTrigger>
          <TabsTrigger value="coaching" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Coaching</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <div className="relative flex-1">
          <TabsContent value="scorecards" className="m-0 mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ScorecardBuilder />
          </TabsContent>

          <TabsContent value="reviews" className="m-0 mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <EvaluationReview evaluation={mockEvaluations[0]} />
          </TabsContent>

          <TabsContent value="compliance" className="m-0 mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ComplianceMonitor rules={mockComplianceRules} />
          </TabsContent>

          <TabsContent value="coaching" className="m-0 mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <CoachingWorkflow />
          </TabsContent>
        </div>
      </Tabs>

      {/* Background Decorative Elements */}
      <div className="fixed top-[20%] right-[-5%] w-[30%] h-[40%] bg-primary/2 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[25%] h-[35%] bg-blue-500/3 rounded-full blur-[100px] pointer-events-none -z-10" />
    </div>
  );
}
