"use client";

import { useState } from "react";
import {
   Play,
   Pause,
   SkipBack,
   SkipForward,
   CheckCircle2,
   XCircle,
   AlertCircle,
   MessageSquare,
   Link as LinkIcon,
   ShieldAlert,
   Save,
   Send,
   Flag,
   ChevronRight,
   TrendingRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function EvaluationReview({ evaluation }) {
   const [overrideScores, setOverrideScores] = useState({});
   const [note, setNote] = useState("");

   if (!evaluation) return null;

   return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[700px]">
         {/* Left Column: Call Player & Info (Side-by-side 3.2.1) */}
         <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="flex flex-col flex-1 shadow-lg border-primary/20">
               <CardHeader className="pb-4 border-b bg-muted/30">
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                           <Play className="h-5 w-5 text-primary" />
                           Call Interaction Review
                        </CardTitle>
                        <CardDescription className="text-xs">ID: {evaluation.callId} • Agent: {evaluation.agentId}</CardDescription>
                     </div>
                     <Button variant="outline" size="icon-xs" title="View Transcript">
                        <LinkIcon className="h-3 w-3" />
                     </Button>
                  </div>
               </CardHeader>
               <CardContent className="flex-1 flex flex-col p-6 space-y-6">
                  {/* Call Player Mock */}
                  <div className="aspect-video bg-black rounded-xl relative group overflow-hidden border-2 border-primary/10 shadow-inner">
                     <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 to-transparent" />

                     {/* Waveform Visualization Mock */}
                     <div className="absolute bottom-4 inset-x-4 h-16 flex items-end gap-0.5">
                        {Array.from({ length: 40 }).map((_, i) => (
                           <div
                              key={i}
                              className="flex-1 bg-primary/40 rounded-t-sm transition-all duration-300 group-hover:bg-primary/80"
                              style={{ height: `${Math.random() * 100}%` }}
                           />
                        ))}
                     </div>

                     <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="ghost" className="h-16 w-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white group-hover:scale-110 transition-transform">
                           <Play className="h-8 w-8 fill-current" />
                        </Button>
                     </div>

                     <div className="absolute top-4 right-4 space-y-2">
                        <Badge className="bg-red-500/80 backdrop-blur-sm border-none">04:22 PM</Badge>
                        <Badge variant="outline" className="bg-black/50 backdrop-blur-sm block">12:34</Badge>
                     </div>
                  </div>

                  {/* AI Insights (Highlighted Clips) */}
                  <div className="space-y-3">
                     <Label className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" />
                        Key Evaluation Clips
                     </Label>
                     <div className="space-y-2">
                        {[
                           { time: "01:22", type: "greeting", text: "Professional Opening Detection" },
                           { time: "05:45", type: "compliance", text: "Privacy Disclosure Verification" },
                           { time: "08:12", type: "sentiment", text: "Customer High Frustration Signal" }
                        ].map((clip, i) => (
                           <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border cursor-pointer transition-all">
                              <div className="flex items-center gap-3">
                                 <span className="font-mono text-[10px] text-primary">{clip.time}</span>
                                 <span className="text-xs font-medium">{clip.text}</span>
                              </div>
                              <ChevronRight className="h-3 w-3 text-muted-foreground" />
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="mt-auto space-y-4 pt-6 border-t">
                     <div className="flex items-center justify-between">
                        <div className="space-y-1">
                           <Label className="text-[10px] text-muted-foreground uppercase font-bold">AI Consistency Score</Label>
                           <div className="text-2xl font-bold font-mono">92.4%</div>
                        </div>
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                           <div className="h-full bg-primary" style={{ width: '92%' }} />
                        </div>
                     </div>
                     <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        AI Confidence: High. Detected all 8 required criteria with 94% average transcription confidence.
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Right Column: Evaluation Form (3.2.1) */}
         <div className="lg:col-span-7 space-y-6 overflow-y-auto">
            <Card className="shadow-lg">
               <CardHeader className="pb-3 border-b bg-primary/5">
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <CardTitle className="text-lg">Manual Calibration</CardTitle>
                        <CardDescription className="text-xs">Form: General Support Evaluation v2.1</CardDescription>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] text-muted-foreground uppercase font-bold">Current Score</div>
                        <div className={cn(
                           "text-3xl font-bold font-mono",
                           evaluation.score > 80 ? "text-green-500" : "text-amber-500"
                        )}>
                           {evaluation.score}%
                        </div>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <Table>
                     <TableHeader className="bg-muted/50">
                        <TableRow>
                           <TableHead className="w-10"></TableHead>
                           <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Evaluation Criteria</TableHead>
                           <TableHead className="text-[10px] uppercase font-bold h-10 px-4">AI Result</TableHead>
                           <TableHead className="text-[10px] uppercase font-bold h-10 px-4 text-right">Human Override</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {Object.entries(evaluation.scores).map(([key, val], i) => (
                           <TableRow key={key} className="group hover:bg-muted/20">
                              <TableCell className="px-4 py-3">
                                 {val === true || val >= 7 ?
                                    <CheckCircle2 className="h-4 w-4 text-green-500" /> :
                                    <XCircle className="h-4 w-4 text-red-500" />
                                 }
                              </TableCell>
                              <TableCell className="px-4 py-3">
                                 <div className="space-y-0.5 text-xs font-medium">
                                    Criteria item #{i + 1}
                                    <p className="text-[10px] text-muted-foreground font-normal">Section: Adherence</p>
                                 </div>
                              </TableCell>
                              <TableCell className="px-4 py-3">
                                 <Badge variant="secondary" className="font-mono text-[10px]">
                                    {typeof val === 'boolean' ? (val ? 'Pass' : 'Fail') : `${val}/10`}
                                 </Badge>
                              </TableCell>
                              <TableCell className="px-4 py-3 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                    {typeof val === 'boolean' ? (
                                       <div className="flex gap-1">
                                          <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-full">
                                             <CheckCircle2 className="h-3 w-3 text-green-500" />
                                          </Button>
                                          <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-full">
                                             <XCircle className="h-3 w-3 text-red-500" />
                                          </Button>
                                       </div>
                                    ) : (
                                       <Input className="h-7 w-12 text-right text-xs" defaultValue={val} />
                                    )}
                                 </div>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>

                  <div className="p-6 border-t bg-muted/10 space-y-4">
                     <div className="space-y-2">
                        <Label className="text-xs font-bold flex items-center gap-2">
                           <MessageSquare className="h-4 w-4 text-primary" />
                           Reviewer Notes & Feedback
                        </Label>
                        <Textarea
                           placeholder="Provide detailed feedback for the agent..."
                           className="bg-background min-h-[100px]"
                           value={note}
                           onChange={(e) => setNote(e.target.value)}
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-100 dark:border-amber-900/50 flex items-start gap-3">
                           <ShieldAlert className="h-4 w-4 text-amber-500 mt-1" />
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-amber-700 uppercase">Coaching Identified</p>
                              <p className="text-[10px] text-muted-foreground">AI suggests focus on: Tone of voice, Closing protocol.</p>
                           </div>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/50 flex items-start gap-3">
                           <Flag className="h-4 w-4 text-blue-500 mt-1" />
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-blue-700 uppercase">Policy Check</p>
                              <p className="text-[10px] text-muted-foreground">Standard dispute handling procedure followed.</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
                     <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                           <Save className="h-3.5 w-3.5" />
                           Save Draft
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 text-red-500 hover:text-red-600">
                           <Flag className="h-3.5 w-3.5" />
                           Dispute AI Score
                        </Button>
                     </div>
                     <Button size="sm" className="gap-2 bg-primary shadow-lg font-bold">
                        <Send className="h-3.5 w-3.5" />
                        Finalize & Share with Agent
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
