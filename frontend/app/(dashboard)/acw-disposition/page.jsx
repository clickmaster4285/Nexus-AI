"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import DispositionCodes from '@/components/acw-disposition/DispositionCodes';
import AcwTimers from '@/components/acw-disposition/AcwTimers';

export default function ACWAndDispositionPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "codes";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">ACW & Disposition</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for ACW & Disposition. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="codes" className="mt-0 border-none p-0 outline-hidden">
          <DispositionCodes />
        </TabsContent>
        <TabsContent value="timers" className="mt-0 border-none p-0 outline-hidden">
          <AcwTimers />
        </TabsContent>
      </Tabs>
    </div>
  );
}
