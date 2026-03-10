"use client";

import { Users } from "lucide-react";

export default function WorkforceIntelligenceLayout({ children }) {

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              WORKFORCE <span className="text-primary/80 uppercase text-lg">Intelligence</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Agent Performance, Wellbeing & Schedule Forecasting
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Staffing Level</p>
              <p className="text-xl font-black text-green-600">98% Optimal</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Avg. Engagement</p>
              <p className="text-xl font-black text-blue-600">4.8/5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}
