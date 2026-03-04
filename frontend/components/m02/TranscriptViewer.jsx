"use client";

import { useState, useRef } from "react";
import {
   Search,
   Download,
   Languages,
   Eye,
   EyeOff,
   Highlighter,
   MessageSquare,
   Clock,
   User,
   Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function TranscriptViewer({ transcript, onWordClick }) {
   const [searchTerm, setSearchTerm] = useState("");
   const [showSpeakerLabels, setShowSpeakerLabels] = useState(true);
   const [piiRedacted, setPiiRedacted] = useState(true);
   const [translation, setTranslation] = useState("Original (en-US)");
   const [annotations, setAnnotations] = useState([
      { startTime: 10, text: "Customer sounds frustrated here", color: "bg-red-500" },
      { startTime: 25, text: "Agent followed protocol", color: "bg-green-500" }
   ]);
   const [isAnnotating, setIsAnnotating] = useState(false);
   const [selectedText, setSelectedText] = useState("");
   const [annotationNote, setAnnotationNote] = useState("");

   const transcriptRef = useRef(null);

   const filteredSegments = transcript?.segments || [];

   const handleExport = (format) => {
      console.log(`Exporting as ${format}...`);
      alert(`Transcript exported as ${format.toUpperCase()}`);
   };

   const handleAddAnnotation = () => {
      if (selectedText) {
         setAnnotations([...annotations, {
            startTime: transcript.segments.find(s => s.text.includes(selectedText.split(" ")[0]))?.startTime || 0,
            text: annotationNote || "New Note",
            color: "bg-primary",
            content: selectedText
         }]);
         setIsAnnotating(false);
         setSelectedText("");
         setAnnotationNote("");
      }
   };

   const handleTextSelection = () => {
      const selection = window.getSelection().toString();
      if (selection && selection.trim().length > 0) {
         setSelectedText(selection);
      }
   };

   const redactPII = (text) => {
      if (!piiRedacted) return text;
      return text
         .replace(/\b\d{5}\b/g, "[ZIP CODE]")
         .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[EMAIL]")
         .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN]")
         .replace(/\bAC-\d{5}\b/g, "[ACCOUNT NUMBER]");
   };

   const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
   };

   return (
      <div className="flex flex-col h-full bg-card border rounded-xl shadow-sm relative overflow-hidden">
         {/* Header / Controls */}
         <div className="p-4 border-b bg-muted/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
               <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                     placeholder="Search transcript..."
                     className="pl-9 h-9"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <div className="flex items-center gap-2">
                  <Switch
                     id="speaker-labels"
                     checked={showSpeakerLabels}
                     onCheckedChange={setShowSpeakerLabels}
                  />
                  <Label htmlFor="speaker-labels" className="text-sm">Speakers</Label>
               </div>
               <div className="flex items-center gap-2">
                  <Switch
                     id="pii-redactor"
                     checked={piiRedacted}
                     onCheckedChange={setPiiRedacted}
                  />
                  <Label htmlFor="pii-redactor" className="text-sm flex items-center gap-1">
                     {piiRedacted ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                     PII Redaction
                  </Label>
               </div>
            </div>

            <div className="flex items-center gap-2">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" size="sm" className="gap-2">
                        <Languages className="h-4 w-4" />
                        {translation}
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem onClick={() => setTranslation("Original (en-US)")}>Original (en-US)</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setTranslation("Spanish")}>Spanish</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setTranslation("French")}>French</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setTranslation("German")}>German</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>

               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem onClick={() => handleExport("pdf")}>PDF Document</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleExport("docx")}>Word Document</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleExport("txt")}>Plain Text</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleExport("json")}>JSON (Full Data)</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleExport("srt")}>SRT Subtitles</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>

         {/* Transcript Content */}
         <div
            ref={transcriptRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
            onMouseUp={handleTextSelection}
         >
            {filteredSegments.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                  <MessageSquare className="h-12 w-12 mb-2" />
                  <p>No transcript segments found.</p>
               </div>
            ) : (
               filteredSegments.map((segment, idx) => (
                  <div
                     key={idx}
                     className={cn(
                        "group flex gap-4 transition-all duration-200 rounded-lg p-2 hover:bg-muted/50",
                        segment.confidence < 0.8 ? "bg-yellow-500/5" : ""
                     )}
                  >
                     <div className="flex flex-col items-center gap-1 pt-1">
                        <div className={cn(
                           "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                           segment.speaker === "agent" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                           {segment.speaker === "agent" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground font-medium">
                           {formatTime(segment.startTime)}
                        </span>
                     </div>

                     <div className="flex-1 space-y-1">
                        {showSpeakerLabels && (
                           <div className="flex items-center justify-between">
                              <span className={cn(
                                 "text-xs font-bold uppercase tracking-wider",
                                 segment.speaker === "agent" ? "text-primary" : "text-muted-foreground"
                              )}>
                                 {segment.speaker}
                              </span>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Button
                                    variant="ghost"
                                    size="icon-xs"
                                    title="Annotate"
                                    onClick={() => setIsAnnotating(true)}
                                    disabled={!selectedText}
                                 >
                                    <Highlighter className="h-3 w-3" />
                                 </Button>
                                 <Button variant="ghost" size="icon-xs" title="Comment">
                                    <MessageSquare className="h-3 w-3" />
                                 </Button>
                              </div>
                           </div>
                        )}

                        <p className={cn(
                           "text-sm leading-relaxed",
                           segment.confidence < 0.3 ? "bg-yellow-100 dark:bg-yellow-900/30 px-1 border-l-2 border-yellow-500" : ""
                        )}>
                           {segment.text.split(" ").map((word, wIdx) => {
                              const isMatch = searchTerm && word.toLowerCase().includes(searchTerm.toLowerCase());
                              const hasAnnotation = annotations.some(a => a.startTime === segment.startTime);

                              return (
                                 <span
                                    key={wIdx}
                                    className={cn(
                                       "cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors inline-block mr-1",
                                       isMatch ? "bg-yellow-400 dark:bg-yellow-600 text-black font-semibold" : "",
                                       hasAnnotation ? "underline decoration-primary decoration-2 underline-offset-4" : ""
                                    )}
                                    onClick={() => onWordClick && onWordClick(segment.startTime)}
                                 >
                                    {redactPII(word)}
                                 </span>
                              );
                           })}
                        </p>

                        {annotations.filter(a => a.startTime === segment.startTime).map((a, i) => (
                           <div key={i} className="mt-2 p-2 bg-primary/5 border border-primary/20 rounded text-[10px] flex items-start gap-2 animate-in fade-in slide-in-from-top-1 relative overflow-hidden">
                              <div className={cn("w-1 h-full absolute left-0 top-0", a.color)} />
                              <MessageSquare className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                              <div>
                                 <span className="font-bold">Note: </span>
                                 {a.text}
                              </div>
                           </div>
                        ))}

                        {segment.confidence < 0.8 && (
                           <div className="flex items-center gap-1 text-[10px] text-yellow-600 dark:text-yellow-400 font-medium italic mt-1">
                              <Clock className="h-3 w-3" />
                              Low confidence ({Math.round(segment.confidence * 100)}%)
                           </div>
                        )}
                     </div>
                  </div>
               ))
            )}
         </div>

         {/* Footer / Summary Info */}
         <div className="p-3 bg-muted/20 border-t flex items-center justify-between text-[11px] text-muted-foreground">
            <div className="flex items-center gap-4">
               <span>{transcript?.language || "N/A"}</span>
               <span>•</span>
               <span>{transcript?.duration ? formatTime(transcript.duration) : "0:00"}</span>
               <span>•</span>
               <span>{transcript?.segments?.length || 0} Segments</span>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-normal">
                  Confidence: {Math.round((transcript?.confidence || 0) * 100)}%
               </Badge>
            </div>
         </div>

         {/* Annotation Dialog */}
         <Dialog open={isAnnotating} onOpenChange={setIsAnnotating}>
            <DialogContent className="sm:max-w-md">
               <DialogHeader>
                  <DialogTitle>Add Annotation</DialogTitle>
               </DialogHeader>
               <div className="space-y-4 py-4">
                  <div className="p-3 bg-muted rounded-lg text-xs italic">
                     "{selectedText || "No text selected..."}"
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="annotation-note">Observation Note</Label>
                     <Textarea
                        id="annotation-note"
                        placeholder="Enter your observation or coaching tip..."
                        value={annotationNote}
                        onChange={(e) => setAnnotationNote(e.target.value)}
                     />
                  </div>
               </div>
               <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAnnotating(false)}>Cancel</Button>
                  <Button onClick={handleAddAnnotation} disabled={!selectedText}>Save Annotation</Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
}
