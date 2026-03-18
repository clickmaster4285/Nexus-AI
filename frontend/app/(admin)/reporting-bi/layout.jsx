"use client";

import { 
  BarChart3, 
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ReportingBILayout({ children }) {

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
            <Button size="sm" className="h-9 font-bold px-4 shadow-lg" onClick={() => toast.success("Creating new dashboard")}>
              <Plus className="h-4 w-4 mr-2" /> Create New
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}
