"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Zap, 
  UserMinus, 
  BarChart3,
  DollarSign
} from "lucide-react";

export default function RevenueIntelligenceLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const activeTab = pathname.split("/").pop() || "dashboard";

  const handleTabChange = (value) => {
    router.push(`/revenue-intelligence/${value}`);
  };

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

        {/* Sub-navigation Tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-6 border-b-0">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <BarChart3 className="h-4 w-4 mr-2" /> KPI Overview
              </TabsTrigger>
              <TabsTrigger 
                value="signals" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <Zap className="h-4 w-4 mr-2" /> Upsell & Signals
              </TabsTrigger>
              <TabsTrigger 
                value="churn" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <UserMinus className="h-4 w-4 mr-2" /> Churn & Retention
              </TabsTrigger>
              <TabsTrigger 
                value="sales" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <TrendingUp className="h-4 w-4 mr-2" /> Sales Scoring
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
