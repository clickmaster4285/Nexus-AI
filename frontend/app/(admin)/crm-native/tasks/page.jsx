"use client";

import { useState } from "react";
import { 
  CheckSquare, 
  Search, 
  Filter, 
  Plus,
  Clock, 
  User,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit2,
  Briefcase,
  Phone,
  Mail
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { tasks as initialTasks } from "@/lib/mock-data/crm";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function TasksPage() {
  const [tasks ] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action, name) => {
    toast.success(`${action}: ${name}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-500 bg-red-500/10";
      case "Medium": return "text-amber-500 bg-amber-500/10";
      case "Low": return "text-blue-500 bg-blue-500/10";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tasks by title or contact..." 
            className="pl-10 h-11 bg-background border-primary/10 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 px-4 border-primary/10 font-bold uppercase text-[10px]" onClick={() => toast.info("Opening filter...")}>
            <Filter className="h-3.5 w-3.5 mr-2" /> Filter
          </Button>
          <Button className="h-11 px-6 bg-primary font-black uppercase text-[10px] shadow-lg shadow-primary/20" onClick={() => toast.success("Create Task Dialog")}>
            <Plus className="h-4 w-4 mr-2" /> Create Task
          </Button>
        </div>
      </div>

      {/* Tasks Grid/Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Active Tasks List */}
         <Card className="lg:col-span-2 border-primary/10 shadow-xl overflow-hidden flex flex-col">
            <CardHeader className="p-6 border-b bg-muted/40 flex flex-row items-center justify-between">
               <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Assigned Tasks Queue</CardTitle>
               <Badge variant="outline" className="border-primary/10 text-[8px] font-black uppercase">{filteredTasks.length} Pending</Badge>
            </CardHeader>
            <CardContent className="p-0 flex-1">
               <div className="divide-y divide-primary/5">
                  {filteredTasks.map((task) => (
                     <div key={task.id} className="p-5 hover:bg-muted/10 transition-colors group flex items-center justify-between">
                        <div className="flex items-start gap-4">
                           <button className="mt-1 h-5 w-5 rounded border-2 border-primary/20 flex items-center justify-center hover:border-primary transition-colors">
                              <CheckCircle2 className="h-3 w-3 text-transparent group-hover:text-primary/20" />
                           </button>
                           <div className="space-y-1">
                              <p className="text-sm font-black tracking-tight group-hover:text-primary transition-colors">{task.title}</p>
                              <div className="flex items-center gap-3">
                                 <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                    <User className="h-2.5 w-2.5" /> {task.contact}
                                 </span>
                                 <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 italic uppercase tracking-tighter">
                                    <Clock className="h-2.5 w-2.5" /> {task.dueDate.split("T")[0]}
                                 </span>
                                 <Badge className={cn("text-[7px] font-black uppercase border-none px-1.5 h-4", getPriorityColor(task.priority))}>
                                    {task.priority}
                                 </Badge>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="flex items-center gap-1 p-1 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-white text-primary" onClick={() => handleAction("Edit", task.title)}>
                                 <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-white text-red-500" onClick={() => handleAction("Delete", task.title)}>
                                 <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                           </div>
                           {task.type === "Call" ? (
                              <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                                 <Phone className="h-4 w-4" />
                              </div>
                           ) : task.type === "Email" ? (
                              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                                 <Mail className="h-4 w-4" />
                              </div>
                           ) : (
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                 <Briefcase className="h-4 w-4" />
                              </div>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Task Sideboard */}
         <div className="space-y-6">
            <Card className="border-primary/10 shadow-lg p-6 bg-linear-to-br from-primary/5 to-transparent">
               <div className="flex items-center justify-between mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Productivity Stats</h4>
                  <CheckSquare className="h-4 w-4 text-primary" />
               </div>
               <div className="space-y-6">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-2xl font-black tracking-tighter">84%</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Completion Rate</p>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-black text-green-600">+12%</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase">vs Last Week</p>
                     </div>
                  </div>
                  <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: '84%' }} />
                  </div>
               </div>
            </Card>

            <Card className="border-primary/10 shadow-lg p-6">
               <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <h4 className="text-xs font-black uppercase tracking-widest italic text-red-600">Overdue Protocols</h4>
               </div>
               <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                     <p className="text-[10px] font-black uppercase text-red-600">Urgent Follow-up</p>
                     <p className="text-[11px] font-black mt-1">Signatory required for Account ACC-002</p>
                     <p className="text-[9px] text-muted-foreground italic mt-1 font-medium">Overdue by 48 hours</p>
                  </div>
                  <Button variant="outline" className="w-full h-9 border-primary/10 text-[9px] font-black uppercase tracking-widest hover:bg-primary/5" onClick={() => toast.info("Viewing all red alerts")}>
                     View All Red Alerts
                  </Button>
               </div>
            </Card>

            <div className="p-5 rounded-3xl bg-muted/30 border border-primary/5 flex items-center gap-4">
               <div className="h-10 w-10 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary shrink-0 rotate-[-5deg]">
                  <CheckSquare className="h-5 w-5" />
               </div>
               <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed">
                  &quot;Nexus Tasks are automatically linked to interaction recordings for full context during review.&quot;
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
