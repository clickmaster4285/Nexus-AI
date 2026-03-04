"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Monitor, LayoutGrid, Eye, Copy, Check, Trash2, Edit2, ExternalLink, Lock } from "lucide-react";

const mockWallboards = [
  {
    id: "WB001",
    name: "Main Operations Center",
    layout: "4-col",
    queues: ["Support", "Sales", "Technical"],
    kpiWidgets: ["calls_waiting", "sla", "agent_status", "avg_wait"],
    refreshRate: 5,
    theme: "dark",
    tickerMessages: ["Welcome to NEXUS AI", "SLA Target: 80%"],
    publicUrl: "https://wallboard.nexus.ai/wb/main-ops",
    accessPin: "1234",
    activeHours: { start: "06:00", end: "22:00" },
    isActive: true,
  },
  {
    id: "WB002",
    name: "Sales Floor Display",
    layout: "2-col",
    queues: ["Sales"],
    kpiWidgets: ["calls_waiting", "sales_conversions", "revenue"],
    refreshRate: 10,
    theme: "light",
    tickerMessages: ["Sales Target: $50K today"],
    publicUrl: "https://wallboard.nexus.ai/wb/sales",
    accessPin: "5678",
    activeHours: { start: "08:00", end: "18:00" },
    isActive: true,
  },
  {
    id: "WB003",
    name: "Executive Dashboard",
    layout: "masonry",
    queues: ["All"],
    kpiWidgets: ["sla", "csat", "revenue", "churn_risk"],
    refreshRate: 30,
    theme: "dark",
    tickerMessages: ["Executive Summary"],
    publicUrl: "https://wallboard.nexus.ai/wb/exec",
    accessPin: "9999",
    activeHours: { start: "00:00", end: "23:59" },
    isActive: false,
  },
];

const layoutOptions = [
  { value: "1-col", label: "Single Column", icon: "▪" },
  { value: "2-col", label: "Two Columns", icon: "▪▪" },
  { value: "3-col", label: "Three Columns", icon: "▪▪▪" },
  { value: "4-col", label: "Four Columns", icon: "▪▪▪▪" },
  { value: "masonry", label: "Masonry", icon: "◫" },
  { value: "custom", label: "Custom Grid", icon: "⊞" },
];

const refreshOptions = [
  { value: "5", label: "5 seconds" },
  { value: "10", label: "10 seconds" },
  { value: "30", label: "30 seconds" },
  { value: "60", label: "1 minute" },
  { value: "300", label: "5 minutes" },
];

const themeOptions = [
  { value: "dark", label: "Dark Theme" },
  { value: "light", label: "Light Theme" },
  { value: "brand", label: "Brand Colors" },
];

const kpiWidgetOptions = [
  { value: "calls_waiting", label: "Calls Waiting" },
  { value: "sla", label: "SLA %" },
  { value: "agent_status", label: "Agent Status" },
  { value: "avg_wait", label: "Average Wait" },
  { value: "abandon_rate", label: "Abandonment Rate" },
  { value: "sales_conversions", label: "Sales Conversions" },
  { value: "revenue", label: "Revenue" },
  { value: "csat", label: "CSAT Score" },
  { value: "churn_risk", label: "Churn Risk" },
  { value: "top_agents", label: "Top Agents" },
];

const queueOptions = [
  { value: "Support", label: "Support" },
  { value: "Sales", label: "Sales" },
  { value: "Technical", label: "Technical" },
  { value: "Billing", label: "Billing" },
  { value: "General", label: "General" },
  { value: "All", label: "All Queues" },
];

