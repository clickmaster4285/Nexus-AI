"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const moduleNames = {
  "m01-realtime": "Real-Time Operations",
  "m02-conversation": "Conversation AI",
  "m03-qa": "QA & Compliance",
  "m04-revenue": "Revenue Intelligence",
  "m05-workforce": "Workforce Intelligence",
  "m06-cx-journey": "CX Journey",
  "m07-reporting": "Reporting & BI",
  "m08-supervisor-ai": "Supervisor AI",
  "m09-recording": "Call Recording",
  "m10-telephony": "Telephony Hub",
  "m11-integrations": "Integrations",
  "m12-admin": "Administration",
  "m13-agent-portal": "Agent Portal",
  "m14-security": "Security",
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
