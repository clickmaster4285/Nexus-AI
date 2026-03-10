"use client";

import { PhoneOutgoing } from "lucide-react";
import { campaigns, callLists } from "@/lib/mock-data/dialer";

export default function OutboundDialerLayout({ children }) {

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
      </div>

      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}
