"use client";

import { useState } from "react";
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Globe, 
  DollarSign, 
  Users, 
  ChevronRight,
  TrendingUp,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Edit2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { accounts as initialAccounts } from "@/lib/mock-data/crm";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AccountsPage() {
  const [accounts ] = useState(initialAccounts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = accounts.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.industry.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search accounts by name or industry..." 
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
            <Plus className="h-4 w-4 mr-2" /> New Account
          </Button>
        </div>
      </div>

      {/* Accounts Table */}
      <Card className="border-primary/10 shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-primary/5 border-b border-primary/10">
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Account Name</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Industry & Type</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Financials</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Ownership</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Status</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-primary/5">
                  {filteredAccounts.map((account) => (
                     <tr key={account.id} className="hover:bg-muted/10 transition-colors group">
                        <td className="p-4">
                           <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                                 <Building2 className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                 <p className="text-sm font-black tracking-tight">{account.name}</p>
                                 <a href={account.website} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary font-bold flex items-center gap-1 hover:underline">
                                    <Globe className="h-2.5 w-2.5" /> {account.website.replace('https://', '')}
                                 </a>
                              </div>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="space-y-0.5">
                              <p className="text-xs font-black uppercase tracking-tight text-foreground/80">{account.industry}</p>
                              <Badge variant="outline" className="text-[8px] font-bold h-4 px-1.5 border-primary/10 bg-primary/2">{account.type}</Badge>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="space-y-1">
                              <p className="text-xs font-black text-foreground/80 flex items-center gap-1">
                                 <DollarSign className="h-3 w-3 text-green-600" /> {account.revenue}
                              </p>
                              <p className="text-[10px] text-muted-foreground font-medium italic flex items-center gap-1">
                                 <Users className="h-2.5 w-2.5" /> {account.employees.toLocaleString()} Employees
                              </p>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="space-y-0.5">
                              <p className="text-xs font-black text-foreground/80">{account.owner}</p>
                              <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 uppercase tracking-tighter">
                                 <MapPin className="h-2.5 w-2.5" /> {account.city}
                              </p>
                           </div>
                        </td>
                        <td className="p-4 text-center">
                           <Badge className={cn(
                              "text-[9px] font-black uppercase border-none px-2",
                              account.status === "Active" ? "bg-green-500/10 text-green-600" : 
                              account.status === "Warning" ? "bg-amber-500/10 text-amber-600" : "bg-muted text-muted-foreground"
                           )}>
                              {account.status}
                           </Badge>
                        </td>
                        <td className="p-4 text-right">
                           <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-primary" onClick={() => handleAction("Edit", account.name)}>
                                 <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10" onClick={() => handleAction("View Details", account.name)}>
                                 <ExternalLink className="h-4 w-4" />
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

      {/* Account Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card className="border-primary/10 shadow-lg p-8 relative overflow-hidden bg-linear-to-br from-primary/5 to-transparent">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <TrendingUp className="h-32 w-32" />
            </div>
            <div className="space-y-6 relative z-10">
               <div>
                  <h3 className="text-xl font-black tracking-tighter uppercase italic">Account Intelligence</h3>
                  <p className="text-xs text-muted-foreground font-medium italic">Predictive signals for your book of business.</p>
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Expansion Potential</p>
                     <p className="text-2xl font-black text-primary">$1.4M</p>
                     <p className="text-[9px] text-green-600 font-bold uppercase">↑ 12% vs last month</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Churn Risk Pipeline</p>
                     <p className="text-2xl font-black text-red-500">$240K</p>
                     <p className="text-[9px] text-red-400 font-bold uppercase">↓ Reduced risk</p>
                  </div>
               </div>
               <Button className="h-10 px-6 font-black uppercase text-[10px] bg-primary shadow-xl shadow-primary/20">
                  Open Forecast Model <ChevronRight className="h-4 w-4 ml-2" />
               </Button>
            </div>
         </Card>

         <Card className="border-primary/10 shadow-lg p-8 flex flex-col justify-between">
            <div className="flex items-start gap-4">
               <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                  <ShieldCheck className="h-8 w-8" />
               </div>
               <div className="space-y-1">
                  <h4 className="text-sm font-black uppercase tracking-widest italic">Data Enrichment Active</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium italic">
                     &quot;All 124 account profiles were automatically enriched with the latest commercial data from the global business registry (NX-Sync).&quot;
                  </p>
               </div>
            </div>
            <div className="pt-6 mt-6 border-t border-dashed flex items-center justify-between">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                     <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-[10px] font-black">
                        {String.fromCharCode(64+i)}
                     </div>
                  ))}
                  <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-black">
                     +8
                  </div>
               </div>
               <p className="text-[10px] text-muted-foreground font-black uppercase">12 Assigned Account Owners</p>
            </div>
         </Card>
      </div>
    </div>
  );
}
