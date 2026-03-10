"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  GitBranch,
  Plus,
  Play,
  Pause,
  Copy,
  Trash2,
  Phone,
  Users,
  Clock,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Volume2,
  Settings,
  Workflow
} from "lucide-react";

// Mock IVR flows data
const initialFlows = [
  {
    id: "flow-001",
    name: "Main Customer Service",
    description: "Primary inbound routing for customer support",
    status: "active",
    nodes: 15,
    callsHandled: 45230,
    avgHandlingTime: "2:34",
    successRate: 94.2,
    lastModified: "2024-01-15",
  },
  {
    id: "flow-002",
    name: "Sales Hotline",
    description: "Direct routing to sales team with qualification",
    status: "active",
    nodes: 12,
    callsHandled: 12840,
    avgHandlingTime: "1:45",
    successRate: 89.5,
    lastModified: "2024-01-12",
  },
  {
    id: "flow-003",
    name: "Technical Support",
    description: "Tiered technical support IVR with ticket creation",
    status: "active",
    nodes: 18,
    callsHandled: 8920,
    avgHandlingTime: "4:12",
    successRate: 87.3,
    lastModified: "2024-01-10",
  },
  {
    id: "flow-004",
    name: "After Hours Support",
    description: "Emergency routing and voicemail for off-hours",
    status: "paused",
    nodes: 8,
    callsHandled: 2340,
    avgHandlingTime: "0:45",
    successRate: 78.2,
    lastModified: "2024-01-08",
  },
  {
    id: "flow-005",
    name: "Billing Inquiries",
    description: "Automated billing FAQ with live agent transfer",
    status: "draft",
    nodes: 10,
    callsHandled: 0,
    avgHandlingTime: "-",
    successRate: 0,
    lastModified: "2024-01-18",
  },
];

// Node types available in IVR builder
const nodeTypes = [
  { type: "greeting", label: "Play Greeting", icon: Volume2, description: "Play audio message or TTS" },
  { type: "menu", label: "Menu", icon: Menu, description: "DTMF key selection" },
  { type: "transfer", label: "Transfer", icon: Phone, description: "Transfer to queue/agent" },
  { type: "voicemail", label: "Voicemail", icon: MessageSquare, description: "Collect voicemail" },
  { type: "queue", label: "Queue", icon: Users, description: "Add to queue" },
  { type: "schedule", label: "Schedule", icon: Clock, description: "Time-based routing" },
  { type: "condition", label: "Condition", icon: GitBranch, description: "Conditional logic" },
  { type: "api", label: "API Call", icon: Settings, description: "External API integration" },
];

