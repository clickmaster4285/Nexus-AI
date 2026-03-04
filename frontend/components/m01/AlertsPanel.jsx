"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X, Bell, CheckCircle, AlertCircle } from "lucide-react";

const initialAlerts = [
  {
    id: "ALT001",
    severity: "critical",
    type: "SLA Breach",
    message: "Support queue SLA has dropped below 80%",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    acknowledged: false,
  },
  {
    id: "ALT002",
    severity: "high",
    type: "Long Wait",
    message: "Call in Technical queue waiting over 5 minutes",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    acknowledged: false,
  },
  {
    id: "ALT003",
    severity: "medium",
    type: "Sentiment Alert",
    message: "Negative sentiment detected on call C014",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    acknowledged: false,
  },
  {
    id: "ALT004",
    severity: "low",
    type: "Agent Break",
    message: "Agent A004 has been on break for 15+ minutes",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    acknowledged: true,
  },
];

const severityConfig = {
  critical: { color: "bg-red-500", icon: AlertCircle, label: "Critical" },
  high: { color: "bg-orange-500", icon: AlertTriangle, label: "High" },
  medium: { color: "bg-yellow-500", icon: Bell, label: "Medium" },
  low: { color: "bg-blue-500", icon: CheckCircle, label: "Low" },
};

function formatTimeAgo(date) {
  const seconds = Math.floor((Date.now() - date) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const acknowledgeAlert = (id) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const dismissAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            Real-Time Alerts
            {unacknowledgedCount > 0 && (
              <Badge className="bg-red-500 text-white">{unacknowledgedCount}</Badge>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {alerts.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No active alerts
            </div>
          ) : (
            alerts.map((alert) => {
              const config = severityConfig[alert.severity];
              const Icon = config.icon;

              return (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${
                    alert.acknowledged ? "bg-muted/50 opacity-60" : "bg-card"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${config.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge className={config.color} variant="secondary">
                          {config.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(alert.timestamp)}
                        </span>
                      </div>

                      <p className="font-medium text-sm mt-1">{alert.type}</p>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>

                      {!alert.acknowledged && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => acknowledgeAlert(alert.id)}
                          >
                            Acknowledge
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => dismissAlert(alert.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
