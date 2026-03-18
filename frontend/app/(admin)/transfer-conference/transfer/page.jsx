"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Phone, PhoneForwarded, UserPlus, Search, ArrowRight, Users } from "lucide-react";
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
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock active transfers data
const activeTransfers = [
  { id: 1, caller: "+1 (555) 123-4567", from: "Agent Smith", to: "Agent Johnson", type: "Warm", status: "In Progress", duration: "2:34" },
  { id: 2, caller: "+1 (555) 234-5678", from: "Agent Davis", to: "Supervisor Wilson", type: "Cold", status: "Ringing", duration: "0:45" },
  { id: 3, caller: "+1 (555) 345-6789", from: "Agent Brown", to: "Queue: Sales", type: "Warm", status: "On Hold", duration: "5:12" },
  { id: 4, caller: "+1 (555) 456-7890", from: "Agent Miller", to: "Agent Garcia", type: "Cold", status: "Completed", duration: "1:23" },
  { id: 5, caller: "+1 (555) 567-8901", from: "Agent Wilson", to: "External: +1 (555) 999-9999", type: "Warm", status: "Failed", duration: "0:15" },
];

// Mock transfer history
const transferHistory = [
  { id: 1, timestamp: "2024-01-15 14:32:15", caller: "+1 (555) 111-2222", from: "Agent Smith", to: "Agent Johnson", result: "Successful", duration: "0:45" },
  { id: 2, timestamp: "2024-01-15 14:28:33", caller: "+1 (555) 333-4444", from: "Agent Davis", to: "Queue: Support", result: "Successful", duration: "0:12" },
  { id: 3, timestamp: "2024-01-15 14:25:47", caller: "+1 (555) 555-6666", from: "Agent Brown", to: "Agent Miller", result: "Abandoned", duration: "2:15" },
  { id: 4, timestamp: "走红 2024-01-15 14:22:11", caller: "+1 (555) 777-8888", from: "Agent Garcia", to: "Supervisor", result: "Successful", duration: "3:45" },
  { id: 5, timestamp: "2024-01-15 14:18:55", caller: "+1 (555) 999-0000", from: "Agent Wilson", to: "External", result: "Failed", duration: "0:08" },
];

// Mock available agents
const availableAgents = [
  { id: 1, name: "Agent Smith", status: "Available", skills: ["Sales", "Support"] },
  { id: 2, name: "Agent Johnson", status: "On Call", skills: ["Sales"] },
  { id: 3, name: "Agent Davis", status: "Available", skills: ["Support", "Technical"] },
  { id: 4, name: "Agent Wilson", status: "On ACW", skills: ["Sales", "Retention"] },
  { id: 5, name: "Agent Brown", status: "Available", skills: ["Technical"] },
  { id: 6, name: "Agent Miller", status: "On Call", skills: [""] },
];

//Sales", "Support Mock queues
const queues = [
  { id: "sales", name: "Sales Queue" },
  { id: "support", name: "Support Queue" },
  { id: "technical", name: "Technical Queue" },
  { id: "billing", name: "Billing Queue" },
];

export default function TransferPanelPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transferType, setTransferType] = useState("warm");
  const [transferTarget, setTransferTarget] = useState("");
  const [showAgentDialog, setShowAgentDialog] = useState(false);
  const [showQueueDialog, setShowQueueDialog] = useState(false);

  const filteredAgents = availableAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress": return "bg-blue-500";
      case "Ringing": return "bg-yellow-500";
      case "On Hold": return "bg-orange-500";
      case "Completed": return "bg-green-500";
      case "Failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getResultColor = (result) => {
    switch (result) {
      case "Successful": return "text-green-500";
      case "Abandoned": return "text-orange-500";
      case "Failed": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Transfer Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Transfer to Agent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Transfer Type</label>
              <Select value={transferType} onValueChange={setTransferType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warm">Warm Transfer</SelectItem>
                  <SelectItem value="cold">Cold Transfer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {transferType === "warm" ? "Announce call before transferring" : "Transfer without announcement"}
              </p>
            </div>
            <Button className="w-full" onClick={() => setShowAgentDialog(true)}>
              <PhoneForwarded className="h-4 w-4 mr-2" />
              Select Agent
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Transfer to Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Queue</label>
              <Select value={transferTarget} onValueChange={setTransferTarget}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a queue" />
                </SelectTrigger>
                <SelectContent>
                  {queues.map((queue) => (
                    <SelectItem key={queue.id} value={queue.id}>{queue.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" variant="outline" onClick={() => setShowQueueDialog(true)}>
              <Phone className="h-4 w-4 mr-2" />
              Transfer to Queue
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Transfers */}
      <Card>
        <CardHeader>
          <CardTitle>Active Transfers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Caller</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTransfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-medium">{transfer.caller}</TableCell>
                  <TableCell>{transfer.from}</TableCell>
                  <TableCell>{transfer.to}</TableCell>
                  <TableCell>
                    <Badge variant={transfer.type === "Warm" ? "default" : "secondary"}>
                      {transfer.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(transfer.status)}`} />
                      {transfer.status}
                    </div>
                  </TableCell>
                  <TableCell>{transfer.duration}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => toast.success("Loading transfer details")}>View</Button>
                      {transfer.status === "In Progress" && (
                        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => toast.success("Transfer cancelled")}>Cancel</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transfer History */}
      <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Caller</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transferHistory.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="text-muted-foreground">{transfer.timestamp}</TableCell>
                  <TableCell className="font-medium">{transfer.caller}</TableCell>
                  <TableCell>{transfer.from}</TableCell>
                  <TableCell>{transfer.to}</TableCell>
                  <TableCell className={getResultColor(transfer.result)}>{transfer.result}</TableCell>
                  <TableCell>{transfer.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Agent Selection Dialog */}
      <Dialog open={showAgentDialog} onOpenChange={setShowAgentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Agent</DialogTitle>
            <DialogDescription>
              Choose an agent to transfer the call to
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ScrollArea className="h-75">
              <div className="space-y-2">
                {filteredAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => {
                      setTransferTarget(agent.id);
                      setShowAgentDialog(false);
                    }}
                  >
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.status}</p>
                    </div>
                    <div className="flex gap-1">
                      {agent.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Queue Selection Dialog */}
      <Dialog open={showQueueDialog} onOpenChange={setShowQueueDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transfer to Queue</DialogTitle>
            <DialogDescription>
              Select a queue to transfer the call to
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {queues.map((queue) => (
              <div
                key={queue.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                onClick={() => {
                  setTransferTarget(queue.id);
                  setShowQueueDialog(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{queue.name}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
