"use client";

import { useState } from "react";
import {
   Plus,
   Search,
   Filter,
   Settings2,
   BadgeDollarSign,
   Clock,
   CheckCircle2,
   XCircle,
   ArrowRight,
   ExternalLink,
   Save
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function OpportunitySignals({ opportunities }) {
   const [isBuilding, setIsBuilding] = useState(false);

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-2xl font-bold tracking-tight">Upsell & Cross-Sell Intelligence</h2>
               <p className="text-muted-foreground text-sm">Configure AI intent signals and track generated opportunities.</p>
            </div>
            <Button className="gap-2 shadow-lg bg-primary" onClick={() => setIsBuilding(true)}>
               <Plus className="h-4 w-4" />
               Create Signal (4.2.1)
            </Button>
         </div>

         {isBuilding && (
            <Card className="border-primary/50 shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
               <CardHeader className="bg-primary/5 border-b">
                  <div className="flex items-center justify-between">
                     <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                           <Settings2 className="h-5 w-5 text-primary" />
                           Signal Definition Builder
                        </CardTitle>
                        <CardDescription>Define 9 parameters to trigger real-time sales recommendations.</CardDescription>
                     </div>
                     <Button variant="ghost" size="icon" onClick={() => setIsBuilding(false)}>
                        <XCircle className="h-5 w-5" />
                     </Button>
                  </div>
               </CardHeader>
               <CardContent className="p-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <Label>1. Signal Name</Label>
                        <Input placeholder="e.g. Enterprise Upgrade Intent" />
                     </div>
                     <div className="space-y-2">
                        <Label>2. Signal Type</Label>
                        <Select>
                           <SelectTrigger><SelectValue placeholder="Select Type..." /></SelectTrigger>
                           <SelectContent>
                              <SelectItem value="upsell">Upsell (Expansion)</SelectItem>
                              <SelectItem value="cross">Cross-sell (New Product)</SelectItem>
                              <SelectItem value="bundle">Bundle Offer</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2">
                        <Label>3. Trigger Phrases (AI Tagging)</Label>
                        <Input placeholder="more users, annual plan, integrations..." />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <Label>4. Offer to Recommend</Label>
                        <Select>
                           <SelectTrigger><SelectValue placeholder="Select Offer..." /></SelectTrigger>
                           <SelectContent>
                              <SelectItem value="pro">Pro Plan - 20% Off</SelectItem>
                              <SelectItem value="sec">Security Suite Add-on</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <Label>5. Intent Strength (85%)</Label>
                           <Badge variant="outline" className="h-4 text-[9px]">MINIMUM AI CONFIDENCE</Badge>
                        </div>
                        <Slider defaultValue={[85]} max={100} step={1} className="py-2" />
                     </div>
                     <div className="space-y-2">
                        <Label>6. Active Queues</Label>
                        <Select>
                           <SelectTrigger><SelectValue placeholder="Select Queues..." /></SelectTrigger>
                           <SelectContent>
                              <SelectItem value="sup">Support</SelectItem>
                              <SelectItem value="sales">Inbound Sales</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-dashed">
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <Label className="font-bold">7. Real-time Agent Alert</Label>
                           <Switch defaultChecked />
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">Show a pop-up in the agent desktop during the call.</p>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <Label className="font-bold">8. Supervisor Alert</Label>
                           <Switch />
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">Notify supervisor if opportunity value &gt; $5,000.</p>
                     </div>
                     <div className="space-y-2">
                        <Label>9. Agent Prompt Text</Label>
                        <Textarea placeholder="What should the agent say?" className="h-20 text-xs" />
                     </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                     <Button variant="ghost" onClick={() => setIsBuilding(false)}>Cancel</Button>
                     <Button className="gap-2" onClick={() => setIsBuilding(false)}>
                        <Save className="h-4 w-4" />
                        Deploy Signal
                     </Button>
                  </div>
               </CardContent>
            </Card>
         )}

         {/* Opportunity Tracker Table (4.2.2) */}
         <Card>
            <CardHeader className="pb-3 border-b bg-muted/30">
               <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2 text-primary font-bold">
                     <BadgeDollarSign className="h-5 w-5" />
                     Opportunity Detection Tracker
                  </CardTitle>
                  <div className="flex items-center gap-2">
                     <div className="relative w-48">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                        <Input placeholder="Search revenue..." className="pl-8 h-8 text-xs bg-background" />
                     </div>
                     <Button variant="outline" size="sm" className="h-8">
                        <Filter className="h-3.5 w-3.5" />
                     </Button>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                  <TableHeader className="bg-muted/50">
                     <TableRow>
                        <TableHead className="text-[10px] uppercase font-bold h-10 px-4">ID / Ref</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Signal Triggered</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Detection Time</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Offered?</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Response</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Deal Value</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold h-10 px-4">CRM Deal</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold h-10 px-4 text-right">Verify</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {opportunities.map((opp) => (
                        <TableRow key={opp.id} className="group hover:bg-muted/20">
                           <TableCell className="px-4 py-4">
                              <div className="space-y-1">
                                 <span className="text-[10px] font-mono text-muted-foreground">#{opp.id}</span>
                                 <div className="flex items-center gap-1.5 text-xs font-bold text-primary cursor-pointer hover:underline">
                                    {opp.callRef} <ExternalLink className="h-3 w-3" />
                                 </div>
                              </div>
                           </TableCell>
                           <TableCell className="px-4 py-4">
                              <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-blue-50 text-blue-700 border-blue-200">
                                 {opp.signal}
                              </Badge>
                           </TableCell>
                           <TableCell className="px-4 py-4">
                              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                                 <Clock className="h-3 w-3" /> {opp.timestamp}
                              </div>
                           </TableCell>
                           <TableCell className="px-4 py-4">
                              {opp.offerMade ? (
                                 <Badge variant="outline" className="text-[9px] h-4 text-green-600 bg-green-50 border-green-200">YES</Badge>
                              ) : (
                                 <Badge variant="outline" className="text-[9px] h-4 text-amber-600 bg-amber-50 border-amber-200">NO</Badge>
                              )}
                           </TableCell>
                           <TableCell className="px-4 py-4">
                              <Badge className={cn(
                                 "text-[9px] px-1.5 h-4",
                                 opp.response === 'Accepted' ? "bg-green-500" :
                                    opp.response === 'Considering' ? "bg-amber-500" : "bg-red-500"
                              )}>
                                 {opp.response}
                              </Badge>
                           </TableCell>
                           <TableCell className="px-4 py-4 font-mono font-bold text-xs">
                              ${opp.value.toLocaleString()}
                           </TableCell>
                           <TableCell className="px-4 py-4">
                              {opp.crmDeal ? (
                                 <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                 <div className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase font-bold">
                                    Pending <ArrowRight className="h-3 w-3" />
                                 </div>
                              )}
                           </TableCell>
                           <TableCell className="px-4 py-4 text-right">
                              <Switch checked={opp.verified} className="scale-75" />
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>
   );
}
