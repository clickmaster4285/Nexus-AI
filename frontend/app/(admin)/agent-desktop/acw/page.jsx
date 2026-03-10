"use client";

import { useState } from "react";
import {  
  CheckCircle2, 
  UserPlus, 
  Calendar,  
  Send,
  Timer
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ACWPage() {
  const [disposition, setDisposition] = useState("");
  const [subDisposition, setSubDisposition] = useState("");
  const [notes, setNotes] = useState("Customer called about pricing tiers. Shared enterprise PDF. They are interested but need internal approval. Sentiment was generally positive.");
  
  const handleComplete = () => {
    if (!disposition) {
      toast.error("Please select a disposition code");
      return;
    }
    toast.success("Wrap-up complete. Status set to Available.");
  };

  const handleAction = (action) => {
    toast.info(`Action: ${action}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Timer Header */}
      <Card className="bg-blue-50/50 border-blue-100 dark:bg-blue-950/10">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
              <Timer className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-blue-700">After Call Work</h2>
              <p className="text-sm text-blue-600/80 font-medium">Wrap up your interaction notes</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Time Remaining</p>
              <p className="text-3xl font-mono font-bold text-foreground">00:45</p>
            </div>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100" onClick={() => handleAction("Extend Timer")}>
              +30s
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Disposition Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Call Disposition</CardTitle>
            <CardDescription>Categorize the outcome of this interaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Outcome <span className="text-red-500">*</span></label>
                <Select value={disposition} onValueChange={setDisposition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select outcome..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">Sale / Conversion</SelectItem>
                    <SelectItem value="lead">Qualified Lead</SelectItem>
                    <SelectItem value="support">Support Resolved</SelectItem>
                    <SelectItem value="followup">Follow-up Needed</SelectItem>
                    <SelectItem value="spam">Spam / Wrong Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sub-Reason</label>
                <Select value={subDisposition} onValueChange={setSubDisposition} disabled={!disposition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select detail..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pricing">Pricing Discussion</SelectItem>
                    <SelectItem value="features">Feature Request</SelectItem>
                    <SelectItem value="contract">Contract Negotiation</SelectItem>
                    <SelectItem value="tech">Technical Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Interaction Notes</label>
                <Badge variant="outline" className="text-[10px]">AI Summarized</Badge>
              </div>
              <Textarea 
                className="min-h-30 resize-y" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button size="lg" className="w-full md:w-auto bg-green-600 hover:bg-green-700" onClick={handleComplete}>
                <CheckCircle2 className="h-4 w-4 mr-2" /> Complete & Ready
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Follow-ups */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Follow-up Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start h-12" onClick={() => handleAction("Schedule Callback")}>
              <Calendar className="h-4 w-4 mr-2 text-primary" /> Schedule Callback
            </Button>
            <Button variant="outline" className="w-full justify-start h-12" onClick={() => handleAction("Create Task")}>
              <CheckCircle2 className="h-4 w-4 mr-2 text-orange-500" /> Create Task
            </Button>
            <Button variant="outline" className="w-full justify-start h-12" onClick={() => handleAction("Update Contact")}>
              <UserPlus className="h-4 w-4 mr-2 text-blue-500" /> Update CRM Record
            </Button>
          </CardContent>
        </Card>

        {/* Email Template */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Send Follow-up Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select defaultValue="summary">
              <SelectTrigger>
                <SelectValue placeholder="Select template..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Call Summary</SelectItem>
                <SelectItem value="proposal">Send Proposal</SelectItem>
                <SelectItem value="support">Support Ticket</SelectItem>
              </SelectContent>
            </Select>
            <div className="p-3 bg-muted rounded text-xs text-muted-foreground italic border">
              &quot;Hi [Name], thanks for speaking with me today. Here is a summary of what we discussed...&quot;
            </div>
            <Button className="w-full" onClick={() => handleAction("Send Email")}>
              <Send className="h-4 w-4 mr-2" /> Send Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
