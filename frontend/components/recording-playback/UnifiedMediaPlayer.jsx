"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, BadgeCheck, Download, Share2,  Sparkles, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { recordings, mediaEvents } from "@/lib/mock-data/recording";
import { cn } from "@/lib/utils";

export default function UnifiedMediaPlayer() {
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(35);
   const selectedRec = recordings[0];

   return (
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-220px)] overflow-hidden">
         {/* Media & Visualization Deck */}
         <div className="xl:col-span-2 flex flex-col gap-6 min-h-0 overflow-hidden">
            <Card className="flex-1 border-primary/10 shadow-2xl bg-linear-to-br from-card via-background to-secondary/5 overflow-hidden flex flex-col relative">
               {/* AI Overlay Overlay */}
               <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-primary/90 text-primary-foreground border-none gap-1.5 font-black uppercase text-[9px] px-3 shadow-xl backdrop-blur-md">
                     <Sparkles className="h-3.5 w-3.5" /> AI Enhancement Active
                  </Badge>
               </div>

               <CardContent className="p-0 flex-1 flex flex-col items-center justify-center relative">
                  {/* Waveform Visualization Mockup */}
                  <div className="w-full px-12 space-y-8">
                     <div className="flex items-end justify-center gap-0.5 h-32">
                        {[...Array(60)].map((_, i) => (
                           <div
                              key={i}
                              className={cn(
                                 "w-1 rounded-full transition-all duration-300",
                                 i < 21 ? "bg-primary/40 h-8" :
                                    i === 21 ? "bg-red-500 h-24 animate-pulse shadow-red-500/20" :
                                       i < 40 ? "bg-primary/20 h-12" : "bg-muted h-6"
                              )}
                           />
                        ))}
                     </div>

                     {/* Metadata Display */}
                     <div className="text-center space-y-2">
                        <h3 className="text-xl font-black tracking-tight uppercase leading-none">{selectedRec.id}: {selectedRec.topic}</h3>
                        <p className="text-sm font-medium text-muted-foreground italic">Agent: {selectedRec.agent} • Customer: {selectedRec.customer}</p>
                     </div>
                  </div>

                  {/* Event Track Markers */}
                  <div className="absolute bottom-32 left-0 right-0 px-12">
                     <div className="h-1 w-full bg-muted/30 relative rounded-full">
                        {mediaEvents.map((evt, i) => (
                           <div
                              key={i}
                              className="absolute -top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background shadow-md cursor-pointer group"
                              style={{ left: `${(parseInt(evt.time.split(":")[0]) * 60 + parseInt(evt.time.split(":")[1])) / 900 * 100}%` }}
                           >
                              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] font-bold p-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-xl pointer-events-none z-50">
                                 <span className="text-primary">{evt.time}</span> • {evt.type}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </CardContent>

               {/* Player Controls Container */}
               <div className="p-8 border-t bg-card/80 backdrop-blur-md space-y-6">
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-mono text-muted-foreground font-bold uppercase tracking-widest">
                        <span>05:12</span>
                        <span>{selectedRec.duration}</span>
                     </div>
                     <Slider value={[progress]} max={100} step={1} className="py-2" onValueChange={(val) => setProgress(val[0])} />
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 opacity-60 hover:opacity-100 transition-all">
                           <SkipBack className="h-5 w-5" />
                        </Button>
                        <Button
                           size="icon"
                           className="h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
                           onClick={() => setIsPlaying(!isPlaying)}
                        >
                           {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 opacity-60 hover:opacity-100 transition-all">
                           <SkipForward className="h-5 w-5" />
                        </Button>
                     </div>

                     <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 w-32">
                           <Volume2 className="h-4 w-4 text-muted-foreground" />
                           <Slider defaultValue={[75]} max={100} step={1} className="flex-1" />
                        </div>
                        <div className="h-6 w-px bg-primary/10" />
                        <Button variant="ghost" size="icon" className="h-10 w-10">
                           <Share2 className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10">
                           <Maximize2 className="h-5 w-5" />
                        </Button>
                     </div>
                  </div>
               </div>
            </Card>
         </div>

         {/* Intelligence Sidebar */}
         <div className="space-y-6 overflow-y-auto pr-2">
            {/* Interaction Events Card */}
            <Card className="border-primary/10 shadow-md">
               <CardHeader className="p-4 bg-primary/5 border-b">
                  <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                     <Zap className="h-4 w-4 text-primary" /> Key Interaction Events
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-primary/5">
                     {mediaEvents.map((evt, idx) => (
                        <div key={idx} className="p-4 hover:bg-muted/50 transition-colors flex gap-4 cursor-pointer group">
                           <span className="text-[10px] font-mono font-black text-primary pt-0.5">{evt.time}</span>
                           <div className="space-y-1">
                              <p className="text-xs font-black uppercase tracking-tight group-hover:text-primary transition-colors">{evt.type}</p>
                              <p className="text-[10px] text-muted-foreground leading-relaxed italic">{evt.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            {/* AI Sentiment Analysis Card */}
            <Card className="border-primary/10 shadow-lg bg-linear-to-b from-card to-secondary/5">
               <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                     <TrendingUp className="h-4 w-4 text-primary" /> Sentiment Intensity
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 pt-4 space-y-6">
                  <div className="space-y-4">
                     <div>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                           <span>Customer Anxiety</span>
                           <span className="text-red-500">72% Peak</span>
                        </div>
                        <Progress value={72} className="h-1.5 bg-muted" />
                     </div>
                     <div>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                           <span>Agent Empathy</span>
                           <span className="text-green-500">88% Avg</span>
                        </div>
                        <Progress value={88} className="h-1.5 bg-muted" />
                     </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
                     <div className="flex items-center gap-2 mb-1">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        <p className="text-[11px] font-black uppercase tracking-tighter">AI Insight</p>
                     </div>
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        Critical sentiment drop occurred at <span className="font-black text-primary">02:15</span> when billing fees were discussed. Empathy signals from agent helped stabilize session by 05:40.
                     </p>
                  </div>

                  <Button size="sm" className="w-full h-10 gap-2 font-black uppercase text-[10px] shadow-lg">
                     <Download className="h-3.5 w-3.5" /> Export Insights Report
                  </Button>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
