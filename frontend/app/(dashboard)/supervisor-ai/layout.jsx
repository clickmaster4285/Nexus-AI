"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Mic2, 
  BarChart3, 
  MessageSquare,
  Sparkles
} from "lucide-react";

export default function AISupervisorLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const activeTab = pathname.split("/").pop() || "monitor";

  const handleTabChange = (value) => {
    router.push(`/supervisor-ai/${value}`);
  };

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

        {/* Sub-navigation Tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-6 border-b-0">
              <TabsTrigger 
                value="monitor" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <Bot className="h-4 w-4 mr-2" /> Live Copilot
              </TabsTrigger>
              <TabsTrigger 
                value="coaching" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <Mic2 className="h-4 w-4 mr-2" /> Whisper Coaching
              </TabsTrigger>
              <TabsTrigger 
                value="queues" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <BarChart3 className="h-4 w-4 mr-2" /> Queue Health
              </TabsTrigger>
              <TabsTrigger 
                value="interactions" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Interactions
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
