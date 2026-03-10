"use client";

import { 
  Activity
} from "lucide-react";
import KPITicker from "./KPITicker";

export default function RealtimeOpsLayout({ children }) {
  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-2 py-4">
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
      </div>

      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}
