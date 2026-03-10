"use client";

import { useState } from "react";
import { 
  Plus, 
  Settings2, 
  Trash2, 
  Network,
  Bell,
  Mail,
  MessageSquare,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { mockEscalationChains } from "@/lib/mock-data/supervisor";
import { cn } from "@/lib/utils";

export default function EscalationChainPage() {
  const [chains, setChains] = useState(mockEscalationChains);

  const toggleChain = (id) => {
    setChains(chains.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    ));
    toast.success("Chain status updated");
  };

  const deleteChain = (id) => {
    if (confirm("Delete this escalation chain?")) {
      setChains(chains.filter(c => c.id !== id));
      toast.success("Chain deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight">Escalation Chain Builder</h3>
        <Button className="gap-2 shadow-lg font-bold" onClick={() => alert("Creating new chain...")}>
          <Plus className="h-4 w-4" />
          Create New Chain
        </Button>
      </div>

      <div className="space-y-4">
        {chains.map((chain) => (
          <Card key={chain.id} className={cn(
            "border-primary/10 transition-all",
            !chain.active && "opacity-60 grayscale"
          )}>
            <CardHeader className="pb-4 bg-muted/20 border-b flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Network className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base font-black uppercase tracking-tight">{chain.name}</CardTitle>
                  <CardDescription className="text-[10px] font-bold">TRIGGER: <span className="text-foreground">{chain.trigger}</span></CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-muted-foreground">Enabled</span>
                  <Switch checked={chain.active} onCheckedChange={() => toggleChain(chain.id)} />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => alert("Edit chain...")}>
                    <Settings2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => deleteChain(chain.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                {chain.steps.map((step, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center gap-4 flex-1 w-full">
                    <div className="flex-1 bg-background border rounded-xl p-4 flex items-center gap-3 relative group hover:border-primary/30 transition-all shadow-sm">
                      <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center font-black text-primary text-xs">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Step {i + 1}</p>
                        <p className="text-xs font-bold">{step}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Bell className="h-3 w-3 text-muted-foreground" />
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <MessageSquare className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </div>
                    {i < chain.steps.length - 1 && (
                      <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="w-full md:w-auto">
                  <Button variant="outline" className="w-full md:w-auto border-dashed h-12 px-6 gap-2 text-[10px] font-black uppercase hover:bg-primary/5 hover:border-primary/30 transition-all" onClick={() => alert("Adding step...")}>
                    <Plus className="h-4 w-4" /> Add Step
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-dashed border-primary/20">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-primary" />
          </div>
          <div className="max-w-md space-y-2">
            <h4 className="text-lg font-black uppercase tracking-tight">Enterprise Escalation Guard</h4>
            <p className="text-xs text-muted-foreground font-medium italic">
              Configure multi-stage notification protocols for critical events. Escalations can trigger SMS, Email, and Slack notifications to management tiers.
            </p>
          </div>
          <Button variant="outline" className="font-bold border-primary/20" onClick={() => alert("Configuring global notifications...")}>Global Notification Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
