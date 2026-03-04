"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { queues, getTotalCallsWaiting, getTotalAgentsAvailable } from "@/lib/mock-data/queues";
import { Phone, Users, Clock, AlertTriangle } from "lucide-react";

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function QueueCard({ queue }) {
  const [longestWait, setLongestWait] = useState(queue.longestWaitTime);
  const [callsWaiting, setCallsWaiting] = useState(queue.callsWaiting);

  useEffect(() => {
    const interval = setInterval(() => {
      if (callsWaiting > 0) {
        setLongestWait((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [callsWaiting]);

  const slaAlert = queue.slaPercentage < 80;
  const waitAlert = longestWait > 300;
  const queueAlert = callsWaiting > 5;

  return (
    <Card className={`${slaAlert || waitAlert ? "border-red-500" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">{queue.name}</h3>
          {(slaAlert || queueAlert) && (
            <AlertTriangle className="h-4 w-4 text-red-500" />
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Waiting</span>
            </div>
            <span className={`text-lg font-bold ${queueAlert ? "text-red-500" : ""}`}>
              {callsWaiting}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Longest Wait</span>
            </div>
            <span className={`font-mono ${waitAlert ? "text-red-500" : ""}`}>
              {formatDuration(longestWait)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Agents</span>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-green-500 text-white">
                {queue.agentsAvailable}
              </Badge>
              <Badge variant="secondary">{queue.agentsBusy}</Badge>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">SLA</span>
              <span className={slaAlert ? "text-red-500 font-medium" : ""}>
                {queue.slaPercentage}%
              </span>
            </div>
            <Progress
              value={queue.slaPercentage}
              className={`h-2 ${slaAlert ? "bg-red-200" : ""}`}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Abandonment</span>
            <span>{queue.abandonmentRate}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Priority</span>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < queue.priority ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function QueueMonitoringPanel() {
  const totalWaiting = getTotalCallsWaiting();
  const totalAvailable = getTotalAgentsAvailable();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Queue Monitoring</CardTitle>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Waiting:{" "}</span>
              <span className="font-bold">{totalWaiting}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Available:{" "}</span>
              <span className="font-bold text-green-500">{totalAvailable}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {queues.map((queue) => (
            <QueueCard key={queue.id} queue={queue} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
