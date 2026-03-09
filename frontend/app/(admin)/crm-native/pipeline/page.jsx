"use client";

import { useState } from "react";
import { 
  Filter, 
  Plus, 
  MoreVertical, 
  TrendingUp,
  AlertCircle,
  Clock,
  LayoutGrid,
  List
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deals as initialDeals } from "@/lib/mock-data/crm";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function PipelinePage() {
  const [deals] = useState(initialDeals);
  const [view, setView] = useState("kanban"); // 'kanban' or 'list'

  const stages = [
    { name: "Discovery", color: "border-blue-500", bg: "bg-blue-500/5" },
    { name: "Qualification", color: "border-purple-500", bg: "bg-purple-500/5" },
    { name: "Proposal", color: "border-amber-500", bg: "bg-amber-500/5" },
    { name: "Negotiation", color: "border-indigo-500", bg: "bg-indigo-500/5" },
    { name: "Contracting", color: "border-emerald-500", bg: "bg-emerald-500/5" }
  ];

  const handleAction = (action, name) => {
    toast.success(`${action}: ${name}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <div className="flex bg-muted/50 p-1 rounded-xl border border-primary/10">
              <Button 
                variant={view === "kanban" ? "secondary" : "ghost"} 
                size="sm" 
                className="h-8 text-[10px] font-black uppercase"
                onClick={() => setView("kanban")}
              >
                 <LayoutGrid className="h-3 w-3 mr-2" /> Kanban
              </Button>
              <Button 
                variant={view === "list" ? "secondary" : "ghost"} 
                size="sm" 
                className="h-8 text-[10px] font-black uppercase"
                onClick={() => setView("list")}
              >
                 <List className="h-3 w-3 mr-2" /> List
              </Button>
           </div>
           <div className="h-8 w-px bg-border" />
           <p className="text-[10px] font-black uppercase text-muted-foreground italic">Current Pipeline: <span className="text-foreground">Sales 2026</span></p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 px-4 border-primary/10 font-bold uppercase text-[10px]">
            <Filter className="h-3.5 w-3.5 mr-2" /> Filter
          </Button>
          <Button className="h-10 px-6 bg-primary font-black uppercase text-[10px] shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" /> New Deal
          </Button>
        </div>
      </div>

      {/* Kanban View */}
      {view === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-[calc(100vh-280px)] overflow-x-auto pb-4 custom-scrollbar">
          {stages.map((stage) => {
            const stageDeals = deals.filter(d => d.stage === stage.name);
            const totalValue = stageDeals.reduce((acc, d) => acc + parseInt(d.value.replace(/[^0-9]/g, '')), 0);

            return (
              <div key={stage.name} className="flex flex-col gap-4 min-w-70">
                <div className={cn("p-3 border-b-2 bg-muted/20 rounded-t-xl", stage.color)}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-black uppercase tracking-widest">{stage.name}</h3>
                    <Badge variant="outline" className="text-[8px] font-bold border-primary/10">{stageDeals.length}</Badge>
                  </div>
                  <p className="text-xs font-black mt-1 text-primary">${totalValue.toLocaleString()}</p>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                  {stageDeals.map((deal) => (
                    <Card key={deal.id} className="border-primary/5 shadow-md hover:border-primary/20 transition-all cursor-grab active:cursor-grabbing group">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                           <p className="text-xs font-black leading-tight group-hover:text-primary transition-colors">{deal.name}</p>
                           <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                              <MoreVertical className="h-3 w-3" />
                           </Button>
                        </div>
                        <div className="flex items-center gap-2">
                           <Badge className="bg-primary/5 text-primary border-none text-[9px] font-black uppercase h-4 px-1.5">{deal.value}</Badge>
                           <span className="text-[9px] font-bold text-muted-foreground italic">{deal.probability}% Prob.</span>
                        </div>
                        <div className="pt-2 border-t border-dashed flex items-center justify-between">
                           <div className="flex items-center gap-1.5">
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-black">
                                 {deal.owner.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="text-[9px] font-medium text-muted-foreground truncate max-w-20">{deal.account}</span>
                           </div>
                           <span className="text-[8px] font-bold text-muted-foreground flex items-center gap-1 uppercase">
                              <Clock className="h-2.5 w-2.5" /> {deal.closeDate.split("-").slice(1).join("/")}
                           </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="ghost" className="w-full border-dashed border border-primary/10 h-10 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5">
                     <Plus className="h-3 w-3 mr-2" /> Quick Add
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="border-primary/10 shadow-xl overflow-hidden">
           <CardContent className="p-0">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-primary/5 border-b border-primary/10">
                       <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Deal Name</th>
                       <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Account</th>
                       <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Value</th>
                       <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Stage</th>
                       <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Close Date</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-primary/5">
                    {deals.map((deal) => (
                       <tr key={deal.id} className="hover:bg-muted/10 transition-colors cursor-pointer">
                          <td className="p-4"><p className="text-sm font-black tracking-tight">{deal.name}</p></td>
                          <td className="p-4"><span className="text-xs font-bold text-muted-foreground uppercase">{deal.account}</span></td>
                          <td className="p-4"><Badge className="bg-primary/10 text-primary border-none text-[10px] font-black">{deal.value}</Badge></td>
                          <td className="p-4">
                             <div className="flex items-center gap-2">
                                <div className={cn("h-2 w-2 rounded-full", stages.find(s => s.name === deal.stage)?.color.replace('border-', 'bg-'))} />
                                <span className="text-xs font-black uppercase italic">{deal.stage}</span>
                             </div>
                          </td>
                          <td className="p-4 text-right"><span className="text-[10px] font-bold text-muted-foreground italic">{deal.closeDate}</span></td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </CardContent>
        </Card>
      )}

      {/* Pipeline Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="border-primary/10 shadow-lg p-6 bg-linear-to-br from-primary/5 to-transparent">
            <div className="flex items-center gap-3 mb-4">
               <TrendingUp className="h-5 w-5 text-primary" />
               <h4 className="text-xs font-black uppercase tracking-widest italic">Weighted Pipeline</h4>
            </div>
            <p className="text-3xl font-black tracking-tighter text-primary">$1,248,500</p>
            <p className="text-[10px] text-muted-foreground font-medium italic mt-1 underline underline-offset-4 decoration-primary/20">Calculated based on stage probability logic.</p>
         </Card>

         <Card className="border-primary/10 shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
               <AlertCircle className="h-5 w-5 text-amber-500" />
               <h4 className="text-xs font-black uppercase tracking-widest italic text-amber-600">Deal Velocity Risks</h4>
            </div>
            <p className="text-sm font-black">3 Stalled Negotiations</p>
            <p className="text-[10px] text-muted-foreground leading-relaxed mt-1 italic">
               Deals in &apos;Negotiation&apos; stage for &gt; 14 days. Recommend supervisor intervention.
            </p>
         </Card>

         <Card className="border-primary/10 shadow-lg p-6 flex flex-col justify-center text-center space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Historical Win Rate</p>
            <div className="flex items-center justify-center gap-4">
               <div className="text-2xl font-black">62.4%</div>
               <div className="h-8 w-px bg-border" />
               <div className="text-green-600 font-bold text-[10px] uppercase italic">↑ 4% this Q</div>
            </div>
         </Card>
      </div>
    </div>
  );
}
