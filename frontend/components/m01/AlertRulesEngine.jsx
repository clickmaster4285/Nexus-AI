"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Bell, Trash2, Edit2, AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";

const mockRules = [
  {
    id: "RULE001",
    name: "SLA Breach Alert",
    description: "Trigger when queue SLA drops below threshold",
    metric: "sla_percentage",
    thresholdType: "less_than",
    thresholdValue: 80,
    severity: "critical",
    channels: ["email", "sms"],
    recipients: ["supervisor", "manager"],
    autoAcknowledge: false,
    cooldownMinutes: 15,
    active: true,
  },
  {
    id: "RULE002",
    name: "Long Wait Time",
    description: "Alert when customer wait exceeds limit",
    metric: "wait_time",
    thresholdType: "greater_than",
    thresholdValue: 300,
    severity: "high",
    channels: ["in_app", "email"],
    recipients: ["supervisor"],
    autoAcknowledge: false,
    cooldownMinutes: 5,
    active: true,
  },
  {
    id: "RULE003",
    name: "Low Sentiment",
    description: "Alert on negative sentiment calls",
    metric: "sentiment_score",
    thresholdType: "less_than",
    thresholdValue: 40,
    severity: "medium",
    channels: ["in_app"],
    recipients: ["qa_team"],
    autoAcknowledge: true,
    cooldownMinutes: 30,
    active: true,
  },
];

const severityConfig = {
  critical: { color: "bg-red-500", icon: AlertCircle, label: "Critical" },
  high: { color: "bg-orange-500", icon: AlertTriangle, label: "High" },
  medium: { color: "bg-yellow-500", icon: Bell, label: "Medium" },
  low: { color: "bg-blue-500", icon: Info, label: "Low" },
  info: { color: "bg-gray-500", icon: CheckCircle, label: "Info" },
};

const metrics = [
  { value: "sla_percentage", label: "SLA Percentage" },
  { value: "wait_time", label: "Wait Time (seconds)" },
  { value: "sentiment_score", label: "Sentiment Score" },
  { value: "abandonment_rate", label: "Abandonment Rate" },
  { value: "queue_depth", label: "Queue Depth" },
  { value: "agent_availability", label: "Agent Availability" },
  { value: "escalation_risk", label: "Escalation Risk" },
  { value: "aht", label: "Average Handle Time" },
];

const thresholdTypes = [
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
];

const notificationChannels = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "in_app", label: "In-App Notification" },
  { value: "slack", label: "Slack" },
  { value: "teams", label: "Microsoft Teams" },
];

const recipientGroups = [
  { value: "supervisor", label: "Supervisor" },
  { value: "manager", label: "Manager" },
  { value: "qa_team", label: "QA Team" },
  { value: "agents", label: "All Agents" },
  { value: "admin", label: "Admin" },
];

