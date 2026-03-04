"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initialKPIs = [
  { id: 1, name: "Service Level", value: 94.5, target: 90, unit: "%", trend: "up" },
  { id: 2, name: "Abandonment Rate", value: 4.2, target: 5, unit: "%", trend: "down" },
  { id: 3, name: "Avg Handle Time", value: 245, target: 240, unit: "s", trend: "stable" },
  { id: 4, name: "CSAT Score", value: 87.3, target: 85, unit: "%", trend: "up" },
  { id: 5, name: "Occupancy Rate", value: 82.1, target: 80, unit: "%", trend: "up" },
  { id: 6, name: "First Call Resolution", value: 78.5, target: 75, unit: "%", trend: "up" },
  { id: 7, name: "Calls in Queue", value: 24, target: 20, unit: "", trend: "up" },
  { id: 8, name: "Avg Wait Time", value: 187, target: 180, unit: "s", trend: "up" },
];

function getKPIStatus(value, target, inverse = false) {
  const diff = inverse ? target - value : value - target;
  if (Math.abs(diff) < target * 0.05) return "stable";
  return diff > 0 ? "good" : "critical";
}

function KPICard({ kpi }) {
  const [currentValue, setCurrentValue] = useState(kpi.value);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setCurrentValue((prev) => {
        const change = (Math.random() - 0.5) * 0.5;
        return Math.max(0, Number((prev + change).toFixed(1)));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const status = getKPIStatus(currentValue, kpi.target, kpi.name === "Abandonment Rate");

  const TrendIcon =
    kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;

  const statusColors = {
    good: "bg-green-500 text-white",
    stable: "bg-yellow-500 text-white",
    critical: "bg-red-500 text-white",
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-card border rounded-lg min-w-[200px]">
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{kpi.name}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold">
            {currentValue.toFixed(1)}
            <span className="text-xs font-normal">{kpi.unit}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <TrendIcon
          className={`h-4 w-4 ${
            status === "good" ? "text-green-500" : status === "critical" ? "text-red-500" : "text-yellow-500"
          }`}
        />
        <Badge className={statusColors[status]} variant="secondary">
          {status === "good" ? "✓" : status === "critical" ? "!" : "~"}
        </Badge>
      </div>
    </div>
  );
}

export default function KPITicker() {
  const [kpis] = useState(initialKPIs);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 pb-2">
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </div>
  );
}
