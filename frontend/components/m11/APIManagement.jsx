"use client";

import { useState } from "react";
import { Key, Eye, EyeOff, Copy, RefreshCw, Trash2, Plus, Globe, Code, Zap, AlertCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { apiKeys } from "@/lib/mock-data/integrations";
import { cn } from "@/lib/utils";

export default function APIManagement() {
   const [keys] = useState(apiKeys);
   const [showSecret, setShowSecret] = useState({});

   const toggleSecret = (id) => {
      setShowSecret(prev => ({ ...prev, [id]: !prev[id] }));
   };

   return (
      <div className="space-y-8 animate-in fade-in duration-500">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
            <div>
               <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Developer access</h2>
               <p className="text-[10px] text-muted-foreground font-medium italic">Authenticate and authorize external requests to the Nexus platform.</p>
            </div>
            <div className="flex gap-3">
               <Button variant="outline" size="sm" className="h-10 px-4 text-[10px] font-black uppercase border-primary/10">
                  <Globe className="h-3.5 w-3.5 mr-2" /> API Documentation
               </Button>
               <Button size="sm" className="h-10 px-6 gap-2 text-[10px] font-black uppercase bg-primary shadow-lg shadow-primary/20">
                  <Plus className="h-4 w-4" /> Generate New Key
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <div className="space-y-4">
                  {keys.map((key) => (
                     <Card key={key.id} className="border-primary/10 bg-card/50 backdrop-blur-sm group hover:border-primary/20 shadow-md transition-all">
                        <CardContent className="p-6 space-y-6">
                           <div className="flex justify-between items-start">
                              <div className="flex items-center gap-4">
                                 <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                                    <Key className="h-5 w-5 text-primary" />
                                 </div>
                                 <div className="space-y-1">
                                    <p className="text-sm font-black tracking-tight">{key.name}</p>
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium uppercase font-mono">
                                       {key.id} • Created {key.created}
                                    </div>
                                 </div>
                              </div>
                              <Badge className={cn(
                                 "text-[8px] font-black uppercase border-none px-2",
                                 key.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"
                              )}>
                                 {key.status}
                              </Badge>
                           </div>

                           <div className="space-y-2">
                              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Secret Key</p>
                              <div className="flex gap-2">
                                 <div className="flex-1 relative h-10 bg-muted/30 rounded-lg flex items-center px-4 font-mono text-xs overflow-hidden border border-primary/5">
                                    {showSecret[key.id] ? "nx_live_9482_bca772_2901_fe89" : "••••••••••••••••••••••••••••••••"}
                                    <div className="absolute right-2 flex gap-1 bg-card/50 px-1 rounded-md">
                                       <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 opacity-60 hover:opacity-100"
                                          onClick={() => toggleSecret(key.id)}
                                       >
                                          {showSecret[key.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                       </Button>
                                       <Button variant="ghost" size="icon" className="h-7 w-7 opacity-60 hover:opacity-100">
                                          <Copy className="h-3.5 w-3.5" />
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="flex items-center justify-between pt-4 border-t border-dashed border-primary/10">
                              <div className="flex gap-1.5">
                                 {key.scopes.map((scope, i) => (
                                    <Badge key={i} variant="secondary" className="text-[8px] font-bold h-5 px-2 bg-muted/50 border-none uppercase">
                                       {scope}
                                    </Badge>
                                 ))}
                              </div>
                              <div className="flex items-center gap-3">
                                 <span className="text-[10px] font-medium text-muted-foreground italic truncate max-w-24">Last used: {key.lastUsed}</span>
                                 <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors">
                                       <RefreshCw className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500 transition-colors">
                                       <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>

               <Card className="border-primary/10 bg-linear-to-r from-blue-500/5 to-transparent relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                     <Code className="h-32 w-32" />
                  </div>
                  <CardContent className="p-8 space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                           <Zap className="h-5 w-5 text-white fill-current" />
                        </div>
                        <h3 className="text-lg font-black tracking-tight uppercase italic">Secure Integration Guideline</h3>
                     </div>
                     <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-2xl italic">
                        &quot;Nexus AI recommends using **OAuth 2.0 PKCE** for frontend integrations. Server-side keys should be stored in a secured vault like AWS Secrets Manager or HashiCorp Vault. Never commit keys to version control.&quot;
                     </p>
                     <Button variant="link" className="p-0 h-auto text-blue-500 font-black uppercase text-[10px] flex items-center gap-1">
                        Security Best Practices <ChevronRight className="h-3 w-3" />
                     </Button>
                  </CardContent>
               </Card>
            </div>

            {/* API Stats & Scopes */}
            <div className="space-y-8">
               <Card className="border-primary/10 bg-card shadow-lg overflow-hidden">
                  <CardHeader className="p-6 bg-primary/5">
                     <CardTitle className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ">Global usage limits</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     <div>
                        <div className="flex justify-between text-[10px] font-bold mb-2">
                           <span className="text-muted-foreground">Requests / Minute</span>
                           <span>842 / 2,500</span>
                        </div>
                        <Progress value={34} className="h-1" />
                     </div>
                     <div>
                        <div className="flex justify-between text-[10px] font-bold mb-2">
                           <span className="text-muted-foreground">Data Transit</span>
                           <span>1.2 GB / 5 GB</span>
                        </div>
                        <Progress value={24} className="h-1" indicatorClassName="bg-green-500" />
                     </div>
                     <div className="pt-4 border-t border-dashed space-y-3">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Scopes Mapping</p>
                        <div className="grid grid-cols-2 gap-2">
                           {["interactions.read", "recordings.stream", "analytics.export", "ivr.manage", "users.write", "billing.admin"].map((s) => (
                              <div key={s} className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 text-[9px] font-bold font-mono">
                                 <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                 {s}
                              </div>
                           ))}
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-amber-500/20 bg-amber-500/5">
                  <CardContent className="p-6 flex items-start gap-4">
                     <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
                     <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-tight text-amber-600">Rate Limit Caution</p>
                        <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                           One of your keys (prefix: <span className="font-bold text-foreground">nx_live_...</span>) is approaching 80% of its allocated burst capacity.
                        </p>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