function AlertRuleForm({ rule, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: rule?.name || "",
    description: rule?.description || "",
    metric: rule?.metric || "",
    thresholdType: rule?.thresholdType || "greater_than",
    thresholdValue: rule?.thresholdValue || 50,
    severity: rule?.severity || "medium",
    channels: rule?.channels || ["in_app"],
    recipients: rule?.recipients || ["supervisor"],
    autoAcknowledge: rule?.autoAcknowledge || false,
    cooldownMinutes: rule?.cooldownMinutes || 15,
    active: rule?.active ?? true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: rule?.id || `RULE${Date.now()}` });
  };

  const toggleChannel = (channel) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  const toggleRecipient = (recipient) => {
    setFormData((prev) => ({
      ...prev,
      recipients: prev.recipients.includes(recipient)
        ? prev.recipients.filter((r) => r !== recipient)
        : [...prev.recipients, recipient],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {/* Rule Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Rule Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., SLA Breach Alert"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe when this alert should trigger"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Metric */}
        <div className="space-y-2">
          <Label>Metric *</Label>
          <Select
            value={formData.metric}
            onValueChange={(value) => setFormData({ ...formData, metric: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Severity */}
        <div className="space-y-2">
          <Label>Severity *</Label>
          <Select
            value={formData.severity}
            onValueChange={(value) => setFormData({ ...formData, severity: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(severityConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <config.icon className="h-3 w-3" />
                    {config.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Threshold Type */}
        <div className="space-y-2">
          <Label>Threshold Type *</Label>
          <Select
            value={formData.thresholdType}
            onValueChange={(value) => setFormData({ ...formData, thresholdType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {thresholdTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Threshold Value */}
        <div className="space-y-2">
          <Label>Threshold Value *</Label>
          <Input
            type="number"
            value={formData.thresholdValue}
            onChange={(e) => setFormData({ ...formData, thresholdValue: parseInt(e.target.value) || 0 })}
            required
          />
        </div>
      </div>

      {/* Notification Channels */}
      <div className="space-y-2">
        <Label>Notification Channels *</Label>
        <div className="flex flex-wrap gap-2">
          {notificationChannels.map((channel) => (
            <button
              key={channel.value}
              type="button"
              onClick={() => toggleChannel(channel.value)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                formData.channels.includes(channel.value)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted"
              }`}
            >
              {channel.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipients */}
      <div className="space-y-2">
        <Label>Recipient Groups *</Label>
        <div className="flex flex-wrap gap-2">
          {recipientGroups.map((group) => (
            <button
              key={group.value}
              type="button"
              onClick={() => toggleRecipient(group.value)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                formData.recipients.includes(group.value)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Cooldown Period */}
        <div className="space-y-2">
          <Label>Cooldown Period (minutes)</Label>
          <div className="flex items-center gap-3">
            <Slider
              value={[formData.cooldownMinutes]}
              onValueChange={([value]) => setFormData({ ...formData, cooldownMinutes: value })}
              max={60}
              min={1}
              step={1}
              className="flex-1"
            />
            <span className="text-sm font-medium w-12">{formData.cooldownMinutes}m</span>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="autoAcknowledge" className="cursor-pointer">Auto-Acknowledge</Label>
            <Switch
              id="autoAcknowledge"
              checked={formData.autoAcknowledge}
              onCheckedChange={(checked) => setFormData({ ...formData, autoAcknowledge: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="active" className="cursor-pointer">Rule Active</Label>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          {rule ? "Update Rule" : "Create Rule"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function AlertRulesEngine() {
  const [rules, setRules] = useState(mockRules);
  const [editingRule, setEditingRule] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (ruleData) => {
    if (editingRule) {
      setRules((prev) => prev.map((r) => (r.id === ruleData.id ? ruleData : r)));
    } else {
      setRules((prev) => [...prev, ruleData]);
    }
    setEditingRule(null);
    setIsDialogOpen(false);
  };

  const handleDelete = (id) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const openNewRule = () => {
    setEditingRule(null);
    setIsDialogOpen(true);
  };

  const openEditRule = (rule) => {
    setEditingRule(rule);
    setIsDialogOpen(true);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Alert Rules Engine</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {rules.filter((r) => r.active).length} active of {rules.length} rules
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={openNewRule}>
                <Plus className="h-4 w-4 mr-1" />
                New Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingRule ? "Edit Alert Rule" : "Create Alert Rule"}</DialogTitle>
              </DialogHeader>
              <AlertRuleForm
                rule={editingRule}
                onSave={handleSave}
                onCancel={() => {
                  setEditingRule(null);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {rules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No alert rules configured</p>
              <Button variant="link" onClick={openNewRule} className="mt-1">
                Create your first rule
              </Button>
            </div>
          ) : (
            rules.map((rule) => {
              const config = severityConfig[rule.severity];
              const Icon = config.icon;

              return (
                <div
                  key={rule.id}
                  className={`p-3 rounded-lg border ${
                    rule.active ? "bg-card" : "bg-muted/50 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${config.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{rule.name}</p>
                        <Badge variant={rule.active ? "default" : "secondary"} className="text-xs">
                          {rule.active ? "Active" : "Inactive"}
                        </Badge>
                        <Badge className={`${config.color} text-white text-xs`}>
                          {config.label}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground mt-1">
                        {rule.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {metrics.find((m) => m.value === rule.metric)?.label || rule.metric}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {thresholdTypes.find((t) => t.value === rule.thresholdType)?.label}{" "}
                          {rule.thresholdValue}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rule.cooldownMinutes}m cooldown
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {rule.channels.map((ch) => (
                          <Badge key={ch} variant="secondary" className="text-xs capitalize">
                            {ch.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => openEditRule(rule)}
                        >
                          <Edit2 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(rule.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
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
