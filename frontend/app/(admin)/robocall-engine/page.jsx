"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CampaignConfig from  '@/components/robocall-engine/CampaignConfig';
import DeliveryAnalytics from '@/components/robocall-engine/DeliveryAnalytics';

export default function RobocallCampaignPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "config";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Robocall Campaign</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for Robocall Campaign. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="config" className="mt-0 border-none p-0 outline-hidden">
          <CampaignConfig />
        </TabsContent>
        <TabsContent value="analytics" className="mt-0 border-none p-0 outline-hidden">
          <DeliveryAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
