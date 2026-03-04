"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Settings, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialKPIs = [
  { id: 1, name: "Service Level", value: 94.5, target: 90, unit: "%", trend: "up", inverse: false },
  { id: 2, name: "Abandonment Rate", value: 4.2, target: 5, unit: "%", trend: "down", inverse: true },
  { id: 3, name: "Avg Handle Time", value: 245, target: 240, unit: "s", trend: "stable", inverse: true },
  { id: 4, name: "CSAT Score", value: 87.3, target: 85, unit: "%", trend: "up", inverse: false },
  { id: 5, name: "Occupancy Rate", value: 82.1, target: 80, unit: "%", trend: "up", inverse: false },
  { id: 6, name: "First Call Resolution", value: 78.5, target: 75, unit: "%", trend: "up", inverse: false },
  { id: 7, name: "Calls in Queue", value: 24, target: 20, unit: "", trend: "up", inverse: true },
  { id: 8, name: "Avg Wait Time", value: 187, target: 180, unit: "s", trend: "up", inverse: true },
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

  const status = getKPIStatus(currentValue, kpi.target, kpi.inverse);

  const TrendIcon =
    kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;

  const statusColors = {
    good: "bg-green-500 text-white",
    stable: "bg-yellow-500 text-white",
    critical: "bg-red-500 text-white",
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-card border rounded-lg min-w-50">
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
          className={`h-4 w-4 ${status === "good" ? "text-green-500" : status === "critical" ? "text-red-500" : "text-yellow-500"
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
  const [kpis, setKPIs] = useState(initialKPIs);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const updateKPI = (id, field, value) => {
    setKPIs(prev => prev.map(k => k.id === id ? { ...k, [field]: value } : k));
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-3 pb-2">
          {kpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </div>

      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>KPI Configuration (1.2.1)</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {kpis.map((kpi) => (
              <div key={kpi.id} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label>KPI Name</Label>
                  <Input value={kpi.name} onChange={(e) => updateKPI(kpi.id, 'name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Target Value</Label>
                  <Input type="number" value={kpi.target} onChange={(e) => updateKPI(kpi.id, 'target', parseFloat(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Input value={kpi.unit} onChange={(e) => updateKPI(kpi.id, 'unit', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Direction</Label>
                  <Select value={kpi.inverse ? "lower" : "higher"} onValueChange={(v) => updateKPI(kpi.id, 'inverse', v === "lower")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="higher">Higher is Better</SelectItem>
                      <SelectItem value="lower">Lower is Better</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsConfigOpen(false)}>Save Configuration</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
