"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PersonalDashboard from "@/components/m13/PersonalDashboard";
import InteractionWorkspace from "@/components/m13/InteractionWorkspace";
import PerformanceGamification from "@/components/m13/PerformanceGamification";
import SelfServiceTools from "@/components/m13/SelfServiceTools";

export default function AgentPortalPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Agent Portal</h1>
          <p className="text-muted-foreground">Personalized workspace for interaction management and performance tracking.</p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="dashboard" className="mt-0 border-none p-0 outline-hidden">
          <PersonalDashboard />
        </TabsContent>
        <TabsContent value="workspace" className="mt-0 border-none p-0 outline-hidden">
          <InteractionWorkspace />
        </TabsContent>
        <TabsContent value="performance" className="mt-0 border-none p-0 outline-hidden">
          <PerformanceGamification />
        </TabsContent>
        <TabsContent value="support" className="mt-0 border-none p-0 outline-hidden">
          <SelfServiceTools />
        </TabsContent>
      </Tabs>
    </div>
  );
}
