"use client";

import { useState } from "react";
import { Activity, ShieldCheck, Zap, RefreshCcw, Download, Info, ChevronRight, Globe, Server, Cpu, Radio, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, Area, CartesianGrid, XAxis, YAxis, Tooltip, ComposedChart, Line, Bar } from "recharts";
import { qosMetrics } from "@/lib/mock-data/telephony";
import { cn } from "@/lib/utils";

export default function TelephonyHealth() {
   const [isRefreshing, setIsRefreshing] = useState(false);
   const [activeAlerts, setActiveAlerts] = useState([
      { id: 1, type: "Critical", label: "Jitter Surge", details: "US-West gateway detected 45ms latency peak. Level 2 intervention required.", time: "10:32 AM", resolved: false },
      { id: 2, type: "Warning", label: "Packet Loss", details: "0.5% loss detected on Trunk #TR-003. Monitoring session stability.", time: "11:15 AM", resolved: false }
   ]);

   const handleRefresh = () => {
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 1200);
   };

   const resolveAlert = (id) => {
      setActiveAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
   };

   return (
      <div className="space-y-8 animate-in fade-in duration-700">
         {/* Premium Glassmorphic Header */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
               { label: "Global MOS Index", value: "4.42", trend: "+2.1%", sub: "High Fidelity", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10" },
               { label: "Transit Latency", value: "18ms", trend: "-5ms", sub: "Ultra Low", icon: Zap, color: "text-blue-400", bg: "bg-blue-500/10" },
               { label: "Compliance Score", value: "99.8%", trend: "Stable", sub: "STIR/SHAKEN Active", icon: ShieldCheck, color: "text-purple-400", bg: "bg-purple-500/10" },
               { label: "Node Redundancy", value: "100%", trend: "Optimal", sub: "Failover Ready", icon: Server, color: "text-amber-400", bg: "bg-amber-500/10" },
            ].map((stat, idx) => (
               <Card key={idx} className="border-primary/10 bg-card/40 backdrop-blur-xl relative overflow-hidden group">
                  <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-3xl opacity-20 transition-all group-hover:opacity-40", stat.bg)} />
                  <CardContent className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                           <stat.icon className="h-6 w-6" />
                        </div>
                        <Badge variant="outline" className="text-[9px] font-black tracking-widest uppercase border-primary/10">
                           {stat.trend}
                        </Badge>
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground/60 font-bold mt-1 italic">{stat.sub}</p>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* QoS Nexus Dashboard */}
            <Card className="xl:col-span-2 border-primary/5 bg-card/30 backdrop-blur-md shadow-2xl overflow-hidden border">
               <CardHeader className="p-8 bg-linear-to-r from-primary/5 to-transparent flex flex-row items-center justify-between border-b border-primary/5">
                  <div className="space-y-1">
                     <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-3">
                        <Globe className="h-5 w-5 text-primary animate-pulse" /> Telephony Nexus <span className="text-primary/40">v3.0</span>
                     </CardTitle>
                     <CardDescription className="text-xs font-medium text-muted-foreground/80 lowercase italic">
                        Advanced cross-metric analysis of voice stream health across global nodes.
                     </CardDescription>
                  </div>
                  <div className="flex gap-3">
                     <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-4 text-[10px] font-black uppercase border-primary/10 hover:bg-primary/5 transition-all"
                        onClick={handleRefresh}
                     >
                        <RefreshCcw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                        Sync Grid
                     </Button>
                     <Button size="sm" className="h-9 px-4 text-[10px] font-black uppercase shadow-lg shadow-primary/20">
                        <Download className="h-4 w-4 mr-2" /> Export
                     </Button>
                  </div>
               </CardHeader>
               <CardContent className="p-8">
                  <div className="h-80 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={qosMetrics}>
                           <defs>
                              <linearGradient id="mosGradient" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                                 <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.1} />
                           <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                           <YAxis yAxisId="left" domain={[3, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                           <YAxis yAxisId="right" orientation="right" domain={[0, 60]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                           <Tooltip
                              contentStyle={{ backgroundColor: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '12px' }}
                              itemStyle={{ fontSize: '12px', fontWeight: '900', color: '#fff' }}
                           />
                           <Area yAxisId="left" type="monotone" dataKey="mos" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#mosGradient)" />
                           <Bar yAxisId="right" dataKey="latency" barSize={12} fill="#6366f1" radius={[4, 4, 0, 0]} opacity={0.3} />
                           <Line yAxisId="right" type="monotone" dataKey="jitter" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} />
                        </ComposedChart>
                     </ResponsiveContainer>
                  </div>

                  {/* Regional Matrix Labels */}
                  <div className="mt-8 grid grid-cols-4 gap-4 pt-8 border-t border-primary/5">
                     {[
                        { label: "US-East", latency: "14ms", healthy: true },
                        { label: "EU-West", latency: "38ms", healthy: true },
                        { label: "Asia-Pacific", latency: "142ms", healthy: false },
                        { label: "US-Central", latency: "22ms", healthy: true },
                     ].map((region, i) => (
                        <div key={i} className="space-y-2 group cursor-help text-center">
                           <div className="flex items-center justify-center gap-2">
                              <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", region.healthy ? "bg-emerald-500" : "bg-red-500")} />
                              <span className="text-[10px] font-black uppercase text-muted-foreground group-hover:text-foreground transition-colors">{region.label}</span>
                           </div>
                           <p className="text-xs font-black font-mono">{region.latency}</p>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            {/* Intelligence & Alert Side Board */}
            <div className="space-y-8">
               {/* Active Resolution Center */}
               <Card className="border-primary/10 shadow-xl bg-linear-to-b from-card to-background relative overflow-hidden">
                  <CardHeader className="p-6 bg-red-500/5 flex flex-row items-center justify-between border-b border-red-500/10">
                     <CardTitle className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4" /> System Health Overrides
                     </CardTitle>
                     <Badge className="bg-red-500/20 text-red-500 border-none text-[8px] animate-pulse">2 Active Issues</Badge>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                     {activeAlerts.map((alert) => (
                        <div
                           key={alert.id}
                           className={cn(
                              "p-4 rounded-2xl border transition-all relative overflow-hidden group",
                              alert.resolved ? "bg-muted/20 border-primary/5 opacity-60" : "bg-red-500/5 border-red-500/10 shadow-sm"
                           )}
                        >
                           <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                 <div className={cn("h-2 w-2 rounded-full", alert.resolved ? "bg-muted" : "bg-red-500")} />
                                 <p className="text-[10px] font-black uppercase tracking-tight">{alert.label}</p>
                              </div>
                              <span className="text-[8px] font-mono text-muted-foreground">{alert.time}</span>
                           </div>
                           <p className="text-[10px] text-muted-foreground/80 leading-relaxed italic mb-4">
                              {alert.details}
                           </p>
                           <div className="flex gap-2">
                              <Button
                                 size="sm"
                                 variant={alert.resolved ? "ghost" : "destructive"}
                                 className="h-8 flex-1 text-[9px] font-black uppercase tracking-widest"
                                 onClick={() => resolveAlert(alert.id)}
                                 disabled={alert.resolved}
                              >
                                 {alert.resolved ? <CheckCircle2 className="h-3.5 w-3.5 mr-2" /> : <Zap className="h-3.5 w-3.5 mr-2" />}
                                 {alert.resolved ? "Resolved" : "Automate Fix"}
                              </Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-primary/10">
                                 <ChevronRight className="h-4 w-4" />
                              </Button>
                           </div>
                        </div>
                     ))}
                  </CardContent>
               </Card>

               {/* Technical Diagnostics */}
               <Card className="border-primary/10 shadow-2xl bg-card/60 backdrop-blur-lg border">
                  <CardHeader className="p-6 pb-2">
                     <CardTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-primary" /> Signaling Engine <span className="text-primary/40 font-mono ml-auto">RT-DX</span>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-4 space-y-8">
                     <div className="space-y-6">
                        {[
                           { label: "Opus Codec Usage", val: 94, color: "bg-blue-500" },
                           { label: "UDP Handshake Speed", val: 82, color: "bg-purple-500" },
                           { label: "SIP Stack Efficiency", val: 98, color: "bg-emerald-500" },
                        ].map((diag, i) => (
                           <div key={i} className="space-y-2">
                              <div className="flex justify-between text-[9px] font-black uppercase text-muted-foreground tracking-widest">
                                 <span>{diag.label}</span>
                                 <span className="text-foreground">{diag.val}%</span>
                              </div>
                              <Progress value={diag.val} className="h-1 bg-primary/5" indicatorClassName={diag.color} />
                           </div>
                        ))}
                     </div>

                     <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 relative group cursor-pointer hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                           <Info className="h-4 w-4 text-primary" />
                           <p className="text-[10px] font-black uppercase text-primary tracking-tighter">AI Network Forecast</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                           &quot;Predictive models suggest a high-load event in <span className="text-foreground font-black">EU-West</span> at 14:00 UTC. Auto-scaling SIP workers now.&quot;
                        </p>
                     </div>

                     <Button variant="outline" className="w-full h-12 text-[10px] font-black uppercase tracking-widest shadow-sm rounded-xl border-primary/20 hover:bg-primary hover:text-white transition-all group overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <Radio className="h-4 w-4 mr-2 relative z-10" />
                        <span className="relative z-10">Run Advanced Diagnostics</span>
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Footer Health Pulse */}
         <div className="flex items-center justify-between px-6 py-4 rounded-3xl bg-card border border-primary/10 shadow-inner">
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Core Engine: Stable</span>
               </div>
               <div className="h-4 w-px bg-primary/10" />
               <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Gateways: 8/8 Online</span>
               </div>
            </div>
            <div className="flex items-center gap-4 text-[9px] font-black uppercase text-muted-foreground/60 tracking-tighter italic">
               Update Interval: 500ms • Session ID: NX-9402-TH
            </div>
         </div>
      </div>
   );
}