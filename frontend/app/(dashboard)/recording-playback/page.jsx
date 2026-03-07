"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import RecordingBrowser from "@/components/m09/RecordingBrowser";
import UnifiedMediaPlayer from "@/components/m09/UnifiedMediaPlayer";
import LifecycleManagement from "@/components/m09/LifecycleManagement";

export default function RecordingPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "browser";

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tighter uppercase">Recording & Media</h1>
        <p className="text-muted-foreground">Search, playback, and manage interaction lifecycle.</p>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="browser" className="mt-0 border-none p-0 outline-hidden">
          <RecordingBrowser />
        </TabsContent>
        <TabsContent value="player" className="mt-0 border-none p-0 outline-hidden">
          <UnifiedMediaPlayer />
        </TabsContent>
        <TabsContent value="lifecycle" className="mt-0 border-none p-0 outline-hidden">
          <LifecycleManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
