"use client";

import { useState } from "react";
import { Plus, Play, Pause, Edit, Trash2, Copy, Phone, Clock, FileAudio } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock campaigns
const campaigns = [
  {
    id: 1,
    name: "Payment Reminder - Week 1",
    status: "Active",
    type: "Reminder",
    scheduled: "2024-01-15 09:00",
    contacts: 5000,
    delivered: 4250,
    answered: 3187,
    completed: 2890,
    optOuts: 45,
    scheduleType: "One-time",
    retryAttempts: 3,
    voiceFile: "payment_reminder_v2.wav",
  },
  {
    id: 2,
    name: "Appointment Confirmation",
    status: "Active",
    type: "Confirmation",
    scheduled: "2024-01-15 10:00",
    contacts: 2500,
    delivered: 2100,
    answered: 1800,
    completed: 1650,
    optOuts: 12,
    scheduleType: "Recurring",
    voiceFile: "appointment_confirm.wav",
  },
  {
    id: 3,
    name: "Service Notification",
    status: "Paused",
    type: "Notification",
    scheduled: "2024-01-16 09:00",
    contacts: 8000,
    delivered: 0,
    answered: 0,
    completed: 0,
    optOuts: 0,
    scheduleType: "One-time",
    voiceFile: "service_notice.wav",
  },
  {
    id: 4,
    name: "Survey - Customer Feedback",
    status: "Completed",
    type: "Survey",
    scheduled: "2024-01-14 09:00",
    contacts: 3000,
    delivered: 2850,
    answered: 1200,
    completed: 980,
    optOuts: 25,
    scheduleType: "One-time",
    voiceFile: "survey_intro.wav",
  },
  {
    id: 5,
    name: "Promotional Offer - Weekend",
    status: "Draft",
    type: "Promotional",
    scheduled: "2024-01-20 10:00",
    contacts: 15000,
    delivered: 0,
    answered: 0,
    completed: 0,
    optOuts: 0,
    scheduleType: "One-time",
    voiceFile: "promo_weekend.wav",
  },
];

const voiceFiles = [
  { id: 1, name: "payment_reminder_v2.wav", duration: "0:30", uploaded: "2024-01-10" },
  { id: 2, name: "appointment_confirm.wav", duration: "0:45", uploaded: "2024-01-12" },
  { id: 3, name: "service_notice.wav", duration: "1:00", uploaded: "2024-01-08" },
  { id: 4, name: "survey_intro.wav", duration: "0:20", uploaded: "2024-01-14" },
  { id: 5, name: "promo_weekend.wav", duration: "0:35", uploaded: "2024-01-13" },
];

export default function CampaignConfigPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "reminder",
    scheduleType: "one-time",
    scheduledDate: "",
    scheduledTime: "",
    contacts: 0,
    voiceFile: "",
    retryAttempts: 3,
    retryDelay: 30,
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = filterStatus === "all" || campaign.status.toLowerCase() === filterStatus;
    const matchesType = filterType === "all" || campaign.type.toLowerCase() === filterType.toLowerCase();
    return matchesStatus && matchesType;
  });

  const handleCreateCampaign = () => {
    console.log("Creating campaign:", newCampaign);
    setShowCreateDialog(false);
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    console.log("Saving campaign:", selectedCampaign);
    setShowEditDialog(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500"><Play className="h-3 w-3 mr-1" />Active</Badge>;
      case "Paused":
        return <Badge variant="secondary"><Pause className="h-3 w-3 mr-1" />Paused</Badge>;
      case "Completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "Draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDeliveryRate = (delivered, contacts) => {
    return contacts > 0 ? ((delivered / contacts) * 100).toFixed(1) : 0;
  };

  const getAnswerRate = (answered, delivered) => {
    return delivered > 0 ? ((answered / delivered) * 100).toFixed(1) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="reminder">Reminder</SelectItem>
              <SelectItem value="confirmation">Confirmation</SelectItem>
              <SelectItem value="notification">Notification</SelectItem>
              <SelectItem value="survey">Survey</SelectItem>
              <SelectItem value="promotional">Promotional</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Robocall Campaign</DialogTitle>
              <DialogDescription>
                Configure a new automated voice broadcast campaign
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="text-sm font-medium mb-2 block">Campaign Name</label>
                <Input
                  placeholder="e.g., Payment Reminder - Week 1"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Campaign Type</label>
                  <Select
                    value={newCampaign.type}
                    onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="confirmation">Confirmation</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                      <SelectItem value="survey">Survey</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Schedule Type</label>
                  <Select
                    value={newCampaign.scheduleType}
                    onValueChange={(value) => setNewCampaign({ ...newCampaign, scheduleType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="recurring">Recurring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Scheduled Date</label>
                  <Input
                    type="date"
                    value={newCampaign.scheduledDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, scheduledDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Scheduled Time</label>
                  <Input
                    type="time"
                    value={newCampaign.scheduledTime}
                    onChange={(e) => setNewCampaign({ ...newCampaign, scheduledTime: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Voice File</label>
                <Select
                  value={newCampaign.voiceFile}
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, voiceFile: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice file" />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceFiles.map((file) => (
                      <SelectItem key={file.id} value={file.name}>
                        {file.name} ({file.duration})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Retry Attempts</label>
                  <Input
                    type="number"
                    value={newCampaign.retryAttempts}
                    onChange={(e) => setNewCampaign({ ...newCampaign, retryAttempts: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Retry Delay (seconds)</label>
                  <Input
                    type="number"
                    value={newCampaign.retryDelay}
                    onChange={(e) => setNewCampaign({ ...newCampaign, retryDelay: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleCreateCampaign}>
                  Create Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead className="text-right">Contacts</TableHead>
                <TableHead className="text-right">Delivered</TableHead>
                <TableHead className="text-right">Answered</TableHead>
                <TableHead className="text-right">Completed</TableHead>
                <TableHead className="text-right">Opt-Outs</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {campaign.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{campaign.type}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {campaign.scheduled}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{campaign.contacts.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span>{campaign.delivered.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">
                        {getDeliveryRate(campaign.delivered, campaign.contacts)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span>{campaign.answered.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">
                        {getAnswerRate(campaign.answered, campaign.delivered)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{campaign.completed.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-red-500">{campaign.optOuts}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {campaign.status === "Draft" || campaign.status === "Paused" ? (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4 text-green-500" />
                        </Button>
                      ) : campaign.status === "Active" ? (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : null}
                      <Button variant="ghost" size="sm" onClick={() => handleEditCampaign(campaign)}>
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

      {/* Voice Files */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileAudio className="h-5 w-5" />
            Voice Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voiceFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileAudio className="h-4 w-4 text-muted-foreground" />
                      {file.name}
                    </div>
                  </TableCell>
                  <TableCell>{file.duration}</TableCell>
                  <TableCell className="text-muted-foreground">{file.uploaded}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
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

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Modify campaign settings
            </DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="text-sm font-medium mb-2 block">Campaign Name</label>
                <Input
                  value={selectedCampaign.name}
                  onChange={(e) => setSelectedCampaign({ ...selectedCampaign, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select
                    value={selectedCampaign.status.toLowerCase()}
                    onValueChange={(value) => setSelectedCampaign({ ...selectedCampaign, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Campaign Type</label>
                  <Select
                    value={selectedCampaign.type.toLowerCase()}
                    onValueChange={(value) => setSelectedCampaign({ ...selectedCampaign, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="confirmation">Confirmation</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                      <SelectItem value="survey">Survey</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
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
