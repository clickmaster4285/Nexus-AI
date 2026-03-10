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
import { Slider } from "@/components/ui/slider";
import {
  ListOrdered,
  Plus,
  Play,
  Pause,
  Trash2,
  Edit,
  Users,
  Clock,
  CheckCircle,
  Target
} from "lucide-react";

// Mock queue data
const initialQueues = [
  {
    id: "q-001",
    name: "Sales Inbound",
    priority: 1,
    status: "active",
    strategy: "skill-based",
    agents: 15,
    available: 8,
    waiting: 12,
    avgWaitTime: "0:45",
    longestWait: "2:34",
    sla: 85,
    serviceLevel: 92,
    callsToday: 3240,
  },
  {
    id: "q-002",
    name: "Customer Support",
    priority: 2,
    status: "active",
    strategy: "longest-idle",
    agents: 25,
    available: 18,
    waiting: 8,
    avgWaitTime: "0:32",
    longestWait: "1:45",
    sla: 90,
    serviceLevel: 88,
    callsToday: 5620,
  },
  {
    id: "q-003",
    name: "Technical Support",
    priority: 3,
    status: "active",
    strategy: "skill-based",
    agents: 12,
    available: 6,
    waiting: 5,
    avgWaitTime: "1:12",
    longestWait: "3:45",
    sla: 80,
    serviceLevel: 76,
    callsToday: 1890,
  },
  {
    id: "q-004",
    name: "Billing",
    priority: 4,
    status: "active",
    strategy: "priority",
    agents: 8,
    available: 4,
    waiting: 3,
    avgWaitTime: "0:28",
    longestWait: "1:12",
    sla: 85,
    serviceLevel: 94,
    callsToday: 1240,
  },
  {
    id: "q-005",
    name: "VIP Support",
    priority: 0,
    status: "active",
    strategy: "vip-first",
    agents: 5,
    available: 3,
    waiting: 1,
    avgWaitTime: "0:15",
    longestWait: "0:45",
    sla: 95,
    serviceLevel: 98,
    callsToday: 340,
  },
  {
    id: "q-006",
    name: "After Hours",
    priority: 5,
    status: "paused",
    strategy: "round-robin",
    agents: 3,
    available: 0,
    waiting: 0,
    avgWaitTime: "-",
    longestWait: "-",
    sla: 70,
    serviceLevel: 0,
    callsToday: 120,
  },
];

const routingStrategies = [
  { id: "skill-based", label: "Skill-Based Routing" },
  { id: "longest-idle", label: "Longest Idle Agent" },
  { id: "priority", label: "Priority Based" },
  { id: "vip-first", label: "VIP First" },
  { id: "round-robin", label: "Round Robin" },
  { id: "least-cost", label: "Least Cost Routing" },
];

