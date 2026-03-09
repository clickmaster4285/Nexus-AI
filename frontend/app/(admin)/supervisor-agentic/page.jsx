"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ActionCenter from '@/components/supervisor-agentic/ActionCenter';
import DecisionLog from '@/components/supervisor-agentic/DecisionLog';
import EscalationChain from '@/components/supervisor-agentic/EscalationChain';

export default function AgenticAutomationPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "actions";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Agentic Automation</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for Agentic Automation. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="actions" className="mt-0 border-none p-0 outline-hidden">
          <ActionCenter />
        </TabsContent>
        <TabsContent value="log" className="mt-0 border-none p-0 outline-hidden">
          <DecisionLog />
        </TabsContent>
        <TabsContent value="chain" className="mt-0 border-none p-0 outline-hidden">
          <EscalationChain />
        </TabsContent>
      </Tabs>
    </div>
  );
}
