"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Tag, GripVertical, Copy, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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

// Mock disposition codes
const dispositionCodes = [
  { id: 1, code: "SALE", label: "Sale Completed", category: "Positive", color: "bg-green-500", active: true, usageCount: 1250, avgTime: "45s", required: true },
  { id: 2, code: "Callback", label: "Callback Requested", category: "Follow-up", color: "bg-blue-500", active: true, usageCount: 890, avgTime: "30s", required: true },
  { id: 3, code: "VM", label: "Left Voicemail", category: "No Contact", color: "bg-yellow-500", active: true, usageCount: 756, avgTime: "15s", required: true },
  { id: 4, code: "NSC", label: "No Speech/Contact", category: "No Contact", color: "bg-orange-500", active: true, usageCount: 542, avgTime: "20s", required: true },
  { id: 5, code: "DNQ", label: "Does Not Qualify", category: "Negative", color: "bg-red-500", active: true, usageCount: 423, avgTime: "35s", required: false },
  { id: 6, code: "DNC", label: "Do Not Call", category: "Negative", color: "bg-red-700", active: true, usageCount: 234, avgTime: "10s", required: true },
  { id: 7, code: "WrongNum", label: "Wrong Number", category: "No Contact", color: "bg-gray-500", active: true, usageCount: 189, avgTime: "15s", required: true },
  { id: 8, code: "BUSY", label: "Line Busy", category: "No Contact", color: "bg-yellow-500", active: true, usageCount: 156, avgTime: "10s", required: true },
  { id: 9, code: "NRN", label: "No Ring/Number", category: "Technical", color: "bg-purple-500", active: true, usageCount: 98, avgTime: "10s", required: true },
  { id: 10, code: "AMD", label: "Answering Machine", category: "No Contact", color: "bg-yellow-500", active: false, usageCount: 0, avgTime: "15s", required: false },
];

// Mock categories
const categories = [
  { id: "positive", name: "Positive", color: "bg-green-500" },
  { id: "negative", name: "Negative", color: "bg-red-500" },
  { id: "follow-up", name: "Follow-up", color: "bg-blue-500" },
  { id: "no-contact", name: "No Contact", color: "bg-yellow-500" },
  { id: "technical", name: "Technical", color: "bg-purple-500" },
];

export default function DispositionCodesPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const [newCode, setNewCode] = useState({
    code: "",
    label: "",
    category: "positive",
    color: "bg-green-500",
    required: false
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCodes = dispositionCodes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          code.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || code.category.toLowerCase() === filterCategory;
    const matchesStatus = filterStatus === "all" ||
                          (filterStatus === "active" && code.active) ||
                          (filterStatus === "inactive" && !code.active);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateCode = () => {
    console.log("Creating code:", newCode);
    setShowCreateDialog(false);
    setNewCode({ code: "", label: "", category: "positive", color: "bg-green-500", required: false });
  };

  const handleEditCode = (code) => {
    setSelectedCode(code);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    console.log("Saving code:", selectedCode);
    setShowEditDialog(false);
    setSelectedCode(null);
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search codes..."
              className="w-64 pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
              <SelectItem value="no-contact">No Contact</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Code
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Disposition Code</DialogTitle>
              <DialogDescription>
                Add a new disposition code for agent call handling
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Code</label>
                  <Input
                    placeholder="e.g., SALE"
                    value={newCode.code}
                    onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select
                    value={newCode.category}
                    onValueChange={(value) => setNewCode({ ...newCode, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Label</label>
                <Input
                  placeholder="e.g., Sale Completed"
                  value={newCode.label}
                  onChange={(e) => setNewCode({ ...newCode, label: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Color</label>
                <div className="flex gap-2">
                  {["bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-orange-500", "bg-red-500", "bg-red-700", "bg-purple-500", "bg-gray-500"].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-md ${color} ${newCode.color === color ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                      onClick={() => setNewCode({ ...newCode, color })}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <Label htmlFor="required">Required for Wrap-up</Label>
                  <p className="text-xs text-muted-foreground">Agent must select before completing call</p>
                </div>
                <Switch
                  id="required"
                  checked={newCode.required}
                  onCheckedChange={(checked) => setNewCode({ ...newCode, required: checked })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleCreateCode}>
                  Create Code
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Disposition Codes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Disposition Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Usage</TableHead>
                <TableHead className="text-right">Avg Time</TableHead>
                <TableHead>Required</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell>
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  </TableCell>
                  <TableCell className="font-mono font-medium">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${code.color}`} />
                      {code.code}
                    </div>
                  </TableCell>
                  <TableCell>{code.label}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getCategoryColor(code.category)} text-white border-0`}>
                      {code.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {code.active ? (
                      <Badge variant="default" className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <XCircle className="h-3 w-3 mr-1" />
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{code.usageCount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{code.avgTime}</TableCell>
                  <TableCell>
                    {code.required ? (
                      <Badge variant="outline">Required</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditCode(code)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
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

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Disposition Code</DialogTitle>
            <DialogDescription>
              Modify the disposition code settings
            </DialogDescription>
          </DialogHeader>
          {selectedCode && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Code</label>
                  <Input
                    value={selectedCode.code}
                    onChange={(e) => setSelectedCode({ ...selectedCode, code: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select
                    value={selectedCode.category.toLowerCase()}
                    onValueChange={(value) => setSelectedCode({ ...selectedCode, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Label</label>
                <Input
                  value={selectedCode.label}
                  onChange={(e) => setSelectedCode({ ...selectedCode, label: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="editRequired">Required for Wrap-up</Label>
                <Switch
                  id="editRequired"
                  checked={selectedCode.required}
                  onCheckedChange={(checked) => setSelectedCode({ ...selectedCode, required: checked })}
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="editActive">Active</Label>
                <Switch
                  id="editActive"
                  checked={selectedCode.active}
                  onCheckedChange={(checked) => setSelectedCode({ ...selectedCode, active: checked })}
                />
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

      {/* Usage Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Used Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-medium">SALE</span>
              <span className="text-muted-foreground">- Sale Completed</span>
            </div>
            <p className="text-2xl font-bold mt-2">1,250 uses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Common No-Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="font-medium">VM</span>
              <span className="text-muted-foreground">- Left Voicemail</span>
            </div>
            <p className="text-2xl font-bold mt-2">756 uses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">92%</p>
            <p className="text-xs text-muted-foreground">Calls with disposition</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
