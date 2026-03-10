"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileUp,
  Upload,
  FileSpreadsheet,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Database,
  Table,
  RefreshCw,
  Play,
  Settings,
  FileJson,
  FileArchive,
  X,
  Check
} from "lucide-react";

// File types supported
const supportedFormats = [
  { ext: ".csv", label: "CSV", icon: FileSpreadsheet },
  { ext: ".xlsx", label: "Excel", icon: FileSpreadsheet },
  { ext: ".xls", label: "Excel 97", icon: FileSpreadsheet },
  { ext: ".json", label: "JSON", icon: FileJson },
  { ext: ".txt", label: "Text", icon: FileText },
  { ext: ".zip", label: "ZIP Archive", icon: FileArchive },
];

// Sample field mappings
const fieldMappings = [
  { source: "first_name", target: "firstName", type: "string" },
  { source: "last_name", target: "lastName", type: "string" },
  { source: "email", target: "email", type: "email" },
  { source: "phone", target: "phoneNumber", type: "phone" },
  { source: "company", target: "companyName", type: "string" },
  { source: "address", target: "address", type: "string" },
  { source: "city", target: "city", type: "string" },
  { source: "state", target: "state", type: "string" },
  { source: "zip", target: "zipCode", type: "string" },
  { source: "country", target: "country", type: "string" },
];

// Target modules
const targetModules = [
  { id: "contacts", label: "Contacts", count: 45230 },
  { id: "leads", label: "Leads", count: 12840 },
  { id: "accounts", label: "Accounts", count: 8920 },
  { id: "dialer", label: "Dialer Call List", count: 34560 },
];

