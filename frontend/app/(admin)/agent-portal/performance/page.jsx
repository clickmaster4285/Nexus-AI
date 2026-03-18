"use client";

import { Award, Zap, Smile, CheckCircle2, Trophy, Flame, Target, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { badges, leaderboard } from "@/lib/mock-data/agent";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function PerformanceGamification() {
   const badgeIcons = {
      Zap: Zap,
      Smile: Smile,
      CheckCircle2: CheckCircle2,
      Award: Award
   };

   return (
      <div className="space-y-8 animate-in fade-in duration-500">
         {/* Player Profile & Progress */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-primary/10 shadow-2xl relative overflow-hidden bg-linear-to-br from-card to-background">
               <div className="absolute top-40 right-0 p-12 opacity-90">
                  <Trophy className="h-40 w-40 text-primary" />
               </div>
               <CardContent className="p-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="relative">
                     <div className="h-32 w-32 rounded-3xl bg-primary/5 border-2 border-primary/20 flex items-center justify-center rotate-[5deg] group hover:rotate-0 transition-transform duration-500">
                        <Avatar className="h-28 w-28 rounded-2xl border-2 border-background shadow-2xl transition-all">
                           <AvatarFallback className="bg-primary text-white text-3xl font-black">DK</AvatarFallback>
                        </Avatar>
                     </div>
                     <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center border border-primary/5">
                        <Flame className="h-6 w-6 text-orange-500" />
                     </div>
                  </div>

                  <div className="flex-1 space-y-6 text-center md:text-left">
                     <div>
                        <h2 className="text-3xl font-black tracking-tighter uppercase italic">David Kim</h2>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1">
                           <Badge className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3">Elite Tier (Lvl 42)</Badge>
                           <Badge variant="outline" className="border-primary/20 text-[9px] font-black uppercase tracking-widest px-3 italic text-primary">Department: Enterprise Support</Badge>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex justify-between items-end">
                           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Progression to Level 43</p>
                           <p className="text-xs font-black italic">8,450 / 10,000 XP</p>
                        </div>
                        <Progress value={84.5} className="h-2 bg-primary/5 shadow-inner" indicatorClassName="bg-linear-to-r from-primary to-blue-500" />
                     </div>

                     <div className="flex flex-wrap gap-4 pt-4">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Global Rank</span>
                           <span className="text-xl font-black tracking-tighter italic text-primary">#14 / 2.5k</span>
                        </div>
                        <div className="w-px h-10 bg-primary/10" />
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total XP</span>
                           <span className="text-xl font-black tracking-tighter italic text-primary">248,500</span>
                        </div>
                        <div className="w-px h-10 bg-primary/10" />
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Claimable Points</span>
                           <span className="text-xl font-black tracking-tighter italic text-blue-600">12,400</span>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Current Bonuses */}
            <Card className="lg:col-span-1 border-primary/10 shadow-lg flex flex-col">
               <CardHeader className="p-6 bg-primary/5 border-b">
                  <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                     Active Multipliers
                     <Zap className="h-4 w-4 text-primary animate-pulse" />
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 flex-1 flex flex-col justify-center space-y-6">
                  <div className="p-5 rounded-3xl bg-linear-to-br from-primary/10 to-transparent border border-primary/10 text-center space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">Morning Flash Sale</p>
                     <p className="text-2xl font-black tracking-tighter">2.5x Points</p>
                     <p className="text-[9px] text-muted-foreground font-medium italic uppercase tracking-widest underline underline-offset-4 decoration-primary/30">Ending in 14m 20s</p>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Upcoming Milestones</p>
                     {[
                        { label: "QA Streak (5/5)", reward: "500 XP", progress: 100 },
                        { label: "Upsell Master", reward: "1,200 XP", progress: 65 },
                     ].map((m, i) => (
                        <div key={i} className="space-y-2 cursor-pointer group" onClick={() => toast.info(`Milestone: ${m.label} - Reward: ${m.reward}`)}>
                           <div className="flex justify-between text-[9px] font-black uppercase italic group-hover:text-primary transition-colors">
                              <span>{m.label}</span>
                              <span className="text-primary">{m.reward}</span>
                           </div>
                           <Progress value={m.progress} className="h-1 bg-primary/5" />
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Achievements / Badge Ribbon */}
            <div className="space-y-6">
               <div className="px-2 flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground italic flex items-center gap-2">
                     <Award className="h-4 w-4" /> Earned Accolades
                  </h3>
                  <Button variant="link" className="text-[10px] font-black uppercase text-primary" onClick={() => toast("Opening full badge collection...")}>View Collection</Button>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  {badges.map((badge) => {
                     const Icon = badgeIcons[badge.icon];
                     return (
                        <Card 
                           key={badge.id} 
                           className="border-primary/5 shadow-md hover:border-primary/20 transition-all group overflow-hidden bg-card/50 backdrop-blur-sm cursor-pointer"
                           onClick={() => toast.success(`Viewing details for: ${badge.name}`)}
                        >
                           <CardContent className="p-6 flex items-center gap-4">
                              <div className={cn("p-3 rounded-2xl bg-primary/5 shadow-inner transition-transform group-hover:scale-110 duration-500", badge.color)}>
                                 <Icon className="h-6 w-6" />
                              </div>
                              <div>
                                 <p className="text-xs font-black tracking-tight">{badge.name}</p>
                                 <p className="text-[9px] font-medium text-muted-foreground italic uppercase">Awarded {badge.date}</p>
                              </div>
                           </CardContent>
                        </Card>
                     );
                  })}
               </div>
            </div>

            {/* Peer Leaderboard */}
            <div className="space-y-6">
               <div className="px-2">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground italic flex items-center gap-2">
                     <Target className="h-4 w-4" /> Department Rankings
                  </h3>
               </div>

               <Card className="border-primary/10 shadow-xl overflow-hidden bg-white/5 backdrop-blur-sm">
                  <CardContent className="p-0">
                     <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                           <thead>
                              <tr className="bg-primary/5 border-b border-primary/10">
                                 <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center w-16">Rank</th>
                                 <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Player</th>
                                 <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right pr-6">Vault Balance</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-primary/5">
                              {leaderboard.map((player) => (
                                 <tr 
                                    key={player.rank} 
                                    className={cn(
                                       "hover:bg-primary/5 transition-colors group cursor-pointer",
                                       player.isMe ? "bg-primary/10" : ""
                                    )}
                                    onClick={() => toast.info(`Viewing profile: ${player.name} (Rank #${player.rank})`)}
                                 >
                                    <td className="p-4 text-center">
                                       <span className={cn(
                                          "text-sm font-black italic",
                                          player.rank === 1 ? "text-amber-500" : player.rank === 2 ? "text-slate-400" : player.rank === 3 ? "text-amber-700" : "text-muted-foreground"
                                       )}>
                                          #{player.rank}
                                       </span>
                                    </td>
                                    <td className="p-4">
                                       <div className="flex items-center gap-3">
                                          <Avatar className="h-8 w-8 border border-primary/10 shadow-sm">
                                             <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-black">{player.avatar}</AvatarFallback>
                                          </Avatar>
                                          <div>
                                             <p className="text-sm font-black tracking-tight">{player.name}</p>
                                             {player.isMe && <Badge className="bg-primary text-white text-[7px] px-1 py-0 border-none font-black uppercase h-3">YOU</Badge>}
                                          </div>
                                       </div>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                       <div className="flex items-center justify-end gap-2 text-primary font-black italic tracking-tight">
                                          {player.points.toLocaleString()} <ChevronUp className="h-3 w-3 text-green-500" />
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
