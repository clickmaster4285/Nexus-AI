"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Bell, 
  Trash2, 
  Play,
} from "lucide-react";
import { toast } from "sonner";

export default function AlertRulesEnginePage() {
  const handleAction = (action) => {
    toast.success(`Rule Engine: ${action} executed.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-md border-primary/10 flex flex-col">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Create Alert Rule
          </CardTitle>
          <CardDescription>Define triggers for automated notifications</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Metric</Label>
                <Select defaultValue="sla">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sla">SLA Percentage</SelectItem>
                    <SelectItem value="wait">Wait Time</SelectItem>
                    <SelectItem value="aht">Average Handle Time</SelectItem>
                    <SelectItem value="abandon">Abandonment Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Condition</Label>
                <Select defaultValue="less">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less">Is Less Than</SelectItem>
                    <SelectItem value="greater">Is Greater Than</SelectItem>
                    <SelectItem value="equal">Equals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Threshold</Label>
                <span className="text-sm font-bold text-primary">80%</span>
              </div>
              <Slider defaultValue={[80]} max={100} step={1} className="py-4" />
            </div>

            <div className="space-y-2 pt-2">
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Severity</Label>
              <div className="flex gap-2">
                {["Critical", "Warning", "Info"].map(sev => (
                  <Button key={sev} variant="outline" size="sm" className="flex-1 text-[10px] font-bold uppercase">
                    {sev}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Notification Channels</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/10">
                  <span className="text-xs font-bold uppercase">Desktop Push</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/10">
                  <span className="text-xs font-bold uppercase">Slack / Teams</span>
                  <Switch />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1 font-bold uppercase tracking-widest" onClick={() => handleAction("Test Rule")}>
              <Play className="h-4 w-4 mr-2" /> Test
            </Button>
            <Button className="flex-2 font-bold uppercase tracking-widest" onClick={() => handleAction("Save Rule")}>
              Save Alert Rule
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Active Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: 1, name: "Low SLA Alert", metric: "SLA < 80%", active: true },
              { id: 2, name: "Long Wait Warning", metric: "Wait > 5m", active: true },
              { id: 3, name: "High Abandonment", metric: "Abandon > 10%", active: false },
            ].map(rule => (
              <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-bold text-sm">{rule.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">{rule.metric}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={rule.active} onCheckedChange={() => handleAction("Toggle Rule")} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleAction("Delete Rule")}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