export default function QueueConfigPage() {
  const [queues, setQueues] = useState(initialQueues);
  const [selectedQueue, setSelectedQueue] = useState(initialQueues[0]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newQueue, setNewQueue] = useState({
    name: "",
    priority: 5,
    strategy: "skill-based",
    maxWaitTime: 120,
    sla: 80,
  });
  const [editingQueue, setEditingQueue] = useState(null);

  const handleCreateQueue = () => {
    const queue = {
      id: `q-${Date.now()}`,
      ...newQueue,
      status: "active",
      agents: 0,
      available: 0,
      waiting: 0,
      avgWaitTime: "-",
      longestWait: "-",
      serviceLevel: 0,
      callsToday: 0,
    };
    setQueues([...queues, queue]);
    setSelectedQueue(queue);
    setIsCreateOpen(false);
    setNewQueue({ name: "", priority: 5, strategy: "skill-based", maxWaitTime: 120, sla: 80 });
    toast.success("Queue created successfully");
  };

  const handleEditQueue = () => {
    setQueues(prev => prev.map(q => q.id === editingQueue.id ? editingQueue : q));
    setSelectedQueue(editingQueue);
    setIsEditOpen(false);
    setEditingQueue(null);
    toast.success("Queue updated successfully");
  };

  const handleToggleStatus = (queue) => {
    setQueues(prev => prev.map(q =>
      q.id === queue.id
        ? { ...q, status: q.status === "active" ? "paused" : "active" }
        : q
    ));
    toast.success(`Queue ${queue.status === "active" ? "paused" : "activated"} successfully`);
  };

  const handleDelete = (queue) => {
    setQueues(prev => prev.filter(q => q.id !== queue.id));
    if (selectedQueue?.id === queue.id) setSelectedQueue(queues[0]);
    toast.success("Queue deleted successfully");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-500 text-white";
      case "paused": return "bg-yellow-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getSlaColor = (sla) => {
    if (sla >= 90) return "text-green-500";
    if (sla >= 80) return "text-yellow-500";
    return "text-red-500";
  };

  const totalAgents = queues.reduce((sum, q) => sum + q.agents, 0);
  const totalAvailable = queues.reduce((sum, q) => sum + q.available, 0);
  const totalWaiting = queues.reduce((sum, q) => sum + q.waiting, 0);
  const avgSla = Math.round(queues.reduce((sum, q) => sum + q.serviceLevel, 0) / queues.length);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Queue Configuration</h2>
          <p className="text-sm text-muted-foreground">Configure call queues, routing strategies, and agent assignments</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Queue
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Queue</DialogTitle>
              <DialogDescription>Configure a new call queue for inbound routing</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Queue Name *</Label>
                <Input
                  id="name"
                  placeholder="Premium Support"
                  value={newQueue.name}
                  onChange={(e) => setNewQueue({ ...newQueue, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={String(newQueue.priority)} onValueChange={(v) => setNewQueue({ ...newQueue, priority: parseInt(v) })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 (Highest)</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5 (Lowest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Routing Strategy</Label>
                  <Select value={newQueue.strategy} onValueChange={(v) => setNewQueue({ ...newQueue, strategy: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {routingStrategies.map(s => (
                        <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Max Wait Time (sec)</Label>
                  <Input
                    type="number"
                    value={newQueue.maxWaitTime}
                    onChange={(e) => setNewQueue({ ...newQueue, maxWaitTime: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SLA Target (%)</Label>
                  <Input
                    type="number"
                    value={newQueue.sla}
                    onChange={(e) => setNewQueue({ ...newQueue, sla: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateQueue}>Create Queue</Button>
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
                <p className="text-xs text-muted-foreground uppercase">Total Agents</p>
                <p className="text-2xl font-black">{totalAgents}</p>
              </div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Available</p>
                <p className="text-2xl font-black text-green-500">{totalAvailable}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Calls Waiting</p>
                <p className="text-2xl font-black text-yellow-500">{totalWaiting}</p>
              </div>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Avg Service Level</p>
                <p className={cn("text-2xl font-black", getSlaColor(avgSla))}>{avgSla}%</p>
              </div>
              <Target className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="queues" className="w-full">
        <TabsList>
          <TabsTrigger value="queues">Queue List</TabsTrigger>
          <TabsTrigger value="settings">Queue Settings</TabsTrigger>
          <TabsTrigger value="agents">Agent Assignment</TabsTrigger>
        </TabsList>

        <TabsContent value="queues" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Queue</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Agents</TableHead>
                    <TableHead>Waiting</TableHead>
                    <TableHead>Avg Wait</TableHead>
                    <TableHead>Service Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queues.sort((a, b) => a.priority - b.priority).map((queue) => (
                    <TableRow
                      key={queue.id}
                      className={cn(selectedQueue?.id === queue.id && "bg-muted/50")}
                      onClick={() => setSelectedQueue(queue)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{queue.name}</p>
                          <p className="text-xs text-muted-foreground">{queue.callsToday.toLocaleString()} calls today</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{queue.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(queue.status)}>{queue.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm capitalize">{queue.strategy.replace("-", " ")}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{queue.available}/{queue.agents}</span>
                          <Progress value={(queue.available / queue.agents) * 100} className="h-2 w-12" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={cn("font-medium", queue.waiting > 10 && "text-red-500")}>
                          {queue.waiting}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{queue.avgWaitTime}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={queue.serviceLevel} className="h-2 w-16" />
                          <span className={cn("text-sm font-medium", getSlaColor(queue.serviceLevel))}>
                            {queue.serviceLevel}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingQueue(queue);
                              setIsEditOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleToggleStatus(queue); }}>
                            {queue.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDelete(queue); }}>
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

        <TabsContent value="settings" className="mt-4">
          {selectedQueue ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Queue Settings</CardTitle>
                  <CardDescription>Configure {selectedQueue.name} queue parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Queue Name</Label>
                      <Input value={selectedQueue.name} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select defaultValue={String(selectedQueue.priority)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 (Highest)</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5 (Lowest)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Routing Strategy</Label>
                    <Select defaultValue={selectedQueue.strategy}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {routingStrategies.map(s => (
                          <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Overflow to Voicemail</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Enable Call Recording</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Enable Whisper Coaching</Label>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SLA & Performance</CardTitle>
                  <CardDescription>Configure service level agreements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Target Service Level</Label>
                        <span className="text-sm font-medium">{selectedQueue.sla}%</span>
                      </div>
                      <Slider defaultValue={[selectedQueue.sla]} max={100} step={5} className="py-4" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Max Wait Time</Label>
                        <span className="text-sm font-medium">{selectedQueue.sla}s</span>
                      </div>
                      <Slider defaultValue={[120]} max={300} step={15} className="py-4" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Max Queue Size</Label>
                        <span className="text-sm font-medium">50</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={5} className="py-4" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <Label>Auto-Pause on SLA Breach</Label>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <ListOrdered className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <p className="text-muted-foreground mt-4">Select a queue to view settings</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="agents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Assignment</CardTitle>
              <CardDescription>Manage agent skills and queue assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Skill Level</TableHead>
                    <TableHead>Current Queue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Calls Today</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {String.fromCharCode(65 + i)}B
                          </div>
                          <span className="font-medium">Agent {i + 1}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50">Level {5 - (i % 3)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Select defaultValue={initialQueues[i % initialQueues.length].id}>
                          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {initialQueues.map(q => (
                              <SelectItem key={q.id} value={q.id}>{q.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge className={i < 6 ? "bg-green-500" : "bg-yellow-500"}>
                          {i < 6 ? "Available" : "On Call"}
                        </Badge>
                      </TableCell>
                      <TableCell>{20 + Math.floor(Math.random() * 30)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit Skills</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Queue Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Queue</DialogTitle>
            <DialogDescription>Update queue configuration</DialogDescription>
          </DialogHeader>
          {editingQueue && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Queue Name</Label>
                <Input
                  value={editingQueue.name}
                  onChange={(e) => setEditingQueue({ ...editingQueue, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={String(editingQueue.priority)}
                    onValueChange={(v) => setEditingQueue({ ...editingQueue, priority: parseInt(v) })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 (Highest)</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5 (Lowest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Routing Strategy</Label>
                  <Select
                    value={editingQueue.strategy}
                    onValueChange={(v) => setEditingQueue({ ...editingQueue, strategy: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {routingStrategies.map(s => (
                        <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsEditOpen(false); setEditingQueue(null); }}>Cancel</Button>
            <Button onClick={handleEditQueue}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
