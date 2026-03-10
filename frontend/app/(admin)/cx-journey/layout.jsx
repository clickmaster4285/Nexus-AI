"use client";

import {   Compass} from "lucide-react";

export default function CXJourneyLayout({ children }) {

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Compass className="h-6 w-6 text-primary" />
              CUSTOMER EXPERIENCE <span className="text-primary/80 uppercase text-lg">& Journey</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              End-to-End Journey Mapping & Voice of Customer Analytics
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Average CSAT</p>
              <p className="text-xl font-black text-green-600">4.82 / 5.0</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Net Promoter Score</p>
              <p className="text-xl font-black text-blue-600">72.4 (Excellent)</p>
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
