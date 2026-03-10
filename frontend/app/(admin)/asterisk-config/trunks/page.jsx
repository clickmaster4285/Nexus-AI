"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Plus, Search, Trash2, Edit, RefreshCw, Code, CheckCircle2, AlertCircle } from "lucide-react";
import { mockDetailedPjsipTrunks } from "@/lib/mock-data/telephony";

export default function PjsipTrunks() {
  const [trunks, setTrunks] = useState(mockDetailedPjsipTrunks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTesting, setIsTesting] = useState(null); // trunk ID being tested

  const filteredTrunks = trunks.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.server.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTestTrunk = (trunk) => {
    setIsTesting(trunk.id);
    setTimeout(() => {
      setIsTesting(null);
      toast.success(`Trunk "${trunk.name}" Registered`, {
        description: `Successfully received 200 OK from ${trunk.server}`,
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      });
    }, 1500);
  };

  const handleDelete = (id) => {
    setTrunks(trunks.filter(t => t.id !== id));
    toast.success("Trunk deleted successfully");
  };

  const copyConfigSnippet = (trunk) => {
    const snippet = `[${trunk.name}]
type=endpoint
context=default
disallow=all
allow=${trunk.codecs.join(",")}
outbound_auth=${trunk.name}-auth
aors=${trunk.name}-aor

[${trunk.name}-auth]
type=auth
auth_type=userpass
password=YOUR_PASSWORD
username=${trunk.username}

[${trunk.name}-aor]
type=aor
contact=sip:${trunk.server}`;

    navigator.clipboard.writeText(snippet);
    toast.success("PJSIP config snippet copied");
  };

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">PJSIP / SIP Trunk Configuration</CardTitle>
            <CardDescription>Configure external telephony providers and SIP gateways</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trunks..."
                className="pl-8 w-62.5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Add Trunk
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-150">
                <DialogHeader>
                  <DialogTitle>Add New SIP Trunk</DialogTitle>
                  <DialogDescription>
                    Configure a new PJSIP or legacy SIP trunk connection.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Trunk Name*</Label>
                      <Input placeholder="e.g. Twilio-US-East" />
                    </div>
                    <div className="space-y-2">
                      <Label>Trunk Type*</Label>
                      <Select defaultValue="pjsip">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pjsip">PJSIP (Recommended)</SelectItem>
                          <SelectItem value="sip">Legacy SIP (chan_sip)</SelectItem>
                          <SelectItem value="iax2">IAX2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>SIP Server / Proxy*</Label>
                    <Input placeholder="sip.provider.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Username</Label>
                      <Input placeholder="Username" />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Transport</Label>
                      <Select defaultValue="udp">
                        <SelectTrigger>
                          <SelectValue placeholder="Select transport" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="udp">UDP</SelectItem>
                          <SelectItem value="tcp">TCP</SelectItem>
                          <SelectItem value="tls">TLS (Secure)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>DTMF Mode</Label>
                      <Select defaultValue="rfc4733">
                        <SelectTrigger>
                          <SelectValue placeholder="Select DTMF" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rfc4733">RFC4733 / RFC2833</SelectItem>
                          <SelectItem value="info">SIP INFO</SelectItem>
                          <SelectItem value="inband">In-band</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={() => toast.success("Trunk created")}>Create Trunk</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold">Name / Provider</TableHead>
                  <TableHead className="font-bold">Endpoint</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold">Channels</TableHead>
                  <TableHead className="font-bold">Transport</TableHead>
                  <TableHead className="font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrunks.length > 0 ? (
                  filteredTrunks.map((trunk) => (
                    <TableRow key={trunk.id}>
                      <TableCell>
                        <div className="font-medium">{trunk.name}</div>
                        <div className="text-xs text-muted-foreground uppercase">{trunk.type}</div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{trunk.server}</TableCell>
                      <TableCell>
                        <Badge variant={trunk.status === "Registered" ? "success" : "warning"}>
                          {trunk.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{trunk.channels}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">{trunk.transport}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => handleTestTrunk(trunk)}
                            disabled={isTesting === trunk.id}
                          >
                            {isTesting === trunk.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                            onClick={() => copyConfigSnippet(trunk)}
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(trunk.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No trunks found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50/50">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-start">
            <div className="p-2 rounded-full bg-orange-100 text-orange-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-orange-800">SIP Compliance Note</h4>
              <p className="text-sm text-orange-700 mt-1">
                Ensure your firewall (iptables/firewalld) allows traffic on the configured SIP ports (default 5060/5061) and RTP range (default 10000-20000) from your provider&apos;s IP addresses. NEXUS AI automatically white-lists these in its local security policy upon trunk registration.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
