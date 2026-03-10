"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Clock, 
  AlertCircle,
  Eye,
  ArrowRight,
  RotateCcw,
  FileText,
  History
} from "lucide-react";
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
  TableRow 
} from "@/components/ui/table";
import { mockDecisionLog } from "@/lib/mock-data/supervisor";
import { cn } from "@/lib/utils";

export default function DecisionLogPage() {
  const [logs] = useState(mockDecisionLog);
  const [selectedLog, setSelectedLog] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Agentic Decision Log</h3>
          <p className="text-xs text-muted-foreground font-medium italic mt-1">Audit trail of all autonomous actions and AI-driven supervisor decisions.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search decisions..." className="pl-8 h-9 text-xs bg-background" />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-9 gap-2 text-xs font-bold" onClick={() => alert("Exporting log...")}>
            <FileText className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border-primary/10">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="text-[10px] uppercase font-black px-4 h-10">Timestamp</TableHead>
                  <TableHead className="text-[10px] uppercase font-black px-4 h-10">Action</TableHead>
                  <TableHead className="text-[10px] uppercase font-black px-4 h-10">Trigger</TableHead>
                  <TableHead className="text-[10px] uppercase font-black px-4 h-10">Target</TableHead>
                  <TableHead className="text-[10px] uppercase font-black px-4 h-10 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow 
                    key={log.id} 
                    className={cn(
                      "group cursor-pointer hover:bg-muted/20 transition-colors",
                      selectedLog?.id === log.id && "bg-primary/5"
                    )}
                    onClick={() => setSelectedLog(log)}
                  >
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-muted-foreground">
                        <Clock className="h-3 w-3" /> {log.timestamp.split(' ')[1]}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="text-xs font-black uppercase tracking-tight">{log.action}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge variant="outline" className="text-[9px] px-1.5 h-4 font-bold bg-background">
                        {log.trigger}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="text-xs font-bold text-primary">{log.target}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <Badge className={cn(
                        "text-[9px] h-4 font-black uppercase",
                        log.status === "Success" ? "bg-green-500" : "bg-amber-500"
                      )}>
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="lg:col-span-1">
          {selectedLog ? (
            <Card className="border-primary/20 shadow-lg animate-in fade-in slide-in-from-right-4 duration-300 h-full">
              <CardHeader className="bg-primary/5 border-b">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-[9px] font-mono font-bold bg-background">ID: {selectedLog.id}</Badge>
                  <Badge className="bg-green-500 text-[9px] h-4 uppercase font-black">{selectedLog.status}</Badge>
                </div>
                <CardTitle className="text-lg font-black uppercase tracking-tighter">{selectedLog.action}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">AI Decision Reasoning</p>
                  <div className="p-4 rounded-xl bg-muted/30 border border-dashed border-muted-foreground/20 italic text-xs leading-relaxed">
                    &quot;{selectedLog.reasoning}&quot;
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-muted-foreground">Trigger Event</p>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <AlertCircle className="h-3 w-3 text-amber-500" /> {selectedLog.trigger}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-muted-foreground">Execution Target</p>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <ArrowRight className="h-3 w-3 text-primary" /> {selectedLog.target}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <Button className="w-full gap-2 font-black uppercase tracking-widest text-[10px] h-10 shadow-md" onClick={() => alert("Reverting action...")}>
                    <RotateCcw className="h-4 w-4" /> Revert Decision
                  </Button>
                  <Button variant="outline" className="w-full gap-2 font-black uppercase tracking-widest text-[10px] h-10" onClick={() => alert("Showing full interaction...")}>
                    <Eye className="h-4 w-4" /> View Context
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground">
              <History className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest opacity-50">Select a decision</p>
              <p className="text-[10px] font-medium italic mt-2">Click on a log entry to view AI reasoning and execution details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
