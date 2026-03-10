"use client";

import {  
  Building2, 
  Phone,
  History, 
  AlertCircle, 
  CheckSquare,
  ExternalLink,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { contacts, tasks } from "@/lib/mock-data/crm";
import StatusBadge from "@/components/shared/StatusBadge";
import { toast } from "sonner";

export default function ScreenPopPage() {
  // Simulate an incoming call match
  const incomingNumber = "+1-555-0101";
  const matchedContact = contacts.find(c => c.phonePrimary === incomingNumber) || contacts[0];
  const contactTasks = tasks.filter(t => t.contact.includes(matchedContact.firstName));

  const handleAction = (action) => {
    toast.info(`Action: ${action}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Incoming Call Header */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <Phone className="h-8 w-8 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-primary tracking-tight">INCOMING CALL</h2>
              <Badge variant="outline" className="bg-background text-foreground border-primary/20">Queue: Sales</Badge>
              <Badge variant="destructive" className="animate-pulse">Wait: 00:12</Badge>
            </div>
            <p className="text-lg font-mono font-medium mt-1">{incomingNumber} • {matchedContact.city}, {matchedContact.country}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10" onClick={() => handleAction("Dismiss Pop")}>
            Dismiss
          </Button>
          <Button size="lg" onClick={() => handleAction("Answer Call")}>
            Answer Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Contact Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-l-4 border-l-primary shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                    {matchedContact.firstName[0]}{matchedContact.lastName[0]}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{matchedContact.firstName} {matchedContact.lastName}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Building2 className="h-3 w-3" /> {matchedContact.company}
                      <span>•</span>
                      <span className="text-primary font-medium">{matchedContact.jobTitle}</span>
                    </CardDescription>
                  </div>
                </div>
                <StatusBadge status={matchedContact.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Email</p>
                  <p className="text-sm font-medium mt-1 truncate" title={matchedContact.emailPrimary}>{matchedContact.emailPrimary}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">CLV Tier</p>
                  <p className="text-sm font-bold mt-1 text-primary">{matchedContact.clvTier}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Total Calls</p>
                  <p className="text-sm font-medium mt-1">{matchedContact.totalCalls}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Last Interaction</p>
                  <p className="text-sm font-medium mt-1">{matchedContact.lastCallDate}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {matchedContact.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
                <Button variant="link" className="text-primary p-0 h-auto" onClick={() => handleAction("View Full CRM Record")}>
                  View Full CRM Record <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Interaction Context */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <History className="h-4 w-4" /> Last Interaction Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold bg-background px-2 py-1 rounded border">Inbound Call</span>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
                <p className="text-sm italic text-foreground/80">
                  &quot;Customer called inquiring about enterprise pricing tiers. Sent the PDF proposal. They seemed positive but had budget questions.&quot;
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Sentiment: Positive</Badge>
                  <Badge variant="outline">Agent: John Doe</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Tasks & Opportunities */}
        <div className="space-y-6">
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Open Tasks</span>
                <Badge className="bg-orange-500 hover:bg-orange-600">{contactTasks.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contactTasks.length > 0 ? (
                contactTasks.map(task => (
                  <div key={task.id} className="flex items-start gap-3 p-3 bg-background border rounded-md shadow-sm">
                    <CheckSquare className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold leading-tight">{task.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground text-xs italic">No open tasks</div>
              )}
              <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => handleAction("Add Task")}>
                <Plus className="h-3 w-3 mr-1" /> Add New Task
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-blue-50/50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-blue-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> Churn Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">Risk Score</span>
                <span className="text-lg font-black text-blue-700">12%</span>
              </div>
              <div className="h-2 w-full bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[12%]" />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                Customer is healthy. Engagement has increased by 15% in the last 30 days.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
