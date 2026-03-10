"use client";

import { useState } from "react";
import { Search, RefreshCw, CheckCircle, XCircle, AlertTriangle, Phone, Clock, Shield } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock national registry data
const registryChecks = [
  { id: 1, phone: "+1 (555) 123-4567", timestamp: "2024-01-15 14:32:15", result: "Listed", listType: "National", status: "Completed" },
  { id: 2, phone: "+1 (555) 234-5678", timestamp: "2024-01-15 14:28:33", result: "Not Listed", listType: "-", status: "Completed" },
  { id: 3, phone: "+1 (555) 345-6789", timestamp: "2024-01-15 14:25:47", result: "Listed", listType: "National + State", status: "Completed" },
  { id: 4, phone: "+1 (555) 456-7890", timestamp: "2024-01-15 14:22:11", result: "Listed", listType: "State (CA)", status: "Completed" },
  { id: 5, phone: "+1 (555) 567-8901", timestamp: "2024-01-15 14:18:55", result: "Not Listed", listType: "-", status: "Completed" },
  { id: 6, phone: "+1 (555) 678-9012", timestamp: "2024-01-15 14:15:00", result: "Listed", listType: "National", status: "Completed" },
  { id: 7, phone: "+1 (555) 789-0123", timestamp: "2024-01-15 14:10:22", result: "Not Listed", listType: "-", status: "Completed" },
];

// Mock scheduled scrubs
const scheduledScrubs = [
  { id: 1, name: "Daily Call List Scrub", frequency: "Daily", nextRun: "2024-01-16 00:00", lastRun: "2024-01-15 00:00", recordsProcessed: 1250, status: "Active" },
  { id: 2, name: "Weekly Full Scrub", frequency: "Weekly", nextRun: "2024-01-21 00:00", lastRun: "2024-01-14 00:00", recordsProcessed: 5420, status: "Active" },
  { id: 3, name: "Monthly Archive Scrub", frequency: "Monthly", nextRun: "2024-02-01 00:00", lastRun: "2024-01-01 00:00", recordsProcessed: 15000, status: "Paused" },
];

export default function NationalRegistryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrubEnabled, setScrubEnabled] = useState(true);
  const [autoScrub, setAutoScrub] = useState(true);
  const [scrubTiming, setScrubTiming] = useState("pre-dial");
  const [lastSync, setLastSync] = useState("2024-01-15 14:00:00");

  const filteredChecks = registryChecks.filter(check =>
    check.phone.includes(searchQuery)
  );

  const getResultColor = (result) => {
    return result === "Listed" ? "text-red-500" : "text-green-500";
  };

  const getResultIcon = (result) => {
    return result === "Listed" ? <XCircle className="h-4 w-4 text-red-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Quick Lookup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            National DNC Quick Lookup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter phone number to check..."
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Check
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              Last Sync: {lastSync}
            </div>
            <Button variant="link" size="sm">
              Sync Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">Total Registry Hits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-500">2,458</div>
            <p className="text-xs text-muted-foreground">Numbers Blocked Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">Scrub Success Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">Compliant</div>
            <p className="text-xs text-muted-foreground">FCC Status</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Checks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Registry Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phone Number</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>List Type</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChecks.map((check) => (
                <TableRow key={check.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {check.phone}
                    </div>
                  </TableCell>
                  <TableCell className={getResultColor(check.result)}>
                    <div className="flex items-center gap-2">
                      {getResultIcon(check.result)}
                      {check.result}
                    </div>
                  </TableCell>
                  <TableCell>
                    {check.listType !== "-" && <Badge variant="outline">{check.listType}</Badge>}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{check.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{check.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Scheduled Scrubs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Scheduled Scrubs</span>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledScrubs.map((scrub) => (
                <TableRow key={scrub.id}>
                  <TableCell className="font-medium">{scrub.name}</TableCell>
                  <TableCell><Badge variant="outline">{scrub.frequency}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{scrub.nextRun}</TableCell>
                  <TableCell className="text-muted-foreground">{scrub.lastRun}</TableCell>
                  <TableCell>{scrub.recordsProcessed.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={scrub.status === "Active" ? "default" : "secondary"}>
                      {scrub.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Run Now</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
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
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Registry Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="scrubEnabled">Enable National DNC Scrubbing</Label>
              <p className="text-xs text-muted-foreground">Check numbers against national DNC registry</p>
            </div>
            <Switch
              id="scrubEnabled"
              checked={scrubEnabled}
              onCheckedChange={setScrubEnabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoScrub">Auto-Scrub on Dial</Label>
              <p className="text-xs text-muted-foreground">Automatically check numbers before dialing</p>
            </div>
            <Switch
              id="autoScrub"
              checked={autoScrub}
              onCheckedChange={setAutoScrub}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Scrub Timing</Label>
              <p className="text-xs text-muted-foreground">When to check numbers against registry</p>
            </div>
            <Select value={scrubTiming} onValueChange={setScrubTiming}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pre-dial">Pre-Dial</SelectItem>
                <SelectItem value="preview">Preview</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
