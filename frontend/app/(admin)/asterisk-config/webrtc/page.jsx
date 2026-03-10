"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {Separator} from "@/components/ui/separator";  
import { toast } from "sonner";
import { Loader2, Copy, RefreshCw, Smartphone, Globe, ShieldCheck, Zap } from "lucide-react";
import { mockWebRtcConfig } from "@/lib/mock-data/telephony";

export default function WebrtcGateway() {
  const [config, setConfig] = useState(mockWebRtcConfig);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleTestWebRtc = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      toast.success("WebRTC Connectivity Test Passed", {
        description: "WSS Transport and ICE negotiation (STUN/TURN) verified.",
      });
    }, 1500);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("WebRTC Configuration Saved");
    }, 1000);
  };

  const copyStanza = () => {
    const stanza = `[${config.transport}]
type=transport
protocol=wss
bind=${config.bindAddress}
cert_file=/etc/asterisk/keys/asterisk.pem
priv_key_file=/etc/asterisk/keys/asterisk.key
method=tlsv1_2

; Template for WebRTC endpoints
[webrtc_client](!)
type=endpoint
webrtc=yes
dtls_auto_generate_cert=yes
ice_support=${config.iceSupport ? 'yes' : 'no'}
use_avpf=yes
media_encryption=dtls
dtls_verify=fingerprint
dtls_setup=actpass
context=default
disallow=all
allow=opus,ulaw`;

    navigator.clipboard.writeText(stanza);
    toast.success("PJSIP WebRTC transport stanza copied");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  WebRTC PJSIP Settings
                </CardTitle>
                <CardDescription>Configure the underlying Asterisk transport for browser-based calls</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleTestWebRtc} disabled={isTesting}>
                {isTesting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Zap className="h-4 w-4 mr-2" />}
                Run Health Check
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>WebRTC Transport Name</Label>
                <Input value={config.transport} readOnly className="bg-muted font-mono" />
              </div>
              <div className="space-y-2">
                <Label>WSS Bind Address*</Label>
                <Input value={config.bindAddress} onChange={(e) => setConfig({ ...config, bindAddress: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>ICE Support</Label>
                  <p className="text-[10px] text-muted-foreground">Enable Interactive Connectivity Establishment</p>
                </div>
                <Switch checked={config.iceSupport} onCheckedChange={(val) => setConfig({ ...config, iceSupport: val })} />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>DTLS SRTP</Label>
                  <p className="text-[10px] text-muted-foreground">Mandatory for secure WebRTC media</p>
                </div>
                <Switch checked={config.dtlsSrtp} onCheckedChange={(val) => setConfig({ ...config, dtlsSrtp: val })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>STUN Server URL*</Label>
              <Input value={config.stunServer} onChange={(e) => setConfig({ ...config, stunServer: e.target.value })} />
            </div>

            <div className="space-y-4 pt-2">
              <Separator />
              <h4 className="text-sm font-bold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                TURN Relay (Fallback for Restricted Networks)
              </h4>
              <div className="space-y-2">
                <Label>TURN Server URL</Label>
                <Input value={config.turnServer} onChange={(e) => setConfig({ ...config, turnServer: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>TURN Username</Label>
                  <Input value={config.turnUsername} onChange={(e) => setConfig({ ...config, turnUsername: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>TURN Credential</Label>
                  <Input type="password" value={config.turnSecret} onChange={(e) => setConfig({ ...config, turnSecret: e.target.value })} />
                </div>
              </div>
            </div>

            <Button className="w-full mt-4" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save WebRTC Settings"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-2 bg-muted/20">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Config Template</CardTitle>
            <CardDescription>Add this to your pjsip.conf</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-black rounded-md overflow-x-auto">
              <pre className="text-[10px] text-green-400 font-mono">
                {`[${config.transport}]
type=transport
protocol=wss
bind=${config.bindAddress}
; ... rest of transport`}
              </pre>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={copyStanza}>
              <Copy className="h-4 w-4 mr-2" /> Copy Full PJSIP Stanza
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Agent Endpoint Pattern
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>SIP Username Pattern</Label>
              <Input value={config.sipPattern} onChange={(e) => setConfig({ ...config, sipPattern: e.target.value })} />
              <p className="text-[10px] text-muted-foreground">NEXUS AI will dynamically register agents using this pattern.</p>
            </div>
            <div className="space-y-2">
              <Label>Registration Validity (s)</Label>
              <Input type="number" value={config.validity} onChange={(e) => setConfig({ ...config, validity: parseInt(e.target.value) })} />
            </div>
            <Button variant="secondary" className="w-full" onClick={() => toast.success("Endpoints regenerated for all agents")}>
              <RefreshCw className="h-4 w-4 mr-2" /> Regenerate Endpoints
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
