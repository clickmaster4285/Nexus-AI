"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getActiveCalls } from "@/lib/mock-data/calls";
import { getAgentById } from "@/lib/mock-data/agents";
import { Mic, Ear, LogIn, PhoneOff, Send } from "lucide-react";

export default function SupervisorIntervention() {
  const [selectedCall, setSelectedCall] = useState("");
  const [interventionMode, setInterventionMode] = useState("monitor");
  const [whisperMessage, setWhisperMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [outcome, setOutcome] = useState("");

  const activeCalls = getActiveCalls();

  const handleIntervene = () => {
    // In a real app, this would trigger the intervention
    alert(`Starting ${interventionMode} on call ${selectedCall}`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Supervisor Intervention</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select Call</Label>
          <Select value={selectedCall} onValueChange={setSelectedCall}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a call to monitor..." />
            </SelectTrigger>
            <SelectContent>
              {activeCalls.map((call) => {
                const agent = getAgentById(call.agentId);
                return (
                  <SelectItem key={call.id} value={call.id}>
                    {call.id} - {agent?.name} ({call.queue})
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Intervention Mode</Label>
          <RadioGroup
            value={interventionMode}
            onValueChange={setInterventionMode}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
              <RadioGroupItem value="monitor" id="monitor" />
              <Label htmlFor="monitor" className="flex items-center gap-2 cursor-pointer">
                <Ear className="h-4 w-4" />
                Monitor
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
              <RadioGroupItem value="whisper" id="whisper" />
              <Label htmlFor="whisper" className="flex items-center gap-2 cursor-pointer">
                <Mic className="h-4 w-4" />
                Whisper
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
              <RadioGroupItem value="barge" id="barge" />
              <Label htmlFor="barge" className="flex items-center gap-2 cursor-pointer">
                <LogIn className="h-4 w-4" />
                Barge
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
              <RadioGroupItem value="takeover" id="takeover" />
              <Label htmlFor="takeover" className="flex items-center gap-2 cursor-pointer">
                <PhoneOff className="h-4 w-4" />
                Takeover
              </Label>
            </div>
          </RadioGroup>
        </div>

        {interventionMode === "whisper" && (
          <div className="space-y-2">
            <Label htmlFor="whisper">Whisper Message</Label>
            <Textarea
              id="whisper"
              placeholder="Type your message to the agent..."
              value={whisperMessage}
              onChange={(e) => setWhisperMessage(e.target.value)}
              className="min-h-20"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Supervisor Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add notes about this intervention..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-20"
          />
        </div>

        <div className="space-y-2">
          <Label>Intervention Outcome</Label>
          <Select value={outcome} onValueChange={setOutcome}>
            <SelectTrigger>
              <SelectValue placeholder="Select outcome..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="resolved">Resolved Successfully</SelectItem>
              <SelectItem value="escalated">Escalated to Manager</SelectItem>
              <SelectItem value="coaching_required">Coaching Session Scheduled</SelectItem>
              <SelectItem value="follow_up">Further Follow-up Needed</SelectItem>
              <SelectItem value="no_action">No Action Taken</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleIntervene}
          disabled={!selectedCall}
          className="w-full"
        >
          {interventionMode === "whisper" && whisperMessage ? (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Whisper
            </>
          ) : (
            `Start ${interventionMode.charAt(0).toUpperCase() + interventionMode.slice(1)}`
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
