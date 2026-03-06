"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarrierConnectivity from "@/components/m10/CarrierConnectivity";
import NumberManagement from "@/components/m10/NumberManagement";
import IVRFlowBuilder from "@/components/m10/IVRFlowBuilder";
import TelephonyHealth from "@/components/m10/TelephonyHealth";
import ConnectorConfiguration from "@/components/m10/ConnectorConfiguration";

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
        <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="connectivity" className="text-[10px] font-black uppercase tracking-widest">Connectivity</TabsTrigger>
          <TabsTrigger value="numbers" className="text-[10px] font-black uppercase tracking-widest">Numbers</TabsTrigger>
          <TabsTrigger value="ivr" className="text-[10px] font-black uppercase tracking-widest">IVR Flows</TabsTrigger>
          <TabsTrigger value="ai" className="text-[10px] font-black uppercase tracking-widest">AI Connectors</TabsTrigger>
          <TabsTrigger value="health" className="text-[10px] font-black uppercase tracking-widest">QoS Health</TabsTrigger>
        </TabsList>

        <TabsContent value="connectivity" className="mt-0 border-none p-0 outline-hidden">
          <CarrierConnectivity />
        </TabsContent>
        <TabsContent value="numbers" className="mt-0 border-none p-0 outline-hidden">
          <NumberManagement />
        </TabsContent>
        <TabsContent value="ivr" className="mt-0 border-none p-0 outline-hidden">
          <IVRFlowBuilder />
        </TabsContent>
        <TabsContent value="ai" className="mt-0 border-none p-0 outline-hidden">
          <ConnectorConfiguration />
        </TabsContent>
        <TabsContent value="health" className="mt-0 border-none p-0 outline-hidden">
          <TelephonyHealth />
        </TabsContent>
      </Tabs>
    </div>
  );
}
