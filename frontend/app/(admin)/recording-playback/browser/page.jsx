"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Download, Play, ShieldAlert, Calendar, User, Clock, HardDrive, Tag, FileText, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { recordings } from "@/lib/mock-data/recording";
import { cn } from "@/lib/utils";

export default function RecordingBrowser() {
   const router = useRouter();
   const [searchTerm, setSearchTerm] = useState("");

   const filteredRecordings = recordings.filter(rec =>
      rec.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.topic.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const handleRowClick = (id) => {
      router.push(`/recording-playback/player?id=${id}`);
   };

   return (
      <div className="space-y-6">
         {/* Search and Filters */}
         <Card className="border-primary/10 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-wrap gap-4 items-center">
               <div className="relative flex-1 min-w-75">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                     placeholder="Search by Agent, Customer, Topic or ID..."
                     className="pl-10 h-10 bg-background border-primary/5 text-sm font-medium"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-10 px-4 border-primary/10 text-[10px] font-black uppercase">
                     <Calendar className="h-3.5 w-3.5 mr-2" /> Date Range
                  </Button>
                  <Button variant="outline" size="sm" className="h-10 px-4 border-primary/10 text-[10px] font-black uppercase">
                     <Filter className="h-3.5 w-3.5 mr-2" /> More Filters
                  </Button>
                  <Button className="h-10 px-6 shadow-lg text-[10px] font-black uppercase">
                     Search Recordings
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Results Table */}
         <div className="border border-primary/10 rounded-2xl overflow-hidden bg-card shadow-xl">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-primary/5 border-b border-primary/10">
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Interaction</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Details</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Sentiment</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Retention</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Size</th>
                     <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-primary/5">
                  {filteredRecordings.map((rec) => (
                     <tr 
                        key={rec.id} 
                        className="hover:bg-primary/5 transition-colors group cursor-pointer"
                        onClick={() => handleRowClick(rec.id)}
                     >
                        <td className="p-4">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                 <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                 <p className="text-sm font-black tracking-tight">{rec.id}</p>
                                 <p className="text-[10px] text-muted-foreground font-medium">{rec.dateTime}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="space-y-1">
                              <p className="text-xs font-bold text-foreground flex items-center gap-2">
                                 <User className="h-3 w-3 opacity-40" /> {rec.agent}
                                 <ChevronRight className="h-3 w-3 opacity-20" />
                                 <span className="opacity-60">{rec.customer}</span>
                              </p>
                              <div className="flex items-center gap-2">
                                 <Badge variant="secondary" className="text-[8px] font-black uppercase py-0 px-1">{rec.topic}</Badge>
                                 <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {rec.duration}</span>
                              </div>
                           </div>
                        </td>
                        <td className="p-4 text-center">
                           <Badge variant="outline" className={cn(
                              "text-[8px] font-black uppercase py-0 px-2 border-none",
                              rec.sentiment === "Positive" ? "bg-green-500/10 text-green-600" :
                                 rec.sentiment === "Negative" ? "bg-red-500/10 text-red-600" : "bg-blue-500/10 text-blue-600"
                           )}>
                              {rec.sentiment}
                           </Badge>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2">
                              <HardDrive className="h-3.5 w-3.5 text-muted-foreground opacity-40" />
                              <div>
                                 <p className="text-[10px] font-black uppercase leading-none">{rec.status}</p>
                                 <p className="text-[9px] text-muted-foreground font-medium">{rec.retention}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-4">
                           <span className="text-[10px] font-mono text-muted-foreground">{rec.fileSize}</span>
                        </td>
                        <td className="p-4 text-right">
                           <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {rec.flagged && <ShieldAlert className="h-4 w-4 text-red-500 mr-2" />}
                              <Button 
                                 variant="ghost" 
                                 size="icon" 
                                 className="h-8 w-8 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    handleRowClick(rec.id);
                                 }}
                              >
                                 <Play className="h-4 w-4 fill-current" />
                              </Button>
                              <Button 
                                 variant="ghost" 
                                 size="icon" 
                                 className="h-8 w-8 rounded-lg"
                                 onClick={(e) => e.stopPropagation()}
                              >
                                 <Download className="h-4 w-4" />
                              </Button>
                              <Button 
                                 variant="ghost" 
                                 size="icon" 
                                 className="h-8 w-8 rounded-lg"
                                 onClick={(e) => e.stopPropagation()}
                              >
                                 <Tag className="h-4 w-4" />
                              </Button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
