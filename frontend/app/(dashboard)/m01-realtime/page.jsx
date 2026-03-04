"use client";

import { useState } from "react";
import AgentStateBoard from "@/components/m01/AgentStateBoard";
import QueueMonitoringPanel from "@/components/m01/QueueMonitoringPanel";
import ActiveCallCards from "@/components/m01/ActiveCallCards";
import KPITicker from "@/components/m01/KPITicker";
import SupervisorIntervention from "@/components/m01/SupervisorIntervention";
import AlertsPanel from "@/components/m01/AlertsPanel";
import AlertRulesEngine from "@/components/m01/AlertRulesEngine";
import WallboardManager from "@/components/m01/WallboardManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, LayoutDashboard, Monitor, Bell } from "lucide-react";

export default function RealtimeOpsPage() {
  const [activeTab, setActiveTab] = useState("live-ops");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Real-Time Operations Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Live monitoring, queue management, and supervisor command center
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      {/* KPI Ticker - Always visible */}
      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Real-Time KPIs</h2>
        <KPITicker />
      </section>

      {/* Tabbed Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-150">
          <TabsTrigger value="live-ops" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Live Operations</span>
            <span className="sm:hidden">Live</span>
          </TabsTrigger>
          <TabsTrigger value="supervisor" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Supervisor</span>
            <span className="sm:hidden">Super</span>
          </TabsTrigger>
          <TabsTrigger value="wallboards" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Wallboards</span>
            <span className="sm:hidden">Wall</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
            <span className="sm:hidden">Alerts</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Live Operations Wall */}
        <TabsContent value="live-ops" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Agent State Board - Takes 7 columns */}
            <div className="lg:col-span-7">
              <AgentStateBoard />
            </div>

            {/* Right Column - Queue & Active Calls - Takes 5 columns */}
            <div className="lg:col-span-5 space-y-6">
              <QueueMonitoringPanel />
              <ActiveCallCards />
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Supervisor Tools */}
        <TabsContent value="supervisor" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SupervisorIntervention />
            <AlertsPanel />
          </div>
        </TabsContent>

        {/* Tab 3: Wallboard Manager */}
        <TabsContent value="wallboards" className="space-y-6">
          <WallboardManager />
        </TabsContent>

        {/* Tab 4: Alerts Engine */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <AlertRulesEngine />
            <AlertsPanel />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
