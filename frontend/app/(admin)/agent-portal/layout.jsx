"use client";

import { 
  LayoutDashboard, 
} from "lucide-react";

export default function AgentPortalLayout({ children }) {  

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              AGENT <span className="text-primary/80 uppercase text-lg">Self-Service</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Personal Performance, Gamification & Knowledge Base
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Current Points</p>
              <p className="text-xl font-black text-primary">4,820 XP</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Daily Adherence</p>
              <p className="text-xl font-black text-green-600">96.4%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {children}
      </div>
    </div>
  );
}
