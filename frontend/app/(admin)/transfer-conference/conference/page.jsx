"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Users, UserPlus, Mic, MicOff, PhoneOff, Copy, Trash2, MoreVertical, Phone, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock conference bridges data
const conferences = [
  {
    id: 1,
    name: "Sales Team Standup",
    bridgeId: "CONF-001",
    host: "Agent Smith",
    status: "Active",
    participants: 8,
    maxParticipants: 10,
    duration: "45:23",
    created: "2024-01-15 09:00",
    features: { recording: true, muteAll: false, chat: true }
  },
  {
    id: 2,
    name: "Support Escalation",
    bridgeId: "CONF-002",
    host: "Supervisor Wilson",
    status: "Active",
    participants: 3,
    maxParticipants: 5,
    duration: "12:45",
    created: "2024-01-15 10:30",
    features: { recording: true, muteAll: true, chat: false }
  },
  {
    id: 3,
    name: "Client Demo - Acme Corp",
    bridgeId: "CONF-003",
    host: "Agent Johnson",
    status: "Scheduled",
    participants: 0,
    maxParticipants: 15,
    duration: "-",
    created: "2024-01-15 14:00",
    features: { recording: true, muteAll: false, chat: true }
  },
  {
    id: 4,
    name: "Training Session",
    bridgeId: "CONF-004",
    host: "Agent Davis",
    status: "Ended",
    participants: 12,
    maxParticipants: 20,
    duration: "1:23:45",
    created: "2024-01-14 15:00",
    features: { recording: true, muteAll: true, chat: true }
  },
  {
    id: 5,
    name: "Quick Sync",
    bridgeId: "CONF-005",
    host: "Agent Brown",
    status: "Active",
    participants: 2,
    maxParticipants: 4,
    duration: "5:12",
    created: "2024-01-15 11:45",
    features: { recording: false, muteAll: false, chat: false }
  },
];

// Mock participants in active conference
const activeParticipants = [
  { id: 1, name: "Agent Smith", role: "Host", muted: false, phone: "+1 (555) 111-2222" },
  { id: 2, name: "Agent Johnson", role: "Participant", muted: true, phone: "+1 (555) 333-4444" },
  { id: 3, name: "Agent Davis", role: "Participant", muted: false, phone: "+1 (555) 555-6666" },
  { id: 4, name: "Customer - John Doe", role: "Participant", muted: false, phone: "+1 (555) 777-8888" },
  { id: 5, name: "Agent Wilson", role: "Participant", muted: true, phone: "+1 (555) 999-0000" },
];

// Mock conference templates
const templates = [
  { id: 1, name: "Team Standup", maxParticipants: 10, defaultDuration: 30 },
  { id: 2, name: "Client Demo", maxParticipants: 15, defaultDuration: 60 },
  { id: 3, name: "Training", maxParticipants: 25, defaultDuration: 90 },
  { id: 4, name: "Quick Sync", maxParticipants: 4, defaultDuration: 15 },
];

