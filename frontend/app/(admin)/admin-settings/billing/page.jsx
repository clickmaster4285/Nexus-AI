"use client";

import { CreditCard, Download, ExternalLink, Receipt, Users, DollarSign, ArrowUpRight, History, ShieldCheck, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { billingStats, agentExpenses, invoiceHistory } from "@/lib/mock-data/admin";
import { toast } from "sonner";

export default function BillingPage() {
   const handleDownload = (id) => {
      toast.success(`Downloading invoice ${id}...`);
   };

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Top Header Section */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h2 className="text-xl font-black tracking-tight uppercase">Billing & Expenses</h2>
               <p className="text-xs text-muted-foreground font-medium italic">Manage subscriptions, analyze agent resource costs, and view transaction history.</p>
            </div>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" className="text-[10px] font-black uppercase tracking-widest h-9" onClick={() => toast.info("Opening portal...")}>
                  <ExternalLink className="mr-2 h-3.5 w-3.5" /> Portal
               </Button>
               <Button size="sm" className="text-[10px] font-black uppercase tracking-widest h-9 shadow-lg shadow-primary/20" onClick={() => toast.info("Add Credits dialog")}>
                  <Wallet className="mr-2 h-3.5 w-3.5" /> Add Credits
               </Button>
            </div>
         </div>

         {/* Overview Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-primary/5 shadow-sm bg-card/50">
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                     <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Current Balance</p>
                     <p className="text-xl font-black">${billingStats.currentBalance.toLocaleString()}</p>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-primary/5 shadow-sm bg-card/50">
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-500">
                     <Receipt className="h-5 w-5" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Last Payment</p>
                     <p className="text-xl font-black">${billingStats.lastPayment.toLocaleString()}</p>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-primary/5 shadow-sm bg-card/50">
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-green-500/5 flex items-center justify-center text-green-500">
                     <Users className="h-5 w-5" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Agent Cost Avg</p>
                     <p className="text-xl font-black">$28.40 <span className="text-[10px] font-medium text-muted-foreground tracking-normal">/agent</span></p>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-primary/5 shadow-sm bg-card/50">
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/5 flex items-center justify-center text-purple-500">
                     <History className="h-5 w-5" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Billing Cycle</p>
                     <p className="text-xl font-black uppercase tracking-tighter">Monthly</p>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
               {/* Agent Expense Table */}
               <Card className="border-primary/10 shadow-md overflow-hidden bg-card/30">
                  <CardHeader className="p-6 pb-0">
                     <div className="flex justify-between items-center">
                        <div>
                           <CardTitle className="text-sm font-black uppercase tracking-widest">Resource Expense Analysis</CardTitle>
                           <CardDescription className="text-[10px] font-medium italic">Detailed breakdown of agent session costs and call resource consumption.</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest h-8" onClick={() => toast.success("Exporting CSV...")}>
                           Export CSV
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent className="p-0 pt-6">
                     <Table>
                        <TableHeader className="bg-muted/50">
                           <TableRow className="border-primary/5">
                              <TableHead className="text-[10px] font-black uppercase tracking-widest h-10 px-6">Agent / Team</TableHead>
                              <TableHead className="text-[10px] font-black uppercase tracking-widest h-10 text-center">Session Hrs</TableHead>
                              <TableHead className="text-[10px] font-black uppercase tracking-widest h-10 text-center">Call Mins</TableHead>
                              <TableHead className="text-[10px] font-black uppercase tracking-widest h-10 text-right pr-6">Estimated Cost</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {agentExpenses.map((agent) => (
                              <TableRow key={agent.id} className="border-primary/5 hover:bg-primary/2 transition-colors group">
                                 <TableCell className="px-6 py-4">
                                    <div className="flex flex-col">
                                       <span className="text-xs font-black tracking-tight">{agent.name}</span>
                                       <span className="text-[9px] text-muted-foreground font-bold uppercase">{agent.team} • {agent.id}</span>
                                    </div>
                                 </TableCell>
                                 <TableCell className="text-center font-mono text-xs">{agent.sessionHours}h</TableCell>
                                 <TableCell className="text-center">
                                    <div className="flex flex-col items-center gap-1">
                                       <span className="font-mono text-xs">{agent.callMinutes.toLocaleString()}m</span>
                                       <Progress value={(agent.callMinutes / 5000) * 100} className="h-1 w-16" />
                                    </div>
                                 </TableCell>
                                 <TableCell className="text-right pr-6 font-black text-xs">
                                    ${agent.totalCost.toFixed(2)}
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </CardContent>
               </Card>

               {/* Invoice History */}
               <Card className="border-primary/10 shadow-md bg-card/30">
                  <CardHeader className="p-6">
                     <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <History className="h-4 w-4 text-primary" />
                        Transaction History
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                     <Table>
                        <TableHeader className="bg-muted/50">
                           <TableRow className="border-primary/5">
                              <TableHead className="text-[10px] font-black uppercase tracking-widest h-10 px-6">Invoice ID</TableHead>
                              <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Date</TableHead>
                              <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Amount</TableHead>
                              <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Status</TableHead>
                              <TableHead className="text-[10px] font-black uppercase tracking-widest h-10 text-right pr-6">Action</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {invoiceHistory.map((invoice) => (
                              <TableRow key={invoice.id} className="border-primary/5 hover:bg-muted/30 transition-colors">
                                 <TableCell className="px-6 py-4 text-xs font-bold font-mono">{invoice.id}</TableCell>
                                 <TableCell className="text-xs text-muted-foreground">{invoice.date}</TableCell>
                                 <TableCell className="text-xs font-black">${invoice.amount.toLocaleString()}</TableCell>
                                 <TableCell>
                                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-green-500/30 text-green-600 bg-green-500/5">
                                       {invoice.status}
                                    </Badge>
                                 </TableCell>
                                 <TableCell className="text-right pr-6">
                                    <Button 
                                       variant="ghost" 
                                       size="icon" 
                                       className="h-8 w-8 hover:text-primary transition-colors"
                                       onClick={() => handleDownload(invoice.id)}
                                    >
                                       <Download className="h-4 w-4" />
                                    </Button>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </CardContent>
               </Card>
            </div>

            {/* Side Column: Plan & Payment */}
            <div className="space-y-6">
               <Card className="border-primary/20 shadow-xl overflow-hidden bg-linear-to-b from-card to-background relative">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                     <ShieldCheck className="h-24 w-24 text-primary rotate-12" />
                  </div>
                  
                  <CardHeader className="p-6 bg-primary/5 border-b border-primary/10">
                     <div className="space-y-1">
                        <Badge className="bg-primary text-white text-[9px] font-black italic shadow-lg shadow-primary/20 uppercase tracking-widest px-2 py-0 border-none mb-2">
                           {billingStats.tier}
                        </Badge>
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">Active Plan</CardTitle>
                     </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                     <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                           <span className="text-3xl font-black tracking-tighter">${billingStats.monthlyBase}</span>
                           <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">/ Month Base</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium italic">Next billing date: <span className="text-foreground font-black">June 15, 2024</span></p>
                     </div>

                     <div className="space-y-4 pt-4 border-t border-dashed">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                           <span>Payment Method</span>
                           <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase" onClick={() => toast.info("Editing Payment Method")}>Edit</Button>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/50 border border-primary/5 flex items-center gap-3">
                           <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center border shadow-sm">
                              <CreditCard className="h-5 w-5 text-muted-foreground" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-xs font-black">{billingStats.paymentMethod}</span>
                              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">Expires 12/26</span>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4 pt-4 border-t border-dashed">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                           <span>Billing Contact</span>
                        </div>
                        <div className="text-xs font-bold text-muted-foreground bg-muted/30 p-3 rounded-lg border italic">
                           {billingStats.billingContact}
                        </div>
                     </div>

                     <div className="pt-2 space-y-3">
                        <Button className="w-full h-11 text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl shadow-primary/10" onClick={() => toast.info("Upgrading Subscription...")}>
                           Upgrade Subscription <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full h-11 text-[10px] font-black uppercase tracking-widest border-primary/10 group" onClick={() => toast.info("Viewing policies")}>
                           View Usage Policies
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 space-y-4">
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="h-4 w-4 text-primary/60" />
                     <p className="text-[10px] font-black uppercase tracking-widest">PCI-DSS Compliance</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                     Billing data is handled by our SOC 2 Type II compliant partner. Nexus AI never stores raw credit card details on its own servers.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-[9px] font-black uppercase tracking-tighter text-primary/60" onClick={() => toast.info("Viewing Certs")}>
                     View Security Certifications
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
