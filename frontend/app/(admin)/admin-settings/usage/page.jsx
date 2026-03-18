"use client";

import { CreditCard, Globe, Bell, Zap, Cpu, HardDrive, Settings, Sliders, ChevronRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { accountUsage } from "@/lib/mock-data/admin";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AccountSettings() {
   return (
      <div className="space-y-8 animate-in fade-in duration-500">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Resource Usage & Quotas */}
            <div className="lg:col-span-2 space-y-6">
               <div className="px-2">
                  <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Resource allocations</h2>
                  <p className="text-[10px] text-muted-foreground font-medium italic">Monitor system utilization and provisioned limits for the current billing cycle.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {accountUsage.stats.map((stat, i) => (
                     <Card key={i} className="border-primary/5 bg-card/40 backdrop-blur-sm shadow-md">
                        <CardContent className="p-6 space-y-4">
                           <div className="flex justify-between items-start">
                              <div className={cn("p-2 rounded-lg bg-primary/5", stat.color.replace('bg-', 'text-'))}>
                                 {stat.label.includes('Agent') ? <Users className="h-4 w-4" /> : stat.label.includes('Storage') ? <HardDrive className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                              </div>
                              <Badge variant="outline" className="text-[9px] font-black tracking-tighter border-primary/10">Quota: {stat.limit}{stat.unit}</Badge>
                           </div>
                           <div>
                              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                              <div className="flex items-baseline gap-1">
                                 <p className="text-2xl font-black tracking-tight">{stat.current}{stat.unit}</p>
                              </div>
                           </div>
                           <Progress value={(stat.current / stat.limit) * 100} className="h-1.5" indicatorClassName={stat.color} />
                        </CardContent>
                     </Card>
                  ))}
               </div>

               {/* Configuration Sections */}
               <div className="space-y-4 pt-4">
                  {[
                     { title: "Regional & Localization", desc: "Define default timezones, languages, and currency for global reports.", icon: Globe },
                     { title: "Notifications & Webhooks", desc: "Manage system-wide alerts and incident notification pipelines.", icon: Bell },
                     { title: "Intelligence Engine Config", desc: "Fine-tune NLP sensitivity and AI model logic for conversation scoring.", icon: Cpu },
                     { title: "Branding & Interface", desc: "Custom themes, logo management, and white-labeling options.", icon: Sliders },
                  ].map((section, idx) => (
                     <Card key={idx} className="border-primary/10 shadow-sm hover:border-primary/20 transition-all group cursor-pointer bg-card/50">
                        <CardContent className="p-6 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary/60 border border-primary/10">
                                 <section.icon className="h-5 w-5" />
                              </div>
                              <div className="space-y-1">
                                 <p className="text-sm font-black tracking-tight">{section.title}</p>
                                 <p className="text-[10px] text-muted-foreground font-medium italic">{section.desc}</p>
                              </div>
                           </div>
                           <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>

            {/* Subscription & Billing Side Board */}
            <div className="space-y-6">
               <div className="px-2">
                  <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Plan logic</h2>
               </div>

               <Card className="border-primary/10 shadow-xl overflow-hidden text-sm bg-linear-to-b from-card to-background">
                  <CardHeader className="p-6 bg-primary/5 border-b border-primary/10">
                     <div className="flex justify-between items-center">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">Active Subscription</CardTitle>
                        <Badge className="bg-primary text-white text-[9px] px-2 py-0 border-none font-black italic shadow-lg shadow-primary/20 uppercase tracking-widest">Enterprise Premium</Badge>
                     </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground">
                           <span>Cycle: {accountUsage.billingCycle}</span>
                           <span className="text-foreground">Renews on {accountUsage.nextBillingDate}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-primary/2 border border-primary/5 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span className="font-mono text-xs font-bold">Visa •••• 9012</span>
                           </div>
                           <Button variant="link" className="text-[10px] font-black uppercase p-0 h-auto" onClick={() => toast.info("Edit payment method")}>Edit</Button>
                        </div>
                     </div>

                     <div className="space-y-4 pt-4 border-t border-dashed">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Included Premium Features</p>
                        <div className="space-y-2">
                           {["AI Whisper Coaching", "Immutable Audit Trails", "Custom Gamification", "Multi-Carrier Redundancy"].map((feat) => (
                              <div key={feat} className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground italic">
                                 <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> {feat}
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="pt-4 space-y-3">
                        <Button className="w-full h-11 text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl shadow-primary/10" onClick={() => toast.info("Upgrade allocation logic")}>
                           Upgrade Allocation
                        </Button>
                        <Button variant="outline" className="w-full h-11 text-[10px] font-black uppercase tracking-widest border-primary/10" onClick={() => toast.success("Invoices downloaded")}>
                           Download Invoices
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               {/* Security Insight */}
               <div className="p-5 rounded-2xl bg-muted/30 border border-primary/5 space-y-3">
                  <div className="flex items-center gap-2">
                     <Settings className="h-4 w-4 text-muted-foreground/60" />
                     <p className="text-[10px] font-black uppercase tracking-widest">System Engine</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                     Nexus Instance ID: <span className="font-mono text-foreground font-black">NX-PROD-9482-AD</span>. Last system health check confirmed 14 mins ago.
                  </p>
               </div>
            </div>

         </div>
      </div>
   );
}

// Internal helper for usage cards
function Users({ className }) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         className={className}
      >
         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
         <circle cx="9" cy="7" r="4" />
         <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
         <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
   );
}
