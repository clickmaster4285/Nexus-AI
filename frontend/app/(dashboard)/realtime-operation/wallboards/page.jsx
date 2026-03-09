"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Monitor, 
  Plus, 
  Copy, 
  Trash2, 
  Settings2,
  Maximize
} from "lucide-react";
import { toast } from "sonner";

export default function WallboardManagerPage() {
  const [wallboards ] = useState([
    { id: 1, name: "Main Support Wall", layout: "4x4 Grid", queues: ["Support", "Billing"], active: true },
    { id: 2, name: "Executive Overview", layout: "Standard", queues: ["All"], active: false },
  ]);

  const handleAction = (action) => {
    toast.success(`Action: ${action} processed.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Wallboard & Display Manager</h2>
          <p className="text-sm text-muted-foreground">Configure public displays and operation walls</p>
        </div>
        <Button onClick={() => handleAction("Create New Wallboard")}>
          <Plus className="h-4 w-4 mr-2" /> New Wallboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallboards.map((wb) => (
          <Card key={wb.id} className="group hover:border-primary/50 transition-all">
            <CardHeader className="pb-3 border-b bg-muted/30">
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <Monitor className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={wb.active} onCheckedChange={() => handleAction("Toggle Status")} />
                </div>
              </div>
              <CardTitle className="mt-4 text-lg">{wb.name}</CardTitle>
              <CardDescription className="text-xs font-medium uppercase tracking-wider">
                {wb.layout} • {wb.queues.join(", ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-[10px] font-bold uppercase" onClick={() => handleAction("Preview")}>
                  <Maximize className="h-3 w-3 mr-2" /> Preview
                </Button>
                <Button variant="outline" size="sm" className="text-[10px] font-bold uppercase" onClick={() => handleAction("Copy URL")}>
                  <Copy className="h-3 w-3 mr-2" /> Link
                </Button>
              </div>
              <div className="flex gap-2 border-t pt-4">
                <Button variant="ghost" size="sm" className="flex-1 text-[10px] font-bold uppercase" onClick={() => handleAction("Edit")}>
                  <Settings2 className="h-3 w-3 mr-2" /> Settings
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleAction("Delete")}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed border-2 flex flex-col items-center justify-center p-8 bg-muted/10 hover:bg-muted/20 cursor-pointer transition-colors" onClick={() => handleAction("Add New")}>
          <div className="h-12 w-12 rounded-full border-dashed border-2 flex items-center justify-center text-muted-foreground mb-4">
            <Plus className="h-6 w-6" />
          </div>
          <p className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Create Template</p>
        </Card>
      </div>
    </div>
  );
}
