"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trophy, Flame, Settings, Plus, Star, ArrowLeft, Save, X, Info, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { achievements, workforceAgents } from "@/lib/mock-data/workforce";
import { cn } from "@/lib/utils";

function AchievementAddForm({ onCancel, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: 100,
    category: "Performance",
    icon: "zap"
  });

  const categories = ["Performance", "Compliance", "Culture", "Learning"];
  const icons = [
    { id: "zap", icon: Zap },
    { id: "trophy", icon: Trophy },
    { id: "star", icon: Star }
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
          <h2 className="text-xl font-black tracking-tighter uppercase">Forge New Achievement</h2>
          <p className="text-[10px] text-muted-foreground font-medium italic">Define a new milestone and reward for the gamification ecosystem.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="p-8 border-b bg-primary/2">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Achievement Blueprint</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Achievement Name</label>
                  <Input
                    required
                    placeholder="e.g. CSR Overdrive"
                    className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Point Value (Nexus Credits)</label>
                  <Input
                    required
                    type="number"
                    placeholder="100"
                    className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Requirement Narrative</label>
                <Input
                  required
                  placeholder="e.g. Maintain a 95% CSAT score for 10 consecutive interactions."
                  className="h-11 bg-background border-primary/10 text-sm font-medium focus:ring-primary/20"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Reward Category</label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger className="h-11 bg-background border-primary/10 text-sm font-medium">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Visual Badge Token</label>
                  <div className="flex gap-3">
                    {icons.map(({ id, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: id })}
                        className={cn(
                          "h-11 w-11 rounded-xl flex items-center justify-center border transition-all",
                          formData.icon === id
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                            : "bg-background border-primary/10 text-muted-foreground hover:border-primary/30"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-tight">Gamification Protocol</p>
              <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                Achievements are automatically calculated via the Nexus IQ engine. Points will be distributed to agent wallets upon verification.
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
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
                <Star className="h-4 w-4 text-amber-600 fill-amber-600" />
                <span className="text-[10px] font-black uppercase text-amber-700">Premium Reward</span>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/10"
              >
                <Save className="h-4 w-4 mr-2" /> Deploy Achievement
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full h-11 border-primary/10 text-[10px] font-black uppercase tracking-widest"
              >
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}

export default function GamificationPage() {
  const [view, setView] = useState("builder"); // builder | leaderboards
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding) {
    return <AchievementAddForm onCancel={() => setIsAdding(false)} onSave={() => { toast.success("Achievement deployed!"); setIsAdding(false); }} />;
  }

  return (
    <div className="space-y-6 p-1">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Gamification Engine</h2>
          <p className="text-xs text-muted-foreground font-medium italic">Drive engagement through achievements and competition.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg shadow-inner">
          <Button
            variant={view === "builder" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("builder")}
            className="h-8 text-xs font-bold"
          >
            Achievement Builder
          </Button>
          <Button
            variant={view === "leaderboards" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("leaderboards")}
            className="h-8 text-xs font-bold"
          >
            Leaderboards
          </Button>
        </div>
      </div>

      {view === "builder" ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Active Achievements List */}
          <div className="xl:col-span-2 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground px-1">Active Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((item) => (
                <Card key={item.id} className="border-primary/10 hover:shadow-lg transition-all group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-2">
                    <Settings className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" onClick={() => toast.success("Opening achievement editor...")} />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={cn("p-4 rounded-2xl bg-muted/50 transition-transform group-hover:scale-110", item.color)}>
                        <item.badge className="h-8 w-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-lg">{item.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{item.event}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-[10px] font-bold border-primary/20 bg-primary/5">
                            {item.points} PTS
                          </Badge>
                          <Badge variant="outline" className="text-[10px] font-bold border-orange-500/20 bg-orange-500/5 text-orange-600">
                            ACTIVE
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card
                onClick={() => setIsAdding(true)}
                className="border-dashed border-2 border-primary/20 flex items-center justify-center p-6 bg-primary/2 hover:bg-primary/4 cursor-pointer transition-colors group shadow-sm"
              >
                <div className="text-center space-y-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-inner">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-black text-primary uppercase tracking-tighter">Create New Achievement</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Info Panel instead of Builder */}
          <div className="xl:col-span-1 space-y-6">
            <Card className="border-primary/10 shadow-xl bg-linear-to-br from-primary/5 to-transparent overflow-hidden">
              <CardHeader className="border-b bg-background/50 backdrop-blur-sm">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <Star className="h-4 w-4 fill-primary" /> Gamification Protocol
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-[11px] text-muted-foreground font-medium italic leading-relaxed">
                  The Nexus Gamification Engine uses real-time event analytics to dynamically award points and badges. High-engagement achievements boost agent morale and visibility on global leaderboards.
                </p>
                <div className="pt-4 border-t border-dashed border-primary/10">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Drivers</span>
                    <Badge className="bg-primary/10 text-primary border-none text-[9px] font-bold">4 RULES</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Avg. Reward Rate</span>
                    <span className="text-[10px] font-bold font-mono">1.2 / interaction</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Leaderboard */}
          <Card className="lg:col-span-2 border-primary/10 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/10">
              <div>
                <CardTitle className="text-lg font-black tracking-tight uppercase">CSAT Champions - Q1</CardTitle>
                <CardDescription className="text-[10px] font-medium italic">Top performing agents by customer satisfaction</CardDescription>
              </div>
              <Select defaultValue="this-month">
                <SelectTrigger className="w-35 h-8 text-xs bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-1 mt-2">
                {workforceAgents.sort((a, b) => b.gamification.points - a.gamification.points).map((agent, index) => (
                  <div key={agent.id} className={cn(
                    "flex items-center justify-between p-3 rounded-xl border transition-all hover:bg-muted/50 group",
                    index === 0 ? "bg-yellow-500/5 border-yellow-500/20 shadow-sm" : "bg-card border-transparent"
                  )}>
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "w-8 text-center font-black italic text-lg transition-transform group-hover:scale-110",
                        index === 0 ? "text-yellow-500 scale-125" :
                          index === 1 ? "text-slate-400" :
                            index === 2 ? "text-amber-600" : "text-muted-foreground"
                      )}>
                        #{index + 1}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-black text-xs shadow-inner">
                            {agent.fullName.split(" ").map(n => n[0]).join("")}
                          </div>
                          {index === 0 && <Flame className="h-4 w-4 text-orange-500 absolute -top-1 -right-1 fill-orange-500 animate-pulse" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{agent.fullName}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">{agent.team}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-primary font-mono">{agent.gamification.points.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground font-black italic tracking-widest uppercase">Points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Config */}
          <div className="space-y-6">
            <Card className="border-primary/10 shadow-md">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">New Leaderboard</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Board Narrative</Label>
                  <Input placeholder="e.g. Support Rockstars" className="h-9 text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary Metric</Label>
                  <Select defaultValue="csat">
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csat">CSAT Score</SelectItem>
                      <SelectItem value="qa">QA Average</SelectItem>
                      <SelectItem value="fcr">FCR Rate</SelectItem>
                      <SelectItem value="aht">AHT (Inverted)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold">Visible to Agents</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold">Show Rank Only</Label>
                    <Switch />
                  </div>
                </div>
                <Button className="w-full font-black uppercase tracking-widest shadow-lg bg-primary text-white" onClick={() => toast.success("Leaderboard initialized!")}>
                  Create Board
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-linear-to-br from-indigo-500/5 to-purple-500/5 shadow-inner overflow-hidden group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg transition-transform group-hover:scale-110">
                  <Trophy className="h-8 w-8 text-indigo-500 fill-indigo-500/20" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-tighter">Top Performer Reward</p>
                  <p className="text-[10px] text-muted-foreground font-medium italic">Current prize for monthly #1</p>
                </div>
                <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white font-black px-6 py-1.5 shadow-md">
                  $50 AMAZON GIFT CARD
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
