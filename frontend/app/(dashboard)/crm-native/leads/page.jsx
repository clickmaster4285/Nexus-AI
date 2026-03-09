"use client";

import { useState } from "react";
import { 
  UserPlus, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Phone, 
  Mail, 
  TrendingUp, 
  Target, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Edit2,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { leads as initialLeads } from "@/lib/mock-data/crm";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action, name) => {
    toast.success(`${action}: ${name}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search leads by name, email, or source..." 
            className="pl-10 h-11 bg-background border-primary/10 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 px-4 border-primary/10 font-bold uppercase text-[10px]">
            <Filter className="h-3.5 w-3.5 mr-2" /> Filter
          </Button>
          <Button className="h-11 px-6 bg-primary font-black uppercase text-[10px] shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" /> New Lead
          </Button>
        </div>
      </div>

      {/* Leads Table */}
      <Card className="border-primary/10 shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-primary/5 border-b border-primary/10">
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lead Identity</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Source & Acquisition</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lead Scoring</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Status</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-primary/5">
                  {filteredLeads.map((lead) => (
                     <tr key={lead.id} className="hover:bg-muted/10 transition-colors group">
                        <td className="p-4">
                           <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                                 <UserPlus className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                 <p className="text-sm font-black tracking-tight">{lead.name}</p>
                                 <div className="flex items-center gap-3 mt-0.5">
                                    <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                       <Phone className="h-2.5 w-2.5" /> {lead.phone}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                       <Mail className="h-2.5 w-2.5" /> {lead.email}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="space-y-0.5">
                              <p className="text-xs font-black uppercase tracking-tight text-foreground/80">{lead.source}</p>
                              <p className="text-[10px] text-muted-foreground italic font-medium flex items-center gap-1">
                                 <Clock className="h-2.5 w-2.5" /> Last Attempt: {lead.lastAttempt}
                              </p>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="space-y-1.5 w-32">
                              <div className="flex justify-between items-center text-[10px] font-black uppercase italic">
                                 <span className="text-primary">NX-Score</span>
                                 <span>{lead.score}/100</span>
                              </div>
                              <Progress value={lead.score} className="h-1" indicatorClassName={lead.score > 70 ? "bg-green-500" : lead.score > 40 ? "bg-amber-500" : "bg-red-500"} />
                           </div>
                        </td>
                        <td className="p-4 text-center">
                           <Badge className={cn(
                              "text-[9px] font-black uppercase border-none px-2",
                              lead.status === "Qualified" ? "bg-green-500/10 text-green-600" : 
                              lead.status === "New" ? "bg-blue-500/10 text-blue-600" : "bg-muted text-muted-foreground"
                           )}>
                              {lead.status}
                           </Badge>
                        </td>
                        <td className="p-4 text-right">
                           <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-primary" onClick={() => handleAction("Edit", lead.name)}>
                                 <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-green-600" onClick={() => handleAction("Convert to Contact", lead.name)}>
                                 <Zap className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-40 hover:opacity-100">
                                 <MoreVertical className="h-4 w-4" />
                              </Button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Lead Velocity Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="border-primary/10 shadow-lg p-6 flex flex-col justify-between bg-linear-to-br from-indigo-500/5 to-transparent">
            <div className="flex items-center justify-between mb-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Conversion Velocity</p>
               <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
               <p className="text-3xl font-black tracking-tighter">4.2 Days</p>
               <p className="text-[10px] text-green-600 font-bold uppercase mt-1">↑ 18% Faster than avg</p>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed">
               <p className="text-[10px] text-muted-foreground font-medium italic">Avg time from New to Qualified</p>
            </div>
         </Card>

         <Card className="border-primary/10 shadow-lg p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lead Source ROI</p>
               <Target className="h-4 w-4 text-blue-500" />
            </div>
            <div className="space-y-3">
               {[
                  { label: "Web Form", val: "64%", color: "bg-primary" },
                  { label: "Referral", val: "22%", color: "bg-blue-500" },
                  { label: "Cold Call", val: "14%", color: "bg-muted" },
               ].map((source, i) => (
                  <div key={i} className="space-y-1">
                     <div className="flex justify-between text-[9px] font-black uppercase italic">
                        <span>{source.label}</span>
                        <span>{source.val}</span>
                     </div>
                     <Progress value={parseInt(source.val)} className="h-1" indicatorClassName={source.color} />
                  </div>
               ))}
            </div>
         </Card>

         <Card className="border-primary/10 bg-primary/5 shadow-xl p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
               <Zap className="h-6 w-6 fill-current" />
            </div>
            <div className="space-y-1">
               <h4 className="text-sm font-black uppercase tracking-tighter italic">AI Lead Discovery</h4>
               <p className="text-[10px] text-muted-foreground leading-relaxed font-medium italic">
                  Nexus AI has identified <span className="text-foreground font-black">12 high-intent</span> domains from your visitor logs.
               </p>
            </div>
            <Button className="h-9 px-6 bg-primary font-black uppercase text-[9px] shadow-lg">Initialize Hunt</Button>
         </Card>
      </div>
    </div>
  );
}
