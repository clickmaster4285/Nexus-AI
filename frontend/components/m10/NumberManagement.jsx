"use client";

import { useState } from "react";
import { Hash, Search, Plus, Download, Tag, Edit3, Trash2, ArrowRightLeft, ShieldCheck, Globe, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { phoneNumbers } from "@/lib/mock-data/telephony";
import { cn } from "@/lib/utils";

export default function NumberManagement() {
   const [numbers] = useState(phoneNumbers);
   const [searchTerm, setSearchTerm] = useState("");

   const filteredNumbers = numbers.filter(n =>
      n.number.includes(searchTerm) ||
      n.assignment.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="space-y-6">
         {/* Search and Global Actions */}
         <Card className="border-primary/10 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-wrap gap-4 items-center">
               <div className="relative flex-1 min-w-75">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                     placeholder="Search by number, assignment or region..."
                     className="pl-10 h-10 bg-background border-primary/5 text-sm font-medium"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-10 px-4 border-primary/10 text-[10px] font-black uppercase">
                     <Download className="h-3.5 w-3.5 mr-2" /> Export CSV
                  </Button>
                  <Button className="h-10 px-6 shadow-lg text-[10px] font-black uppercase bg-primary hover:bg-primary/90">
                     <Plus className="h-3.5 w-3.5 mr-2" /> Purchase DID
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* DID Inventory Table */}
         <div className="border border-primary/10 rounded-2xl overflow-hidden bg-card shadow-xl">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-primary/5 border-b border-primary/10">
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Phone Number</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assignment</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Provider / Region</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Status</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-primary/5">
                  {filteredNumbers.map((num) => (
                     <tr key={num.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="p-4">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                 <Hash className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                 <p className="text-sm font-black tracking-tight">{num.number}</p>
                                 <p className="text-[10px] text-muted-foreground font-medium">{num.type}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="flex flex-col gap-1">
                              <p className="text-xs font-bold text-foreground">{num.assignment}</p>
                              <div className="flex items-center gap-1.5 opacity-60">
                                 <Tag className="h-3 w-3" />
                                 <span className="text-[10px] font-medium uppercase tracking-tighter">Inbound Routing: Active</span>
                              </div>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-muted-foreground">{num.provider}</p>
                              <div className="flex items-center gap-1.5">
                                 <Globe className="h-3 w-3 text-muted-foreground opacity-40" />
                                 <span className="text-[10px] font-medium">{num.region}</span>
                              </div>
                           </div>
                        </td>
                        <td className="p-4 text-center">
                           <Badge variant="outline" className={cn(
                              "text-[8px] font-black uppercase py-0 px-2 border-none",
                              num.status === "Active" ? "bg-green-500/10 text-green-600" :
                                 num.status === "Porting" ? "bg-blue-500/10 text-blue-600" : "bg-muted text-muted-foreground"
                           )}>
                              {num.status}
                           </Badge>
                        </td>
                        <td className="p-4 text-right">
                           <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-primary transition-all">
                                 <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-all">
                                 <ArrowRightLeft className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-red-500/10 text-red-500 transition-all">
                                 <Trash2 className="h-4 w-4" />
                              </Button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Compliance Notice */}
         <div className="p-6 rounded-2xl bg-linear-to-r from-blue-500/10 to-transparent border border-blue-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-600">
                     <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                     <p className="text-sm font-black uppercase tracking-tight">STIR/SHAKEN Verified</p>
                     <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xl">
                        All numbers in this inventory are fully compliant with FCC STIR/SHAKEN protocols. Outbound calls will appear as &quot;Verified&quot; on customer devices to increase pickup rates.
                     </p>
                  </div>
               </div>
               <Button size="sm" className="h-10 px-6 gap-2 font-black uppercase tracking-widest shadow-lg bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4" /> Request Profile
               </Button>
            </div>
         </div>
      </div>
   );
}
