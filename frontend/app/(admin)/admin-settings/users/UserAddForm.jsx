"use client";

import { useState } from "react";
import { User, Mail, ArrowLeft, Save, X, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function UserAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      role: "Agent",
      status: "Active",
      department: "Support"
   });

   const roles = ["Super Admin", "Supervisor", "Agent", "Observer"];
   const statuses = ["Active", "Inactive", "Pending"];

   const handleSubmit = (e) => {
      e.preventDefault();
      onSave({
         ...formData,
         id: `u-${Math.floor(Math.random() * 1000)}`,
         lastLogin: "Never",
         avatar: formData.name.split(" ").map(n => n[0]).join("").toUpperCase()
      });
   };

   return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
         <div className="flex items-center gap-4">
            <Button
               variant="ghost"
               size="icon"
               onClick={onCancel}
               className="h-9 w-9 rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
            >
               <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
               <h2 className="text-xl font-black tracking-tighter uppercase">Provision New Identity</h2>
               <p className="text-[10px] text-muted-foreground font-medium italic">Create a new access profile for the Nexus platform.</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Identity Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                           <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                              <Input
                                 required
                                 placeholder="e.g. Alexander Pierce"
                                 className="pl-10 h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                                 value={formData.name}
                                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Work Email</label>
                           <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                              <Input
                                 required
                                 type="email"
                                 placeholder="a.pierce@nexus-ai.com"
                                 className="pl-10 h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                                 value={formData.email}
                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="pt-4 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Access Logic</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                           {roles.map((role) => (
                              <button
                                 key={role}
                                 type="button"
                                 onClick={() => setFormData({ ...formData, role })}
                                 className={cn(
                                    "h-12 rounded-xl border text-[10px] font-black uppercase tracking-tighter transition-all",
                                    formData.role === role
                                       ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                       : "bg-background border-primary/5 text-muted-foreground hover:border-primary/20"
                                 )}
                              >
                                 {role}
                              </button>
                           ))}
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight">Provisioning Note</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        By clicking &quot;Provision Identity&quot;, an automated onboarding email will be sent to the user with 2FA setup instructions. This action will be logged in the system audit trail.
                     </p>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <Card className="border-primary/10 shadow-lg">
                  <CardHeader className="p-6 bg-primary/5 border-b">
                     <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Publication Status</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Initial Safety Status</p>
                        <div className="grid grid-cols-1 gap-2">
                           {statuses.map((status) => (
                              <button
                                 key={status}
                                 type="button"
                                 onClick={() => setFormData({ ...formData, status })}
                                 className={cn(
                                    "p-4 rounded-xl border flex items-center justify-between transition-all group",
                                    formData.status === status
                                       ? "bg-green-500/5 border-green-500/20 text-green-600 shadow-sm"
                                       : "bg-background border-primary/5 text-muted-foreground hover:bg-muted/30"
                                 )}
                              >
                                 <span className="text-xs font-bold">{status}</span>
                                 <div className={cn(
                                    "h-2 w-2 rounded-full",
                                    status === "Active" ? "bg-green-500" : status === "Inactive" ? "bg-red-500" : "bg-amber-500",
                                    formData.status === status && "animate-pulse"
                                 )} />
                              </button>
                           ))}
                        </div>
                     </div>

                     <div className="pt-6 border-t border-dashed space-y-3">
                        <Button
                           type="submit"
                           className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
                        >
                           <Save className="h-4 w-4 mr-2" /> Provision Identity
                        </Button>
                        <Button
                           type="button"
                           variant="outline"
                           onClick={onCancel}
                           className="w-full h-11 border-primary/10 text-[10px] font-black uppercase tracking-widest"
                        >
                           <X className="h-4 w-4 mr-2" /> Discard
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </form>
      </div>
   );
}
