"use client";

import { useState } from "react";
import { 
  Plus, 
  Settings2, 
  Trash2, 
  Play, 
  Pause,
  Zap,
  Bot,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { mockAgenticActions } from "@/lib/mock-data/supervisor";
import { cn } from "@/lib/utils";

export default function ActionCenterPage() {
  const [actions, setActions] = useState(mockAgenticActions);

  const toggleStatus = (id) => {
    setActions(actions.map(a => 
      a.id === id ? { ...a, status: a.status === "Active" ? "Paused" : "Active" } : a
    ));
    toast.success("Action status updated");
  };

  const deleteAction = (id) => {
    if (confirm("Are you sure you want to delete this autonomous action?")) {
      setActions(actions.filter(a => a.id !== id));
      toast.success("Action deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight">Autonomous Action Center</h3>
        <Button className="gap-2 shadow-lg font-bold" onClick={() => alert("Opening action builder...")}>
          <Plus className="h-4 w-4" />
          Create New Action
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action) => (
          <Card key={action.id} className="group border-2 border-transparent hover:border-primary/20 transition-all shadow-sm">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <div className="flex items-center justify-between mb-1">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => alert("Edit action...")}>
                    <Settings2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => deleteAction(action.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">{action.name}</CardTitle>
              <CardDescription className="text-[10px] font-medium flex items-center gap-1">
                TYPE: <span className="text-foreground">{action.type}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-muted-foreground">Trigger</p>
                  <Badge variant="secondary" className="w-full h-7 justify-start border-none font-bold text-[10px]">{action.trigger}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-muted-foreground">Autonomy</p>
                  <Badge variant="outline" className="w-full h-7 justify-start font-bold text-[10px] border-primary/20 bg-primary/5 text-primary">
                    {action.autonomy}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                  <span className="text-muted-foreground tracking-tighter">Confidence Threshold</span>
                  <span className="text-primary">{action.threshold}%</span>
                </div>
                <Progress value={action.threshold} className="h-1.5" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dashed">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-muted-foreground">Cooldown</p>
                  <div className="text-xs font-mono font-bold">{action.cooldown}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-muted-foreground">Status</p>
                  <Badge className={cn(
                    "h-5 text-[9px] font-black uppercase w-full",
                    action.status === "Active" ? "bg-green-500" : "bg-amber-500"
                  )}>
                    {action.status}
                  </Badge>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  variant={action.status === "Active" ? "outline" : "default"}
                  className="w-full h-9 gap-2 font-black uppercase tracking-widest text-[10px]"
                  onClick={() => toggleStatus(action.id)}
                >
                  {action.status === "Active" ? (
                    <><Pause className="h-3 w-3" /> Deactivate</>
                  ) : (
                    <><Play className="h-3 w-3" /> Activate</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Action Template Card */}
        <Card className="border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer flex flex-col items-center justify-center p-8 text-center" onClick={() => alert("Opening templates...")}>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h4 className="text-sm font-black uppercase tracking-widest text-primary">Browse Templates</h4>
          <p className="text-[10px] text-muted-foreground mt-2 font-medium italic">Start with pre-configured agentic workflows for QA, Coaching, and Escalations.</p>
          <Button variant="link" size="sm" className="mt-4 text-xs font-bold gap-1 p-0 h-auto">
            View Template Library <ChevronRight className="h-3 w-3" />
          </Button>
        </Card>
      </div>

      {/* Intelligence Note */}
      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-black uppercase text-amber-700 tracking-tight">Autonomy Policy Warning</p>
          <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
            Actions marked as &quot;Fully Autonomous&quot; will execute immediately without human intervention. Ensure threshold logic is verified in &quot;Notify + Wait&quot; mode before elevating to full autonomy.
          </p>
        </div>
      </div>
    </div>
  );
}
