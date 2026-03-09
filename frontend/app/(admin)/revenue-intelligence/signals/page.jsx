"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  BadgeDollarSign,
  Clock,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Save,
  ArrowLeft,
  Info,
  TrendingUp,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { mockOpportunities } from "@/lib/mock-data/revenue";

function SignalAddForm({ onCancel, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "upsell",
    priority: "High",
    phrases: "",
    offer: "Enterprise Suite",
    threshold: 85
  });

  const signalTypes = [
    { id: "upsell", label: "Upsell (Expansion)" },
    { id: "cross", label: "Cross-sell (New Product)" },
    { id: "bundle", label: "Bundle Offer" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="h-9 w-9 rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-black tracking-tighter uppercase">Initialize Revenue Signal</h2>
          <p className="text-[10px] text-muted-foreground font-medium italic">Configure AI-driven intent detection for high-value sales opportunities.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="p-8 border-b bg-primary/2">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Signal logic & Parameters</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Signal Narrative</label>
                  <Input
                    required
                    placeholder="e.g. Enterprise Upgrade Intent"
                    className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Intent Category</label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                    <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {signalTypes.map(t => <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Trigger Keywords (Comma Separated)</label>
                <Input
                  required
                  placeholder="e.g. more users, annual plan, API access, scaling"
                  className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                  value={formData.phrases}
                  onChange={(e) => setFormData({ ...formData, phrases: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Recommended Offer</label>
                  <Select value={formData.offer} onValueChange={(v) => setFormData({ ...formData, offer: v })}>
                    <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                      <SelectValue placeholder="Select Offer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Enterprise Suite">Enterprise Suite (+40% MRR)</SelectItem>
                      <SelectItem value="Security Add-on">Security & Compliance Hub</SelectItem>
                      <SelectItem value="WFM Pro">WFM Forecasting Pack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">AI Confidence Threshold: {formData.threshold}%</label>
                  <div className="pt-4 px-2">
                    <Slider
                      defaultValue={[formData.threshold]}
                      max={100}
                      step={1}
                      onValueChange={([v]) => setFormData({ ...formData, threshold: v })}
                      className="text-primary"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-tight">Intelligence Protocol</p>
              <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                Signals are processed in real-time. Once triggered, the recommended offer will appear in the Agent Workspace with an AI-generated talk track.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/10 shadow-lg">
            <CardHeader className="p-6 bg-primary/5 border-b">
              <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Publication</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-[10px] font-black uppercase text-green-700">High Growth Potential</span>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
              >
                <Save className="h-4 w-4 mr-2" /> Activate Signal
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full h-11 border-primary/10 text-[10px] font-black uppercase tracking-widest"
              >
                <X className="h-4 w-4 mr-2" /> Discard
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}

export default function OpportunitySignalsPage() {
  const [isBuilding, setIsBuilding] = useState(false);
  const opportunities = mockOpportunities;

  if (isBuilding) {
    return <SignalAddForm onCancel={() => setIsBuilding(false)} onSave={() => { alert("Signal Activated!"); setIsBuilding(false); }} />;
  }

  return (
    <div className="space-y-6 p-1">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Upsell & Cross-Sell Intelligence</h2>
          <p className="text-muted-foreground text-sm">Configure AI intent signals and track generated opportunities.</p>
        </div>
        <Button className="gap-2 shadow-lg bg-primary font-bold" onClick={() => setIsBuilding(true)}>
          <Plus className="h-4 w-4" />
          Create Signal (4.2.1)
        </Button>
      </div>

      {/* Opportunity Tracker Table (4.2.2) */}
      <Card className="shadow-sm border-primary/10">
        <CardHeader className="pb-3 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2 text-primary font-bold">
              <BadgeDollarSign className="h-5 w-5" />
              Opportunity Detection Tracker
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Search revenue..." className="pl-8 h-8 text-xs bg-background" />
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Filter className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4 whitespace-nowrap">ID / Ref</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4 whitespace-nowrap">Signal Triggered</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4 whitespace-nowrap">Detection Time</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4 whitespace-nowrap">Offered?</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4 whitespace-nowrap">Response</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4 whitespace-nowrap">Deal Value</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4 whitespace-nowrap">CRM Deal</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold h-10 px-4 text-right whitespace-nowrap">Verify</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map((opp) => (
                  <TableRow key={opp.id} className="group hover:bg-muted/20">
                    <TableCell className="px-4 py-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-muted-foreground">#{opp.id}</span>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-primary cursor-pointer hover:underline whitespace-nowrap">
                          {opp.callRef} <ExternalLink className="h-3 w-3" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap">
                        {opp.signal}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono whitespace-nowrap">
                        <Clock className="h-3 w-3" /> {opp.timestamp}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      {opp.offerMade ? (
                        <Badge variant="outline" className="text-[9px] h-4 text-green-600 bg-green-50 border-green-200">YES</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px] h-4 text-amber-600 bg-amber-50 border-amber-200">NO</Badge>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <Badge className={cn(
                        "text-[9px] px-1.5 h-4 capitalize",
                        opp.response === 'Accepted' ? "bg-green-500" :
                          opp.response === 'Considering' ? "bg-amber-500" : "bg-red-500"
                      )}>
                        {opp.response}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4 font-mono font-bold text-xs">
                      ${opp.value.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      {opp.crmDeal ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase font-bold whitespace-nowrap">
                          Pending <ArrowRight className="h-3 w-3" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-right">
                      <Switch checked={opp.verified} className="scale-75" onCheckedChange={() => alert("Verification status toggled")} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