export default function FileWizardPage() {
  const [step, setStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [selectedModule, setSelectedModule] = useState("contacts");
  const [mappings, setMappings] = useState(fieldMappings);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
      });

      // Simulate parsed data
      setFileData({
        headers: ["first_name", "last_name", "email", "phone", "company", "address", "city", "state", "zip"],
        rows: Array.from({ length: 10 }, (_, i) => ({
          first_name: ["John", "Sarah", "Mike", "Emily", "David", "Jennifer", "Robert", "Lisa", "James", "Mary"][i],
          last_name: ["Smith", "Johnson", "Williams", "Brown", "Lee", "Garcia", "Martinez", "Davis", "Miller", "Wilson"][i],
          email: `user${i + 1}@example.com`,
          phone: `+1-555-${String(1000 + i).padStart(4, '0')}`,
          company: ["Acme Corp", "Tech Inc", "Global Ltd", "Solutions LLC", "Enterprises", "Systems Co", "Digital Hub", "Data Corp", "Cloud Services", "Network Inc"][i],
          address: [`${100 + i} Main St`, `${200 + i} Oak Ave`, `${300 + i} Pine Rd`, `${400 + i} Elm Blvd`, `${500 + i} Maple Dr`,
            `${600 + i} Cedar Ln`, `${700 + i} Birch Way`, `${800 + i} Willow Ct`, `${900 + i} Ash Pl`, `${1000 + i} Spruce Ave`][i],
          city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"][i],
          state: ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA"][i],
          zip: [`${10000 + i}`, `${90001 + i}`, `${60601 + i}`, `${77001 + i}`, `${85001 + i}`,
            `${19101 + i}`, `${78201 + i}`, `${92101 + i}`, `${75201 + i}`, `${95101 + i}`][i],
        })),
        totalRows: 15000,
      });

      setValidationErrors([
        { row: 5, column: "email", message: "Invalid email format" },
        { row: 12, column: "phone", message: "Invalid phone number" },
        { row: 8, column: "zip", message: "Invalid ZIP code" },
      ]);

      toast.success("File uploaded successfully");
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileData(null);
    setMappings(fieldMappings);
    setValidationErrors([]);
    setStep(1);
  };

  const handleUpdateMapping = (source, target) => {
    setMappings(prev => prev.map(m =>
      m.source === source ? { ...m, target } : m
    ));
  };

  const handleStartImport = () => {
    toast.success("Import started successfully");
    setStep(4);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4">
        {[
          { num: 1, label: "Upload" },
          { num: 2, label: "Configure" },
          { num: 3, label: "Validate" },
          { num: 4, label: "Import" },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
              step >= s.num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {step > s.num ? <Check className="h-5 w-5" /> : s.num}
            </div>
            <span className={cn(
              "ml-2 text-sm font-medium",
              step >= s.num ? "text-foreground" : "text-muted-foreground"
            )}>
              {s.label}
            </span>
            {i < 3 && (
              <ArrowRight className={cn(
                "h-5 w-5 mx-4",
                step > s.num ? "text-primary" : "text-muted-foreground/30"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Upload */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Data File</CardTitle>
            <CardDescription>Select a file to import. Supported formats: CSV, Excel, JSON, TXT, ZIP</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Drop Zone */}
            <div className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".csv,.xlsx,.xls,.json,.txt,.zip"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {isUploading ? (
                  <div className="space-y-4">
                    <RefreshCw className="h-16 w-16 mx-auto text-primary animate-spin" />
                    <p className="text-lg font-medium">Uploading...</p>
                    <Progress value={uploadProgress} className="max-w-md mx-auto" />
                    <p className="text-sm text-muted-foreground">{uploadProgress}%</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-16 w-16 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium">Drop your file here or click to browse</p>
                      <p className="text-sm text-muted-foreground mt-1">Maximum file size: 100MB</p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            {/* Supported Formats */}
            <div>
              <p className="text-sm font-medium mb-3">Supported Formats:</p>
              <div className="flex flex-wrap gap-2">
                {supportedFormats.map((format) => (
                  <Badge key={format.ext} variant="outline" className="gap-1 py-2">
                    <format.icon className="h-4 w-4" />
                    {format.label} ({format.ext})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Uploaded File Preview */}
            {uploadedFile && (
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-10 w-10 text-green-500" />
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setStep(2)}>
                      Continue <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="ghost" onClick={handleRemoveFile}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Configure */}
      {step === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Target Module</CardTitle>
              <CardDescription>Select where to import the data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {targetModules.map((module) => (
                  <div
                    key={module.id}
                    className={cn(
                      "p-4 rounded-lg border-2 cursor-pointer transition-colors",
                      selectedModule === module.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <Database className="h-8 w-8 mb-2 text-primary" />
                    <p className="font-medium">{module.label}</p>
                    <p className="text-sm text-muted-foreground">{module.count.toLocaleString()} records</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Field Mapping</CardTitle>
              <CardDescription>Map source columns to target fields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {fileData?.headers.map((header) => {
                  const mapping = mappings.find(m => m.source === header);
                  return (
                    <div key={header} className="flex items-center gap-4 p-3 rounded-lg border bg-background">
                      <div className="w-1/4">
                        <Badge variant="outline" className="font-mono">{header}</Badge>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <div className="w-1/3">
                        <Select value={mapping?.target || ""} onValueChange={(v) => handleUpdateMapping(header, v)}>
                          <SelectTrigger><SelectValue placeholder="Select field" /></SelectTrigger>
                          <SelectContent>
                            {fieldMappings.map((fm) => (
                              <SelectItem key={fm.target} value={fm.target}>{fm.target}</SelectItem>
                            ))}
                            <SelectItem value="skip">-- Skip --</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-1/4">
                        <Badge variant="secondary" className="text-xs">{mapping?.type || "string"}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <Button onClick={() => setStep(3)}>
                  Validate Data <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Validate */}
      {step === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Validation</CardTitle>
              <CardDescription>Review validation results before importing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
                  <p className="text-2xl font-black text-green-700">{fileData?.totalRows - validationErrors.length}</p>
                  <p className="text-sm text-green-600">Valid Records</p>
                </div>
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <XCircle className="h-6 w-6 text-red-600 mb-2" />
                  <p className="text-2xl font-black text-red-700">{validationErrors.length}</p>
                  <p className="text-sm text-red-600">Errors Found</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <Table className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="text-2xl font-black text-blue-700">{fileData?.totalRows.toLocaleString()}</p>
                  <p className="text-sm text-blue-600">Total Rows</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mb-2" />
                  <p className="text-2xl font-black text-yellow-700">{Math.round((validationErrors.length / fileData?.totalRows) * 100)}%</p>
                  <p className="text-sm text-yellow-600">Error Rate</p>
                </div>
              </div>

              {/* Error List */}
              {validationErrors.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-red-50 px-4 py-2 border-b">
                    <p className="font-medium text-red-700">Validation Errors</p>
                  </div>
                  <div className="max-h-64 overflow-auto">
                    {validationErrors.map((error, i) => (
                      <div key={i} className="flex items-center gap-4 px-4 py-2 border-b last:border-0">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Row {error.row}</span>
                        <Badge variant="outline">{error.column}</Badge>
                        <span className="text-sm text-muted-foreground">{error.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Preview */}
              <div>
                <p className="font-medium mb-3">Data Preview (First 10 rows)</p>
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        {fileData?.headers.map((header) => (
                          <th key={header} className="px-3 py-2 text-left font-medium">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {fileData?.rows.map((row, i) => (
                        <tr key={i} className="border-t">
                          {fileData.headers.map((header) => (
                            <td key={header} className="px-3 py-2">{row[header]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" /> Advanced Options
                  </Button>
                  <Button onClick={handleStartImport}>
                    <Play className="h-4 w-4 mr-2" /> Start Import
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Import */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Import Progress</CardTitle>
            <CardDescription>Importing {fileData?.totalRows.toLocaleString()} records to {targetModules.find(m => m.id === selectedModule)?.label}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing records...</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-4" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-black">11,250</p>
                <p className="text-sm text-muted-foreground">Processed</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-black">11,230</p>
                <p className="text-sm text-muted-foreground">Imported</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-black text-yellow-600">20</p>
                <p className="text-sm text-muted-foreground">Skipped</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-black text-red-600">0</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => { setStep(1); handleRemoveFile(); }}>
                <FileUp className="h-4 w-4 mr-2" /> Upload Another
              </Button>
              <Button onClick={() => { setStep(1); handleRemoveFile(); toast.success("Import completed!"); }}>
                <CheckCircle className="h-4 w-4 mr-2" /> View Results
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
