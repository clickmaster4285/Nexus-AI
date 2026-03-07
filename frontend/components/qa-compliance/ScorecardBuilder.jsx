"use client";

import { useState } from "react";
import {
   Plus,
   Trash2,
   GripVertical,
   Save,
   Settings2,
   FileText,
   CheckCircle2,
   Layout
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";

export default function ScorecardBuilder() {
   const [sections, setSections] = useState([
      { name: "Compliance & Security", weight: 30, items: [] },
      { name: "Soft Skills", weight: 20, items: [] },
      { name: "Product Knowledge", weight: 50, items: [] }
   ]);

   const [activeConfig, setActiveConfig] = useState({
      autoSubmit: true,
      alertOnFail: false,
      requireCoaching: true,
      calibrationMode: "consensus"
   });

   return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column: Form & Configuration (3.1.1) */}
         <div className="lg:col-span-1 space-y-6">
            <Card className="border-primary/20 shadow-lg">
               <CardHeader className="bg-primary/5 pb-4">
                  <div className="flex items-center gap-2">
                     <Settings2 className="h-5 w-5 text-primary" />
                     <CardTitle className="text-lg">Scorecard Configuration</CardTitle>
                  </div>
               </CardHeader>
               <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                     <Label className="text-xs uppercase font-bold text-muted-foreground mr-1">1. Scorecard Name</Label>
                     <Input placeholder="e.g. Inbound Sales V2.1" className="bg-muted/10 h-10" />
                  </div>

                  <div className="space-y-4 pt-2 border-t border-dashed">
                     <div className="flex items-center justify-between">
                        <Label className="font-bold flex items-center gap-2">
                           <FileText className="h-4 w-4 text-primary" /> 2. Auto-Coaching Trigger
                        </Label>
                        <Switch
                           checked={activeConfig.requireCoaching}
                           onCheckedChange={(v) => setActiveConfig({ ...activeConfig, requireCoaching: v })}
                        />
                     </div>
                     <p className="text-[10px] text-muted-foreground leading-relaxed">
                        Automatically trigger coaching workflow if score falls below 70%.
                     </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-dashed">
                     <Label className="text-xs uppercase font-bold text-muted-foreground mr-1">3. Automated AI Detection Fields</Label>
                     {[
                        "Identity Verification",
                        "PCI-DSS Redaction",
                        "Greeting Standards",
                        "Forbidden Vocabulary"
                     ].map((field, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/20 border text-xs">
                           <span>{field}</span>
                           <Badge className="bg-primary/10 text-primary border-none text-[9px]">AI ENABLED</Badge>
                        </div>
                     ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-dashed">
                     <Label className="text-xs uppercase font-bold text-muted-foreground mr-1">11. Metadata Tags</Label>
                     <Input placeholder="sales, q1, high-value, retention" className="h-8 text-xs" />
                  </div>

                  <Button className="w-full gap-2 shadow-md bg-primary hover:bg-primary/90">
                     <Save className="h-4 w-4" />
                     Deploy Scorecard (3.1.2)
                  </Button>
               </CardContent>
            </Card>
         </div>

         {/* Middle/Right: Criteria Builder & Weighting */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
               <div>
                  <h3 className="text-xl font-bold tracking-tight">Criteria Builder</h3>
                  <p className="text-sm text-muted-foreground">Manage sections, criteria, and weights (11 Fields Specification).</p>
               </div>
               <Button variant="outline" className="gap-2 border-dashed border-primary/40 text-primary">
                  <Plus className="h-4 w-4" />
                  Add Section
               </Button>
            </div>

            <Accordion type="multiple" defaultValue={["section-0", "section-1", "section-2"]} className="space-y-4">
               {sections.map((section, sIdx) => (
                  <AccordionItem key={sIdx} value={`section-${sIdx}`} className="border rounded-xl bg-card overflow-hidden shadow-sm">
                     <div className="flex items-center px-4 py-2 bg-muted/30">
                        <GripVertical className="h-4 w-4 text-muted-foreground mr-2 cursor-grab" />
                        <AccordionTrigger className="flex-1 py-3 hover:no-underline">
                           <div className="flex items-center gap-4 text-left">
                              <span className="font-bold text-sm">{section.name}</span>
                              <Badge variant="secondary" className="font-mono text-[10px]">WEIGHT: {section.weight}%</Badge>
                           </div>
                        </AccordionTrigger>
                        <div className="flex items-center gap-2 pr-2">
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                     <AccordionContent className="p-4 bg-background">
                        <div className="space-y-4">
                           {/* Specification mapping: 4-10 within section */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground">4. Scoring Type</Label>
                                 <Select defaultValue="binary">
                                    <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="binary">Binary (Pass/Fail)</SelectItem>
                                       <SelectItem value="scale">Scale (1-5)</SelectItem>
                                       <SelectItem value="nps">NPS Style (0-10)</SelectItem>
                                    </SelectContent>
                                 </Select>
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground">5. AI Mapping Logic</Label>
                                 <Select defaultValue="llm">
                                    <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="llm">LLM Reasoning</SelectItem>
                                       <SelectItem value="regex">Keyword/Regex</SelectItem>
                                       <SelectItem value="ner">Entity Extraction</SelectItem>
                                    </SelectContent>
                                 </Select>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">6. Section Description / Instruction</Label>
                              <Textarea placeholder="Instructions for manual evaluators..." className="h-16 text-xs" />
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground">7. Minimum Score</Label>
                                 <Input type="number" defaultValue={0} className="h-8" />
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground">8. Maximum Score</Label>
                                 <Input type="number" defaultValue={100} className="h-8" />
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] uppercase font-bold text-muted-foreground">9. Critical Fail?</Label>
                                 <div className="flex items-center h-8">
                                    <Switch />
                                    <span className="text-[10px] ml-2 text-muted-foreground italic">(Zeroes entire scorecard)</span>
                                 </div>
                              </div>
                           </div>

                           <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10">
                              <div className="flex items-center gap-2">
                                 <Layout className="h-4 w-4 text-primary" />
                                 <span className="text-xs font-bold">10. Section Allocation Weight</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Input
                                    type="number"
                                    className="h-8 w-20 bg-background text-right font-mono font-bold"
                                    value={section.weight}
                                    onChange={(e) => {
                                       const newSections = [...sections];
                                       newSections[sIdx].weight = parseInt(e.target.value);
                                       setSections(newSections);
                                    }}
                                 />
                                 <span className="text-sm font-bold">%</span>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 text-[10px] text-muted-foreground italic">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              Criteria within this section must equal 100% of the section&apos;s allocated weight.
                           </div>
                        </div>
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </div>
   );
}
