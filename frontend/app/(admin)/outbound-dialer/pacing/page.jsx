"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { pacingSettings, queueStats } from "@/lib/mock-data/dialer";
import { Gauge, Users, PhoneCall, PhoneOff, Clock, Pause, Play, AlertTriangle, CheckCircle, Zap } from "lucide-react";

export default function PacingPage() {
  const [settings, setSettings] = useState(pacingSettings);
  const [stats, setStats] = useState(queueStats);

  const handleDialRatioChange = (value) => {
    setSettings({ ...settings, dialRatio: value[0] });
  };

  const handleToggleAutoThrottle = () => {
    setSettings({ ...settings, autoThrottle: !settings.autoThrottle });
    toast.success(settings.autoThrottle ? "Auto-throttle disabled" : "Auto-throttle enabled");
  };

  const handleModeChange = (mode) => {
    setSettings({ ...settings, mode });
    toast.success(`Dialing mode changed to ${mode}`);
  };

  const handleApplyOverride = () => {
    toast.success("Pacing override applied successfully");
  };

  const abandonRate = parseFloat(settings.abandonRate);
  const isAbandonHigh = abandonRate > 3;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Pacing & Agent Pool</h2>
          <p className="text-sm text-muted-foreground">Live pacing controls and agent availability management</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={settings.autoThrottle ? "default" : "secondary"} className="gap-1">
            {settings.autoThrottle ? <Zap className="h-3 w-3" /> : null}
            Auto-Throttle: {settings.autoThrottle ? "ON" : "OFF"}
          </Badge>
        </div>
      </div>

      {/* Live Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Available Agents</p>
                <p className="text-2xl font-black text-green-500">{stats.availableAgents}</p>
              </div>
              <Users className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Busy Agents</p>
                <p className="text-2xl font-black text-yellow-500">{stats.busyAgents}</p>
              </div>
              <PhoneCall className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">On Break</p>
                <p className="text-2xl font-black text-orange-500">{stats.onBreakAgents}</p>
              </div>
              <Pause className="h-5 w-5 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">In ACW</p>
                <p className="text-2xl font-black text-blue-500">{stats.wrapUpAgents}</p>
              </div>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Calls Active</p>
                <p className="text-2xl font-black">{stats.callsInProgress}</p>
              </div>
              <PhoneOff className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Queue Depth</p>
                <p className="text-2xl font-black">{stats.totalQueueDepth.toLocaleString()}</p>
              </div>
              <Gauge className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dial Ratio Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Dial Ratio Control</span>
              <Badge variant="outline">{settings.mode}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Dial Ratio (Lines per Agent)</Label>
                <span className="font-bold text-primary">{settings.dialRatio}x</span>
              </div>
              <Slider
                value={[settings.dialRatio]}
                onValueChange={handleDialRatioChange}
                min={0.5}
                max={4}
                step={0.1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5x</span>
                <span>1x</span>
                <span>2x</span>
                <span>3x</span>
                <span>4x</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dialing Mode Override</Label>
              <Select value={settings.mode} onValueChange={handleModeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Predictive">Predictive</SelectItem>
                  <SelectItem value="Progressive">Progressive</SelectItem>
                  <SelectItem value="Preview">Preview</SelectItem>
                  <SelectItem value="Power">Power</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Switch checked={settings.autoThrottle} onCheckedChange={handleToggleAutoThrottle} />
                <Label>Auto-Throttle</Label>
              </div>
              <Button onClick={handleApplyOverride}>Apply Override</Button>
            </div>
          </CardContent>
        </Card>

        {/* Abandon Rate Gauge */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Abandon Rate Monitor</span>
              {isAbandonHigh ? (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" /> Above Target
                </Badge>
              ) : (
                <Badge variant="default" className="gap-1 bg-green-500">
                  <CheckCircle className="h-3 w-3" /> Healthy
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative pt-6 pb-2">
              {/* Gauge Display */}
              <div className="flex justify-center">
                <div className={cn(
                  "w-40 h-40 rounded-full border-8 flex items-center justify-center",
                  isAbandonHigh ? "border-red-500" : "border-green-500"
                )}>
                  <div className="text-center">
                    <p className={cn("text-4xl font-black", isAbandonHigh ? "text-red-500" : "text-green-500")}>
                      {settings.abandonRate}%
                    </p>
                    <p className="text-xs text-muted-foreground">Current</p>
                  </div>
                </div>
              </div>

              {/* Target Line Indicator */}
              <div className="absolute left-1/2 bottom-16 transform -translate-x-1/2 flex flex-col items-center">
                <div className="w-px h-4 bg-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">FTC Target: 3%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Abandon Rate History (Last Hour)</span>
              </div>
              <div className="h-24 bg-muted/30 rounded-lg flex items-end justify-around p-2">
                {[2.1, 2.3, 1.9, 2.5, 2.8, 2.2, 2.1].map((rate, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-8 rounded-t",
                      rate > 3 ? "bg-red-500" : "bg-green-500"
                    )}
                    style={{ height: `${(rate / 4) * 100}%` }}
                    title={`${rate}%`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-60m</span>
                <span>-45m</span>
                <span>-30m</span>
                <span>-15m</span>
                <span>Now</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Pool Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Pool Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Available</span>
              </div>
              <p className="text-2xl font-black">{stats.availableAgents}</p>
            </div>
            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-sm font-medium">Busy</span>
              </div>
              <p className="text-2xl font-black">{stats.busyAgents}</p>
            </div>
            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-sm font-medium">On Break</span>
              </div>
              <p className="text-2xl font-black">{stats.onBreakAgents}</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium">In ACW</span>
              </div>
              <p className="text-2xl font-black">{stats.wrapUpAgents}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                <span className="text-sm font-medium">Total</span>
              </div>
              <p className="text-2xl font-black">
                {stats.availableAgents + stats.busyAgents + stats.onBreakAgents + stats.wrapUpAgents}
              </p>
            </div>
          </div>

          {/* Agent Utilization */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Agent Utilization</span>
              <span className="font-medium">
                {Math.round((stats.busyAgents / (stats.availableAgents + stats.busyAgents)) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(stats.busyAgents / (stats.availableAgents + stats.busyAgents)) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Queue Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Queue Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase">Current Queue Depth</p>
              <p className="text-xl font-black">{stats.totalQueueDepth.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Calls In Progress</p>
              <p className="text-xl font-black">{stats.callsInProgress}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Avg Wait Time</p>
              <p className="text-xl font-black">{stats.avgWaitTime}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Agents Per 100 Calls</p>
              <p className="text-xl font-black">
                {((stats.availableAgents / stats.totalQueueDepth) * 100).toFixed(1)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