export default function ConferenceBridgePage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);
  const [newConference, setNewConference] = useState({
    name: "",
    maxParticipants: "10",
    host: "",
    pin: "",
    features: { recording: true, muteAll: false, chat: true }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Scheduled": return "bg-blue-500";
      case "Ended": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const handleCreateConference = () => {
    // Handle create conference logic
    console.log("Creating conference:", newConference);
    toast.success("Conference bridge created successfully");
    setShowCreateDialog(false);
    setNewConference({
      name: "",
      maxParticipants: "10",
      host: "",
      pin: "",
      features: { recording: true, muteAll: false, chat: true }
    });
  };

  return (
    <div className="space-y-6">
      {/* Create New Conference */}
      <div className="flex justify-end">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Conference
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Conference Bridge</DialogTitle>
              <DialogDescription>
                Set up a new conference bridge for calls
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Conference Name</label>
                <Input
                  placeholder="Enter conference name"
                  value={newConference.name}
                  onChange={(e) => setNewConference({ ...newConference, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Max Participants</label>
                  <Select
                    value={newConference.maxParticipants}
                    onValueChange={(value) => setNewConference({ ...newConference, maxParticipants: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 Participants</SelectItem>
                      <SelectItem value="10">10 Participants</SelectItem>
                      <SelectItem value="15">15 Participants</SelectItem>
                      <SelectItem value="25">25 Participants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Host</label>
                  <Input
                    placeholder="Host name"
                    value={newConference.host}
                    onChange={(e) => setNewConference({ ...newConference, host: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">PIN (Optional)</label>
                <Input
                  placeholder="4-digit PIN"
                  value={newConference.pin}
                  onChange={(e) => setNewConference({ ...newConference, pin: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recording">Enable Recording</Label>
                  <Switch
                    id="recording"
                    checked={newConference.features.recording}
                    onCheckedChange={(checked) => setNewConference({
                      ...newConference,
                      features: { ...newConference.features, recording: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="muteAll">Mute All by Default</Label>
                  <Switch
                    id="muteAll"
                    checked={newConference.features.muteAll}
                    onCheckedChange={(checked) => setNewConference({
                      ...newConference,
                      features: { ...newConference.features, muteAll: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="chat">Enable Chat</Label>
                  <Switch
                    id="chat"
                    checked={newConference.features.chat}
                    onCheckedChange={(checked) => setNewConference({
                      ...newConference,
                      features: { ...newConference.features, chat: checked }
                    })}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleCreateConference}>
                  Create Conference
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Conference Bridges Table */}
      <Card>
        <CardHeader>
          <CardTitle>Conference Bridges</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Bridge ID</TableHead>
                <TableHead>Host</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conferences.map((conf) => (
                <TableRow key={conf.id}>
                  <TableCell className="font-medium">{conf.name}</TableCell>
                  <TableCell className="text-muted-foreground">{conf.bridgeId}</TableCell>
                  <TableCell>{conf.host}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(conf.status)}`} />
                      {conf.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    {conf.participants}/{conf.maxParticipants}
                  </TableCell>
                  <TableCell>{conf.duration}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {conf.features.recording && <Badge variant="outline">Rec</Badge>}
                      {conf.features.muteAll && <Badge variant="outline">Muted</Badge>}
                      {conf.features.chat && <Badge variant="outline">Chat</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {conf.status === "Active" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedConference(conf);
                            setShowParticipantsDialog(true);
                          }}
                        >
                          View
                        </Button>
                      )}
                      {conf.status === "Scheduled" && (
                        <Button variant="ghost" size="sm" onClick={() => toast.success("Starting conference bridge")}>
                          Start
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(conf.bridgeId); toast.success("Bridge ID copied to clipboard"); }}>
                        <Copy className="h-3 w-3" />
                      </Button>
                      {conf.status !== "Active" && (
                        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => toast.success("Conference bridge deleted")}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Conference Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                onClick={() => {
                  setNewConference({
                    ...newConference,
                    name: template.name,
                    maxParticipants: template.maxParticipants.toString()
                  });
                  setShowCreateDialog(true);
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">{template.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Max: {template.maxParticipants} • {template.defaultDuration} min
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Participants Dialog */}
      <Dialog open={showParticipantsDialog} onOpenChange={setShowParticipantsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Conference Participants</DialogTitle>
            <DialogDescription>
              {selectedConference?.name} - {selectedConference?.bridgeId}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Conference Controls */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="default">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Live
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {selectedConference?.duration}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toast.success("All participants muted")}>
                  <Mic className="h-4 w-4 mr-1" />
                  Mute All
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.success("Chat interface opened")}>
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Chat
                </Button>
                <Button variant="destructive" size="sm" onClick={() => toast.success("Call ended for all participants")}>
                  <PhoneOff className="h-4 w-4 mr-1" />
                  End Call
                </Button>
              </div>
            </div>

            {/* Participants List */}
            <ScrollArea className="h-75">
              <div className="space-y-2">
                {activeParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {participant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">{participant.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={participant.role === "Host" ? "default" : "secondary"}>
                        {participant.role}
                      </Badge>
                      {participant.muted ? (
                        <MicOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Mic className="h-4 w-4 text-green-500" />
                      )}
                      <Button variant="ghost" size="sm" onClick={() => toast.success("Opening participant actions")}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Add Participant */}
            <div className="flex gap-2">
              <Input placeholder="Enter phone number or agent ID" className="flex-1" />
              <Button onClick={() => toast.success("Participant invited")}>
                <Phone className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
