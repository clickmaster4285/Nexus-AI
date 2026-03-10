"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Route,
  Plus,
  Play,
  Pause,
  Copy,
  Trash2,
  Edit,
  Phone,
  Clock,
  BarChart3,
  ArrowRight,
  Globe,
  Users,
  Filter,
  ChevronRight,
  Settings
} from "lucide-react";

// Mock routing rules data
const initialRules = [
  {
    id: "rule-001",
    name: "Business Hours - Sales",
    description: "Route to sales during business hours",
    priority: 1,
    status: "active",
    type: "time-based",
    conditions: ["Time: 9AM-6PM", "Day: Mon-Fri"],
    target: "Sales Inbound Queue",
    matches: 8450,
    successRate: 98.2,
  },
  {
    id: "rule-002",
    name: "VIP Customers",
    description: "Priority routing for VIP customers",
    priority: 2,
    status: "active",
    type: "caller-id",
    conditions: ["Caller: VIP List", "Priority: High"],
    target: "VIP Support Queue",
    matches: 2340,
    successRate: 99.1,
  },
  {
    id: "rule-003",
    name: "Area Code 415",
    description: "Route Bay Area callers to local team",
    priority: 3,
    status: "active",
    type: "ani",
    conditions: ["ANI: 415***", "Location: Bay Area"],
    target: "Bay Area Sales",
    matches: 1890,
    successRate: 96.5,
  },
  {
    id: "rule-004",
    name: "New Customer Welcome",
    description: "Route new customers to onboarding",
    priority: 4,
    status: "active",
    type: "custom",
    conditions: ["Customer Type: New", "Account Age: <30 days"],
    target: "Onboarding Queue",
    matches: 560,
    successRate: 94.3,
  },
  {
    id: "rule-005",
    name: "Spanish Speaking",
    description: "Route Spanish callers to bilingual agents",
    priority: 5,
    status: "active",
    type: "language",
    conditions: ["Language: Spanish", "Skill: Bilingual"],
    target: "Spanish Support",
    matches: 1230,
    successRate: 97.8,
  },
  {
    id: "rule-006",
    name: "After Hours Emergency",
    description: "Emergency routing for after hours",
    priority: 0,
    status: "paused",
    type: "time-based",
    conditions: ["Time: 6PM-9AM", "Day: Mon-Sun"],
    target: "Emergency Line",
    matches: 0,
    successRate: 0,
  },
];

const ruleTypes = [
  { id: "time-based", label: "Time-Based", icon: Clock },
  { id: "caller-id", label: "Caller ID", icon: Phone },
  { id: "ani", label: "ANI/Phone Number", icon: Globe },
  { id: "language", label: "Language", icon: Users },
  { id: "custom", label: "Custom", icon: Filter },
];

const targetTypes = [
  { id: "queue", label: "Queue" },
  { id: "agent", label: "Specific Agent" },
  { id: "voicemail", label: "Voicemail" },
  { id: "external", label: "External Number" },
  { id: "ivr", label: "IVR Flow" },
];

