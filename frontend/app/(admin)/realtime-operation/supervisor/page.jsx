"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ShieldAlert, 
  Ear, 
  Mic, 
  LogIn, 
  PhoneOff, 
  Bell,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

export default function SupervisorToolsPage() {
  const [interventionMode, setInterventionMode] = useState("monitor");

  const handleAction = (action) => {
    toast.success(`Supervisor Action: ${action} initiated successfully.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Intervention Panel */}
      <Card className="shadow-md border-primary/10">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            Active Intervention Console
          </CardTitle>
          <CardDescription>Real-time tools for live call management</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Target Call / Agent</Label>
            <Select defaultValue="C-8821">
              <SelectTrigger>
                <SelectValue placeholder="Select active call..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="C-8821">C-8821 (Agent: John Doe)</SelectItem>
                <SelectItem value="C-8825">C-8825 (Agent: Jane Smith)</SelectItem>
                <SelectItem value="C-8830">C-8830 (Agent: Robert Brown)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Intervention Mode</Label>
            <RadioGroup value={interventionMode} onValueChange={setInterventionMode} className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="monitor" id="monitor" />
                <Label htmlFor="monitor" className="flex items-center gap-2 cursor-pointer font-bold text-xs uppercase">
                  <Ear className="h-4 w-4 text-green-500" /> Silent Monitor
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="whisper" id="whisper" />
                <Label htmlFor="whisper" className="flex items-center gap-2 cursor-pointer font-bold text-xs uppercase">
                  <Mic className="h-4 w-4 text-blue-500" /> Whisper
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="barge" id="barge" />
                <Label htmlFor="barge" className="flex items-center gap-2 cursor-pointer font-bold text-xs uppercase">
                  <LogIn className="h-4 w-4 text-orange-500" /> Barge In
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="takeover" id="takeover" />
                <Label htmlFor="takeover" className="flex items-center gap-2 cursor-pointer font-bold text-xs uppercase">
                  <PhoneOff className="h-4 w-4 text-red-500" /> Takeover
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Intervention Message (Whisper Only)</Label>
            <Textarea 
              placeholder="Type private message to agent..." 
              className="resize-none h-20 bg-muted/20 border-none"
              disabled={interventionMode !== "whisper"}
            />
          </div>

          <Button className="w-full h-12 font-bold uppercase tracking-widest" onClick={() => handleAction(interventionMode)}>
            Start Intervention Flow
          </Button>
        </CardContent>
      </Card>

      {/* Real-time Incident Feed */}
      <Card className="flex flex-col h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Bell className="h-4 w-4" /> Live Incident Feed
            </CardTitle>
            <Badge variant="outline" className="text-[10px]">4 NEW</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto space-y-4">
          {[
            { id: 1, type: "Critical", msg: "SLA dropped below 70% in Support Queue", time: "2m ago", icon: AlertCircle, color: "text-red-500 bg-red-50" },
            { id: 2, type: "Warning", msg: "Agent Sarah Jenkins - Hold time exceeded threshold", time: "5m ago", icon: AlertCircle, color: "text-orange-500 bg-orange-50" },
            { id: 3, type: "Info", msg: "Queue 'Sales' overflowed to voice mail", time: "12m ago", icon: ShieldAlert, color: "text-blue-500 bg-blue-50" },
            { id: 4, type: "Success", msg: "All agents now online in Billing Queue", time: "15m ago", icon: CheckCircle2, color: "text-green-500 bg-green-50" },
          ].map((incident) => (
            <div key={incident.id} className="flex gap-4 p-3 border rounded-lg hover:bg-muted/30 transition-colors group">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${incident.color}`}>
                <incident.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black uppercase tracking-wider">{incident.type}</span>
                  <span className="text-[10px] text-muted-foreground">{incident.time}</span>
                </div>
                <p className="text-sm font-medium mt-1 leading-tight">{incident.msg}</p>
                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="link" className="h-auto p-0 text-[10px] text-primary" onClick={() => handleAction("Acknowledge")}>Acknowledge</Button>
                  <Button variant="link" className="h-auto p-0 text-[10px] text-muted-foreground" onClick={() => handleAction("Dismiss")}>Dismiss</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
