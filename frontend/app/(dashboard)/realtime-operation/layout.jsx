"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Monitor, 
  Bell,
  Activity
} from "lucide-react";
import KPITicker from "@/components/realtime-operation/KPITicker";

export default function RealtimeOpsLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const activeTab = pathname.split("/").pop() || "live-ops";

  const handleTabChange = (value) => {
    router.push(`/realtime-operation/${value}`);
  };

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              REAL-TIME OPERATIONS
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Live Monitoring & Command Center
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">System Live</span>
          </div>
        </div>

        {/* KPI Ticker - Always visible in M01 */}
        <div className="mt-4 pt-4 border-t">
          <KPITicker />
        </div>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-6 border-b-0">
              <TabsTrigger 
                value="live-ops" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" /> Live Wall
              </TabsTrigger>
              <TabsTrigger 
                value="supervisor" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <ShieldAlert className="h-4 w-4 mr-2" /> Supervisor Tools
              </TabsTrigger>
              <TabsTrigger 
                value="wallboards" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <Monitor className="h-4 w-4 mr-2" /> Wallboards
              </TabsTrigger>
              <TabsTrigger 
                value="alerts" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <Bell className="h-4 w-4 mr-2" /> Alerts Engine
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
}
