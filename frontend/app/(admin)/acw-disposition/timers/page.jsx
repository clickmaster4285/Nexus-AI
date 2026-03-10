"use client";

import { useState } from "react";
import { Timer, Clock, Play, Pause, Edit, Trash2, Plus, Zap } from "lucide-react";
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

// Mock ACW timer presets
const timerPresets = [
  { id: 1, name: "Standard", duration: 30, type: "fixed", active: true, usageCount: 2450, avgActual: 28, description: "Default ACW time for most calls" },
  { id: 2, name: "Sales Call", duration: 60, type: "fixed", active: true, usageCount: 1820, avgActual: 52, description: "Extended time for sales conversations" },
  { id: 3, name: "Support Call", duration: 45, type: "fixed", active: true, usageCount: 1560, avgActual: 38, description: "Medium time for support issues" },
  { id: 4, name: "Quick Wrap", duration: 15, type: "fixed", active: true, usageCount: 890, avgActual: 12, description: "Fast wrap-up for simple calls" },
  { id: 5, name: "Complex Issue", duration: 120, type: "fixed", active: true, usageCount: 420, avgActual: 95, description: "Extended time for complex problems" },
  { id: 6, name: "Follow-up Required", duration: 90, type: "variable", active: false, usageCount: 0, avgActual: 0, description: "Variable based on task complexity" },
];

// Mock timer rules
const timerRules = [
  { id: 1, condition: "Call Duration > 5 minutes", action: "Add 30s", priority: 1, active: true },
  { id: 2, condition: "Disposition = Sale Completed", action: "Use Sales Call preset", priority: 2, active: true },
  { id: 3, condition: "Disposition = Callback Requested", action: "Use Quick Wrap preset", priority: 3, active: true },
  { id: 4, condition: "Call Escalated", action: "Add 60s", priority: 4, active: false },
];

export default function AcwTimersPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [globalTimeout, setGlobalTimeout] = useState(45);
  const [enableAutoExtend, setEnableAutoExtend] = useState(true);
  const [showOverTimeWarning, setShowOverTimeWarning] = useState(true);
  const [overTimeThreshold, setOverTimeThreshold] = useState(15);
  const [newPreset, setNewPreset] = useState({
    name: "",
    duration: 30,
    type: "fixed",
    description: ""
  });

  const handleCreatePreset = () => {
    console.log("Creating preset:", newPreset);
    setShowCreateDialog(false);
    setNewPreset({ name: "", duration: 30, type: "fixed", description: "" });
  };

  const handleEditPreset = (preset) => {
    setSelectedPreset(preset);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    console.log("Saving preset:", selectedPreset);
    setShowEditDialog(false);
    setSelectedPreset(null);
  };

  const activePresets = timerPresets.filter(p => p.active);
  const totalUsage = timerPresets.reduce((sum, p) => sum + p.usageCount, 0);

  return (
    <div className="space-y-6">
      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Global ACW Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Default Timeout (seconds)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={globalTimeout}
                  onChange={(e) => setGlobalTimeout(parseInt(e.target.value))}
                  className="w-24"
                />
                <span className="text-muted-foreground">seconds</span>
              </div>
              <p className="text-xs text-muted-foreground">Maximum ACW time before auto-complete</p>
            </div>
            <div className="space-y-2">
              <Label>Over-time Warning Threshold</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={overTimeThreshold}
                  onChange={(e) => setOverTimeThreshold(parseInt(e.target.value))}
                  className="w-24"
                />
                <span className="text-muted-foreground">seconds</span>
              </div>
              <p className="text-xs text-muted-foreground">Show warning when exceeded</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Extend Enabled</Label>
                  <p className="text-xs text-muted-foreground">Automatically extend based on rules</p>
                </div>
                <Switch
                  checked={enableAutoExtend}
                  onCheckedChange={setEnableAutoExtend}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Overtime Warning</Label>
                  <p className="text-xs text-muted-foreground">Visual warning when over threshold</p>
                </div>
                <Switch
                  checked={showOverTimeWarning}
                  onCheckedChange={setShowOverTimeWarning}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timer Presets */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ACW Timer Presets</CardTitle>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Preset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create ACW Timer Preset</DialogTitle>
                <DialogDescription>
                  Define a new ACW timer preset for specific call types
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Preset Name</label>
                  <Input
                    placeholder="e.g., Sales Call"
                    value={newPreset.name}
                    onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration (seconds)</label>
                    <Input
                      type="number"
                      value={newPreset.duration}
                      onChange={(e) => setNewPreset({ ...newPreset, duration: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Type</label>
                    <Select
                      value={newPreset.type}
                      onValueChange={(value) => setNewPreset({ ...newPreset, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Time</SelectItem>
                        <SelectItem value="variable">Variable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Input
                    placeholder="Brief description of when to use"
                    value={newPreset.description}
                    onChange={(e) => setNewPreset({ ...newPreset, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleCreatePreset}>
                    Create Preset
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Usage</TableHead>
                <TableHead className="text-right">Avg Actual</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timerPresets.map((preset) => (
                <TableRow key={preset.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      {preset.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {preset.duration}s
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {preset.type === "fixed" ? "Fixed" : "Variable"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {preset.active ? (
                      <Badge variant="default" className="bg-green-500">
                        <Play className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <Pause className="h-3 w-3 mr-1" />
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{preset.usageCount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {preset.avgActual > 0 ? `${preset.avgActual}s` : "-"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                    {preset.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditPreset(preset)}>
                        <Edit className="h-4 w-4" />
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

      {/* Timer Rules */}
      <Card>
        <CardHeader>
          <CardTitle>ACW Timer Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Priority</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timerRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <Badge variant="outline">#{rule.priority}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{rule.condition}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{rule.action}</Badge>
                  </TableCell>
                  <TableCell>
                    {rule.active ? (
                      <Badge variant="default" className="bg-green-500">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activePresets.length}</div>
            <p className="text-xs text-muted-foreground">Active Presets</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{globalTimeout}s</div>
            <p className="text-xs text-muted-foreground">Default Timeout</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">45s</div>
            <p className="text-xs text-muted-foreground">Avg ACW Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">92%</div>
            <p className="text-xs text-muted-foreground">Within Target</p>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit ACW Timer Preset</DialogTitle>
            <DialogDescription>
              Modify the timer preset settings
            </DialogDescription>
          </DialogHeader>
          {selectedPreset && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input
                    value={selectedPreset.name}
                    onChange={(e) => setSelectedPreset({ ...selectedPreset, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Duration (seconds)</label>
                  <Input
                    type="number"
                    value={selectedPreset.duration}
                    onChange={(e) => setSelectedPreset({ ...selectedPreset, duration: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Input
                  value={selectedPreset.description}
                  onChange={(e) => setSelectedPreset({ ...selectedPreset, description: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="editActive">Active</Label>
                <Switch
                  id="editActive"
                  checked={selectedPreset.active}
                  onCheckedChange={(checked) => setSelectedPreset({ ...selectedPreset, active: checked })}
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
    </div>
  );
}
