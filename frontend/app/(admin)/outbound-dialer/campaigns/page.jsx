"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { campaigns, campaignTypes, dispositionSets } from "@/lib/mock-data/dialer";
import { PhoneCall, Plus, Play, Pause, Copy, Download, TrendingUp, Users, Clock, PhoneOff, PhoneIncoming, CheckCircle, AlertCircle } from "lucide-react";

export default function CampaignsPage() {
  const [campaignsList, setCampaignsList] = useState(campaigns);
  const [selectedCampaign, setSelectedCampaign] = useState(campaignsList[0]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "Predictive",
    status: "Draft",
    startDate: "",
    endDate: "",
    callerId: "",
    maxDialAttempts: 3,
    retryInterval: 60,
    maxRingTime: 25,
    amdEnabled: true,
    dncScrub: true,
    timezoneDialing: true,
  });

  const handleSaveDraft = () => {
    toast.success("Campaign draft saved successfully");
    setIsCreateOpen(false);
  };

  const handleLaunchCampaign = () => {
    toast.success("Campaign launched successfully");
    setIsCreateOpen(false);
  };

  const handlePauseResume = (campaign) => {
    setCampaignsList(prev => prev.map(c =>
      c.id === campaign.id
        ? { ...c, status: c.status === "Active" ? "Paused" : "Active" }
        : c
    ));
    toast.success(`Campaign ${campaign.status === "Active" ? "paused" : "resumed"} successfully`);
  };

  const handleDuplicate = (campaign) => {
    toast.success(`Campaign "${campaign.name}" duplicated`);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-green-500 text-white";
      case "paused": return "bg-yellow-500 text-white";
      case "draft": return "bg-gray-500 text-white";
      case "completed": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "predictive": return "bg-purple-500 text-white";
      case "progressive": return "bg-blue-500 text-white";
      case "preview": return "bg-cyan-500 text-white";
      case "power": return "bg-orange-500 text-white";
      case "robocall": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const connectRate = selectedCampaign ? ((selectedCampaign.connected / selectedCampaign.dialed) * 100).toFixed(1) : 0;
  const abandonRate = selectedCampaign ? ((selectedCampaign.abandoned / selectedCampaign.dialed) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Campaign Management</h2>
          <p className="text-sm text-muted-foreground">Create, configure, and monitor your outbound campaigns</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Create New Campaign</DialogTitle>
              <DialogDescription>Configure your outbound dialing campaign settings</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name *</Label>
                  <Input
                    id="name"
                    placeholder="Q2 Sales Outreach"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Campaign Type *</Label>
                  <Select value={newCampaign.type} onValueChange={(v) => setNewCampaign({ ...newCampaign, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {campaignTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" value={newCampaign.startDate} onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" value={newCampaign.endDate} onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })} />
                </div>
              </div>

              {/* Dialing Settings */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Dialing Settings</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Caller ID (ANI) *</Label>
                    <Input placeholder="+1-555-0100" value={newCampaign.callerId} onChange={(e) => setNewCampaign({ ...newCampaign, callerId: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Dial Attempts</Label>
                    <Input type="number" value={newCampaign.maxDialAttempts} onChange={(e) => setNewCampaign({ ...newCampaign, maxDialAttempts: parseInt(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Retry Interval (min)</Label>
                    <Input type="number" value={newCampaign.retryInterval} onChange={(e) => setNewCampaign({ ...newCampaign, retryInterval: parseInt(e.target.value) })} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Max Ring Time (sec)</Label>
                    <Input type="number" value={newCampaign.maxRingTime} onChange={(e) => setNewCampaign({ ...newCampaign, maxRingTime: parseInt(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Disposition Set</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select set" /></SelectTrigger>
                      <SelectContent>
                        {dispositionSets.map(ds => (
                          <SelectItem key={ds.id} value={ds.id}>{ds.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Queue Assignment</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select queue" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales Outbound</SelectItem>
                        <SelectItem value="retention">Retention</SelectItem>
                        <SelectItem value="surveys">Surveys</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Switch checked={newCampaign.amdEnabled} onCheckedChange={(c) => setNewCampaign({ ...newCampaign, amdEnabled: c })} />
                  <Label>AMD Detection</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={newCampaign.dncScrub} onCheckedChange={(c) => setNewCampaign({ ...newCampaign, dncScrub: c })} />
                  <Label>DNC Scrub</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={newCampaign.timezoneDialing} onCheckedChange={(c) => setNewCampaign({ ...newCampaign, timezoneDialing: c })} />
                  <Label>Timezone Dialing</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
              <Button onClick={handleLaunchCampaign}>Launch Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Campaign List</TabsTrigger>
          <TabsTrigger value="performance">Performance Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Connected</TableHead>
                    <TableHead>Conv. Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignsList.map((campaign) => (
                    <TableRow
                      key={campaign.id}
                      className={cn(selectedCampaign?.id === campaign.id && "bg-muted/50")}
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-xs text-muted-foreground">{campaign.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(campaign.type)}>{campaign.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="w-24">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{Math.round((campaign.dialed / campaign.contacts) * 100)}%</span>
                          </div>
                          <Progress value={(campaign.dialed / campaign.contacts) * 100} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.connected.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{((campaign.connected / campaign.dialed) * 100).toFixed(1)}%</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{campaign.conversionRate}%</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {campaign.status === "Active" && (
                            <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handlePauseResume(campaign); }}>
                              <Pause className="h-4 w-4" />
                            </Button>
                          )}
                          {campaign.status === "Paused" && (
                            <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handlePauseResume(campaign); }}>
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDuplicate(campaign); }}>
                            <Copy className="h-4 w-4" />
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

        <TabsContent value="performance" className="mt-4">
          {/* Campaign Selector */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Label className="whitespace-nowrap">Select Campaign:</Label>
                <Select value={selectedCampaign?.id} onValueChange={(id) => setSelectedCampaign(campaignsList.find(c => c.id === id))}>
                  <SelectTrigger className="w-64"><SelectValue placeholder="Select campaign" /></SelectTrigger>
                  <SelectContent>
                    {campaignsList.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handlePauseResume(selectedCampaign)}>
                    {selectedCampaign?.status === "Active" ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {selectedCampaign?.status === "Active" ? "Pause" : "Resume"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.success("Campaign data export initialized", {
                      description: `Downloading performance report for ${selectedCampaign.name}.`
                    })}
                  >
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedCampaign && (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Total Contacts</p>
                        <p className="text-2xl font-black">{selectedCampaign.contacts.toLocaleString()}</p>
                      </div>
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Dialed</p>
                        <p className="text-2xl font-black">{selectedCampaign.dialed.toLocaleString()}</p>
                      </div>
                      <PhoneCall className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Connected</p>
                        <p className="text-2xl font-black">{selectedCampaign.connected.toLocaleString()}</p>
                        <p className="text-xs text-green-500 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />{connectRate}%
                        </p>
                      </div>
                      <PhoneIncoming className="h-5 w-5 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">AMD Detected</p>
                        <p className="text-2xl font-black">{selectedCampaign.amd.toLocaleString()}</p>
                      </div>
                      <PhoneOff className="h-5 w-5 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Abandoned</p>
                        <p className={cn("text-2xl font-black", parseFloat(abandonRate) > 3 ? "text-red-500" : "")}>
                          {selectedCampaign.abandoned.toLocaleString()}
                        </p>
                        <p className={cn("text-xs flex items-center", parseFloat(abandonRate) > 3 ? "text-red-500" : "text-muted-foreground")}>
                          {parseFloat(abandonRate) > 3 ? <AlertCircle className="h-3 w-3 mr-1" /> : null}
                          {abandonRate}%
                        </p>
                      </div>
                      <PhoneOff className={cn("h-5 w-5", parseFloat(abandonRate) > 3 ? "text-red-500" : "text-muted-foreground")} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">DNC Skipped</p>
                        <p className="text-2xl font-black">{selectedCampaign.dncSkipped.toLocaleString()}</p>
                      </div>
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Completed</p>
                        <p className="text-2xl font-black">{selectedCampaign.completed.toLocaleString()}</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Pending</p>
                        <p className="text-2xl font-black">{selectedCampaign.pending.toLocaleString()}</p>
                      </div>
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Conv. Rate</p>
                        <p className="text-2xl font-black text-green-500">{selectedCampaign.conversionRate}%</p>
                      </div>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Dial Rate</p>
                        <p className="text-2xl font-black">{selectedCampaign.dialRate}</p>
                        <p className="text-xs text-muted-foreground">calls/hr</p>
                      </div>
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Time Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Connect Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black">{selectedCampaign.avgConnectTime}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Handle Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black">{selectedCampaign.avgHandleTime}</p>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
