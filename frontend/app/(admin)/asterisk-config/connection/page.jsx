"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, Copy, RefreshCw } from "lucide-react";
import { mockAsteriskConfig } from "@/lib/mock-data/telephony";

export default function AmiAriConfig() {
  const [ami, setAmi] = useState(mockAsteriskConfig.ami);
  const [ari, setAri] = useState(mockAsteriskConfig.ari);
  const [isTestingAmi, setIsTestingAmi] = useState(false);
  const [isTestingAri, setIsTestingAri] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleTestAmi = () => {
    setIsTestingAmi(true);
    setTimeout(() => {
      setIsTestingAmi(false);
      toast.success("AMI Connection Successful", {
        description: `Connected to Asterisk AMI at ${ami.host}:${ami.port}`,
      });
    }, 1500);
  };

  const handleTestAri = () => {
    setIsTestingAri(true);
    setTimeout(() => {
      setIsTestingAri(false);
      toast.success("ARI Connection Successful", {
        description: `HTTP and WebSocket connection established for app: ${ari.stasisApp}`,
      });
    }, 1500);
  };

  const handleSave = (type) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(`${type} Configuration Saved`);
    }, 1000);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* AMI Configuration */}
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              AMI Configuration
              <Badge variant={ami.status === "Connected" ? "success" : "destructive"} className="ml-2">
                {ami.status}
              </Badge>
            </CardTitle>
            <CardDescription>Manage Asterisk Manager Interface (AMI) credentials</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleTestAmi} disabled={isTestingAmi}>
            {isTestingAmi ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Test Connection
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ami-host">AMI Host*</Label>
              <Input 
                id="ami-host" 
                value={ami.host} 
                onChange={(e) => setAmi({...ami, host: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ami-port">AMI Port*</Label>
              <Input 
                id="ami-port" 
                type="number" 
                value={ami.port} 
                onChange={(e) => setAmi({...ami, port: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ami-user">AMI Username*</Label>
              <Input 
                id="ami-user" 
                value={ami.username} 
                onChange={(e) => setAmi({...ami, username: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ami-secret">AMI Secret*</Label>
              <Input 
                id="ami-secret" 
                type="password" 
                value={ami.secret} 
                onChange={(e) => setAmi({...ami, secret: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
            <div className="space-y-0.5">
              <Label className="text-base">TLS Encryption</Label>
              <p className="text-xs text-muted-foreground">Enable secure AMI connection via TLS</p>
            </div>
            <Switch 
              checked={ami.tls} 
              onCheckedChange={(checked) => setAmi({...ami, tls: checked})} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ami-heartbeat">Heartbeat Interval (s)*</Label>
              <Input 
                id="ami-heartbeat" 
                type="number" 
                value={ami.heartbeat} 
                onChange={(e) => setAmi({...ami, heartbeat: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ami-reconnect">Reconnect Attempts*</Label>
              <Input 
                id="ami-reconnect" 
                type="number" 
                value={ami.reconnect} 
                onChange={(e) => setAmi({...ami, reconnect: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Required Permissions</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs" 
                onClick={() => copyToClipboard(ami.permissions, "Manager permissions")}
              >
                <Copy className="h-3 w-3 mr-1" /> Copy manager.conf stanza
              </Button>
            </div>
            <div className="p-3 border rounded-md bg-black font-mono text-[10px] text-green-400 overflow-x-auto">
              [nexus_user]<br/>
              secret = {ami.secret}<br/>
              read = {ami.permissions}<br/>
              write = {ami.permissions}
            </div>
          </div>

          <Button className="w-full" onClick={() => handleSave('AMI')} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save AMI Configuration"}
          </Button>
        </CardContent>
      </Card>

      {/* ARI Configuration */}
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              ARI Configuration
              <Badge variant={ari.status === "Active" ? "success" : "destructive"} className="ml-2">
                {ari.status}
              </Badge>
            </CardTitle>
            <CardDescription>Manage Asterisk REST Interface (ARI) settings</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleTestAri} disabled={isTestingAri}>
            {isTestingAri ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Test Connection
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="ari-host">ARI Host URL*</Label>
              <Input 
                id="ari-host" 
                value={ari.host} 
                placeholder="https://asterisk-ip"
                onChange={(e) => setAri({...ari, host: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ari-port">ARI Port*</Label>
              <Input 
                id="ari-port" 
                type="number" 
                value={ari.port} 
                onChange={(e) => setAri({...ari, port: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ari-user">ARI Username*</Label>
              <Input 
                id="ari-user" 
                value={ari.username} 
                onChange={(e) => setAri({...ari, username: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ari-pass">ARI Password*</Label>
              <Input 
                id="ari-pass" 
                type="password" 
                value={ari.password} 
                onChange={(e) => setAri({...ari, password: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ari-app">Stasis Application Name*</Label>
            <Input 
              id="ari-app" 
              value={ari.stasisApp} 
              onChange={(e) => setAri({...ari, stasisApp: e.target.value})}
            />
            <p className="text-[10px] text-muted-foreground">Default: nexus_app. This must match the app name in your ARI client.</p>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
            <div className="space-y-0.5">
              <Label className="text-base">TLS / SSL Certificate</Label>
              <p className="text-xs text-muted-foreground">Verify Asterisk SSL certificate</p>
            </div>
            <Switch 
              checked={ari.tls} 
              onCheckedChange={(checked) => setAri({...ari, tls: checked})} 
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Generated WebSocket URL</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-[10px]" 
                onClick={() => copyToClipboard(ari.wsUrl, "WebSocket URL")}
              >
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <div className="p-3 border rounded-md bg-muted font-mono text-[10px] break-all">
              {ari.wsUrl}
            </div>
          </div>

          <Separator className="my-4" />
          
          <Button className="w-full" onClick={() => handleSave('ARI')} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save ARI Configuration"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
