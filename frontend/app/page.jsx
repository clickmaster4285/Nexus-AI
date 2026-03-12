"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ShieldCheck, Activity, Brain, Loader2, Cpu, Zap, Fingerprint } from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Initializing Neural Core...",
    "Syncing Regional Voice Nodes...",
    "Establishing Security Handshake...",
    "System Ready."
  ];

  useEffect(() => {
    // Stage 1: Loading Sequence
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 800);

    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    // Stage 2: Redirect Timer (Starts after loading is done)
    let redirectTimer;
    if (!isLoading) {
      redirectTimer = setTimeout(() => {
        router.push("/profiles");
      }, 5000);
    }

    return () => {
      clearTimeout(loadTimer);
      clearInterval(stepInterval);
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [isLoading, router, steps.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-foreground flex flex-col items-center justify-center relative overflow-hidden font-sans">
        {/* Abstract Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        
        <div className="z-10 flex flex-col items-center gap-12 w-full max-w-sm">
          {/* Central Logo Loading */}
          <div className="relative">
            <div className="h-24 w-24 rounded-3xl bg-white border-2 border-primary/20 flex items-center justify-center shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary/5 animate-pulse" />
               <Cpu className="h-12 w-12 text-primary animate-in zoom-in duration-500" />
            </div>
            <div className="absolute -inset-4 border border-primary/10 rounded-[2.5rem] animate-[spin_10s_linear_infinite]" />
            <div className="absolute -inset-8 border border-primary/5 rounded-[3rem] animate-[spin_15s_linear_infinite_reverse]" />
          </div>

          <div className="space-y-6 w-full text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                Nexus <span className="text-primary italic">AI</span>
              </h2>
              <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin text-primary" /> 
                System Boot
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border shadow-inner">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_15px_rgba(var(--primary),0.5)]" 
                style={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Step Indicator */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse">
              {steps[loadingStep]}
            </p>
          </div>

          {/* Bottom Security Tags */}
          <div className="flex gap-6 opacity-40">
             <Fingerprint className="h-4 w-4" />
             <Zap className="h-4 w-4" />
             <ShieldCheck className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans animate-in fade-in duration-1000">
      {/* Abstract Background Elements - Light Mode Optimized */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary opacity-5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary opacity-5 blur-[120px] rounded-full" />
      
      {/* Animated SVG Grid Background - Subtle for Light Theme */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/10" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-light)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="z-10 max-w-4xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-md mb-4 shadow-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Next-Gen Intelligence Platform</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight text-foreground">
            NEXUS <span className="text-primary italic">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Welcome to the future of contact center excellence. 
            <span className="block text-foreground font-bold mt-2">Precision Intelligence. Seamless Operations. Human-Centric AI.</span>
          </p>
        </div>

        {/* Character Illustration Placeholder (Refined for Light Theme) */}
        <div className="relative h-64 flex items-center justify-center">
           <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-75 opacity-30 animate-pulse" />
           <svg viewBox="0 0 200 200" className="h-full w-auto drop-shadow-[0_10px_30px_rgba(var(--primary),0.1)]">
             <path d="M100,20 C144.18,20 180,55.82 180,100 C180,144.18 144.18,180 100,180 C55.82,180 20,144.18 20,100 C20,55.82 55.82,20 100,20 Z" fill="none" stroke="oklch(0.60 0.10 185)" strokeWidth="1" strokeDasharray="5,5" className="animate-spin-slow" />
             <circle cx="100" cy="100" r="40" fill="oklch(0.60 0.10 185)" className="animate-pulse opacity-80" />
             <path d="M80,100 Q100,60 120,100" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
             <circle cx="90" cy="90" r="3" fill="white" />
             <circle cx="110" cy="90" r="3" fill="white" />
           </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
           {[
             { icon: Brain, title: "Neural Analytics", desc: "Real-time conversation decoding" },
             { icon: ShieldCheck, title: "Enterprise Grade", desc: "SOC2 & PCI-DSS compliant infrastructure" },
             { icon: Activity, title: "Live Ops", desc: "Sub-second latency operations" }
           ].map((item, i) => (
             <div key={i} className="p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl hover:border-primary/40 transition-all group">
                <item.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-black uppercase text-xs tracking-widest mb-2 text-foreground">{item.title}</h3>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter leading-tight">{item.desc}</p>
             </div>
           ))}
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mt-12">
          System Build v26.03.12 • Secure Environment
        </p>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
