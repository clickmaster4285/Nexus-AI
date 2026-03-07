"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import IVRBuilder from  '@/components/inbound-ivr/IVRBuilder';
import QueueConfig from '@/components/inbound-ivr/QueueConfig';
import RoutingRules from '@/components/inbound-ivr/RoutingRules';
import CallbackManager from '@/components/inbound-ivr/CallbackManager';

export default function InboundRoutingAndIVRPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "ivr";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Inbound Routing & IVR</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for Inbound Routing & IVR. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="ivr" className="mt-0 border-none p-0 outline-hidden">
          <IVRBuilder />
        </TabsContent>
        <TabsContent value="queue" className="mt-0 border-none p-0 outline-hidden">
          <QueueConfig />
        </TabsContent>
        <TabsContent value="routing" className="mt-0 border-none p-0 outline-hidden">
          <RoutingRules />
        </TabsContent>
        <TabsContent value="callback" className="mt-0 border-none p-0 outline-hidden">
          <CallbackManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
