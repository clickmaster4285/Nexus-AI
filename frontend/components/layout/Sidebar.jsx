"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  Plug,
  Settings,
  UserCircle,
  Shield,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const modules = [
  { id: "m01", name: "Real-Time Operations", route: "/m01-realtime", icon: LayoutDashboard, },
  { id: "m02", name: "Conversation AI", route: "/m02-conversation", icon: MessageSquare, },
  { id: "m03", name: "QA & Compliance", route: "/m03-qa", icon: ClipboardCheck, },
  { id: "m04", name: "Revenue Intel", route: "/m04-revenue", icon: TrendingUp },
  { id: "m05", name: "Workforce Intel", route: "/m05-workforce", icon: Users },
  { id: "m06", name: "CX Journey", route: "/m06-cx-journey", icon: Route },
  { id: "m07", name: "Reporting & BI", route: "/m07-reporting", icon: BarChart3 },
  { id: "m08", name: "Supervisor AI", route: "/m08-supervisor-ai", icon: Bot },
  { id: "m09", name: "Recording", route: "/m09-recording", icon: PhoneCall },
  { id: "m10", name: "Telephony Hub", route: "/m10-telephony", icon: Radio },
  { id: "m11", name: "Integrations", route: "/m11-integrations", icon: Plug },
  { id: "m12", name: "Admin Settings", route: "/m12-admin", icon: Settings },
  { id: "m13", name: "Agent Portal", route: "/m13-agent-portal", icon: UserCircle },
  { id: "m14", name: "Security", route: "/m14-security", icon: Shield },
];

function SidebarContent() {
  const pathname = usePathname();
  const [expandedModules, setExpandedModules] = useState([]);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const isActive = (route) => pathname === route || pathname.startsWith(`${route}/`);

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
              <div key={module.id}>
                <Link
                  href={module.route}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{module.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleModule(module.id);
                    }}
                    className="p-1 hover:bg-sidebar-accent rounded"
                  >
                    {expanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                </Link>

                {expanded && module.subItems && (
                  <div className="ml-6 mt-1 space-y-1">
                    {module.subItems.map((subItem) => (
                      <Link
                        key={subItem.route}
                        href={subItem.route}
                        className="block rounded-md px-3 py-1.5 text-xs text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        {subItem.name}
                      </Link>
                    ))}
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
