"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone,
  Star, 
  ShieldCheck,
  History,
  CheckCircle2,
  Edit2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { contacts as initialContacts } from "@/lib/mock-data/crm";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ContactsPage() {
  const [contacts ] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(c => 
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.emailPrimary.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search contacts by name, company, or email..." 
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
            <Plus className="h-4 w-4 mr-2" /> Create Contact
          </Button>
        </div>
      </div>

      {/* Contacts Grid/Table */}
      <Card className="border-primary/10 shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-primary/5 border-b border-primary/10">
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Identity</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Company & Title</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">CLV Intelligence</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Status</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-primary/5">
                  {filteredContacts.map((contact) => (
                     <tr key={contact.id} className="hover:bg-muted/10 transition-colors group">
                        <td className="p-4">
                           <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10 border border-primary/10 shadow-sm">
                                 <AvatarFallback className="bg-primary/5 text-primary font-black uppercase">{contact.firstName[0]}{contact.lastName[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                 <p className="text-sm font-black tracking-tight">{contact.firstName} {contact.lastName}</p>
                                 <div className="flex items-center gap-3 mt-0.5">
                                    <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                       <Phone className="h-2.5 w-2.5" /> {contact.phonePrimary}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                       <Mail className="h-2.5 w-2.5" /> {contact.emailPrimary}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="space-y-0.5">
                              <p className="text-xs font-black uppercase tracking-tight text-foreground/80">{contact.company}</p>
                              <p className="text-[10px] text-muted-foreground italic font-medium">{contact.jobTitle}</p>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-4">
                              <div>
                                 <div className="flex items-center gap-1 mb-1">
                                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                    <span className="text-[10px] font-black">{contact.clvTier}</span>
                                 </div>
                                 <p className="text-[10px] text-muted-foreground font-bold italic tracking-tighter">Value Score: {contact.clvScore}</p>
                              </div>
                              <div className="h-8 w-px bg-border" />
                              <div className="space-y-1">
                                 <div className="flex flex-wrap gap-1">
                                    {contact.tags.map(tag => (
                                       <Badge key={tag} variant="secondary" className="text-[8px] font-bold h-4 px-1.5 bg-primary/5 text-primary border-none">
                                          {tag}
                                       </Badge>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="p-4 text-center">
                           <Badge className={cn(
                              "text-[9px] font-black uppercase border-none px-2",
                              contact.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"
                           )}>
                              {contact.status}
                           </Badge>
                        </td>
                        <td className="p-4 text-right">
                           <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-primary" onClick={() => handleAction("Edit", contact.firstName)}>
                                 <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10" onClick={() => handleAction("View History", contact.firstName)}>
                                 <History className="h-4 w-4" />
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

      {/* CRM Intelligence Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="border-primary/10 bg-linear-to-br from-primary/5 to-transparent shadow-lg p-6 flex items-start gap-4">
            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
               <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
               <h4 className="text-xs font-black uppercase tracking-widest text-primary italic">Contact Compliance Active</h4>
               <p className="text-[10px] text-muted-foreground leading-relaxed font-medium italic">
                  &quot;System-wide DNC scrubbing is enabled. 42 contacts were automatically flagged for regulatory review in the last sync cycle.&quot;
               </p>
            </div>
         </Card>

         <Card className="border-primary/10 shadow-lg p-6 flex items-start gap-4">
            <div className="h-10 w-10 rounded-2xl bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
               <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
               <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 italic">Integrity Check Completed</h4>
               <p className="text-[10px] text-muted-foreground leading-relaxed font-medium italic">
                  Contact data is <span className="text-foreground font-black">99.2%</span> accurate. 12 duplicate records merged automatically today.
               </p>
            </div>
         </Card>

         <Card className="border-primary/10 bg-muted/30 shadow-md p-6 flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Database Backup</p>
               <p className="text-xs font-bold mt-1">Automatic sync every 15m</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-[9px] font-black uppercase border-primary/10">Manual Export</Button>
         </Card>
      </div>
    </div>
  );
}
