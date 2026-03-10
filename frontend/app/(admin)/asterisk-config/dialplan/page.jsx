"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit, Copy, FileCode, CheckCircle2, AlertCircle, HardDrive } from "lucide-react";
import { mockDialplanContexts } from "@/lib/mock-data/telephony";

export default function DialplanMapping() {
  const [contexts ] = useState(mockDialplanContexts);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyPaths = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.success("File System Paths Verified", {
        description: "Recording paths and AGI scripts exist and are writable.",
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      });
    }, 1500);
  };

  const copyExtensionsStanza = (ctx) => {
    const snippet = `[${ctx.name}]
exten => _X.,1,NoOp(Incoming call to NEXUS)
 same => n,Set(${ctx.variables[0]}=\${CALLERID(num)})
 same => n,Set(NEXUS_CONTEXT=${ctx.name})
 same => n,AGI(${ctx.bridge})
 same => n,Hangup()`;

    navigator.clipboard.writeText(snippet);
    toast.success("extensions.conf snippet copied");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Dialplan & Context Mapping</h2>
          <p className="text-sm text-muted-foreground">Map Asterisk contexts to NEXUS AI applications and AGI scripts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleVerifyPaths} disabled={isVerifying}>
            {isVerifying ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <HardDrive className="h-4 w-4 mr-2" />}
            Verify Paths
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Context
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {contexts.map((ctx) => (
          <Card key={ctx.id} className="border-2 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">{ctx.name}</CardTitle>
                    <CardDescription>ID: {ctx.id}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => copyExtensionsStanza(ctx)}>
                    <Copy className="h-3 w-3 mr-2" /> extensions.conf
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-bold uppercase text-muted-foreground">AGI / Bridge Application</Label>
                    <div className="p-2 rounded bg-muted font-mono text-xs break-all border">
                      {ctx.bridge}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-bold uppercase text-muted-foreground">Queue Context</Label>
                    <div className="p-2 rounded bg-muted font-mono text-xs border">
                      {ctx.queueContext}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-bold uppercase text-muted-foreground">Recording Path</Label>
                    <div className="p-2 rounded bg-muted font-mono text-xs break-all border flex items-center justify-between">
                      <span className="truncate mr-2">{ctx.recordingPath}</span>
                      <Badge variant="outline" className="text-[10px] h-4 shrink-0 uppercase">{ctx.format}</Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-bold uppercase text-muted-foreground">CDR Backend</Label>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {ctx.backend}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-bold uppercase text-muted-foreground">NEXUS Channel Variables</Label>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {ctx.variables.map(v => (
                        <Badge key={v} variant="outline" className="bg-primary/5 text-primary border-primary/20 font-mono text-[10px]">
                          {v}
                        </Badge>
                      ))}
                      <Button variant="ghost" size="sm" className="h-5 px-1.5 text-[10px] dashed border border-dashed">
                        <Plus className="h-3 w-3 mr-1" /> Add Var
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-start">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-blue-800">Dialplan Deployment</h4>
              <p className="text-sm text-blue-700 mt-1">
                Asterisk must be reloaded for extensions.conf changes to take effect. You can trigger a &quot;dialplan reload&quot; via AMI from the Connection tab or use the &quot;Push to Asterisk&quot; button when integrated with Git-based config management.
              </p>
              <Button variant="link" className="text-blue-700 p-0 h-auto mt-2 font-bold uppercase text-xs">
                View Sample extensions.conf <Copy className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
