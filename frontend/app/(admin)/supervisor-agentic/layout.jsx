"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  History, 
  Network,
  ShieldCheck
} from "lucide-react";

export default function SupervisorAgenticLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const tabs = [
    { id: "actions", label: "Action Center", icon: Zap, route: "/supervisor-agentic/actions" },
    { id: "log", label: "Decision Log", icon: History, route: "/supervisor-agentic/log" },
    { id: "chain", label: "Escalation Chain", icon: Network, route: "/supervisor-agentic/chain" },
  ];

  const activeTab = tabs.find(t => pathname === t.route)?.id || "actions";

  const handleTabChange = (value) => {
    const tab = tabs.find(t => t.id === value);
    if (tab) router.push(tab.route);
  };

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              AGENTIC <span className="text-primary/80 uppercase text-lg">Automation</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Autonomous Supervisor Actions & Decision Protocols
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Active Actions</p>
              <p className="text-xl font-black text-primary">12</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Decisions (24h)</p>
              <p className="text-xl font-black text-green-600">142</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-6 border-b-0">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
                >
                  <tab.icon className="h-4 w-4 mr-2" /> {tab.label}
                </TabsTrigger>
              ))}
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
