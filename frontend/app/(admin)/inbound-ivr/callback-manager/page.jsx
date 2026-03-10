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
  PhoneCall,
  Plus,
  Trash2,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Timer,
  TrendingUp,
  TrendingDown,
  Settings,
} from "lucide-react";

// Mock callback data
const initialCallbacks = [
  {
    id: "cb-001",
    customerName: "John Smith",
    phoneNumber: "+1-555-0123",
    queue: "Sales Inbound",
    scheduledTime: "2024-01-20 14:30",
    status: "scheduled",
    waitTime: 45,
    attempts: 1,
    reason: "Customer requested callback",
    notes: "Interested in premium package",
  },
  {
    id: "cb-002",
    customerName: "Sarah Johnson",
    phoneNumber: "+1-555-0456",
    queue: "Customer Support",
    scheduledTime: "2024-01-20 15:00",
    status: "scheduled",
    waitTime: 120,
    attempts: 0,
    reason: "Long wait time - auto-scheduled",
    notes: "Billing inquiry",
  },
  {
    id: "cb-003",
    customerName: "Mike Williams",
    phoneNumber: "+1-555-0789",
    queue: "Technical Support",
    scheduledTime: "2024-01-20 10:00",
    status: "completed",
    waitTime: 30,
    attempts: 1,
    reason: "Follow-up on ticket #45678",
    notes: "Issue resolved",
  },
  {
    id: "cb-004",
    customerName: "Emily Brown",
    phoneNumber: "+1-555-0321",
    queue: "Sales Inbound",
    scheduledTime: "2024-01-20 16:00",
    status: "missed",
    waitTime: 180,
    attempts: 3,
    reason: "No answer - last attempt",
    notes: "Called 3 times, no response",
  },
  {
    id: "cb-005",
    customerName: "David Lee",
    phoneNumber: "+1-555-0654",
    queue: "VIP Support",
    scheduledTime: "2024-01-20 11:30",
    status: "completed",
    waitTime: 15,
    attempts: 1,
    reason: "VIP priority callback",
    notes: "Upsell opportunity identified",
  },
  {
    id: "cb-006",
    customerName: "Jennifer Garcia",
    phoneNumber: "+1-555-0987",
    queue: "Billing",
    scheduledTime: "2024-01-20 17:00",
    status: "expired",
    waitTime: 0,
    attempts: 0,
    reason: "Scheduled after hours",
    notes: "Outside business hours",
  },
];

// Callback settings
const callbackSettings = {
  enableAutoCallback: true,
  maxWaitTime: 180,
  maxAttempts: 3,
  retryInterval: 30,
  customerConfirmation: true,
  preservePosition: true,
  voicenotification: true,
  estimatedWaitTime: true,
};

