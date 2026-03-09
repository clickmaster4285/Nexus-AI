"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  FileText, 
  Presentation,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportingBILayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const activeTab = pathname.split("/").pop() || "builder";

  const handleTabChange = (value) => {
    router.push(`/reporting-bi/${value}`);
  };

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              REPORTING & BI <span className="text-primary/80 uppercase text-lg">Studio</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Custom Dashboard Builder & Executive AI Briefings
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button size="sm" className="h-9 font-bold px-4 shadow-lg">
              <Plus className="h-4 w-4 mr-2" /> Create New
            </Button>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-6 border-b-0">
              <TabsTrigger 
                value="builder" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <BarChart3 className="h-4 w-4 mr-2" /> Dashboard Builder
              </TabsTrigger>
              <TabsTrigger 
                value="library" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <FileText className="h-4 w-4 mr-2" /> Report Library
              </TabsTrigger>
              <TabsTrigger 
                value="briefing" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-sm font-bold uppercase tracking-tighter"
              >
                <Presentation className="h-4 w-4 mr-2" /> Executive Briefing
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
