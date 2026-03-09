"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import FileWizard from '@/components/data-upload/FileWizard';
import ImportHistory from '@/components/data-upload/ImportHistory';

export default function DataUploadEnginePage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "wizard";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Data Upload Engine</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for Data Upload Engine. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="wizard" className="mt-0 border-none p-0 outline-hidden">
          <FileWizard />
        </TabsContent>
        <TabsContent value="history" className="mt-0 border-none p-0 outline-hidden">
          <ImportHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
