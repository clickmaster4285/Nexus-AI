"use client";

import { useState } from "react";
import { Layout, Plus, Settings2, BarChart3, PieChart, LineChart, Move, Trash2, Maximize2, Layers, Database, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dashboards } from "@/lib/mock-data/reporting";
import { cn } from "@/lib/utils";

export default function DashboardBuilder() {
   const [selectedDashboard, setSelectedDashboard] = useState(dashboards[0]);

   return (
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-220px)] overflow-hidden">
         {/* Sidebar: Dashboard List & Config */}
         <Card className="xl:col-span-1 flex flex-col min-h-0 border-primary/10 shadow-md">
            <CardHeader className="p-4 bg-primary/5 border-b">
               <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">Dashboards</CardTitle>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                     <Plus className="h-4 w-4" />
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-1">
               <div className="divide-y divide-primary/5">
                  {dashboards.map((dash) => (
                     <div
                        key={dash.id}
                        onClick={() => setSelectedDashboard(dash)}
                        className={cn(
                           "p-4 cursor-pointer transition-all hover:bg-muted/50",
                           selectedDashboard.id === dash.id ? "bg-primary/5 border-l-4 border-primary" : "border-l-4 border-transparent"
                        )}
                     >
                        <p className="text-sm font-bold">{dash.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">{dash.description}</p>
                     </div>
                  ))}
               </div>
            </CardContent>
            <div className="p-4 border-t bg-muted/20">
               <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-3 tracking-widest">Widget Library</h4>
               <div className="grid grid-cols-2 gap-2">
                  {[
                     { icon: BarChart3, label: "Bar" },
                     { icon: LineChart, label: "Line" },
                     { icon: PieChart, label: "Pie" },
                     { icon: Layout, label: "KPI" },
                  ].map((item) => (
                     <Button key={item.label} variant="outline" size="sm" className="h-16 flex-col gap-1 text-[10px] font-bold border-dashed border-primary/20 hover:border-primary hover:bg-primary/5 transition-all">
                        <item.icon className="h-4 w-4 text-primary" />
                        {item.label}
                     </Button>
                  ))}
               </div>
            </div>
         </Card>

         {/* Main Builder Canvas */}
         <div className="xl:col-span-3 flex flex-col gap-6 overflow-y-auto pr-2">
            <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-primary/10 shadow-sm">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                     <Layout className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                     <h2 className="text-xl font-black tracking-tight">{selectedDashboard.name}</h2>
                     <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-[8px] font-bold py-0">{selectedDashboard.layout} Layout</Badge>
                        <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                           <Database className="h-3 w-3" /> Auto-refresh: {selectedDashboard.refreshInterval}
                        </span>
                     </div>
                  </div>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-bold">
                     <Eye className="h-4 w-4" /> Preview
                  </Button>
                  <Button size="sm" className="h-9 gap-2 text-xs font-black shadow-lg">
                     <Settings2 className="h-4 w-4" /> Save Changes
                  </Button>
               </div>
            </div>

            {/* Dynamic Grid Layout */}
            <div className={cn(
               "grid gap-4",
               selectedDashboard.layout === "3-Col" ? "grid-cols-3" : "grid-cols-2"
            )}>
               {selectedDashboard.widgets.map((widget) => (
                  <Card key={widget.id} className="group relative border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg bg-linear-to-b from-card to-secondary/5">
                     <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-20">
                        <Button size="icon" variant="ghost" className="h-7 w-7 bg-background/80 backdrop-blur-sm shadow-sm">
                           <Maximize2 className="h-3 w-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 bg-background/80 backdrop-blur-sm shadow-sm text-red-500 hover:text-red-600">
                           <Trash2 className="h-3 w-3" />
                        </Button>
                     </div>
                     <CardHeader className="p-4 pb-2">
                        <div className="flex items-center gap-2">
                           <div className="h-2 w-2 rounded-full bg-primary" />
                           <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{widget.title}</CardTitle>
                        </div>
                     </CardHeader>
                     <CardContent className="p-6 h-40 flex flex-col items-center justify-center relative">
                        {widget.type === "KPI Card" || widget.type === "Number" ? (
                           <div className="text-center space-y-1">
                              <p className="text-4xl font-black tracking-tighter text-primary">{widget.value}</p>
                              <Badge variant="secondary" className="text-[10px] font-black bg-green-500/10 text-green-600 border-none px-2 py-0">
                                 {widget.trend}
                              </Badge>
                           </div>
                        ) : widget.type === "Gauge" ? (
                           <div className="text-center space-y-1 relative h-full w-full flex items-center justify-center">
                              <svg className="h-24 w-24" viewBox="0 0 100 100">
                                 <circle className="text-primary/5 stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                                 <circle className="text-primary stroke-current" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="50.2" strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" transform="rotate(-90 50 50)" />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                 <p className="text-xl font-black">{widget.value}</p>
                                 <p className="text-[8px] font-bold text-muted-foreground uppercase">{widget.trend} Trend</p>
                              </div>
                           </div>
                        ) : (
                           <div className="flex flex-col items-center gap-3 text-muted-foreground">
                              <BarChart3 className="h-10 w-10 opacity-20" />
                              <p className="text-[10px] font-bold uppercase tracking-widest">Chart Visualization</p>
                           </div>
                        )}
                        <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-move">
                           <Move className="h-8 w-8 text-primary/20" />
                        </div>
                     </CardContent>
                  </Card>
               ))}
               <Card className="border-dashed border-2 border-primary/20 bg-primary/2 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center h-52 group">
                  <div className="h-12 w-12 rounded-full bg-background border border-primary/10 flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                     <Layers className="h-6 w-6 text-primary/50" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Add New Widget</p>
               </Card>
            </div>
         </div>
      </div>
   );
}
