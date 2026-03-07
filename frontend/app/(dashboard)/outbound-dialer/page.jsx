"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CampaignBuilder from '@/components/outbound-dialer/CampaignBuilder';
import CallListManagement from '@/components/outbound-dialer/CallListManagement';
import PacingControl from '@/components/outbound-dialer/PacingControl';

export default function OutboundDialerPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "builder";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Outbound Dialer</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for Outbound Dialer. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="builder" className="mt-0 border-none p-0 outline-hidden">
          <CampaignBuilder />
        </TabsContent>
        <TabsContent value="list" className="mt-0 border-none p-0 outline-hidden">
          <CallListManagement />
        </TabsContent>
        <TabsContent value="pacing" className="mt-0 border-none p-0 outline-hidden">
          <PacingControl />
        </TabsContent>
      </Tabs>
    </div>
  );
}
