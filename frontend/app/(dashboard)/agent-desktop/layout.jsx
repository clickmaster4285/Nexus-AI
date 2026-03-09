"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  Monitor, 
  FileText, 
  Search, 
  Bot, 
  Clock,
  Mic,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AgentDesktopLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Determine active tab from pathname
  const activeTab = pathname.split("/").pop() || "softphone";

  const handleTabChange = (value) => {
    router.push(`/agent-desktop/${value}`);
  };

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
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Mic className="h-3 w-3 mr-2" /> Test Mic
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Volume2 className="h-3 w-3 mr-2" /> Audio Settings
            </Button>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-6 border-b-0">
              <TabsTrigger 
                value="softphone" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-xs font-bold uppercase tracking-wider"
              >
                <Phone className="h-3 w-3 mr-2" /> Softphone
              </TabsTrigger>
              <TabsTrigger 
                value="screen-pop" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-xs font-bold uppercase tracking-wider"
              >
                <Monitor className="h-3 w-3 mr-2" /> Screen Pop
              </TabsTrigger>
              <TabsTrigger 
                value="script" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-xs font-bold uppercase tracking-wider"
              >
                <FileText className="h-3 w-3 mr-2" /> Script
              </TabsTrigger>
              <TabsTrigger 
                value="kb" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-xs font-bold uppercase tracking-wider"
              >
                <Search className="h-3 w-3 mr-2" /> KB Search
              </TabsTrigger>
              <TabsTrigger 
                value="ai-assist" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-xs font-bold uppercase tracking-wider"
              >
                <Bot className="h-3 w-3 mr-2" /> AI Assist
              </TabsTrigger>
              <TabsTrigger 
                value="acw" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-1 pb-2 pt-0 bg-transparent shadow-none text-xs font-bold uppercase tracking-wider"
              >
                <Clock className="h-3 w-3 mr-2" /> ACW
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
}
