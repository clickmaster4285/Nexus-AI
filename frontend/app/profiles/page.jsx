"use client";

import Link from "next/link";
import { USER_PROFILES } from "@/lib/auth";
import { ArrowRight, UserCircle2, ShieldAlert, BadgeCheck } from "lucide-react";

export default function ProfileSelectionPage() {
  const profiles = Object.values(USER_PROFILES);

  const getIcon = (id) => {
    switch (id) {
      case "super_admin": return <ShieldAlert className="h-6 w-6" />;
      case "supervisor": return <BadgeCheck className="h-6 w-6" />;
      default: return <UserCircle2 className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-t from-primary via-primary/30 to-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decor - Subtle for Light Mode */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary opacity-5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-primary opacity-5 blur-[120px] rounded-full" />

      <div className="z-10 max-w-6xl w-full space-y-16 animate-in slide-in-from-bottom-10 duration-1000">
        <div className="text-center space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary">Identity Selection</h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">Choose your <span className="italic underline decoration-primary decoration-4 underline-offset-8">Access Profile</span></h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">Select the environment tailored to your operational requirements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile) => (
            <Link 
              key={profile.id} 
              href={`/login?role=${profile.id}`}
              className="group relative h-125 rounded-[2rem] overflow-hidden border border-border bg-card transition-all hover:border-primary/50 hover:shadow-[0_20px_80px_-20px_rgba(var(--primary),0.2)] hover:-translate-y-2 shadow-sm"
            >
              {/* Profile Image with subtle overlay */}
              <div className="absolute inset-0">
                <img 
                  src={profile.image} 
                  alt={profile.label} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-background/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
              </div>

              {/* Profile Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                    {getIcon(profile.id)}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-muted">{profile.label}</h3>
                </div>
                
                <p className="text-sm text-muted leading-relaxed font-bold">
                  {profile.description}
                </p>

                <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  Authenticate Profile <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Profile Badge */}
              <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-primary/10 text-[9px] font-black uppercase tracking-widest text-primary shadow-sm">
                 Authorized Access
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