function WallboardForm({ wallboard, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: wallboard?.name || "",
    layout: wallboard?.layout || "4-col",
    queues: wallboard?.queues || ["Support"],
    kpiWidgets: wallboard?.kpiWidgets || ["calls_waiting", "sla"],
    refreshRate: wallboard?.refreshRate?.toString() || "5",
    theme: wallboard?.theme || "dark",
    tickerMessages: wallboard?.tickerMessages?.join("\n") || "",
    publicUrl: wallboard?.publicUrl || "",
    accessPin: wallboard?.accessPin || "",
    activeHoursStart: wallboard?.activeHours?.start || "06:00",
    activeHoursEnd: wallboard?.activeHours?.end || "22:00",
    isActive: wallboard?.isActive ?? true,
  });

  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: wallboard?.id || `WB${Date.now()}`,
      refreshRate: parseInt(formData.refreshRate),
      tickerMessages: formData.tickerMessages.split("\n").filter(Boolean),
      activeHours: {
        start: formData.activeHoursStart,
        end: formData.activeHoursEnd,
      },
    });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(formData.publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleQueue = (queue) => {
    setFormData((prev) => ({
      ...prev,
      queues: prev.queues.includes(queue)
        ? prev.queues.filter((q) => q !== queue)
        : [...prev.queues, queue],
    }));
  };

  const toggleWidget = (widget) => {
    setFormData((prev) => ({
      ...prev,
      kpiWidgets: prev.kpiWidgets.includes(widget)
        ? prev.kpiWidgets.filter((w) => w !== widget)
        : [...prev.kpiWidgets, widget],
    }));
  };

  const generateUrl = () => {
    const slug = formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    setFormData((prev) => ({
      ...prev,
      publicUrl: `https://wallboard.nexus.ai/wb/${slug || "new"}`,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Wallboard Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Wallboard Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Main Operations Center"
          required
        />
      </div>

      {/* Layout Template - Visual Grid Selector */}
      <div className="space-y-2">
        <Label>Layout Template *</Label>
        <div className="grid grid-cols-3 gap-2">
          {layoutOptions.map((layout) => (
            <button
              key={layout.value}
              type="button"
              onClick={() => setFormData({ ...formData, layout: layout.value })}
              className={`p-3 rounded-lg border text-center transition-colors ${
                formData.layout === layout.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-muted"
              }`}
            >
              <div className="text-lg mb-1">{layout.icon}</div>
              <div className="text-xs">{layout.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Refresh Rate */}
        <div className="space-y-2">
          <Label>Refresh Rate</Label>
          <Select
            value={formData.refreshRate}
            onValueChange={(value) => setFormData({ ...formData, refreshRate: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select rate" />
            </SelectTrigger>
            <SelectContent>
              {refreshOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Theme */}
        <div className="space-y-2">
          <Label>Theme</Label>
          <Select
            value={formData.theme}
            onValueChange={(value) => setFormData({ ...formData, theme: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Queue Assignment */}
      <div className="space-y-2">
        <Label>Queue Assignment</Label>
        <div className="flex flex-wrap gap-2">
          {queueOptions.map((queue) => (
            <button
              key={queue.value}
              type="button"
              onClick={() => toggleQueue(queue.value)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                formData.queues.includes(queue.value)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted"
              }`}
            >
              {queue.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Widgets */}
      <div className="space-y-2">
        <Label>KPI Widgets</Label>
        <div className="flex flex-wrap gap-2">
          {kpiWidgetOptions.map((widget) => (
            <button
              key={widget.value}
              type="button"
              onClick={() => toggleWidget(widget.value)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                formData.kpiWidgets.includes(widget.value)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted"
              }`}
            >
              {widget.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ticker Messages */}
      <div className="space-y-2">
        <Label htmlFor="ticker">Ticker Messages (one per line)</Label>
        <textarea
          id="ticker"
          value={formData.tickerMessages}
          onChange={(e) => setFormData({ ...formData, tickerMessages: e.target.value })}
          placeholder="Welcome to NEXUS AI&#10;SLA Target: 80%"
          rows={3}
          className="w-full px-3 py-2 border rounded-md text-sm bg-background resize-none"
        />
      </div>

      {/* Active Hours */}
      <div className="space-y-2">
        <Label>Active Hours</Label>
        <div className="flex items-center gap-2">
          <Input
            type="time"
            value={formData.activeHoursStart}
            onChange={(e) => setFormData({ ...formData, activeHoursStart: e.target.value })}
            className="w-32"
          />
          <span className="text-muted-foreground">to</span>
          <Input
            type="time"
            value={formData.activeHoursEnd}
            onChange={(e) => setFormData({ ...formData, activeHoursEnd: e.target.value })}
            className="w-32"
          />
        </div>
      </div>

      {/* Public URL */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="publicUrl">Public URL</Label>
          <Button
            type="button"
            variant="link"
            size="sm"
            className="h-auto p-0 text-xs"
            onClick={generateUrl}
          >
            Generate URL
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            id="publicUrl"
            value={formData.publicUrl}
            onChange={(e) => setFormData({ ...formData, publicUrl: e.target.value })}
            placeholder="https://wallboard.nexus.ai/wb/..."
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={copyUrl}
            disabled={!formData.publicUrl}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Access PIN */}
      <div className="space-y-2">
        <Label htmlFor="accessPin">Access PIN</Label>
        <Input
          id="accessPin"
          type="password"
          value={formData.accessPin}
          onChange={(e) => setFormData({ ...formData, accessPin: e.target.value })}
          placeholder="4-digit PIN"
          maxLength={8}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          {wallboard ? "Update Wallboard" : "Create Wallboard"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function WallboardManager() {
  const [wallboards, setWallboards] = useState(mockWallboards);
  const [editingWallboard, setEditingWallboard] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (wallboardData) => {
    if (editingWallboard) {
      setWallboards((prev) =>
        prev.map((wb) => (wb.id === wallboardData.id ? wallboardData : wb))
      );
    } else {
      setWallboards((prev) => [...prev, wallboardData]);
    }
    setEditingWallboard(null);
    setIsCreating(false);
  };

  const handleDelete = (id) => {
    setWallboards((prev) => prev.filter((wb) => wb.id !== id));
  };

  const toggleActive = (id) => {
    setWallboards((prev) =>
      prev.map((wb) => (wb.id === id ? { ...wb, isActive: !wb.isActive } : wb))
    );
  };

  if (isCreating || editingWallboard) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {editingWallboard ? "Edit Wallboard" : "Create Wallboard"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WallboardForm
            wallboard={editingWallboard}
            onSave={handleSave}
            onCancel={() => {
              setEditingWallboard(null);
              setIsCreating(false);
            }}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Wallboard & Display Manager
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {wallboards.filter((wb) => wb.isActive).length} active of {wallboards.length} wallboards
            </p>
          </div>
          <Button size="sm" onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-1" />
            New Wallboard
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {wallboards.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <LayoutGrid className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No wallboards configured</p>
              <Button
                variant="link"
                onClick={() => setIsCreating(true)}
                className="mt-1"
              >
                Create your first wallboard
              </Button>
            </div>
          ) : (
            wallboards.map((wallboard) => {
              const layout = layoutOptions.find((l) => l.value === wallboard.layout);

              return (
                <div
                  key={wallboard.id}
                  className={`p-4 rounded-lg border ${
                    wallboard.isActive ? "bg-card" : "bg-muted/50 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Monitor className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{wallboard.name}</p>
                          <Badge
                            variant={wallboard.isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {wallboard.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {layout?.label || wallboard.layout}
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {wallboard.theme}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {wallboard.refreshRate}s refresh
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {wallboard.queues.map((queue) => (
                            <Badge
                              key={queue}
                              variant="secondary"
                              className="text-xs"
                            >
                              {queue}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-xs text-muted-foreground mt-2">
                          {wallboard.kpiWidgets.length} widgets •{" "}
                          {wallboard.activeHours.start}-{wallboard.activeHours.end}
                        </p>

                        {wallboard.publicUrl && (
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <ExternalLink className="h-3 w-3" />
                            <span className="truncate max-w-[200px]">
                              {wallboard.publicUrl}
                            </span>
                            {wallboard.accessPin && (
                              <Badge variant="outline" className="text-xs">
                                <Lock className="h-3 w-3 mr-1 inline" />
                                PIN protected
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => toggleActive(wallboard.id)}
                        title={wallboard.isActive ? "Deactivate" : "Activate"}
                      >
                        <Eye
                          className={`h-4 w-4 ${
                            wallboard.isActive
                              ? "text-green-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => setEditingWallboard(wallboard)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(wallboard.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
