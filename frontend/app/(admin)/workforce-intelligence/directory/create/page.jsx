"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  UserPlus, 
  Shield, 
  Globe, 
  Briefcase, 
  Zap, 
  Save, 
  X, 
  Plus, 
  Mail, 
  Fingerprint, 
  PhoneCall, 
  MapPin, 
  Calendar,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function CreateAgentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  
  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    extension: "",
    department: "",
    team: "",
    supervisor: "",
    location: "",
    employmentType: "Full-Time",
    startDate: new Date().toISOString().split('T')[0],
    languages: [],
    status: "Active",
    skills: [
      { queue: "General Inquiry", level: 3 }
    ]
  });

  const handleAddAgent = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Agent successfully created", {
        description: `${formData.fullName} has been added to the registry and assigned ID A${Math.floor(Math.random() * 900) + 100}.`,
      });
      router.push("/workforce-intelligence/directory");
    }, 1500);
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { queue: "", level: 3 }]
    });
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-[10px] font-black uppercase tracking-widest"
              onClick={() => router.push("/workforce-intelligence/directory")}
            >
              <ArrowLeft className="h-3 w-3 mr-1" /> Directory
            </Button>
            <ChevronRight className="h-3 w-3 opacity-30" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">New Agent</span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
            <UserPlus className="h-8 w-8 text-primary" />
            CREATE AGENT <span className="text-primary/50">PROFILE</span>
          </h1>
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
            Configure system access, organizational data, and routing skills
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="h-11 text-[10px] font-black uppercase tracking-widest border-primary/20 px-6"
            onClick={() => router.push("/workforce-intelligence/directory")}
          >
            Discard
          </Button>
          <Button 
            onClick={handleAddAgent}
            disabled={isSubmitting}
            className="h-11 text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 px-8 min-w-40"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white animate-spin rounded-full mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" /> Save Profile
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Sections */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/10 shadow-xl bg-card overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <CardHeader className="p-0 bg-primary/5 border-b border-primary/10">
                <TabsList className="bg-transparent h-14 w-full justify-start gap-8 px-8 p-0">
                  <TabsTrigger 
                    value="personal" 
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-14 px-2 text-[10px] font-black uppercase tracking-widest"
                  >
                    1. Personal Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="org" 
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-14 px-2 text-[10px] font-black uppercase tracking-widest"
                  >
                    2. Organization
                  </TabsTrigger>
                  <TabsTrigger 
                    value="skills" 
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-14 px-2 text-[10px] font-black uppercase tracking-widest"
                  >
                    3. Skills & Routing
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="p-8">
                <TabsContent value="personal" className="mt-0 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center gap-4">
                       <div className="relative group">
                          <Avatar className="h-24 w-24 border-4 border-background ring-4 ring-primary/5 shadow-2xl transition-transform group-hover:scale-105">
                            <AvatarFallback className="text-2xl bg-secondary font-black text-primary uppercase">
                              {formData.fullName ? formData.fullName.split(" ").map(n => n[0]).join("") : "?"}
                            </AvatarFallback>
                          </Avatar>
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-2 border-background shadow-lg text-primary"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                       </div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground text-center">Profile Photo<br/>(JPG/PNG, 5MB)</p>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-1.5">
                            <Fingerprint className="h-3 w-3 text-primary" /> Full Name *
                          </Label>
                          <Input 
                            required 
                            value={formData.fullName}
                            onChange={e => setFormData({...formData, fullName: e.target.value})}
                            placeholder="e.g. Sarah Jenkins" 
                            className="h-12 bg-muted/20 border-primary/5 focus:border-primary/30 text-base font-bold" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-1.5">
                            <Shield className="h-3 w-3 text-primary" /> Employee ID *
                          </Label>
                          <Input 
                            required 
                            value={formData.employeeId}
                            onChange={e => setFormData({...formData, employeeId: e.target.value})}
                            placeholder="e.g. EMP-001" 
                            className="h-12 bg-muted/20 border-primary/5 focus:border-primary/30 font-mono" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-1.5">
                            <Mail className="h-3 w-3 text-primary" /> Email Address *
                          </Label>
                          <Input 
                            required 
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            placeholder="s.jenkins@nexus-ai.com" 
                            className="h-12 bg-muted/20 border-primary/5 focus:border-primary/30" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-1.5">
                            <PhoneCall className="h-3 w-3 text-primary" /> Extension
                          </Label>
                          <Input 
                            value={formData.extension}
                            onChange={e => setFormData({...formData, extension: e.target.value})}
                            placeholder="4401" 
                            className="h-12 bg-muted/20 border-primary/5 focus:border-primary/30 font-mono" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="h-10 text-[10px] font-black uppercase tracking-widest text-primary gap-2"
                      onClick={() => setActiveTab("org")}
                    >
                      Next: Organization <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="org" className="mt-0 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <Briefcase className="h-3 w-3 text-primary" /> Department
                        </Label>
                        <Select onValueChange={v => setFormData({...formData, department: v})}>
                          <SelectTrigger className="h-12 bg-muted/20 border-primary/5 font-bold">
                            <SelectValue placeholder="Select Dept" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Customer Service">Customer Service</SelectItem>
                            <SelectItem value="Technical Support">Technical Support</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="Compliance">Compliance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <UserCheck className="h-3 w-3 text-primary" /> Team / Supervisor
                        </Label>
                        <Select onValueChange={v => setFormData({...formData, supervisor: v})}>
                          <SelectTrigger className="h-12 bg-muted/20 border-primary/5 font-bold">
                            <SelectValue placeholder="Select Supervisor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="David Miller">David Miller</SelectItem>
                            <SelectItem value="Sarah Jenkins">Sarah Jenkins</SelectItem>
                            <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 text-primary" /> Site / Location
                        </Label>
                        <Input 
                          value={formData.location}
                          onChange={e => setFormData({...formData, location: e.target.value})}
                          placeholder="e.g. Remote - US" 
                          className="h-12 bg-muted/20 border-primary/5 font-bold" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-primary" /> Start Date
                        </Label>
                        <Input 
                          type="date"
                          value={formData.startDate}
                          onChange={e => setFormData({...formData, startDate: e.target.value})}
                          className="h-12 bg-muted/20 border-primary/5 font-bold" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <Globe className="h-3 w-3 text-primary" /> Employment Type
                      </Label>
                      <Select defaultValue="Full-Time" onValueChange={v => setFormData({...formData, employmentType: v})}>
                        <SelectTrigger className="h-12 bg-muted/20 border-primary/5 font-bold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-Time">Full-Time</SelectItem>
                          <SelectItem value="Part-Time">Part-Time</SelectItem>
                          <SelectItem value="Contractor">Contractor</SelectItem>
                          <SelectItem value="Contingent">Contingent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-5 rounded-2xl border border-primary/10 bg-muted/10 h-12 self-end mb-1">
                      <div className="space-y-0.5">
                        <Label className="text-[10px] font-black uppercase tracking-tight">Active Login Status</Label>
                        <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest">Enable immediate access</p>
                      </div>
                      <Switch 
                        checked={formData.status === "Active"}
                        onCheckedChange={checked => setFormData({...formData, status: checked ? "Active" : "Inactive"})}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="h-10 text-[10px] font-black uppercase tracking-widest text-muted-foreground gap-2"
                      onClick={() => setActiveTab("personal")}
                    >
                      <ArrowLeft className="h-4 w-4" /> Personal Details
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="h-10 text-[10px] font-black uppercase tracking-widest text-primary gap-2"
                      onClick={() => setActiveTab("skills")}
                    >
                      Next: Skills & Routing <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="mt-0 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest">Skill Set Mapping</h3>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1">Assign queues and define proficiency levels</p>
                      </div>
                      <Button type="button" onClick={addSkill} variant="outline" size="sm" className="h-9 text-[10px] font-black uppercase tracking-widest text-primary border-primary/20 hover:bg-primary/5">
                        <Plus className="h-3 w-3 mr-2" /> Add Skill Entry
                      </Button>
                    </div>
                    
                    <div className="grid gap-4">
                      {formData.skills.map((skill, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-6 items-end p-6 rounded-2xl border border-primary/5 bg-muted/10 group relative transition-all hover:border-primary/20 hover:bg-muted/20">
                          <div className="flex-1 space-y-2 w-full">
                            <Label className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.2em]">Queue / Skill Area</Label>
                            <Select 
                              value={skill.queue} 
                              onValueChange={v => updateSkill(idx, "queue", v)}
                            >
                              <SelectTrigger className="h-12 bg-background border-primary/10 font-bold">
                                <SelectValue placeholder="Select Queue..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                <SelectItem value="Billing Support">Billing Support</SelectItem>
                                <SelectItem value="Technical Support">Technical Support</SelectItem>
                                <SelectItem value="Enterprise Sales">Enterprise Sales</SelectItem>
                                <SelectItem value="Escalations">Escalations</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="w-full md:w-56 space-y-3">
                            <div className="flex justify-between items-center">
                               <Label className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.2em]">Proficiency Level</Label>
                               <span className="text-[10px] font-black text-primary font-mono">LVL {skill.level}/5</span>
                            </div>
                            <div className="flex items-center gap-2 bg-background border border-primary/10 h-12 px-4 rounded-xl">
                               {[1, 2, 3, 4, 5].map(v => (
                                  <button
                                     key={v}
                                     type="button"
                                     onClick={() => updateSkill(idx, "level", v)}
                                     className={cn(
                                        "h-6 flex-1 rounded-md text-[10px] font-black transition-all",
                                        skill.level >= v ? "bg-primary text-white shadow-lg" : "bg-muted text-muted-foreground hover:bg-muted/80"
                                     )}
                                  >
                                     {v}
                                  </button>
                               ))}
                            </div>
                          </div>
                          {formData.skills.length > 1 && (
                            <Button 
                              type="button" 
                              onClick={() => removeSkill(idx)}
                              variant="ghost" 
                              size="icon" 
                              className="h-12 w-12 text-red-500 hover:text-red-600 hover:bg-red-500/5 rounded-xl border border-red-500/10"
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-start pt-4">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="h-10 text-[10px] font-black uppercase tracking-widest text-muted-foreground gap-2"
                      onClick={() => setActiveTab("org")}
                    >
                      <ArrowLeft className="h-4 w-4" /> Organization
                    </Button>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        {/* Right Column: Profile Summary / Preview */}
        <div className="space-y-6">
           <Card className="border-primary/10 bg-card shadow-xl overflow-hidden sticky top-6">
              <CardHeader className="bg-primary px-6 py-6 text-white text-center">
                 <div className="mx-auto h-24 w-24 rounded-full border-4 border-white/20 shadow-2xl bg-white/10 flex items-center justify-center mb-4">
                    <UserPlus className="h-10 w-10 text-white" />
                 </div>
                 <h3 className="text-xl font-black tracking-tight leading-none">PREVIEW</h3>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mt-1">Profile Summary</p>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                 <div className="space-y-1 text-center">
                    <p className="text-lg font-black tracking-tight uppercase leading-none">{formData.fullName || "AGENT NAME"}</p>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{formData.employeeId || "EMP-000"}</p>
                 </div>

                 <Separator className="bg-primary/10" />

                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px]">
                       <span className="font-black text-muted-foreground uppercase tracking-widest">DEPT</span>
                       <span className="font-bold">{formData.department || "—"}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                       <span className="font-black text-muted-foreground uppercase tracking-widest">SUPERVISOR</span>
                       <span className="font-bold">{formData.supervisor || "—"}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                       <span className="font-black text-muted-foreground uppercase tracking-widest">LOCATION</span>
                       <span className="font-bold">{formData.location || "—"}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                       <span className="font-black text-muted-foreground uppercase tracking-widest">TYPE</span>
                       <Badge variant="outline" className="text-[9px] font-black uppercase border-primary/20 text-primary">{formData.employmentType}</Badge>
                    </div>
                 </div>

                 <Separator className="bg-primary/10" />

                 <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">PRIMARY SKILLS</p>
                    <div className="flex flex-wrap gap-2">
                       {formData.skills.filter(s => s.queue).map((s, i) => (
                          <Badge key={i} className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase h-6 px-2">
                             {s.queue} (L{s.level})
                          </Badge>
                       ))}
                       {formData.skills.filter(s => s.queue).length === 0 && (
                          <span className="text-[10px] text-muted-foreground italic">No queues assigned</span>
                       )}
                    </div>
                 </div>

                 <div className="pt-6">
                    <Button 
                       onClick={handleAddAgent}
                       disabled={isSubmitting || !formData.fullName || !formData.employeeId || !formData.email}
                       className="w-full h-12 text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20"
                    >
                       {isSubmitting ? "PROCESSING..." : "FINALIZE & SAVE"}
                    </Button>
                    <p className="text-[8px] text-center text-muted-foreground font-bold uppercase tracking-widest mt-4">
                       By saving, you authorize system access<br/>based on assigned permissions.
                    </p>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
