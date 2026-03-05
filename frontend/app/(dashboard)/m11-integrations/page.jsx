"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CRMConnectors from "@/components/m11/CRMConnectors";
import WebhookStreams from "@/components/m11/WebhookStreams";
import APIManagement from "@/components/m11/APIManagement";

export default function IntegrationsPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "crm";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Integrations & Hub</h1>
          <p className="text-muted-foreground">Connect Nexus AI to your ecosystem and manage developer access.</p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="crm" className="mt-0 border-none p-0 outline-hidden">
          <CRMConnectors />
        </TabsContent>
        <TabsContent value="webhooks" className="mt-0 border-none p-0 outline-hidden">
          <WebhookStreams />
        </TabsContent>
        <TabsContent value="api" className="mt-0 border-none p-0 outline-hidden">
          <APIManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
