"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  Clock, 
  MessageSquare, 
  Users, 
  Ear, 
  Mic, 
  LogIn,
  X, 
  Monitor
} from "lucide-react";
import { agents, getAvailableAgents, getBusyAgents } from "@/lib/mock-data/agents";
import { getActiveCalls } from "@/lib/mock-data/calls";
import { getAgentById } from "@/lib/mock-data/agents";
import { queues, getTotalCallsWaiting, getTotalAgentsAvailable } from "@/lib/mock-data/queues";
import { toast } from "sonner";

// --- UTILS ---
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const statusColors = {
  available: "bg-green-500",
  busy: "bg-yellow-500",
  acw: "bg-blue-500",
  hold: "bg-blue-400",
  break: "bg-orange-500",
  training: "bg-purple-500",
  offline: "bg-gray-500",
};

const statusLabels = {
  available: "Available",
  busy: "Busy",
  acw: "ACW",
  hold: "Hold",
  break: "Break",
  training: "Training",
  offline: "Offline",
};

// --- SUB-COMPONENTS (Co-located) ---

function AgentCard({ agent }) {
  const [timeInState, setTimeInState] = useState(agent.timeInState);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (agent.status !== "offline") {
      const interval = setInterval(() => {
        setTimeInState((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [agent.status]);

  const statusColor = statusColors[agent.status] || "bg-gray-500";
  const sentimentColor =
    agent.sentiment >= 80 ? "bg-green-500" : agent.sentiment >= 60 ? "bg-yellow-500" : "bg-red-500";

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${statusColor}`} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-sm">{agent.name}</p>
            <span className="text-[10px] text-primary font-mono uppercase">ID: {agent.id}</span>
          </div>
          <Badge variant="secondary" className={`${statusColor} text-white text-[10px] h-5`}>
            {statusLabels[agent.status]}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">Time: {formatDuration(timeInState)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span className="text-[11px] font-bold">{agent.queue}</span>
          </div>

          {agent.status !== "offline" && agent.status !== "training" && (
            <>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold uppercase">
                <span>Calls: {agent.callsToday}</span>
                <span>AHT: {Math.floor(agent.aht / 60)}:{(agent.aht % 60).toString().padStart(2, "0")}</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${sentimentColor}`}
                    style={{ width: `${agent.sentiment}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold">{agent.sentiment}%</span>
              </div>
            </>
          )}

          <Input
            placeholder="Supervisor notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="text-[10px] h-7 mt-2 bg-muted/30 border-none focus-visible:ring-1"
            maxLength={500}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ActiveCallCard({ call }) {
  const [duration, setDuration] = useState(call.duration);
  const agent = getAgentById(call.agentId);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const escalationRisk = 100 - call.sentiment;
  const holdCount = Math.floor(duration / 180);

  const handleAction = (action) => {
    toast.success(`Action triggered: ${action} for ${call.id}`);
  };

  return (
    <Card className={escalationRisk > 70 ? "border-red-500 shadow-md animate-pulse" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-green-500/10 flex items-center justify-center">
              <Phone className="h-4 w-4 text-green-500 animate-pulse" />
            </div>
            <div>
              <p className="font-bold text-sm">{call.id}</p>
              <p className="text-[10px] text-muted-foreground uppercase font-mono">{call.customerId}</p>
            </div>
          </div>
          <Badge variant={call.direction === "inbound" ? "default" : "secondary"} className="text-[10px] h-5">
            {call.type || call.direction}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/30 p-2 rounded">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Agent</span>
              <span className="text-xs font-bold">{agent?.name || call.agentId}</span>
            </div>
            <div className="bg-muted/30 p-2 rounded text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Duration</span>
              <span className="text-xs font-mono font-bold">{formatDuration(duration)}</span>
            </div>
          </div>

          <div className="p-2 bg-primary/5 rounded text-[11px] italic text-muted-foreground border border-primary/10">
            &quot;Thank you for calling our support center, I&apos;m checking that...&quot;
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-bold uppercase text-muted-foreground">Sentiment</span>
              <span className="font-bold text-green-600">{call.sentiment}%</span>
            </div>
            <Progress value={call.sentiment} className="h-1.5" />
          </div>

          <div className="flex gap-1 pt-2 overflow-x-auto pb-1">
            <Button size="sm" variant="outline" className="h-7 text-[10px] px-2 font-bold" onClick={() => handleAction("Monitor")}>
              <Ear className="h-3 w-3 mr-1" /> Monitor
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-[10px] px-2 font-bold" onClick={() => handleAction("Whisper")}>
              <Mic className="h-3 w-3 mr-1" /> Whisper
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-[10px] px-2 font-bold" onClick={() => handleAction("Barge")}>
              <LogIn className="h-3 w-3 mr-1" /> Barge
            </Button>
            <Button size="sm" variant="destructive" className="h-7 text-[10px] px-2 font-bold" onClick={() => handleAction("End Call")}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QueueCard({ queue }) {
  const [longestWait, setLongestWait] = useState(queue.longestWaitTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (queue.callsWaiting > 0) {
        setLongestWait((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [queue.callsWaiting]);

  const slaAlert = queue.slaPercentage < 80;
  const waitAlert = longestWait > 300;

  return (
    <Card className={`relative ${slaAlert || waitAlert ? "border-red-200 bg-red-50/10" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-xs uppercase tracking-widest">{queue.name}</h3>
          <Badge variant={slaAlert ? "destructive" : "outline"} className="h-5 text-[10px]">
            SLA: {queue.slaPercentage}%
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Waiting</p>
            <p className={`text-2xl font-black ${queue.callsWaiting > 5 ? "text-red-500" : ""}`}>{queue.callsWaiting}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Longest</p>
            <p className={`text-xl font-mono font-bold ${waitAlert ? "text-red-500" : ""}`}>{formatDuration(longestWait)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-bold uppercase">Agents</span>
          </div>
          <div className="flex gap-1">
            <Badge className="bg-green-500 h-5 text-[10px]">{queue.agentsAvailable}</Badge>
            <Badge variant="secondary" className="h-5 text-[10px]">{queue.agentsBusy}</Badge>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-[9px] text-muted-foreground uppercase font-bold">Overflow</Label>
          <Select defaultValue="voice_mail">
            <SelectTrigger className="h-7 text-[10px] bg-muted/20 border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="voice_mail">Voicemail</SelectItem>
              <SelectItem value="ext_overflow">External Partner</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

// --- MAIN PAGE ---

export default function LiveOpsPage() {
  const [filter, setFilter] = useState("all");
  const activeCalls = getActiveCalls();

  const filteredAgents = agents.filter((agent) => {
    if (filter === "all") return true;
    if (filter === "available") return agent.status === "available";
    if (filter === "busy") return ["busy", "acw", "hold"].includes(agent.status);
    if (filter === "offline") return agent.status === "offline";
    return true;
  });

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column: Agents & Calls */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        {/* Agent Grid */}
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0 pb-4 pt-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> Agent State Board
                </CardTitle>
              </div>
              <div className="flex bg-muted/50 p-1 rounded-lg border">
                <Button 
                  variant={filter === "all" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="h-7 text-[10px] font-bold uppercase tracking-wider px-3"
                  onClick={() => setFilter("all")}
                >
                  All ({agents.length})
                </Button>
                <Button 
                  variant={filter === "available" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="h-7 text-[10px] font-bold uppercase tracking-wider px-3"
                  onClick={() => setFilter("available")}
                >
                  Available ({getAvailableAgents().length})
                </Button>
                <Button 
                  variant={filter === "busy" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="h-7 text-[10px] font-bold uppercase tracking-wider px-3"
                  onClick={() => setFilter("busy")}
                >
                  Busy ({getBusyAgents().length})
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Calls */}
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0 pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Phone className="h-4 w-4" /> Active Call Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            {activeCalls.length === 0 ? (
              <div className="h-32 rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground text-sm font-medium">
                No active calls currently
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeCalls.map((call) => (
                  <ActiveCallCard key={call.id} call={call} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Queues */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <Card className="border-none shadow-none bg-transparent h-full">
          <CardHeader className="px-0 pb-4 pt-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Monitor className="h-4 w-4" /> Queue Monitoring
              </CardTitle>
              <Badge variant="outline" className="text-[10px] font-bold border-primary/20">
                TOTAL WAITING: {getTotalCallsWaiting()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            {queues.map((queue) => (
              <QueueCard key={queue.id} queue={queue} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
