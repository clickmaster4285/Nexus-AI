"use client";

import { 
  Bot, 
  Sparkles
} from "lucide-react";

export default function AISupervisorLayout({ children }) {

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              AI SUPERVISOR <span className="text-primary/80 uppercase text-lg">Copilot</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Real-time Assist, Automated Coaching & Shift Briefings
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 flex items-center gap-1 px-3 py-1 font-bold">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              COPILOT ONLINE
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}

// Simple internal Badge
function Badge({ children, className, variant }) {
  const variants = {
    outline: "border border-input bg-background hover:bg-accent",
  };
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
