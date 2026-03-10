"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Calendar, Award, Star, Heart, Phone, PhoneOff, MessageSquare, Plus, UserPlus, Shield, Globe, Briefcase, Zap, SeparatorHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { workforceAgents } from "@/lib/mock-data/workforce";
import { cn } from "@/lib/utils";

export default function AgentDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(workforceAgents[0]);
  const [isDialing, setIsDialing] = useState(false);
  const [callStatus, setCallStatus] = useState("Connecting...");

  const filteredAgents = workforceAgents.filter(agent =>
    agent.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startInternalCall = () => {
    setIsDialing(true);
    setCallStatus("Connecting...");
    setTimeout(() => setCallStatus("Ringing..."), 1500);
    setTimeout(() => setCallStatus("On Call"), 3000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-220px)] overflow-hidden p-1">
      {/* Sidebar: Agent List */}
      <Card className="xl:col-span-1 flex flex-col min-h-0 border-primary/10 shadow-md bg-card">
        <CardHeader className="p-4 bg-primary/5 border-b">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg font-bold">Agent Registry</CardTitle>
            <Link href="/workforce-intelligence/directory/create">
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-primary/20 text-primary hover:bg-primary/5">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              className="pl-8 bg-background h-10 border-primary/5 focus:border-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto flex-1 custom-scrollbar">
          <div className="divide-y divide-primary/5">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={cn(
                  "p-4 cursor-pointer transition-all hover:bg-primary/5 flex items-center gap-3 relative overflow-hidden group",
                  selectedAgent.id === agent.id ? "bg-primary/5" : ""
                )}
              >
                {selectedAgent.id === agent.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                )}
                <Avatar className="h-10 w-10 border-2 border-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {agent.fullName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{agent.fullName}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tight">{agent.team}</p>
                </div>
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  agent.status === "Active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-gray-400"
                )} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Profile View */}
      <Card className="xl:col-span-3 flex flex-col min-h-0 border-primary/10 shadow-xl overflow-y-auto custom-scrollbar bg-card">
        <CardContent className="p-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8 items-start">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-background ring-4 ring-primary/10 shadow-2xl transition-transform group-hover:scale-105">
                <AvatarFallback className="text-3xl bg-secondary font-black text-primary uppercase">
                  {selectedAgent.fullName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Badge className={cn(
                "absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 shadow-lg border-2 border-background font-black uppercase tracking-widest text-[10px]",
                selectedAgent.status === "Active" ? "bg-green-500" : "bg-gray-500"
              )}>
                {selectedAgent.status}
              </Badge>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-4xl font-black tracking-tighter text-foreground leading-none">{selectedAgent.fullName}</h2>
                  <p className="text-muted-foreground font-bold text-sm mt-1 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-primary">{selectedAgent.id}</span> 
                    <Separator orientation="vertical" className="h-3 bg-primary/20" />
                    <span>{selectedAgent.employeeId}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-10 gap-2 border-primary/20 text-primary hover:bg-primary/5 font-bold uppercase tracking-widest text-[10px]" onClick={() => toast.info("Messaging feature coming soon")}>
                    <MessageSquare className="h-4 w-4" /> Message
                  </Button>
                  <Button 
                    onClick={startInternalCall}
                    size="sm" 
                    className="h-10 gap-2 font-black uppercase tracking-widest text-[10px] bg-primary text-white shadow-lg shadow-primary/20"
                  >
                    <Phone className="h-4 w-4" /> Call Agent
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-primary/10 border-dashed">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest flex items-center gap-1.5">
                    <Shield className="h-3 w-3 text-primary" /> Role & Dept
                  </p>
                  <p className="text-sm font-bold">{selectedAgent.department}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest flex items-center gap-1.5">
                    <UserPlus className="h-3 w-3 text-primary" /> Reports To
                  </p>
                  <p className="text-sm font-bold">{selectedAgent.supervisor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest flex items-center gap-1.5">
                    <Briefcase className="h-3 w-3 text-primary" /> Experience
                  </p>
                  <p className="text-sm font-bold">{selectedAgent.employmentType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest flex items-center gap-1.5">
                    <Globe className="h-3 w-3 text-primary" /> Location
                  </p>
                  <p className="text-sm font-bold flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-500" /> {selectedAgent.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Stats & Skills */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/70 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500" /> Performance Snapshot
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "CSAT Score", value: selectedAgent.performance.csat, max: 5, color: "bg-green-500" },
                    { label: "QA Average", value: selectedAgent.performance.qaScore, max: 100, color: "bg-blue-500" },
                    { label: "Compliance", value: selectedAgent.performance.complianceScore, max: 100, color: "bg-purple-500" },
                    { label: "Attendance", value: selectedAgent.performance.attendance, max: 100, color: "bg-emerald-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-muted/20 border border-primary/5 space-y-3 hover:border-primary/20 transition-all hover:shadow-md group">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">{stat.label}</span>
                        <span className="text-xl font-black tabular-nums">{stat.value}{stat.max === 100 ? "%" : ""}</span>
                      </div>
                      <Progress value={(stat.value / stat.max) * 100} className={cn("h-1.5 bg-muted", stat.color)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/70">Queue Proficiencies</h3>
                <div className="space-y-4">
                  {selectedAgent.skills.map((skill) => (
                    <div key={skill.queue} className="space-y-2 p-3 rounded-lg bg-muted/10 border border-transparent hover:border-primary/10 transition-colors">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-black uppercase tracking-widest">{skill.queue}</span>
                        <Badge variant="outline" className="text-[10px] font-mono font-black border-primary/20 text-primary px-2 py-0 h-5">LVL {skill.level}/5</Badge>
                      </div>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-1.5 flex-1 rounded-full transition-all duration-500",
                              i <= skill.level ? "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.3)]" : "bg-muted"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Gamification & Wellbeing */}
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-linear-to-br from-primary/10 via-background to-secondary/10 border border-primary/20 shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Award className="h-24 w-24 text-primary" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/70 flex items-center gap-2 mb-6">
                  <Award className="h-5 w-5 text-primary" /> Achievements & Rank
                </h3>
                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                  {selectedAgent.gamification.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="px-3 py-1 bg-background/50 border-primary/20 text-primary font-black uppercase text-[9px] tracking-widest shadow-sm hover:bg-primary hover:text-white transition-all cursor-default">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-8 relative z-10 border-t border-primary/10 pt-6">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Total Points</p>
                    <p className="text-4xl font-black text-primary tracking-tighter tabular-nums">{selectedAgent.gamification.points.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Current Streak</p>
                    <p className="text-4xl font-black text-orange-500 flex items-center justify-end gap-1 tracking-tighter tabular-nums">
                      {selectedAgent.gamification.streak} <span className="text-xs tracking-normal font-bold">DAYS</span>
                    </p>
                  </div>
                </div>
              </div>

              <Card className="border-red-500/10 bg-red-500/5 shadow-inner overflow-hidden">
                <CardHeader className="p-6 pb-0">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/70 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500 animate-pulse" /> Wellbeing Intelligence
                  </h3>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-8">
                    <div className="relative h-24 w-24 flex items-center justify-center">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle className="text-muted/10 stroke-current" strokeWidth="8" fill="transparent" r="42" cx="50" cy="50" />
                        <circle
                          className={cn(
                            "stroke-current transition-all duration-1000 ease-in-out",
                            selectedAgent.wellbeing.burnoutScore > 50 ? "text-red-500" : "text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                          )}
                          strokeWidth="8"
                          strokeDasharray={263.9}
                          strokeDashoffset={263.9 - (263.9 * selectedAgent.wellbeing.burnoutScore) / 100}
                          strokeLinecap="round"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute text-center space-y-0">
                        <span className="text-3xl font-black tracking-tighter tabular-nums leading-none block">{selectedAgent.wellbeing.burnoutScore}</span>
                        <span className="text-[8px] font-black uppercase text-muted-foreground block">Index</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Sentiment</span>
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-black uppercase px-2 py-0 border-transparent shadow-sm",
                          selectedAgent.wellbeing.sentimentTrend === "Positive" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        )}>
                          {selectedAgent.wellbeing.sentimentTrend}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Risk Level</span>
                        <p className={cn(
                          "text-[10px] font-black uppercase tracking-tight",
                          selectedAgent.wellbeing.riskLevel === "Low" ? "text-green-500" : selectedAgent.wellbeing.riskLevel === "Medium" ? "text-yellow-600" : "text-red-600"
                        )}>{selectedAgent.wellbeing.riskLevel} Risk</p>
                      </div>
                      <Separator className="bg-red-500/10 my-1" />
                      <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1.5 font-bold uppercase tracking-tighter">
                        <Calendar className="h-3 w-3" /> Last Off: {selectedAgent.wellbeing.lastPto}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialing Dialog */}
      <Dialog open={isDialing} onOpenChange={setIsDialing}>
        <DialogContent className="max-w-xs p-8 flex flex-col items-center text-center space-y-6 border-primary/20 bg-card">
          <DialogHeader>
            <DialogTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Internal Link Established</DialogTitle>
          </DialogHeader>
          
          <div className="relative">
            <div className="h-28 w-28 rounded-full border-4 border-primary/10 flex items-center justify-center bg-primary/5 shadow-2xl relative z-10">
              <Phone className={cn("h-12 w-12 text-primary", callStatus !== "On Call" && "animate-pulse")} />
            </div>
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20" />
            <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-green-500 border-4 border-background shadow-lg z-20 flex items-center justify-center">
              <Zap className="h-3 w-3 text-white fill-white" />
            </div>
          </div>

          <div className="space-y-1 relative z-10">
            <p className="text-2xl font-black tracking-tighter uppercase text-foreground">{selectedAgent.fullName}</p>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">{callStatus}</p>
          </div>

          <div className="flex gap-4 w-full pt-4 relative z-10">
            <Button 
              variant="destructive" 
              className="flex-1 h-14 rounded-2xl shadow-xl shadow-red-500/20 gap-3 font-black uppercase tracking-widest text-xs"
              onClick={() => setIsDialing(false)}
            >
              <PhoneOff className="h-4 w-4" /> End Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
