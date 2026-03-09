"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Award, Star, Heart, Phone, PhoneOff, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
      <Card className="xl:col-span-1 flex flex-col min-h-0 border-primary/10 shadow-md">
        <CardHeader className="p-4 bg-primary/5 border-b">
          <CardTitle className="text-lg font-bold">Agent Registry</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              className="pl-8 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto flex-1 custom-scrollbar">
          <div className="divide-y">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={cn(
                  "p-4 cursor-pointer transition-all hover:bg-muted/50 flex items-center gap-3",
                  selectedAgent.id === agent.id ? "bg-primary/5 border-l-4 border-primary" : "border-l-4 border-transparent"
                )}
              >
                <Avatar className="h-10 w-10 border-2 border-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {agent.fullName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold truncate">{agent.fullName}</p>
                  <p className="text-[10px] text-muted-foreground">{agent.team}</p>
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
      <Card className="xl:col-span-3 flex flex-col min-h-0 border-primary/10 shadow-xl overflow-y-auto custom-scrollbar">
        <CardContent className="p-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8 items-start">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-background ring-4 ring-primary/10 shadow-2xl">
                <AvatarFallback className="text-3xl bg-secondary font-black text-primary">
                  {selectedAgent.fullName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 shadow-lg border-2 border-background">
                {selectedAgent.status}
              </Badge>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">{selectedAgent.fullName}</h2>
                  <p className="text-muted-foreground font-mono text-sm">{selectedAgent.id} • {selectedAgent.employeeId}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-10 gap-2 border-primary/20 text-primary hover:bg-primary/5" onClick={() => alert("Message feature...")}>
                    <MessageSquare className="h-4 w-4" /> Message
                  </Button>
                  <Button 
                    onClick={startInternalCall}
                    size="sm" 
                    className="h-10 gap-2 font-black uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20"
                  >
                    <Phone className="h-4 w-4" /> Call Agent
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-dashed">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Role & Dept</p>
                  <p className="text-sm font-bold">{selectedAgent.department}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Reports To</p>
                  <p className="text-sm font-bold">{selectedAgent.supervisor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Experience</p>
                  <p className="text-sm font-bold">{selectedAgent.employmentType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Location</p>
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
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> Performance Snapshot
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "CSAT Score", value: selectedAgent.performance.csat, max: 5, color: "bg-green-500" },
                    { label: "QA Average", value: selectedAgent.performance.qaScore, max: 100, color: "bg-blue-500" },
                    { label: "Compliance", value: selectedAgent.performance.complianceScore, max: 100, color: "bg-purple-500" },
                    { label: "Attendance", value: selectedAgent.performance.attendance, max: 100, color: "bg-emerald-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-card border shadow-sm space-y-2 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                        <span className="text-lg font-bold">{stat.value}{stat.max === 100 ? "%" : ""}</span>
                      </div>
                      <Progress value={(stat.value / stat.max) * 100} className={cn("h-1.5", stat.color)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Queue Proficiencies</h3>
                <div className="space-y-3">
                  {selectedAgent.skills.map((skill) => (
                    <div key={skill.queue} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold">{skill.queue}</span>
                        <span className="text-muted-foreground font-mono font-bold">LVL {skill.level}/5</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-1.5 flex-1 rounded-full transition-all duration-500",
                              i <= skill.level ? "bg-primary shadow-[0_0_4px_rgba(var(--primary),0.3)]" : "bg-muted"
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
              <div className="p-6 rounded-2xl bg-linear-to-br from-primary/10 via-background to-secondary/10 border border-primary/20 shadow-inner group">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform" /> Achievements
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.gamification.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="px-3 py-1 bg-background/50 border-primary/20 text-primary font-bold shadow-sm">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Total Points</p>
                    <p className="text-2xl font-black text-primary">{selectedAgent.gamification.points.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-px bg-primary/20 mx-4" />
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Current Streak</p>
                    <p className="text-2xl font-black text-orange-500 flex items-center justify-end gap-1">
                      {selectedAgent.gamification.streak} <span className="text-xs">DAY{selectedAgent.gamification.streak !== 1 ? "S" : ""}</span>
                    </p>
                  </div>
                </div>
              </div>

              <Card className="border-red-500/10 bg-red-500/5 shadow-sm">
                <CardHeader className="p-4 pb-0">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500 animate-pulse" /> Wellbeing Score
                  </h3>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="relative h-20 w-20 flex items-center justify-center">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle className="text-muted/20 stroke-current" strokeWidth="10" fill="transparent" r="40" cx="50" cy="50" />
                        <circle
                          className={cn(
                            "stroke-current transition-all duration-1000 ease-in-out",
                            selectedAgent.wellbeing.burnoutScore > 50 ? "text-red-500" : "text-green-500"
                          )}
                          strokeWidth="10"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * selectedAgent.wellbeing.burnoutScore) / 100}
                          strokeLinecap="round"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <span className="absolute text-xl font-black">{selectedAgent.wellbeing.burnoutScore}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground uppercase font-black tracking-tighter">Trend</span>
                        <Badge variant="outline" className={cn(
                          "text-[10px] font-bold px-2 py-0 border-transparent shadow-sm",
                          selectedAgent.wellbeing.sentimentTrend === "Positive" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        )}>
                          {selectedAgent.wellbeing.sentimentTrend}
                        </Badge>
                      </div>
                      <p className="text-xs font-black uppercase tracking-tight">{selectedAgent.wellbeing.riskLevel} Risk</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-2 italic font-medium">
                        <Calendar className="h-3 w-3" /> Last PTO: {selectedAgent.wellbeing.lastPto}
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
        <DialogContent className="max-w-xs p-8 flex flex-col items-center text-center space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Internal Link Established</DialogTitle>
          </DialogHeader>
          
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-4 border-primary/10 flex items-center justify-center bg-primary/5 shadow-inner">
              <Phone className={cn("h-10 w-10 text-primary", callStatus !== "On Call" && "animate-pulse")} />
            </div>
            <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-green-500 border-2 border-background shadow-sm" />
          </div>

          <div className="space-y-1">
            <p className="text-xl font-black tracking-tighter uppercase">{selectedAgent.fullName}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse">{callStatus}</p>
          </div>

          <div className="flex gap-4 w-full pt-4">
            <Button 
              variant="destructive" 
              className="flex-1 h-12 rounded-2xl shadow-xl shadow-red-500/20 gap-2 font-bold uppercase tracking-widest"
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
