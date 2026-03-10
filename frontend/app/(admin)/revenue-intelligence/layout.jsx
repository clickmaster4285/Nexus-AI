"use client";

import {   DollarSign} from "lucide-react";

export default function RevenueIntelligenceLayout({ children }) {

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              REVENUE INTELLIGENCE <span className="text-primary/80 uppercase text-lg">Layer</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Predictive Churn, Upsell Signals & Sales Performance
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Revenue at Risk</p>
              <p className="text-xl font-black text-red-600">$124,500</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Upsell Pipeline</p>
              <p className="text-xl font-black text-green-600">$482,000</p>
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
