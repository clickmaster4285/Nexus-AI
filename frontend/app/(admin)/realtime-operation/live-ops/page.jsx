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
import { cn } from "@/lib/utils";

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
  const [longestWait, setLongestWait] = useState(queue.maxWaitTime || 0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (queue.waiting > 0) {
        setLongestWait((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [queue.waiting]);

  const slaAlert = queue.sla < 80;
  const waitAlert = longestWait > 300;

  return (
    <Card className={`relative ${slaAlert || waitAlert ? "border-red-200 bg-red-50/10 shadow-sm" : "border-primary/10 shadow-sm"}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-xs uppercase tracking-widest text-foreground/80">{queue.name}</h3>
          <Badge variant={slaAlert ? "destructive" : "outline"} className="h-5 text-[10px] font-black uppercase">
            SLA: {queue.sla}%
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tight">Waiting</p>
            <p className={`text-2xl font-black ${queue.waiting > 5 ? "text-red-500" : "text-primary"}`}>{queue.waiting}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tight">Longest</p>
            <p className={`text-xl font-mono font-black ${waitAlert ? "text-red-500" : "text-foreground"}`}>{formatDuration(longestWait)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 pt-4 border-t border-dashed border-primary/10">
          <div className="flex items-center gap-2">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tight">Active Agents</span>
          </div>
          <div className="flex gap-1.5">
            <Badge className="bg-green-500 hover:bg-green-600 h-5 text-[10px] font-black">{queue.available}</Badge>
            <Badge variant="secondary" className="h-5 text-[10px] font-black bg-yellow-500/10 text-yellow-600 border-none">{queue.agents - queue.available}</Badge>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-[9px] text-muted-foreground uppercase font-black tracking-widest ml-1">Overflow Strategy</Label>
          <Select defaultValue="voice_mail">
            <SelectTrigger className="h-8 text-[10px] bg-muted/30 border-primary/5 focus:border-primary/20">
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
    <div className="grid grid-cols-12 gap-6 p-1">
      {/* Left Column: Agents & Calls */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {/* Agent Grid */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Agent State Board
              </h2>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Real-time status monitoring & supervision</p>
            </div>
            <div className="flex bg-muted/40 p-1 rounded-xl border border-primary/10 shadow-inner">
              <Button 
                variant={filter === "all" ? "default" : "ghost"} 
                size="sm" 
                className={cn(
                  "h-8 text-[10px] font-black uppercase tracking-widest px-4 transition-all rounded-lg",
                  filter === "all" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
                onClick={() => setFilter("all")}
              >
                All ({agents.length})
              </Button>
              <Button 
                variant={filter === "available" ? "default" : "ghost"} 
                size="sm" 
                className={cn(
                  "h-8 text-[10px] font-black uppercase tracking-widest px-4 transition-all rounded-lg",
                  filter === "available" ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "text-muted-foreground hover:bg-green-500/5 hover:text-green-600"
                )}
                onClick={() => setFilter("available")}
              >
                Available ({getAvailableAgents().length})
              </Button>
              <Button 
                variant={filter === "busy" ? "default" : "ghost"} 
                size="sm" 
                className={cn(
                  "h-8 text-[10px] font-black uppercase tracking-widest px-4 transition-all rounded-lg",
                  filter === "busy" ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/20" : "text-muted-foreground hover:bg-yellow-500/5 hover:text-yellow-600"
                )}
                onClick={() => setFilter("busy")}
              >
                Busy ({getBusyAgents().length})
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Active Calls */}
        <div className="space-y-4 pt-4 border-t border-primary/5">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
            <Phone className="h-4 w-4 text-green-500" /> Active Call Monitor
          </h2>
          {activeCalls.length === 0 ? (
            <div className="h-40 rounded-2xl border-2 border-dashed border-primary/10 flex flex-col items-center justify-center text-muted-foreground gap-2 bg-muted/5">
              <Phone className="h-8 w-8 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-widest">No active calls currently in progress</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {activeCalls.map((call) => (
                <ActiveCallCard key={call.id} call={call} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Queues */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="space-y-4 sticky top-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
              <Monitor className="h-4 w-4 text-blue-500" /> Queue Monitoring
            </h2>
            <Badge variant="outline" className="text-[9px] font-black uppercase border-primary/20 bg-primary/5 text-primary tracking-tighter">
              Total Waiting: {getTotalCallsWaiting()}
            </Badge>
          </div>
          
          <div className="space-y-4">
            {queues.map((queue) => (
              <QueueCard key={queue.id} queue={queue} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
