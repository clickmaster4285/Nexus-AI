"use client";

import AgentStateBoard from "@/components/m01/AgentStateBoard";
import QueueMonitoringPanel from "@/components/m01/QueueMonitoringPanel";
import ActiveCallCards from "@/components/m01/ActiveCallCards";
import KPITicker from "@/components/m01/KPITicker";
import SupervisorIntervention from "@/components/m01/SupervisorIntervention";
import AlertsPanel from "@/components/m01/AlertsPanel";

export default function RealtimeOpsPage() {
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

      {/* KPI Ticker */}
      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Real-Time KPIs</h2>
        <KPITicker />
      </section>

      {/* Main Content Grid */}
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

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SupervisorIntervention />
        <AlertsPanel />
      </div>
    </div>
  );
}
