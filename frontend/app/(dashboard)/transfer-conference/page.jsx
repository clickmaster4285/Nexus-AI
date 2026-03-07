"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TransferPanel from   '@/components/transfer-conference/TransferPanel';
import ConferenceBridge from '@/components/transfer-conference/ConferenceBridge';

export default function TransferAndConferencePage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "transfer";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Transfer & Conference</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for Transfer & Conference. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="transfer" className="mt-0 border-none p-0 outline-hidden">
          <TransferPanel />
        </TabsContent>
        <TabsContent value="conference" className="mt-0 border-none p-0 outline-hidden">
          <ConferenceBridge />
        </TabsContent>
      </Tabs>
    </div>
  );
}
