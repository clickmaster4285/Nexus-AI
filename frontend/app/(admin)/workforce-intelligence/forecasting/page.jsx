"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { toast } from "sonner";
import { Clock, TrendingUp, Download, Filter, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { volumeForecast } from "@/lib/mock-data/workforce";
import { cn } from "@/lib/utils";

export default function ForecastingPage() {
  return (
    <div className="space-y-6 p-1">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">WFM Forecasting & Analytics</h2>
          <p className="text-xs text-muted-foreground font-medium italic">Predictive staffing models and volume distribution analysis.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-2 text-xs font-bold ring-1 ring-primary/10" onClick={() => toast.success("Exporting forecast report...")}>
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button variant="default" size="sm" className="h-8 gap-2 text-xs font-black shadow-lg" onClick={() => toast.success("Running new AI dynamic forecast...")}>
            <TrendingUp className="h-4 w-4" /> Run New Forecast
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Forecast Parameters Sidebar */}
        <Card className="xl:col-span-1 border-primary/10 bg-primary/1 shadow-sm">
          <CardHeader className="p-4 bg-primary/5 border-b">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
              <Filter className="h-4 w-4" /> Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Forecast Period</label>
              <Select defaultValue="24h">
                <SelectTrigger className="h-9 text-xs bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Next 24 Hours</SelectItem>
                  <SelectItem value="7d">Next 7 Days</SelectItem>
                  <SelectItem value="30d">Next 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Queue Selection</label>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 text-xs bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Enterprise Queues</SelectItem>
                  <SelectItem value="sales">Sales & Revenue</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Granularity</label>
              <Select defaultValue="1h">
                <SelectTrigger className="h-9 text-xs bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15m">15 Minutes</SelectItem>
                  <SelectItem value="30m">30 Minutes</SelectItem>
                  <SelectItem value="1h">1 Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t border-dashed">
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-3 ml-1">Model Sensitivity</label>
              <div className="flex flex-wrap gap-2">
                {['Historical', 'Seasonal', 'AI Dynamic', 'Market Trend'].map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[9px] font-bold bg-background border border-primary/10 px-2 py-0.5 shadow-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-2 shadow-inner">
              <p className="text-[10px] font-bold text-orange-600 flex items-center gap-1 uppercase">
                <Info className="h-3 w-3" /> External Signal
              </p>
              <p className="text-[10px] text-orange-950/80 dark:text-orange-200/80 font-medium leading-tight italic">
                Detected upcoming marketing campaign (Mar 10-12) may surge Billing volume by ~18.5%.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Charts & Forecasting Area */}
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Volume Forecast Chart */}
            <Card className="border-primary/10 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Volume Forecast vs Actual</CardTitle>
              </CardHeader>
              <CardContent className="h-62.5 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeForecast}>
                    <defs>
                      <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.60 0.10 185)" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="oklch(0.60 0.10 185)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.95 0 0)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'oklch(0.5 0 0)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'oklch(0.5 0 0)' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px' }}
                    />
                    <Area type="monotone" dataKey="forecast" stroke="oklch(0.60 0.10 185)" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                    <Area type="monotone" dataKey="actual" stroke="oklch(0.70 0.15 150)" strokeWidth={3} fill="url(#colorForecast)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Staffing Gap Chart */}
            <Card className="border-primary/10 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Staffing Gap Analysis (FTE)</CardTitle>
              </CardHeader>
              <CardContent className="h-62.5 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeForecast}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.95 0 0)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'oklch(0.5 0 0)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'oklch(0.5 0 0)' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px' }}
                    />
                    <Bar dataKey="gap">
                      {volumeForecast.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.gap > 0 ? "oklch(0.70 0.15 150)" : entry.gap < 0 ? "oklch(0.60 0.20 20)" : "oklch(0.5 0 0)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Gap Summary Board */}
          <Card className="border-primary/10 shadow-sm">
            <CardContent className="p-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0">
                {[
                  { label: 'Forecasted High', value: '145 cph', time: '11:00 AM', status: 'critical' },
                  { label: 'Avg AHT Forecast', value: '5:12', time: 'Today', status: 'stable' },
                  { label: 'Max Staffing Gap', value: '-2 FTE', time: '11:00 AM', status: 'critical' },
                  { label: 'Model Accuracy', value: '98.5%', time: 'Last 24h', status: 'perfect' },
                ].map((stat, idx) => (
                  <div key={idx} className="p-6 space-y-2 group hover:bg-muted/30 transition-colors">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black">{stat.value}</span>
                      <Badge className={cn(
                        "text-[8px] py-0 font-bold shadow-sm",
                        stat.status === 'critical' ? 'bg-red-500 text-white' :
                          stat.status === 'perfect' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                      )}>
                        {stat.status === 'critical' ? 'ALERT' : 'STABLE'}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                      <Clock className="h-3 w-3" /> {stat.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alert List */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Upcoming Staffing Risks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5 shadow-sm group hover:border-red-500/40 transition-colors">
                <div className="p-2 rounded-lg bg-red-500/20 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-red-950 dark:text-red-200">Understaffing Detected: 11:00 - 12:00</p>
                  <p className="text-[10px] text-red-900/70 dark:text-red-200/70 font-medium">Gap of 2 FTE. Estimated SLA drop to 72% (Goal 85%).</p>
                  <Button variant="link" className="h-auto p-0 text-[10px] text-red-600 font-bold hover:no-underline" onClick={() => toast.success("Opening queue rerouting options...")}>Open Rerouting Options →</Button>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-green-500/20 bg-green-500/5 shadow-sm group hover:border-green-500/40 transition-colors">
                <div className="p-2 rounded-lg bg-green-500/20 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-green-950 dark:text-green-200">Forecast Lock Confirmed: 21:00</p>
                  <p className="text-[10px] text-green-900/70 dark:text-green-200/70 font-medium">Model accuracy 99.2%. No staffing risks detected for late-night shift.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
