"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { USER_PROFILES } from "@/lib/auth";
import { 
  Bot, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  LayoutDashboard, 
  Database, 
  Cloud,
  Eye,
  EyeOff,
  Fingerprint,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleId = searchParams.get("role");
  const selectedProfile = Object.values(USER_PROFILES).find(p => p.id === roleId) || USER_PROFILES.SUPER_ADMIN;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (selectedProfile) {
      setEmail(selectedProfile.testCredentials.email);
      setPassword(selectedProfile.testCredentials.password);
    }
  }, [selectedProfile]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    setTimeout(() => {
      toast.success(`Authenticated as ${selectedProfile.label}`, {
        description: "Welcome back to NEXUS AI Command Center."
      });
      document.cookie = `userRole=${selectedProfile.id}; path=/`;
      router.push("/realtime-operation");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans overflow-hidden">
      
      {/* Left Side: Bird's Eye View (Command Center Light) */}
      <div className="hidden lg:flex lg:w-3/5 relative bg-white overflow-hidden p-16 flex-col justify-between border-r border-border">
        {/* Animated Background Pulse - Subtle Primary Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary opacity-5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary opacity-5 blur-[120px] rounded-full" />

        {/* Header Branding */}
        <div className="z-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
             <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter">NEXUS <span className="text-primary italic">AI</span></span>
        </div>

        {/* Central Visual: System Architecture Widgets (Light Mode) */}
        <div className="z-10 grid grid-cols-2 gap-8 max-w-2xl animate-in fade-in slide-in-from-left-10 duration-1000">
           <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tighter leading-none text-foreground">Intelligence <br/><span className="text-primary italic">Synchronized.</span></h2>
              <p className="text-muted-foreground text-sm font-bold">Monitoring 4,821 live concurrent voice streams across 14 global regions.</p>
           </div>

           <div className="p-8 rounded-[2rem] bg-card border border-border shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                 <Badge variant="outline" className="bg-green-500/10 text-green-600 border-none uppercase text-[9px] font-black tracking-widest px-2">System Healthy</Badge>
                 <ActivityPulse />
              </div>
              <div className="space-y-1">
                 <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Global Throughput</span>
                 <p className="text-2xl font-black tracking-tighter">1.2M <span className="text-[10px] text-muted-foreground uppercase font-medium">Req/Sec</span></p>
              </div>
           </div>

           <div className="p-8 rounded-[2rem] bg-card border border-border shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Database className="h-5 w-5 text-primary" />
                 </div>
                 <div className="space-y-0.5">
                    <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Neural Cache</span>
                    <p className="text-sm font-black tracking-tight text-foreground">Active Sync (99.9%)</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%] animate-pulse" />
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                 <Cloud className="h-20 w-20 text-primary" />
              </div>
              <div className="space-y-4">
                 <LayoutDashboard className="h-7 w-7 text-primary" />
                 <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase text-primary/60 tracking-widest">Security Layer</span>
                    <p className="text-sm font-black tracking-tight text-foreground">AES-256 Multi-Zone Encrypted</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer Meta */}
        <div className="z-10 flex items-center gap-8">
           <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold italic">Compliance Validated</span>
           </div>
           <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold italic">Sub-10ms Latency</span>
           </div>
        </div>
      </div>

      {/* Right Side: Login Form (Light Mode) */}
      <div className="w-full lg:w-2/5 p-8 md:p-16 flex flex-col justify-center items-center relative bg-linear-to-l from-primary via-primary/10 to-background">
        <div className="w-full max-w-sm space-y-10 z-10 animate-in fade-in slide-in-from-right-10 duration-1000">
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.4em]">
                <Fingerprint className="h-4 w-4" /> Secure Auth
             </div>
             <h1 className="text-4xl font-black tracking-tighter text-foreground">System Access</h1>
             <p className="text-muted-foreground text-sm font-bold">Authenticating as <span className="text-primary font-black underline underline-offset-4 decoration-primary/30">{selectedProfile.label}</span>.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Corporate Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white border-border focus:ring-primary/20 rounded-xl font-bold"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Access Key</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-white border-border focus:ring-primary/20 rounded-xl font-bold pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
               <Button 
                 type="submit" 
                 disabled={isAuthenticating}
                 className="h-14 bg-primary text-white font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all shadow-xl shadow-primary/20"
               >
                 {isAuthenticating ? (
                   <span className="flex items-center gap-2">
                     <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     Authorizing...
                   </span>
                 ) : (
                   <span className="flex items-center gap-2">
                     Initialize Session <ArrowRight className="h-4 w-4" />
                   </span>
                 )}
               </Button>
               
               <p className="text-[9px] text-center text-muted-foreground font-black uppercase tracking-widest">
                  By signing in you agree to our <span className="underline cursor-pointer hover:text-primary transition-colors">Security Protocol v2.4</span>
               </p>
            </div>
          </form>

          <div className="pt-6 border-t border-border flex justify-between items-center">
             <button 
               onClick={() => router.push("/profiles")}
               className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
             >
                Change Profile
             </button>
             <div className="flex gap-4">
                <Lock className="h-4 w-4 text-muted-foreground/40" />
                <LayoutDashboard className="h-4 w-4 text-muted-foreground/40" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityPulse() {
   return (
      <div className="flex items-end gap-0.5 h-4">
         {[0.4, 0.7, 0.3, 0.9, 0.5].map((h, i) => (
            <div 
               key={i} 
               className="w-1 bg-green-500 rounded-full animate-pulse" 
               style={{ 
                  height: `${h * 100}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1s'
               }} 
            />
         ))}
      </div>
   );
}

export default function LoginPage() {
   return (
      <Suspense fallback={
         <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
         </div>
      }>
         <LoginContent />
      </Suspense>
   );
}
