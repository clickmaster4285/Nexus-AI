"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CustomerJourney from "@/components/m06/CustomerJourney";
import VoCAnalytics from "@/components/m06/VoCAnalytics";
import SelfServiceAnalytics from "@/components/m06/SelfServiceAnalytics";

export default function CXJourneyPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "journey";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">CUSTOMER EXPERIENCE</h1>
          <p className="text-muted-foreground">End-to-end journey mapping and sentiment intelligence.</p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="journey" className="mt-0 border-none p-0 outline-hidden">
          <CustomerJourney />
        </TabsContent>
        <TabsContent value="voc" className="mt-0 border-none p-0 outline-hidden">
          <VoCAnalytics />
        </TabsContent>
        <TabsContent value="deflection" className="mt-0 border-none p-0 outline-hidden">
          <SelfServiceAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
