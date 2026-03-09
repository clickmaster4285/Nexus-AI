"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Trophy, 
  LifeBuoy
} from "lucide-react";

export default function AgentPortalLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const activeTab = pathname.split("/").pop() || "dashboard";

  const handleTabChange = (value) => {
    router.push(`/agent-portal/${value}`);
  };

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

        {/* Sub-navigation Tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-6 border-b-0">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" /> My Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="workspace" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Interaction Room
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <Trophy className="h-4 w-4 mr-2" /> My Performance
              </TabsTrigger>
              <TabsTrigger 
                value="support" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <LifeBuoy className="h-4 w-4 mr-2" /> Support & KB
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
