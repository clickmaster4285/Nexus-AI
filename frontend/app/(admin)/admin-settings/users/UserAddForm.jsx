"use client";

import { useState } from "react";
import { User, Mail, ArrowLeft, Save, X, Info, Shield, Phone, Briefcase, MapPin, Globe, Fingerprint, Lock, Plus, UserPlus, Badge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function UserAddForm({ onCancel, onSave }) {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      employeeId: "",
      phone: "",
      role: "Agent",
      status: "Active",
      department: "Customer Service",
      team: "",
      supervisor: "",
      location: "",
      twoFactorEnabled: true,
      timeZone: "UTC-5 (EST)",
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
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 ">
         {/* Navigation Header */}
         <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
               <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCancel}
                  className="h-10 w-10 rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all border border-transparent hover:border-primary/10"
               >
                  <ArrowLeft className="h-5 w-5" />
               </Button>
               <div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
                     <UserPlus className="h-6 w-6 text-primary" /> Provision <span className="text-primary/60">New Identity</span>
                  </h2>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-0.5">Configure access logic & organizational profile</p>
               </div>
            </div>
            
            <div className="flex gap-3">
               <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="h-11 border-primary/10 text-[10px] font-black uppercase tracking-widest px-6"
               >
                  Discard
               </Button>
               <Button
                  onClick={handleSubmit}
                  className="h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 px-8 min-w-45"
               >
                  <Save className="h-4 w-4 mr-2" /> Provision Identity
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden p-2">
                  <Tabs defaultValue="identity" className="w-full">
                     <CardHeader className="p-0 bg-primary/5 border-b border-primary/10">
                        <TabsList className="bg-transparent h-14 w-full justify-start gap-8 px-8 p-0">
                           <TabsTrigger value="identity" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-14 px-2 text-[10px] font-black uppercase tracking-widest">
                              1. Core Identity
                           </TabsTrigger>
                           <TabsTrigger value="org" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-14 px-2 text-[10px] font-black uppercase tracking-widest">
                              2. Organization
                           </TabsTrigger>
                           <TabsTrigger value="security" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-14 px-2 text-[10px] font-black uppercase tracking-widest">
                              3. Access & Security
                           </TabsTrigger>
                        </TabsList>
                     </CardHeader>

                     <CardContent className="p-8">
                        <TabsContent value="identity" className="mt-0 space-y-8">
                           <div className="flex flex-col md:flex-row gap-8 items-start">
                              <div className="flex flex-col items-center gap-3">
                                 <div className="relative group">
                                    <Avatar className="h-28 w-28 border-4 border-background ring-4 ring-primary/5 shadow-2xl transition-all group-hover:scale-105">
                                       <AvatarFallback className="bg-secondary text-primary text-2xl font-black">
                                          {formData.name ? formData.name.split(" ").map(n => n[0]).join("") : "?"}
                                       </AvatarFallback>
                                    </Avatar>
                                    <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full border-2 border-background shadow-lg">
                                       <Plus className="h-4 w-4" />
                                    </Button>
                                 </div>
                                 <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">ID Thumbnail</p>
                              </div>

                              <div className="flex-1 space-y-6">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                       <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                                          <Fingerprint className="h-3 w-3 text-primary" /> Full Legal Name *
                                       </Label>
                                       <Input
                                          required
                                          placeholder="e.g. Alexander Pierce"
                                          className="h-12 bg-muted/20 border-primary/5 text-sm font-bold focus:border-primary/30"
                                          value={formData.name}
                                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                       />
                                    </div>
                                    <div className="space-y-2">
                                       <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                                          <Shield className="h-3 w-3 text-primary" /> Employee ID
                                       </Label>
                                       <Input
                                          placeholder="e.g. EMP-9921"
                                          className="h-12 bg-muted/20 border-primary/5 text-sm font-bold font-mono focus:border-primary/30"
                                          value={formData.employeeId}
                                          onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                       />
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                       <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                                          <Mail className="h-3 w-3 text-primary" /> Work Email Address *
                                       </Label>
                                       <Input
                                          required
                                          type="email"
                                          placeholder="a.pierce@nexus-ai.com"
                                          className="h-12 bg-muted/20 border-primary/5 text-sm font-bold focus:border-primary/30"
                                          value={formData.email}
                                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                       />
                                    </div>
                                    <div className="space-y-2">
                                       <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                                          <Phone className="h-3 w-3 text-primary" /> Contact Number
                                       </Label>
                                       <Input
                                          placeholder="+1 (555) 000-0000"
                                          className="h-12 bg-muted/20 border-primary/5 text-sm font-bold focus:border-primary/30"
                                          value={formData.phone}
                                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </TabsContent>

                        <TabsContent value="org" className="mt-0 space-y-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-6">
                                 <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                                       <Briefcase className="h-3 w-3 text-primary" /> Operational Department
                                    </Label>
                                    <Select 
                                       defaultValue={formData.department}
                                       onValueChange={(v) => setFormData({ ...formData, department: v })}
                                    >
                                       <SelectTrigger className="h-12 bg-muted/20 border-primary/5 font-bold">
                                          <SelectValue />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectItem value="Customer Service">Customer Service</SelectItem>
                                          <SelectItem value="Technical Support">Technical Support</SelectItem>
                                          <SelectItem value="Sales">Sales</SelectItem>
                                          <SelectItem value="Compliance">Compliance</SelectItem>
                                          <SelectItem value="IT / Infrastructure">IT / Infrastructure</SelectItem>
                                       </SelectContent>
                                    </Select>
                                 </div>
                                 
                                 <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                                       <Shield className="h-3 w-3 text-primary" /> Team / Reporting Line
                                    </Label>
                                    <Input
                                       placeholder="e.g. EMEA Support Team B"
                                       className="h-12 bg-muted/20 border-primary/5 text-sm font-bold focus:border-primary/30"
                                       value={formData.team}
                                       onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                                    />
                                 </div>
                              </div>

                              <div className="space-y-6">
                                 <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                                       <MapPin className="h-3 w-3 text-primary" /> Site / Location
                                    </Label>
                                    <Input
                                       placeholder="e.g. Remote - US Hub"
                                       className="h-12 bg-muted/20 border-primary/5 text-sm font-bold focus:border-primary/30"
                                       value={formData.location}
                                       onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                 </div>
                                 
                                 <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                                       <Globe className="h-3 w-3 text-primary" /> Regional Timezone
                                    </Label>
                                    <Select 
                                       defaultValue={formData.timeZone}
                                       onValueChange={(v) => setFormData({ ...formData, timeZone: v })}
                                    >
                                       <SelectTrigger className="h-12 bg-muted/20 border-primary/5 font-bold">
                                          <SelectValue />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectItem value="UTC-8 (PST)">UTC-8 (PST)</SelectItem>
                                          <SelectItem value="UTC-5 (EST)">UTC-5 (EST)</SelectItem>
                                          <SelectItem value="UTC+0 (GMT)">UTC+0 (GMT)</SelectItem>
                                          <SelectItem value="UTC+1 (CET)">UTC+1 (CET)</SelectItem>
                                          <SelectItem value="UTC+8 (SGT)">UTC+8 (SGT)</SelectItem>
                                       </SelectContent>
                                    </Select>
                                 </div>
                              </div>
                           </div>
                        </TabsContent>

                        <TabsContent value="security" className="mt-0 space-y-8">
                           <div className="space-y-6">
                              <div className="space-y-4">
                                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Access Tier Assignment</Label>
                                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {roles.map((role) => (
                                       <button
                                          key={role}
                                          type="button"
                                          onClick={() => setFormData({ ...formData, role })}
                                          className={cn(
                                             "h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all",
                                             formData.role === role
                                                ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105"
                                                : "bg-muted/10 border-primary/5 text-muted-foreground hover:border-primary/20 hover:bg-muted/30"
                                          )}
                                       >
                                          <Lock className={cn("h-4 w-4", formData.role === role ? "opacity-100" : "opacity-30")} />
                                          <span className="text-[10px] font-black uppercase tracking-tight">{role}</span>
                                       </button>
                                    ))}
                                 </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                 <div className="p-5 rounded-2xl border border-primary/10 bg-muted/10 flex items-center justify-between">
                                    <div className="space-y-1">
                                       <Label className="text-sm font-black uppercase tracking-tight">Mandatory 2FA</Label>
                                       <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Require TOTP for all sessions</p>
                                    </div>
                                    <Switch 
                                       checked={formData.twoFactorEnabled}
                                       onCheckedChange={(v) => setFormData({ ...formData, twoFactorEnabled: v })}
                                    />
                                 </div>

                                 <div className="p-5 rounded-2xl border border-primary/10 bg-muted/10 flex items-center justify-between">
                                    <div className="space-y-1">
                                       <Label className="text-sm font-black uppercase tracking-tight">Account Discovery</Label>
                                       <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Visible in corporate directory</p>
                                    </div>
                                    <Switch defaultChecked />
                                 </div>
                              </div>
                           </div>
                        </TabsContent>
                     </CardContent>
                  </Tabs>
               </Card>

               <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4 shadow-inner">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <Info className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-tight">System Provisioning Protocol</p>
                     <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                        By provisioning this identity, the system will automatically generate a secure invite link valid for 24 hours. This action will be recorded in the <span className="text-primary font-bold underline cursor-pointer">Security Audit Logs</span> for compliance tracking.
                     </p>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <Card className="border-primary/10 shadow-2xl bg-card overflow-hidden sticky top-6">
                  <CardHeader className="p-6 bg-primary px-8 py-8 text-white text-center">
                     <div className="mx-auto h-20 w-20 rounded-full border-4 border-white/20 bg-white/10 flex items-center justify-center mb-4 shadow-inner">
                        <Shield className="h-10 w-10 text-white" />
                     </div>
                     <CardTitle className="text-xl font-black uppercase tracking-tighter leading-none">Access Preview</CardTitle>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mt-1.5">Provisioning Summary</p>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                     <div className="space-y-1 text-center">
                        <p className="text-xl font-black uppercase tracking-tight leading-none truncate px-4">{formData.name || "Identity Name"}</p>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{formData.email || "email@nexus-ai.com"}</p>
                     </div>

                     <Separator className="bg-primary/10" />

                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Assigned Role</span>
                           <Badge className="bg-primary text-white border-none text-[9px] font-black uppercase px-3">{formData.role}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Department</span>
                           <span className="text-xs font-bold">{formData.department}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Location</span>
                           <span className="text-xs font-bold">{formData.location || "Not Set"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Security</span>
                           <Badge variant="outline" className={cn(
                              "text-[9px] font-black uppercase px-2 py-0 h-5 border-primary/20",
                              formData.twoFactorEnabled ? "text-green-600 border-green-500/20 bg-green-500/5" : "text-amber-600"
                           )}>
                              {formData.twoFactorEnabled ? "2FA Enabled" : "2FA Disabled"}
                           </Badge>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-dashed space-y-3">
                        <div className="p-4 rounded-xl border border-primary/5 bg-primary/5 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className={cn(
                                 "h-2.5 w-2.5 rounded-full shadow-sm",
                                 formData.status === "Active" ? "bg-green-500" : formData.status === "Inactive" ? "bg-red-500" : "bg-amber-500"
                              )} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Initial Status: {formData.status}</span>
                           </div>
                           <Select 
                              defaultValue={formData.status}
                              onValueChange={(v) => setFormData({ ...formData, status: v })}
                           >
                              <SelectTrigger className="w-8 h-8 p-0 border-none bg-transparent hover:bg-primary/5 flex justify-center items-center">
                                 <Plus className="h-4 w-4 text-primary" />
                              </SelectTrigger>
                              <SelectContent>
                                 {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                        
                        <Button
                           onClick={handleSubmit}
                           disabled={!formData.name || !formData.email}
                           className="w-full h-12 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                        >
                           Confirm Provisioning
                        </Button>
                        <p className="text-[8px] text-center text-muted-foreground font-black uppercase tracking-widest mt-2">
                           ID: NEXTGEN-{Math.floor(Math.random() * 100000)}
                        </p>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
