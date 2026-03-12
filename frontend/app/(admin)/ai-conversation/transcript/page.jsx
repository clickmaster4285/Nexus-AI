"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  Bot,
  Sparkles,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Zap,
  Quote,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  PanelRightClose,
  PanelRightOpen,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { mockTranscripts, getTranscriptByCallId } from "@/lib/mock-data/transcripts";
import InsightsPanel from "./InsightsPanel";

function TranscriptContent() {
  const searchParams = useSearchParams();
  const callId = searchParams.get("callId");
  
  const [transcript, setTranscript] = useState(mockTranscripts[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSpeakerLabels, setShowSpeakerLabels] = useState(true);
  const [piiRedacted, setPiiRedacted] = useState(true);
  const [translation, setTranslation] = useState("Original (en-US)");
  const [showIntelligence, setShowIntelligence] = useState(true);
  
  const [annotations, setAnnotations] = useState([
    { startTime: 10, text: "Customer sounds frustrated here", color: "bg-red-500" },
    { startTime: 25, text: "Agent followed protocol", color: "bg-green-500" }
  ]);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [annotationNote, setAnnotationNote] = useState("");

  const transcriptRef = useRef(null);

  useEffect(() => {
    if (callId) {
      const found = getTranscriptByCallId(callId);
      if (found) setTranscript(found);
    }
  }, [callId]);

  const filteredSegments = transcript?.segments || [];

  const handleExport = (format) => {
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
    <div className="flex h-[calc(100vh-200px)] gap-4 animate-in fade-in duration-700">
      {/* Main Transcript View */}
      <div className={cn(
        "flex flex-col flex-1 bg-card border rounded-2xl shadow-2xl relative overflow-hidden transition-all duration-500",
        showIntelligence ? "lg:mr-0" : ""
      )}>
        {/* Header Controls */}
        <div className="p-4 border-b bg-muted/20 backdrop-blur-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-primary opacity-40" />
              <Input
                placeholder="Search dialogue..."
                className="pl-10 h-10 bg-background/50 border-primary/5 focus-visible:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 border-l pl-4">
               <div className="flex items-center gap-2">
                 <Switch id="speaker-labels" checked={showSpeakerLabels} onCheckedChange={setShowSpeakerLabels} />
                 <Label htmlFor="speaker-labels" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Speakers</Label>
               </div>
               <div className="flex items-center gap-2">
                 <Switch id="pii-redactor" checked={piiRedacted} onCheckedChange={setPiiRedacted} />
                 <Label htmlFor="pii-redactor" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                   {piiRedacted ? <EyeOff className="h-3 w-3 text-red-500" /> : <Eye className="h-3 w-3 text-green-500" />}
                   Redaction
                 </Label>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
               variant="outline" 
               size="sm" 
               onClick={() => setShowIntelligence(!showIntelligence)}
               className={cn(
                  "h-10 text-[10px] font-black uppercase tracking-widest gap-2 transition-all",
                  showIntelligence ? "bg-primary/10 text-primary border-primary/20" : ""
               )}
            >
               <Sparkles className="h-4 w-4" />
               AI Intelligence {showIntelligence ? <PanelRightClose className="h-3 w-3" /> : <PanelRightOpen className="h-3 w-3" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 text-[10px] font-black uppercase tracking-widest gap-2">
                  <Languages className="h-4 w-4" />
                  {translation}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {["Original (en-US)", "Spanish", "French", "German"].map(lang => (
                  <DropdownMenuItem key={lang} onClick={() => setTranslation(lang)} className="text-[10px] font-bold uppercase tracking-tight">
                     {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 px-4 shadow-sm">
               <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* Dialogue Flow */}
        <div
          ref={transcriptRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 scroll-smooth bg-linear-to-b from-transparent to-muted/5"
          onMouseUp={handleTextSelection}
        >
          {filteredSegments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-20 italic">
              <MessageSquare className="h-16 w-16 mb-4" />
              <p className="text-xl font-black uppercase tracking-widest">No dialogue streams</p>
            </div>
          ) : (
            filteredSegments.map((segment, idx) => (
              <div
                key={idx}
                className={cn(
                  "group flex gap-3 transition-all duration-300 rounded-2xl p-2 border border-transparent",
                  segment.speaker === "agent" ? "hover:border-primary/10 hover:bg-primary/2" : "hover:border-muted-foreground/10 hover:bg-muted/30",
                  segment.confidence < 0.8 ? "bg-amber-500/5" : ""
                )}
              >
                <div className="flex flex-col items-center gap-2 pt-1">
                  <div className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110",
                    segment.speaker === "agent" ? "bg-primary text-white" : "bg-muted text-muted-foreground border"
                  )}>
                    {segment.speaker === "agent" ? <Bot className="h-6 w-6" /> : <User className="h-6 w-6" />}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground font-black opacity-40 uppercase">
                    {formatTime(segment.startTime)}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  {showSpeakerLabels && (
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-[0.2em]",
                        segment.speaker === "agent" ? "text-primary" : "text-muted-foreground/60"
                      )}>
                        {segment.speaker} Interaction
                      </span>
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-lg hover:bg-primary hover:text-white"
                          onClick={() => setIsAnnotating(true)}
                          disabled={!selectedText}
                        >
                          <Highlighter className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                          <Quote className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <p className={cn(
                    "text-[13px] leading-relaxed font-medium tracking-tight",
                    segment.speaker === "agent" ? "text-foreground" : "text-foreground/80 italic",
                    segment.confidence < 0.3 ? "bg-amber-500/10 px-2 py-1 border-l-4 border-amber-500 rounded" : ""
                  )}>
                    {segment.text.split(" ").map((word, wIdx) => {
                      const isMatch = searchTerm && word.toLowerCase().includes(searchTerm.toLowerCase());
                      const hasAnnotation = annotations.some(a => a.startTime === segment.startTime);

                      return (
                        <span
                          key={wIdx}
                          className={cn(
                            "cursor-pointer transition-all duration-150 inline-block mr-1.5 rounded px-0.5",
                            isMatch ? "bg-primary text-white font-black scale-110 shadow-lg" : "hover:bg-primary/10 hover:text-primary",
                            hasAnnotation ? "underline decoration-primary decoration-4 underline-offset-4" : ""
                          )}
                        >
                          {redactPII(word)}
                        </span>
                      );
                    })}
                  </p>

                  {annotations.filter(a => a.startTime === segment.startTime).map((a, i) => (
                    <div key={i} className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl text-[10px] flex items-start gap-3 animate-in slide-in-from-left-4 duration-500 relative overflow-hidden group/note">
                      <div className={cn("w-1.5 h-full absolute left-0 top-0", a.color)} />
                      <MessageSquare className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black uppercase tracking-widest text-primary block mb-1">Supervisor Observation:</span>
                        <p className="text-xs font-medium text-muted-foreground leading-relaxed">{a.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-muted/30 border-t flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="flex flex-col">
                 <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Confidence Index</span>
                 <div className="flex items-center gap-2">
                    <Progress value={(transcript?.confidence || 0) * 100} className="h-1.5 w-24" />
                    <span className="text-xs font-black">{Math.round((transcript?.confidence || 0) * 100)}%</span>
                 </div>
              </div>
              <div className="flex flex-col border-l pl-6">
                 <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Duration</span>
                 <span className="text-xs font-black">{formatTime(transcript?.duration || 0)}</span>
              </div>
           </div>
           <div className="flex gap-2">
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest h-9 border border-primary/5">
                 <Zap className="mr-2 h-3.5 w-3.5" /> Force Re-transcribe
              </Button>
           </div>
        </div>
      </div>

      {/* Intelligence & NLP Side Panel */}
      {showIntelligence && (
        <ScrollArea className="w-112.5 border rounded-2xl bg-card/30 backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-10 duration-500">
           <div className="p-6 space-y-8">
              {/* Executive Summary */}
              <section className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                       <Sparkles className="h-4 w-4" /> AI Executive Brief
                    </h3>
                    <Badge className="bg-green-500/10 text-green-600 border-none uppercase text-[9px] font-black italic">
                       {transcript.summary.resolutionStatus}
                    </Badge>
                 </div>
                 <div className="p-5 rounded-2xl bg-linear-to-br from-primary/5 to-transparent border border-primary/10 space-y-4">
                    <div className="space-y-1">
                       <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Primary Intent</span>
                       <p className="text-md font-black tracking-tighter uppercase">{transcript.summary.primaryReason}</p>
                    </div>
                    <div className="space-y-2">
                       <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">AI Summary</span>
                       <p className="text-xs font-medium leading-relaxed italic text-muted-foreground">
                          &quot;{transcript.summary.sentimentSummary}&quot;
                       </p>
                    </div>
                 </div>
              </section>

              {/* Intents & Topics */}
              <section className="space-y-4">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4" /> Intent & Entity Mapping
                 </h3>
                 <div className="grid grid-cols-1 gap-3">
                    {transcript.nlp.intents.map((intent, i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-xl border bg-card/50">
                          <div className="flex items-center gap-3">
                             <div className="h-2 w-2 rounded-full bg-primary" />
                             <span className="text-xs font-bold uppercase tracking-tight">{intent.name}</span>
                          </div>
                          <span className="text-[10px] font-black font-mono text-muted-foreground">{Math.round(intent.confidence * 100)}%</span>
                       </div>
                    ))}
                 </div>
                 <div className="flex flex-wrap gap-2 pt-2">
                    {transcript.nlp.topics.map(topic => (
                       <Badge key={topic} variant="secondary" className="bg-muted text-muted-foreground text-[9px] font-black uppercase px-3 py-1 border-none tracking-widest">
                          #{topic}
                       </Badge>
                    ))}
                 </div>
              </section>

              {/* Sentiment Intensity */}
              <section className="space-y-4">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Sentiment Intensity
                 </h3>
                 <div className="space-y-6 p-5 rounded-2xl bg-muted/20 border border-primary/5">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase">
                          <span>Overall Score</span>
                          <span className={cn(transcript.sentiment > 70 ? "text-green-500" : "text-amber-500")}>{transcript.sentiment}%</span>
                       </div>
                       <Progress value={transcript.sentiment} className="h-2 bg-background shadow-inner" />
                    </div>
                    
                    <div className="space-y-3">
                       <p className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest border-b pb-2">Key Entities Detected</p>
                       <div className="space-y-2">
                          {transcript.nlp.entities.map((entity, i) => (
                             <div key={i} className="flex items-center justify-between text-xs">
                                <span className="font-bold text-muted-foreground">{entity.type}:</span>
                                <span className="font-black italic text-primary">{entity.value}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </section>

              {/* Quality Actions */}
              <section className="space-y-4 pt-4">
                 <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12 text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-green-500/10 hover:text-green-600 border-primary/5">
                       <CheckCircle2 className="h-4 w-4" /> Approve Case
                    </Button>
                    <Button variant="outline" className="h-12 text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-red-500/10 hover:text-red-600 border-primary/5">
                       <AlertTriangle className="h-4 w-4" /> Flag Compliance
                    </Button>
                 </div>
                 <Button className="w-full h-12 text-[10px] font-black uppercase tracking-widest gap-2 shadow-2xl shadow-primary/20">
                    Push To CRM (Account #{transcript.customerId}) <ExternalLink className="h-4 w-4" />
                 </Button>
              </section>
           </div>
        </ScrollArea>
      )}

      {/* Annotation Dialog */}
      <Dialog open={isAnnotating} onOpenChange={setIsAnnotating}>
        <DialogContent className="sm:max-w-md border-primary/20 bg-card">
          <DialogHeader>
            <DialogTitle className="text-sm font-black uppercase tracking-widest">Add System Annotation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted/50 rounded-xl text-xs italic font-medium border-l-4 border-primary shadow-inner">
              &quot;{selectedText || "No text selected..."}&quot;
            </div>
            <div className="space-y-2">
              <Label htmlFor="annotation-note" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Supervisor Observation</Label>
              <Textarea
                id="annotation-note"
                placeholder="Enter coaching notes or interaction markers..."
                className="bg-background/50 border-primary/5 min-h-32 text-xs"
                value={annotationNote}
                onChange={(e) => setAnnotationNote(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" className="text-[10px] font-black uppercase" onClick={() => setIsAnnotating(false)}>Discard</Button>
            <Button className="text-[10px] font-black uppercase px-8" onClick={handleAddAnnotation} disabled={!selectedText}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function TranscriptViewerPage() {
   return (
      <Suspense fallback={
         <div className="h-full flex items-center justify-center animate-pulse">
            <div className="flex flex-col items-center gap-4">
               <Bot className="h-12 w-12 text-primary opacity-20" />
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Synthesizing Voice Data...</p>
            </div>
         </div>
      }>
         <TranscriptContent />
      </Suspense>
   );
}
