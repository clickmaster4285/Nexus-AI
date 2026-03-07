"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import DashboardBuilder from "@/components/m07/DashboardBuilder";
import ReportLibrary from "@/components/m07/ReportLibrary";
import ExecutiveBriefing from "@/components/m07/ExecutiveBriefing";

export default function ReportingBIStudioPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "builder";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Reporting & BI Studio</h1>
          <p className="text-muted-foreground">Self-service dashboard builder and AI-powered executive insights.</p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="builder" className="mt-0 border-none p-0 outline-hidden">
          <DashboardBuilder />
        </TabsContent>
        <TabsContent value="library" className="mt-0 border-none p-0 outline-hidden">
          <ReportLibrary />
        </TabsContent>
        <TabsContent value="briefing" className="mt-0 border-none p-0 outline-hidden">
          <ExecutiveBriefing />
        </TabsContent>
      </Tabs>
    </div>
  );
}