export default function RoutingRulesPage() {
  const [rules, setRules] = useState(initialRules);
  const [selectedRule, setSelectedRule] = useState(initialRules[0]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    priority: 5,
    type: "time-based",
    conditions: [""],
    targetType: "queue",
    target: "",
  });
  const [editingRule, setEditingRule] = useState(null);

  const handleCreateRule = () => {
    const rule = {
      id: `rule-${Date.now()}`,
      ...newRule,
      status: "active",
      matches: 0,
      successRate: 0,
    };
    setRules([...rules, rule]);
    setSelectedRule(rule);
    setIsCreateOpen(false);
    setNewRule({ name: "", description: "", priority: 5, type: "time-based", conditions: [""], targetType: "queue", target: "" });
    toast.success("Routing rule created successfully");
  };

  const handleEditRule = () => {
    setRules(prev => prev.map(r => r.id === editingRule.id ? editingRule : r));
    setSelectedRule(editingRule);
    setIsEditOpen(false);
    setEditingRule(null);
    toast.success("Routing rule updated successfully");
  };

  const handleToggleStatus = (rule) => {
    setRules(prev => prev.map(r =>
      r.id === rule.id
        ? { ...r, status: r.status === "active" ? "paused" : "active" }
        : r
    ));
    toast.success(`Rule ${rule.status === "active" ? "paused" : "activated"} successfully`);
  };

  const handleDuplicate = (rule) => {
    const duplicate = {
      ...rule,
      id: `rule-${Date.now()}`,
      name: `${rule.name} (Copy)`,
      status: "draft",
      matches: 0,
      successRate: 0,
    };
    setRules([...rules, duplicate]);
    toast.success("Rule duplicated successfully");
  };

  const handleDelete = (rule) => {
    setRules(prev => prev.filter(r => r.id !== rule.id));
    if (selectedRule?.id === rule.id) setSelectedRule(rules[0]);
    toast.success("Routing rule deleted successfully");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-500 text-white";
      case "paused": return "bg-yellow-500 text-white";
      case "draft": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTypeIcon = (type) => {
    const typeInfo = ruleTypes.find(t => t.id === type);
    return typeInfo ? typeInfo.icon : Route;
  };

  const addCondition = () => {
    setNewRule(prev => ({ ...prev, conditions: [...prev.conditions, ""] }));
  };

  const updateCondition = (index, value) => {
    setNewRule(prev => ({
      ...prev,
      conditions: prev.conditions.map((c, i) => i === index ? value : c)
    }));
  };

  const removeCondition = (index) => {
    setNewRule(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Routing Rules Engine</h2>
          <p className="text-sm text-muted-foreground">Create and manage intelligent call routing rules</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Routing Rule</DialogTitle>
              <DialogDescription>Define conditions and routing logic for incoming calls</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Rule Name *</Label>
                  <Input
                    id="name"
                    placeholder="Business Hours Routing"
                    value={newRule.name}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={String(newRule.priority)} onValueChange={(v) => setNewRule({ ...newRule, priority: parseInt(v) })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 (Highest)</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Route calls based on business hours"
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Rule Type</Label>
                <Select value={newRule.type} onValueChange={(v) => setNewRule({ ...newRule, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ruleTypes.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Conditions</Label>
                <div className="space-y-2">
                  {newRule.conditions.map((condition, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="e.g., Time: 9AM-6PM"
                        value={condition}
                        onChange={(e) => updateCondition(index, e.target.value)}
                      />
                      {newRule.conditions.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeCondition(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addCondition} className="mt-2">
                    <Plus className="h-4 w-4 mr-1" /> Add Condition
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Type</Label>
                  <Select value={newRule.targetType} onValueChange={(v) => setNewRule({ ...newRule, targetType: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {targetTypes.map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Target</Label>
                  <Select value={newRule.target} onValueChange={(v) => setNewRule({ ...newRule, target: v })}>
                    <SelectTrigger><SelectValue placeholder="Select target" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Inbound Queue</SelectItem>
                      <SelectItem value="support">Customer Support Queue</SelectItem>
                      <SelectItem value="vip">VIP Support Queue</SelectItem>
                      <SelectItem value="billing">Billing Queue</SelectItem>
                      <SelectItem value="spanish">Spanish Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateRule}>Create Rule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Total Rules</p>
                <p className="text-2xl font-black">{rules.length}</p>
              </div>
              <Route className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Active Rules</p>
                <p className="text-2xl font-black text-green-500">{rules.filter(r => r.status === "active").length}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Total Matches</p>
                <p className="text-2xl font-black">{rules.reduce((sum, r) => sum + r.matches, 0).toLocaleString()}</p>
              </div>
              <Phone className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Avg Success</p>
                <p className="text-2xl font-black text-green-500">
                  {(rules.reduce((sum, r) => sum + r.successRate, 0) / rules.filter(r => r.status === "active").length).toFixed(1)}%
                </p>
              </div>
              <BarChart3 className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="w-full">
        <TabsList>
          <TabsTrigger value="rules">Rule List</TabsTrigger>
          <TabsTrigger value="designer">Rule Designer</TabsTrigger>
          <TabsTrigger value="test">Test Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Priority</TableHead>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Conditions</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Matches</TableHead>
                    <TableHead>Success</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.sort((a, b) => a.priority - b.priority).map((rule) => {
                    const TypeIcon = getTypeIcon(rule.type);
                    return (
                      <TableRow
                        key={rule.id}
                        className={cn(selectedRule?.id === rule.id && "bg-muted/50")}
                        onClick={() => setSelectedRule(rule)}
                      >
                        <TableCell>
                          <Badge variant="outline">{rule.priority}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{rule.name}</p>
                            <p className="text-xs text-muted-foreground">{rule.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <TypeIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="capitalize">{rule.type.replace("-", " ")}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(rule.status)}>{rule.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {rule.conditions.slice(0, 2).map((c, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{c}</Badge>
                            ))}
                            {rule.conditions.length > 2 && (
                              <Badge variant="outline" className="text-xs">+{rule.conditions.length - 2}</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{rule.target}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{rule.matches.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={rule.successRate} className="h-2 w-12" />
                            <span className="text-sm font-medium">{rule.successRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingRule(rule);
                                setIsEditOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleToggleStatus(rule); }}>
                              {rule.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDuplicate(rule); }}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDelete(rule); }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="designer" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Rule Flow Visualization */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Routing Flow</CardTitle>
                <CardDescription>Visual representation of rule priority and execution order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rules.sort((a, b) => a.priority - b.priority).map((rule, index) => {
                    const TypeIcon = getTypeIcon(rule.type);
                    return (
                      <div key={rule.id} className="flex items-center gap-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                          rule.status === "active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                        )}>
                          {rule.priority}
                        </div>
                        <div className="flex-1 flex items-center gap-3 p-3 rounded-lg border bg-background">
                          <TypeIcon className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{rule.name}</span>
                              <Badge className={getStatusColor(rule.status)}>{rule.status}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">→ {rule.target}</p>
                          </div>
                          {index < rules.length - 1 && (
                            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Rule Details */}
            <Card>
              <CardHeader>
                <CardTitle>Rule Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedRule ? (
                  <>
                    <div className="space-y-2">
                      <Label>Rule Name</Label>
                      <Input value={selectedRule.name} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select defaultValue={selectedRule.type}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {ruleTypes.map(t => (
                            <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select defaultValue={String(selectedRule.priority)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 (Highest)</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" /> Advanced Settings
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Select a rule to view details</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="test" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Input</CardTitle>
                <CardDescription>Enter call details to test routing rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Caller Phone Number</Label>
                  <Input placeholder="+1-555-0100" />
                </div>
                <div className="space-y-2">
                  <Label>Caller ID Name</Label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time of Call</Label>
                    <Input type="time" defaultValue="14:30" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Customer Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Customer</SelectItem>
                      <SelectItem value="existing">Existing Customer</SelectItem>
                      <SelectItem value="vip">VIP Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full mt-4">
                  <Phone className="h-4 w-4 mr-2" /> Test Routing
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>See which rules would match this call</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Phone className="h-16 w-16 mx-auto text-muted-foreground/30" />
                  <p className="text-muted-foreground mt-4">Enter test parameters and run the test</p>
                  <p className="text-sm text-muted-foreground/70">Results will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Rule Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Routing Rule</DialogTitle>
            <DialogDescription>Update rule configuration</DialogDescription>
          </DialogHeader>
          {editingRule && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rule Name</Label>
                  <Input
                    value={editingRule.name}
                    onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={String(editingRule.priority)}
                    onValueChange={(v) => setEditingRule({ ...editingRule, priority: parseInt(v) })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 (Highest)</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={editingRule.description}
                  onChange={(e) => setEditingRule({ ...editingRule, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rule Type</Label>
                  <Select
                    value={editingRule.type}
                    onValueChange={(v) => setEditingRule({ ...editingRule, type: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ruleTypes.map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Target</Label>
                  <Select defaultValue="sales">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Inbound Queue</SelectItem>
                      <SelectItem value="support">Customer Support Queue</SelectItem>
                      <SelectItem value="vip">VIP Support Queue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsEditOpen(false); setEditingRule(null); }}>Cancel</Button>
            <Button onClick={handleEditRule}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
