"use client";

import { useState } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  AlertTriangle, 
  MessageSquare, 
  CheckCircle2, 
  RotateCcw,
  BookOpen,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { scripts } from "@/lib/mock-data/scripts";
import { toast } from "sonner";

export default function LiveScriptPage() {
  const [activeScript, setActiveScript] = useState(scripts[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [agentNotes, setAgentNotes] = useState("");

  const currentStep = activeScript.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / activeScript.steps.length) * 100;

  const handleNext = () => {
    if (currentStepIndex < activeScript.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      toast.success("Script completed!");
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleScriptChange = (scriptId) => {
    const newScript = scripts.find(s => s.id === scriptId);
    if (newScript) {
      setActiveScript(newScript);
      setCurrentStepIndex(0);
      toast.info(`Switched to ${newScript.name}`);
    }
  };

  // Mock token replacement
  const formatContent = (content) => {
    return content
      .replace("{agentName}", "John Doe")
      .replace("{customerName}", "Sarah")
      .replace("{product}", "Nexus Cloud");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Main Script Area */}
      <div className="lg:col-span-2 flex flex-col gap-6 h-full">
        <Card className="flex-1 flex flex-col shadow-md border-primary/20">
          <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {activeScript.name}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    Step {currentStepIndex + 1} of {activeScript.steps.length}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentStepIndex(0)}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <Badge className="mb-6 px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              {currentStep.type}
            </Badge>
            <h2 className="text-2xl font-bold mb-6">{currentStep.title}</h2>
            <div className="prose prose-lg dark:prose-invert max-w-2xl">
              <p className="leading-relaxed text-foreground/90 font-medium">
                &quot;{formatContent(currentStep.content)}&quot;
              </p>
            </div>
          </CardContent>
          <div className="p-6 border-t bg-muted/10 flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentStepIndex === 0}
              className="w-32"
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <Button 
              onClick={handleNext} 
              className="w-32"
            >
              {currentStepIndex === activeScript.steps.length - 1 ? (
                <>Finish <CheckCircle2 className="h-4 w-4 ml-2" /></>
              ) : (
                <>Next <ChevronRight className="h-4 w-4 ml-2" /></>
              )}
            </Button>
          </div>
        </Card>

        {/* Agent Notes */}
        <Card className="h-1/3 flex flex-col">
          <CardHeader className="py-3 px-4 min-h-12.5">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Call Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <Textarea 
              placeholder="Type notes here... (Auto-saved)" 
              className="h-full border-0 resize-none focus-visible:ring-0 p-4 text-sm"
              value={agentNotes}
              onChange={(e) => setAgentNotes(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - Objections & Script Selection */}
      <div className="flex flex-col gap-6 h-full overflow-hidden">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="py-4 border-b bg-orange-50/50 dark:bg-orange-950/10">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-orange-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Objection Handler
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="price">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 text-sm font-semibold">
                    &quot;It&apos;s too expensive&quot;
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-sm text-muted-foreground bg-muted/20">
                    &quot;I understand budget is a factor. However, our customers typically see a 3x ROI within the first 6 months. Let&apos;s break down the value...&quot;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="competitor">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 text-sm font-semibold">
                    &quot;We use Competitor X&quot;
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-sm text-muted-foreground bg-muted/20">
                    &quot;They are a great company. Where we differ is our native AI integration, which they currently offer only as a paid add-on.&quot;
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="timing">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 text-sm font-semibold">
                    &quot;Not the right time&quot;
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-sm text-muted-foreground bg-muted/20">
                    &quot;I completely respect that. When would be a better time to revisit this conversation? I can schedule a follow-up.&quot;
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3 px-4 border-b">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Available Scripts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-1">
              {scripts.map(script => (
                <Button
                  key={script.id}
                  variant={activeScript.id === script.id ? "secondary" : "ghost"}
                  className="w-full justify-start text-xs h-8"
                  onClick={() => handleScriptChange(script.id)}
                >
                  <span className={`w-2 h-2 rounded-full mr-2 ${activeScript.id === script.id ? "bg-primary" : "bg-muted-foreground/30"}`} />
                  {script.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
