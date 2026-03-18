"use client";

import { useState } from "react";
import { Users, UserPlus, Search, Filter, MoreVertical, Mail, Shield, ShieldCheck, ShieldAlert, Edit2, Trash2, MailQuestion } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { users as initialUsers } from "@/lib/mock-data/admin";
import { cn } from "@/lib/utils";
import UserAddForm from "./UserAddForm";
import { toast } from "sonner";
import { toast } from "sonner";

export default function UserManagement() {
   const [userList, setUserList] = useState(initialUsers);
   const [searchTerm, setSearchTerm] = useState("");
   const [isAddingUser, setIsAddingUser] = useState(false);

   const filteredUsers = userList.filter(u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const handleAddUser = (userData) => {
      setUserList([userData, ...userList]);
      setIsAddingUser(false);
   };

   if (isAddingUser) {
      return (
         <UserAddForm
            onCancel={() => setIsAddingUser(false)}
            onSave={handleAddUser}
         />
      );
   }

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Header Stats & Actions */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
               { label: "Total Users", value: userList.length, icon: Users, color: "text-blue-500" },
               { label: "Active Now", value: userList.filter(u => u.status === "Active").length, icon: ShieldCheck, color: "text-green-500" },
               { label: "Role: Admin", value: userList.filter(u => u.role === "Super Admin").length, icon: Shield, color: "text-purple-500" },
               { label: "Pending Invites", value: 3, icon: MailQuestion, color: "text-amber-500" },
            ].map((stat, idx) => (
               <Card key={idx} className="border-primary/10 shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                     <div className={cn("p-2 rounded-xl bg-primary/5", stat.color)}>
                        <stat.icon className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                        <p className="text-xl font-black">{stat.value}</p>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         <Card className="border-primary/10 shadow-lg overflow-hidden">
            <CardHeader className="p-6 border-b flex flex-row items-center justify-between bg-card/50">
               <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                     placeholder="Search by name or email..."
                     className="pl-10 h-10 text-sm border-primary/10"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" className="h-10 text-[10px] font-black uppercase border-primary/10" onClick={() => toast.info("Filter opened")}>
                     <Filter className="h-3.5 w-3.5 mr-2" /> Filter
                  </Button>
                  <Button
                     size="sm"
                     className="h-10 px-6 gap-2 text-[10px] font-black uppercase bg-primary shadow-lg shadow-primary/20"
                     onClick={() => setIsAddingUser(true)}
                  >
                     <UserPlus className="h-4 w-4" /> Provision User
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-primary/5 border-b border-primary/10">
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center w-16">Avatar</th>
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Identity</th>
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Access Role</th>
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Safety Status</th>
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Last Activity</th>
                           <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right w-32">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-primary/5">
                        {filteredUsers.map((user) => (
                           <tr key={user.id} className="hover:bg-muted/10 transition-colors group">
                              <td className="p-4 text-center">
                                 <Avatar className="h-10 w-10 mx-auto border border-primary/10 shadow-sm">
                                    <AvatarFallback className="bg-primary/5 text-primary text-xs font-black">{user.avatar}</AvatarFallback>
                                 </Avatar>
                              </td>
                              <td className="p-4">
                                 <div>
                                    <p className="text-sm font-black tracking-tight">{user.name}</p>
                                    <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                       <Mail className="h-3 w-3" /> {user.email}
                                    </p>
                                 </div>
                              </td>
                              <td className="p-4">
                                 <Badge variant="secondary" className="text-[10px] font-black uppercase bg-primary/5 text-primary border-none px-3">
                                    {user.role}
                                 </Badge>
                              </td>
                              <td className="p-4">
                                 <Badge className={cn(
                                    "text-[9px] font-black uppercase border-none px-2",
                                    user.status === "Active" ? "bg-green-500/10 text-green-600" :
                                       user.status === "Inactive" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-600"
                                 )}>
                                    {user.status}
                                 </Badge>
                              </td>
                              <td className="p-4">
                                 <p className="text-xs font-bold text-muted-foreground/80">{user.lastLogin}</p>
                              </td>
                              <td className="p-4 text-right">
                                 <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-primary transition-all" onClick={() => toast.info("Edit user")}>
                                       <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-red-500/10 text-red-500 transition-all" onClick={() => toast.success("User deleted")}>
                                       <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-40 hover:opacity-100" onClick={() => toast.info("More options")}>
                                       <MoreVertical className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </CardContent>
         </Card>

         {/* Policy Reminder */}
         <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <ShieldAlert className="h-5 w-5" />
               </div>
               <div>
                  <p className="text-xs font-black uppercase tracking-tight">Access Policy Enforcement</p>
                  <p className="text-[10px] text-muted-foreground font-medium italic">All administrative actions are logged and subject to SOC2 compliance auditing. 2FA is mandatory for Admin roles.</p>
               </div>
            </div>
            <Button variant="link" className="text-[10px] font-black uppercase text-primary underline-offset-4" onClick={() => toast.info("Opening guide")}>Identity Security Guide</Button>
         </div>
      </div>
   );
}
