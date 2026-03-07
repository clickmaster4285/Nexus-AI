"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const moduleNames = {
  "realtime-operation": "Real-Time Operations",
  "ai-conversation": "Conversation AI",
  "qa-compliance": "QA & Compliance",
  "revenue-intelligence": "Revenue Intelligence",
  "workforce-intelligence": "Workforce Intelligence",
  "cx-journey": "CX Journey",
  "reporting-bi": "Reporting & BI",
  "supervisor-ai": "Supervisor AI",
  "recording-playback": "Call Recording",
  "telephony-hub": "Telephony Hub",
  "integrations-ecosystem": "Integrations",
  "admin-settings": "Administration",
  "agent-portal": "Agent Portal",
  "security-compliance": "Security",
};

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const moduleKey = segments[0];
  const moduleName = moduleNames[moduleKey] || moduleKey;

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground px-6 py-2 border-b">
      <Link href="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-medium text-foreground">{moduleName}</span>
    </nav>
  );
}

