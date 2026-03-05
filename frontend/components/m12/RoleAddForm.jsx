"use client";

import { useState } from "react";
import { Shield, ArrowLeft, Save, X, Info, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function RoleAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState({
      name: "",
      description: "",
      permissions: {
         "Conversation Intelligence": ["View", "Export"],
         "QA & Compliance": ["View"],
         "Revenue Intelligence": [],
         "Workforce Management": [],
         "Telephony & IVR": [],
         "Administrative Controls": []
      }
   });

   const categories = Object.keys(formData.permissions);
   const actions = ["View", "Edit", "Export", "Delete"];

   const togglePermission = (category, action) => {
      const current = formData.permissions[category];
      const updated = current.includes(action)
         ? current.filter(a => a !== action)
         : [...current, action];

      setFormData({
         ...formData,
         permissions: {
            ...formData.permissions,
            [category]: updated
         }
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
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
               <h2 className="text-xl font-black tracking-tighter uppercase">Create Custom Role</h2>
               <p className="text-[10px] text-muted-foreground font-medium italic">Define granular access permissions for a new organizational role.</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-8 border-b bg-primary/2">
                     <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Role Definition</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Role Name</label>
                        <div className="relative">
                           <Shield className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                           <Input
                              required
                              placeholder="e.g. Compliance Auditor"
                              className="pl-10 h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</label>
                        <Input
                           placeholder="e.g. Full access to QA tools and redacted transcripts."
                           className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                           value={formData.description}
                           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                     </div>

                     <div className="pt-6 border-t border-dashed space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Permissions Matrix</p>
                        <div className="border border-primary/5 rounded-2xl overflow-hidden shadow-sm">
                           <table className="w-full text-left border-collapse">
                              <thead>
                                 <tr className="bg-primary/5 border-b border-primary/10">
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Module</th>
                                    {actions.map(action => (
                                       <th key={action} className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">{action}</th>
                                    ))}
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-primary/5">
                                 {categories.map((category) => (
                                    <tr key={category} className="hover:bg-muted/10 transition-colors">
                                       <td className="p-4 text-xs font-bold text-muted-foreground">{category}</td>
                                       {actions.map(action => (
                                          <td key={action} className="p-4 text-center">
                                             <div className="flex justify-center">
                                                <Checkbox
                                                   checked={formData.permissions[category].includes(action)}
                                                   onCheckedChange={() => togglePermission(category, action)}
                                                   className="border-primary/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                />
                                             </div>
                                          </td>
                                       ))}
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight">Governance Note</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        Roles are applied globally. Changes to a role definition will affect all existing users assigned to that role immediately. System audit logs will track this creation.
                     </p>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <Card className="border-primary/10 shadow-lg">
                  <CardHeader className="p-6 bg-primary/5 border-b">
                     <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Publication</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 flex items-center gap-3">
                           <CheckCircle2 className="h-4 w-4 text-green-600" />
                           <span className="text-[10px] font-black uppercase text-green-700">Ready for Deployment</span>
                        </div>

                        <Button
                           type="submit"
                           className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
                        >
                           <Save className="h-4 w-4 mr-2" /> Create Role
                        </Button>
                        <Button
                           type="button"
                           variant="outline"
                           onClick={onCancel}
                           className="w-full h-11 border-primary/10 text-[10px] font-black uppercase tracking-widest"
                        >
                           <X className="h-4 w-4 mr-2" /> Cancel
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </form>
      </div>
   );
}
