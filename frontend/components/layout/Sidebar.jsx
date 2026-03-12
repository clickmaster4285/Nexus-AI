"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { LayoutDashboard, MessageSquare, ClipboardCheck, TrendingUp, Users, Route, BarChart3, Bot, PhoneCall, Radio, Link2, Settings, UserCircle, Shield, ChevronRight, ChevronDown, Menu, BookUser, Monitor, PhoneForwarded, GitMerge, Upload, BrainCircuit, Cpu, FileText, Megaphone, Clock, Ban, Shuffle, Zap } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { USER_PROFILES } from "@/lib/auth";

const allModules = [
  {
    id: "M00",
    name: "Agent Command Center",
    route: "/agent-dashboard",
    icon: Zap,
  },
  {
    id: "M01",
    name: "Real-Time Operations",
    route: "/realtime-operation",
    icon: LayoutDashboard,
    subItems: [
      { name: "Live Operations", route: "/realtime-operation/live-ops" },
      { name: "Supervisor Tools", route: "/realtime-operation/supervisor" },
      { name: "Wallboards", route: "/realtime-operation/wallboards" },
      { name: "Alerts Engine", route: "/realtime-operation/alerts" },
    ]
  },
  {
    id: "M03",
    name: "QA & Compliance",
    route: "/qa-compliance",
    icon: ClipboardCheck,
    subItems: [
      { name: "Scorecard Builder", route: "/qa-compliance/scorecards" },
      { name: "Evaluation Queue", route: "/qa-compliance/reviews" },
      { name: "Compliance Monitor", route: "/qa-compliance/compliance" },
      { name: "Coaching Workflow", route: "/qa-compliance/coaching" },
    ]
  },
  {
    id: "M04",
    name: "Revenue Intelligence",
    route: "/revenue-intelligence",
    icon: TrendingUp,
    subItems: [
      { name: "KPI Overview", route: "/revenue-intelligence/dashboard" },
      { name: "Upsell & Signals", route: "/revenue-intelligence/signals" },
      { name: "Churn & Retention", route: "/revenue-intelligence/churn" },
      { name: "Sales Scoring", route: "/revenue-intelligence/sales" },
    ]
  },
  {
    id: "M05",
    name: "Workforce Intelligence",
    route: "/workforce-intelligence",
    icon: Users,
    subItems: [
      { name: "Agent Directory", route: "/workforce-intelligence/directory" },
      { name: "Performance", route: "/workforce-intelligence/performance" },
      { name: "Gamification", route: "/workforce-intelligence/gamification" },
      { name: "Wellbeing", route: "/workforce-intelligence/wellbeing" },
      { name: "Forecasting", route: "/workforce-intelligence/forecasting" },
    ]
  },
  {
    id: "M06",
    name: "CX & Journey",
    route: "/cx-journey",
    icon: Route,
    subItems: [
      { name: "Journey Mapping", route: "/cx-journey/journey" },
      { name: "VoC Analytics", route: "/cx-journey/voc" },
      { name: "Self-Service", route: "/cx-journey/deflection" }
    ]
  },
  {
    id: "M07",
    name: "Reporting & BI",
    route: "/reporting-bi",
    icon: BarChart3,
    subItems: [
      { name: "Dashboard Builder", route: "/reporting-bi/builder" },
      { name: "Report Library", route: "/reporting-bi/library" },
      { name: "Executive Briefing", route: "/reporting-bi/briefing" }
    ]
  },
  {
    id: "M08",
    name: "AI Supervisor",
    route: "/supervisor-ai",
    icon: Bot,
    subItems: [
      { name: "Live Monitor", route: "/supervisor-ai/monitor" },
      { name: "Whisper Coaching", route: "/supervisor-ai/coaching" },
      { name: "Queue Health", route: "/supervisor-ai/queues" },
      { name: "Interactions", route: "/supervisor-ai/interactions" },
      {
        name: "AI Conversation",
        id: "conversation_sub",
        isNested: true,
        icon: MessageSquare,
        route: "/ai-conversation",
        items: [
          { name: "Bulk Search", route: "/ai-conversation/search" },
          { name: "Analytics Library", route: "/ai-conversation/analytics" },
        ]
      }
    ]
  },
  {
    id: "M09",
    name: "Call Recording & Playback",
    route: "/recording-playback",
    icon: PhoneCall,
    subItems: [
      { name: "Recording Browser", route: "/recording-playback/browser" },
      { name: "Lifecycle Management", route: "/recording-playback/lifecycle" }
    ]
  },
  {
    id: "M10",
    name: "Telephony Integration",
    route: "/telephony-hub",
    icon: Radio,
    subItems: [
      { name: "Connectivity", route: "/telephony-hub/connectivity" },
      { name: "Numbers", route: "/telephony-hub/numbers" },
      { name: "IVR Flows", route: "/telephony-hub/ivr" },
      { name: "AI Connectors", route: "/telephony-hub/ai" },
      { name: "Health", route: "/telephony-hub/health" }
    ]
  },
  {
    id: "M11",
    name: "Integrations & Ecosystem",
    route: "/integrations-ecosystem",
    icon: Link2,
    subItems: [
      { name: "CRM Connectors", route: "/integrations-ecosystem/crm" },
      { name: "Webhooks", route: "/integrations-ecosystem/webhooks" },
      { name: "API Management", route: "/integrations-ecosystem/api" },
      { 
        name: "Asterisk", 
        id: "asterisk_sub", 
        isNested: true,
        icon: Cpu,
        route: "/asterisk-config",
        items: [
          { name: "AMI/ARI Config", route: "/asterisk-config/connection" },
          { name: "PJSIP Trunks", route: "/asterisk-config/trunks" },
          { name: "WebRTC Gateway", route: "/asterisk-config/webrtc" },
          { name: "Dialplan Mapping", route: "/asterisk-config/dialplan" },
        ]
      }
    ]
  },
  {
    id: "M12",
    name: "Administration & Settings",
    route: "/admin-settings",
    icon: Settings,
    subItems: [
      { name: "User Management", route: "/admin-settings/users" },
      { name: "Role Permissions", route: "/admin-settings/roles" },
      { name: "Audit Trails", route: "/admin-settings/audit" },
      { name: "Account Usage", route: "/admin-settings/usage" },
      { name: "Billing & Expenses", route: "/admin-settings/billing" },
    ]
  },
  {
    id: "M13",
    name: "Agent Self-Service Portal",
    route: "/agent-portal",
    icon: UserCircle,
    subItems: [
      { name: "My Dashboard", route: "/agent-portal/dashboard" },
      { name: "Interaction Room", route: "/agent-portal/workspace" },
      { name: "My Performance", route: "/agent-portal/performance" },
      { name: "Support & KB", route: "/agent-portal/support" },
    ]
  },
  {
    id: "M14",
    name: "Security & Compliance",
    route: "/security-compliance",
    icon: Shield,
    subItems: [
      { name: "Threat Monitor", route: "/security-compliance/monitor" },
      { name: "Compliance Hub", route: "/security-compliance/compliance" },
      { name: "Data Privacy", route: "/security-compliance/privacy" },
      { name: "Encryption", route: "/security-compliance/encryption" },
    ]
  },
  {
    id: "M15",
    name: "Native CRM Management",
    route: "/crm-native",
    icon: BookUser,
    subItems: [
      { name: "Contacts", route: "/crm-native/contacts" },
      { name: "Accounts", route: "/crm-native/accounts" },
      { name: "Leads", route: "/crm-native/leads" },
      { name: "Pipeline", route: "/crm-native/pipeline" },
      { name: "Tasks", route: "/crm-native/tasks" },
    ]
  },
  {
    id: "M16",
    name: "Agent Desktop",
    route: "/agent-desktop",
    icon: Monitor,
    subItems: [
      { name: "Softphone", route: "/agent-desktop/softphone" },
      { name: "Screen Pop", route: "/agent-desktop/screen-pop" },
      { name: "Live Script", route: "/agent-desktop/script" },
      { name: "KB Search", route: "/agent-desktop/kb" },
      { name: "AI Assist", route: "/agent-desktop/ai-assist" },
      { name: "ACW Panel", route: "/agent-desktop/acw" },
    ]
  },
  {
    id: "M17",
    name: "Outbound Dialer",
    route: "/outbound-dialer",
    icon: PhoneForwarded,
    subItems: [
      { name: "Campaigns", route: "/outbound-dialer/campaigns" },
      { name: "Call Lists", route: "/outbound-dialer/call-lists" },
      { name: "Pacing", route: "/outbound-dialer/pacing" },
    ]
  },
  {
    id: "M18",
    name: "Inbound Routing & IVR",
    route: "/inbound-ivr",
    icon: GitMerge,
    subItems: [
      { name: "IVR Builder", route: "/inbound-ivr/ivr-builder" },
      { name: "Queue Config", route: "/inbound-ivr/queue-config" },
      { name: "Routing Rules", route: "/inbound-ivr/routing-rules" },
      { name: "Callback Manager", route: "/inbound-ivr/callback-manager" },
    ]
  },
  {
    id: "M19",
    name: "Data Upload Engine",
    route: "/data-upload",
    icon: Upload,
    subItems: [
      { name: "File Wizard", route: "/data-upload/wizard" },
      { name: "Import History", route: "/data-upload/history" },
    ]
  },
  {
    id: "M20",
    name: "Agentic Automation",
    route: "/supervisor-agentic",
    icon: BrainCircuit,
    subItems: [
      { name: "Action Center", route: "/supervisor-agentic/actions" },
      { name: "Decision Log", route: "/supervisor-agentic/log" },
      { name: "Escalation Chain", route: "/supervisor-agentic/chain" },
    ]
  },
  {
    id: "M22",
    name: "Script & KB Builder",
    route: "/scripts-kb",
    icon: FileText,
    subItems: [
      { name: "Script Builder", route: "/scripts-kb/scripts" },
      { name: "KB Manager", route: "/scripts-kb/kb" },
    ]
  },
  {
    id: "M23",
    name: "Robocall Campaign",
    route: "/robocall-engine",
    icon: Megaphone,
    subItems: [
      { name: "Campaign Config", route: "/robocall-engine/config" },
      { name: "Delivery Analytics", route: "/robocall-engine/analytics" },
    ]
  },
  {
    id: "M24",
    name: "ACW & Disposition",
    route: "/acw-disposition",
    icon: Clock,
    subItems: [
      { name: "Disposition Codes", route: "/acw-disposition/codes" },
      { name: "ACW Timers", route: "/acw-disposition/timers" },
    ]
  },
  {
    id: "M25",
    name: "DNC & Compliance",
    route: "/dnc-management",
    icon: Ban,
    subItems: [
      { name: "Internal DNC", route: "/dnc-management/internal" },
      { name: "National Registry", route: "/dnc-management/national" },
      { name: "Calling Windows", route: "/dnc-management/compliance" },
    ]
  },
  {
    id: "M26",
    name: "Transfer & Conference",
    route: "/transfer-conference",
    icon: Shuffle,
    subItems: [
      { name: "Transfer Panel", route: "/transfer-conference/transfer" },
      { name: "Conference Bridge", route: "/transfer-conference/conference" },
    ]
  },
];

function SidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [userToggledModules, setUserToggledModules] = useState({});
  const [userRole, setUserRole] = useState("super_admin");
  const [mounted, setMounted] = useState(false);

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

  const filteredModules = useMemo(() => {
    if (!mounted) return [];
    return allModules.filter(m => activeProfile.modules.includes(m.id));
  }, [activeProfile, mounted]);

  const expandedModules = useMemo(() => {
    const activeModule = filteredModules.find(m =>
      pathname.startsWith(m.route) ||
      (m.subItems && m.subItems.some(si => {
        if (si.items) {
           return pathname.startsWith(si.route);
        }
        const [siPath, siQuery] = si.route.split("?");
        return pathname === siPath && searchParams.get("tab") === (siQuery ? siQuery.split("=")[1] : null);
      }))
    );

    return filteredModules.map(m => {
      const isActive = activeModule?.id === m.id;
      const userState = userToggledModules[m.id];
      const isExpanded = userState !== undefined ? userState : isActive;
      return isExpanded ? m.id : null;
    }).filter(Boolean);
  }, [userToggledModules, pathname, searchParams, filteredModules]);

  const toggleModule = (moduleId) => {
    const isCurrentlyExpanded = expandedModules.includes(moduleId);
    setUserToggledModules(prev => ({
      ...prev,
      [moduleId]: !isCurrentlyExpanded
    }));
  };

  const isActive = (route) => {
    if (!route) return false;
    if (route.includes("?")) {
      const [path, query] = route.split("?");
      const tabParam = query.split("=")[1];
      return pathname === path && searchParams.get("tab") === tabParam;
    }
    return pathname === route || (pathname.startsWith(route) && pathname !== "/");
  };

  if (!mounted) return <SidebarSkeleton />;

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            N
          </div>
          <span className="text-sidebar-foreground tracking-tighter">NEXUS <span className="text-primary italic">AI</span></span>
        </Link>
      </div>

      <nav className="flex-1 overflow-auto py-4 px-1">
        <div className="space-y-1">
          {filteredModules.map((module) => {
            const Icon = module.icon;
            const active = isActive(module.route);
            const expanded = expandedModules.includes(module.id);

            return (
              <div key={module.id} className="space-y-1">
                <Link
                  href={module.route || "#"}
                  onClick={() => {
                    toggleModule(module.id);
                  }}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-bold transition-all duration-200 ${active
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "animate-pulse" : ""}`} />
                    <span className="truncate">{module.name}</span>
                  </div>
                  {module.subItems && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleModule(module.id);
                      }}
                      className="p-1 rounded-md hover:bg-black/10 transition-colors shrink-0"
                    >
                      {expanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </Link>

                {expanded && module.subItems && (
                  <div className="ml-4 pl-2 border-l border-primary/10 mt-1 space-y-1 animate-in slide-in-from-left-2 duration-200">
                    {module.subItems.map((subItem) => {
                      if (subItem.isNested) {
                        const subExpanded = userToggledModules[subItem.id] !== undefined 
                          ? userToggledModules[subItem.id] 
                          : pathname.startsWith(subItem.route);
                        const SubIcon = subItem.icon;

                        return (
                          <div key={subItem.id} className="space-y-1">
                            <button
                               onClick={() => setUserToggledModules(p => ({...p, [subItem.id]: !subExpanded}))}
                               className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-[12px] font-bold uppercase tracking-tight transition-colors ${pathname.startsWith(subItem.route)
                                ? "text-primary bg-primary/5 shadow-sm shadow-primary/5"
                                : "text-sidebar-foreground/50 hover:bg-sidebar-accent"
                                }`}
                            >
                               <div className="flex items-center gap-2">
                                  <SubIcon className="h-3 w-3" />
                                  <span>{subItem.name}</span>
                               </div>
                               {subExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                            </button>
                            {subExpanded && subItem.items && (
                               <div className="ml-3 pl-2 border-l border-primary/10 space-y-1 animate-in slide-in-from-left-1">
                                  {subItem.items.map(ssi => (
                                     <Link
                                        key={ssi.route}
                                        href={ssi.route}
                                        className={`block rounded-md px-3 py-1 text-[11px] font-bold transition-colors ${isActive(ssi.route)
                                          ? "text-primary bg-primary/5"
                                          : "text-sidebar-foreground/40 hover:text-sidebar-foreground/70"
                                          }`}
                                     >
                                        {ssi.name}
                                     </Link>
                                  ))}
                               </div>
                            )}
                          </div>
                        )
                      }

                      const subActive = isActive(subItem.route);
                      return (
                        <Link
                          key={subItem.route}
                          href={subItem.route}
                          className={`block rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-tight transition-colors ${subActive
                            ? "bg-primary/10 text-primary shadow-xs"
                            : "text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            }`}
                        >
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="border-t p-4 bg-muted/5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/90 text-center">
          Nexus AI v2.4
        </p>
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="flex h-full flex-col bg-sidebar animate-pulse">
      <div className="flex h-16 items-center border-b px-4 gap-2">
        <div className="h-8 w-8 rounded-lg bg-sidebar-accent" />
        <div className="h-4 w-24 rounded bg-sidebar-accent" />
      </div>

      <div className="flex-1 space-y-4 py-6 px-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-4 rounded bg-sidebar-accent" />
            <div className="h-4 flex-1 rounded bg-sidebar-accent" />
          </div>
        ))}
      </div>

      <div className="border-t p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-sidebar-accent" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-16 rounded bg-sidebar-accent" />
          <div className="h-2 w-20 rounded bg-sidebar-accent" />
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <>
      <aside className="hidden lg:block w-68 border-r bg-sidebar">
        <Suspense fallback={<SidebarSkeleton />}>
          <SidebarContent />
        </Suspense>
      </aside>

      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="ml-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Suspense fallback={<SidebarSkeleton />}>
            <SidebarContent />
          </Suspense>
        </SheetContent>
      </Sheet>
    </>
  );
}
