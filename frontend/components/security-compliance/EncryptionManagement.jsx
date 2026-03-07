"use client";

import { Lock, ShieldCheck, RefreshCw, Cpu, Database, Terminal, ChevronRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { encryptionStatus } from "@/lib/mock-data/security";
import { cn } from "@/lib/utils";

import CertificateProvisionForm from "./CertificateProvisionForm";

export default function EncryptionManagement() {
   const [isAddingCert, setIsAddingCert] = useState(false);

   if (isAddingCert) {
      return <CertificateProvisionForm onCancel={() => setIsAddingCert(false)} onSave={() => setIsAddingCert(false)} />;
   }
   return (
      <div className="space-y-8 animate-in fade-in duration-500">
         {/* Top Level Encryption Logic */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { label: "Encryption Algorithm", value: encryptionStatus.encryptionAlgorithm, icon: Cpu, color: "text-blue-500", detail: "FIPS 140-2 Validated" },
               { label: "Key Rotation", value: encryptionStatus.keyRotation, icon: RefreshCw, color: "text-green-500", detail: `Last: ${encryptionStatus.lastRotation}` },
               { label: "Primary Key Store", value: "Nexus Vault", icon: Database, color: "text-primary", detail: "Hardware Isolated (HSM)" },
            ].map((stat, idx) => (
               <Card key={idx} className="border-primary/10 shadow-lg bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-all">
                  <CardContent className="p-6 space-y-4">
                     <div className="flex justify-between items-start">
                        <div className={cn("p-2 rounded-xl bg-primary/5", stat.color)}>
                           <stat.icon className={cn("h-5 w-5", stat.icon === RefreshCw && "animate-spin-slow")} />
                        </div>
                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-primary/10">Protocol Active</Badge>
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                        <p className="text-xl font-black italic tracking-tighter truncate">{stat.value}</p>
                        <p className="text-[9px] font-bold text-muted-foreground/60 italic mt-0.5">{stat.detail}</p>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Certificate Registry */}
            <Card className="lg:col-span-3 border-primary/10 shadow-2xl overflow-hidden">
               <CardHeader className="p-8 border-b bg-primary/2">
                  <div className="flex justify-between items-center">
                     <div className="space-y-1">
                        <CardTitle className="text-xl font-black tracking-tighter uppercase italic flex items-center gap-2">
                           <ShieldCheck className="h-5 w-5 text-primary" /> Certificate Registry
                        </CardTitle>
                        <p className="text-[10px] text-muted-foreground font-medium italic">SSL/TLS profiles for platform subdomains and internal API endpoints.</p>
                     </div>
                     <Button
                        onClick={() => setIsAddingCert(true)}
                        className="h-10 px-6 bg-primary font-black uppercase text-[10px] shadow-lg shadow-primary/20"
                     >
                        Provision New Certificate
                     </Button>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="bg-primary/5 border-b border-primary/10">
                              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Domain Origin</th>
                              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Provider</th>
                              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Encryption Depth</th>
                              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">TTL / Expiry</th>
                              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right w-24">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                           {encryptionStatus.sslCerts.map((cert, i) => (
                              <tr key={i} className="hover:bg-muted/10 transition-colors group">
                                 <td className="p-4">
                                    <p className="text-sm font-black tracking-tight font-mono text-primary italic lowercase">{cert.domain}</p>
                                 </td>
                                 <td className="p-4">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{cert.provider}</span>
                                 </td>
                                 <td className="p-4">
                                    <Badge className="bg-primary/5 text-primary border-none text-[9px] font-black uppercase px-2">{cert.strength}</Badge>
                                 </td>
                                 <td className="p-4">
                                    <div className="flex items-center gap-2">
                                       <div className={cn(
                                          "h-1.5 w-1.5 rounded-full",
                                          parseInt(cert.expires) < 30 ? "bg-amber-500 animate-pulse" : "bg-green-500"
                                       )} />
                                       <span className={cn(
                                          "text-xs font-black italic",
                                          parseInt(cert.expires) < 30 ? "text-amber-600" : "text-foreground"
                                       )}>{cert.expires}</span>
                                    </div>
                                 </td>
                                 <td className="p-4 text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-primary transition-all">
                                       <ChevronRight className="h-4 w-4" />
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>

            {/* Security Summary Sideboard */}
            <div className="space-y-6">
               <Card className="border-primary/10 shadow-lg bg-linear-to-b from-card to-background overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                     <Lock className="h-24 w-24 text-primary" />
                  </div>
                  <CardHeader className="p-6 bg-primary/2 border-b">
                     <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">System Integrity</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     <div className="space-y-4">
                        {[
                           "TLS 1.3 Minimum Policy",
                           "Perfect Forward Secrecy",
                           "HSTS Preload Enabled",
                           "Key Rotation Automation",
                        ].map((item, i) => (
                           <div key={i} className="flex items-center gap-3">
                              <div className="h-5 w-5 rounded-md bg-green-500/10 flex items-center justify-center text-green-600">
                                 <CheckCircle2 className="h-3.5 w-3.5" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">{item}</span>
                           </div>
                        ))}
                     </div>

                     <div className="pt-6 border-t border-dashed">
                        <Button variant="outline" className="w-full h-11 border-primary/10 text-[10px] font-black uppercase tracking-widest hover:bg-primary/5">
                           Rotator Logs
                        </Button>
                     </div>
                  </CardContent>
               </Card>

               <div className="p-5 rounded-3xl bg-linear-to-br from-indigo-500/5 via-primary/5 to-transparent border border-primary/10 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                     <Terminal className="h-4 w-4 text-primary" />
                     <p className="text-[10px] font-black uppercase tracking-widest">Protocol Monitor</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                     Automatic certificate renewal is active for all Edge domains. Internal API meshes are secured via MTLS with 24h token TTLs.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