export default function IVRBuilderPage() {
  const [flows, setFlows] = useState(initialFlows);
  const [selectedFlow, setSelectedFlow] = useState(initialFlows[0]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newFlow, setNewFlow] = useState({
    name: "",
    description: "",
    type: "standard",
  });
  const [selectedNode, setSelectedNode] = useState(null);

  const handleCreateFlow = () => {
    const flow = {
      id: `flow-${Date.now()}`,
      name: newFlow.name,
      description: newFlow.description,
      status: "draft",
      nodes: 0,
      callsHandled: 0,
      avgHandlingTime: "-",
      successRate: 0,
      lastModified: new Date().toISOString().split("T")[0],
    };
    setFlows([...flows, flow]);
    setSelectedFlow(flow);
    setIsCreateOpen(false);
    setNewFlow({ name: "", description: "", type: "standard" });
    toast.success("IVR flow created successfully");
  };

  const handleToggleStatus = (flow) => {
    setFlows(prev => prev.map(f =>
      f.id === flow.id
        ? { ...f, status: f.status === "active" ? "paused" : "active" }
        : f
    ));
    toast.success(`Flow ${flow.status === "active" ? "paused" : "activated"} successfully`);
  };

  const handleDuplicate = (flow) => {
    const duplicate = {
      ...flow,
      id: `flow-${Date.now()}`,
      name: `${flow.name} (Copy)`,
      status: "draft",
      callsHandled: 0,
      successRate: 0,
      lastModified: new Date().toISOString().split("T")[0],
    };
    setFlows([...flows, duplicate]);
    toast.success("Flow duplicated successfully");
  };

  const handleDelete = (flow) => {
    setFlows(prev => prev.filter(f => f.id !== flow.id));
    if (selectedFlow?.id === flow.id) setSelectedFlow(flows[0]);
    toast.success("Flow deleted successfully");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-500 text-white";
      case "paused": return "bg-yellow-500 text-white";
      case "draft": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">IVR Flow Designer</h2>
          <p className="text-sm text-muted-foreground">Create and manage interactive voice response flows</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New IVR Flow
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New IVR Flow</DialogTitle>
              <DialogDescription>Define a new interactive voice response flow</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Flow Name *</Label>
                <Input
                  id="name"
                  placeholder="Customer Support Main"
                  value={newFlow.name}
                  onChange={(e) => setNewFlow({ ...newFlow, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Primary inbound routing for support"
                  value={newFlow.description}
                  onChange={(e) => setNewFlow({ ...newFlow, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Flow Type</Label>
                <Select value={newFlow.type} onValueChange={(v) => setNewFlow({ ...newFlow, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="survey">Survey</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateFlow}>Create Flow</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="flows" className="w-full">
        <TabsList>
          <TabsTrigger value="flows">Flow List</TabsTrigger>
          <TabsTrigger value="designer">Flow Designer</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="flows" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flow Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Nodes</TableHead>
                    <TableHead>Calls Handled</TableHead>
                    <TableHead>Avg Time</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flows.map((flow) => (
                    <TableRow
                      key={flow.id}
                      className={cn(selectedFlow?.id === flow.id && "bg-muted/50")}
                      onClick={() => setSelectedFlow(flow)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{flow.name}</p>
                          <p className="text-xs text-muted-foreground">{flow.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(flow.status)}>{flow.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{flow.nodes}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{flow.callsHandled.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{flow.avgHandlingTime}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={flow.successRate} className="h-2 w-16" />
                          <span className="text-sm font-medium">{flow.successRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {flow.status !== "draft" && (
                            <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleToggleStatus(flow); }}>
                              {flow.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                          )}
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDuplicate(flow); }}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDelete(flow); }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="designer" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Node Palette */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Node Palette</CardTitle>
                <CardDescription>Drag nodes to build your flow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {nodeTypes.map((node) => (
                  <div
                    key={node.type}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <node.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{node.label}</p>
                      <p className="text-xs text-muted-foreground">{node.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Canvas */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Flow Canvas</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ZoomIn className="h-4 w-4 mr-1" /> Zoom In
                    </Button>
                    <Button variant="outline" size="sm">
                      <ZoomOut className="h-4 w-4 mr-1" /> Zoom Out
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-125 bg-grid-pattern rounded-lg border-2 border-dashed flex items-center justify-center">
                  <div className="text-center">
                    <Workflow className="h-16 w-16 mx-auto text-muted-foreground/50" />
                    <p className="text-muted-foreground mt-4">Select a flow to edit</p>
                    <p className="text-sm text-muted-foreground/70">Or create a new flow to get started</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Properties Panel */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Properties</CardTitle>
                <CardDescription>Configure selected node</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedNode ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Node Type</Label>
                      <Input value={selectedNode.type} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Label</Label>
                      <Input value={selectedNode.label} onChange={(e) => setSelectedNode({ ...selectedNode, label: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Audio File</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select audio" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome">welcome.mp3</SelectItem>
                          <SelectItem value="menu">main_menu.mp3</SelectItem>
                          <SelectItem value="hours">business_hours.mp3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Enable TTS Fallback</Label>
                      <Switch />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Settings className="h-12 w-12 mx-auto text-muted-foreground/30" />
                    <p className="text-muted-foreground mt-4">Select a node to view properties</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Total Calls</p>
                    <p className="text-2xl font-black">69,330</p>
                  </div>
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Avg. Handling Time</p>
                    <p className="text-2xl font-black">2:45</p>
                  </div>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Success Rate</p>
                    <p className="text-2xl font-black text-green-500">91.2%</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Transfer Rate</p>
                    <p className="text-2xl font-black text-yellow-500">18.3%</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Flow Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flow</TableHead>
                    <TableHead>Calls</TableHead>
                    <TableHead>Avg Time</TableHead>
                    <TableHead>Success</TableHead>
                    <TableHead>Transfers</TableHead>
                    <TableHead>Abandon</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flows.filter(f => f.status !== "draft").map((flow) => (
                    <TableRow key={flow.id}>
                      <TableCell className="font-medium">{flow.name}</TableCell>
                      <TableCell>{flow.callsHandled.toLocaleString()}</TableCell>
                      <TableCell>{flow.avgHandlingTime}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">{flow.successRate}%</Badge>
                      </TableCell>
                      <TableCell>{Math.round(flow.callsHandled * 0.18).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-red-500">{Math.round(flow.callsHandled * 0.05).toLocaleString()}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ZoomIn(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" x2="16.65" y1="21" y2="16.65"/>
      <line x1="11" x2="11" y1="8" y2="14"/>
      <line x1="8" x2="14" y1="11" y2="11"/>
    </svg>
  )
}

function ZoomOut(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" x2="16.65" y1="21" y2="16.65"/>
      <line x1="8" x2="14" y1="11" y2="11"/>
    </svg>
  )
}

function Menu(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="6" y2="6"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  )
}
