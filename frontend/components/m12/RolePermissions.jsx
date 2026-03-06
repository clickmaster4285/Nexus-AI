"use client";

import { useState } from "react";
import { Shield, Lock, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { roles } from "@/lib/mock-data/admin";
import { cn } from "@/lib/utils";
import RoleAddForm from "./RoleAddForm";

export default function RolePermissions() {
   const [isAddingRole, setIsAddingRole] = useState(false);
   const [selectedRole, setSelectedRole] = useState(roles[0].id);

   if (isAddingRole) {
      return <RoleAddForm onCancel={() => setIsAddingRole(false)} onSave={() => setIsAddingRole(false)} />;
   }

   const activeRoleData = roles.find(r => r.id === selectedRole);

   const permissionCategories = [
      { name: "Telephony Hub", perms: ["Trunk Management", "DID Inventory", "IVR Flow Builder", "Health QoS"] },
      { name: "AI Intelligence", perms: ["Transcript Views", "NLP Sentiment", "Executive Briefing", "QA Scoring"] },
      { name: "Reporting & BI", perms: ["Dashboard Builder", "Report Scheduling", "Commercial KPIs", "Audit Logs"] },
      { name: "Agent Desktop", perms: ["Call Controls", "Personal Stats", "Gamification", "Self-Service"] },
   ];

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Role Sidebar */}
            <div className="lg:col-span-1 space-y-4">
               <div className="px-2 mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">Access Blueprints</h3>
               </div>
               {roles.map((role) => (
                  <button
                     key={role.id}
                     onClick={() => setSelectedRole(role.id)}
                     className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group",
                        selectedRole === role.id
                           ? "bg-primary/5 border-primary/20 shadow-sm"
                           : "bg-card border-primary/5 hover:bg-muted/30"
                     )}
                  >
                     <div className="space-y-1">
                        <p className={cn("text-sm font-black tracking-tight", selectedRole === role.id ? "text-primary" : "text-foreground")}>
                           {role.name}
                        </p>
                        <p className="text-[10px] font-bold text-muted-foreground italic truncate max-w-40">{role.userCount} Active Users</p>
                     </div>
                     <ChevronRight className={cn("h-4 w-4 transition-transform", selectedRole === role.id ? "text-primary translate-x-1" : "text-muted-foreground/30")} />
                  </button>
               ))}
               <Button variant="outline" className="w-full h-12 border-dashed border-primary/20 text-[10px] font-black uppercase tracking-widest hover:bg-primary/5">
                  Create Custom Role blueprint
               </Button>
            </div>

            {/* Permission Framework */}
            <div className="lg:col-span-3 space-y-6">
               <Card className="border-primary/10 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <Shield className="h-40 w-40" />
                  </div>
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <div className="flex justify-between items-start">
                        <div className="space-y-1">
                           <CardTitle className="text-xl font-black tracking-tighter uppercase">{activeRoleData.name} <span className="text-muted-foreground/50 font-mono ml-2">V2.0</span></CardTitle>
                           <CardDescription className="text-xs font-medium italic">{activeRoleData.description}</CardDescription>
                        </div>
                        <Button size="sm" className="h-9 px-6 bg-primary font-black uppercase text-[10px] shadow-lg shadow-primary/20">
                           Save Framework Changes
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent className="p-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {permissionCategories.map((cat, idx) => (
                           <div key={idx} className="space-y-4">
                              <div className="flex items-center gap-2 px-1">
                                 <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                 <h4 className="text-[11px] font-black uppercase text-foreground tracking-widest">{cat.name}</h4>
                              </div>
                              <div className="space-y-2 bg-muted/20 p-4 rounded-2xl border border-primary/5">
                                 {cat.perms.map((perm) => {
                                    const hasPermission = activeRoleData.permissions.some(p => p === "Full Access" || p === cat.name || p === perm);
                                    return (
                                       <div key={perm} className="flex items-center justify-between group cursor-pointer p-1">
                                          <span className={cn("text-xs font-bold transition-colors", hasPermission ? "text-foreground" : "text-muted-foreground/50 italic")}>
                                             {perm}
                                          </span>
                                          <div className={cn(
                                             "h-5 w-5 rounded-md flex items-center justify-center border transition-all",
                                             hasPermission ? "bg-green-500/10 border-green-500/20 text-green-600" : "bg-muted border-primary/5 text-muted-foreground/30"
                                          )}>
                                             {hasPermission ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                                          </div>
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        ))}
                     </div>

                     {/* System Security Tip */}
                     <div className="mt-8 p-6 rounded-2xl bg-linear-to-r from-purple-500/5 to-blue-500/5 border border-primary/10 flex items-start gap-4">
                        <Lock className="h-5 w-5 text-primary mt-1" />
                        <div className="space-y-1">
                           <p className="text-xs font-black uppercase italic tracking-tight text-primary">Granular Logic Applied</p>
                           <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                              &quot;Role definitions are hierarchical. Changes to <span className="text-foreground font-bold">{activeRoleData.name}</span> will propagate across all assigned identities in the Next sync cycle (approx. 45s).&quot;
                           </p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
