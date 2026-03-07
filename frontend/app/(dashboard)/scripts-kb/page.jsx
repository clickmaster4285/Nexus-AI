"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ScriptBuilder from '@/components/scripts-kb/ScriptBuilder';
import KbManager from '@/components/scripts-kb/KbManager';

export default function ScriptAndKBBuilderPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "scripts";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Script & KB Builder</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for Script & KB Builder. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="scripts" className="mt-0 border-none p-0 outline-hidden">
          <ScriptBuilder />
        </TabsContent>
        <TabsContent value="kb" className="mt-0 border-none p-0 outline-hidden">
          <KbManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
