"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  History,
  Search,
  Download,
  Eye,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  FileSpreadsheet,
  Database,
  Filter,
  Play,
  Pause,
  AlertTriangle
} from "lucide-react";

// Mock import history data
const importHistory = [
  {
    id: "imp-001",
    fileName: "customer_data_q1_2024.csv",
    fileSize: "2.4 MB",
    module: "Contacts",
    status: "completed",
    startTime: "2024-01-20 09:30",
    endTime: "2024-01-20 09:45",
    totalRows: 15000,
    imported: 14950,
    skipped: 45,
    failed: 5,
    user: "John Doe",
  },
  {
    id: "imp-002",
    fileName: "leads_january.xlsx",
    fileSize: "1.8 MB",
    module: "Leads",
    status: "completed",
    startTime: "2024-01-19 14:15",
    endTime: "2024-01-19 14:22",
    totalRows: 8500,
    imported: 8470,
    skipped: 25,
    failed: 5,
    user: "Sarah Smith",
  },
  {
    id: "imp-003",
    fileName: "accounts_backup.zip",
    fileSize: "5.2 MB",
    module: "Accounts",
    status: "failed",
    startTime: "2024-01-19 11:00",
    endTime: "2024-01-19 11:05",
    totalRows: 12000,
    imported: 0,
    skipped: 0,
    failed: 12000,
    user: "Mike Johnson",
    error: "Invalid file format",
  },
  {
    id: "imp-004",
    fileName: "dialer_list_week4.csv",
    fileSize: "890 KB",
    module: "Dialer Call List",
    status: "in_progress",
    startTime: "2024-01-20 15:45",
    endTime: null,
    totalRows: 5200,
    imported: 3100,
    skipped: 50,
    failed: 0,
    user: "Emily Brown",
  },
  {
    id: "imp-005",
    fileName: "new_contacts.json",
    fileSize: "450 KB",
    module: "Contacts",
    status: "completed",
    startTime: "2024-01-18 16:30",
    endTime: "2024-01-18 16:32",
    totalRows: 2500,
    imported: 2495,
    skipped: 3,
    failed: 2,
    user: "John Doe",
  },
  {
    id: "imp-006",
    fileName: "prospects_q1.csv",
    fileSize: "1.2 MB",
    module: "Leads",
    status: "paused",
    startTime: "2024-01-20 10:00",
    endTime: null,
    totalRows: 7500,
    imported: 4200,
    skipped: 100,
    failed: 0,
    user: "Lisa Davis",
  },
  {
    id: "imp-007",
    fileName: "customer_updates.xlsx",
    fileSize: "980 KB",
    module: "Contacts",
    status: "completed",
    startTime: "2024-01-17 13:20",
    endTime: "2024-01-17 13:28",
    totalRows: 4200,
    imported: 4180,
    skipped: 15,
    failed: 5,
    user: "Sarah Smith",
  },
  {
    id: "imp-008",
    fileName: "campaign_data.csv",
    fileSize: "340 KB",
    module: "Dialer Call List",
    status: "completed",
    startTime: "2024-01-16 09:00",
    endTime: "2024-01-16 09:02",
    totalRows: 1800,
    imported: 1795,
    skipped: 3,
    failed: 2,
    user: "Mike Johnson",
  },
];

export default function ImportHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [selectedImport, setSelectedImport] = useState(null);

  const filteredHistory = importHistory.filter(item => {
    const matchesSearch = item.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesModule = moduleFilter === "all" || item.module.toLowerCase().includes(moduleFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesModule;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-500 text-white";
      case "failed": return "bg-red-500 text-white";
      case "in_progress": return "bg-blue-500 text-white";
      case "paused": return "bg-yellow-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "failed": return XCircle;
      case "in_progress": return RefreshCw;
      case "paused": return Pause;
      default: return Clock;
    }
  };

  const totalImports = importHistory.length;
  const completedImports = importHistory.filter(i => i.status === "completed").length;
  const totalRecords = importHistory.reduce((sum, i) => sum + i.totalRows, 0);
  const totalImported = importHistory.reduce((sum, i) => sum + i.imported, 0);

  const handlePauseResume = (item) => {
    toast.success(item.status === "paused" ? "Import resumed" : "Import paused");
  };

  const handleRetry = () => {
    toast.success("Import retry started");
  };

  const handleDelete = () => {
    toast.success("Import record deleted");
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Total Imports</p>
                <p className="text-2xl font-black">{totalImports}</p>
              </div>
              <History className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Completed</p>
                <p className="text-2xl font-black text-green-500">{completedImports}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Total Records</p>
                <p className="text-2xl font-black">{totalRecords.toLocaleString()}</p>
              </div>
              <Database className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Imported</p>
                <p className="text-2xl font-black text-green-500">{totalImported.toLocaleString()}</p>
              </div>
              <FileSpreadsheet className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Module" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="contacts">Contacts</SelectItem>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="accounts">Accounts</SelectItem>
                <SelectItem value="dialer">Dialer Call List</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" /> More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Imported</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => {
                const StatusIcon = getStatusIcon(item.status);
                const progress = Math.round((item.imported / item.totalRows) * 100);
                return (
                  <TableRow
                    key={item.id}
                    className={cn(selectedImport?.id === item.id && "bg-muted/50")}
                    onClick={() => setSelectedImport(item)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{item.fileName}</p>
                          <p className="text-xs text-muted-foreground">{item.fileSize}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.module}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        <StatusIcon className={cn("h-3 w-3 mr-1", item.status === "in_progress" && "animate-spin")} />
                        {item.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{item.startTime}</p>
                        {item.endTime && <p className="text-xs text-muted-foreground">to {item.endTime}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-24">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{item.imported.toLocaleString()}</p>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          {item.skipped > 0 && <span className="text-yellow-600">Skip: {item.skipped}</span>}
                          {item.failed > 0 && <span className="text-red-600">Fail: {item.failed}</span>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{item.user}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {item.status === "in_progress" && (
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handlePauseResume(item); }}>
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                        {item.status === "paused" && (
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handlePauseResume(item); }}>
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {item.status === "failed" && (
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleRetry(item); }}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); toast.info("Viewing details"); }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); }}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDelete(item); }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Details Panel */}
      {selectedImport && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Import Details</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setSelectedImport(null)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">File Name</p>
                <p className="font-medium">{selectedImport.fileName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Module</p>
                <p className="font-medium">{selectedImport.module}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">User</p>
                <p className="font-medium">{selectedImport.user}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <Badge className={getStatusColor(selectedImport.status)}>{selectedImport.status.replace("_", " ")}</Badge>
              </div>
            </div>
            {selectedImport.error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-4 w-4" />
                  <p className="font-medium">Error: {selectedImport.error}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}