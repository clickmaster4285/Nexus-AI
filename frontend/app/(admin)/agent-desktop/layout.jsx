"use client";

import { 
  Monitor, 
  Mic,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AgentDesktopLayout({ children }) {  

  return (
    <div className="flex flex-col h-full bg-background/50">
      {/* Module Header & Status Bar */}
      <div className="border-b bg-background px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                AGENT DESKTOP
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20 px-1.5">
                  Connected
                </Badge>
                <span className="text-[10px] text-muted-foreground font-mono">SIP: 1001</span>
              </div>
            </div>
            
            <div className="h-8 w-px bg-border mx-2 hidden md:block" />
            
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Available</span>
              </div>
              <span className="text-xs text-muted-foreground">04:12</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => toast.success("Mic test initiated")}>
              <Mic className="h-3 w-3 mr-2" /> Test Mic
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => toast.info("Audio settings opened")}>
              <Volume2 className="h-3 w-3 mr-2" /> Audio Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}
