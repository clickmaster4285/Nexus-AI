"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  ClipboardCheck,
  TrendingUp,
  Users,
  Route,
  BarChart3,
  Bot,
  PhoneCall,
  Radio,
  Link2,
  Settings,
  UserCircle,
  Shield,
  ChevronRight,
  ChevronDown,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const modules = [
  {
    id: "m01",
    name: "Real-Time Operations",
    route: "/m01-realtime",
    icon: LayoutDashboard,
    subItems: [
      { name: "Live Operations", route: "/m01-realtime?tab=live-ops" },
      { name: "Supervisor Tools", route: "/m01-realtime?tab=supervisor" },
      { name: "Wallboards", route: "/m01-realtime?tab=wallboards" },
      { name: "Alerts Engine", route: "/m01-realtime?tab=alerts" },
    ]
  },
  {
    id: "m02",
    name: "Conversation AI",
    route: "/m02-conversation",
    icon: MessageSquare,
    subItems: [
      { name: "Transcript Viewer", route: "/m02-conversation?tab=transcript" },
      { name: "Bulk Search", route: "/m02-conversation?tab=search" },
      { name: "NLP Insights", route: "/m02-conversation?tab=insights" },
      { name: "Analytics Library", route: "/m02-conversation?tab=analytics" },
    ]
  },
  {
    id: "m03",
    name: "QA & Compliance",
    route: "/m03-qa",
    icon: ClipboardCheck,
    subItems: [
      { name: "Scorecard Builder", route: "/m03-qa?tab=scorecards" },
      { name: "Evaluation Queue", route: "/m03-qa?tab=reviews" },
      { name: "Compliance Monitor", route: "/m03-qa?tab=compliance" },
      { name: "Coaching Workflow", route: "/m03-qa?tab=coaching" },
    ]
  },
  {
    id: "m04",
    name: "Revenue Intel",
    route: "/m04-revenue",
    icon: TrendingUp,
    subItems: [
      { name: "KPI Overview", route: "/m04-revenue?tab=dashboard" },
      { name: "Upsell & Signals", route: "/m04-revenue?tab=signals" },
      { name: "Churn & Retention", route: "/m04-revenue?tab=churn" },
      { name: "Sales Scoring", route: "/m04-revenue?tab=sales" },
    ]
  },
  {
    id: "m05",
    name: "Workforce Intel",
    route: "/m05-workforce",
    icon: Users,
    subItems: [
      { name: "Agent Directory", route: "/m05-workforce?tab=directory" },
      { name: "Performance", route: "/m05-workforce?tab=performance" },
      { name: "Gamification", route: "/m05-workforce?tab=gamification" },
      { name: "Wellbeing", route: "/m05-workforce?tab=wellbeing" },
      { name: "Forecasting", route: "/m05-workforce?tab=forecasting" },
    ]
  },
  {
    id: "m06",
    name: "CX Journey",
    route: "/m06-cx-journey",
    icon: Route,
    subItems: [
      { name: "Journey Mapping", route: "/m06-cx-journey?tab=journey" },
      { name: "VoC Analytics", route: "/m06-cx-journey?tab=voc" },
      { name: "Self-Service", route: "/m06-cx-journey?tab=deflection" }
    ]
  },
  {
    id: "m07",
    name: "Reporting & BI",
    route: "/m07-reporting",
    icon: BarChart3,
    subItems: [
      { name: "Dashboard Builder", route: "/m07-reporting?tab=builder" },
      { name: "Report Library", route: "/m07-reporting?tab=library" },
      { name: "Executive Briefing", route: "/m07-reporting?tab=briefing" }
    ]
  },
  {
    id: "m08",
    name: "Supervisor AI",
    route: "/m08-supervisor-ai",
    icon: Bot,
    subItems: [
      { name: "Live Monitor", route: "/m08-supervisor-ai?tab=monitor" },
      { name: "Whisper Coaching", route: "/m08-supervisor-ai?tab=coaching" },
      { name: "Queue Health", route: "/m08-supervisor-ai?tab=queues" },
      { name: "Interactions", route: "/m08-supervisor-ai?tab=interactions" }
    ]
  },
  {
    id: "m09",
    name: "Recording",
    route: "/m09-recording",
    icon: PhoneCall,
    subItems: [
      { name: "Recording Browser", route: "/m09-recording?tab=browser" },
      { name: "Media Player", route: "/m09-recording?tab=player" },
      { name: "Lifecycle Management", route: "/m09-recording?tab=lifecycle" }
    ]
  },
  {
    id: "m10",
    name: "Telephony Hub",
    route: "/m10-telephony",
    icon: Radio,
    subItems: [
      { name: "Connectivity", route: "/m10-telephony?tab=connectivity" },
      { name: "Numbers", route: "/m10-telephony?tab=numbers" },
      { name: "IVR Flows", route: "/m10-telephony?tab=ivr" },
      { name: "AI Connectors", route: "/m10-telephony?tab=ai" },
      { name: "Health", route: "/m10-telephony?tab=health" }
    ]
  },
  {
    id: "m11",
    name: "Integrations",
    route: "/m11-integrations",
    icon: Link2,
    subItems: [
      { name: "CRM Connectors", route: "/m11-integrations?tab=crm" },
      { name: "Webhooks", route: "/m11-integrations?tab=webhooks" },
      { name: "API Management", route: "/m11-integrations?tab=api" },
    ]
  },
  {
    id: "m12",
    name: "Admin Settings",
    route: "/m12-admin",
    icon: Settings,
    subItems: [
      { name: "User Management", route: "/m12-admin?tab=users" },
      { name: "Role Permissions", route: "/m12-admin?tab=roles" },
      { name: "Audit Trails", route: "/m12-admin?tab=audit" },
      { name: "Account Usage", route: "/m12-admin?tab=usage" },
    ]
  },
  {
    id: "m13",
    name: "Agent Portal",
    route: "/m13-agent-portal",
    icon: UserCircle,
    subItems: [
      { name: "My Dashboard", route: "/m13-agent-portal?tab=dashboard" },
      { name: "Interaction Room", route: "/m13-agent-portal?tab=workspace" },
      { name: "My Performance", route: "/m13-agent-portal?tab=performance" },
      { name: "Support & KB", route: "/m13-agent-portal?tab=support" },
    ]
  },
  {
    id: "m14",
    name: "Security",
    route: "/m14-security",
    icon: Shield,
    subItems: [
      { name: "Threat Monitor", route: "/m14-security?tab=monitor" },
      { name: "Compliance Hub", route: "/m14-security?tab=compliance" },
      { name: "Data Privacy", route: "/m14-security?tab=privacy" },
      { name: "Encryption", route: "/m14-security?tab=encryption" },
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

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r bg-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="ml-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
