import { Trophy, Flame, Settings, Plus, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { achievements, workforceAgents } from "@/lib/mock-data/workforce";
import { cn } from "@/lib/utils";
import AchievementAddForm from "./AchievementAddForm";
import { useState } from "react";

export default function GamificationEngine() {
   const [view, setView] = useState("builder"); // builder | leaderboards
   const [isAdding, setIsAdding] = useState(false);

   if (isAdding) {
      return <AchievementAddForm onCancel={() => setIsAdding(false)} onSave={() => setIsAdding(false)} />;
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h2 className="text-xl font-bold tracking-tight">Gamification Engine</h2>
               <p className="text-xs text-muted-foreground">Drive engagement through achievements and competition.</p>
            </div>
            <div className="flex bg-muted p-1 rounded-lg">
               <Button
                  variant={view === "builder" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("builder")}
                  className="h-8 text-xs font-bold"
               >
                  Achievement Builder
               </Button>
               <Button
                  variant={view === "leaderboards" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("leaderboards")}
                  className="h-8 text-xs font-bold"
               >
                  Leaderboards
               </Button>
            </div>
         </div>

         {view === "builder" ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
               {/* Active Achievements List */}
               <div className="xl:col-span-2 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-1">Active Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {achievements.map((item) => (
                        <Card key={item.id} className="border-primary/10 hover:shadow-lg transition-all group overflow-hidden">
                           <div className="absolute top-0 right-0 p-2">
                              <Settings className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" />
                           </div>
                           <CardContent className="p-6">
                              <div className="flex items-center gap-4">
                                 <div className={cn("p-4 rounded-2xl bg-muted/50 transition-transform group-hover:scale-110", item.color)}>
                                    <item.badge className="h-8 w-8" />
                                 </div>
                                 <div className="space-y-1">
                                    <h4 className="font-black text-lg">{item.name}</h4>
                                    <p className="text-xs text-muted-foreground">{item.event}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                       <Badge variant="outline" className="text-[10px] font-bold border-primary/20 bg-primary/5">
                                          {item.points} PTS
                                       </Badge>
                                       <Badge variant="outline" className="text-[10px] font-bold border-orange-500/20 bg-orange-500/5 text-orange-600">
                                          ACTIVE
                                       </Badge>
                                    </div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                     <Card
                        onClick={() => setIsAdding(true)}
                        className="border-dashed border-2 border-primary/20 flex items-center justify-center p-6 bg-primary/2 hover:bg-primary/4 cursor-pointer transition-colors group"
                     >
                        <div className="text-center space-y-2">
                           <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                              <Plus className="h-6 w-6 text-primary" />
                           </div>
                           <p className="text-sm font-bold text-primary">Create New Achievement</p>
                        </div>
                     </Card>
                  </div>
               </div>

               {/* Info Panel instead of Builder */}
               <div className="xl:col-span-1 space-y-6">
                  <Card className="border-primary/10 shadow-xl bg-linear-to-br from-primary/5 to-transparent overflow-hidden">
                     <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                           <Star className="h-4 w-4 fill-primary" /> Gamification Protocol
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="p-6 space-y-4">
                        <p className="text-[11px] text-muted-foreground font-medium italic leading-relaxed">
                           The Nexus Gamification Engine uses real-time event analytics to dynamically award points and badges. High-engagement achievements boost agent morale and visibility on global leaderboards.
                        </p>
                        <div className="pt-4 border-t border-dashed border-primary/10">
                           <div className="flex items-center justify-between py-2">
                              <span className="text-[10px] font-black uppercase text-muted-foreground">Active Drivers</span>
                              <Badge className="bg-primary/10 text-primary border-none text-[9px]">4 REW</Badge>
                           </div>
                           <div className="flex items-center justify-between py-2">
                              <span className="text-[10px] font-black uppercase text-muted-foreground">Avg. Reward Rate</span>
                              <span className="text-[10px] font-bold">1.2 / interaction</span>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Main Leaderboard */}
               <Card className="lg:col-span-2 border-primary/10 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                     <div>
                        <CardTitle className="text-lg font-bold">CSAT Champions - Q1</CardTitle>
                        <CardDescription className="text-xs">Top performing agents by customer satisfaction</CardDescription>
                     </div>
                     <Select defaultValue="this-month">
                        <SelectTrigger className="w-35 h-8 text-xs">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="today">Today</SelectItem>
                           <SelectItem value="this-week">This Week</SelectItem>
                           <SelectItem value="this-month">This Month</SelectItem>
                        </SelectContent>
                     </Select>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-1 mt-4">
                        {workforceAgents.sort((a, b) => b.gamification.points - a.gamification.points).map((agent, index) => (
                           <div key={agent.id} className={cn(
                              "flex items-center justify-between p-3 rounded-xl border transition-all hover:bg-muted/50",
                              index === 0 ? "bg-yellow-500/5 border-yellow-500/20" : "bg-card border-transparent"
                           )}>
                              <div className="flex items-center gap-4">
                                 <span className={cn(
                                    "w-8 text-center font-black italic text-lg",
                                    index === 0 ? "text-yellow-500 scale-125" :
                                       index === 1 ? "text-slate-400" :
                                          index === 2 ? "text-amber-600" : "text-muted-foreground"
                                 )}>
                                    #{index + 1}
                                 </span>
                                 <div className="flex items-center gap-3">
                                    <div className="relative">
                                       <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-black text-xs">
                                          {agent.fullName.split(" ").map(n => n[0]).join("")}
                                       </div>
                                       {index === 0 && <Flame className="h-4 w-4 text-orange-500 absolute -top-1 -right-1 fill-orange-500 animate-pulse" />}
                                    </div>
                                    <div>
                                       <p className="text-sm font-bold">{agent.fullName}</p>
                                       <p className="text-[10px] text-muted-foreground uppercase font-medium">{agent.team}</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-sm font-black text-primary">{agent.gamification.points.toLocaleString()}</p>
                                 <p className="text-[10px] text-muted-foreground font-bold italic">Points</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               {/* Leaderboard Config */}
               <div className="space-y-6">
                  <Card className="border-primary/10 shadow-md">
                     <CardHeader>
                        <CardTitle className="text-sm font-bold">New Leaderboard</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label className="text-xs font-bold">Leaderboard Title</Label>
                           <Input placeholder="e.g. Support Rockstars" className="h-9 text-sm" />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold">Primary Metric</Label>
                           <Select defaultValue="csat">
                              <SelectTrigger className="h-9 text-sm">
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="csat">CSAT Score</SelectItem>
                                 <SelectItem value="qa">QA Average</SelectItem>
                                 <SelectItem value="fcr">FCR Rate</SelectItem>
                                 <SelectItem value="aht">AHT (Inverted)</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2 pt-2">
                           <div className="flex items-center justify-between">
                              <Label className="text-xs font-bold">Visible to Agents</Label>
                              <Switch defaultChecked />
                           </div>
                           <div className="flex items-center justify-between">
                              <Label className="text-xs font-bold">Show Rank Only</Label>
                              <Switch />
                           </div>
                        </div>
                        <Button className="w-full font-bold shadow-md bg-secondary text-primary hover:bg-secondary/80">
                           Create Board
                        </Button>
                     </CardContent>
                  </Card>

                  <Card className="border-primary/10 bg-linear-to-br from-indigo-500/5 to-purple-500/5 shadow-inner">
                     <CardContent className="p-6 text-center space-y-4">
                        <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                           <Trophy className="h-8 w-8 text-indigo-500 fill-indigo-500/20" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-sm font-black">Top Performer Reward</p>
                           <p className="text-xs text-muted-foreground">Current prize for monthly #1</p>
                        </div>
                        <Badge className="bg-indigo-500 hover:bg-indigo-500 text-white font-black px-6 py-1">
                           $50 AMAZON GIFT CARD
                        </Badge>
                     </CardContent>
                  </Card>
               </div>
            </div>
         )}
      </div>
   );
}
