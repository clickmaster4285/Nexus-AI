"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import InternalDNC from '@/components/dnc-management/InternalDNC';
import NationalRegistry from '@/components/dnc-management/NationalRegistry';
import CallingWindows from '@/components/dnc-management/CallingWindows';

export default function DNCAndCompliancePage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "internal";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">DNC & Compliance</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for DNC & Compliance. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="internal" className="mt-0 border-none p-0 outline-hidden">
          <InternalDNC />
        </TabsContent>
        <TabsContent value="national" className="mt-0 border-none p-0 outline-hidden">
          <NationalRegistry />
        </TabsContent>
        <TabsContent value="compliance" className="mt-0 border-none p-0 outline-hidden">
          <CallingWindows />
        </TabsContent>
      </Tabs>
    </div>
  );
}
