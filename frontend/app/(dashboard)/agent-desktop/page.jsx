"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Softphone from  '@/components/agent-desktop/Softphone';
import ScreenPop from '@/components/agent-desktop/ScreenPop';
import LiveScript from '@/components/agent-desktop/LiveScript';
import KBSearch from '@/components/agent-desktop/KBSearch';
import AIAssist from '@/components/agent-desktop/AIAssist';
import ACWPanel from '@/components/agent-desktop/ACWPanel';

export default function AgentDesktopPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "phone";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Agent Desktop</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for Agent Desktop. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="phone" className="mt-0 border-none p-0 outline-hidden">
          <Softphone />
        </TabsContent>
        <TabsContent value="pop" className="mt-0 border-none p-0 outline-hidden">
          <ScreenPop />
        </TabsContent>
        <TabsContent value="script" className="mt-0 border-none p-0 outline-hidden">
          <LiveScript />
        </TabsContent>
        <TabsContent value="kb" className="mt-0 border-none p-0 outline-hidden">
          <KBSearch />
        </TabsContent>
        <TabsContent value="assist" className="mt-0 border-none p-0 outline-hidden">
          <AIAssist />
        </TabsContent>
        <TabsContent value="acw" className="mt-0 border-none p-0 outline-hidden">
          <ACWPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
