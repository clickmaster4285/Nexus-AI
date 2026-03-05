"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CarrierConnectivity from "@/components/m10/CarrierConnectivity";
import NumberManagement from "@/components/m10/NumberManagement";
import IVRFlowBuilder from "@/components/m10/IVRFlowBuilder";
import TelephonyHealth from "@/components/m10/TelephonyHealth";

export default function TelephonyHubPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "connectivity";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Telephony Hub</h1>
          <p className="text-muted-foreground">Manage SIP infrastructure, carrier connections, and routing flows.</p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="connectivity" className="mt-0 border-none p-0 outline-hidden">
          <CarrierConnectivity />
        </TabsContent>
        <TabsContent value="numbers" className="mt-0 border-none p-0 outline-hidden">
          <NumberManagement />
        </TabsContent>
        <TabsContent value="ivr" className="mt-0 border-none p-0 outline-hidden">
          <IVRFlowBuilder />
        </TabsContent>
        <TabsContent value="health" className="mt-0 border-none p-0 outline-hidden">
          <TelephonyHealth />
        </TabsContent>
      </Tabs>
    </div>
  );
}
