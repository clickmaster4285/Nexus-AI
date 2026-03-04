"use client";

import { useState } from "react";
import {
   BarChart3,
   TrendingUp,
   TrendingDown,
   Minus,
   Activity,
   AlertTriangle,
   Zap,
   ArrowUpRight,
   ExternalLink,
   Filter,
} from "lucide-react";
import {
   Bar,
   BarChart as RechartsBarChart,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const topicTrendData = [
   { name: 'Billing', volume: 450, sentiment: 42, trend: 15 },
   { name: 'Technical', volume: 380, sentiment: 68, trend: -5 },
   { name: 'Onboarding', volume: 290, sentiment: 85, trend: 22 },
   { name: 'Cancellation', volume: 180, sentiment: 15, trend: 34 },
   { name: 'Feature Req', volume: 210, sentiment: 72, trend: 8 },
   { name: 'Shipping', volume: 150, sentiment: 55, trend: -12 },
];

const patterns = [
   { id: 1, name: "Repeat Contact Loop", type: "Repeat Contact", count: 24, agents: 8, date: "2026-03-01", severity: "high", action: "Review IVR routing for 'Order Status'" },
   { id: 2, name: "Silence/Dead Air Detection", type: "Dead Air", count: 15, agents: 5, date: "2026-03-02", severity: "medium", action: "Investigate VoIP latency in West region" },
   { id: 3, name: "Escalation Spike", type: "Anomaly", count: 42, agents: 12, date: "2026-03-03", severity: "critical", action: "Emergency training for Billing Team" },
   { id: 4, name: "Successful Upsell Pattern", type: "Positive Pattern", count: 31, agents: 6, date: "2026-03-03", severity: "low", action: "Share A005's script with Sales" },
];

export default function ConversationAnalytics() {
   const [dateRange, setDateRange] = useState("7d");

   return (
      <div className="space-y-6">
         {/* Filters (2.3.1) */}
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
               <h3 className="text-lg font-bold">Conversation Library & Trends</h3>
               <p className="text-xs text-muted-foreground">Analyzing cross-call behaviors and emerging signals.</p>
            </div>
            <div className="flex items-center gap-3">
               <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-32 h-9 bg-background">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="24h">Last 24h</SelectItem>
                     <SelectItem value="7d">Last 7 Days</SelectItem>
                     <SelectItem value="30d">Last 30 Days</SelectItem>
                     <SelectItem value="90d">Last 90 Days</SelectItem>
                  </SelectContent>
               </Select>
               <Select defaultValue="all">
                  <SelectTrigger className="w-40 h-9 bg-background">
                     <SelectValue placeholder="Queue" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Queues</SelectItem>
                     <SelectItem value="support">Support</SelectItem>
                     <SelectItem value="sales">Sales</SelectItem>
                     <SelectItem value="billing">Billing</SelectItem>
                  </SelectContent>
               </Select>
               <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Topic Trend Dashboard (2.3.1) */}
            <Card className="lg:col-span-2">
               <CardHeader className="pb-2 border-b">
                  <div className="flex items-center justify-between">
                     <CardTitle className="text-base flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Topic Volume & Trends
                     </CardTitle>
                     <Badge variant="outline" className="bg-background">2.3.1</Badge>
                  </div>
               </CardHeader>
               <CardContent className="pt-6">
                  <div className="h-75 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={topicTrendData} layout="vertical" margin={{ left: 20, right: 20 }}>
                           <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.1} />
                           <XAxis type="number" hide />
                           <YAxis
                              dataKey="name"
                              type="category"
                              tick={{ fontSize: 12, fontWeight: 500 }}
                              axisLine={false}
                              tickLine={false}
                              width={100}
                           />
                           <Tooltip
                              cursor={{ fill: 'transparent' }}
                              content={({ active, payload }) => {
                                 if (active && payload && payload.length) {
                                    return (
                                       <div className="bg-popover border p-3 rounded-lg shadow-xl text-xs space-y-2 min-w-48">
                                          <div className="border-b pb-1">
                                             <p className="font-bold">{payload[0].payload.name}</p>
                                          </div>
                                          <div className="grid grid-cols-2 gap-2">
                                             <div>
                                                <p className="text-muted-foreground font-medium">Volume</p>
                                                <p className="font-mono text-sm">{payload[0].value}</p>
                                             </div>
                                             <div>
                                                <p className="text-muted-foreground font-medium">Trend</p>
                                                <p className={cn("text-sm font-mono", payload[0].payload.trend > 0 ? "text-green-500" : "text-red-500")}>
                                                   {payload[0].payload.trend > 0 ? "+" : ""}{payload[0].payload.trend}%
                                                </p>
                                             </div>
                                          </div>
                                          <div className="pt-1 border-t">
                                             <p className="text-[10px] text-primary hover:underline cursor-pointer flex items-center justify-between font-bold">
                                                View {payload[0].payload.name} Calls
                                                <ExternalLink className="h-2.5 w-2.5" />
                                             </p>
                                          </div>
                                       </div>
                                    );
                                 }
                                 return null;
                              }}
                           />
                           <Bar dataKey="volume" radius={[0, 4, 4, 0]} barSize={24}>
                              {topicTrendData.map((entry, index) => (
                                 <Cell key={index} fill={entry.sentiment > 70 ? 'var(--primary)' : entry.sentiment < 40 ? 'hsl(var(--destructive))' : 'hsl(var(--muted-foreground))'} />
                              ))}
                           </Bar>
                        </RechartsBarChart>
                     </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                     {topicTrendData.slice(0, 3).map((topic, i) => (
                        <div key={i} className="bg-muted/30 p-3 rounded-lg border border-border/50">
                           <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">{topic.name}</span>
                              <Badge variant="outline" className={cn("text-[9px] h-3 px-1 border-none", topic.trend > 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50")}>
                                 {topic.trend > 0 ? "+" : ""}{topic.trend}%
                              </Badge>
                           </div>
                           <div className="flex items-end justify-between">
                              <span className="text-lg font-bold font-mono">{topic.volume}</span>
                              <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden mb-1.5">
                                 <div className={cn("h-full", topic.sentiment > 70 ? "bg-green-500" : topic.sentiment < 40 ? "bg-red-500" : "bg-yellow-500")} style={{ width: `${topic.sentiment}%` }} />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            {/* Top Agents Panel (2.3.1 Sidebar) */}
            <Card className="flex flex-col">
               <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-base flex items-center gap-2">
                     <Zap className="h-5 w-5 text-yellow-500" />
                     Trend Setters
                  </CardTitle>
               </CardHeader>
               <CardContent className="pt-4 flex-1 space-y-4">
                  <div className="space-y-3">
                     <Label className="text-[10px] text-muted-foreground uppercase font-bold">Top Ranked Agents</Label>
                     {[
                        { name: "Sarah Jenkins", score: 98, calls: 42, icon: TrendingUp },
                        { name: "Mike Ross", score: 94, calls: 38, icon: TrendingUp },
                        { name: "Alex Chen", score: 89, calls: 51, icon: Minus },
                        { name: "Lisa Wong", score: 87, calls: 29, icon: TrendingDown },
                     ].map((agent, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border cursor-pointer">
                           <div className="flex items-center gap-3">
                              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                 #{i + 1}
                              </div>
                              <div>
                                 <p className="text-xs font-semibold">{agent.name}</p>
                                 <p className="text-[10px] text-muted-foreground">{agent.calls} calls analyzed</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="flex items-center gap-1 text-xs font-bold text-primary">
                                 {agent.score}
                                 <agent.icon className="h-3 w-3" />
                              </div>
                              <Progress value={agent.score} className="h-1 w-12 mt-1" />
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="pt-4 border-t space-y-3">
                     <Label className="text-[10px] text-muted-foreground uppercase font-bold">Emerging Topics</Label>
                     <div className="flex flex-wrap gap-2">
                        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200">
                           <Activity className="h-3 w-3 mr-1" /> &quot;V3 API Delay&quot; (+80%)
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200">
                           &quot;Summer Promo&quot; (+20%)
                        </Badge>
                     </div>
                  </div>

                  <Button variant="ghost" className="w-full mt-auto text-xs text-primary group font-bold">
                     Full Analytics Report
                     <ArrowUpRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
               </CardContent>
            </Card>

            {/* Pattern Recognition & Anomalies (2.3.2) */}
            <Card className="lg:col-span-3">
               <CardHeader className="pb-2 border-b bg-muted/30">
                  <div className="flex items-center justify-between">
                     <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Detected Anomalies & Patterns
                     </CardTitle>
                     <Badge variant="outline" className="bg-background">2.3.2</Badge>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                     <Table>
                        <TableHeader className="bg-muted/50">
                           <TableRow>
                              <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Pattern Name</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Detection Type</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Frequency</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Recommended Action</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold h-10 px-4 text-right">Management</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {patterns.map((p) => (
                              <TableRow key={p.id} className="group hover:bg-muted/20">
                                 <TableCell className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                       <div className={cn(
                                          "h-2 w-2 rounded-full",
                                          p.severity === 'critical' ? "bg-red-500 animate-pulse" :
                                             p.severity === 'high' ? "bg-orange-500" :
                                                p.severity === 'medium' ? "bg-yellow-500" : "bg-green-500"
                                       )} />
                                       <div>
                                          <p className="text-sm font-semibold">{p.name}</p>
                                          <p className="text-[10px] text-muted-foreground italic">First sighted: {p.date}</p>
                                       </div>
                                    </div>
                                 </TableCell>
                                 <TableCell className="px-4 py-3">
                                    <Badge variant="outline" className="text-[10px] font-normal rounded-sm">
                                       {p.type}
                                    </Badge>
                                 </TableCell>
                                 <TableCell className="px-4 py-3">
                                    <div className="flex flex-col">
                                       <span className="text-sm font-bold">{p.count} calls</span>
                                       <span className="text-[10px] text-muted-foreground">{p.agents} agents affected</span>
                                    </div>
                                 </TableCell>
                                 <TableCell className="px-4 py-3 max-w-75">
                                    <p className="text-xs text-muted-foreground leading-relaxed">{p.action}</p>
                                 </TableCell>
                                 <TableCell className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-1 opacity-10 group-hover:opacity-100 transition-opacity">
                                       <Button size="sm" variant="outline" className="h-7 text-[10px] px-2" onClick={() => alert("Acknowledged")}>Acknowledge</Button>
                                       <Button size="sm" variant="ghost" className="h-7 text-[10px] px-2 text-muted-foreground" onClick={() => alert("Dismissed")}>Dismiss</Button>
                                       <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500" title="Escalate" onClick={() => alert("Escalated to Manager")}>
                                          <AlertTriangle className="h-4 w-4" />
                                       </Button>
                                    </div>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
