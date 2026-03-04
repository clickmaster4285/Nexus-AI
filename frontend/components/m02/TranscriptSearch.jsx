"use client";

import { useState } from "react";
import {
   Search,
   Calendar as CalendarIcon,
   Clock,
   Download,
   MoreVertical,
   ExternalLink,
   TrendingUp,
   TrendingDown,
   Minus
} from "lucide-react";
import { Card, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockTranscripts } from "@/lib/mock-data/transcripts";

export default function TranscriptSearch() {
   const [searchTerm, setSearchTerm] = useState("");
   const [speakerFilter, setSpeakerFilter] = useState("both");
   const [results, setResults] = useState(mockTranscripts);
   const [isSearching, setIsSearching] = useState(false);

   const handleSearch = (e) => {
      e.preventDefault();
      setIsSearching(true);
      // Simulate API delay
      setTimeout(() => {
         const q = searchTerm.toLowerCase();
         const filtered = mockTranscripts.filter(t =>
            t.summary.primaryReason.toLowerCase().includes(q) ||
            t.segments.some(s => s.text.toLowerCase().includes(q))
         );
         setResults(filtered);
         setIsSearching(false);
      }, 500);
   };

   const sentimentIcon = (score) => {
      if (score >= 70) return <TrendingUp className="h-4 w-4 text-green-500" />;
      if (score <= 40) return <TrendingDown className="h-4 w-4 text-red-500" />;
      return <Minus className="h-4 w-4 text-yellow-500" />;
   };

   return (
      <div className="space-y-6">
         {/* Search Bar & Filters */}
         <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-3 space-y-4">
               <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                     <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input
                        placeholder="Boolean search (e.g., 'billing AND refund NOT complaint')..."
                        className="pl-10 h-10 bg-background"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
                  <Button type="submit" className="px-6" disabled={isSearching}>
                     {isSearching ? "Searching..." : "Search"}
                  </Button>
                  <Button variant="outline" className="gap-2">
                     <Download className="h-4 w-4" />
                     Export Results
                  </Button>
               </form>

               <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div className="space-y-1.5">
                     <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date Range</Label>
                     <Button variant="outline" size="sm" className="w-full justify-start text-left font-normal h-9">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Last 7 Days</span>
                     </Button>
                  </div>

                  <div className="space-y-1.5">
                     <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Speaker</Label>
                     <Select value={speakerFilter} onValueChange={setSpeakerFilter}>
                        <SelectTrigger className="h-9">
                           <SelectValue placeholder="Select speaker" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="both">Both</SelectItem>
                           <SelectItem value="agent">Agent Only</SelectItem>
                           <SelectItem value="customer">Customer Only</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="space-y-1.5">
                     <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sentiment</Label>
                     <Select defaultValue="all">
                        <SelectTrigger className="h-9">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Sentiments</SelectItem>
                           <SelectItem value="positive">Positive Only</SelectItem>
                           <SelectItem value="neutral">Neutral Only</SelectItem>
                           <SelectItem value="negative">Negative Only</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="space-y-1.5">
                     <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Min Duration</Label>
                     <div className="relative">
                        <Clock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                        <Input placeholder="Secs" className="pl-8 h-9" type="number" />
                     </div>
                  </div>

                  <div className="space-y-1.5">
                     <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Agent</Label>
                     <Select defaultValue="all">
                        <SelectTrigger className="h-9">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Agents</SelectItem>
                           <SelectItem value="a001">Sarah Jenkins</SelectItem>
                           <SelectItem value="a002">Mike Ross</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="space-y-1.5">
                     <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Queue</Label>
                     <Select defaultValue="all">
                        <SelectTrigger className="h-9">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Queues</SelectItem>
                           <SelectItem value="support">Support</SelectItem>
                           <SelectItem value="sales">Sales</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Results List */}
         <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
               <span>Found {results.length} matches</span>
               <div className="flex gap-2">
                  <span className="flex items-center gap-1"><Badge variant="outline" className="bg-background">AND</Badge> Intersect</span>
                  <span className="flex items-center gap-1"><Badge variant="outline" className="bg-background">OR</Badge> Union</span>
               </div>
            </div>

            {results.map((result) => (
               <Card key={result.id} className="group hover:border-primary/50 transition-colors bg-card/50">
                  <CardContent className="p-4">
                     <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                           <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                 #{result.callId}
                              </div>
                              <div>
                                 <h4 className="font-semibold text-sm flex items-center gap-2">
                                    {result.summary.primaryReason}
                                    <Badge variant="secondary" className="text-[10px] h-4">
                                       {result.language}
                                    </Badge>
                                 </h4>
                                 <div className="flex items-center gap-4 text-xs text-muted-foreground mt-0.5">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {Math.floor(result.duration / 60)}:{(result.duration % 60).toString().padStart(2, '0')}</span>
                                    <span>Agent: {result.agentId}</span>
                                    <span>Customer: {result.customerId}</span>
                                 </div>
                              </div>
                           </div>

                           {/* Snippet Matching Search */}
                           <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
                              <div className="flex items-center justify-between mb-1.5">
                                 <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter italic">Matching Context</span>
                                 <Badge variant="outline" className="text-[9px] h-3 px-1">{result.segments[1]?.speaker || 'Customer'}</Badge>
                              </div>
                              <p className="text-xs leading-relaxed text-muted-foreground italic">
                                 &quot;... {searchTerm ? result.segments.find(s => s.text.toLowerCase().includes(searchTerm.toLowerCase()))?.text || result.segments[1].text : result.segments[1].text} ...&quot;
                              </p>
                           </div>
                        </div>

                        <div className="flex flex-col items-end gap-3 shrink-0">
                           <div className="flex items-center gap-2">
                              <div className="text-right">
                                 <div className="text-[10px] text-muted-foreground uppercase font-bold">Sentiment</div>
                                 <div className="flex items-center gap-1 justify-end">
                                    {sentimentIcon(result.sentiment)}
                                    <span className="text-sm font-bold">{result.sentiment}%</span>
                                 </div>
                              </div>
                           </div>

                           <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <ExternalLink className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                       <MoreVertical className="h-4 w-4" />
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Full Transcript</DropdownMenuItem>
                                    <DropdownMenuItem>Listen to Audio</DropdownMenuItem>
                                    <DropdownMenuItem>Push to CRM</DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}

            {results.length === 0 && (
               <div className="text-center py-12 bg-muted/20 rounded-xl border-2 border-dashed border-border">
                  <Search className="h-10 w-10 mx-auto text-muted-foreground opacity-20 mb-3" />
                  <h3 className="font-semibold text-muted-foreground">No matches found</h3>
                  <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto mt-1">
                     Try adjusting your boolean query or changing filters to find specific transcripts.
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
