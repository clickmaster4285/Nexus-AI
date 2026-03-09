"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { callLists } from "@/lib/mock-data/dialer";
import { Upload, Edit, Archive, Download, RefreshCw, FileText, UserPlus, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

export default function CallListsPage() {
  const [lists, setLists] = useState(callLists);
  const [selectedList, setSelectedList] = useState(lists[0]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleUpload = () => {
    toast.success("File uploaded successfully. Processing...");
    setTimeout(() => toast.success("Import completed: 350 new contacts added"), 2000);
    setIsUploadOpen(false);
  };

  const handleArchive = (list) => {
    setLists(prev => prev.map(l =>
      l.id === list.id ? { ...l, status: "Archived" } : l
    ));
    toast.success(`List "${list.name}" archived`);
  };

  const handleExport = (list) => {
    toast.success(`Exporting list "${list.name}" as CSV`);
  };

  const handleRescrub = (list) => {
    toast.info(`Re-scrubbing DNC for "${list.name}"...`);
    setTimeout(() => toast.success("DNC scrub completed: 12 new DNC records found"), 2000);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-green-500 text-white";
      case "pending": return "bg-yellow-500 text-white";
      case "archived": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getSourceIcon = (source) => {
    switch (source?.toLowerCase()) {
      case "import": return <Upload className="h-4 w-4" />;
      case "crm export": return <FileText className="h-4 w-4" />;
      case "crm query": return <UserPlus className="h-4 w-4" />;
      case "api": return <RefreshCw className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Call List Management</h2>
          <p className="text-sm text-muted-foreground">Upload, manage, and organize your contact lists</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" /> Upload New List
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Call List</DialogTitle>
              <DialogDescription>Import contacts from CSV, Excel, or other file formats</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium">Drag & drop files here</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
                <p className="text-xs text-muted-foreground mt-2">Supports: CSV, XLSX, TXT (max 50MB)</p>
              </div>

              {/* File Preview Placeholder */}
              <div className="space-y-2">
                <Label>File Preview</Label>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">No file selected</p>
                </div>
              </div>

              {/* Upload Options */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>List Name *</Label>
                  <Input placeholder="Q2 Sales Prospects" />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
              <Button onClick={handleUpload}>Upload & Process</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="lists" className="w-full">
        <TabsList>
          <TabsTrigger value="lists">Call Lists</TabsTrigger>
          <TabsTrigger value="details">List Details</TabsTrigger>
        </TabsList>

        <TabsContent value="lists" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>List Name</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Contacts</TableHead>
                    <TableHead>Valid</TableHead>
                    <TableHead>DNC</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lists.map((list) => (
                    <TableRow
                      key={list.id}
                      className={cn(selectedList?.id === list.id && "bg-muted/50")}
                      onClick={() => setSelectedList(list)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{list.name}</p>
                          <p className="text-xs text-muted-foreground">{list.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getSourceIcon(list.source)}
                          <span className="text-sm">{list.source}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(list.status)}>{list.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={list.priority === "Critical" ? "destructive" : list.priority === "High" ? "default" : "secondary"}>
                          {list.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{list.total.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{list.valid.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span>{list.dnc.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); setIsEditOpen(true); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleExport(list); }}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleRescrub(list); }}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          {list.status !== "Archived" && (
                            <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleArchive(list); }}>
                              <Archive className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          {selectedList ? (
            <div className="grid gap-6">
              {/* List Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedList.name}</span>
                    <Badge className={getStatusColor(selectedList.status)}>{selectedList.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">List ID</p>
                      <p className="font-medium">{selectedList.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Source</p>
                      <p className="font-medium">{selectedList.source}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Priority</p>
                      <p className="font-medium">{selectedList.priority}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Last Import</p>
                      <p className="font-medium">{selectedList.lastImport}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-3xl font-black">{selectedList.total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground uppercase">Total</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-3xl font-black text-green-500">{selectedList.valid.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground uppercase">Valid</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-3xl font-black text-red-500">{selectedList.dnc.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground uppercase">DNC</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-3xl font-black text-orange-500">{selectedList.invalid.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground uppercase">Invalid</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-3xl font-black text-muted-foreground">{selectedList.duplicate.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground uppercase">Duplicate</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Bar */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Valid Contact Rate</span>
                      <span className="font-medium">{((selectedList.valid / selectedList.total) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(selectedList.valid / selectedList.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Assigned Campaigns */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Assigned Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedList.campaigns.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedList.campaigns.map(campaign => (
                        <Badge key={campaign} variant="outline">{campaign}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No campaigns assigned</p>
                  )}
                </CardContent>
              </Card>

              {/* Import Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Import Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Imported By</p>
                      <p className="font-medium">{selectedList.importedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Import Date</p>
                      <p className="font-medium">{selectedList.lastImport}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Select a call list to view details</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
