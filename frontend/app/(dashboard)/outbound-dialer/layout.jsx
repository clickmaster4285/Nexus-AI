"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneCall, List, Gauge, PhoneOutgoing } from "lucide-react";
import { campaigns, callLists } from "@/lib/mock-data/dialer";

export default function OutboundDialerLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = pathname.split("/").pop() || "campaigns";

  const handleTabChange = (value) => {
    router.push(`/outbound-dialer/${value}`);
  };

  const activeCampaigns = campaigns.filter(c => c.status === "Active").length;
  const totalContacts = callLists.reduce((sum, l) => sum + l.total, 0);

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <PhoneOutgoing className="h-6 w-6 text-primary" />
              OUTBOUND DIALER <span className="text-primary/80 uppercase text-lg">Campaign Manager</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Predictive dialing, Campaign builder & Call list management
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Active Campaigns</p>
              <p className="text-xl font-black text-green-600">{activeCampaigns}</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Total Contacts</p>
              <p className="text-xl font-black text-primary">{totalContacts.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-6 border-b-0">
              <TabsTrigger
                value="campaigns"
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <PhoneCall className="h-4 w-4 mr-2" /> Campaigns
              </TabsTrigger>
              <TabsTrigger
                value="call-lists"
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <List className="h-4 w-4 mr-2" /> Call Lists
              </TabsTrigger>
              <TabsTrigger
                value="pacing"
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <Gauge className="h-4 w-4 mr-2" /> Pacing
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
