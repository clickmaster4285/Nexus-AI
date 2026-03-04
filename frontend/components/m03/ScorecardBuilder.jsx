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
   AlertTriangle,
   Info,
   ChevronDown,
   Layout
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";

export default function ScorecardBuilder() {
   const [formName, setFormName] = useState("New Quality Scorecard");
   const [passingScore, setPassingScore] = useState(85);
   const [sections, setSections] = useState([
      {
         id: "s1",
         name: "Soft Skills",
         weight: 40,
         criteria: [
            { id: "c1", name: "Professional Greeting", method: "yes-no", weight: 10, aiDetection: "keyword", critical: false },
            { id: "c2", name: "Empathy Demonstrated", method: "scale-5", weight: 30, aiDetection: "sentiment", critical: false }
         ]
      }
   ]);

   const addSection = () => {
      setSections([...sections, {
         id: Math.random().toString(36).substr(2, 9),
         name: "New Section",
         weight: 0,
         criteria: []
      }]);
   };

   const addCriteria = (sectionId) => {
      setSections(sections.map(s => {
         if (s.id === sectionId) {
            return {
               ...s,
               criteria: [...s.criteria, {
                  id: Math.random().toString(36).substr(2, 9),
                  name: "New Criteria",
                  method: "yes-no",
                  weight: 0,
                  aiDetection: "none",
                  critical: false
               }]
            };
         }
         return s;
      }));
   };

   const totalWeight = sections.reduce((sum, s) => sum + s.weight, 0);

   return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Sidebar Settings (3.1.1) */}
         <div className="lg:col-span-1 space-y-6">
            <Card>
               <CardHeader className="pb-3 border-b bg-muted/30">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                     <Settings2 className="h-4 w-4 text-primary" />
                     Scorecard Settings
                  </CardTitle>
               </CardHeader>
               <CardContent className="pt-4 space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="form-name">Form Name</Label>
                     <Input
                        id="form-name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="passing-score">Passing Score ({passingScore}%)</Label>
                     <Input
                        id="passing-score"
                        type="number"
                        value={passingScore}
                        onChange={(e) => setPassingScore(parseInt(e.target.value))}
                     />
                  </div>
                  <div className="space-y-2">
                     <Label>Scoring Method</Label>
                     <Select defaultValue="weighted">
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="weighted">Weighted Percentage</SelectItem>
                           <SelectItem value="flat">Flat Points</SelectItem>
                           <SelectItem value="deductive">Deductive (100% Start)</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="pt-4 border-t">
                     <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-medium">Total Resource Weight</span>
                        <span className={cn(
                           "font-bold",
                           totalWeight === 100 ? "text-green-500" : "text-red-500"
                        )}>
                           {totalWeight}%
                        </span>
                     </div>
                     <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                           className={cn(
                              "h-full transition-all duration-300",
                              totalWeight === 100 ? "bg-green-500" : "bg-primary"
                           )}
                           style={{ width: `${Math.min(totalWeight, 100)}%` }}
                        />
                     </div>
                     {totalWeight !== 100 && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                           <AlertTriangle className="h-3 w-3" />
                           Weights must sum to 100%
                        </p>
                     )}
                  </div>
                  <Button className="w-full gap-2 mt-4 shadow-md bg-primary hover:bg-primary/90">
                     <Save className="h-4 w-4" />
                     Publish Version 2.2
                  </Button>
               </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20 border-dashed">
               <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                     <Info className="h-4 w-4" />
                     <span className="text-xs font-bold uppercase tracking-wider">Builder Tips</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                     Use **AI Detection** for criteria that can be verified via transcripts. **Critical Fail** items will result in a 0 for the entire scorecard if failed.
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Main Builder Area (3.1.2) */}
         <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-bold tracking-tight">Criteria Configuration</h2>
                  <p className="text-muted-foreground">Define what agents should be measured against.</p>
               </div>
               <Button variant="outline" size="sm" onClick={addSection} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Section
               </Button>
            </div>

            <Accordion type="multiple" defaultValue={["s1"]} className="space-y-4">
               {sections.map((section, sIdx) => (
                  <AccordionItem key={section.id} value={section.id} className="border rounded-xl bg-card shadow-sm overflow-hidden">
                     <div className="flex items-center px-4 py-3 bg-muted/20 border-b group">
                        <GripVertical className="h-4 w-4 text-muted-foreground mr-2 opacity-0 group-hover:opacity-100 cursor-move transition-opacity" />
                        <AccordionTrigger className="flex-1 py-0 hover:no-underline">
                           <div className="flex items-center gap-4 w-full">
                              <Input
                                 className="h-8 max-w-xs bg-transparent border-none font-bold"
                                 value={section.name}
                                 onClick={(e) => e.stopPropagation()}
                                 onChange={(e) => {
                                    const newSections = [...sections];
                                    newSections[sIdx].name = e.target.value;
                                    setSections(newSections);
                                 }}
                              />
                              <Badge variant="secondary" className="font-mono text-[10px]">
                                 Weight: {section.weight}%
                              </Badge>
                           </div>
                        </AccordionTrigger>
                        <Button
                           variant="ghost"
                           size="icon"
                           className="h-8 w-8 text-muted-foreground hover:text-red-500"
                           onClick={(e) => {
                              e.stopPropagation();
                              setSections(sections.filter(s => s.id !== section.id));
                           }}
                        >
                           <Trash2 className="h-4 w-4" />
                        </Button>
                     </div>
                     <AccordionContent className="p-4 space-y-4">
                        <div className="space-y-4">
                           {section.criteria.map((crt, cIdx) => (
                              <div key={crt.id} className="relative pl-6 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-1 before:bg-muted-foreground/10 before:rounded-full">
                                 <div className="grid grid-cols-12 gap-4 items-end p-4 bg-muted/10 rounded-lg border border-transparent hover:border-border/50 transition-all">
                                    <div className="col-span-4 space-y-2">
                                       <Label className="text-[10px] uppercase font-bold text-muted-foreground">Criteria Name</Label>
                                       <Input
                                          className="h-9"
                                          value={crt.name}
                                          onChange={(e) => {
                                             const newSections = [...sections];
                                             newSections[sIdx].criteria[cIdx].name = e.target.value;
                                             setSections(newSections);
                                          }}
                                       />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                       <Label className="text-[10px] uppercase font-bold text-muted-foreground">Method</Label>
                                       <Select value={crt.method}>
                                          <SelectTrigger className="h-9">
                                             <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="yes-no">Yes/No</SelectItem>
                                             <SelectItem value="scale-5">1-5 Scale</SelectItem>
                                             <SelectItem value="scale-10">1-10 Scale</SelectItem>
                                             <SelectItem value="na">N/A Available</SelectItem>
                                          </SelectContent>
                                       </Select>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                       <Label className="text-[10px] uppercase font-bold text-muted-foreground">Weight (%)</Label>
                                       <Input
                                          type="number"
                                          className="h-9"
                                          value={crt.weight}
                                          onChange={(e) => {
                                             const newSections = [...sections];
                                             newSections[sIdx].criteria[cIdx].weight = parseInt(e.target.value);
                                             setSections(newSections);
                                          }}
                                       />
                                    </div>
                                    <div className="col-span-3 space-y-2">
                                       <Label className="text-[10px] uppercase font-bold text-muted-foreground">AI Detection</Label>
                                       <Select value={crt.aiDetection}>
                                          <SelectTrigger className="h-9">
                                             <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="none">Manual Review</SelectItem>
                                             <SelectItem value="keyword">Keyword Match</SelectItem>
                                             <SelectItem value="sentiment">Sentiment Analysis</SelectItem>
                                             <SelectItem value="compliance">Compliance Shield</SelectItem>
                                          </SelectContent>
                                       </Select>
                                    </div>
                                    <div className="col-span-1 flex flex-col items-center gap-2">
                                       <Label className="text-[10px] uppercase font-bold text-red-500">Critical</Label>
                                       <Switch
                                          checked={crt.critical}
                                          onCheckedChange={(checked) => {
                                             const newSections = [...sections];
                                             newSections[sIdx].criteria[cIdx].critical = checked;
                                             setSections(newSections);
                                          }}
                                       />
                                    </div>

                                    <div className="col-span-12 mt-2 pt-2 border-t border-muted/50 flex items-center justify-between">
                                       <div className="flex gap-4">
                                          <Button variant="ghost" size="sm" className="h-7 text-[10px] px-2 text-muted-foreground hover:text-primary">
                                             <Layout className="h-3 w-3 mr-1" /> Configure AI Rules
                                          </Button>
                                          <Button variant="ghost" size="sm" className="h-7 text-[10px] px-2 text-muted-foreground hover:text-primary">
                                             <FileText className="h-3 w-3 mr-1" /> Add Coaching Tip
                                          </Button>
                                       </div>
                                       <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6 text-muted-foreground hover:text-red-500"
                                          onClick={() => {
                                             const newSections = [...sections];
                                             newSections[sIdx].criteria = newSections[sIdx].criteria.filter(c => c.id !== crt.id);
                                             setSections(newSections);
                                          }}
                                       >
                                          <Trash2 className="h-3 w-3" />
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                           ))}
                           <Button
                              variant="ghost"
                              size="sm"
                              className="w-full border border-dashed border-muted-foreground/20 text-muted-foreground hover:text-primary hover:bg-primary/5 py-4"
                              onClick={() => addCriteria(section.id)}
                           >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Criteria Item
                           </Button>
                        </div>

                        <div className="mt-6 p-4 bg-muted/10 rounded-lg space-y-3">
                           <div className="flex items-center justify-between">
                              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Section Weighting</Label>
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
                              Criteria within this section must equal 100% of the section's allocated weight.
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
