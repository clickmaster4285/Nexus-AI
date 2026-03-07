"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SupervisorMonitor from "@/components/supervisor-ai/SupervisorMonitor";
import WhisperCoaching from "@/components/supervisor-ai/WhisperCoaching";
import QueueThresholds from "@/components/supervisor-ai/QueueThresholds";
import InteractionMonitoring from "@/components/supervisor-ai/InteractionMonitoring";

export default function SupervisorAIConsolePage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "monitor";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Supervisor AI Console</h1>
          <p className="text-muted-foreground">Real-time command center for team performance and AI coaching.</p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="monitor" className="mt-0 border-none p-0 outline-hidden">
          <SupervisorMonitor />
        </TabsContent>
        <TabsContent value="coaching" className="mt-0 border-none p-0 outline-hidden">
          <WhisperCoaching />
        </TabsContent>
        <TabsContent value="queues" className="mt-0 border-none p-0 outline-hidden">
          <QueueThresholds />
        </TabsContent>
        <TabsContent value="interactions" className="mt-0 border-none p-0 outline-hidden">
          <InteractionMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
}
