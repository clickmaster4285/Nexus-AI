"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AmiAriConfig from '@/components/asterisk-config/AmiAriConfig';
import PjsipTrunks from '@/components/asterisk-config/PjsipTrunks';
import WebrtcGateway from '@/components/asterisk-config/WebrtcGateway';
import DialplanMapping from '@/components/asterisk-config/DialplanMapping';

export default function AsteriskDeepDivePage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "connection";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Asterisk Deep-Dive</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for Asterisk Deep-Dive. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="connection" className="mt-0 border-none p-0 outline-hidden">
          <AmiAriConfig />
        </TabsContent>
        <TabsContent value="trunks" className="mt-0 border-none p-0 outline-hidden">
          <PjsipTrunks />
        </TabsContent>
        <TabsContent value="webrtc" className="mt-0 border-none p-0 outline-hidden">
          <WebrtcGateway />
        </TabsContent>
        <TabsContent value="dialplan" className="mt-0 border-none p-0 outline-hidden">
          <DialplanMapping />
        </TabsContent>
      </Tabs>
    </div>
  );
}
