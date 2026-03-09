"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Fingerprint,
} from "lucide-react";

export default function SecurityComplianceLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const activeTab = pathname.split("/").pop() || "monitor";

  const handleTabChange = (value) => {
    router.push(`/security-compliance/${value}`);
  };

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              SECURITY & COMPLIANCE <span className="text-primary/80 uppercase text-lg">Center</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Real-time Threat Monitoring, Data Privacy & Encryption Management
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Security Score</p>
              <p className="text-xl font-black text-green-600">98 / 100</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Active Threats</p>
              <p className="text-xl font-black text-primary">0 Detected</p>
            </div>
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
                <ShieldAlert className="h-4 w-4 mr-2" /> Threat Monitor
              </TabsTrigger>
              <TabsTrigger 
                value="compliance" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <ShieldCheck className="h-4 w-4 mr-2" /> Compliance Hub
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <Fingerprint className="h-4 w-4 mr-2" /> Data Privacy
              </TabsTrigger>
              <TabsTrigger 
                value="encryption" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <Lock className="h-4 w-4 mr-2" /> Encryption
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
