"use client";

import { useState } from "react";
import { Plus, Search, Upload, Download, Trash2, Phone, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock DNC records
const dncRecords = [
  { id: 1, phone: "+1 (555) 123-4567", reason: "Customer Request", addedBy: "Agent Smith", date: "2024-01-15", status: "Active", source: "Manual" },
  { id: 2, phone: "+1 (555) 234-5678", reason: "Customer Request", addedBy: "Agent Johnson", date: "2024-01-14", status: "Active", source: "Manual" },
  { id: 3, phone: "+1 (555) 345-6789", reason: "Do Not Call", addedBy: "System", date: "2024-01-13", status: "Active", source: "3 Strikes" },
  { id: 4, phone: "+1 (555) 456-7890", reason: "Customer Request", addedBy: "Agent Davis", date: "2024-01-12", status: "Expired", source: "Manual" },
  { id: 5, phone: "+1 (555) 567-8901", reason: "Legal Request", addedBy: "Supervisor Wilson", date: "2024-01-11", status: "Active", source: "Legal" },
  { id: 6, phone: "+1 (555) 678-9012", reason: "Customer Request", addedBy: "Agent Brown", date: "2024-01-10", status: "Active", source: "Manual" },
  { id: 7, phone: "+1 (555) 789-0123", reason: "Do Not Call", addedBy: "System", date: "2024-01-09", status: "Active", source: "3 Strikes" },
  { id: 8, phone: "+1 (555) 890-1234", reason: "Customer Request", addedBy: "Agent Miller", date: "2024-01-08", status: "Active", source: "Manual" },
];

// Mock DNC history
const dncHistory = [
  { id: 1, action: "Add", phone: "+1 (555) 123-4567", user: "Agent Smith", timestamp: "2024-01-15 14:32:15", result: "Success" },
  { id: 2, action: "Remove", phone: "+1 (555) 234-5678", user: "Supervisor Wilson", timestamp: "2024-01-15 14:28:33", result: "Success" },
  { id: 3, action: "Add (Bulk)", phone: "+1 (555) 345-6789", user: "System", timestamp: "2024-01-15 14:25:47", result: "Success" },
  { id: 4, action: "Check", phone: "+1 (555) 456-7890", user: "Agent Davis", timestamp: "2024-01-15 14:22:11", result: "Found" },
  { id: 5, action: "Check", phone: "+1 (555) 567-8901", user: "Agent Brown", timestamp: "2024-01-15 14:18:55", result: "Not Found" },
];

export default function InternalDNCPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [newRecord, setNewRecord] = useState({ phone: "", reason: "Customer Request", expiry: "never" });
  const [threeStrikesEnabled, setThreeStrikesEnabled] = useState(true);
  const [strikeCount, setStrikeCount] = useState(3);
  const [expiryDays, setExpiryDays] = useState(90);

  const filteredRecords = dncRecords.filter(record =>
    record.phone.includes(searchQuery) ||
    record.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRecord = () => {
    console.log("Adding record:", newRecord);
    setShowAddDialog(false);
    setNewRecord({ phone: "", reason: "Customer Request", expiry: "never" });
  };

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-500" : "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Number
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Internal DNC</DialogTitle>
              <DialogDescription>
                Add a phone number to the internal do-not-call list
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  placeholder="+1 (555) 123-4567"
                  value={newRecord.phone}
                  onChange={(e) => setNewRecord({ ...newRecord, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Reason</label>
                <Select
                  value={newRecord.reason}
                  onValueChange={(value) => setNewRecord({ ...newRecord, reason: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer Request">Customer Request</SelectItem>
                    <SelectItem value="Do Not Call">Do Not Call</SelectItem>
                    <SelectItem value="Legal Request">Legal Request</SelectItem>
                    <SelectItem value="Supervisor Decision">Supervisor Decision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Expiry</label>
                <Select
                  value={newRecord.expiry}
                  onValueChange={(value) => setNewRecord({ ...newRecord, expiry: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="365">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleAddRecord}>
                  Add to DNC
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" onClick={() => setShowBulkDialog(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Bulk Upload
        </Button>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* DNC Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Internal DNC List</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search numbers..."
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phone Number</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Added By</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {record.phone}
                    </div>
                  </TableCell>
                  <TableCell>{record.reason}</TableCell>
                  <TableCell>{record.addedBy}</TableCell>
                  <TableCell className="text-muted-foreground">{record.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(record.status)}`} />
                      {record.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
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

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dncHistory.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge variant={log.action.includes("Add") ? "default" : log.action === "Remove" ? "destructive" : "secondary"}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{log.phone}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {log.result === "Success" || log.result === "Found" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                      {log.result}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>DNC Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="threeStrikes">3-Strikes Rule</Label>
              <p className="text-xs text-muted-foreground">Automatically add numbers after multiple refusals</p>
            </div>
            <Switch
              id="threeStrikes"
              checked={threeStrikesEnabled}
              onCheckedChange={setThreeStrikesEnabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Strike Count</Label>
              <p className="text-xs text-muted-foreground">Number of refusals before adding to DNC</p>
            </div>
            <Select value={strikeCount.toString()} onValueChange={(v) => setStrikeCount(parseInt(v))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Default Expiry</Label>
              <p className="text-xs text-muted-foreground">Default expiry for manual DNC entries</p>
            </div>
            <Select value={expiryDays.toString()} onValueChange={(v) => setExpiryDays(parseInt(v))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="365">1 Year</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Upload Dialog */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Upload</DialogTitle>
            <DialogDescription>
              Upload a CSV file with phone numbers to add to DNC
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag and drop a CSV file here</p>
              <Button variant="outline" className="mt-4">
                Browse Files
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>CSV format: phone_number,reason</p>
              <p>Example: +1 (555) 123-4567,Customer Request</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
