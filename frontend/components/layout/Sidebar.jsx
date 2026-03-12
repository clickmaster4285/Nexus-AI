"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { LayoutDashboard, MessageSquare, ClipboardCheck, TrendingUp, Users, Route, BarChart3, Bot, PhoneCall, Radio, Link2, Settings, UserCircle, Shield, ChevronRight, ChevronDown, Menu, BookUser, Monitor, PhoneForwarded, GitMerge, Upload, BrainCircuit, Cpu, FileText, Megaphone, Clock, Ban, Shuffle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

const modules = [
  {
    id: "m01",
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
    id: "m02",
    name: "AI Conversation Intelligence",
    route: "/ai-conversation",
    icon: MessageSquare,
    subItems: [
      { name: "Transcript Viewer", route: "/ai-conversation/transcript" },
      { name: "Bulk Search", route: "/ai-conversation/search" },
      { name: "NLP Insights", route: "/ai-conversation/insights" },
      { name: "Analytics Library", route: "/ai-conversation/analytics" },
    ]
  },
  {
    id: "m03",
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
    id: "m04",
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
    id: "m05",
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
    id: "m06",
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
    id: "m07",
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
    id: "m08",
    name: "AI Supervisor",
    route: "/supervisor-ai",
    icon: Bot,
    subItems: [
      { name: "Live Monitor", route: "/supervisor-ai/monitor" },
      { name: "Whisper Coaching", route: "/supervisor-ai/coaching" },
      { name: "Queue Health", route: "/supervisor-ai/queues" },
      { name: "Interactions", route: "/supervisor-ai/interactions" }
    ]
  },
  {
    id: "m09",
    name: "Call Recording & Playback",
    route: "/recording-playback",
    icon: PhoneCall,
    subItems: [
      { name: "Recording Browser", route: "/recording-playback/browser" },
      { name: "Media Player", route: "/recording-playback/player" },
      { name: "Lifecycle Management", route: "/recording-playback/lifecycle" }
    ]
  },
  {
    id: "m10",
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
    id: "m11",
    name: "Integrations & Ecosystem",
    route: "/integrations-ecosystem",
    icon: Link2,
    subItems: [
      { name: "CRM Connectors", route: "/integrations-ecosystem/crm" },
      { name: "Webhooks", route: "/integrations-ecosystem/webhooks" },
      { name: "API Management", route: "/integrations-ecosystem/api" },
    ]
  },
  {
    id: "m12",
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
    id: "m13",
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
    id: "m14",
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
    id: "m15",
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
    id: "m16",
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
    id: "m17",
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
    id: "m18",
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
    id: "m19",
    name: "Data Upload Engine",
    route: "/data-upload",
    icon: Upload,
    subItems: [
      { name: "File Wizard", route: "/data-upload/wizard" },
      { name: "Import History", route: "/data-upload/history" },
    ]
  },
  {
    id: "m20",
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
    id: "m21",
    name: "Asterisk Deep-Dive",
    route: "/asterisk-config",
    icon: Cpu,
    subItems: [
      { name: "AMI/ARI Config", route: "/asterisk-config/connection" },
      { name: "PJSIP Trunks", route: "/asterisk-config/trunks" },
      { name: "WebRTC Gateway", route: "/asterisk-config/webrtc" },
      { name: "Dialplan Mapping", route: "/asterisk-config/dialplan" },
    ]
  },
  {
    id: "m22",
    name: "Script & KB Builder",
    route: "/scripts-kb",
    icon: FileText,
    subItems: [
      { name: "Script Builder", route: "/scripts-kb/scripts" },
      { name: "KB Manager", route: "/scripts-kb/kb" },
    ]
  },
  {
    id: "m23",
    name: "Robocall Campaign",
    route: "/robocall-engine",
    icon: Megaphone,
    subItems: [
      { name: "Campaign Config", route: "/robocall-engine/config" },
      { name: "Delivery Analytics", route: "/robocall-engine/analytics" },
    ]
  },
  {
    id: "m24",
    name: "ACW & Disposition",
    route: "/acw-disposition",
    icon: Clock,
    subItems: [
      { name: "Disposition Codes", route: "/acw-disposition/codes" },
      { name: "ACW Timers", route: "/acw-disposition/timers" },
    ]
  },
  {
    id: "m25",
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
    id: "m26",
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
  const [userToggledModules, setUserToggledModules] = useState({}); // moduleId -> boolean

  // Derive expanded modules from both user toggles and the current active path
  const expandedModules = useMemo(() => {
    const activeModule = modules.find(m =>
      pathname.startsWith(m.route) ||
      (m.subItems && m.subItems.some(si => {
        const [siPath, siQuery] = si.route.split("?");
        return pathname === siPath && searchParams.get("tab") === siQuery.split("=")[1];
      }))
    );

    return modules.map(m => {
      const isActive = activeModule?.id === m.id;
      const userState = userToggledModules[m.id];
      // Default to active module expanded, but respect user toggle if it exists
      const isExpanded = userState !== undefined ? userState : isActive;
      return isExpanded ? m.id : null;
    }).filter(Boolean);
  }, [userToggledModules, pathname, searchParams]);

  const toggleModule = (moduleId) => {
    const isCurrentlyExpanded = expandedModules.includes(moduleId);
    setUserToggledModules(prev => ({
      ...prev,
      [moduleId]: !isCurrentlyExpanded
    }));
  };

  const isActive = (route) => {
    if (route.includes("?")) {
      const [path, query] = route.split("?");
      const tabParam = query.split("=")[1];
      return pathname === path && searchParams.get("tab") === tabParam;
    }
    return pathname === route || (pathname.startsWith(route) && pathname !== "/");
  };

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            N
          </div>
          <span className="text-sidebar-foreground">NEXUS AI</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-auto py-4 px-2">
        <div className="space-y-1">
          {modules.map((module) => {
            const Icon = module.icon;
            const active = isActive(module.route);
            const expanded = expandedModules.includes(module.id);

            return (
              <div key={module.id} className="space-y-1">
                <Link
                  href={module.route}
                  onClick={() => {
                    toggleModule(module.id);
                  }}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "animate-pulse" : ""}`} />
                    <span>{module.name}</span>
                  </div>
                  {module.subItems && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleModule(module.id);
                      }}
                      className="p-1 rounded-md hover:bg-black/10 transition-colors"
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
                      const subActive = isActive(subItem.route);
                      return (
                        <Link
                          key={subItem.route}
                          href={subItem.route}
                          className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${subActive
                            ? "bg-primary/10 text-primary font-bold shadow-xs"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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

      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Supervisor</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="flex h-full flex-col bg-sidebar animate-pulse">
      {/* Logo Area */}
      <div className="flex h-16 items-center border-b px-4 gap-2">
        <div className="h-8 w-8 rounded-lg bg-sidebar-accent" />
        <div className="h-4 w-24 rounded bg-sidebar-accent" />
      </div>

      {/* Nav Items */}
      <div className="flex-1 space-y-4 py-6 px-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-4 rounded bg-sidebar-accent" />
            <div className="h-4 flex-1 rounded bg-sidebar-accent" />
          </div>
        ))}
      </div>

      {/* Footer Area */}
      <div className="border-t p-4 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-sidebar-accent" />
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
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r bg-sidebar">
        <Suspense fallback={<SidebarSkeleton />}>
          <SidebarContent />
        </Suspense>
      </aside>

      {/* Mobile Sidebar */}
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

