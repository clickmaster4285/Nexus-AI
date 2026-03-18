"use client";

import { useState, useEffect } from "react";
import {
  User, Clock, Phone, MessageSquare, Zap, TrendingUp, CheckCircle2, Bell,
  Star, Activity, AlertCircle, Inbox, Plus, MoreHorizontal, Mic, Pause, 
  Grid, X, LogOut, PhoneOff, Lock, LayoutGrid, CheckSquare, Calendar, ChevronRight, Settings
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AgentDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("Good Morning");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "Medium", time: "Today" });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17) setGreeting("Good Evening");
    else setGreeting("Good Morning");

    return () => clearInterval(timer);
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    toast.success("Task added successfully!", {
      description: `Task "${newTask.title}" has been scheduled.`,
    });
    setIsTaskModalOpen(false);
    setNewTask({ title: "", priority: "Medium", time: "Today" });
  };

  // KPI stats
  const stats = [
    { label: "Total Calls", value: "1", duration: "00:00:06", target: "10", icon: Phone, color: "text-blue-500" },
    { label: "Inbound", value: "1", duration: "00:00:06", target: "8", icon: Phone, color: "text-green-500" },
    { label: "Outbound", value: "0", duration: "00:00:00", target: "5", icon: Phone, color: "text-purple-500" },
    { label: "Missed", value: "0", duration: "-", target: "0", icon: AlertCircle, color: "text-red-500" },
    { label: "Conversations", value: "1", duration: "Active", target: "5", icon: MessageSquare, color: "text-primary" },
    { label: "New Tickets", value: "0", duration: "-", target: "5", icon: Inbox, color: "text-orange-500" },
    { label: "Open", value: "1", duration: "High Priority", target: "5", icon: CheckCircle2, color: "text-blue-500" },
    { label: "Resolved", value: "0", duration: "-", target: "5", icon: CheckCircle2, color: "text-green-500" }
  ];

  const recentCalls = [
    { number: "+971 4 512 6226", date: "Yesterday, 4:20 PM", type: "inbound", duration: "12m 30s" },
    { number: "+91 9088 883 403", date: "Thursday, 11:15 AM", type: "inbound", duration: "4m 15s" },
    { number: "+965 9110 1235", date: "06/06/2024", type: "inbound", duration: "8m 05s" },
    { number: "+91 9199 985 620", date: "06/06/2024", type: "outbound", duration: "2m 45s" }
  ];

  const todos = [
    { title: "Follow up with +971...226", priority: "High", time: "14:00" },
    { title: "Update ticket #8842", priority: "Medium", time: "15:30" },
    { title: "Quarterly review prep", priority: "Low", time: "Tomorrow" }
  ];

  const presence = [
    { status: "Available", time: "00:02:05", color: "bg-green-500" },
    { status: "Client Session", time: "00:00:00", color: "bg-blue-500" },
    { status: "Lunch", time: "00:00:00", color: "bg-orange-500" },
    { status: "Meeting", time: "00:00:00", color: "bg-purple-500" },
    { status: "On Break", time: "00:00:00", color: "bg-yellow-500" },
    { status: "Outgoing", time: "00:00:00", color: "bg-gray-500" },
    { status: "Prayer", time: "00:00:00", color: "bg-indigo-500" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-6 bg-[#F8FAFC]">

      {/* Header & Status Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-20 w-24 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-primary/20">
              AS
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-2xl bg-white border border-[#F8FAFC] flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900">
              {greeting}, <span className="text-primary italic underline decoration-primary/20 pr-2 decoration-4 underline-offset-8">Agent Smith</span>.
            </h1>
            <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Friday, March 13, 2026</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-slate-900">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-2 border-r border-slate-100 text-right">
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Shift Completion</p>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-lg font-black text-slate-900">62%</p>
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                <div className="h-full bg-primary w-[62%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-slate-50 text-slate-500">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-slate-50 text-slate-500">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Stats & Recent Activity (8 Cols) */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* KPI Mini-Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="group p-6 rounded-lg bg-white border border-slate-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col gap-4">
                  <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center transition-colors", 
                    stat.value !== "0" ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500")}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black tracking-tighter text-slate-900">{stat.value}</span>
                      <span className="text-[10px] font-bold text-slate-500 italic">{stat.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Calls */}
            <Card className="rounded-xl border-slate-200 bg-white shadow-sm overflow-hidden">
              <CardHeader className="px-4 py-2 flex flex-row items-center justify-between bg-white border-none">
                <CardTitle className="text-xs font-black uppercase tracking-[0.17em] text-slate-500 flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" /> Recent Interactions
                </CardTitle>
                <Button variant="link" className="text-[10px] font-black uppercase text-primary p-0">View All</Button>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-4">
                {recentCalls.map((call, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 border border-slate-100/50 group hover:border-primary/20 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center", 
                        call.type === "inbound" ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary")}>
                        {call.type === "inbound" ? <Phone className="h-4 w-4" /> : <PhoneForwardedIcon className="h-4 w-4" />}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-black tracking-tight text-slate-900">{call.number}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{call.date}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-white border-slate-200 text-[9px] font-black text-slate-500 px-3">{call.duration}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* To-Do List */}
            <Card className="rounded-xl border-slate-200 bg-white shadow-sm overflow-hidden">
              <CardHeader className="px-4 py-2 flex flex-row items-center justify-between bg-white border-none">
                <CardTitle className="text-xs font-black uppercase tracking-[0.17em] text-slate-500 flex items-center gap-3">
                  <CheckSquare className="h-4 w-4 text-primary" /> Action Items
                </CardTitle>
                <Button 
                  size="icon" 
                  className="h-8 w-8 rounded-xl bg-primary text-white shadow-lg shadow-primary/20"
                  onClick={() => setIsTaskModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-4">
                {todos.map((todo, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100/50 group hover:border-primary/20 transition-all cursor-pointer">
                    <div className={cn("h-2 w-2 rounded-full", 
                      todo.priority === "High" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : 
                      todo.priority === "Medium" ? "bg-orange-500" : "bg-blue-500") 
                    } />
                    <div className="flex-1">
                      <p className="text-xs font-black text-slate-900 leading-tight">{todo.title}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter mt-1">{todo.time}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 opacity-0 group-hover:opacity-100">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div 
                  className="p-4 rounded-3xl border-2 border-dashed border-slate-100 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-slate-300 hover:text-primary hover:border-primary/20 transition-all cursor-pointer"
                  onClick={() => setIsTaskModalOpen(true)}
                >
                  <Plus className="h-3 w-3" /> Quick Add Task
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Interaction Hub (4 Cols) */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* Presence Panel */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="px-4 py-2 border-none">
              <CardTitle className="text-sm font-black uppercase tracking-[0.17em] text-slate-500 flex items-center gap-3">
                <Activity className="h-4 w-4 text-primary" /> Availability Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6">
              <div className="space-y-3">
                {presence.map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tight">
                      <span className="text-slate-600 flex items-center gap-2">
                        <div className={cn("h-1.5 w-1.5 rounded-full", item.color)} />
                        {item.status}
                      </span>
                      <span className="text-slate-500 font-bold">{item.time}</span>
                    </div>
                    <Progress value={item.status === "Available" ? 15 : 0} className="h-1 bg-slate-50" />
                  </div>
                ))}
              </div>
              <Button className="w-full h-14 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all group">
                <LogOut className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" /> Sign Out Session
              </Button>
            </CardContent>
          </Card>

          {/* Active Call Simulator Placeholder */}
          <Card className="rounded-2xl border-none bg-linear-to-br from-primary to-primary text-white shadow-2xl shadow-indigo-500/20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-40">
              <PhoneOff className="h-32 w-32 -rotate-12" />
            </div>
            
            <CardHeader className="px-8 pt-3 pb-4 relative z-10 border-none">
              <div className="flex items-center justify-between">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none font-black text-[9px] uppercase tracking-widest px-4 py-1">
                  Telephony Core v2.0
                </Badge>
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-white/40" />
                  <div className="h-2 w-2 rounded-full bg-white/20" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-10 space-y-8 relative z-10">
              <div className="space-y-2">
                <p className="text-white/60 font-black uppercase text-[10px] tracking-widest">Active Voice Tunnel</p>
                <h3 className="text-3xl font-black tracking-tighter leading-none italic">Waiting...</h3>
                <p className="text-white/40 text-[11px] font-bold uppercase tracking-tight">System Ready for Inbound Pulse</p>
              </div>

              {/* Mock Call Controls */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: Mic, label: "Mute" },
                  { icon: Pause, label: "Hold" },
                  { icon: Grid, label: "Keypad" },
                  { icon: UserCircle2Icon, label: "Transfer" }
                ].map((btn, i) => (
                  <button key={i} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/5 disabled:opacity-50">
                    <btn.icon className="h-5 w-5" />
                    <span className="text-[8px] font-black uppercase tracking-widest">{btn.label}</span>
                  </button>
                ))}
              </div>

              <div className="h-px bg-white/10 w-full" />

              <Button className="w-full h-16 bg-white text-primary hover:bg-primary/5 font-black uppercase tracking-widest rounded-2xl shadow-lg transition-all text-sm group">
                <Activity className="h-5 w-5 mr-3 animate-pulse" /> Manual Interaction Mode
              </Button>
            </CardContent>
          </Card>

          {/* Neural Alert Sub-Panel */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="px-4 py-2 border-none">
              <CardTitle className="text-xs font-black uppercase tracking-[0.17em] text-slate-500 flex items-center gap-3">
                <Bell className="h-4 w-4 text-primary" /> Intelligence Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-4">
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-4 hover:border-primary/20 transition-all cursor-pointer group">
                <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-primary text-slate-500 group-hover:text-white transition-all shadow-sm">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-900 leading-tight mb-1">QA Performance v4.2</p>
                  <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tighter">Your recent scorecard was processed. Score: 98%.</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Quick Add Task Modal */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl border-primary/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CheckSquare className="h-5 w-5 text-primary" />
              </div>
              ADD NEW TASK
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddTask} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Task Description</Label>
              <Input
                id="title"
                placeholder="e.g., Follow up with customer..."
                className="h-12 rounded-xl border-slate-200 focus:border-primary/30 bg-slate-50/50"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Priority</Label>
                <select
                  id="priority"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm font-bold focus:border-primary/30 outline-hidden"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Due Time</Label>
                <Input
                  id="time"
                  placeholder="e.g., 14:00"
                  className="h-12 rounded-xl border-slate-200 focus:border-primary/30 bg-slate-50/50"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add more details about this task..."
                className="rounded-xl border-slate-200 focus:border-primary/30 bg-slate-50/50 min-h-[100px]"
              />
            </div>
            <DialogFooter className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                Create Task
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Icons not imported correctly or need custom implementation
function PhoneForwardedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 10 20 15 15 20" />
      <path d="M4 4v7a4 4 0 0 0 4 4h12" />
    </svg>
  )
}

function UserCircle2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}
