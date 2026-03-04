"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { agents, getAvailableAgents, getBusyAgents } from "@/lib/mock-data/agents";
import { Phone, Clock, MessageSquare } from "lucide-react";

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

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

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
            <a href={`/m09-recording?callId=${agent.currentCallId || 'C001'}`} className="text-xs text-primary hover:underline font-mono">
              {agent.currentCallId || agent.id}
            </a>
          </div>
          <Badge variant="secondary" className={`${statusColor} text-white`}>
            {statusLabels[agent.status]}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Time: {formatDuration(timeInState)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs">{agent.queue}</span>
          </div>

          {agent.status !== "offline" && agent.status !== "training" && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Calls Today: {agent.callsToday}</span>
                <span className="text-xs text-muted-foreground">AHT: {Math.floor(agent.aht / 60)}:{(agent.aht % 60).toString().padStart(2, "0")}</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${sentimentColor}`}
                    style={{ width: `${agent.sentiment}%` }}
                  />
                </div>
                <span className="text-xs font-medium">{agent.sentiment}</span>
              </div>
            </>
          )}

          <Input
            placeholder="Supervisor notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="text-xs h-7 mt-2"
            maxLength={500}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default function AgentStateBoard() {
  const [filter, setFilter] = useState("all");

  const filteredAgents = agents.filter((agent) => {
    if (filter === "all") return true;
    if (filter === "available") return agent.status === "available";
    if (filter === "busy") return ["busy", "acw", "hold"].includes(agent.status);
    if (filter === "offline") return agent.status === "offline";
    return true;
  });

  const availableCount = getAvailableAgents().length;
  const busyCount = getBusyAgents().length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Agent State Board</CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-xs rounded-full ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              All ({agents.length})
            </button>
            <button
              onClick={() => setFilter("available")}
              className={`px-3 py-1 text-xs rounded-full ${filter === "available" ? "bg-green-500 text-white" : "bg-muted"}`}
            >
              Available ({availableCount})
            </button>
            <button
              onClick={() => setFilter("busy")}
              className={`px-3 py-1 text-xs rounded-full ${filter === "busy" ? "bg-yellow-500 text-white" : "bg-muted"}`}
            >
              Busy ({busyCount})
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
