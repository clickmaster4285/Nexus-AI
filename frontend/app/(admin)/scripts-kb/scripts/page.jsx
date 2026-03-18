"use client";

import { useState } from "react";
import { Plus, Play, Pause, Edit, Trash2, Copy, FileText, Clock, CheckCircle, GripVertical, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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

// Mock scripts
const scripts = [
  {
    id: 1,
    name: "Sales - Initial Greeting",
    category: "Sales",
    status: "Active",
    version: "2.1",
    lastUpdated: "2024-01-15",
    usageCount: 2450,
    avgDuration: "2:30",
    steps: [
      { id: 1, type: "greeting", content: "Hello, this is [Agent Name] calling from [Company]. May I speak with [Customer Name]?" },
      { id: 2, type: "intro", content: "I'm calling because..." },
      { id: 3, type: "discovery", content: "May I ask you a few questions?" },
    ]
  },
  {
    id: 2,
    name: "Support - Technical Issue",
    category: "Support",
    status: "Active",
    version: "3.0",
    lastUpdated: "2024-01-14",
    usageCount: 1820,
    avgDuration: "5:45",
    steps: [
      { id: 1, type: "greeting", content: "Thank you for calling support. My name is [Agent Name]. How may I assist you today?" },
      { id: 2, type: "issue", content: "I understand you're experiencing..." },
      { id: 3, type: "resolution", content: "Let me help you with that..." },
    ]
  },
  {
    id: 3,
    name: "Survey - Customer Feedback",
    category: "Surveys",
    status: "Active",
    version: "1.5",
    lastUpdated: "2024-01-12",
    usageCount: 890,
    avgDuration: "3:15",
    steps: []
  },
  {
    id: 4,
    name: "Billing - Payment Inquiry",
    category: "Billing",
    status: "Draft",
    version: "1.0",
    lastUpdated: "2024-01-10",
    usageCount: 0,
    avgDuration: "-",
    steps: []
  },
  {
    id: 5,
    name: "Upsell - Premium Package",
    category: "Sales",
    status: "Paused",
    version: "2.0",
    lastUpdated: "2024-01-08",
    usageCount: 456,
    avgDuration: "4:00",
    steps: []
  },
];

const categories = ["Sales", "Support", "Billing", "Surveys", "General"];

export default function ScriptBuilderPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedScript, setSelectedScript] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newScript, setNewScript] = useState({
    name: "",
    category: "sales",
    description: "",
  });

  const filteredScripts = scripts.filter(script => {
    const matchesSearch = script.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || script.category.toLowerCase() === filterCategory;
    const matchesStatus = filterStatus === "all" || script.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateScript = () => {
    console.log("Creating script:", newScript);
    setShowCreateDialog(false);
  };

  const handleEditScript = (script) => {
    setSelectedScript(script);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    console.log("Saving script:", selectedScript);
    setShowEditDialog(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case "Paused":
        return <Badge variant="secondary"><Pause className="h-3 w-3 mr-1" />Paused</Badge>;
      case "Draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search scripts..."
              className="w-64 pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Script
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Script</DialogTitle>
              <DialogDescription>
                Create a new call script for agents to follow
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Script Name</label>
                <Input
                  placeholder="e.g., Sales - Initial Greeting"
                  value={newScript.name}
                  onChange={(e) => setNewScript({ ...newScript, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select
                  value={newScript.category}
                  onValueChange={(value) => setNewScript({ ...newScript, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Brief description of the script purpose..."
                  value={newScript.description}
                  onChange={(e) => setNewScript({ ...newScript, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleCreateScript}>
                  Create Script
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Scripts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scripts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Script Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Usage</TableHead>
                <TableHead className="text-right">Avg Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScripts.map((script) => (
                <TableRow key={script.id}>
                  <TableCell>
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {script.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{script.category}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(script.status)}</TableCell>
                  <TableCell>v{script.version}</TableCell>
                  <TableCell className="text-muted-foreground">{script.lastUpdated}</TableCell>
                  <TableCell className="text-right">{script.usageCount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {script.avgDuration}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {script.status === "Draft" || script.status === "Paused" ? (
                        <Button variant="ghost" size="sm" onClick={() => toast.success("Script activated")}>
                          <Play className="h-4 w-4 text-green-500" />
                        </Button>
                      ) : script.status === "Active" ? (
                        <Button variant="ghost" size="sm" onClick={() => toast.success("Script paused")}>
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : null}
                      <Button variant="ghost" size="sm" onClick={() => handleEditScript(script)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toast.success("Script copied")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => toast.success("Script deleted")}>
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

      {/* Script Editor Preview (when editing) */}
      {selectedScript && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Script Preview - {selectedScript.name}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toast.info("Entering Preview Mode")}>
                  <Play className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" onClick={() => toast.info("Opening Step Editor")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Steps
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedScript.steps.length > 0 ? (
              <div className="space-y-4">
                {selectedScript.steps.map((step, index) => (
                  <div key={step.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">{step.type}</Badge>
                      <p className="text-sm">{step.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No script steps defined yet</p>
                <Button variant="outline" className="mt-4" onClick={() => toast.info("Adding New Step")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Script</DialogTitle>
            <DialogDescription>
              Modify script settings
            </DialogDescription>
          </DialogHeader>
          {selectedScript && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Script Name</label>
                <Input
                  value={selectedScript.name}
                  onChange={(e) => setSelectedScript({ ...selectedScript, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select
                    value={selectedScript.category.toLowerCase()}
                    onValueChange={(value) => setSelectedScript({ ...selectedScript, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select
                    value={selectedScript.status.toLowerCase()}
                    onValueChange={(value) => setSelectedScript({ ...selectedScript, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
