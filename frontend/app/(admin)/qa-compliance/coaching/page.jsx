"use client";

import { useState } from "react";
import {
  Plus,
  Calendar,
  Users,
  MessageSquare,
  CheckCircle2,
  Clock,
  Target,
  Search,
  Filter,
  TrendingUp,
  History,
  ExternalLink,
  User,
  ArrowLeft,
  Save,
  X,
  Info,
  GraduationCap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

function CoachingAddForm({ onCancel, onSave }) {
  const [formData, setFormData] = useState({
    agent: "",
    topic: "Compliance & PII Redaction",
    priority: "Standard",
    date: "",
    notes: ""
  });

  const topics = [
    "Compliance & PII Redaction",
    "Customer Sentiment Handling",
    "Upsell Opportunity Detection",
    "Technical Troubleshooting",
    "Tone & Professionalism"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="h-9 w-9 rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-black tracking-tighter uppercase">Initialize Coaching Session</h2>
          <p className="text-[10px] text-muted-foreground font-medium italic">Schedule and define the scope for an agent performance improvement session.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="p-8 border-b bg-primary/2">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Session Configuration</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Target Agent</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                    <Input
                      required
                      placeholder="e.g. Sarah Jenkins"
                      className="pl-10 h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                      value={formData.agent}
                      onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Core Focus Topic</label>
                  <Select value={formData.topic} onValueChange={(v) => setFormData({ ...formData, topic: v })}>
                    <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Schedule Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-primary/40" />
                    <Input
                      required
                      type="date"
                      className="pl-10 h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Priority Level</label>
                  <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
                    <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="High">High (Target Critical)</SelectItem>
                      <SelectItem value="Immediate">Immediate (Compliance Escalation)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-dashed">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Coaching Brief & Objectives</label>
                <Input
                  required
                  placeholder="e.g. Reviewing recent PII leakage in chat interactions. Focus on redacted tool usage."
                  className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-tight">Coaching Protocol</p>
              <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                Agent workspaces will be notified of this session. Relevant interaction transcripts will be pre-loaded into the coaching viewer for efficient review.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/10 shadow-lg">
            <CardHeader className="p-6 bg-primary/5 border-b">
              <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Publication</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-indigo-600" />
                <span className="text-[10px] font-black uppercase text-indigo-700">Skill Enhancement</span>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
              >
                <Save className="h-4 w-4 mr-2" /> Schedule Session
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full h-11 border-primary/10 text-[10px] font-black uppercase tracking-widest"
              >
                <X className="h-4 w-4 mr-2" /> Discard
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}

export default function CoachingWorkflowPage() {
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return <CoachingAddForm onCancel={() => setIsCreating(false)} onSave={() => { alert("Session Scheduled!"); setIsCreating(false); }} />;
  }

  return (
    <div className="space-y-6 p-1">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Coaching & Development</h2>
          <p className="text-muted-foreground text-sm">Empowering agents through AI-targeted coaching sessions.</p>
        </div>
        <Button className="gap-2 shadow-lg bg-primary font-bold" onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4" />
          Schedule Session (3.4.1)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Coaching Overview Stats */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Active Sessions", value: "12", trend: "+2", icon: Users, color: "text-blue-500" },
            { label: "Completion Rate", value: "94%", trend: "+5%", icon: CheckCircle2, color: "text-green-500" },
            { label: "Avg improvement", value: "15%", trend: "Stable", icon: TrendingUp, color: "text-primary" },
            { label: "Pending Acknowledgment", value: "4", trend: "-1", icon: Clock, color: "text-amber-500" }
          ].map((stat, i) => (
            <Card key={i} className="hover:border-primary/20 transition-all cursor-pointer group shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold font-mono">{stat.value}</span>
                    <Badge variant="outline" className="text-[9px] h-4 font-normal">
                      {stat.trend}
                    </Badge>
                  </div>
                </div>
                <div className={cn("p-2 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sessions List (3.4.1) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-sm border-primary/10">
            <CardHeader className="pb-3 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming & Active Sessions
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-48">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input placeholder="Find agent..." className="pl-8 h-8 text-xs bg-background" />
                  </div>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Filter className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="text-[10px] uppercase font-bold h-10 px-4 whitespace-nowrap">Session Info</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Agent</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Focus Areas</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold h-10 px-4">Trigger</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold h-10 px-4 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { title: "Soft Skills Refinement", agent: "Sarah Jenkins", coach: "JD", areas: ["Empathy", "Tone"], trigger: "AI Score < 80%", status: "scheduled", date: "Today, 2:00 PM" },
                      { title: "Compliance Workshop", agent: "Mike Ross", coach: "JD", areas: ["PCI-DSS", "Scripts"], trigger: "Violation Log V088", status: "in-progress", date: "Mar 05, 10:00 AM" },
                      { title: "Closing Procedure", agent: "Alex Chen", coach: "JD", areas: ["Closing", "Referral"], trigger: "Manual Flag", status: "completed", date: "Yesterday" }
                    ].map((session, i) => (
                      <TableRow key={i} className="group hover:bg-muted/20">
                        <TableCell className="px-4 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <p className="text-xs font-bold leading-none">{session.title}</p>
                            <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono mt-1">
                              <Clock className="h-3 w-3" /> {session.date}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                              {session.agent.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-xs font-medium whitespace-nowrap">{session.agent}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-4">
                          <div className="flex flex-wrap gap-1 max-w-37.5">
                            {session.areas.map((a, j) => (
                              <Badge key={j} variant="secondary" className="text-[9px] px-1 h-4 border-none bg-muted/70">{a}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-4">
                          <Badge variant="outline" className="text-[9px] h-4 font-mono font-normal whitespace-nowrap">
                            {session.trigger}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Badge className={cn(
                              "text-[9px] px-1.5 h-4 capitalize",
                              session.status === 'scheduled' ? "bg-blue-100 text-blue-600" :
                                session.status === 'in-progress' ? "bg-amber-100 text-amber-600 animate-pulse" : "bg-green-100 text-green-600"
                            )}>
                              {session.status}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => alert("Opening session details...")}>
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Focus: Coaching Effectiveness (3.4.1) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border-primary/20">
            <CardHeader className="pb-3 border-b bg-primary/5">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Performance Improvement
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {[
                { area: "Soft Skills", current: 82, improved: 12 },
                { area: "Compliance", current: 98, improved: 4 },
                { area: "Process", current: 75, improved: 18 },
                { area: "Technical", current: 65, improved: -2 }
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span>{item.area}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">{item.current}%</span>
                      <span className={cn(
                        "text-[10px] flex items-center",
                        item.improved > 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {item.improved > 0 ? <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> : null}
                        {item.improved}%
                      </span>
                    </div>
                  </div>
                  <Progress value={item.current} className="h-1.5" />
                </div>
              ))}

              <div className="pt-4 mt-6 border-t">
                <Label className="text-[10px] text-muted-foreground uppercase font-bold mb-3 block">Auto-Assign Recommendations</Label>
                <div className="p-3 bg-muted/30 rounded-lg border border-dashed border-primary/20 space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5" />
                    <p className="text-[10px] text-foreground font-medium leading-relaxed">
                      Mike Ross triggered **Compliance Rule R002**. Automating coach assignment now...
                    </p>
                  </div>
                  <Button variant="link" className="h-auto p-0 text-[10px] text-primary font-bold" onClick={() => alert("Coaching assigned!")}>ACKNOWLEDGE & ASSIGN</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/10 shadow-sm border-primary/5">
            <CardHeader className="p-4 flex items-center justify-between">
              <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                <History className="h-3.5 w-3.5" />
                Recent Session Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {[
                { outcome: "Goal Met", count: 24, icon: CheckCircle2, color: "text-green-500" },
                { outcome: "Follow-up", count: 8, icon: MessageSquare, color: "text-blue-500" }
              ].map((o, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <o.icon className={cn("h-3.5 w-3.5", o.color)} />
                    <span>{o.outcome}</span>
                  </div>
                  <span className="font-bold opacity-50">{o.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
