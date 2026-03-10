"use client";

import { useState } from "react";
import { Plus, Clock, Calendar, Trash2, Edit, Play, Pause, Sun, Moon, Sunset } from "lucide-react";
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

// Mock calling windows
const callingWindows = [
  {
    id: 1,
    name: "Standard Business Hours",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    startTime: "09:00",
    endTime: "17:00",
    timezone: "America/New_York",
    status: "Active",
    campaigns: ["Sales Campaign", "Support Campaign"],
    type: "Business"
  },
  {
    id: 2,
    name: "Extended Hours",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    startTime: "08:00",
    endTime: "20:00",
    timezone: "America/New_York",
    status: "Active",
    campaigns: ["Sales Campaign"],
    type: "Extended"
  },
  {
    id: 3,
    name: "Weekend Campaign",
    days: ["Sat", "Sun"],
    startTime: "10:00",
    endTime: "14:00",
    timezone: "America/New_York",
    status: "Paused",
    campaigns: ["Weekend Outreach"],
    type: "Weekend"
  },
  {
    id: 4,
    name: "Follow-up Campaign",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    startTime: "18:00",
    endTime: "21:00",
    timezone: "America/New_York",
    status: "Active",
    campaigns: ["Follow-up Campaign"],
    type: "Evening"
  },
  {
    id: 5,
    name: "No Calling Period",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    startTime: "21:00",
    endTime: "08:00",
    timezone: "America/New_York",
    status: "Active",
    campaigns: ["All Campaigns"],
    type: "Block"
  },
];

// Mock state regulations
const stateRegulations = [
  { state: "California", timeZone: "PST", restrictWeekends: true, maxCallsPerDay: 3, notes: "Strict TCPA compliance required" },
  { state: "New York", timeZone: "EST", restrictWeekends: true, maxCallsPerDay: 3, notes: "Consumer protection laws apply" },
  { state: "Texas", timeZone: "CST", restrictWeekends: false, maxCallsPerDay: 4, notes: "Standard TCPA compliance" },
  { state: "Florida", timeZone: "EST", restrictWeekends: true, maxCallsPerDay: 3, notes: "State DNC list also applies" },
];

export default function CallingWindowsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newWindow, setNewWindow] = useState({
    name: "",
    days: [],
    startTime: "09:00",
    endTime: "17:00",
    timezone: "America/New_York",
    type: "Business"
  });
  const [enableTimezoneRules, setEnableTimezoneRules] = useState(true);

  const getDayIcon = (day) => {
    if (day === "Sun" || day === "Sat") return "weekend";
    return "weekday";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Business": return <Sun className="h-4 w-4" />;
      case "Extended": return <Sunset className="h-4 w-4" />;
      case "Evening": return <Moon className="h-4 w-4" />;
      case "Weekend": return <Calendar className="h-4 w-4" />;
      case "Block": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleCreateWindow = () => {
    console.log("Creating window:", newWindow);
    setShowCreateDialog(false);
    setNewWindow({
      name: "",
      days: [],
      startTime: "09:00",
      endTime: "17:00",
      timezone: "America/New_York",
      type: "Business"
    });
  };

  const toggleDay = (day) => {
    setNewWindow(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Create Button */}
      <div className="flex justify-end">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Calling Window
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Calling Window</DialogTitle>
              <DialogDescription>
                Define when calls are allowed to be made
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Window Name</label>
                <Input
                  placeholder="e.g., Standard Business Hours"
                  value={newWindow.name}
                  onChange={(e) => setNewWindow({ ...newWindow, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Window Type</label>
                <Select
                  value={newWindow.type}
                  onValueChange={(value) => setNewWindow({ ...newWindow, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Business">Business Hours</SelectItem>
                    <SelectItem value="Extended">Extended Hours</SelectItem>
                    <SelectItem value="Evening">Evening</SelectItem>
                    <SelectItem value="Weekend">Weekend</SelectItem>
                    <SelectItem value="Block">Block Period</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Days of Week</label>
                <div className="flex gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <Button
                      key={day}
                      variant={newWindow.days.includes(day) ? "default" : "outline"}
                      size="sm"
                      className="w-12"
                      onClick={() => toggleDay(day)}
                    >
                      {day.charAt(0)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Time</label>
                  <Input
                    type="time"
                    value={newWindow.startTime}
                    onChange={(e) => setNewWindow({ ...newWindow, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">End Time</label>
                  <Input
                    type="time"
                    value={newWindow.endTime}
                    onChange={(e) => setNewWindow({ ...newWindow, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Timezone</label>
                <Select
                  value={newWindow.timezone}
                  onValueChange={(value) => setNewWindow({ ...newWindow, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern (EST/EDT)</SelectItem>
                    <SelectItem value="America/Chicago">Central (CST/CDT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain (MST/MDT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific (PST/PDT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleCreateWindow}>
                  Create Window
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calling Windows Table */}
      <Card>
        <CardHeader>
          <CardTitle>Calling Windows</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Timezone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Campaigns</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callingWindows.map((window) => (
                <TableRow key={window.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(window.type)}
                      {window.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <Badge
                          key={day}
                          variant={window.days.includes(day) ? "default" : "outline"}
                          className="w-6 h-6 p-0 flex items-center justify-center text-xs"
                        >
                          {day.charAt(0)}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {window.startTime} - {window.endTime}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{window.timezone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{window.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={window.status === "Active" ? "default" : "secondary"}>
                      {window.status === "Active" ? <Play className="h-3 w-3 mr-1" /> : <Pause className="h-3 w-3 mr-1" />}
                      {window.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {window.campaigns.slice(0, 2).map((campaign) => (
                        <Badge key={campaign} variant="outline" className="text-xs">
                          {campaign}
                        </Badge>
                      ))}
                      {window.campaigns.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{window.campaigns.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
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

      {/* State Regulations */}
      <Card>
        <CardHeader>
          <CardTitle>State-Specific Regulations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead>Timezone</TableHead>
                <TableHead>Weekend Restriction</TableHead>
                <TableHead>Max Calls/Day</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stateRegulations.map((reg) => (
                <TableRow key={reg.state}>
                  <TableCell className="font-medium">{reg.state}</TableCell>
                  <TableCell className="text-muted-foreground">{reg.timeZone}</TableCell>
                  <TableCell>
                    <Badge variant={reg.restrictWeekends ? "destructive" : "secondary"}>
                      {reg.restrictWeekends ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>{reg.maxCallsPerDay}</TableCell>
                  <TableCell className="text-muted-foreground">{reg.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="timezoneRules">Enable Timezone-Based Rules</Label>
              <p className="text-xs text-muted-foreground">Restrict calls based on recipient&apos;s timezone</p>
            </div>
            <Switch
              id="timezoneRules"
              checked={enableTimezoneRules}
              onCheckedChange={setEnableTimezoneRules}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Default Calling Window</Label>
              <p className="text-xs text-muted-foreground">Applied when no specific window is defined</p>
            </div>
            <Select defaultValue="business">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Standard Business Hours</SelectItem>
                <SelectItem value="extended">Extended Hours</SelectItem>
                <SelectItem value="24hr">24/7</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