export default function CallbackManagerPage() {
  const [callbacks, setCallbacks] = useState(initialCallbacks);
  const [selectedCallback, setSelectedCallback] = useState(initialCallbacks[0]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newCallback, setNewCallback] = useState({
    customerName: "",
    phoneNumber: "",
    queue: "sales",
    scheduledTime: "",
    reason: "",
    notes: "",
  });
  const [settings, setSettings] = useState(callbackSettings);

  const handleScheduleCallback = () => {
    const callback = {
      id: `cb-${Date.now()}`,
      ...newCallback,
      status: "scheduled",
      waitTime: 0,
      attempts: 0,
    };
    setCallbacks([...callbacks, callback]);
    setSelectedCallback(callback);
    setIsScheduleOpen(false);
    setNewCallback({ customerName: "", phoneNumber: "", queue: "sales", scheduledTime: "", reason: "", notes: "" });
    toast.success("Callback scheduled successfully");
  };

  const handleCancelCallback = (callback) => {
    setCallbacks(prev => prev.map(c =>
      c.id === callback.id
        ? { ...c, status: "cancelled" }
        : c
    ));
    toast.success("Callback cancelled");
  };

  const handleRetryCallback = (callback) => {
    setCallbacks(prev => prev.map(c =>
      c.id === callback.id
        ? { ...c, status: "scheduled", attempts: 0 }
        : c
    ));
    toast.success("Callback requeued");
  };

  const handleDelete = (callback) => {
    setCallbacks(prev => prev.filter(c => c.id !== callback.id));
    if (selectedCallback?.id === callback.id) setSelectedCallback(callbacks[0]);
    toast.success("Callback deleted");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled": return "bg-blue-500 text-white";
      case "completed": return "bg-green-500 text-white";
      case "missed": return "bg-red-500 text-white";
      case "cancelled": return "bg-gray-500 text-white";
      case "expired": return "bg-yellow-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const scheduledCount = callbacks.filter(c => c.status === "scheduled").length;
  const completedCount = callbacks.filter(c => c.status === "completed").length;
  const missedCount = callbacks.filter(c => c.status === "missed").length;
  const avgWaitTime = Math.round(callbacks.reduce((sum, c) => sum + c.waitTime, 0) / callbacks.length);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Callback Manager</h2>
          <p className="text-sm text-muted-foreground">Schedule and manage customer callbacks from queue</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="h-4 w-4 mr-2" /> Settings
          </Button>
          <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Schedule Callback
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Callback</DialogTitle>
                <DialogDescription>Manually schedule a customer callback</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    placeholder="John Smith"
                    value={newCallback.customerName}
                    onChange={(e) => setNewCallback({ ...newCallback, customerName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+1-555-0100"
                    value={newCallback.phoneNumber}
                    onChange={(e) => setNewCallback({ ...newCallback, phoneNumber: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Queue</Label>
                    <Select value={newCallback.queue} onValueChange={(v) => setNewCallback({ ...newCallback, queue: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales Inbound</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="vip">VIP Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Scheduled Time</Label>
                    <Input
                      type="datetime-local"
                      value={newCallback.scheduledTime}
                      onChange={(e) => setNewCallback({ ...newCallback, scheduledTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Select value={newCallback.reason} onValueChange={(v) => setNewCallback({ ...newCallback, reason: v })}>
                    <SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="long-wait">Long Wait Time</SelectItem>
                      <SelectItem value="customer-request">Customer Requested</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="no-answer">No Answer</SelectItem>
                      <SelectItem value="escalation">Escalation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Input
                    placeholder="Additional notes..."
                    value={newCallback.notes}
                    onChange={(e) => setNewCallback({ ...newCallback, notes: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsScheduleOpen(false)}>Cancel</Button>
                <Button onClick={handleScheduleCallback}>Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Scheduled</p>
                <p className="text-2xl font-black text-blue-500">{scheduledCount}</p>
              </div>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Completed</p>
                <p className="text-2xl font-black text-green-500">{completedCount}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Missed</p>
                <p className="text-2xl font-black text-red-500">{missedCount}</p>
              </div>
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Avg Wait Saved</p>
                <p className="text-2xl font-black">{avgWaitTime}s</p>
              </div>
              <Timer className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="callbacks" className="w-full">
        <TabsList>
          <TabsTrigger value="callbacks">Callback Queue</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="callbacks" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Queue</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Wait Saved</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {callbacks.sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime)).map((callback) => (
                    <TableRow
                      key={callback.id}
                      className={cn(selectedCallback?.id === callback.id && "bg-muted/50")}
                      onClick={() => setSelectedCallback(callback)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{callback.customerName}</p>
                          <p className="text-xs text-muted-foreground">{callback.phoneNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{callback.queue}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{callback.scheduledTime.split(" ")[1]}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(callback.status)}>{callback.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{callback.waitTime}s</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{callback.attempts}</span>
                          <span className="text-muted-foreground">/ 3</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{callback.reason}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {callback.status === "scheduled" && (
                            <>
                              <Button size="icon" variant="ghost">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleCancelCallback(callback); }}>
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {(callback.status === "missed" || callback.status === "expired") && (
                            <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleRetryCallback(callback); }}>
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDelete(callback); }}>
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

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Callback History</CardTitle>
              <CardDescription>View past callback records and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Queue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {callbacks.filter(c => c.status === "completed" || c.status === "missed").map((callback) => (
                    <TableRow key={callback.id}>
                      <TableCell>
                        <span className="text-sm">{callback.scheduledTime}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{callback.customerName}</p>
                          <p className="text-xs text-muted-foreground">{callback.phoneNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>{callback.queue}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(callback.status)}>{callback.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{callback.waitTime}s</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                            {callback.customerName.charAt(0)}A
                          </div>
                          <span>Agent {callback.id.slice(-2)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm-muted-foreground text">{callback.notes}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Total Callbacks</p>
                    <p className="text-2xl font-black">{callbacks.length}</p>
                  </div>
                  <PhoneCall className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Completion Rate</p>
                    <p className="text-2xl font-black text-green-500">
                      {Math.round((completedCount / callbacks.filter(c => c.status !== "scheduled").length) * 100)}%
                    </p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Avg Wait Saved</p>
                    <p className="text-2xl font-black">{avgWaitTime}s</p>
                  </div>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Missed Rate</p>
                    <p className="text-2xl font-black text-red-500">
                      {Math.round((missedCount / callbacks.filter(c => c.status !== "scheduled").length) * 100)}%
                    </p>
                  </div>
                  <TrendingDown className="h-5 w-5 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Callback Performance by Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Queue</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Missed</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Avg Wait Saved</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["Sales Inbound", "Customer Support", "Technical Support", "VIP Support", "Billing"].map((queue) => {
                    const queueCallbacks = callbacks.filter(c => c.queue === queue);
                    const completed = queueCallbacks.filter(c => c.status === "completed").length;
                    const missed = queueCallbacks.filter(c => c.status === "missed").length;
                    const total = queueCallbacks.length;
                    const avgWait = Math.round(queueCallbacks.reduce((sum, c) => sum + c.waitTime, 0) / total) || 0;
                    return (
                      <TableRow key={queue}>
                        <TableCell className="font-medium">{queue}</TableCell>
                        <TableCell>{total}</TableCell>
                        <TableCell>{completed}</TableCell>
                        <TableCell>{missed}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={(completed / total) * 100} className="h-2 w-16" />
                            <span>{total > 0 ? Math.round((completed / total) * 100) : 0}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{avgWait}s</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Callback Settings</DialogTitle>
            <DialogDescription>Configure automatic callback behavior</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Auto Callback</Label>
                <p className="text-xs text-muted-foreground">Automatically offer callback when wait time exceeds threshold</p>
              </div>
              <Switch
                checked={settings.enableAutoCallback}
                onCheckedChange={(c) => setSettings({ ...settings, enableAutoCallback: c })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Wait Time (sec)</Label>
                <Input
                  type="number"
                  value={settings.maxWaitTime}
                  onChange={(e) => setSettings({ ...settings, maxWaitTime: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Attempts</Label>
                <Input
                  type="number"
                  value={settings.maxAttempts}
                  onChange={(e) => setSettings({ ...settings, maxAttempts: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Retry Interval (min)</Label>
                <Input
                  type="number"
                  value={settings.retryInterval}
                  onChange={(e) => setSettings({ ...settings, retryInterval: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Preserve Queue Position</Label>
                <p className="text-xs text-muted-foreground">Customer keeps their place in line</p>
              </div>
              <Switch
                checked={settings.preservePosition}
                onCheckedChange={(c) => setSettings({ ...settings, preservePosition: c })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Estimated Wait Time</Label>
                <p className="text-xs text-muted-foreground">Show estimated callback time to customer</p>
              </div>
              <Switch
                checked={settings.estimatedWaitTime}
                onCheckedChange={(c) => setSettings({ ...settings, estimatedWaitTime: c })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Settings saved"); setIsSettingsOpen(false); }}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
