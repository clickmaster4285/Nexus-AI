"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Bell, HelpCircle, LogOut, ChevronDown, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USER_PROFILES } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const [userRole, setUserRole] = useState("super_admin");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const cookies = document.cookie.split("; ");
    const roleCookie = cookies.find(row => row.startsWith("userRole="));
    if (roleCookie) {
      setUserRole(roleCookie.split("=")[1]);
    }
  }, []);

  const activeProfile = useMemo(() => {
    return Object.values(USER_PROFILES).find(p => p.id === userRole) || USER_PROFILES.SUPER_ADMIN;
  }, [userRole]);

  const handleSignOut = () => {
    document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/profiles");
  };

  if (!mounted) return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6 animate-pulse">
       <div className="flex-1 h-10 bg-muted rounded-xl max-w-md" />
       <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-muted rounded-full" />
          <div className="h-10 w-10 bg-muted rounded-full" />
       </div>
    </header>
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-4 lg:px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" />
          <Input
            type="search"
            placeholder="Search Intelligence Command..."
            className="pl-10 h-10 bg-muted/30 border-transparent focus:bg-white focus:border-primary/20 rounded-xl font-medium transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 border-r pr-4 mr-2">
           <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-primary/5">
             <Bell className="h-5 w-5 text-muted-foreground" />
             <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
           </Button>

           <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/5">
             <HelpCircle className="h-5 w-5 text-muted-foreground" />
           </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-12 px-2 gap-3 hover:bg-primary/5 rounded-xl transition-all">
              <div className="h-9 w-9 rounded-xl overflow-hidden border border-primary/20 shadow-sm shrink-0">
                <img src={activeProfile.image} alt={activeProfile.label} className="w-full h-full object-cover" />
              </div>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-xs font-black text-foreground leading-none">{activeProfile.testCredentials.email.split("@")[0]}</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{activeProfile.label}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground opacity-40" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-primary/5">
            <DropdownMenuLabel className="p-1">
               <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl overflow-hidden border border-primary/10">
                     <img src={activeProfile.image} alt={activeProfile.label} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-sm font-black tracking-tight">{activeProfile.label} Profile</span>
                     <span className="text-xs text-muted-foreground font-medium">{activeProfile.testCredentials.email}</span>
                  </div>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary/5" />
            <DropdownMenuItem className="rounded-xl gap-3 cursor-pointer">
               <User className="h-4 w-4 text-primary" />
               <span className="text-xs font-bold uppercase tracking-tight">Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl gap-3 cursor-pointer">
               <ShieldCheck className="h-4 w-4 text-primary" />
               <span className="text-xs font-bold uppercase tracking-tight">Security Access</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-primary/5" />
            <DropdownMenuItem 
               onClick={handleSignOut}
               className="rounded-xl gap-3 cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-500/5"
            >
               <LogOut className="h-4 w-4" />
               <span className="text-xs font-bold uppercase tracking-wide">Terminate Session</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
